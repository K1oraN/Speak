(()=>{const R=window.React,D=window.ReactDOM;R.Fragment=R.Fragment||function Fragment(p){return p.children||null};const h=R.createElement;const modules={},cache={};let go;const route=()=>location.pathname;const Link=({to,children,onClick,className,...rest})=>h('a',{...rest,href:to,className,onClick:e=>{if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();onClick&&onClick();go(to)}},children);const NavLink=p=>h(Link,{...p,className:(p.className||'')+(route()===p.to?' active':'')});const paths={MessageCircle:'M21 11a8 8 0 0 1-8 8H8l-5 3 1-6a8 8 0 1 1 17-5Z',Home:'M3 10l9-7 9 7v11h-6v-7H9v7H3Z',Check:'m5 12 4 4L19 6',ArrowLeft:'M19 12H5m7-7-7 7 7 7',ArrowRight:'M5 12h14m-7-7 7 7-7 7',Play:'m8 4 13 8-13 8Z',Pause:'M9 4v16M15 4v16',X:'m5 5 14 14M19 5 5 19',Plus:'M12 5v14M5 12h14',Search:'M16 16l5 5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',Mic:'M9 4a3 3 0 0 1 6 0v8a3 3 0 0 1-6 0Zm-4 8a7 7 0 0 0 14 0M12 19v3',Heart:'M12 21 4 13C-3 5 7 0 12 7c5-7 15-2 8 6Z',Menu:'M3 6h18M3 12h18M3 18h18',Clock:'M12 7v5l4 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',Star:'m12 2 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1Z',BookOpen:'M3 4h7l2 2 2-2h7v16h-7l-2 2-2-2H3Z',User:'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 22v-3a8 8 0 0 1 16 0v3',ChartNoAxesColumnIncreasing:'M4 20v-5M10 20V9M16 20V4M22 20V2'};const icons=new Proxy({}, {get:(_,n)=>n==='__esModule'?false:({size=21,strokeWidth=1.9,...rest})=>h('svg',{width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth,strokeLinecap:'round',strokeLinejoin:'round',...rest},h('path',{d:paths[n]||'M12 2l9 5v10l-9 5-9-5V7Zm-4 10h8M12 8v8'}))});const passthrough=p=>h('div',null,p.children);const graph=bar=>p=>{const ds=p.data||[];const pts=ds.map((d,i)=>[36+i*51,140-d.value*1.25]);return h('svg',{viewBox:'0 0 380 170',width:'100%',height:170,role:'img','aria-label':'Gráfico de demonstração'},[30,60,90,120,150].map(y=>h('line',{key:y,x1:27,x2:375,y1:y,y2:y,stroke:'currentColor',opacity:.14})),bar?pts.map(([x,y],i)=>h('rect',{key:i,x:x-12,y,width:24,height:140-y,rx:5,fill:'#a67be7'})):h('g',null,h('path',{d:'M'+pts.map(p=>p.join(',')).join(' L')+' L342,140 L36,140 Z',fill:'#a67be7',opacity:.25}),h('polyline',{points:pts.map(p=>p.join(',')).join(' '),fill:'none',stroke:'#a65ae6',strokeWidth:3}),pts.map(([x,y],i)=>h('circle',{key:i,cx:x,cy:y,r:4,fill:'#a65ae6'}))),ds.map((d,i)=>h('text',{key:i,x:36+i*51,y:164,fill:'currentColor',textAnchor:'middle',fontSize:10},d.name)))};const extern={'react':R,'react-router-dom':{Link,NavLink},'lucide-react':icons,'motion/react':{motion:{div:({children,animate,transition,...props})=>h('div',props,children)}},'recharts':{ResponsiveContainer:passthrough,AreaChart:graph(false),BarChart:graph(true),Area:()=>null,Bar:()=>null,XAxis:()=>null,YAxis:()=>null,Tooltip:()=>null,CartesianGrid:()=>null}};function resolve(from,id){if(!id.startsWith('.'))return id;const a=from.split('/');a.pop();for(const x of id.split('/')){if(x==='..')a.pop();else if(x!=='.')a.push(x)}return a.join('/')}function req(id){if(id in extern)return extern[id];if(cache[id])return cache[id].exports;const mod={exports:{}};cache[id]=mod;modules[id](mod,mod.exports,x=>req(resolve(id,x)));return mod.exports;}

modules["App"]=function(module,exports,require){"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeakUp = void 0;
exports.default = App;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ui_1 = require("./components/ui");
const pages_1 = require("./features/pages");
const settings_1 = require("./features/settings");
const data_1 = require("./services/data");
const validation_1 = require("./services/validation");
class SpeakUp extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = { p: (0, validation_1.load)('practice', data_1.initialPractice), prefs: (0, validation_1.load)('prefs', settings_1.defaultPrefs), name: (0, validation_1.load)('name', 'Aluno'), languageList: (0, validation_1.load)('languages', data_1.languages), items: (0, validation_1.load)('scripts', data_1.scripts), favs: (0, validation_1.load)('favs', []), sessions: (0, validation_1.load)('sessions', data_1.sampleSessions), report: data_1.sampleReport, selectedScript: null, stages: (0, data_1.makeStages)('Inglês', 'Restaurante'), index: 0, role: 'tutor', paused: false, query: '', language: 'Todos', level: 'Todos', category: 'Todas', onlyFav: false, period: 'Semanal', evoLanguage: 'Todos', historyFilter: 'Todos', rankTab: 'Meu ranking', modal: null, toast: '', raw: '', error: '', preview: null, mobile: false, busy: false, helpText: '' };
        this.timer = 0;
        this.dialog = null;
        this.lastFocus = null;
        this.keys = (e) => { if (!this.state.modal)
            return; if (e.key === 'Escape')
            this.close(); if (e.key === 'Tab' && this.dialog) {
            const el = Array.from(this.dialog.querySelectorAll('button:not(:disabled),input,textarea,select,a[href]'));
            const first = el[0], last = el[el.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last?.focus();
            }
            else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first?.focus();
            }
        } };
        this.applyTheme = () => { document.documentElement.dataset.theme = this.state.prefs.theme === 'Escuro' ? 'dark' : this.state.prefs.theme === 'Claro' ? 'light' : 'system'; document.documentElement.dataset.reduce = String(this.state.prefs.reduced); };
        this.notify = (toast) => { window.clearTimeout(this.timer); this.setState({ toast }); this.timer = window.setTimeout(() => this.setState({ toast: '' }), 4500); };
        this.close = () => this.setState({ modal: null, error: '', raw: '', helpText: '' });
        this.go = (path) => { this.setState({ mobile: false, modal: null, error: '', raw: '', preview: null }); this.props.go(path); };
        this.update = (v) => this.setState(s => ({ p: { ...s.p, ...v }, selectedScript: v.scenario !== undefined || v.language !== undefined ? null : s.selectedScript }));
        this.prefs = (v) => this.setState(s => ({ prefs: { ...s.prefs, ...v } }));
        this.confirm = (title, body, action) => this.setState({ modal: { kind: 'confirm', title, body, action } });
        this.begin = (explain) => { const p = this.state.p; if (p.scenario === 'Personalizado' && !p.custom.trim()) {
            this.notify('Descreva o cenário personalizado antes de continuar.');
            return;
        } const stages = this.state.selectedScript?.stages ?? (p.mode === 'Livre' && !explain ? [] : (0, data_1.makeStages)(p.language, p.scenario)); this.setState({ stages, index: 0, role: 'tutor', paused: false }); this.go(explain ? '/explicacao' : '/conversacao'); };
        this.copy = async () => { const p = this.state.p; const text = `Você será meu tutor de ${p.language}, nível ${p.level}. Cenário: ${p.scenario === 'Personalizado' ? p.custom : p.scenario}. Conversa ${p.mode.toLowerCase()}. Priorize fala e compreensão auditiva, aguarde minha resposta e corrija apenas erros relevantes. Ao terminar, gere relatório JSON conforme modelo do SpeakUp. Não invente métricas não avaliadas.`; try {
            await navigator.clipboard.writeText(text);
            this.notify('Instruções copiadas. Cole no ChatGPT quando desejar.');
        }
        catch {
            this.setState({ modal: { kind: 'import' }, raw: text, error: 'Não foi possível copiar automaticamente. Selecione o texto para copiar manualmente.' });
        } };
        this.importScript = () => this.setState({ modal: { kind: 'import' }, raw: '', error: '' });
        this.readFile = async (file) => { if (!file)
            return; if (file.size > 2000000) {
            this.setState({ error: 'Arquivo excede 2 MB.' });
            return;
        } this.setState({ busy: true, error: '' }); try {
            const raw = await file.text();
            this.setState({ raw, preview: null });
        }
        catch {
            this.setState({ error: 'Não foi possível ler o arquivo.' });
        }
        finally {
            this.setState({ busy: false });
        } };
        this.validateReport = () => { try {
            this.setState({ preview: (0, validation_1.parseReport)(this.state.raw), error: '' });
        }
        catch (e) {
            this.setState({ preview: null, error: e instanceof Error ? e.message : 'JSON inválido.' });
        } };
        this.saveReport = () => { const report = this.state.preview; if (!report)
            return; const session = { id: 'import-' + Date.now(), title: report.title, language: report.language, date: new Date().toISOString().slice(0, 10), minutes: 0, report }; this.setState(s => ({ report, sessions: [session, ...s.sessions] })); this.go('/resultados'); this.notify('Relatório importado localmente.'); };
    }
    componentDidMount() { document.addEventListener('keydown', this.keys); this.applyTheme(); }
    componentWillUnmount() { document.removeEventListener('keydown', this.keys); window.clearTimeout(this.timer); }
    componentDidUpdate(prev, old) { for (const [key, val, before] of [['practice', this.state.p, old.p], ['prefs', this.state.prefs, old.prefs], ['name', this.state.name, old.name], ['languages', this.state.languageList, old.languageList], ['scripts', this.state.items, old.items], ['favs', this.state.favs, old.favs], ['sessions', this.state.sessions, old.sessions]])
        if (val !== before)
            (0, validation_1.save)(key, val); if (old.prefs !== this.state.prefs)
        this.applyTheme(); if (prev.path !== this.props.path) {
        window.scrollTo(0, 0);
        document.title = `SpeakUp — ${this.props.path === '/' ? 'Aprenda idiomas conversando' : this.props.path.split('/').filter(Boolean).join(' · ')}`;
    } if (!old.modal && this.state.modal) {
        this.lastFocus = document.activeElement;
        this.dialog?.querySelector('button,input,textarea')?.focus();
    } if (old.modal && !this.state.modal)
        this.lastFocus?.focus(); }
    renderModal() { const m = this.state.modal; if (!m)
        return null; return react_1.default.createElement("div", { className: "modal-overlay", onMouseDown: e => { if (e.target === e.currentTarget)
            this.close(); } },
        react_1.default.createElement("div", { className: "modal", role: "dialog", "aria-modal": "true", "aria-label": "Janela de a\u00E7\u00E3o", ref: el => { this.dialog = el; } },
            react_1.default.createElement("button", { className: "icon-btn modal-close", "aria-label": "Fechar", onClick: this.close },
                react_1.default.createElement(ui_1.Icon, { name: "close" })),
            m.kind === 'confirm' ? react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("h2", null, m.title),
                react_1.default.createElement("p", null, m.body),
                react_1.default.createElement("div", { className: "card-actions" },
                    react_1.default.createElement(ui_1.Button, { onClick: this.close }, "Cancelar"),
                    react_1.default.createElement(ui_1.Button, { kind: "danger", onClick: () => { this.close(); m.action(); } }, "Confirmar"))) : m.kind === 'script' ? react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("h2", null, m.script.title),
                react_1.default.createElement("p", null,
                    (0, ui_1.flag)(m.script.language),
                    " ",
                    m.script.language,
                    " \u00B7 ",
                    m.script.level),
                react_1.default.createElement("p", null, m.script.description),
                react_1.default.createElement("ol", null, m.script.stages.map((s, i) => react_1.default.createElement("li", { key: i },
                    s.phrase,
                    react_1.default.createElement("small", null, s.translation)))),
                react_1.default.createElement(ui_1.Button, { kind: "primary", icon: "play", onClick: () => { this.setState({ selectedScript: m.script, p: { ...this.state.p, language: m.script.language, level: m.script.level, scenario: m.script.title, mode: 'Guiada' } }); this.go('/pratica'); } }, "Usar roteiro")) : m.kind === 'import' ? react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("h2", null, "Importar roteiro JSON"),
                react_1.default.createElement("input", { type: "file", accept: ".json,application/json", onChange: e => void this.readFile(e.target.files?.[0]) }),
                react_1.default.createElement("textarea", { "aria-label": "Roteiro JSON", rows: 8, value: this.state.raw, onChange: e => this.setState({ raw: e.target.value, error: '' }) }),
                react_1.default.createElement("a", { href: "/assets/roteiro-exemplo.json", download: true }, "Baixar modelo JSON"),
                this.state.error && react_1.default.createElement("p", { className: "error", role: "alert" }, this.state.error),
                react_1.default.createElement(ui_1.Button, { kind: "primary", disabled: this.state.busy, onClick: () => { try {
                        const s = (0, validation_1.parseScript)(this.state.raw);
                        this.setState(old => ({ items: [s, ...old.items], selectedScript: s, p: { ...old.p, language: s.language, level: s.level, scenario: s.title, mode: 'Guiada' }, modal: null }));
                        this.notify('Roteiro importado.');
                        this.go('/pratica');
                    }
                    catch (e) {
                        this.setState({ error: e instanceof Error ? e.message : 'JSON inválido.' });
                    } } }, "Validar e importar")) : m.kind === 'language' ? react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("h2", null, "Adicionar idioma"),
                react_1.default.createElement("form", { onSubmit: e => { e.preventDefault(); const l = this.state.raw.trim(); if (!l)
                        return; this.setState(s => ({ languageList: [...new Set([...s.languageList, l])], p: { ...s.p, language: l }, modal: null, raw: '' })); this.notify('Idioma adicionado. Roteiros adicionais dependem da fase 2 ou importação.'); } },
                    react_1.default.createElement("label", null,
                        "Nome do idioma",
                        react_1.default.createElement("input", { value: this.state.raw, required: true, onChange: e => this.setState({ raw: e.target.value }) })),
                    react_1.default.createElement(ui_1.Button, { type: "submit", kind: "primary" }, "Adicionar"))) : m.kind === 'help' ? react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("h2", null, "D\u00FAvida em portugu\u00EAs"),
                react_1.default.createElement("p", null, "Digite sua d\u00FAvida para preparar uma pergunta. N\u00E3o h\u00E1 resposta autom\u00E1tica nesta fase."),
                react_1.default.createElement("textarea", { "aria-label": "Sua d\u00FAvida", value: this.state.helpText, onChange: e => this.setState({ helpText: e.target.value }) }),
                react_1.default.createElement(ui_1.Button, { kind: "primary", onClick: () => { this.close(); this.notify('Dúvida encerrada. Respostas inteligentes serão integradas na fase 2.'); } }, "Concluir")) : react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("h2", null, "Notifica\u00E7\u00F5es"),
                react_1.default.createElement("p", null, "Nenhuma notifica\u00E7\u00E3o real. Aqui aparecer\u00E3o lembretes e novidades na fase 2."),
                react_1.default.createElement(ui_1.Button, { onClick: this.close }, "Fechar")))); }
    render() {
        const s = this.state, path = this.props.path, go = this.go;
        const publicPage = ['/', '/login', '/cadastro', '/recuperar'].includes(path);
        const light = path === '/dashboard';
        const practiceProps = { p: s.p, update: this.update, go, copy: () => void this.copy(), importFile: this.importScript, begin: this.begin, addLanguage: () => this.setState({ modal: { kind: 'language' }, raw: '' }), languageList: s.languageList };
        let content;
        switch (path) {
            case '/':
                content = react_1.default.createElement(pages_1.Landing, { go: go });
                break;
            case '/login':
            case '/cadastro':
            case '/recuperar':
                content = react_1.default.createElement(pages_1.Auth, { key: path, mode: path.slice(1), go: go, onSuccess: name => { if (path === '/recuperar') {
                        this.notify('Simulação concluída. Nenhum e-mail foi enviado.');
                        go('/login');
                    }
                    else {
                        this.setState({ name });
                        go('/dashboard');
                        this.notify('Perfil demonstrativo. Nenhuma autenticação realizada.');
                    } } });
                break;
            case '/dashboard':
                content = react_1.default.createElement(pages_1.Dashboard, { go: go, name: s.name, sessions: s.sessions });
                break;
            case '/pratica':
                content = react_1.default.createElement(pages_1.PracticeConfig, { ...practiceProps });
                break;
            case '/biblioteca':
                content = react_1.default.createElement(pages_1.Library, { items: s.items, query: s.query, setQuery: query => this.setState({ query }), language: s.language, setLanguage: language => this.setState({ language }), level: s.level, setLevel: level => this.setState({ level }), category: s.category, setCategory: category => this.setState({ category }), favs: s.favs, onlyFav: s.onlyFav, setOnlyFav: onlyFav => this.setState({ onlyFav }), flip: id => this.setState(old => ({ favs: old.favs.includes(id) ? old.favs.filter(x => x !== id) : [...old.favs, id] })), open: script => this.setState({ modal: { kind: 'script', script } }), remove: script => this.confirm('Excluir roteiro?', script.title, () => { this.setState(old => ({ items: old.items.filter(x => x.id !== script.id), favs: old.favs.filter(x => x !== script.id) })); this.notify('Roteiro excluído.'); }), importFile: this.importScript });
                break;
            case '/explicacao':
            case '/conversacao':
                content = react_1.default.createElement(pages_1.SessionPage, { p: s.p, stages: s.stages, index: s.index, role: s.role, paused: s.paused, explain: path === '/explicacao', update: this.update, step: n => this.setState(old => ({ index: Math.max(0, Math.min(old.stages.length - 1, old.index + n)), role: 'tutor', paused: false })), setRole: role => this.setState({ role, paused: false }), pause: () => this.setState(old => ({ paused: !old.paused })), help: () => this.setState({ modal: { kind: 'help' }, helpText: '' }), repeat: () => { this.setState({ role: 'tutor', paused: false }); this.notify('Frase reapresentada visualmente. Áudio real: fase 2.'); }, end: () => this.confirm('Encerrar sessão?', 'Nenhuma nota ou XP será gerado nesta fase.', () => go(path === '/explicacao' ? '/pratica' : '/relatorio/importar')), go: go });
                break;
            case '/relatorio/importar':
                content = react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(ui_1.PageTitle, { title: "Importar relat\u00F3rio de desempenho", icon: "upload", subtitle: "Carregue um JSON ou cole o conte\u00FAdo. Nenhuma avalia\u00E7\u00E3o autom\u00E1tica \u00E9 realizada.", back: () => go('/dashboard') }),
                    react_1.default.createElement("div", { className: "grid2" },
                        react_1.default.createElement(ui_1.Panel, { title: "Arquivo ou texto JSON" },
                            react_1.default.createElement("label", { className: "dropzone" },
                                react_1.default.createElement(ui_1.Icon, { name: "upload", size: 40 }),
                                "Selecione um arquivo JSON",
                                react_1.default.createElement("input", { type: "file", accept: ".json,application/json", onChange: e => void this.readFile(e.target.files?.[0]) })),
                            react_1.default.createElement("textarea", { rows: 12, "aria-label": "Texto JSON", placeholder: "Cole o relat\u00F3rio aqui...", value: s.raw, onChange: e => this.setState({ raw: e.target.value, preview: null, error: '' }) }),
                            react_1.default.createElement("div", { className: "card-actions" },
                                react_1.default.createElement(ui_1.Button, { kind: "primary", disabled: s.busy || !s.raw.trim(), onClick: this.validateReport }, s.busy ? 'Carregando…' : 'Validar JSON'),
                                react_1.default.createElement(ui_1.Button, { onClick: () => this.setState({ raw: JSON.stringify(data_1.sampleReport, null, 2), preview: null, error: '' }) }, "Carregar exemplo"),
                                react_1.default.createElement("a", { href: "/assets/relatorio-exemplo.json", download: true }, "Modelo JSON")),
                            s.error && react_1.default.createElement("p", { role: "alert", className: "error" }, s.error)),
                        react_1.default.createElement(ui_1.Panel, { title: "Pr\u00E9via do relat\u00F3rio", icon: "eye" }, s.preview ? react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement("p", { className: "positive" }, "\u2713 Estrutura JSON v\u00E1lida"),
                            react_1.default.createElement("h2", null, s.preview.title),
                            react_1.default.createElement("p", null,
                                s.preview.language,
                                " \u00B7 Nota: ",
                                s.preview.score ?? 'Não avaliada'),
                            react_1.default.createElement("p", null, s.preview.demo ? 'Relatório fictício de exemplo.' : 'Dados fornecidos pelo usuário; não verificados.'),
                            react_1.default.createElement(ui_1.Button, { kind: "primary", icon: "check", onClick: this.saveReport }, "Confirmar importa\u00E7\u00E3o")) : react_1.default.createElement("div", { className: "empty" },
                            react_1.default.createElement(ui_1.Icon, { name: "file", size: 44 }),
                            react_1.default.createElement("p", null, "Aguardando um relat\u00F3rio v\u00E1lido.")))),
                    react_1.default.createElement(ui_1.Button, { onClick: () => { this.setState({ report: data_1.sampleReport }); go('/resultados'); } }, "Ver resultados de exemplo"));
                break;
            case '/resultados':
                content = react_1.default.createElement(pages_1.Results, { report: s.report, go: go });
                break;
            case '/evolucao':
                content = react_1.default.createElement(pages_1.Evolution, { period: s.period, setPeriod: period => this.setState({ period }), language: s.evoLanguage, setLanguage: evoLanguage => this.setState({ evoLanguage }) });
                break;
            case '/historico':
                content = react_1.default.createElement(pages_1.History, { sessions: s.sessions, filter: s.historyFilter, setFilter: historyFilter => this.setState({ historyFilter }), open: session => { this.setState({ report: session.report }); go('/resultados'); }, remove: session => this.confirm('Excluir sessão?', session.title, () => { this.setState(old => ({ sessions: old.sessions.filter(x => x.id !== session.id) })); this.notify('Sessão removida.'); }), go: go });
                break;
            case '/ranking':
            case '/conquistas':
                content = react_1.default.createElement(pages_1.Ranking, { tab: s.rankTab, setTab: rankTab => this.setState({ rankTab }), achievements: path === '/conquistas' });
                break;
            case '/perfil':
                content = react_1.default.createElement(settings_1.Settings, { prefs: s.prefs, update: this.prefs, p: s.p, updatePractice: this.update, name: s.name, setName: name => this.setState({ name }), notify: this.notify, reset: () => this.confirm('Restaurar dados locais?', 'Roteiros importados, favoritos e relatórios serão substituídos pelas amostras.', () => { this.setState({ items: data_1.scripts, favs: [], sessions: data_1.sampleSessions, p: data_1.initialPractice, prefs: settings_1.defaultPrefs, name: 'Aluno', languageList: data_1.languages }); this.notify('Dados de demonstração restaurados.'); }) });
                break;
            default: content = react_1.default.createElement(ui_1.Panel, { title: "P\u00E1gina n\u00E3o encontrada" },
                react_1.default.createElement(ui_1.Button, { onClick: () => go('/dashboard') }, "Voltar ao in\u00EDcio"));
        }
        return react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("a", { className: "skip", href: "#main" }, "Pular para conte\u00FAdo"),
            react_1.default.createElement(ui_1.Header, { go: go, publicPage: publicPage, notify: () => this.setState({ modal: { kind: 'notifications' } }), menu: () => this.setState(old => ({ mobile: !old.mobile })) }),
            publicPage ? react_1.default.createElement("div", { id: "main" }, content) : react_1.default.createElement("div", { className: 'app-layout ' + (light ? 'dashboard-layout' : '') },
                react_1.default.createElement(ui_1.Sidebar, { go: go, mobile: s.mobile, close: () => this.setState({ mobile: false }) }),
                react_1.default.createElement("main", { id: "main", className: 'workspace ' + (light ? 'light-workspace' : 'immersive') },
                    react_1.default.createElement("div", { className: "demo-banner" },
                        react_1.default.createElement(ui_1.Icon, { name: "info", size: 16 }),
                        " Fase 1 \u00B7 Demonstra\u00E7\u00E3o visual \u00B7 Nenhuma captura ou IA conectada"),
                    content)),
            s.toast && react_1.default.createElement("div", { role: "status", className: "toast" },
                react_1.default.createElement(ui_1.Icon, { name: "info" }),
                s.toast,
                react_1.default.createElement("button", { className: "icon-btn", "aria-label": "Dispensar", onClick: () => this.setState({ toast: '' }) },
                    react_1.default.createElement(ui_1.Icon, { name: "close" }))),
            this.renderModal());
    }
}
exports.SpeakUp = SpeakUp;
function App() { const location = (0, react_router_dom_1.useLocation)(); const navigate = (0, react_router_dom_1.useNavigate)(); return react_1.default.createElement(SpeakUp, { path: location.pathname, go: navigate }); }

};
modules["components/ui"]=function(module,exports,require){"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sideLinks = exports.image = exports.flag = exports.icons = void 0;
exports.Icon = Icon;
exports.Logo = Logo;
exports.Button = Button;
exports.Panel = Panel;
exports.Toggle = Toggle;
exports.Choice = Choice;
exports.PageTitle = PageTitle;
exports.Header = Header;
exports.Sidebar = Sidebar;
exports.Progress = Progress;
exports.Wave = Wave;
exports.Character = Character;
exports.Chart = Chart;
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
const react_router_dom_1 = require("react-router-dom");
const react_2 = require("motion/react");
const recharts_1 = require("recharts");
exports.icons = { chat: lucide_react_1.MessageCircle, layers: lucide_react_1.Layers, compass: lucide_react_1.Compass, book: lucide_react_1.BookOpen, bell: lucide_react_1.Bell, down: lucide_react_1.ChevronDown, home: lucide_react_1.Home, chart: lucide_react_1.ChartNoAxesColumnIncreasing, history: lucide_react_1.History, trophy: lucide_react_1.Trophy, award: lucide_react_1.Award, settings: lucide_react_1.Settings, mic: lucide_react_1.Mic, globe: lucide_react_1.Globe, back: lucide_react_1.ArrowLeft, next: lucide_react_1.ArrowRight, play: lucide_react_1.Play, heart: lucide_react_1.Heart, search: lucide_react_1.Search, headphones: lucide_react_1.Headphones, check: lucide_react_1.Check, clock: lucide_react_1.Clock, star: lucide_react_1.Star, flame: lucide_react_1.Flame, restaurant: lucide_react_1.Utensils, airport: lucide_react_1.Plane, hotel: lucide_react_1.Hotel, tourism: lucide_react_1.Camera, shopping: lucide_react_1.ShoppingBag, transport: lucide_react_1.Bus, interview: lucide_react_1.Briefcase, daily: lucide_react_1.MessageCircle, sound: lucide_react_1.Volume2, translate: lucide_react_1.Languages, caption: lucide_react_1.Subtitles, pause: lucide_react_1.Pause, repeat: lucide_react_1.RotateCcw, help: lucide_react_1.HelpCircle, stop: lucide_react_1.Square, sync: lucide_react_1.RefreshCw, upload: lucide_react_1.Upload, copy: lucide_react_1.Copy, user: lucide_react_1.User, mail: lucide_react_1.Mail, lock: lucide_react_1.Lock, eye: lucide_react_1.Eye, hide: lucide_react_1.EyeOff, sun: lucide_react_1.Sun, moon: lucide_react_1.Moon, monitor: lucide_react_1.Monitor, sliders: lucide_react_1.SlidersHorizontal, target: lucide_react_1.Target, menu: lucide_react_1.Menu, close: lucide_react_1.X, plus: lucide_react_1.Plus, trash: lucide_react_1.Trash2, info: lucide_react_1.Info, file: lucide_react_1.FileText, success: lucide_react_1.CheckCircle, error: lucide_react_1.AlertCircle, login: lucide_react_1.LogIn, register: lucide_react_1.UserPlus, sparkles: lucide_react_1.Sparkles };
function Icon({ name, size = 21 }) { const C = exports.icons[name]; return react_1.default.createElement(C, { size: size, strokeWidth: 1.9, "aria-hidden": "true" }); }
function Logo() { return react_1.default.createElement(react_router_dom_1.Link, { className: "logo", to: "/" },
    react_1.default.createElement("span", { className: "logo-mark" },
        react_1.default.createElement("i", null),
        react_1.default.createElement("i", null)),
    "SpeakUp"); }
const flag = (l) => ({ Inglês: '🇬🇧', Francês: '🇫🇷', Espanhol: '🇪🇸' }[l] ?? '🌐');
exports.flag = flag;
const image = (name) => `/assets/${name}.webp`;
exports.image = image;
function Button({ children, icon, onClick, kind = 'secondary', type = 'button', disabled = false }) { return react_1.default.createElement("button", { type: type, className: 'btn ' + kind, onClick: onClick, disabled: disabled },
    icon && react_1.default.createElement(Icon, { name: icon }),
    " ",
    children); }
function Panel({ title, icon, children, className = '' }) { return react_1.default.createElement("section", { className: 'panel ' + className },
    title && react_1.default.createElement("h3", null,
        icon && react_1.default.createElement(Icon, { name: icon }),
        " ",
        title),
    children); }
function Toggle({ label, detail, checked, onChange, icon }) { return react_1.default.createElement("label", { className: "toggle-row" },
    icon && react_1.default.createElement(Icon, { name: icon }),
    react_1.default.createElement("span", null,
        react_1.default.createElement("b", null, label),
        detail && react_1.default.createElement("small", null, detail)),
    react_1.default.createElement("input", { type: "checkbox", role: "switch", checked: checked, onChange: e => onChange(e.target.checked) }),
    react_1.default.createElement("span", { className: "switch" })); }
function Choice({ items, value, onChange }) { return react_1.default.createElement("div", { className: "choices" }, items.map(i => react_1.default.createElement("button", { key: i, "aria-pressed": value === i, className: value === i ? 'selected' : '', onClick: () => onChange(i) }, i))); }
function PageTitle({ title, subtitle, icon, back }) { return react_1.default.createElement("div", { className: "page-title" },
    back && react_1.default.createElement(Button, { icon: "back", onClick: back }, "Voltar"),
    icon && react_1.default.createElement("span", { className: "title-icon" },
        react_1.default.createElement(Icon, { name: icon, size: 28 })),
    react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, title),
        subtitle && react_1.default.createElement("p", null, subtitle))); }
