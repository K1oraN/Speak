# Teste isolado da prévia, sem rede, com Python + Playwright + Chromium.
from playwright.sync_api import sync_playwright
from pathlib import Path
import os
root=Path(__file__).resolve().parents[1]
bundle=(root/'preview/bundle.js').read_text().replace('const route=()=>location.pathname','const route=()=>window.__testRoute||"/"').replace("history.pushState(null,'',p);render()","window.__testRoute=p;render()")
routes=['/','/login','/cadastro','/recuperar','/dashboard','/pratica','/biblioteca','/explicacao','/conversacao','/relatorio/importar','/resultados','/evolucao','/historico','/ranking','/conquistas','/perfil']
with sync_playwright() as p:
 b=p.chromium.launch(executable_path=os.getenv('CHROMIUM_PATH','/usr/bin/chromium'),args=['--no-sandbox']); page=b.new_page(viewport={'width':1440,'height':900}); errs=[];page.on('pageerror',lambda e:errs.append(str(e)))
 page.set_content('<div id="root"></div>');page.add_style_tag(content=(root/'src/styles.css').read_text());page.add_script_tag(content=(root/'preview/vendor/react.js').read_text());page.add_script_tag(content=(root/'preview/vendor/react-dom.js').read_text());page.add_script_tag(content=bundle)
 def route(r):
  page.evaluate('(r)=>{window.__testRoute=r;window.dispatchEvent(new PopStateEvent("popstate"))}',r)
 for width in [1440,768,390]:
  page.set_viewport_size({'width':width,'height':900})
  for r in routes:
   route(r); assert page.locator('#root').inner_text().strip(),r
   overflow=page.evaluate('document.documentElement.scrollWidth>innerWidth')
   print(width,r,'overflow='+str(overflow))
 route('/perfil');page.get_by_role('button',name='Escuro',exact=True).click();assert page.evaluate('document.documentElement.dataset.theme')=='dark';page.get_by_role('button',name='Claro',exact=True).click();assert page.evaluate('document.documentElement.dataset.theme')=='light';print('Temas: OK')
 route('/relatorio/importar');page.get_by_role('button',name='Carregar exemplo').click();page.get_by_role('button',name='Validar JSON').click();assert page.get_by_text('Estrutura JSON válida').count();page.get_by_role('button',name='Confirmar importação').click();assert page.locator('h1').inner_text()=='Relatório de desempenho';print('Importação de relatório: OK')
 route('/pratica');print('Botões prática:',page.get_by_role('button').all_text_contents()[-8:]);print('Erros JS:',errs);assert not errs
 b.close()
