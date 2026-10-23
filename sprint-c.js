'use strict';
/* Sprint C: illustrative transcription ONLY; never requests microphone access. */
const atlasCExamples=[
 'Marina visitó una biblioteca imaginaria y escribió sobre lo que aprendió al conversar con una amiga.',
 'Durante un paseo ficticio, Marina recordó un proyecto de trabajo y decidió ordenar sus notas.',
 'En el relato inventado, Marina descubrió un taller de acuarela y disfrutó una tarde tranquila.'
];
let atlasCExampleIndex=0;
let atlasCLastCapture=null;
const atlasCOriginalOpenAdd=openAdd;
openAdd=function(){
 atlasCOriginalOpenAdd();
 const pane=document.getElementById('modalContent');
 if(!pane)return;
 const editor=pane.querySelector('#voiceInput');
 if(!editor)return;
 editor.setAttribute('aria-describedby','atlasCVoiceNotice');
 const label=pane.querySelector('label[for="voiceInput"]');
 if(label)label.insertAdjacentHTML('beforebegin',
 '<section class="atlas-c-voice"><h3>Dictado ilustrativo · sin micrófono</h3>'+
 '<p id="atlasCVoiceNotice">Puedes simular el resultado de una transcripción de una historia inventada. No se activa el micrófono ni se envía audio.</p>'+
 '<div class="atlas-c-actions"><button type="button" class="btn secondary" onclick="atlasCInsertExample()">Insertar transcripción ficticia</button>'+
 '<button type="button" class="btn secondary" onclick="atlasCClearExample()">Limpiar ejemplo</button></div>'+
 '<p id="atlasCVoiceStatus" aria-live="polite">Escribe o elige un ejemplo para revisarlo.</p></section>');
};
function atlasCInsertExample(){
 const area=document.getElementById('voiceInput'),state=document.getElementById('atlasCVoiceStatus');
 if(!area)return;
 if(area.value.trim()&&!window.confirm('¿Sustituir el texto actual por un relato ficticio?'))return;
 area.value=atlasCExamples[atlasCExampleIndex%atlasCExamples.length];atlasCExampleIndex++;
 area.focus();atlasCLastCapture='simulated';
 if(state)state.textContent='Ejemplo ficticio insertado. Revisa y corrige cada palabra antes de guardarlo.';
}
function atlasCClearExample(){
 const area=document.getElementById('voiceInput');
 if(area){area.value='';area.focus();}
 const state=document.getElementById('atlasCVoiceStatus');if(state)state.textContent='Campo vacío; puedes escribir otro relato ficticio.';
 atlasCLastCapture=null;
}
/* This wrapper leaves Sprint A's reviewed written-capture flow unchanged. */
const atlasCReviewCapture=reviewCapture;
reviewCapture=function(){
 const area=document.getElementById('voiceInput');
 if(area&&atlasCLastCapture==='simulated'){
  const value=area.value.trim();
  if(value.length<12){const status=document.getElementById('atlasCVoiceStatus');if(status)status.textContent='El texto ficticio necesita al menos 12 caracteres.';return;}
 }
 atlasCReviewCapture();
 atlasCLastCapture=null;
};
/* Installation CTA is shown only when the platform actually reports an install prompt. */
const atlasCInstallationDismiss=dismissInstall;
dismissInstall=function(){
 atlasCInstallationDismiss();
 try{sessionStorage.setItem('atlas-c-install-dismissed','yes')}catch(e){}
};
installCard=function(){
 const target=document.getElementById('installArea');
 if(!target)return;
 if(installDismissed||!installPrompt||window.matchMedia('(display-mode: standalone)').matches){
  target.innerHTML='';return;
 }
 target.innerHTML='<section class="pwa-callout" role="status">'+
 '<h4>Instalar Atlas · demostración</h4><p>La instalación permite abrir la interfaz como aplicación, pero <strong>no crea cuenta, respaldo, cifrado ni almacenamiento seguro</strong>. No ingreses experiencias reales.</p>'+
 '<div class="atlas-c-actions"><button class="btn" onclick="installAtlas()">Instalar demostración</button>'+
 '<button class="btn secondary" onclick="dismissInstall()">Ahora no</button></div></section>';
};
try{if(sessionStorage.getItem('atlas-c-install-dismissed')==='yes')installDismissed=true}catch(e){}
window.addEventListener('pageshow',()=>{if(!installDismissed)installCard()});
window.addEventListener('appinstalled',()=>{installPrompt=null;dismissInstall()});
/* Auditable descriptions; never render a fake paid checkout. */
const atlasCBasePlans=plans;
plans=function(){
 return '<div class="atlas-c-banner" role="note"><strong>Precios exclusivamente ilustrativos.</strong> No puedes contratar ni pagar aquí; esta versión no activa planes ni prestaciones clínicas.</div>'+atlasCBasePlans();
};