exports.sideLinks = [['/dashboard', 'Início', 'home'], ['/pratica', 'Praticar', 'chat'], ['/biblioteca', 'Roteiros', 'layers'], ['/evolucao', 'Minha evolução', 'chart'], ['/historico', 'Histórico', 'history'], ['/ranking', 'Ranking', 'trophy'], ['/conquistas', 'Conquistas', 'award'], ['/perfil', 'Configurações', 'settings']];
function Header({ go, notify, menu, publicPage = false }) { return react_1.default.createElement("header", { className: "topbar" },
    react_1.default.createElement(Logo, null),
    react_1.default.createElement("span", { className: "tagline" }, "Aprenda idiomas conversando."),
    react_1.default.createElement("nav", null, publicPage ? react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("a", { href: "#beneficios" }, "Recursos"),
        react_1.default.createElement("a", { href: "#cenarios" }, "Roteiros"),
        react_1.default.createElement(react_router_dom_1.Link, { to: "/login" }, "Entrar"),
        react_1.default.createElement(react_router_dom_1.Link, { className: "btn primary", to: "/cadastro" }, "Criar conta")) : react_1.default.createElement(react_1.default.Fragment, null, [['/pratica', 'Conversar', 'chat'], ['/biblioteca', 'Trilhas', 'layers'], ['/evolucao', 'Explorar', 'compass'], ['/biblioteca', 'Biblioteca', 'book']].map(([url, label, ic]) => react_1.default.createElement(react_router_dom_1.NavLink, { key: label, to: url },
        react_1.default.createElement(Icon, { name: ic }),
        label)))),
    !publicPage && react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("button", { className: "icon-btn", "aria-label": "Notifica\u00E7\u00F5es", onClick: notify },
            react_1.default.createElement(Icon, { name: "bell" })),
        react_1.default.createElement("button", { className: "avatar", "aria-label": "Perfil", onClick: () => go('/perfil') },
            react_1.default.createElement("img", { src: (0, exports.image)('student'), alt: "" })),
        react_1.default.createElement("button", { className: "icon-btn mobile-menu", "aria-label": "Menu", onClick: menu },
            react_1.default.createElement(Icon, { name: "menu" })))); }
