/* Page-wide motion: native scrolling, progressive enhancement, no external runtime. */
(()=>{'use strict';
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),mobile=matchMedia('(max-width: 759px)');
const header=document.querySelector('.site-header'),animations=new Set(),targets=[],activeScenes=new Set();
let revealObserver,sceneObserver,raf=0;
const clamp=n=>Math.max(0,Math.min(1,n));
function register(selector,variant='rise',step=90){
 document.querySelectorAll(selector).forEach((el,i)=>{
  if(el.closest('.lifestyle,.battery-title-scene')||targets.some(t=>t.el===el))return;
  const item={el,variant,delay:(i%3)*step,seen:false};targets.push(item);el.dataset.motion=variant;
 });
}
// Text and images have their own entrance rhythm; the hero's existing scroll
// timeline remains the sole owner of product position and caption visibility.
// Hero entrance owns its title and product choreography.
register('main > section .kicker','rise',0);
register('main > section h2','rise',0);
register('main > section .lead, .lifestyle > div > p:last-child, .contact-section > p:not(.kicker)','rise',0);
register('.swap-grid > figure, .detail-grid > figure','image',130);
register('.station-render','right',0);
register('.app-layout > img','left',0);
register('.esg-layout > img','image',0);
// Company illustrations remain static until animation is requested.
register('.esg-points > p','left',100);
register('main > section .button, main > section .text-link, .contact-section .email','rise',80);
register('.footer-top, .footer-bottom','rise',80);
// Offset adjacent copy modestly without imposing a delay between whole sections.
for(const item of targets){
 if(item.el.matches('h2'))item.delay=90;
 if(item.el.matches('.lead, .lifestyle > div > p:last-child, .contact-section > p:not(.kicker)'))item.delay=170;
}
function show(item,instant=false){
 if(item.seen)return;item.seen=true;item.el.classList.remove('motion-pending');revealObserver?.unobserve(item.el);
 if(instant||reduced.matches)return;
 const distance=mobile.matches?22:44;
 const from=item.variant==='left'?`translate3d(${-distance}px,0,0)`:item.variant==='right'?`translate3d(${distance}px,0,0)`:item.variant==='image'?`translate3d(0,${distance}px,0) scale(.965)`:`translate3d(0,${distance}px,0)`;
 const animation=item.el.animate([{opacity:0,transform:from},{opacity:1,transform:'translate3d(0,0,0) scale(1)'}],{duration:item.variant==='image'?1050:850,delay:mobile.matches?Math.min(item.delay,100):item.delay,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});
 animations.add(animation);animation.finished.catch(()=>{}).finally(()=>animations.delete(animation));
}
const scenes=[];
function render(){
 raf=0;header.classList.toggle('has-scrolled',scrollY>0);
 if(reduced.matches)return;
 // Read all geometry before writing transforms. Only visible scenes participate.
 const values=[...activeScenes].map(el=>({el,p:clamp((innerHeight-el.getBoundingClientRect().top)/(innerHeight+el.offsetHeight))}));
 for(const {el,p} of values){
  el.style.setProperty('--scene-progress',p.toFixed(4));
  el.style.setProperty('--scene-drift',`${(p-.5)*(mobile.matches?18:48)}px`);
 }
}
function schedule(){if(!raf)raf=requestAnimationFrame(render);}
function setup(){
 revealObserver?.disconnect();sceneObserver?.disconnect();activeScenes.clear();
 for(const a of animations)a.cancel();animations.clear();
 if(reduced.matches||!('IntersectionObserver' in window)||!Element.prototype.animate){
  targets.forEach(t=>show(t,true));targets.forEach(t=>t.el.classList.remove('motion-pending'));
  scenes.forEach(el=>{el.style.removeProperty('--scene-drift');el.style.removeProperty('--scene-progress');});schedule();return;
 }
 revealObserver=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){const item=targets.find(t=>t.el===entry.target);show(item);}},{threshold:0,rootMargin:'0px 0px -7% 0px'});
 targets.forEach(item=>{
  if(item.seen)return;
  const r=item.el.getBoundingClientRect();
  if(r.bottom<0){show(item,true);return;}
  item.el.classList.add('motion-pending');revealObserver.observe(item.el);
 });
 sceneObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting)activeScenes.add(entry.target);else activeScenes.delete(entry.target);}schedule();},{rootMargin:'100px'});
 scenes.forEach(el=>sceneObserver.observe(el));schedule();
}
// Keyboard navigation never lands on an invisible control during an entrance.
addEventListener('focusin',e=>{for(const item of targets)if(item.el===e.target||item.el.contains(e.target))show(item,true);for(const a of animations)if(a.effect?.target?.contains(e.target))a.finish();});
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reduced.addEventListener('change',setup);
addEventListener('pagehide',()=>{for(const a of animations)a.cancel();});
setup();
})();
