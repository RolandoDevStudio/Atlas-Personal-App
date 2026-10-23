'use strict';
/* v0.6.1: progressive, noncoercive product introduction on fictional demo data.
   Keeps existing first-visit safety disclosure as the first gate. */
const introSteps=[
 {title:'¿Qué es Atlas Personal?',text:'Una herramienta para registrar experiencias, organizar recuerdos y explorar tu historia a partir de lo que tú has escrito.',action:'Ver un ejemplo ficticio'},
 {title:'Registra sin interpretaciones automáticas',text:'En el Diario puedes escribir una experiencia. El texto original queda separado de las notas posteriores. Esta demo utiliza solo relatos inventados.',action:'Conocer el Diario'},
 {title:'Recorre tu línea de vida',text:'Ordena acontecimientos por fecha, consulta su fuente y busca palabras. Puedes ocultar un ejemplo sin borrarlo.',action:'Ver la línea de vida'},
 {title:'Explora temas y encuentra fuentes',text:'El Mapa reúne conexiones ilustrativas; el buscador muestra coincidencias con referencias, sin diagnosticar ni inventar recuerdos.',action:'Explorar el mapa'}
];
let introStep=0,introPreviousFocus=null;
function introSeen(){try{return sessionStorage.getItem('atlas-intro-v061')==='done'}catch(e){return false}}
function introMarkSeen(){try{sessionStorage.setItem('atlas-intro-v061','done')}catch(e){}}
function introDialog(){
 let el=document.getElementById('atlasIntroWizard');
 if(el)return el;
 el=document.createElement('div');
 el.id='atlasIntroWizard';el.className='atlas-intro-layer';el.hidden=true;
 el.innerHTML='<section role="dialog" aria-modal="true" aria-labelledby="atlasIntroTitle" aria-describedby="atlasIntroBody" class="atlas-intro-dialog"><div id="atlasIntroContent"></div></section>';
 document.body.append(el);return el;
}
function introOpen(step=0){
 if(document.getElementById('sprintWelcome')?.hidden===false){return;}
 introPreviousFocus=document.activeElement;introStep=Math.min(Math.max(0,step),introSteps.length-1);
 const el=introDialog();el.hidden=false;document.body.style.overflow='hidden';introPaint();
}
function introClose(){
 introDialog().hidden=true;document.body.style.overflow='';
 introMarkSeen();
 if(introPreviousFocus&&introPreviousFocus.isConnected)introPreviousFocus.focus();
 introPreviousFocus=null;
}
function introPaint(){
 const step=introSteps[introStep],el=document.getElementById('atlasIntroContent');
 el.innerHTML='<p class="atlas-intro-eyebrow">Guía rápida · Paso '+(introStep+1)+' de '+introSteps.length+'</p>'+
 '<div class="atlas-intro-progress" aria-label="Progreso de la guía">'+introSteps.map((_,i)=>'<span class="'+(i<=introStep?'completed':'')+'"></span>').join('')+'</div>'+
 '<div class="atlas-intro-illustration" aria-hidden="true">'+['🧭','✍️','🗓️','🔎'][introStep]+'</div>'+
 '<h2 id="atlasIntroTitle">'+step.title+'</h2><p id="atlasIntroBody">'+step.text+'</p>'+
 '<p class="atlas-intro-footnote">Explorarás la historia completamente ficticia de Marina. Atlas no ofrece terapia ni diagnóstico; no introduzcas datos personales ni sensibles.</p>'+
 '<div class="atlas-intro-buttons">'+(introStep>0?'<button class="btn secondary" onclick="introGo(-1)">Anterior</button>':'')+
 '<button class="btn" onclick="introGo(1)">'+(introStep===introSteps.length-1?'Comenzar a explorar':'Siguiente')+'</button>'+
 '<button class="btn secondary" onclick="introClose()">Saltar guía</button></div>';
 el.querySelector('button')?.focus();
}
function introGo(direction){introStep+=direction;if(introStep>=introSteps.length){introClose();navTo('timeline');return;}if(introStep<0)introStep=0;introPaint();}
document.addEventListener('keydown',event=>{
 const el=document.getElementById('atlasIntroWizard');
 if(!el||el.hidden)return;
 if(event.key==='Escape'){event.preventDefault();introClose();}
 if(event.key==='Tab'){
  const focusable=[...el.querySelectorAll('button:not([disabled])')];
  const first=focusable[0],last=focusable[focusable.length-1];
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
 }
});
const introOriginalWelcomeClose=closeSprintWelcome;
closeSprintWelcome=function(){
 introOriginalWelcomeClose();
 if(!introSeen())requestAnimationFrame(()=>introOpen(0));
};
const introFeatures=[
 ['✍️','Registrar experiencias','Añade un recuerdo ficticio y revisa el texto antes de guardarlo.','diario'],
 ['🗓️','Organizar tu historia','Explora la línea de vida por fechas, categorías y palabras.','timeline'],
 ['🧩','Ver conexiones','Consulta temas con enlaces a los testimonios de origen.','mapa'],
 ['🔎','Buscar recuerdos','Haz búsquedas descriptivas en ejemplos, sin IA generativa.','explorar']
];
function introHome(){
 const tiles=introFeatures.map(([emoji,title,desc,page])=>
 '<article class="atlas-intro-tile"><span aria-hidden="true" class="atlas-intro-tile-icon">'+emoji+'</span><h3>'+title+'</h3><p>'+desc+'</p><button class="btn secondary" onclick="navTo(\''+page+'\')">Explorar →</button></article>').join('');
 return '<section class="atlas-intro-hero" aria-labelledby="atlasIntroHero">'+
 '<p class="atlas-intro-eyebrow">ATLAS PERSONAL · TU HISTORIA EN CONTEXTO</p>'+
 '<h1 id="atlasIntroHero">Tus recuerdos, organizados para comprender tu historia.</h1>'+
 '<p>Registra experiencias, construye tu línea de vida y explora los temas que aparecen en tus propios relatos, siempre con acceso a las fuentes originales.</p>'+
 '<p class="atlas-intro-footnote">Esta versión es una demostración con historias ficticias. No es terapia ni diagnóstico.</p>'+
 '<div class="atlas-intro-buttons"><button class="btn" onclick="introOpen()">Comenzar recorrido guiado</button>'+
 '<button class="btn secondary" onclick="navTo(\'timeline\')">Explorar historia de ejemplo</button>'+
 '<button class="btn secondary" onclick="openAdd()">Probar registro ficticio</button></div></section>'+
 '<section class="atlas-intro-section" aria-labelledby="introWhat"><div class="atlas-intro-section-head"><h2 id="introWhat">¿Qué puedes hacer en Atlas?</h2><p>Cuatro maneras sencillas de comenzar.</p></div><div class="atlas-intro-grid">'+tiles+'</div></section>'+
 '<section class="atlas-intro-next"><div><h2>¿Cómo comenzar?</h2><p><b>1.</b> Recorre una historia inventada. <b>2.</b> Abre un testimonio y comprueba su fuente. <b>3.</b> Prueba el diario con un ejemplo ficticio.</p></div><button class="btn" onclick="introOpen()">Ver guía de 4 pasos</button></section>'+
 '<section class="atlas-intro-more"><h2>Explorar el resto del prototipo</h2><p>Si ya conoces Atlas, puedes ir directamente a los módulos existentes.</p><button class="btn secondary" onclick="introShowDashboard()">Ver panel avanzado de demostración</button></section>';
}
let introDashboard=false;
function introShowDashboard(){introDashboard=true;render();}
const introPreviousHome=atlasBHome;
atlasBHome=function(){return introDashboard?'<div class="atlas-intro-back"><button class="btn secondary" onclick="introDashboard=false;render()">← Volver a la introducción</button></div>'+introPreviousHome():introHome();};
function introStartIfReady(){
 if(introSeen())return;
 const safety=document.getElementById('sprintWelcome');
 if(safety?.hidden===false)return;
 introOpen();
}
window.addEventListener('pageshow',()=>{if(!introSeen()&&document.getElementById('sprintWelcome')?.hidden!==false)setTimeout(introStartIfReady,100)});
render();
