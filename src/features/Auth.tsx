import {useState,type FormEvent} from 'react';
import {Link} from 'react-router-dom';
import {Button,image} from '../components/ui';

export function Auth({mode,go}:{mode:string;go:(path:string)=>void}) {
 const register=mode==='cadastro',recover=mode==='recuperar';
 const [error,setError]=useState(''),[success,setSuccess]=useState(false),[visible,setVisible]=useState(false);
 const title=register?'Criar conta':recover?'Recuperar senha':'Entrar na sua conta';
 const submit=(event:FormEvent<HTMLFormElement>)=>{
  event.preventDefault();const form=new FormData(event.currentTarget);setError('');
  if(register&&form.get('password')!==form.get('confirm')){setError('As senhas precisam ser iguais.');return;}
  setSuccess(true);event.currentTarget.reset();
 };
 return <main className="auth immersive"><section className="auth-story"><h1>Bem-vindo(a) ao <em>SpeakUp</em></h1><p>Aprenda no seu ritmo, em contextos do dia a dia.</p><h3>Converse no idioma alvo</h3><p>Explore a experiência visual de Speaking e Listening.</p><img src={image('scene-pair')} alt="Tutora e aluno conversando em um restaurante"/></section><section className="auth-box"><div className="choices"><Link to="/login">Entrar</Link><Link to="/cadastro">Criar conta</Link></div><h1>{title}</h1><p>Formulário de demonstração. Nenhuma conta será criada, senha guardada ou mensagem enviada. Use dados fictícios.</p>{success?<div role="status" className="stack"><p className="positive">{recover?'Validação concluída. O envio de e-mail será disponibilizado na fase 2.':'Validação concluída. Acesso à demonstração disponível.'}</p><Button kind="primary" onClick={()=>go('/dashboard')}>Explorar demonstração</Button><Button onClick={()=>setSuccess(false)}>Voltar ao formulário</Button></div>:<form onSubmit={submit}>{register&&<label>Nome de demonstração<input name="name" required maxLength={50} autoComplete="off"/></label>}<label>E-mail<input name="email" type="email" required autoComplete="off" placeholder="aluno@example.com"/></label>{!recover&&<><label>Senha de exemplo<input name="password" type={visible?'text':'password'} minLength={8} maxLength={100} required autoComplete="off"/></label>{register&&<label>Confirmar senha<input name="confirm" type={visible?'text':'password'} minLength={8} required autoComplete="off"/></label>}<Button icon={visible?'hide':'eye'} onClick={()=>setVisible(!visible)}>{visible?'Ocultar senha':'Mostrar senha'}</Button><Link to="/recuperar">Esqueci minha senha</Link></>}{error&&<p className="error" role="alert">{error}</p>}<Button kind="primary" type="submit">{register?'Validar cadastro':recover?'Validar recuperação':'Validar entrada'}</Button></form>}<Button onClick={()=>go('/dashboard')}>Acessar demonstração sem conta</Button></section></main>;
}