function Sidebar({ go, mobile, close }) { return react_1.default.createElement("aside", { className: 'sidebar ' + (mobile ? 'open' : '') },
    react_1.default.createElement(Logo, null),
    react_1.default.createElement("button", { className: "icon-btn mobile-menu", onClick: close, "aria-label": "Fechar menu" },
        react_1.default.createElement(Icon, { name: "close" })),
    react_1.default.createElement("nav", null, exports.sideLinks.map(([url, label, ic]) => react_1.default.createElement(react_router_dom_1.NavLink, { to: url, key: url, onClick: close },
        react_1.default.createElement(Icon, { name: ic }),
        label))),
    react_1.default.createElement("div", { className: "side-bottom" },
        react_1.default.createElement("small", null, "AMBIENTE DEMONSTRATIVO"),
        react_1.default.createElement(Button, { icon: "back", onClick: () => go('/') }, "P\u00E1gina inicial"))); }
function Progress({ value }) { return react_1.default.createElement("div", { className: "progress", role: "progressbar", "aria-valuenow": value, "aria-valuemin": 0, "aria-valuemax": 100 },
    react_1.default.createElement("span", { style: { width: `${Math.max(0, Math.min(100, value))}%` } })); }
function Wave({ active = false }) { return react_1.default.createElement("span", { className: 'wave ' + (active ? 'active' : ''), "aria-hidden": "true" }, [10, 21, 13, 29, 17, 25, 12, 19, 9].map((n, i) => react_1.default.createElement("i", { key: i, style: { height: n, animationDelay: `${i * .09}s` } }))); }
function Character({ type, state, role = type }) { return react_1.default.createElement("div", { className: 'character ' + role + ' ' + type + '-portrait ' + (state === 'Falando' ? 'speaking' : '') },
    react_1.default.createElement(react_2.motion.div, { className: "portrait", animate: { y: state === 'Falando' ? [0, -3, 0] : 0 }, transition: { duration: 1.2, repeat: state === 'Falando' ? Infinity : 0 } },
        react_1.default.createElement("img", { src: (0, exports.image)(type), alt: type === 'tutor' ? 'Personagem tutor ilustrado' : 'Personagem aluno ilustrado' }),
        react_1.default.createElement("span", { className: "mouth", "aria-hidden": "true" })),
    react_1.default.createElement("div", { className: "character-label" },
        react_1.default.createElement(Icon, { name: role === 'tutor' ? 'mic' : 'user' }),
        react_1.default.createElement("b", null, role === 'tutor' ? 'Tutor' : 'Você (Aluno)'),
        react_1.default.createElement("span", null, state),
        react_1.default.createElement(Wave, { active: state === 'Falando' }))); }
