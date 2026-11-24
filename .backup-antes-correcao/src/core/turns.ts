export type Phase='waiting'|'tutor'|'candidate'|'student'|'paused'|'ended';
export type Turn={phase:Phase;since:number;seen:boolean;responseAt:number;step:number;onSince:number|null;offSince:number|null};
export const initialTurn=(step=0,now=0):Turn=>({phase:'waiting',since:now,seen:false,responseAt:0,step,onSince:null,offSince:null});
export type TurnConfig={delayMs:number;threshold:number;guided:boolean;maxStep:number;frozen:boolean};
export function sampleTurn(t:Turn,rms:number,now:number,c:TurnConfig):Turn{
 if(t.phase==='paused'||t.phase==='ended')return t;
 const loud=rms>=c.threshold,quiet=rms<c.threshold*.65;
 const onSince=loud?(t.onSince??now):null,offSince=quiet?(t.offSince??now):null;
 let n={...t,onSince,offSince};
 const on=onSince!==null&&now-onSince>=100,off=offSince!==null&&now-offSince>=120;
 if(t.phase==='waiting'&&on)n={...n,phase:'tutor',seen:true,since:now};
 else if(t.phase==='tutor'&&off)n={...n,phase:'candidate',since:offSince??now};
 else if(t.phase==='candidate'){
  if(on)n={...n,phase:'tutor',since:now};
  else if(quiet&&offSince!==null&&now-offSince>=c.delayMs)n={...n,phase:'student',since:now,responseAt:now};
 }else if(t.phase==='student'&&on){const advance=t.seen&&(onSince??now)-t.responseAt>=350&&c.guided&&!c.frozen;n={...n,phase:'tutor',seen:true,since:now,step:advance?Math.min(c.maxStep,t.step+1):t.step};}
 return n;
}
