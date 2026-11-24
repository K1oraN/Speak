import {AreaChart,Area,BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer,CartesianGrid} from 'recharts';

export function Chart({bar=false,period='Semanal',language='Todos'}:{bar?:boolean;period?:string;language?:string}) {
 const names=period==='Diária'?['8h','10h','12h','14h','16h','18h','20h']:period==='Mensal'?['Jun','Jul','Ago','Set','Out','Nov','Dez']:['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
 const factor=language==='Francês'?.8:language==='Espanhol'?.9:1;
 const data=[32,39,46,50,49,64,78].map((value,i)=>({name:names[i],valor:Math.round(value*factor)}));
 const axes=<><CartesianGrid stroke="var(--line)" vertical={false}/><XAxis dataKey="name" tick={{fill:'var(--muted)'}}/><YAxis domain={[0,100]} width={32} tick={{fill:'var(--muted)'}}/><Tooltip contentStyle={{background:'var(--surface)',color:'var(--ink)',borderColor:'var(--line)',borderRadius:12}}/></>;
 return <div className="chart" role="img" aria-label={`Gráfico de demonstração: ${period}, ${language}`}><ResponsiveContainer width="100%" height={190}>{bar?<BarChart data={data}>{axes}<Bar dataKey="valor" name="Minutos de exemplo" fill="#ae78e5" radius={[5,5,0,0]} isAnimationActive={false}/></BarChart>:<AreaChart data={data}>{axes}<Area type="monotone" dataKey="valor" name="Índice de exemplo" stroke="#9752d9" strokeWidth={3} fill="#b691e5" fillOpacity={.35} isAnimationActive={false}/></AreaChart>}</ResponsiveContainer></div>;
}
