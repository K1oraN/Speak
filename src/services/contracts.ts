export type Language='Inglês'|'Francês'|'Espanhol'|string;
export type Level='A1'|'A2'|'B1'|'B2'|'C1'|'C2';
export type Stage={phrase:string;translation:string;pronunciation:string;reply?:string};
export type Script={id:string;title:string;language:Language;level:Level;category:string;description:string;image:string;stages:Stage[]};
export type Practice={language:Language;level:Level;scenario:string;custom:string;character:'Feminino'|'Masculino';voice:string;mode:'Livre'|'Guiada';captions:boolean;translation:boolean;pronunciation:boolean;suggestion:boolean};
export type Report={title:string;language:Language;score:number|null;metrics:Partial<Record<string,number|null>>;strengths:string[];difficulties?:string[];recommendations:string[];corrections:{original:string;corrected:string;reason:string}[];xp:number|null;demo:boolean};
// Contratos para a fase 2. Nenhum adaptador real está implementado nesta fase.
export interface AuthService { signIn(email:string,password:string):Promise<{userId:string}>; signOut():Promise<void>; }
export interface AudioService { connect(source:'microphone'|'tab'):Promise<void>; disconnect():void; }
export interface ScriptService { list():Promise<Script[]>; save(script:Script):Promise<void>; }
export interface ReportService { import(report:Report):Promise<void>; }
