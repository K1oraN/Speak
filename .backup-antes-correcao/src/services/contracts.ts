export type Language='Inglês'|'Francês'|'Espanhol'|string;
export type Level='A1'|'A2'|'B1'|'B2'|'C1'|'C2';
export type Stage={phrase:string;translation:string;pronunciation:string;reply?:string};
export type Script={id:string;title:string;language:Language;level:Level;category:string;description:string;image:string;stages:Stage[]};
export type Practice={language:Language;level:Level;scenario:string;custom:string;character:'Feminino'|'Masculino';voice:string;mode:'Livre'|'Guiada';captions:boolean;translation:boolean;pronunciation:boolean;suggestion:boolean};
