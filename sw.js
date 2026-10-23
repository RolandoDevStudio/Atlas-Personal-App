/* Versioned demo-only shell cache. Never cache user-generated POSTs or external requests. */
const CACHE_NAME='atlas-personal-v0.6.1-intro-ux';
const ASSETS=['./','./index.html','./atlas-icon.svg','./manifest.webmanifest','./sprint-b.js','./sprint-b.css','./sprint-c.js','./sprint-c.css','./onboarding-intro.js','./onboarding-intro.css'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('atlas-personal-')&&key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin)return;
 if(request.mode==='navigate'){
  event.respondWith(fetch(request).catch(()=>caches.match('./index.html')));
  return;
 }
 if(!ASSETS.some(asset=>url.pathname.endsWith(asset.slice(1))))return;
 event.respondWith(caches.match(request).then(cached=>cached||fetch(request)));
});
