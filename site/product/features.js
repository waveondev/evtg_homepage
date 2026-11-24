(()=>{'use strict';
const root=document.querySelector('#design'),view=root?.querySelector('.company-viewport'),rail=root?.querySelector('.company-carousel');if(!rail)return;
const buttons=[...root.querySelectorAll('.company-controls button')],reduced=matchMedia('(prefers-reduced-motion:reduce)');let raf=0,pinned=false,span=0;
const clamp=n=>Math.max(0,Math.min(1,n));
function update(){raf=0;const rect=root.getBoundingClientRect(),nav=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'))||64;
 const enter=clamp((innerHeight-rect.top)/(innerHeight*.7)),leave=clamp((rect.bottom-nav)/(innerHeight*.7));
 root.style.setProperty('--company-tone',String(255-10*Math.min(enter,leave)));
 if(pinned)rail.scrollLeft=clamp((nav-rect.top)/Math.max(1,root.offsetHeight-view.offsetHeight))*span;
 buttons[0].disabled=rail.scrollLeft<2;buttons[1].disabled=rail.scrollLeft>=span-2;
}
function request(){if(!raf)raf=requestAnimationFrame(update);}
function setup(){
 const mobile=innerWidth<760;
 pinned=(mobile?innerHeight>700:innerHeight>=760)&&!reduced.matches;
 root.classList.toggle('is-horizontal',pinned&&!mobile);
 root.classList.toggle('is-mobile-pinned',pinned&&mobile);
 if(pinned&&!mobile){const used=view.querySelector('.wrap').offsetHeight+rail.offsetHeight+view.querySelector('.company-controls').offsetHeight+28+16+64;if(used>view.clientHeight){pinned=false;root.classList.remove('is-horizontal');}}
 span=Math.max(0,rail.scrollWidth-rail.clientWidth);
 root.style.height=pinned?`${view.offsetHeight+span}px`:'';update();
}
buttons.forEach((button,i)=>button.addEventListener('click',()=>{const delta=(i?1:-1)*(rail.querySelector('article').offsetWidth+parseFloat(getComputedStyle(rail.querySelector('.company-pillars')).columnGap));if(pinned){const nav=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'))||64;const start=scrollY+root.getBoundingClientRect().top-nav;window.scrollTo({top:start+Math.max(0,Math.min(span,rail.scrollLeft+delta)),behavior:'smooth'});}else rail.scrollBy({left:delta,behavior:reduced.matches?'instant':'smooth'});}));
let drag=null,suppressClick=false;
rail.style.touchAction='pan-y';
rail.addEventListener('dragstart',e=>e.preventDefault());
rail.addEventListener('pointerdown',e=>{if(e.button!==0)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,left:rail.scrollLeft,active:false};});
rail.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;const dx=drag.x-e.clientX,dy=drag.y-e.clientY;if(!drag.active){if(Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>8){drag=null;return}if(Math.abs(dx)<8)return;drag.active=true;rail.setPointerCapture(e.pointerId);rail.classList.add('is-dragging')}e.preventDefault();const next=Math.max(0,Math.min(span,drag.left+dx));if(pinned){const navHeight=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'))||64;window.scrollTo({top:scrollY+root.getBoundingClientRect().top-navHeight+next,behavior:'instant'})}else rail.scrollLeft=next;},{passive:false});
function endDrag(){if(drag?.active)suppressClick=true;drag=null;rail.classList.remove('is-dragging')}
rail.addEventListener('pointerup',endDrag);rail.addEventListener('pointercancel',endDrag);rail.addEventListener('lostpointercapture',endDrag);
rail.addEventListener('click',e=>{if(suppressClick){e.preventDefault();e.stopImmediatePropagation();suppressClick=false}},true);
rail.addEventListener('wheel',event=>{if(pinned&&Math.abs(event.deltaX)>Math.abs(event.deltaY)){event.preventDefault();window.scrollBy({top:event.deltaX,behavior:'instant'});}},{passive:false});
rail.addEventListener('keydown',event=>{if(pinned&&['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();buttons[event.key==='ArrowRight'?1:0].click();}});
rail.addEventListener('scroll',()=>{if(!pinned)request();},{passive:true});addEventListener('scroll',request,{passive:true});addEventListener('resize',setup);reduced.addEventListener('change',setup);document.fonts?.ready.then(setup);setup();
})();
