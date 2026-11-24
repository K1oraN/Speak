import type {Practice} from './contracts';
export const languages=['Inglês','Francês','Espanhol'];
export const levels=['A1','A2','B1','B2','C1','C2'] as const;
export const scenarios=[['Restaurante','restaurant','Faça pedidos, reservas e converse com o atendimento.'],['Aeroporto','airport','Check-in, bagagem, segurança e embarque.'],['Hotel','hotel','Reserve hospedagem e solicite serviços.'],['Turismo','tourism','Peça informações e descubra novos lugares.'],['Compras','shopping','Pergunte preços, tamanhos e formas de pagamento.'],['Transporte','transport','Compre bilhetes e peça direções.'],['Entrevista de emprego','interview','Apresente suas habilidades e experiência.'],['Conversação cotidiana','daily','Converse sobre assuntos do dia a dia.']] as const;
export const initialPractice:Practice={language:'Inglês',level:'A2',scenario:'Restaurante',custom:'',character:'Feminino',voice:'Voz feminina',mode:'Guiada',captions:true,translation:true,pronunciation:true,suggestion:false};
