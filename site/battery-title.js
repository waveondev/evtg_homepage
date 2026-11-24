(()=>{'use strict';
/*
 * "충전을 기다리는 대신, 배터리를 교환하세요." — ink-fill title.
 * The fill follows the scroll position (as before), and ALSO plays by itself once the title is pinned,
 * so a mouse wheel doesn't have to be spun for the text to complete. Scrolling further still drives the
 * fade-out at the end of the scene.
 */
const root=document.querySelector('.battery-title-scene'),view=root.querySelector('.battery-title-view'),lines=[...root.querySelectorAll('.battery-title-line')],reduced=matchMedia('(prefers-reduced-motion: reduce)');
let p=0,o=0,target=0,raf=0,last=0,navH=0,auto=0,autoOn=false,autoStarted=false;
const AUTO_MAX=.85,AUTO_MS=2000; // .85 = both lines fully inked, before the scroll-driven fade-out begins
const clamp=n=>Math.max(0,Math.min(1,n));
const readNav=()=>{navH=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'))||64;};readNav();
function paint(){
 lines.forEach((el,i)=>{const k=clamp((p-i*.38)/.38);el.style.setProperty('--ink-progress',`${k*100}%`);el.style.setProperty('--cursor-opacity',k>0&&k<1?1:0);});
 view.style.setProperty('--title-opacity',1-o*.85);view.style.setProperty('--title-y',`${-o*36}px`);
}
function tick(t){
 raf=0;const dt=last?Math.min(32,t-last):16.7;last=t;
 if(autoOn){auto=Math.min(AUTO_MAX,auto+dt/AUTO_MS*AUTO_MAX);if(auto>=AUTO_MAX)autoOn=false;}
 // Ink: plays by itself (auto), or follows the scroll if that is further along. Fade-out: follows the scroll right after the
 // text is complete, so there is no stretch of "dead" scrolling between finishing the text and leaving the section.
 const ink=Math.max(Math.min(target,AUTO_MAX),auto),fade=clamp((target-.45)/.55),k=1-Math.exp(-dt/100);
 p+=(ink-p)*k;o+=(fade-o)*k;
 if(Math.abs(ink-p)<.0001)p=ink;
 if(Math.abs(fade-o)<.0001)o=fade;
 paint();
 if(p!==ink||o!==fade||autoOn)raf=requestAnimationFrame(tick);
}
function update(){
 if(reduced.matches)return;
 const r=root.getBoundingClientRect();
 target=clamp((navH-r.top)/Math.max(1,root.offsetHeight-view.offsetHeight));
 // Start once the title is pinned under the header; rewind when the user scrolls back above the scene.
 if(!autoStarted&&r.top<=navH+24&&r.bottom>navH){autoStarted=true;autoOn=true;auto=0;}
 else if(r.top>navH+view.offsetHeight*.6){autoStarted=false;autoOn=false;auto=0;}
 if(!raf){last=0;raf=requestAnimationFrame(tick);}
}
function setup(){
 root.classList.toggle('is-ready',!reduced.matches);
 if(reduced.matches){
  if(raf)cancelAnimationFrame(raf);raf=0;
  lines.forEach(el=>{el.style.setProperty('--ink-progress','100%');el.style.setProperty('--cursor-opacity',0)});
  view.style.setProperty('--title-opacity',1);view.style.setProperty('--title-y','0px');
 }else update();
}
addEventListener('scroll',update,{passive:true});addEventListener('resize',()=>{readNav();update();});reduced.addEventListener('change',setup);setup();
})();