function Chart({ bar = false, period = 'Semanal' }) { const values = period === 'Diária' ? [12, 20, 16, 27, 22, 35, 45] : period === 'Mensal' ? [28, 43, 39, 53, 61, 67, 86] : [32, 39, 46, 50, 49, 64, 78]; const data = values.map((value, i) => ({ name: (period === 'Diária' ? ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'] : period === 'Mensal' ? ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'] : ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7'])[i], value })); return react_1.default.createElement("div", { className: "chart", "aria-label": "Gr\u00E1fico demonstrativo de evolu\u00E7\u00E3o" },
    react_1.default.createElement(recharts_1.ResponsiveContainer, { width: "100%", height: 170 }, bar ? react_1.default.createElement(recharts_1.BarChart, { data: data },
        react_1.default.createElement(recharts_1.CartesianGrid, { strokeOpacity: .16, vertical: false }),
        react_1.default.createElement(recharts_1.XAxis, { dataKey: "name" }),
        react_1.default.createElement(recharts_1.YAxis, null),
        react_1.default.createElement(recharts_1.Tooltip, null),
        react_1.default.createElement(recharts_1.Bar, { dataKey: "value", fill: "#a67be7", radius: [6, 6, 0, 0] })) : react_1.default.createElement(recharts_1.AreaChart, { data: data },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("linearGradient", { id: "chartfill", x1: "0", y1: "0", x2: "0", y2: "1" },
                react_1.default.createElement("stop", { offset: "0%", stopColor: "#a06ae7", stopOpacity: .65 }),
                react_1.default.createElement("stop", { offset: "100%", stopColor: "#a06ae7", stopOpacity: .05 }))),
        react_1.default.createElement(recharts_1.CartesianGrid, { strokeOpacity: .15, vertical: false }),
        react_1.default.createElement(recharts_1.XAxis, { dataKey: "name" }),
        react_1.default.createElement(recharts_1.YAxis, null),
        react_1.default.createElement(recharts_1.Tooltip, null),
        react_1.default.createElement(recharts_1.Area, { type: "monotone", dataKey: "value", stroke: "#9b55db", strokeWidth: 3, fill: "url(#chartfill)", dot: { r: 4 } })))); }

};
modules["features/pages"]=function(module,exports,require){"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Landing = Landing;
exports.Auth = Auth;
exports.Dashboard = Dashboard;
exports.PracticeConfig = PracticeConfig;
exports.Library = Library;
exports.SessionPage = SessionPage;
exports.Results = Results;
exports.Evolution = Evolution;
exports.History = History;
exports.Ranking = Ranking;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ui_1 = require("../components/ui");
const data_1 = require("../services/data");
function Landing({ go }) { return react_1.default.createElement("main", { className: "landing" },
    react_1.default.createElement("section", { className: "landing-hero" },
        react_1.default.createElement("img", { className: "landing-person left", src: (0, ui_1.image)('landing-tutor'), alt: "Tutora ilustrada" }),
        react_1.default.createElement("div", { className: "landing-copy" },
            react_1.default.createElement("span", { className: "eyebrow" }, "\u25CF Ingl\u00EAs, Espanhol, Franc\u00EAs e muito mais"),
            react_1.default.createElement("h1", null,
                "Aprenda idiomas ",
                react_1.default.createElement("em", null, "conversando.")),
            react_1.default.createElement("p", null, "Pratique sua fala e sua escuta em conversas reais e naturais, com a intelig\u00EAncia conversacional do ChatGPT, adaptada ao seu aprendizado."),
            react_1.default.createElement(ui_1.Button, { kind: "primary", icon: "play", onClick: () => go('/cadastro') }, "Come\u00E7ar agora"),
            " ",
            react_1.default.createElement(ui_1.Button, { icon: "login", onClick: () => go('/login') }, "Entrar"),
            react_1.default.createElement("small", null, "\u2713 Experi\u00EAncia visual de demonstra\u00E7\u00E3o \u00B7 sem integra\u00E7\u00E3o ativa")),
        react_1.default.createElement("div", { className: "landing-demo" },
            react_1.default.createElement("div", { className: "eyebrow" }, "\uD83C\uDDEC\uD83C\uDDE7 Pr\u00E1tica de ingl\u00EAs \u00B7 Restaurante"),
            react_1.default.createElement("div", { className: "bubble tutor-bubble" },
                react_1.default.createElement("b", null,
                    "Tutor ",
                    react_1.default.createElement(ui_1.Wave, null)),
                react_1.default.createElement("strong", null, "Do you have a reservation?")),
            react_1.default.createElement("div", { className: "bubble student-bubble" },
                react_1.default.createElement("b", null,
                    "Voc\u00EA ",
                    react_1.default.createElement(ui_1.Icon, { name: "check" })),
                react_1.default.createElement("strong", null, "Yes, I have a reservation.")),
            react_1.default.createElement(ui_1.Button, { icon: "play", onClick: () => go('/pratica') }, "Experimentar interface")),
        react_1.default.createElement("img", { className: "landing-person right", src: (0, ui_1.image)('landing-student'), alt: "Aluno ilustrado" })),
    react_1.default.createElement("section", { className: "benefits", id: "beneficios" }, [['mic', 'Speaking (Fala)', 'Pratique a pronúncia em conversas naturais e ganhe confiança.'], ['headphones', 'Listening (Escuta)', 'Treine sua compreensão com situações reais.'], ['sparkles', 'Feedback (Correção)', 'Visualize correções e sugestões personalizadas.']].map(([ic, t, d]) => react_1.default.createElement(ui_1.Panel, { key: t },
        react_1.default.createElement("div", { className: "benefit" },
            react_1.default.createElement("span", { className: "title-icon" },
                react_1.default.createElement(ui_1.Icon, { name: ic, size: 32 })),
            react_1.default.createElement("div", null,
                react_1.default.createElement("h3", null, t),
                react_1.default.createElement("p", null, d)))))),
    react_1.default.createElement("div", { className: "landing-lower" },
        react_1.default.createElement(ui_1.Panel, { title: "Acompanhe sua evolu\u00E7\u00E3o", icon: "chart" },
            react_1.default.createElement("p", null, "Veja seu progresso e mantenha a motiva\u00E7\u00E3o."),
            react_1.default.createElement(ui_1.Chart, null)),
        react_1.default.createElement(ui_1.Panel, { title: "Pratique em cen\u00E1rios do seu dia a dia", icon: "restaurant" },
            react_1.default.createElement("div", { id: "cenarios", className: "grid3" }, data_1.scenarios.slice(0, 3).map(([t, img, d]) => react_1.default.createElement("button", { className: "scene-card", key: t, onClick: () => go('/pratica') },
                react_1.default.createElement("img", { src: (0, ui_1.image)(img), alt: "" }),
                react_1.default.createElement("b", null, t),
                react_1.default.createElement("small", null, d)))),
            react_1.default.createElement(react_router_dom_1.Link, { to: "/biblioteca" }, "Ver todos os roteiros \u2192"))),
    react_1.default.createElement("footer", null,
        react_1.default.createElement("b", null, "SpeakUp"),
        " \u00B7 Uma experi\u00EAncia premium para seu aprendizado \u00B7 Prot\u00F3tipo Fase 1")); }
function Auth({ mode, go, onSuccess }) { return react_1.default.createElement("main", { className: "auth immersive" },
    react_1.default.createElement("section", { className: "auth-story" },
        react_1.default.createElement("h1", null,
            "Bem-vindo(a) ao ",
            react_1.default.createElement("em", null, "SpeakUp")),
        react_1.default.createElement("p", null, "Aprenda idiomas de forma natural, praticando conversas reais com um tutor inteligente e interativo."),
        [['chat', 'Converse no idioma alvo'], ['chart', 'Evolua no seu ritmo'], ['target', 'Aprenda com contextos reais']].map(([ic, t]) => react_1.default.createElement("h3", { key: t },
            react_1.default.createElement(ui_1.Icon, { name: ic }),
            t)),
        react_1.default.createElement("img", { src: (0, ui_1.image)('scene-pair'), alt: "Tutor e aluno em um restaurante" })),
    react_1.default.createElement("section", { className: "auth-box" },
        react_1.default.createElement("div", { className: "choices" },
            react_1.default.createElement(react_router_dom_1.Link, { className: mode === 'login' ? 'selected' : '', to: "/login" }, "Entrar"),
            react_1.default.createElement(react_router_dom_1.Link, { className: mode === 'cadastro' ? 'selected' : '', to: "/cadastro" }, "Criar conta")),
        react_1.default.createElement("h1", null, mode === 'login' ? 'Entrar na sua conta' : mode === 'cadastro' ? 'Criar conta' : 'Recuperar senha'),
        react_1.default.createElement("p", null, "Ambiente visual. Nenhuma credencial \u00E9 enviada ou armazenada."),
        react_1.default.createElement("form", { key: mode, onSubmit: e => { e.preventDefault(); const form = e.currentTarget; const data = new FormData(form); if (mode === 'cadastro' && data.get('password') !== data.get('confirm')) {
                const confirm = form.elements.namedItem('confirm');
                confirm.setCustomValidity('As senhas não coincidem.');
                confirm.reportValidity();
                return;
            } onSuccess(String(data.get('name') || 'Aluno')); } },
            mode === 'cadastro' && react_1.default.createElement("label", null,
                "Nome completo",
                react_1.default.createElement("input", { name: "name", required: true, placeholder: "Seu nome" })),
            react_1.default.createElement("label", null,
                "E-mail",
                react_1.default.createElement("input", { name: "email", type: "email", required: true, placeholder: "voce@email.com" })),
            mode !== 'recuperar' && react_1.default.createElement("label", null,
                "Senha",
                react_1.default.createElement("input", { name: "password", type: "password", minLength: 6, required: true, placeholder: "M\u00EDnimo de 6 caracteres" })),
            mode === 'cadastro' && react_1.default.createElement("label", null,
                "Confirmar senha",
                react_1.default.createElement("input", { name: "confirm", type: "password", required: true, minLength: 6, onInput: e => e.currentTarget.setCustomValidity('') })),
            mode === 'login' && react_1.default.createElement(react_router_dom_1.Link, { to: "/recuperar" }, "Esqueci minha senha"),
            react_1.default.createElement(ui_1.Button, { type: "submit", kind: "primary", icon: mode === 'recuperar' ? 'mail' : 'login' }, mode === 'recuperar' ? 'Simular recuperação' : mode === 'cadastro' ? 'Criar perfil demonstrativo' : 'Entrar na demonstração')),
        react_1.default.createElement(ui_1.Button, { onClick: () => go('/dashboard') }, "Explorar sem conta real"),
        react_1.default.createElement("small", null, "Autentica\u00E7\u00E3o e envio de e-mail: fase 2."))); }
function Dashboard({ go, name, sessions }) { return react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement("section", { className: "dash-hero" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("h1", null,
                "Ol\u00E1, ",
                name,
                "! \uD83D\uDC4B"),
            react_1.default.createElement("h2", null, "Que bom te ver de volta no SpeakUp!"),
            react_1.default.createElement("p", null, "Pratique, evolua e ganhe novas conquistas na sua jornada de idiomas."),
            react_1.default.createElement(ui_1.Button, { kind: "primary", icon: "play", onClick: () => go('/pratica') },
                "Continuar praticando ",
                react_1.default.createElement(ui_1.Icon, { name: "next" })),
            react_1.default.createElement("p", null, "\uD83C\uDDEC\uD83C\uDDE7 Pr\u00E1tica de Ingl\u00EAs \u00B7 Cen\u00E1rio: Restaurante")),
        react_1.default.createElement("img", { src: (0, ui_1.image)('hero-tutor'), alt: "Tutora com notebook" })),
    react_1.default.createElement("div", { className: "stats-grid" },
        react_1.default.createElement(ui_1.Panel, { title: "Idiomas em estudo", icon: "layers" },
            react_1.default.createElement("b", null, "\uD83C\uDDEC\uD83C\uDDE7 Ingl\u00EAs"),
            react_1.default.createElement("small", null, "Principal"),
            react_1.default.createElement("hr", null),
            react_1.default.createElement("b", null, "\uD83C\uDDEA\uD83C\uDDF8 Espanhol"),
            react_1.default.createElement(ui_1.Button, { icon: "plus", onClick: () => go('/pratica') }, "Adicionar idioma")),
        react_1.default.createElement(ui_1.Panel, { title: "N\u00EDvel atual", icon: "chart" },
            react_1.default.createElement("div", { className: "stat" },
                "A2 ",
                react_1.default.createElement("span", { className: "medal" }, "\u2605")),
            react_1.default.createElement("small", null, "Elementar alto")),
        react_1.default.createElement(ui_1.Panel, { title: "XP acumulado", icon: "star", className: "green-panel" },
            react_1.default.createElement("div", { className: "stat" }, "12.560 XP"),
            react_1.default.createElement(ui_1.Progress, { value: 89 }),
            react_1.default.createElement("small", null, "Pr\u00F3ximo n\u00EDvel: 14.000 XP")),
        react_1.default.createElement(ui_1.Panel, { title: "Sequ\u00EAncia de dias", icon: "flame" },
            react_1.default.createElement("div", { className: "stat" }, "18 dias"),
            react_1.default.createElement("div", { className: "days" }, Array.from({ length: 7 }, (_, i) => react_1.default.createElement("span", { key: i }, i < 6 ? '✓' : '○'))))),
    react_1.default.createElement("div", { className: "dash-charts" },
        react_1.default.createElement(ui_1.Panel, { title: "Tempo de conversa\u00E7\u00E3o", icon: "clock" },
            react_1.default.createElement("div", { className: "stat" }, "14h 26min"),
            react_1.default.createElement("p", { className: "positive" }, "\u25B2 27% na \u00FAltima semana")),
        react_1.default.createElement(ui_1.Panel, { title: "Evolu\u00E7\u00E3o do aprendizado", icon: "chart" },
            react_1.default.createElement(ui_1.Chart, null))),
    react_1.default.createElement("div", { className: "grid3" },
        react_1.default.createElement(ui_1.Panel, { title: "\u00DAltimas sess\u00F5es", icon: "chat" },
            sessions.length ? sessions.slice(0, 3).map(s => react_1.default.createElement("button", { className: "session-row", key: s.id, onClick: () => go('/historico') },
                react_1.default.createElement("b", null, s.title),
                react_1.default.createElement("small", null,
                    s.date,
                    " \u00B7 ",
                    s.minutes,
                    " min"))) : react_1.default.createElement("p", null, "Nenhuma sess\u00E3o."),
            react_1.default.createElement(react_router_dom_1.Link, { to: "/historico" }, "Ver hist\u00F3rico \u2192")),
        react_1.default.createElement(ui_1.Panel, { title: "Conquistas", icon: "award" },
            react_1.default.createElement("div", { className: "medal-row" }, ['💬', '🔥', '⚑'].map(v => react_1.default.createElement("span", { className: "medal", key: v }, v))),
            react_1.default.createElement("p", null, "Comunicador \u00B7 Sequ\u00EAncia \u00B7 Explorador"),
            react_1.default.createElement(react_router_dom_1.Link, { to: "/conquistas" }, "Ver todas \u2192")),
        react_1.default.createElement(ui_1.Panel, { title: "Ranking", icon: "trophy" },
            react_1.default.createElement("p", null, "\uD83E\uDD47 Voc\u00EA \u00B7 12.560 XP"),
            react_1.default.createElement("p", null, "\uD83E\uDD48 Rafael M. \u00B7 11.980 XP"),
            react_1.default.createElement("p", null, "\uD83E\uDD49 Camila S. \u00B7 11.420 XP"),
            react_1.default.createElement(react_router_dom_1.Link, { to: "/ranking" }, "Ver ranking demonstrativo \u2192")))); }
