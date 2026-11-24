begin;
create function public.validate_script_payload() returns trigger language plpgsql set search_path='' as $$
declare k text; step jsonb; v jsonb;begin
if new.payload->'schema_version' is distinct from '1'::jsonb or new.payload->>'script_id' is distinct from new.id::text then raise exception 'Versão/ID de roteiro inválidos';end if;
foreach k in array array['language','level','scenario','title','description','tutor_instructions'] loop if jsonb_typeof(new.payload->k) is distinct from 'string' or length(trim(new.payload->>k)) not between 1 and 4000 then raise exception 'Campo de roteiro inválido: %',k;end if;end loop;
if new.payload->>'level' not in ('A1','A2','B1','B2','C1','C2') or jsonb_typeof(new.payload->'estimated_minutes') is distinct from 'number' then raise exception 'Nível/duração inválidos';end if;
if (new.payload->>'estimated_minutes')::numeric not between 1 and 240 or trunc((new.payload->>'estimated_minutes')::numeric)<>(new.payload->>'estimated_minutes')::numeric then raise exception 'Duração inválida';end if;
if jsonb_typeof(new.payload->'steps') is distinct from 'array' or jsonb_array_length(new.payload->'steps') not between 1 and 100 then raise exception 'Etapas inválidas';end if;
for step in select value from jsonb_array_elements(new.payload->'steps') loop
 foreach k in array array['id','context','tutor_text','tutor_translation_pt','tutor_pronunciation_pt','student_suggestion','student_translation_pt','student_pronunciation_pt'] loop if jsonb_typeof(step->k) is distinct from 'string' or length(step->>k)>4000 or (k in ('id','context','tutor_text') and length(trim(step->>k))=0) then raise exception 'Campo de etapa inválido: %',k;end if;end loop;
 if jsonb_typeof(step->'alternatives') is distinct from 'array' or jsonb_array_length(step->'alternatives')>50 then raise exception 'Alternativas inválidas';end if;
 for v in select value from jsonb_array_elements(step->'alternatives') loop if jsonb_typeof(v)<>'string' or length(trim(v#>>'{}')) not between 1 and 4000 then raise exception 'Alternativa inválida';end if;end loop;
end loop;
if (select count(distinct e->>'id') from jsonb_array_elements(new.payload->'steps') e)<>jsonb_array_length(new.payload->'steps') then raise exception 'IDs de etapa duplicados';end if;
return new;end $$;
create trigger validate_script before insert or update on public.scripts for each row execute function public.validate_script_payload();
commit;
