begin;
create table public.profiles(id uuid primary key references auth.users on delete cascade,nickname text not null check(length(nickname) between 1 and 60),ranking_opt_in boolean not null default false,revision integer not null default 1);
create table public.preferences(user_id uuid primary key references auth.users on delete cascade,payload jsonb not null default '{}' check(jsonb_typeof(payload)='object' and octet_length(payload::text)<=32768),revision integer not null default 1);
create table public.scripts(id uuid not null,user_id uuid not null references auth.users on delete cascade,payload jsonb not null check(jsonb_typeof(payload)='object' and octet_length(payload::text)<=262144 and payload->>'schema_version'='1' and payload->>'script_id'=id::text),favorite boolean not null default false,revision integer not null default 1,primary key(id,user_id));
create table public.sessions(id uuid primary key,user_id uuid not null references auth.users on delete cascade,script_id uuid,language text not null check(length(language) between 1 and 100),level text not null check(level in ('A1','A2','B1','B2','C1','C2')),scenario text not null check(length(scenario) between 1 and 4000),mode text not null check(mode in ('guided','free','explanation')),started_at timestamptz not null,ended_at timestamptz,active_seconds integer not null default 0 check(active_seconds between 0 and 86400),paused_seconds integer not null default 0 check(paused_seconds between 0 and 86400),local_day date not null,timezone text not null,revision integer not null default 1,unique(id,user_id),check(ended_at is null or (ended_at>=started_at and active_seconds+paused_seconds<=extract(epoch from ended_at-started_at)+2)));
-- script_id is a historical snapshot; deleting a script must not invalidate past reports.
create table public.reports(session_id uuid primary key,user_id uuid not null,payload jsonb not null,original text not null check(octet_length(original)<=262144),created_at timestamptz not null default now(),unique(session_id,user_id),foreign key(session_id,user_id) references public.sessions(id,user_id) on delete cascade);
create table public.xp_events(session_id uuid primary key,user_id uuid not null,points integer not null check(points between 0 and 100),local_day date not null,foreign key(session_id,user_id) references public.reports(session_id,user_id) on delete cascade);
create table public.achievements(id text primary key,title text not null,description text not null);
insert into public.achievements values ('first','Primeira conversa','1 sessão avaliada'),('ten','Comunicador','10 sessões avaliadas'),('xp500','Explorador','500 XP acumulados');
create table public.user_achievements(user_id uuid references auth.users on delete cascade,achievement_id text references public.achievements on delete cascade,earned_at timestamptz not null default now(),primary key(user_id,achievement_id));
create table public.mutation_receipts(user_id uuid references auth.users on delete cascade,op_id uuid,primary key(user_id,op_id));
create index on public.scripts(user_id);create index on public.sessions(user_id,started_at desc);create index on public.reports(user_id);create index on public.xp_events(user_id,local_day);
do $$ declare t text; k text; begin foreach t in array array['profiles','preferences','scripts','sessions','reports','xp_events','user_achievements','mutation_receipts'] loop k:=case when t='profiles' then 'id' else 'user_id' end;execute format('alter table public.%I enable row level security',t);execute format('create policy own_read on public.%I for select to authenticated using (%I=auth.uid())',t,k);execute format('revoke all on public.%I from anon, authenticated',t);execute format('grant select on public.%I to authenticated',t);end loop;end $$;
alter table public.achievements enable row level security;create policy catalog_read on public.achievements for select to authenticated using(true);grant select on public.achievements to authenticated;
create function public.apply_mutation(p_op uuid,p_table text,p_id uuid,p_expected integer,p_row jsonb) returns void language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid(); rev integer; s public.sessions; sc public.scripts; begin
if u is null then raise exception 'Autenticação necessária';end if;
perform pg_advisory_xact_lock(hashtextextended(u::text,0));
if exists(select 1 from public.mutation_receipts where user_id=u and op_id=p_op) then return;end if;
if p_table='profiles' then
 if p_id<>u or p_row is null then raise exception 'Perfil inválido';end if;
 select revision into rev from public.profiles where id=u;
 if rev is distinct from p_expected then raise exception 'Conflito de perfil; exporte a fila antes de descartar';end if;
 insert into public.profiles values(u,p_row->>'nickname',coalesce((p_row->>'ranking_opt_in')::boolean,false),coalesce(rev,0)+1) on conflict(id) do update set nickname=excluded.nickname,ranking_opt_in=excluded.ranking_opt_in,revision=excluded.revision;