function PracticeConfig({ p, update, go, copy, importFile, begin, addLanguage, languageList }) { const sc = data_1.scenarios.find(s => s[0] === p.scenario); return react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(ui_1.PageTitle, { title: "Configurar pr\u00E1tica", subtitle: "Personalize sua sess\u00E3o de conversa\u00E7\u00E3o e comece a praticar do seu jeito.", icon: "settings", back: () => go('/dashboard') }),
    react_1.default.createElement("div", { className: "config-grid" },
        react_1.default.createElement("div", { className: "stack" },
            react_1.default.createElement("div", { className: "grid2" },
                react_1.default.createElement(ui_1.Panel, { title: "Idioma de pr\u00E1tica", icon: "globe" },
                    react_1.default.createElement("p", null, "Escolha o idioma que voc\u00EA quer praticar."),
                    react_1.default.createElement("div", { className: "choices" },
                        languageList.map(l => react_1.default.createElement("button", { key: l, className: p.language === l ? 'selected' : '', "aria-pressed": p.language === l, onClick: () => update({ language: l }) },
                            (0, ui_1.flag)(l),
                            " ",
                            l)),
                        react_1.default.createElement(ui_1.Button, { icon: "plus", onClick: addLanguage }, "Adicionar"))),
                react_1.default.createElement(ui_1.Panel, { title: "N\u00EDvel de profici\u00EAncia", icon: "chart" },
                    react_1.default.createElement("p", null, "Defina a dificuldade da conversa."),
                    react_1.default.createElement(ui_1.Choice, { items: data_1.levels, value: p.level, onChange: v => update({ level: v }) }))),
            react_1.default.createElement(ui_1.Panel, { title: "Cen\u00E1rio da pr\u00E1tica", icon: "layers" },
                react_1.default.createElement("p", null, "Escolha um contexto realista para sua conversa."),
                react_1.default.createElement("div", { className: "scenes" },
                    data_1.scenarios.map(([t, img]) => react_1.default.createElement("button", { key: t, className: 'scene-card ' + (p.scenario === t ? 'selected' : ''), "aria-pressed": p.scenario === t, onClick: () => update({ scenario: t }) },
                        react_1.default.createElement("img", { src: (0, ui_1.image)(img), alt: "" }),
                        react_1.default.createElement("b", null,
                            react_1.default.createElement(ui_1.Icon, { name: img }),
                            t))),
                    react_1.default.createElement("button", { className: 'scene-card custom ' + (p.scenario === 'Personalizado' ? 'selected' : ''), onClick: () => update({ scenario: 'Personalizado' }) },
                        react_1.default.createElement(ui_1.Icon, { name: "plus" }),
                        " Cen\u00E1rio personalizado")),
                p.scenario === 'Personalizado' && react_1.default.createElement("label", null,
                    "Descreva seu cen\u00E1rio",
                    react_1.default.createElement("textarea", { value: p.custom, onChange: e => update({ custom: e.target.value }), placeholder: "Objetivo, contexto e situa\u00E7\u00E3o" }))),
            react_1.default.createElement(ui_1.Panel, { title: "Personaliza\u00E7\u00E3o da pr\u00E1tica", icon: "user" },
                react_1.default.createElement("div", { className: "grid3" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("b", null, "Personagem do tutor"),
                        react_1.default.createElement(ui_1.Choice, { items: ['Feminino', 'Masculino'], value: p.character, onChange: v => update({ character: v }) })),
                    react_1.default.createElement("label", null,
                        "Prefer\u00EAncia de voz do ChatGPT",
                        react_1.default.createElement("select", { value: p.voice, onChange: e => update({ voice: e.target.value }) },
                            react_1.default.createElement("option", null, "Voz feminina"),
                            react_1.default.createElement("option", null, "Voz masculina"),
                            react_1.default.createElement("option", null, "Configurar no ChatGPT"))),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("b", null, "Tipo de conversa"),
                        react_1.default.createElement(ui_1.Choice, { items: ['Livre', 'Guiada'], value: p.mode, onChange: v => update({ mode: v }) }))),
                react_1.default.createElement("div", { className: "grid3" }, [['captions', 'Legendas', 'caption'], ['translation', 'Tradução', 'translate'], ['pronunciation', 'Pronúncia aproximada', 'sound'], ['suggestion', 'Resposta sugerida', 'chat']].map(([k, t, ic]) => react_1.default.createElement(ui_1.Toggle, { key: k, label: t, icon: ic, checked: p[k], onChange: v => update({ [k]: v }) }))))),
        react_1.default.createElement(ui_1.Panel, { title: "Pr\u00E9via da sua pr\u00E1tica", icon: "eye", className: "practice-preview" },
            react_1.default.createElement("img", { src: (0, ui_1.image)('scene-pair'), alt: "Pr\u00E9via ilustrada de conversa\u00E7\u00E3o" }),
            react_1.default.createElement("h2", null, p.scenario),
            react_1.default.createElement("p", null, sc?.[2] || p.custom || 'Descreva seu contexto.'),
            react_1.default.createElement("dl", null, [['Idioma', (0, ui_1.flag)(p.language) + ' ' + p.language], ['Nível', p.level], ['Tutor', p.character], ['Voz', p.voice], ['Tipo de conversação', p.mode], ['Legendas', p.captions ? 'Ativadas' : 'Desativadas'], ['Tradução', p.translation ? 'Ativada' : 'Desativada'], ['Pronúncia', p.pronunciation ? 'Ativada' : 'Desativada']].map(([a, b]) => react_1.default.createElement("div", { key: a },
                react_1.default.createElement("dt", null, a),
                react_1.default.createElement("dd", null, b)))),
            react_1.default.createElement("small", null, "Voz e captura real estar\u00E3o dispon\u00EDveis na fase 2."))),
    react_1.default.createElement("div", { className: "action-bar" },
        react_1.default.createElement(ui_1.Button, { icon: "copy", onClick: copy }, "Copiar instru\u00E7\u00F5es para o ChatGPT"),
        react_1.default.createElement(ui_1.Button, { icon: "upload", onClick: importFile }, "Importar roteiro JSON"),
        react_1.default.createElement(ui_1.Button, { icon: "book", onClick: () => begin(true) }, "Modo explica\u00E7\u00E3o"),
        react_1.default.createElement(ui_1.Button, { kind: "primary", icon: "play", onClick: () => begin(false) }, "Iniciar pr\u00E1tica"))); }
function Library({ items, query, setQuery, language, setLanguage, level, setLevel, category, setCategory, favs, onlyFav, setOnlyFav, flip, open, remove, importFile }) { const filtered = items.filter(s => (!onlyFav || favs.includes(s.id)) && (language === 'Todos' || s.language === language) && (level === 'Todos' || s.level === level) && (category === 'Todas' || s.category === category) && `${s.title} ${s.description}`.toLowerCase().includes(query.toLowerCase())); return react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(ui_1.PageTitle, { title: "Biblioteca de roteiros", icon: "book", subtitle: "Explore, organize e gerencie roteiros de conversa\u00E7\u00E3o em diferentes idiomas." }),
    react_1.default.createElement("div", { className: "library-layout" },
        react_1.default.createElement(ui_1.Panel, { className: "library-side", title: "Biblioteca", icon: "book" },
            react_1.default.createElement(ui_1.Button, { kind: !onlyFav ? 'primary' : 'secondary', icon: "layers", onClick: () => setOnlyFav(false) }, "Todos os roteiros"),
            react_1.default.createElement(ui_1.Button, { kind: onlyFav ? 'primary' : 'secondary', icon: "heart", onClick: () => setOnlyFav(true) },
                "Favoritos (",
                favs.length,
                ")"),
            react_1.default.createElement(ui_1.Button, { icon: "upload", onClick: importFile }, "Importar JSON"),
            react_1.default.createElement("img", { src: (0, ui_1.image)('student'), alt: "Aluno ilustrado" })),
        react_1.default.createElement("div", { className: "stack" },
            react_1.default.createElement(ui_1.Panel, null,
                react_1.default.createElement("div", { className: "filters" },
                    react_1.default.createElement("label", { className: "search" },
                        react_1.default.createElement(ui_1.Icon, { name: "search" }),
                        react_1.default.createElement("input", { "aria-label": "Buscar roteiros", placeholder: "Buscar roteiros (restaurante, hotel...)", value: query, onChange: e => setQuery(e.target.value) })),
                    react_1.default.createElement("select", { "aria-label": "Idioma", value: language, onChange: e => setLanguage(e.target.value) }, ['Todos', ...new Set(items.map(s => s.language))].map(x => react_1.default.createElement("option", { key: x }, x))),
                    react_1.default.createElement("select", { "aria-label": "Dificuldade", value: level, onChange: e => setLevel(e.target.value) }, ['Todos', ...data_1.levels].map(x => react_1.default.createElement("option", { key: x }, x))),
                    react_1.default.createElement("select", { "aria-label": "Categoria", value: category, onChange: e => setCategory(e.target.value) }, ['Todas', ...new Set(items.map(s => s.category))].map(x => react_1.default.createElement("option", { key: x }, x))),
                    react_1.default.createElement(ui_1.Button, { icon: "repeat", onClick: () => { setQuery(''); setLanguage('Todos'); setLevel('Todos'); setCategory('Todas'); setOnlyFav(false); } }, "Limpar")),
                react_1.default.createElement("small", null,
                    filtered.length,
                    " roteiros encontrados")),
            !filtered.length && react_1.default.createElement(ui_1.Panel, null,
                react_1.default.createElement("h2", null, "Nenhum roteiro encontrado"),
                react_1.default.createElement("p", null, "Altere os filtros ou importe um roteiro.")),
            [...new Set(filtered.map(s => s.language))].map(l => react_1.default.createElement("section", { key: l },
                react_1.default.createElement("h2", null,
                    (0, ui_1.flag)(l),
                    " ",
                    l,
                    " ",
                    react_1.default.createElement("small", null,
                        "\u00B7 ",
                        filtered.filter(s => s.language === l).length,
                        " roteiros")),
                react_1.default.createElement("div", { className: "grid3" }, filtered.filter(s => s.language === l).map(s => react_1.default.createElement("article", { className: "script-card", key: s.id },
                    react_1.default.createElement("div", { className: "script-img" },
                        react_1.default.createElement("img", { src: (0, ui_1.image)(s.image), alt: "" }),
                        react_1.default.createElement("button", { className: 'icon-btn favorite ' + (favs.includes(s.id) ? 'liked' : ''), "aria-label": favs.includes(s.id) ? 'Remover favorito' : 'Favoritar roteiro', "aria-pressed": favs.includes(s.id), onClick: () => flip(s.id) },
                            react_1.default.createElement(ui_1.Icon, { name: "heart" }))),
                    react_1.default.createElement("div", { className: "script-body" },
                        react_1.default.createElement("h3", null, s.title),
                        react_1.default.createElement("p", null, s.description),
                        react_1.default.createElement("small", null,
                            react_1.default.createElement("span", { className: "pill" }, s.level),
                            " \u00B7 ",
                            s.stages.length,
                            " etapas \u00B7 ",
                            s.category),
                        react_1.default.createElement("div", { className: "card-actions" },
                            react_1.default.createElement(ui_1.Button, { kind: "primary", icon: "play", onClick: () => open(s) }, "Visualizar"),
                            react_1.default.createElement(ui_1.Button, { icon: "trash", onClick: () => remove(s) }, "Excluir"))))))))))); }
