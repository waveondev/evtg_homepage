(()=>{'use strict';
const section=document.querySelector('.lifestyle-scroll'),view=section.querySelector('.lifestyle-viewport'),card=section.querySelector('.lifestyle'),lines=[...section.querySelectorAll('.lifestyle-line>span')],reduced=matchMedia('(prefers-reduced-motion: reduce)');
let target=0,position=0,raf=0,last=0,geometry={},autoProgress=0,autoPlaying=false,autoStarted=false;
const clamp=n=>Math.max(0,Math.min(1,n));
const smooth=n=>{n=clamp(n);return n*n*n*(n*(n*6-15)+10);};
const range=(p,a,b)=>smooth((p-a)/(b-a));
function measure(){
 const w=card.clientWidth,h=card.clientHeight,mobile=innerWidth<760;
 geometry={w,h,square:Math.min(w*(mobile?.56:.34),h*.48,300),nav:parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'))||64};
}
function paint(p){
 const opening=range(p,.04,.64),{w,h,square}=geometry;
 card.style.setProperty('--crop-x',`${Math.max(0,(w-square)/2)*(1-opening)}px`);
 card.style.setProperty('--crop-y',`${Math.max(0,(h-square)/2)*(1-opening)}px`);
 card.style.setProperty('--photo-width',`${square+(w-square)*opening}px`);
 card.style.setProperty('--photo-height',`${square+(h-square)*opening}px`);
 card.style.setProperty('--photo-scale',1.09);
 card.style.setProperty('--shade-opacity',range(p,.32,.73));
 const eyebrow=range(p,.38,.57),body=range(p,.74,.91);
 card.style.setProperty('--eyebrow-opacity',eyebrow);card.style.setProperty('--eyebrow-y',`${(1-eyebrow)*20}px`);
 lines.forEach((el,i)=>{const k=range(p,.46+i*.11,.68+i*.11);el.style.setProperty('--line-y',`${(1-k)*110}%`);el.style.setProperty('--line-opacity',k);});
 card.style.setProperty('--body-opacity',body);card.style.setProperty('--body-y',`${(1-body)*24}px`);
}
function tick(t){
 raf=0;const dt=last?Math.min(32,t-last):16.7;last=t;
 if(autoPlaying){autoProgress=Math.min(1,autoProgress+dt/2400);if(autoProgress===1)autoPlaying=false;}
 const destination=Math.max(target,autoProgress);
 position+=(destination-position)*(1-Math.exp(-dt/110));
 if(Math.abs(destination-position)<.0002)position=destination;
 paint(position);if(position!==destination||autoPlaying)raf=requestAnimationFrame(tick);
}
function update(){
 if(reduced.matches)return;
 const r=section.getBoundingClientRect();target=clamp((geometry.nav-r.top)/Math.max(1,section.offsetHeight-view.offsetHeight));
 if(r.top>geometry.nav+view.offsetHeight*.6){autoStarted=false;autoPlaying=false;autoProgress=0;}
 if(!autoStarted&&r.top<=geometry.nav+24&&r.bottom>geometry.nav){autoStarted=true;autoPlaying=true;autoProgress=Math.max(.04,position);}
 if(!raf)raf=requestAnimationFrame(tick);
}
function resize(){measure();paint(position);update();}
function setup(){
 section.classList.toggle('is-scroll-ready',!reduced.matches);
 if(raf)cancelAnimationFrame(raf);raf=0;last=0;autoStarted=false;autoPlaying=false;autoProgress=0;
 measure();if(reduced.matches){position=target=1;paint(1);}else{const r=section.getBoundingClientRect();position=target=clamp((geometry.nav-r.top)/Math.max(1,section.offsetHeight-view.offsetHeight));paint(position);update();}
}
addEventListener('scroll',update,{passive:true});addEventListener('resize',resize);reduced.addEventListener('change',setup);
setup();
})();
