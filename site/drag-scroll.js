/* 마우스로 화면을 끌어서 스크롤 (PC). 터치 기기는 기본 스크롤을 그대로 사용한다. */
(()=>{'use strict';
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const THRESHOLD=5;                       // 이 거리(px) 이상 움직여야 드래그로 인정 → 단순 클릭은 그대로 동작
const IGNORE='a,button,input,textarea,select,label,summary,video,audio,[contenteditable="true"],[role="dialog"],[data-no-drag],.site-header,.side-progress,.company-carousel,.values-grid';
const root=document.documentElement;
let down=null,dragging=false,raf=0,vel=0,samples=[];
function horizontalScroller(el){
 for(;el&&el!==document.body;el=el.parentElement){
  const s=getComputedStyle(el);
  if(/(auto|scroll)/.test(s.overflowX)&&el.scrollWidth>el.clientWidth+1)return true;
 }
 return false;
}
function stopInertia(){if(raf){cancelAnimationFrame(raf);raf=0;}}
function coast(){
 let last=performance.now();
 const step=now=>{
  const dt=Math.min(32,now-last);last=now;
  if(window.__scrollHold&&vel>0)vel=0;
  window.scrollTo({top:scrollY+vel*dt,behavior:'instant'});
  vel*=Math.exp(-dt/325);                // 약 1초에 걸쳐 감속
  raf=Math.abs(vel)>.02?requestAnimationFrame(step):0;
 };
 raf=requestAnimationFrame(step);
}
addEventListener('pointerdown',e=>{
 stopInertia();
 if(e.pointerType!=='mouse'||e.button!==0||e.target.closest(IGNORE)||horizontalScroller(e.target))return;
 down={y:e.clientY,scroll:scrollY};dragging=false;samples=[];
},{capture:true});
addEventListener('pointermove',e=>{
 if(!down)return;
 const dy=e.clientY-down.y;
 if(!dragging){
  if(Math.abs(dy)<THRESHOLD)return;
  dragging=true;root.classList.add('is-drag-scrolling');
  getSelection()?.removeAllRanges();
 }
 e.preventDefault();
 let desired=down.scroll-dy;
 if(window.__scrollHold&&desired>scrollY)desired=scrollY; // 제목이 채워지는 동안 아래로는 이동하지 않음
 window.scrollTo({top:desired,behavior:'instant'});
 const now=performance.now();samples.push([now,scrollY]);
 while(samples.length>2&&now-samples[0][0]>100)samples.shift();
},{passive:false});
function end(){
 if(!down)return;
 const was=dragging;down=null;dragging=false;root.classList.remove('is-drag-scrolling');
 if(!was)return;
 // 드래그가 끝난 직후 발생하는 click 은 한 번 막는다(링크/버튼이 눌리지 않도록)
 addEventListener('click',ev=>{ev.preventDefault();ev.stopPropagation();},{capture:true,once:true});
 if(samples.length>1){
  const [t0,y0]=samples[0],[t1,y1]=samples[samples.length-1];
  vel=t1>t0&&performance.now()-t1<80?(y1-y0)/(t1-t0):0;
  vel=Math.max(-3,Math.min(3,vel));
  if(Math.abs(vel)>.05)coast();
 }
}
addEventListener('pointerup',end,true);addEventListener('pointercancel',end,true);
addEventListener('wheel',stopInertia,{passive:true});addEventListener('keydown',stopInertia);
addEventListener('dragstart',e=>{if(down)e.preventDefault();});
const style=document.createElement('style');
style.textContent='html.is-drag-scrolling,html.is-drag-scrolling *{cursor:grabbing!important;user-select:none!important;-webkit-user-select:none!important}';
document.head.append(style);
})();