function SessionPage({ p, stages, index, role, paused, explain, update, step, setRole, pause, help, repeat, end, go }) { const s = stages[index]; return react_1.default.createElement("section", { className: "session-stage" },
    react_1.default.createElement("div", { className: "session-top" },
        react_1.default.createElement("span", { className: "eyebrow" },
            react_1.default.createElement(ui_1.Icon, { name: "info" }),
            " ",
            explain ? 'Modo explicação' : 'Conversa em demonstração'),
        react_1.default.createElement("span", { className: "eyebrow" },
            (0, ui_1.flag)(p.language),
            " ",
            p.language,
            " \u00B7 ",
            p.level,
            " \u00B7 ",
            p.scenario),
        react_1.default.createElement("span", { className: "eyebrow" },
            "Etapa ",
            stages.length ? index + 1 : 0,
            "/",
            stages.length)),
    react_1.default.createElement("div", { className: "conversation" },
        react_1.default.createElement(ui_1.Character, { type: p.character === 'Feminino' ? 'tutor' : 'student', role: "tutor", state: paused ? 'Aguardando' : role === 'tutor' ? 'Falando' : 'Ouvindo' }),
        react_1.default.createElement("div", { className: "dialogue" },
            react_1.default.createElement("span", { className: "demo-note" }, explain ? 'Estude a frase antes de praticar. Sem nota ou XP.' : 'Alternância manual · nenhum áudio capturado'),
            s ? react_1.default.createElement("div", { className: 'bubble ' + (role === 'tutor' || explain ? 'tutor-bubble' : 'student-bubble') },
                react_1.default.createElement("b", null,
                    role === 'tutor' || explain ? 'Tutor' : 'Você (Aluno)',
                    " ",
                    react_1.default.createElement(ui_1.Wave, { active: !paused })),
                (p.captions || explain) ? react_1.default.createElement("strong", null, role === 'student' && !explain ? (p.suggestion ? s.reply || 'Resposta livre' : 'Sua vez de falar') : s.phrase) : react_1.default.createElement("strong", null, "Legendas ocultas"),
                (role === 'tutor' || explain) && react_1.default.createElement(react_1.default.Fragment, null,
                    (p.translation || explain) && react_1.default.createElement("p", null,
                        react_1.default.createElement(ui_1.Icon, { name: "translate" }),
                        " ",
                        s.translation),
                    (p.pronunciation || explain) && react_1.default.createElement("p", null,
                        react_1.default.createElement(ui_1.Icon, { name: "sound" }),
                        " ",
                        s.pronunciation))) : react_1.default.createElement(ui_1.Panel, null,
                react_1.default.createElement("h2", null, "Conversa livre / cen\u00E1rio personalizado"),
                react_1.default.createElement("p", null, "Sem frases prontas neste cen\u00E1rio. A conversa real depende da fase 2.")),
            !explain && p.suggestion && role === 'tutor' && s?.reply && react_1.default.createElement("div", { className: "bubble student-bubble" },
                react_1.default.createElement("small", null, "Resposta sugerida"),
                react_1.default.createElement("strong", null, s.reply)),
            explain && react_1.default.createElement("p", { className: "context" },
                "Contexto: ",
                p.scenario,
                " \u00B7 Observe o significado e pratique em voz alta no seu ritmo."),
            react_1.default.createElement("div", { className: "support-controls" },
                react_1.default.createElement(ui_1.Toggle, { label: "Legendas", checked: p.captions, onChange: v => update({ captions: v }) }),
                react_1.default.createElement(ui_1.Toggle, { label: "Tradu\u00E7\u00E3o", checked: p.translation, onChange: v => update({ translation: v }) }),
                react_1.default.createElement(ui_1.Toggle, { label: "Pron\u00FAncia", checked: p.pronunciation, onChange: v => update({ pronunciation: v }) }),
                !explain && react_1.default.createElement(ui_1.Toggle, { label: "Sugest\u00E3o", checked: p.suggestion, onChange: v => update({ suggestion: v }) })),
            react_1.default.createElement("div", { className: "card-actions" },
                react_1.default.createElement(ui_1.Button, { icon: "repeat", onClick: repeat }, "Repetir"),
                react_1.default.createElement(ui_1.Button, { icon: "help", onClick: help }, explain ? 'Dúvida em português' : 'Ajuda / explicar'),
                !explain && react_1.default.createElement(ui_1.Button, { icon: "sync", onClick: () => setRole(role === 'tutor' ? 'student' : 'tutor') }, "Alternar turno"))),
        react_1.default.createElement(ui_1.Character, { type: p.character === 'Feminino' ? 'student' : 'tutor', role: "student", state: paused ? 'Aguardando' : role === 'student' ? 'Falando' : role === 'tutor' ? 'Ouvindo' : 'Pensando' })),
    react_1.default.createElement("div", { className: "action-bar session-footer" },
        react_1.default.createElement("span", { className: "status" },
            react_1.default.createElement(ui_1.Icon, { name: "mic" }),
            " Microfone: inativo \u00B7 fase 2"),
        react_1.default.createElement("span", { className: "status" },
            react_1.default.createElement(ui_1.Icon, { name: "monitor" }),
            " \u00C1udio da aba: inativo"),
        react_1.default.createElement(ui_1.Button, { icon: "back", disabled: index === 0, onClick: () => step(-1) }, "Voltar etapa"),
        react_1.default.createElement(ui_1.Button, { kind: "primary", icon: paused ? 'play' : 'pause', onClick: pause }, paused ? 'Retomar' : 'Pausar'),
        react_1.default.createElement(ui_1.Button, { icon: "next", disabled: index >= stages.length - 1, onClick: () => step(1) }, "Avan\u00E7ar"),
        react_1.default.createElement(ui_1.Button, { icon: "sync", onClick: () => { setRole('tutor'); repeat(); } }, "Ressincronizar"),
        react_1.default.createElement(ui_1.Button, { kind: "danger", icon: "stop", onClick: end }, "Encerrar")),
    react_1.default.createElement("button", { className: "text-link", onClick: () => go('/pratica') }, "Configura\u00E7\u00E3o da pr\u00E1tica")); }
function Results({ report, go }) { return react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(ui_1.PageTitle, { title: "Relat\u00F3rio de desempenho", icon: "file", subtitle: report.demo ? 'Dados fictícios de demonstração — nenhuma avaliação realizada' : 'Dados importados localmente — não verificados pelo SpeakUp', back: () => go('/historico') }),
    react_1.default.createElement("div", { className: "report-hero" },
        react_1.default.createElement("img", { src: (0, ui_1.image)('tutor'), alt: "Tutora" }),
        react_1.default.createElement("div", { className: "report-score" },
            react_1.default.createElement(ui_1.Icon, { name: "award", size: 42 }),
            react_1.default.createElement("div", null,
                react_1.default.createElement("small", null, "Nota geral"),
                react_1.default.createElement("div", { className: "stat" }, report.score === null ? 'Não avaliada' : `${report.score}/100`)),
            react_1.default.createElement("div", null,
                react_1.default.createElement("h2", null, report.title),
                react_1.default.createElement("p", null,
                    (0, ui_1.flag)(report.language),
                    " ",
                    report.language,
                    " \u00B7 ",
                    report.demo ? 'Exemplo visual' : 'Relatório importado'))),
        react_1.default.createElement("img", { src: (0, ui_1.image)('student'), alt: "Aluno" })),
    react_1.default.createElement("div", { className: "metrics-grid" }, data_1.metrics.map((m, i) => react_1.default.createElement(ui_1.Panel, { key: m, title: m[0].toUpperCase() + m.slice(1), icon: ['book', 'layers', 'headphones', 'target', 'sound', 'mic'][i] },
        react_1.default.createElement("div", { className: "stat small" }, report.metrics[m] == null ? 'Não avaliada' : `${report.metrics[m]}/100`),
        report.metrics[m] != null && react_1.default.createElement(ui_1.Progress, { value: report.metrics[m] })))),
    react_1.default.createElement("div", { className: "grid3" },
        react_1.default.createElement(ui_1.Panel, { title: "XP conquistado", icon: "trophy" },
            react_1.default.createElement("div", { className: "stat positive" }, report.xp == null ? 'Não avaliado' : `+${report.xp} XP`),
            react_1.default.createElement("small", null, report.demo ? 'Exemplo, não creditado' : 'Valor informado no JSON')),
        react_1.default.createElement(ui_1.Panel, { title: "Pontos fortes", icon: "check" }, report.strengths.length ? report.strengths.map((s, i) => react_1.default.createElement("p", { key: i },
            "\u2713 ",
            s)) : react_1.default.createElement("p", null, "N\u00E3o informado.")),
        react_1.default.createElement(ui_1.Panel, { title: "Recomenda\u00E7\u00F5es", icon: "target" }, report.recommendations.length ? report.recommendations.map((s, i) => react_1.default.createElement("p", { key: i },
            "\u2022 ",
            s)) : react_1.default.createElement("p", null, "N\u00E3o informado."))),
    react_1.default.createElement(ui_1.Panel, { title: "Corre\u00E7\u00F5es sugeridas", icon: "book" }, report.corrections.length ? report.corrections.map((c, i) => react_1.default.createElement("div", { className: "correction", key: i },
        react_1.default.createElement("span", null, c.original),
        react_1.default.createElement(ui_1.Icon, { name: "next" }),
        react_1.default.createElement("b", null, c.corrected),
        react_1.default.createElement("small", null, c.reason))) : react_1.default.createElement("p", null, "Nenhuma corre\u00E7\u00E3o informada.")),
    react_1.default.createElement(ui_1.Button, { kind: "primary", onClick: () => go('/pratica'), icon: "play" }, "Nova pr\u00E1tica"),
    " ",
    react_1.default.createElement(ui_1.Button, { icon: "upload", onClick: () => go('/relatorio/importar') }, "Importar outro relat\u00F3rio")); }
