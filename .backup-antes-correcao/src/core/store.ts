import {createClient} from '@supabase/supabase-js';
import {openDB} from 'idb';
import type {ScriptV1,SessionRow,ReportRow,XPRow} from './contracts';
const url=import.meta.env.VITE_SUPABASE_URL, key=import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase=url&&key&&!url.includes('YOUR_PROJECT')?createClient(url,key):null;
export type Profile={id:string;nickname:string;ranking_opt_in:boolean;revision:number};
export type PrefRow={user_id:string;payload:Record<string,unknown>;revision:number};
export type ScriptRow={id:string;user_id:string;payload:ScriptV1;favorite:boolean;revision:number};
export type Snapshot={profile:Profile|null;preferences:PrefRow|null;scripts:ScriptRow[];sessions:SessionRow[];reports:ReportRow[];xp:XPRow[]};
export const empty=():Snapshot=>({profile:null,preferences:null,scripts:[],sessions:[],reports:[],xp:[]});
type Table='profiles'|'preferences'|'scripts'|'sessions';
type Operation={opId:string;table:Table;id:string;expected:number|null;row:Record<string,unknown>|null};
type Local={snapshot:Snapshot;queue:Operation[]};
const db=()=>openDB('speakup-v2',1,{upgrade(d){d.createObjectStore('accounts')}});
export class AccountStore{
 private local:Local={snapshot:empty(),queue:[]};private tail:Promise<unknown>=Promise.resolve();
 constructor(public uid:string,private update:(s:Snapshot,pending:number,error:string)=>void){}
 private serialize<T>(fn:()=>Promise<T>):Promise<T>{const execute=async()=>{const work=async()=>{const d=await db();this.local=await d.get('accounts',this.uid)??{snapshot:empty(),queue:[]};return fn()};return navigator.locks? navigator.locks.request('speakup:'+this.uid,work):work()};const p=this.tail.then(execute,execute);this.tail=p.catch(()=>{});return p;}
 private async persist(){const d=await db();await d.put('accounts',this.local,this.uid);this.update(this.local.snapshot,this.local.queue.length,'');}
 async init(){return this.serialize(async()=>{const d=await db();this.local=await d.get('accounts',this.uid)??{snapshot:empty(),queue:[]};this.update(this.local.snapshot,this.local.queue.length,'');})}
 private apply(o:Operation){const s=this.local.snapshot;const row=o.row?{...o.row,revision:(o.expected??0)+1}:null;
 if(o.table==='profiles')this.local.snapshot={...s,profile:row as Profile|null};else if(o.table==='preferences')this.local.snapshot={...s,preferences:row as PrefRow|null};else if(o.table==='scripts')this.local.snapshot={...s,scripts:[...s.scripts.filter(x=>x.id!==o.id),...(row?[row as ScriptRow]:[])]};else this.local.snapshot={...s,sessions:[...s.sessions.filter(x=>x.id!==o.id),...(row?[row as SessionRow]:[])],reports:row?s.reports:s.reports.filter(x=>x.session_id!==o.id),xp:row?s.xp:s.xp.filter(x=>x.session_id!==o.id)};}
 write(table:Table,id:string,row:object|null,expected:number|null){return this.serialize(async()=>{const o={opId:crypto.randomUUID(),table,id,row:row as Record<string,unknown>|null,expected};const previous=structuredClone(this.local);this.local.queue.push(o);this.apply(o);try{await this.persist()}catch(e){this.local=previous;throw e;}}).then(()=>this.sync());}
 sync(){return this.serialize(async()=>{if(!supabase||!navigator.onLine){this.update(this.local.snapshot,this.local.queue.length,'Offline: alterações aguardam sincronização.');return false;}try{const {data:{user},error:authError}=await supabase.auth.getUser();if(authError||user?.id!==this.uid)throw Error('Sessão expirada ou conta alterada.');while(this.local.queue.length){const o=this.local.queue[0];const {error}=await supabase.rpc('apply_mutation',{p_op:o.opId,p_table:o.table,p_id:o.id,p_expected:o.expected,p_row:o.row});if(error)throw Error(error.message);this.local.queue.shift();await this.persist();}const results=await Promise.all([supabase.from('profiles').select('*').eq('id',this.uid).maybeSingle(),supabase.from('preferences').select('*').eq('user_id',this.uid).maybeSingle(),supabase.from('scripts').select('*').eq('user_id',this.uid),supabase.from('sessions').select('*').eq('user_id',this.uid).order('started_at',{ascending:false}),supabase.from('reports').select('*').eq('user_id',this.uid),supabase.from('xp_events').select('*').eq('user_id',this.uid)]);for(const r of results)if(r.error)throw Error(r.error.message);this.local.snapshot={profile:results[0].data as Profile|null,preferences:results[1].data as PrefRow|null,scripts:results[2].data as ScriptRow[],sessions:results[3].data as SessionRow[],reports:results[4].data as ReportRow[],xp:results[5].data as XPRow[]};await this.persist();return true;}catch(e){this.update(this.local.snapshot,this.local.queue.length,e instanceof Error?e.message:String(e));return false;}})}
 async export(){return this.serialize(async()=>JSON.stringify(this.local,null,2))}
 async discardQueue(){if(!navigator.onLine)throw Error('Conecte-se para descartar e recuperar os dados do servidor.');return this.serialize(async()=>{this.local.queue=[];await this.persist()}).then(()=>this.sync())}
 async clear(){return this.serialize(async()=>{const d=await db();await d.delete('accounts',this.uid);this.local={snapshot:empty(),queue:[]};this.update(this.local.snapshot,0,'');})}
}
