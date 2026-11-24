(()=>{'use strict';
const root=document.querySelector('.values'),rail=root?.querySelector('.values-grid');if(!rail)return;
const view=root.querySelector(':scope>.wrap'),buttons=[...root.querySelectorAll('.values-controls button')],reduced=matchMedia('(prefers-reduced-motion:reduce)');let pinned=false,span=0,raf=0,position=0,lastTime=0;
const nav=()=>parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'))||64;
function update(time=performance.now()){
 raf=0;const dt=lastTime?Math.min(48,time-lastTime):16.7;lastTime=time;
 if(pinned){
  const target=Math.max(0,Math.min(span,nav()-root.getBoundingClientRect().top));
  position=drag?.active||reduced.matches?target:position+(target-position)*(1-Math.exp(-dt/110));
  if(Math.abs(target-position)<.25)position=target;
  rail.scrollLeft=position;
  if(position!==target)schedule();else lastTime=0;
 }else{position=rail.scrollLeft;lastTime=0}
 buttons[0].disabled=rail.scrollLeft<2;buttons[1].disabled=rail.scrollLeft>=span-2;
}
function schedule(){if(!raf)raf=requestAnimationFrame(update)}
function setup(){root.style.height='';pinned=innerWidth>=760&&innerHeight>=760&&!reduced.matches;root.classList.toggle('is-horizontal',pinned);if(pinned&&view.querySelector('.section-intro').offsetHeight+rail.offsetHeight+44+28+20+56>view.clientHeight){pinned=false;root.classList.remove('is-horizontal')}span=Math.max(0,rail.scrollWidth-rail.clientWidth);root.style.height=pinned?(view.offsetHeight+span)+'px':'';if(raf)cancelAnimationFrame(raf);raf=0;lastTime=0;position=pinned?Math.max(0,Math.min(span,nav()-root.getBoundingClientRect().top)):rail.scrollLeft;update()}
buttons.forEach((button,i)=>button.addEventListener('click',()=>{const step=rail.querySelector('.value-card').offsetWidth+parseFloat(getComputedStyle(rail).gap),next=Math.max(0,Math.min(span,rail.scrollLeft+(i?step:-step)));if(pinned)window.scrollTo({top:scrollY+root.getBoundingClientRect().top-nav()+next,behavior:reduced.matches?'instant':'smooth'});else rail.scrollTo({left:next,behavior:reduced.matches?'instant':'smooth'})}));
let drag=null,suppressClick=false;
rail.style.touchAction='pan-y';
rail.addEventListener('dragstart',e=>e.preventDefault());
rail.addEventListener('pointerdown',e=>{if(e.button!==0)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,left:rail.scrollLeft,active:false};});
rail.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;const dx=drag.x-e.clientX,dy=drag.y-e.clientY;if(!drag.active){if(Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>8){drag=null;return}if(Math.abs(dx)<8)return;drag.active=true;rail.setPointerCapture(e.pointerId);rail.classList.add('is-dragging')}e.preventDefault();const next=Math.max(0,Math.min(span,drag.left+dx));if(pinned){const navHeight=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'))||64;window.scrollTo({top:scrollY+root.getBoundingClientRect().top-navHeight+next,behavior:'instant'})}else rail.scrollLeft=next;},{passive:false});
function endDrag(){if(drag?.active)suppressClick=true;drag=null;rail.classList.remove('is-dragging')}
rail.addEventListener('pointerup',endDrag);rail.addEventListener('pointercancel',endDrag);rail.addEventListener('lostpointercapture',endDrag);
rail.addEventListener('click',e=>{if(suppressClick){e.preventDefault();e.stopImmediatePropagation();suppressClick=false}},true);
rail.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();buttons[e.key==='ArrowRight'?1:0].click()}});
rail.addEventListener('wheel',e=>{if(pinned&&Math.abs(e.deltaX)>Math.abs(e.deltaY)){e.preventDefault();window.scrollBy({top:e.deltaX,behavior:'instant'})}},{passive:false});
rail.addEventListener('scroll',()=>{if(!pinned)schedule()},{passive:true});addEventListener('scroll',schedule,{passive:true});addEventListener('resize',setup);reduced.addEventListener('change',setup);document.fonts.ready.then(setup);setup();
})();