function Evolution({ period, setPeriod, language, setLanguage }) { return react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(ui_1.PageTitle, { title: "Minha evolu\u00E7\u00E3o", icon: "chart", subtitle: "Acompanhe seu progresso, conquistas e metas \u00B7 amostra fict\u00EDcia." }),
    react_1.default.createElement("div", { className: "evolution-head" },
        react_1.default.createElement("img", { src: (0, ui_1.image)('tutor'), alt: "Tutora" }),
        react_1.default.createElement(ui_1.Panel, { title: "N\u00EDvel atual", icon: "award" },
            react_1.default.createElement("div", { className: "stat" }, "N\u00EDvel 24"),
            react_1.default.createElement("p", null, "Explorador avan\u00E7ado \u00B7 5.740 / 6.400 XP"),
            react_1.default.createElement(ui_1.Progress, { value: 89 }))),
    react_1.default.createElement("div", { className: "filters" },
        react_1.default.createElement(ui_1.Choice, { items: ['Diária', 'Semanal', 'Mensal'], value: period, onChange: setPeriod }),
        react_1.default.createElement("select", { "aria-label": "Idioma", value: language, onChange: e => setLanguage(e.target.value) }, ['Todos', ...data_1.languages].map(l => react_1.default.createElement("option", { key: l }, l))),
        react_1.default.createElement("span", { className: "pill" },
            language,
            " \u00B7 dados de exemplo")),
    react_1.default.createElement("div", { className: "grid2" },
        react_1.default.createElement(ui_1.Panel, { title: "Evolu\u00E7\u00E3o de aprendizado", icon: "chart" },
            react_1.default.createElement("div", { className: "evo-chart" },
                react_1.default.createElement("div", { className: "ring" },
                    react_1.default.createElement("b", null,
                        language === 'Francês' ? '76' : language === 'Espanhol' ? '82' : '89',
                        "%"),
                    react_1.default.createElement("small", null, "\u00CDndice de exemplo")),
                react_1.default.createElement(ui_1.Chart, { bar: true, period: period }))),
        react_1.default.createElement(ui_1.Panel, { title: "Hist\u00F3rico de notas", icon: "chart" },
            react_1.default.createElement(ui_1.Chart, { period: period })),
        react_1.default.createElement(ui_1.Panel, { title: "Tempo de estudo", icon: "clock" },
            react_1.default.createElement("div", { className: "stat" }, period === 'Diária' ? '45 min' : period === 'Semanal' ? '6h 12min' : '24h 30min'),
            react_1.default.createElement("p", null, "+18% vs. ciclo anterior \u00B7 fict\u00EDcio")),
        react_1.default.createElement(ui_1.Panel, { title: "Metas de aprendizado", icon: "target" }, ['Estudar 5 dias na semana', 'Completar 20 conversas', 'Atingir média 9,0'].map((v, i) => react_1.default.createElement("div", { key: v },
            react_1.default.createElement("p", null, v),
            react_1.default.createElement(ui_1.Progress, { value: i === 2 ? 87 : 100 })))),
        react_1.default.createElement(ui_1.Panel, { title: "Sequ\u00EAncia de estudos", icon: "flame" },
            react_1.default.createElement("div", { className: "stat" }, "21 dias"),
            react_1.default.createElement("p", null, "Melhor sequ\u00EAncia: 37 dias")),
        react_1.default.createElement(ui_1.Panel, { title: "N\u00EDveis de experi\u00EAncia", icon: "layers" },
            react_1.default.createElement("div", { className: "medal-row" }, [22, 23, 24, 25, 26].map(n => react_1.default.createElement("span", { key: n, className: 'medal ' + (n === 24 ? 'current' : '') }, n))),
            react_1.default.createElement("small", null, "Pr\u00F3ximo n\u00EDvel: Comunicador fluente")))); }
function History({ sessions, filter, setFilter, open, remove, go }) { const rows = sessions.filter(s => filter === 'Todos' || s.language === filter); return react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(ui_1.PageTitle, { title: "Hist\u00F3rico de sess\u00F5es", icon: "history", subtitle: "Sess\u00F5es demonstrativas e relat\u00F3rios importados neste navegador." }),
    react_1.default.createElement(ui_1.Panel, null,
        react_1.default.createElement("div", { className: "filters" },
            react_1.default.createElement("select", { "aria-label": "Filtrar idioma", value: filter, onChange: e => setFilter(e.target.value) }, ['Todos', ...new Set(sessions.map(s => s.language))].map(l => react_1.default.createElement("option", { key: l }, l))),
            react_1.default.createElement(ui_1.Button, { icon: "upload", onClick: () => go('/relatorio/importar') }, "Importar relat\u00F3rio")),
        !rows.length && react_1.default.createElement("p", null, "Nenhuma sess\u00E3o encontrada."),
        rows.map(s => react_1.default.createElement("div", { className: "history-row", key: s.id },
            react_1.default.createElement("div", null,
                react_1.default.createElement("h3", null, s.title),
                react_1.default.createElement("small", null,
                    (0, ui_1.flag)(s.language),
                    " ",
                    s.language,
                    " \u00B7 ",
                    s.date,
                    " \u00B7 ",
                    s.minutes ? `${s.minutes} min` : 'Tempo não informado',
                    " \u00B7 ",
                    s.report.demo ? 'Demonstração' : 'Importado')),
            react_1.default.createElement("span", { className: "pill" }, s.report.score ?? 'Não avaliada'),
            react_1.default.createElement(ui_1.Button, { icon: "eye", onClick: () => open(s) }, "Detalhes"),
            react_1.default.createElement(ui_1.Button, { icon: "trash", onClick: () => remove(s) }, "Excluir"))))); }
