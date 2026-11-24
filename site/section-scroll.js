/* Settle between sections, while leaving each pinned animation's timeline native. */
(()=>{'use strict';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let timer=0,direction=0,gestureStart=0,lastInput=0,touchY=null,glideRaf=0;
// Settling uses its own eased glide instead of the browser's smooth scroll: the native animation is short
// and abrupt (a visible tug once the gesture's momentum has died), and its length can't be tuned.
const easeInOut=k=>k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;
function cancelGlide(){if(glideRaf){cancelAnimationFrame(glideRaf);glideRaf=0;}}
function glide(to){
 cancelGlide();
 const from=scrollY,distance=to-from,duration=Math.min(900,Math.max(380,260+Math.abs(distance)*.9));let begin=0;
 const step=now=>{
  if(!begin)begin=now;
  const k=Math.min(1,(now-begin)/duration);
  window.scrollTo({top:from+distance*easeInOut(k),behavior:'instant'});
  glideRaf=k<1?requestAnimationFrame(step):0;
 };
 glideRaf=requestAnimationFrame(step);
}
function layout(){
 const nav=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'))||64;
 const y=scrollY,max=document.documentElement.scrollHeight-innerHeight;
 const stops=[0],protectedRanges=[];
 document.querySelectorAll('main > section:not([hidden])').forEach(el=>stops.push(Math.max(0,el.getBoundingClientRect().top+y-nav)));
 document.querySelectorAll('#product,#company,#esg,.swap-scroll.is-compact,#network,.app-story').forEach(section=>{
  const top=section.getBoundingClientRect().top+y-nav,end=top+section.offsetHeight-(innerHeight-nav);
  if(end>top+2){protectedRanges.push([top-2,end]);stops.push(end);}
 });
 [['.battery-title-scene.is-ready','.battery-title-view'],['.motion','.screen'],['.swap-scroll.is-scroll-ready','.swap-stage'],['.lifestyle-scroll.is-scroll-ready','.lifestyle-viewport']].forEach(([a,b])=>{
  const el=document.querySelector(a),view=el?.querySelector(b);if(!view)return;
  const top=el.getBoundingClientRect().top+y-(a==='.motion'?0:nav),end=top+el.offsetHeight-view.offsetHeight;
  stops.push(top,end);protectedRanges.push([top,end]);
 });
 return {stops:[...new Set(stops.map(n=>Math.max(0,Math.min(max,n))))].sort((a,b)=>a-b),protectedRanges};
}
function settle(){
 timer=0;if(reduced.matches||!direction)return;
 const y=scrollY,{stops,protectedRanges}=layout();
 // Never complete or skip a product/image timeline on behalf of the user.
 if(protectedRanges.some(([a,b])=>y>a+2&&y<b-2))return;
 const destination=direction>0?stops.find(n=>n>y+3):[...stops].reverse().find(n=>n<y-3);
 if(destination===undefined||Math.abs(destination-y)>innerHeight*1.25||Math.abs(y-gestureStart)<4)return;
 direction=0;glide(destination);
}
function input(delta){
 if(reduced.matches||Math.abs(delta)<1)return;
 const now=performance.now();if(now-lastInput>220){gestureStart=scrollY;direction=Math.sign(delta);}else direction=Math.sign(delta);
 lastInput=now;cancelGlide();clearTimeout(timer);timer=setTimeout(settle,150);
}
addEventListener('wheel',e=>{if(e.defaultPrevented||e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY)||e.target.closest('input,textarea,select,[contenteditable="true"]'))return;input(e.deltaY);},{passive:true});
addEventListener('touchstart',e=>{touchY=e.touches[0]?.clientY;},{passive:true});
addEventListener('touchmove',e=>{const y=e.touches[0]?.clientY;if(touchY!==null&&y!==undefined)input(touchY-y);touchY=y;},{passive:true});
// Wait for touch momentum to stop; programmatic scrolling has no pending direction.
addEventListener('scroll',()=>{if(direction){clearTimeout(timer);timer=setTimeout(settle,150);}},{passive:true});
addEventListener('keydown',()=>{clearTimeout(timer);cancelGlide();direction=0;});
addEventListener('pointerdown',()=>{clearTimeout(timer);cancelGlide();direction=0;});
addEventListener('touchstart',cancelGlide,{passive:true});
addEventListener('resize',()=>{clearTimeout(timer);cancelGlide();direction=0;});
})();
