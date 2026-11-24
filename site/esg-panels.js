(()=>{'use strict';
const section=document.querySelector('#esg');if(!section)return;
const panels=[...section.querySelectorAll('.esg-panel')],reduced=matchMedia('(prefers-reduced-motion: reduce)'),desktop=matchMedia('(min-width:760px)');
let frame=0;
function render(){
 frame=0;const nav=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'))||64;
 const pinned=desktop.matches&&!reduced.matches;
 section.classList.toggle('is-scroll-sequence',pinned);
 const top=section.getBoundingClientRect().top,travel=Math.max(1,section.offsetHeight-(innerHeight-nav));
 const progress=Math.max(0,Math.min(1,(nav-top)/travel));
 section.classList.toggle('is-exploring',pinned&&progress>.16);
 const activeIndex=progress>=.72?2:progress>=.47?1:progress>=.22?0:-1;
 panels.forEach((panel,index)=>{
  const active=reduced.matches||(pinned?index===activeIndex:panel.getBoundingClientRect().top<innerHeight*.68);
  panel.classList.toggle('is-open',active);
 });
}
function schedule(){if(!frame)frame=requestAnimationFrame(render)}
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
reduced.addEventListener('change',schedule);desktop.addEventListener('change',schedule);render();
})();
