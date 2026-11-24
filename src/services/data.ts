import type {Practice,Report,Script,Stage} from './contracts';
export const languages=['Inglês','Francês','Espanhol'];
export const levels=['A1','A2','B1','B2','C1','C2'] as const;
export const scenarios=[['Restaurante','restaurant','Faça pedidos, reservas e converse com o atendimento.'],['Aeroporto','airport','Check-in, bagagem, segurança e embarque.'],['Hotel','hotel','Reserve hospedagem e solicite serviços.'],['Turismo','tourism','Peça informações e descubra novos lugares.'],['Compras','shopping','Pergunte preços, tamanhos e formas de pagamento.'],['Transporte','transport','Compre bilhetes e peça direções.'],['Entrevista de emprego','interview','Apresente suas habilidades e experiência.'],['Conversação cotidiana','daily','Converse sobre assuntos do dia a dia.']] as const;
export const initialPractice:Practice={language:'Inglês',level:'A2',scenario:'Restaurante',custom:'',character:'Feminino',voice:'Voz feminina',mode:'Guiada',captions:true,translation:true,pronunciation:true,suggestion:false};
export const metrics=['gramática','vocabulário','compreensão','contexto','fluidez','pronúncia'];
export const restaurantStages:Record<string,Stage[]>={
 Inglês:[
  {phrase:'Do you have a reservation?',translation:'Você tem uma reserva?',pronunciation:'Du iú hév a rezervêichan?',reply:'Yes, I have a reservation for two.'},
  {phrase:'Would you like to see the menu?',translation:'Gostaria de ver o cardápio?',pronunciation:'Wud iú láik tu sí dâ méniu?',reply:'Yes, please. Thank you.'},
  {phrase:'What would you like to order?',translation:'O que gostaria de pedir?',pronunciation:'Uót wud iú láik tu órder?',reply:'I would like the grilled fish, please.'},
  {phrase:'Would you like anything to drink?',translation:'Gostaria de algo para beber?',pronunciation:'Wud iú láik énithing tu drink?',reply:'Just some water, please.'},
  {phrase:'Would you like dessert?',translation:'Gostaria de sobremesa?',pronunciation:'Wud iú láik dizârt?',reply:'No, thank you. Could I have the bill?'},
  {phrase:'How would you like to pay?',translation:'Como gostaria de pagar?',pronunciation:'Háu wud iú láik tu pêi?',reply:'By card, please. Thank you!'}],
 Francês:[
  {phrase:'Vous avez une réservation ?',translation:'Você tem uma reserva?',pronunciation:'Vu zavê ün rezervassion?',reply:'Oui, pour deux personnes.'},
  {phrase:'Vous voulez voir la carte ?',translation:'Quer ver o cardápio?',pronunciation:'Vu vulê vuár la cart?',reply:'Oui, merci.'},
  {phrase:'Que voulez-vous commander ?',translation:'O que deseja pedir?',pronunciation:'Que vulê vu comandê?',reply:'Je voudrais le poisson, s’il vous plaît.'},
  {phrase:'Et comme boisson ?',translation:'E para beber?',pronunciation:'Ê com buasson?',reply:'De l’eau, s’il vous plaît.'},
  {phrase:'Un dessert ?',translation:'Uma sobremesa?',pronunciation:'An dessér?',reply:'Non, merci. L’addition, s’il vous plaît.'},
  {phrase:'Vous payez par carte ?',translation:'Vai pagar com cartão?',pronunciation:'Vu peiê par cart?',reply:'Oui, merci beaucoup.'}],
 Espanhol:[
  {phrase:'¿Tiene una reserva?',translation:'Você tem uma reserva?',pronunciation:'Tiêne una resérva?',reply:'Sí, para dos personas.'},
  {phrase:'¿Quiere ver la carta?',translation:'Quer ver o cardápio?',pronunciation:'Kiére ver la cárta?',reply:'Sí, gracias.'},
  {phrase:'¿Qué desea pedir?',translation:'O que deseja pedir?',pronunciation:'Kê desêa pedír?',reply:'Quisiera el pescado, por favor.'},
  {phrase:'¿Algo para beber?',translation:'Algo para beber?',pronunciation:'Algo para bebêr?',reply:'Agua, por favor.'},
  {phrase:'¿Desea un postre?',translation:'Deseja uma sobremesa?',pronunciation:'Desêa un pôstre?',reply:'No, gracias. La cuenta, por favor.'},
  {phrase:'¿Paga con tarjeta?',translation:'Vai pagar com cartão?',pronunciation:'Pága con tarhêta?',reply:'Sí, muchas gracias.'}]
};
const opening:Record<string,Stage>={Inglês:{phrase:'Hello! How can I help you?',translation:'Olá! Como posso ajudar?',pronunciation:'Helôu! Háu cân ai hélp iú?',reply:'Hello! I would like some information, please.'},Francês:{phrase:'Bonjour ! Comment puis-je vous aider ?',translation:'Olá! Como posso ajudar?',pronunciation:'Bonjur! Coman puíj vu zedê?',reply:'Bonjour ! Je voudrais des renseignements.'},Espanhol:{phrase:'¡Hola! ¿Cómo puedo ayudarle?',translation:'Olá! Como posso ajudar?',pronunciation:'Ôla! Cômo puêdo ayudárle?',reply:'Hola, quisiera información, por favor.'}};
export const demoScripts:Script[]=languages.flatMap((language,li)=>scenarios.map(([category,image,description],i)=>({id:`demo-${li}-${i}`,title:category,language,level:'A2',category,description,image,stages:category==='Restaurante'?restaurantStages[language]:[opening[language],{...restaurantStages[language][5],phrase:language==='Inglês'?'Is there anything else you need?':language==='Francês'?'Vous avez besoin d’autre chose ?':'¿Necesita algo más?',translation:'Precisa de mais alguma coisa?',pronunciation:language==='Inglês'?'Iz dér énithing éls iú níd?':language==='Francês'?'Vu zavê besoin dôtr shôz?':'Nesesíta algo más?',reply:language==='Inglês'?'No, thank you!':language==='Francês'?'Non, merci !':'¡No, gracias!'}]})));
export const demoReport:Report={title:'Restaurante',language:'Inglês',score:88,metrics:{'gramática':86,'vocabulário':90,'compreensão':92,'contexto':88,'fluidez':85,'pronúncia':null},strengths:['Boa compreensão das perguntas.','Uso de expressões de cortesia.'],difficulties:['Uso do verbo to be em expressões.'],recommendations:['Pratique expressões de cortesia.','Repita diálogos curtos no contexto de restaurante.'],corrections:[{original:'I am agree.',corrected:'I agree.',reason:'Agree não precisa do verbo to be.'}],xp:250,demo:true};
export type DemoSession={id:string;title:string;language:string;minutes:number;date:string;xp:number};
export const demoSessions:DemoSession[]=[{id:'s1',title:'Restaurante',language:'Inglês',minutes:12,date:'2026-11-24',xp:320},{id:'s2',title:'Aeroporto',language:'Inglês',minutes:15,date:'2026-11-23',xp:420},{id:'s3',title:'Hotel',language:'Espanhol',minutes:11,date:'2026-11-21',xp:280}];
