'use strict';
/* Sprint B: demo-only evidence model, reversible timeline, descriptive map,
   grounded local search, optional charts. No storage or external APIs. */
const atlasB = {
  notes:new Map(), hidden:new Set(), hiddenEdges:new Set(),
  showCharts:false, mapAsList:false, revision:0
};
const atlasBTime=()=>new Date().toISOString();
function atlasBEscape(s){return esc(String(s ?? ''));}
function atlasBAll(){return all();}
function atlasBEntry(id){return atlasBAll().find(e=>e.id===Number(id));}
function atlasBNoteList(id){return atlasB.notes.get(Number(id))||[];}
function atlasBWhen(e){return (e.datePrecision==='approximate'?'Fecha aproximada: ':e.datePrecision==='unknown'?'Fecha desconocida · ':'Fecha del acontecimiento: ')+(e.datePrecision==='unknown'?'sin precisar':prettyDate(e.date));}
function atlasBSource(e){return '[T] Testimonio ficticio · '+atlasBEscape(e.source||'Origen no documentado')+' · '+atlasBWhen(e);}
function atlasBSetHidden(id,val){const n=Number(id);if(val)atlasB.hidden.add(n);else atlasB.hidden.delete(n);render();}
function atlasBShowHidden(){atlasB.showHidden=!atlasB.showHidden;render();}
function atlasBHideEdge(id){atlasB.hiddenEdges.add(id);render();}
function atlasBResetEdge(){atlasB.hiddenEdges.clear();render();}
function atlasBModal(id){
 const e=atlasBEntry(id);if(!e)return;
 modalEl.classList.add('open');
 const ns=atlasBNoteList(id);
 document.getElementById('modalContent').innerHTML=
  '<div class="modal-head"><div class="kicker">FUENTE ORIGINAL · [T]</div><button class="icon-btn" onclick="closeModal()" aria-label="Cerrar detalle">✕</button></div>'+
  '<h2>'+atlasBEscape(e.title)+'</h2><div class="atlas-b-source">'+atlasBSource(e)+'</div>'+
  '<p class="detailtext">'+atlasBEscape(e.detail)+'</p>'+
  '<div class="atlas-b-provenance"><strong>[D] Metadatos descriptivos</strong><p>Área: '+atlasBEscape(e.type||'Sin categoría')+' · Fecha de registro: '+atlasBEscape(e.recordedAt||'No documentada')+'</p>'+
  '<p>Los metadatos son parte del ejemplo; no prueban que el acontecimiento haya ocurrido.</p></div>'+
  '<div class="atlas-b-toolbar"><button class="btn secondary" onclick="atlasBNoteEditor('+e.id+')">Añadir cómo lo veo hoy [I]</button>'+
  '<button class="btn secondary" onclick="atlasBSetHidden('+e.id+','+(!atlasB.hidden.has(e.id))+');closeModal()">'+(atlasB.hidden.has(e.id)?'Mostrar en línea de vida':'Ocultar de la línea de vida')+'</button></div>'+
  '<h3>Perspectivas posteriores</h3>'+(ns.length?ns.map(n=>'<div class="atlas-b-source"><b>[I] Nota posterior · '+atlasBEscape(n.created)+'</b><p>'+atlasBEscape(n.text)+'</p><small>Autoría: visitante de la demo · no es prueba de causalidad ni sustituye [T].</small></div>').join(''):'<p class="metadata">Todavía no hay notas posteriores sobre este ejemplo.</p>')+
  '<p class="small-warning">Conservar la fuente original no equivale a validar externamente el relato. Todo es ficticio y temporal.</p>';
}
function atlasBNoteEditor(id){
 const e=atlasBEntry(id);if(!e)return;
 modalEl.classList.add('open');
 document.getElementById('modalContent').innerHTML=
  '<div class="modal-head"><div class="kicker">PERSPECTIVA POSTERIOR · [I]</div><button class="icon-btn" onclick="atlasBModal('+id+')">Volver</button></div>'+
  '<h2>'+atlasBEscape(e.title)+'</h2><p>Este texto se agrega como una nota fechada. No modifica el testimonio original.</p>'+
  '<form onsubmit="atlasBSaveNote(event,'+id+')"><label class="field" for="atlasBNoteText">Perspectiva ficticia</label>'+
  '<textarea id="atlasBNoteText" class="capture" maxlength="1500" required placeholder="Ejemplo: hoy Marina recuerda este episodio desde otro punto de vista…"></textarea>'+
  '<p class="warn">Usa exclusivamente contenido inventado; las notas se perderán al recargar.</p>'+
  '<div class="atlas-b-toolbar"><button class="btn" type="submit">Agregar nota [I]</button><button class="btn secondary" type="button" onclick="atlasBModal('+id+')">Cancelar</button></div></form>';
}
function atlasBSaveNote(event,id){
 event.preventDefault();const el=document.getElementById('atlasBNoteText');const text=el.value.trim();if(!text)return;
 const prev=atlasB.notes.get(id)||[];prev.push({text,created:atlasBTime()});atlasB.notes.set(id,prev);atlasB.revision++;atlasBModal(id);
}
function atlasBVisible(e){return !atlasB.hidden.has(e.id)||atlasB.showHidden;}
function atlasBFilter(){
 const terms=(timelineQuery||'').toLocaleLowerCase('es-MX').split(',').map(x=>x.trim()).filter(Boolean);
 return atlasBAll().filter(e=>atlasBVisible(e)&&(filter==='Todos'||e.type===filter)&&(timelineYear==='Todos'||e.date.startsWith(timelineYear))&&
 (!terms.length||terms.some(t=>(e.title+' '+e.detail+' '+e.tags.join(' ')).toLocaleLowerCase('es-MX').includes(t))));
}
function atlasBTimeline(){
 const cats=['Todos','relaciones','trabajo','bienestar','logros'];
 const years=[...new Set(atlasBAll().map(e=>e.date.slice(0,4)))].sort((a,b)=>b.localeCompare(a));
 const items=atlasBFilter(),show=items.slice(0,timelineLimit);
 let oldYear='',rows='';
 show.forEach(e=>{const y=e.date.slice(0,4);if(y!==oldYear){rows+='<h2 class="timeline-year">'+y+'</h2>';oldYear=y;}
 rows+='<article class="timeline-item '+(atlasB.hidden.has(e.id)?'atlas-b-hidden':'')+'"><button class="linkbtn" onclick="atlasBModal('+e.id+')">'+atlasBEscape(e.title)+'</button><p>'+atlasBEscape(e.detail)+'</p><small>'+atlasBWhen(e)+' · [T] relato ficticio'+(atlasB.hidden.has(e.id)?' · Oculto':'')+'</small>'+
 '<div class="atlas-b-toolbar"><button class="btn secondary" onclick="atlasBSetHidden('+e.id+','+(!atlasB.hidden.has(e.id))+')">'+(atlasB.hidden.has(e.id)?'Mostrar':'Ocultar')+'</button><button class="btn secondary" onclick="atlasBModal('+e.id+')">Ver fuente [T]</button></div></article>';});
 return headings('CRONOLOGÍA CON FUENTES','Tu línea de vida','Fechas, áreas, palabras y testimonios ficticios. Ocultar es reversible, no equivale a eliminar.',btn('Nuevo registro'))+
 '<div class="pillnav">'+cats.map(x=>'<button class="pill '+(filter===x?'selected':'')+'" onclick="setFilter(\''+x+'\')">'+(x==='Todos'?'Todos':x)+'</button>').join('')+'</div>'+
 '<form class="timeline-search" onsubmit="submitTimelineSearch(event)"><label for="timelineInput">Buscar palabras</label><input id="timelineInput" value="'+atlasBEscape(timelineQuery)+'" placeholder="Ej. trabajo, viajes" maxlength="160"><label for="timelineYear">Año</label><select id="timelineYear"><option value="Todos">Todos los años</option>'+years.map(y=>'<option '+(timelineYear===y?'selected':'')+'>'+y+'</option>').join('')+'</select><button class="btn" type="submit">Buscar</button><button class="btn secondary" type="button" onclick="clearTimeline()">Limpiar</button></form>'+
 '<div class="atlas-b-toolbar"><button class="btn secondary" aria-pressed="'+!!atlasB.showHidden+'" onclick="atlasBShowHidden()">'+(atlasB.showHidden?'No mostrar ocultos':'Mostrar ocultos ('+atlasB.hidden.size+')')+'</button><span class="metadata" role="status">'+items.length+' registros encontrados · búsqueda literal local</span></div>'+
 '<div class="card timeline-card">'+(rows||'<p class="empty">No encontramos registros con esos criterios.</p>')+
 (items.length>timelineLimit?'<button class="btn secondary" onclick="timelineLimit+=24;render()">Mostrar más</button>':'')+'</div>';
}
function atlasBMap(){
 const ids=['centro','cambios','vinculos','emociones','trabajo','creatividad'];
 const allowed=ids.filter(id=>!atlasB.hiddenEdges.has(id));
 const nodeRows=allowed.map(id=>{
  const d=mapNodeInfo(id);const records=d.ids.map(n=>atlasBEntry(n)).filter(Boolean);
  return '<div class="atlas-b-provenance"><h3>'+atlasBEscape(d.title)+'</h3><p>'+atlasBEscape(d.copy)+'</p>'+
  '<small>Asociación ilustrativa por tema; no representa causa, diagnóstico ni motivación de terceros.</small>'+
  '<ul>'+records.map(e=>'<li><button class="linkbtn" onclick="atlasBModal('+e.id+')">'+atlasBEscape(e.title)+' · [T]</button></li>').join('')+'</ul>'+
  '<button class="btn secondary" onclick="atlasBHideEdge(\''+id+'\')">Ocultar conexión sugerida</button></div>';
 }).join('');
 return headings('CONEXIONES DESCRIPTIVAS','Mapa de tu historia','Las relaciones se basan en agrupaciones de registros ficticios; nunca infieren motivos ajenos.')+
 '<div class="atlas-b-toolbar"><button class="btn secondary" onclick="atlasB.mapAsList=!atlasB.mapAsList;render()" aria-pressed="'+atlasB.mapAsList+'">'+(atlasB.mapAsList?'Ver mapa visual':'Ver lista accesible')+'</button>'+
 '<button class="btn secondary" onclick="atlasBResetEdge()">Restaurar conexiones</button></div>'+
 (atlasB.mapAsList?'<section class="card pad atlas-b-list"><h2>Conexiones y fuentes</h2>'+nodeRows+'</section>':
 '<div class="map-layout"><div class="map-wrap">'+nodes.filter(n=>allowed.includes(n.id)).map(n=>'<button class="node '+(n.id==='centro'?'center':'')+' '+(selectedNode===n.id?'sel':'')+'" style="left:'+n.x+'%;top:'+n.y+'%" onclick="setNode(\''+n.id+'\')">'+n.t+'</button>').join('')+'</div><section class="card node-detail">'+(()=>{const d=mapNodeInfo(selectedNode);return '<h2>'+atlasBEscape(d.title)+'</h2><p>'+atlasBEscape(d.copy)+'</p><h3>Fuentes originales</h3>'+d.ids.map(id=>{const e=atlasBEntry(id);return e?'<p><button class="linkbtn" onclick="atlasBModal('+id+')">'+atlasBEscape(e.title)+'</button></p>':''}).join('')+'<p class="atlas-b-inline-note">Conexiones ilustrativas, sin inferencia causal.</p>';})()+'</section></div>')+
 '<details class="card pad"><summary>Ver la evidencia de todas las conexiones</summary>'+nodeRows+'</details>';
}
function atlasBNormalize(s){return String(s||'').toLocaleLowerCase('es-MX').normalize('NFD').replace(/[\u0300-\u036f]/g,'');}
const atlasBStop=new Set('sobre para entre desde donde cuando cuales como unos unas toda todo esto esos ese esa este esta tengo haber quiero busca buscares los las del que por con una uno estoy hay mis sus pero porque historia recuerda recuerdos atlas'.split(' '));
function atlasBQuery(q){
 const terms=[...new Set(atlasBNormalize(q).replace(/[^a-z0-9ñ\s]/g,' ').split(/\s+/).filter(w=>w.length>=4&&!atlasBStop.has(w)))];
 const results=terms.length?atlasBAll().map(e=>({e,score:terms.filter(w=>atlasBNormalize(e.title+' '+e.detail+' '+e.type+' '+e.tags.join(' ')).includes(w)).length})).filter(r=>r.score>0).sort((a,b)=>b.score-a.score||b.e.date.localeCompare(a.e.date)).slice(0,8).map(r=>r.e):[];
 return results;
}
function atlasBAsk(q){
 const query=String(q||'').trim();if(!query)return;
 messages.push({from:'me',body:query});
 const result=atlasBQuery(query);
 messages.push(result.length?
 {from:'ai',body:'Respuesta simulada · búsqueda literal. Encontré '+result.length+' registros ficticios relacionados con algunas palabras de tu consulta. Revisa los textos originales para valorar su contexto. No implica un patrón psicológico ni una causa.',refs:result.map(e=>e.id)}:
 {from:'ai',body:'Respuesta simulada: no hay información suficiente en estos registros para responder. Prueba buscar una palabra más específica; no inventaré recuerdos.',refs:[]});
 render();const box=document.getElementById('messages');if(box)box.scrollTop=box.scrollHeight;
}
function atlasBChat(){
 if(sprintPaused)return headings('BÚSQUEDA PAUSADA','Reflexión en pausa','No aparecerán sugerencias adicionales hasta que decidas continuar.')+'<div class="card pad"><button class="btn" onclick="resumeSprint()">Reanudar voluntariamente</button><button class="btn secondary" onclick="navTo(\'inicio\')">Terminar por hoy</button></div>';
 if(!messages.length)messages.push({from:'ai',body:'Este buscador es una simulación con registros inventados. Solo localiza coincidencias textuales, sin diagnosticar ni interpretar.'});
 return headings('BÚSQUEDA DESCRIPTIVA','Pregúntale a tu Atlas','No hay IA conectada. Todas las respuestas se generan localmente con coincidencias textuales y fuentes visibles.')+
 '<div class="atlas-b-toolbar"><button class="btn secondary" onclick="pauseSprint()">Pausar reflexión</button><button class="btn secondary" onclick="navTo(\'timeline\')">Ver línea de vida</button></div>'+
 '<div class="card pad"><div id="messages" role="log" aria-live="polite" class="messages">'+messages.map(m=>'<div class="msg '+(m.from==='me'?'me':'ai')+'"><p>'+atlasBEscape(m.body)+'</p>'+((m.refs||[]).length?'<p>Fuentes: '+m.refs.map(id=>'<button class="linkbtn" onclick="atlasBModal('+id+')">Registro '+id+' [T]</button>').join(' ')+'</p>':'')+'</div>').join('')+'</div>'+
 '<form class="composer" onsubmit="event.preventDefault();atlasBAsk(document.getElementById(\'question\').value)"><label for="question">Consulta solo datos ficticios</label><input id="question" maxlength="300" placeholder="Ej. trabajo, creatividad, familia…" autocomplete="off"><button class="btn" type="submit">Buscar</button></form></div>'+
 '<p class="atlas-b-inline-note">No se envían preguntas a un proveedor de IA. Las palabras parecidas o sinónimos podrían no encontrar coincidencias; la falta de resultados no demuestra que el hecho no exista.</p>';
}
const atlasBBaseHome=home,atlasBBaseDiary=diary,atlasBBaseLibrary=library;
function atlasBChartSwitch(){return '<div class="atlas-b-toolbar"><button class="btn secondary" aria-pressed="'+atlasB.showCharts+'" onclick="atlasB.showCharts=!atlasB.showCharts;render()">'+(atlasB.showCharts?'Ocultar gráficas':'Mostrar gráficas opcionales')+'</button></div><p class="atlas-b-inline-note">Son registros de ejemplo, no medidas clínicas. Mostrar gráficas es optativo.</p>';}
function atlasBHome(){
 const base=atlasBBaseHome();
 return atlasBChartSwitch()+'<div class="'+(atlasB.showCharts?'':'atlas-b-graph-off')+'">'+base+'</div>'+(!atlasB.showCharts?headings('RECUERDOS FICTICIOS','Explora los registros','Puedes registrar o buscar sin activar gráficas.')+'<div class="atlas-b-toolbar"><button class="btn" onclick="navTo(\'timeline\')">Ver línea de vida</button><button class="btn secondary" onclick="openAdd()">Solo registrar</button></div>':'');
}
function atlasBDiary(){
 const base=atlasBBaseDiary();
 return atlasBChartSwitch()+'<div class="'+(atlasB.showCharts?'':'atlas-b-graph-off')+'">'+base+'</div>'+(!atlasB.showCharts?headings('REGISTROS FICTICIOS','Tu diario de ejemplo','Las gráficas están ocultas; el registro sigue disponible.')+'<div class="atlas-b-toolbar"><button class="btn" onclick="openAdd()">Solo registrar</button><button class="btn secondary" onclick="navTo(\'timeline\')">Ver registros</button></div>':'');
}
function atlasBLibrary(){
 const counts=areaCounts();return headings('CATEGORÍAS DESCRIPTIVAS','Áreas de vida','Estas cifras solo cuentan entradas ficticias por categoría, sin evaluar bienestar.')+
 '<div class="card pad"><table class="atlas-b-table"><caption>Conteos de relatos ficticios (alternativa textual a gráficas)</caption><thead><tr><th>Área</th><th>Entradas</th><th>Explorar</th></tr></thead><tbody>'+Object.entries(counts).map(([key,val])=>'<tr><td>'+atlasBEscape(key)+'</td><td>'+val+'</td><td><button class="linkbtn" onclick="filter=\''+key+'\';current=\'timeline\';render()">Ver relatos</button></td></tr>').join('')+'</tbody></table></div>'+atlasBChartSwitch();
}
function atlasBRender(){
 const mapRender={inicio:atlasBHome,timeline:atlasBTimeline,diario:atlasBDiary,mapa:atlasBMap,explorar:atlasBChat,biblioteca:atlasBLibrary,
 apoyo:professional,conexiones:connections,planes:plans,privacidad:privacy};
 const panel=document.getElementById('page');
 panel.innerHTML=(mapRender[current]||atlasBHome)();
 panel.classList.remove('app-enter');
 void panel.offsetWidth;panel.classList.add('app-enter');
 const mic=document.getElementById('floatingMic');if(mic)mic.style.display=current==='inicio'?'none':'block';
 document.querySelectorAll('[data-page]').forEach(x=>{x.classList.toggle('active',x.dataset.page===current);x.setAttribute('aria-current',x.dataset.page===current?'page':'false')});
}
showEvent=atlasBModal;
render=atlasBRender;
sendQuestion=atlasBAsk;
atlasBRender();
