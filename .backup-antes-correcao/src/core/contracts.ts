import {z} from 'zod';
const text=z.string().trim().min(1).max(4000);
const optionalText=z.string().max(4000);
const id=z.string().uuid();
const list=z.array(text).max(50);
export const level=z.enum(['A1','A2','B1','B2','C1','C2']);
export const scriptSchema=z.object({schema_version:z.literal(1),script_id:id,language:text,level,scenario:text,title:text,description:text,estimated_minutes:z.number().int().min(1).max(240),steps:z.array(z.object({id:text,context:text,tutor_text:text,tutor_translation_pt:optionalText,tutor_pronunciation_pt:optionalText,student_suggestion:optionalText,student_translation_pt:optionalText,student_pronunciation_pt:optionalText,alternatives:list}).strict()).min(1).max(100),tutor_instructions:text}).strict().refine(s=>new Set(s.steps.map(x=>x.id)).size===s.steps.length,'IDs de etapas repetidos');
export const metricKeys=['grammar','vocabulary','listening_comprehension','contextual_appropriateness','perceived_fluency','pronunciation'] as const;
const score=z.number().min(0).max(100).nullable();
export const reportSchema=z.object({schema_version:z.literal(1),session_id:id,script_id:id.nullable(),language:text,level,scenario:text,completed:z.boolean(),assessment_source:z.literal('chatgpt_self_reported'),metrics:z.object({grammar:score,vocabulary:score,listening_comprehension:score,contextual_appropriateness:score,perceived_fluency:score,pronunciation:score}).strict(),overall_score:score,evidence:z.object({assessed_turns:z.number().int().min(0).max(10000),total_turns:z.number().int().min(0).max(10000),acoustic_evidence:z.boolean(),notes:optionalText}).strict(),corrections:z.array(z.object({original:text,corrected:text,explanation_pt:text}).strict()).max(100),strengths:list,difficulties:list,recommendations:list,limitations:list}).strict().superRefine((r,c)=>{if(r.evidence.assessed_turns>r.evidence.total_turns)c.addIssue({code:'custom',message:'Cobertura inválida'});if(r.metrics.pronunciation!==null&&(!r.evidence.acoustic_evidence||!r.evidence.notes.trim()))c.addIssue({code:'custom',message:'Pronúncia requer evidência acústica descrita'});if(!r.evidence.assessed_turns&&(r.overall_score!==null||Object.values(r.metrics).some(x=>x!==null)))c.addIssue({code:'custom',message:'Sem turnos avaliados, notas devem ser null'});if((!r.completed||r.evidence.assessed_turns<r.evidence.total_turns)&&!r.limitations.length)c.addIssue({code:'custom',message:'Descreva limitações do relatório parcial'});});
export type ScriptV1=z.infer<typeof scriptSchema>;
export type ReportV1=z.infer<typeof reportSchema>;
export const MAX_JSON=256*1024;
export function parseJSON<T>(raw:string,schema:z.ZodType<T>):T{if(new TextEncoder().encode(raw).length>MAX_JSON)throw Error('JSON excede 256 KiB');let value:unknown;try{value=JSON.parse(raw)}catch{throw Error('JSON inválido. Cole apenas o objeto, sem cercas Markdown.')}return schema.parse(value)}
export type SessionRow={id:string;user_id:string;script_id:string|null;language:string;level:string;scenario:string;mode:'guided'|'free'|'explanation';started_at:string;ended_at:string|null;active_seconds:number;paused_seconds:number;local_day:string;timezone:string;revision:number};
export type ReportRow={session_id:string;user_id:string;payload:ReportV1;original:string;created_at:string};
export type XPRow={session_id:string;user_id:string;points:number;local_day:string};
export {average,xpRule,localDay,streak} from './stats';