function Ranking({ tab, setTab, achievements }) { return react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(ui_1.PageTitle, { title: achievements ? 'Conquistas e níveis' : 'Ranking', icon: achievements ? 'award' : 'trophy', subtitle: "Amostra visual fict\u00EDcia, sem usu\u00E1rios reais ou pontua\u00E7\u00E3o atribu\u00EDda." }),
    achievements ? react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ui_1.Panel, { title: "N\u00EDvel 24 \u00B7 Explorador avan\u00E7ado", icon: "award" },
            react_1.default.createElement("div", { className: "medal-row" }, [22, 23, 24, 25, 26].map(n => react_1.default.createElement("span", { className: 'medal ' + (n === 24 ? 'current' : ''), key: n }, n))),
            react_1.default.createElement(ui_1.Progress, { value: 89 }),
            react_1.default.createElement("p", null, "Faltam 660 XP para o n\u00EDvel 25")),
        react_1.default.createElement("div", { className: "grid3" }, ['Comunicador Pro', 'Meta mensal', 'Sequência impecável', 'Maratonista de estudos', 'Nota excelente', 'Explorador de cenários'].map((v, i) => react_1.default.createElement(ui_1.Panel, { key: v, className: "achievement" },
            react_1.default.createElement("span", { className: "medal" }, ['💬', '⚑', '🔥', '📚', '★', '🏆'][i]),
            react_1.default.createElement("h3", null, v),
            react_1.default.createElement("p", null, i < 3 ? 'Desbloqueada (exemplo)' : 'Bloqueada (exemplo)'))))) : react_1.default.createElement(ui_1.Panel, null,
        react_1.default.createElement(ui_1.Choice, { items: ['Meu ranking', 'Ranking geral'], value: tab, onChange: setTab }),
        (tab === 'Meu ranking' ? ['Você', 'Rafael M.', 'Camila S.'] : ['Mariana S.', 'Você', 'Rafael M.', 'Camila S.', 'João P.']).map((n, i) => react_1.default.createElement("div", { className: "history-row", key: n },
            react_1.default.createElement("span", { className: "medal" }, i + 1),
            react_1.default.createElement("b", null, n),
            react_1.default.createElement("span", null,
                [12560, 11980, 11420, 10500, 9500][i].toLocaleString('pt-BR'),
                " XP"))))); }

};
modules["features/settings"]=function(module,exports,require){"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPrefs = void 0;
exports.Settings = Settings;
const react_1 = __importDefault(require("react"));
const ui_1 = require("../components/ui");
exports.defaultPrefs = { theme: 'Sistema', reduced: false, privacy: true, delay: 250, interfaceLanguage: 'Português (Brasil)', mic: 'Padrão do sistema' };
function Settings({ prefs, update, p, updatePractice, name, setName, notify, reset }) { return react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(ui_1.PageTitle, { title: "Configura\u00E7\u00F5es e perfil", icon: "settings", subtitle: "Gerencie suas prefer\u00EAncias locais. Nenhum servi\u00E7o conectado." }),
    react_1.default.createElement("div", { className: "settings-layout" },
        react_1.default.createElement(ui_1.Panel, { className: "settings-side" },
            react_1.default.createElement("nav", null, ['Perfil', 'Preferências', 'Áudio', 'Personagens', 'Aparência', 'Privacidade', 'Sincronização'].map(t => react_1.default.createElement("a", { key: t, href: '#' + t }, t))),
            react_1.default.createElement("img", { src: (0, ui_1.image)('tutor'), alt: "Tutora ilustrada" })),
        react_1.default.createElement("div", { className: "stack" },
            react_1.default.createElement("div", { id: "Perfil" },
                react_1.default.createElement(ui_1.Panel, { title: "Perfil", icon: "user" },
                    react_1.default.createElement("div", { className: "grid2" },
                        react_1.default.createElement("label", null,
                            "Nome de demonstra\u00E7\u00E3o",
                            react_1.default.createElement("input", { value: name, onChange: e => setName(e.target.value), maxLength: 50 })),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("b", null, "Plano"),
                            react_1.default.createElement("p", null, "Fase visual gratuita \u00B7 nenhum pagamento"))))),
            react_1.default.createElement("div", { id: "Prefer\u00EAncias" },
                react_1.default.createElement(ui_1.Panel, { title: "Prefer\u00EAncias", icon: "sliders" },
                    react_1.default.createElement("div", { className: "grid2" },
                        react_1.default.createElement("label", null,
                            "Idioma de aprendizado",
                            react_1.default.createElement("select", { value: p.language, onChange: e => updatePractice({ language: e.target.value }) }, [...new Set(['Inglês', 'Francês', 'Espanhol', p.language])].map(l => react_1.default.createElement("option", { key: l }, l)))),
                        react_1.default.createElement("label", null,
                            "Idioma da interface",
                            react_1.default.createElement("select", { value: prefs.interfaceLanguage, onChange: e => update({ interfaceLanguage: e.target.value }) },
                                react_1.default.createElement("option", null, "Portugu\u00EAs (Brasil)")))),
                    react_1.default.createElement("div", { className: "grid3" },
                        react_1.default.createElement(ui_1.Toggle, { label: "Legendas", checked: p.captions, onChange: v => updatePractice({ captions: v }) }),
                        react_1.default.createElement(ui_1.Toggle, { label: "Tradu\u00E7\u00E3o", checked: p.translation, onChange: v => updatePractice({ translation: v }) }),
                        react_1.default.createElement(ui_1.Toggle, { label: "Pron\u00FAncia", checked: p.pronunciation, onChange: v => updatePractice({ pronunciation: v }) })))),
            react_1.default.createElement("div", { id: "\u00C1udio" },
                react_1.default.createElement(ui_1.Panel, { title: "\u00C1udio", icon: "mic" },
                    react_1.default.createElement("div", { className: "grid2" },
                        react_1.default.createElement("label", null,
                            "Prefer\u00EAncia de microfone",
                            react_1.default.createElement("select", { value: prefs.mic, onChange: e => update({ mic: e.target.value }) },
                                react_1.default.createElement("option", null, "Padr\u00E3o do sistema"),
                                react_1.default.createElement("option", null, "Escolher na fase 2"))),
                        react_1.default.createElement("label", null,
                            "Delay preferido: ",
                            prefs.delay,
                            " ms",
                            react_1.default.createElement("input", { type: "range", min: 0, max: 2000, step: 50, value: prefs.delay, onChange: e => update({ delay: +e.target.value }) }))),
                    react_1.default.createElement("p", { className: "status" },
                        react_1.default.createElement(ui_1.Icon, { name: "info" }),
                        " Captura de \u00E1udio do ChatGPT e microfone: indispon\u00EDveis at\u00E9 a fase 2."))),
            react_1.default.createElement("div", { id: "Personagens" },
                react_1.default.createElement(ui_1.Panel, { title: "Personagens", icon: "user" },
                    react_1.default.createElement("div", { className: "character-choice" }, ['Feminino', 'Masculino'].map((v, i) => react_1.default.createElement("button", { key: v, className: p.character === v ? 'selected' : '', "aria-pressed": p.character === v, onClick: () => updatePractice({ character: v }) },
                        react_1.default.createElement("img", { src: (0, ui_1.image)(i ? 'student' : 'tutor'), alt: "" }),
                        v))),
                    react_1.default.createElement(ui_1.Choice, { items: ['Voz feminina', 'Voz masculina', 'Configurar no ChatGPT'], value: p.voice, onChange: v => updatePractice({ voice: v }) }))),
            react_1.default.createElement("div", { id: "Apar\u00EAncia" },
                react_1.default.createElement(ui_1.Panel, { title: "Apar\u00EAncia", icon: "sun" },
                    react_1.default.createElement(ui_1.Choice, { items: ['Claro', 'Escuro', 'Sistema'], value: prefs.theme, onChange: v => update({ theme: v }) }),
                    react_1.default.createElement(ui_1.Toggle, { label: "Reduzir anima\u00E7\u00F5es", checked: prefs.reduced, onChange: v => update({ reduced: v }) }))),
            react_1.default.createElement("div", { id: "Privacidade" },
                react_1.default.createElement(ui_1.Panel, { title: "Privacidade", icon: "lock" },
                    react_1.default.createElement(ui_1.Toggle, { label: "Preferir sess\u00F5es privadas", detail: "Prefer\u00EAncia local, sem publica\u00E7\u00E3o de dados.", checked: prefs.privacy, onChange: v => update({ privacy: v }) }),
                    react_1.default.createElement(ui_1.Button, { kind: "danger", icon: "trash", onClick: reset }, "Restaurar dados de demonstra\u00E7\u00E3o"))),
            react_1.default.createElement("div", { id: "Sincroniza\u00E7\u00E3o" },
                react_1.default.createElement(ui_1.Panel, { title: "Sincroniza\u00E7\u00E3o de dados", icon: "sync" },
                    react_1.default.createElement("p", null, "N\u00E3o conectada. Dados e prefer\u00EAncias ficam somente no navegador."),
                    react_1.default.createElement(ui_1.Button, { onClick: () => notify('Sincronização e gerenciamento de dispositivos: fase 2.'), icon: "monitor" }, "Gerenciar dispositivos"))))),
    react_1.default.createElement("div", { className: "action-bar" },
        react_1.default.createElement(ui_1.Button, { kind: "primary", icon: "check", onClick: () => notify('Preferências locais salvas automaticamente.') }, "Salvar configura\u00E7\u00F5es"))); }

};
modules["services/data"]=function(module,exports,require){"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleSessions = exports.sampleReport = exports.metrics = exports.scripts = exports.initialPractice = exports.scenarios = exports.levels = exports.languages = void 0;
exports.makeStages = makeStages;
exports.languages = ['Inglês', 'Francês', 'Espanhol'];
exports.levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
exports.scenarios = [['Restaurante', 'restaurant', 'Faça pedidos, reservas e converse com o atendimento.'], ['Aeroporto', 'airport', 'Check-in, bagagem, segurança e embarque.'], ['Hotel', 'hotel', 'Reserve hospedagem e solicite serviços.'], ['Turismo', 'tourism', 'Peça informações e descubra novos lugares.'], ['Compras', 'shopping', 'Pergunte preços, tamanhos e formas de pagamento.'], ['Transporte', 'transport', 'Compre bilhetes e peça direções.'], ['Entrevista de emprego', 'interview', 'Apresente suas habilidades e experiência.'], ['Conversação cotidiana', 'daily', 'Converse sobre assuntos do dia a dia.']];
exports.initialPractice = { language: 'Inglês', level: 'A2', scenario: 'Restaurante', custom: '', character: 'Feminino', voice: 'Voz feminina', mode: 'Guiada', captions: true, translation: true, pronunciation: true, suggestion: false };
const stage = (phrase, translation, pronunciation, reply) => ({ phrase, translation, pronunciation, reply });
const restaurant = {
    'Inglês': [stage('Do you have a reservation?', 'Você tem uma reserva?', 'Du iú rév a rezervêichan?', 'Yes, I have a reservation.'), stage('What would you like to drink?', 'O que gostaria de beber?', 'Uót uúd iú láik tu drink?', 'I would like some water.'), stage('Are you ready to order?', 'Está pronto para pedir?', 'Ar iú rédi tu órder?', 'Yes, I would like the soup.'), stage('Would you like anything else?', 'Gostaria de mais alguma coisa?', 'Uúd iú láik énithing éls?', 'No, thank you.'), stage('How was your meal?', 'Como estava sua refeição?', 'Ráu uóz iór míl?', 'It was delicious.'), stage('Would you like the bill?', 'Gostaria da conta?', 'Uúd iú láik de bil?', 'Yes, please.')],
    'Francês': [stage('Vous avez une réservation ?', 'Você tem uma reserva?', 'Vu zavê ün rezérvassion?', 'Oui, j’ai une réservation.'), stage('Vous désirez boire quelque chose ?', 'Deseja beber algo?', 'Vu dezirê buár kélk shôz?', 'Une bouteille d’eau, s’il vous plaît.'), stage('Vous êtes prêt à commander ?', 'Está pronto para pedir?', 'Vu zét pré a komandê?', 'Je voudrais une soupe.'), stage('Autre chose ?', 'Mais alguma coisa?', 'Ôtr shôz?', 'Non, merci.'), stage('Tout s’est bien passé ?', 'Correu tudo bem?', 'Tu sé biãn passê?', 'Oui, merci.'), stage('Vous voulez l’addition ?', 'Quer a conta?', 'Vu vulê ladission?', 'L’addition, s’il vous plaît.')],
    'Espanhol': [stage('¿Tiene una reserva?', 'Você tem uma reserva?', 'Tiêne una resêrva?', 'Sí, tengo una reserva.'), stage('¿Qué desea beber?', 'O que deseja beber?', 'Kê desêa bebêr?', 'Quisiera agua.'), stage('¿Está listo para pedir?', 'Está pronto para pedir?', 'Está lísto para pedír?', 'Quisiera la sopa.'), stage('¿Algo más?', 'Algo mais?', 'Álgo más?', 'No, gracias.'), stage('¿Qué tal la comida?', 'Como estava a comida?', 'Kê tal la comída?', 'Muy buena.'), stage('¿Quiere la cuenta?', 'Quer a conta?', 'Kiêre la kuênta?', 'La cuenta, por favor.')]
};
const prompts = {
    'Aeroporto': ['May I see your passport?', 'Posso ver seu passaporte?', 'Mêi ai sí iór pássport?', 'Puis-je voir votre passeport ?', 'Püij vuár vôtr passpór?', '¿Puedo ver su pasaporte?'],
    'Hotel': ['Do you have a booking?', 'Você tem uma reserva?', 'Du iú rév a búking?', 'Vous avez une réservation ?', 'Vu zavê ün rezérvassion?', '¿Tiene una reserva?'],
    'Turismo': ['How can I help you?', 'Como posso ajudar?', 'Ráu ken ai rélp iú?', 'Comment puis-je vous aider ?', 'Komã püij vu zedê?', '¿Cómo puedo ayudarle?'],
    'Compras': ['What size do you need?', 'De que tamanho precisa?', 'Uót sáiz du iú níd?', 'Quelle taille voulez-vous ?', 'Kél tai vulê vu?', '¿Qué talla necesita?'],
    'Transporte': ['Where are you going?', 'Para onde você vai?', 'Uér ar iú góuing?', 'Où allez-vous ?', 'U alê vu?', '¿Adónde va?'],
    'Entrevista de emprego': ['Tell me about yourself.', 'Fale sobre você.', 'Tél mi abáut iorsélf.', 'Parlez-moi de vous.', 'Parlê muá de vu.', 'Hábleme de usted.'],
    'Conversação cotidiana': ['How is your day going?', 'Como está seu dia?', 'Ráu iz iór dêi góuing?', 'Comment se passe votre journée ?', 'Komã se pás vôtr jurnê?', '¿Cómo va su día?']
};
const extra = {
    'Inglês': [stage('Could you tell me more?', 'Poderia me contar mais?', 'Kud iú tél mi mór?', 'Of course.'), stage('Do you need anything else?', 'Precisa de mais alguma coisa?', 'Du iú níd énithing éls?', 'No, thank you.')],
    'Francês': [stage('Pouvez-vous préciser ?', 'Pode explicar melhor?', 'Puvê vu presizê?', 'Bien sûr.'), stage('Vous avez besoin d’autre chose ?', 'Precisa de mais alguma coisa?', 'Vu zavê bezuã dôtr shôz?', 'Non, merci.')],
    'Espanhol': [stage('¿Puede decirme más?', 'Pode me dizer mais?', 'Puêde desírme más?', 'Claro.'), stage('¿Necesita algo más?', 'Precisa de algo mais?', 'Nesesíta álgo más?', 'No, gracias.')]
};
function makeStages(language, scenario) { if (scenario === 'Restaurante')
    return restaurant[language] ?? []; const p = prompts[scenario]; if (!p || !extra[language])
    return []; const first = language === 'Inglês' ? stage(p[0], p[1], p[2], 'Yes, of course.') : language === 'Francês' ? stage(p[3], p[1], p[4], 'Oui, bien sûr.') : stage(p[5], p[1], 'Aproximação não disponível nesta amostra.', 'Sí, claro.'); return [first, ...extra[language]]; }
exports.scripts = exports.languages.flatMap((language, li) => exports.scenarios.map(([title, image, description], i) => ({ id: `${li}-${i}`, title, language, level: exports.levels[i % 3], category: i === 6 ? 'Profissional' : i === 7 ? 'Cotidiano' : 'Viagens', description, image, stages: makeStages(language, title) })));
exports.metrics = ['gramática', 'vocabulário', 'compreensão', 'contexto', 'fluidez', 'pronúncia'];
exports.sampleReport = { title: 'Restaurante', language: 'Inglês', score: 88, metrics: { gramática: 86, vocabulário: 90, compreensão: 92, contexto: 88, fluidez: 85, pronúncia: null }, strengths: ['Uso natural de expressões do contexto.', 'Vocabulário variado e apropriado.', 'Boa compreensão das perguntas.'], recommendations: ['Pratique os tempos verbais mais comuns.', 'Treine diálogos um pouco mais longos.', 'Revise expressões de cortesia.'], corrections: [{ original: 'I am agree.', corrected: 'I agree.', reason: 'Agree não precisa do verbo to be.' }, { original: 'I can to order.', corrected: 'I can order.', reason: 'Depois de can, use a forma base.' }, { original: 'I want a water.', corrected: 'I would like some water.', reason: 'Forma mais natural e educada.' }], xp: 250, demo: true };
exports.sampleSessions = ['Restaurante', 'Aeroporto', 'Hotel'].map((title, i) => ({ id: 'demo' + i, title, language: 'Inglês', date: `2025-01-${24 - i}`, minutes: 12 + i * 2, report: { ...exports.sampleReport, title } }));

};
modules["services/contracts"]=function(module,exports,require){"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

};
modules["services/validation"]=function(module,exports,require){"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseReport = parseReport;
exports.parseScript = parseScript;
exports.load = load;
exports.save = save;
const data_1 = require("./data");
const object = (v) => !!v && typeof v === 'object' && !Array.isArray(v);
const str = (v) => typeof v === 'string' && v.trim().length > 0;
const strings = (v) => Array.isArray(v) && v.every(str);
const score = (v) => v === null || (typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 100);
function parseReport(raw) { const v = JSON.parse(raw); if (!object(v) || !str(v.title) || !str(v.language) || !score(v.score ?? null) || !object(v.metrics) || !strings(v.strengths) || !strings(v.recommendations) || !Array.isArray(v.corrections) || !v.corrections.every(c => object(c) && str(c.original) && str(c.corrected) && str(c.reason)) || !(v.xp == null || (typeof v.xp === 'number' && Number.isFinite(v.xp) && v.xp >= 0)))
    throw Error('Relatório inválido. Consulte o modelo JSON.'); for (const key of data_1.metrics)
    if (key in v.metrics && !score(v.metrics[key]))
        throw Error(`Métrica inválida: ${key}. Use 0–100 ou null.`); return { title: v.title, language: v.language, score: (v.score ?? null), metrics: v.metrics, strengths: v.strengths, recommendations: v.recommendations, corrections: v.corrections, xp: (v.xp ?? null), demo: v.demo === true }; }
function parseScript(raw) { const v = JSON.parse(raw); if (!object(v) || !str(v.title) || !str(v.language) || !data_1.levels.includes(v.level) || !Array.isArray(v.stages) || !v.stages.length || !v.stages.every(s => object(s) && str(s.phrase) && str(s.translation) && str(s.pronunciation) && (s.reply === undefined || str(s.reply))))
    throw Error('Roteiro inválido: informe title, language, level e stages com phrase, translation e pronunciation.'); return { id: 'local-' + Date.now(), title: v.title, language: v.language, level: v.level, category: str(v.category) ? v.category : 'Importado', description: str(v.description) ? v.description : 'Roteiro importado localmente.', image: 'daily', stages: v.stages }; }
function load(key, fallback) { try {
    const raw = localStorage.getItem('speakup:' + key);
    return raw ? JSON.parse(raw) : fallback;
}
catch {
    return fallback;
} }
function save(key, value) { try {
    localStorage.setItem('speakup:' + key, JSON.stringify(value));
}
catch { /* storage may be unavailable */ } }

};
const App=req('App').SpeakUp;function render(){D.render(h(App,{path:route(),go}),document.getElementById('root'))}go=p=>{history.pushState(null,'',p);render()};window.addEventListener('popstate',render);render();})();