elsif p_table='preferences' then
 if p_id<>u or p_row is null then raise exception 'Preferências inválidas';end if;
 select revision into rev from public.preferences where user_id=u;
 if rev is distinct from p_expected then raise exception 'Conflito de preferências';end if;
 insert into public.preferences values(u,p_row->'payload',coalesce(rev,0)+1) on conflict(user_id) do update set payload=excluded.payload,revision=excluded.revision;
elsif p_table='scripts' then
 select revision into rev from public.scripts where id=p_id and user_id=u;
 if rev is distinct from p_expected then raise exception 'Conflito de roteiro';end if;
 if p_row is null then delete from public.scripts where id=p_id and user_id=u;
 else sc:=jsonb_populate_record(null::public.scripts,p_row);if sc.id<>p_id or sc.user_id<>u then raise exception 'Roteiro inválido';end if;
 insert into public.scripts values(p_id,u,sc.payload,sc.favorite,coalesce(rev,0)+1) on conflict(id,user_id) do update set payload=excluded.payload,favorite=excluded.favorite,revision=excluded.revision where scripts.user_id=u;
 if not found then raise exception 'ID indisponível';end if;end if;
elsif p_table='sessions' then
 select revision into rev from public.sessions where id=p_id and user_id=u;
 if rev is distinct from p_expected then raise exception 'Conflito de sessão';end if;
 if p_row is null then delete from public.sessions where id=p_id and user_id=u;perform public.refresh_achievements(u);
 else s:=jsonb_populate_record(null::public.sessions,p_row);if s.id<>p_id or s.user_id<>u then raise exception 'Sessão inválida';end if;
 if rev is null then if s.script_id is not null and not exists(select 1 from public.scripts where id=s.script_id and user_id=u) then raise exception 'Roteiro não pertence à conta';end if;
 if s.local_day<>(s.started_at at time zone s.timezone)::date then raise exception 'Data local inválida';end if;
 insert into public.sessions select s.id,u,s.script_id,s.language,s.level,s.scenario,s.mode,s.started_at,s.ended_at,s.active_seconds,s.paused_seconds,s.local_day,s.timezone,1;
 else update public.sessions set ended_at=s.ended_at,active_seconds=s.active_seconds,paused_seconds=s.paused_seconds,revision=rev+1 where id=p_id and user_id=u and ended_at is null;if not found then raise exception 'Sessão encerrada é imutável';end if;end if;end if;
else raise exception 'Tabela inválida';end if;
insert into public.mutation_receipts values(u,p_op);
end $$;
create function public.refresh_achievements(u uuid) returns void language plpgsql security definer set search_path='' as $$ declare n integer; x integer;begin select count(*) into n from public.reports where user_id=u and (payload->'evidence'->>'assessed_turns')::int>0;select coalesce(sum(points),0) into x from public.xp_events where user_id=u;delete from public.user_achievements where user_id=u and not ((achievement_id='first' and n>=1) or (achievement_id='ten' and n>=10) or (achievement_id='xp500' and x>=500));insert into public.user_achievements(user_id,achievement_id) select u,id from public.achievements where (id='first' and n>=1) or (id='ten' and n>=10) or (id='xp500' and x>=500) on conflict do nothing;end $$;
revoke all on function public.refresh_achievements(uuid) from public,anon,authenticated;
revoke all on function public.apply_mutation(uuid,text,uuid,integer,jsonb) from public,anon;grant execute on function public.apply_mutation(uuid,text,uuid,integer,jsonb) to authenticated;
commit;
