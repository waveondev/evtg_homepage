/*
 * 섹션 단위 페이지 이동 (홈 화면 전용)
 *
 * 휠 · 마우스 드래그 · 터치 스와이프 · 키보드 어떤 입력이든 "한 번의 동작 = 한 칸" 이동한다.
 * 장면이 재생되는 중이거나 이동하는 중에도 입력을 받으면 바로 다음 칸으로 넘어간다.
 * 칸(stop)은 화면에 보이는 장면 단위이다. 예) 히어로 4장면, 글자 채움, 배터리 교환 2단계, 일상, 스테이션, 앱, 회사, ESG 4단계, 문의.
 * 실제 이동은 스크롤 위치를 부드럽게 움직이는 방식이라, 기존의 스크롤 연동 애니메이션(히어로 프레임, 글자 채움 등)은 그대로 재생된다.
 *
 * 문제가 생기면 주소 뒤에 ?pager=off 를 붙여 기존(일반 스크롤) 방식으로 볼 수 있다.
 */
(()=>{'use strict';
if(!document.querySelector('.motion'))return;
if(/[?&]pager=off\b/.test(location.search))return;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;

const root=document.documentElement;
const IGNORE='a,button,input,textarea,select,label,summary,[data-no-drag],.site-header,.side-progress,.company-carousel,.mobile-nav-panel,dialog,[role="dialog"]';
const STOP_MERGE=80;     // 이 거리(px)보다 가까운 칸은 하나로 합친다
const TOLERANCE=24;      // 칸 위에 "있다"고 보는 오차(px)
let broken=false;        // 오류가 나면 일반 스크롤로 되돌린다
const STEP_GAP=500;      // 입력 사이 최소 간격(ms): 한 동작에서 이벤트가 여러 번 들어와도 한 칸만 이동
const WHEEL_GAP=900;     // 휠로 다음 칸에 넘어가는 최소 간격(ms). 늘리면 천천히, 줄이면 빠르게 넘어간다
let anim=0,animTarget=null,handoff=false,lockUntil=0,lastStepAt=0;

const navH=()=>parseFloat(getComputedStyle(root).getPropertyValue('--nav-height'))||64;
const q=s=>document.querySelector(s);

/* ---------- 칸 계산: 매번 현재 화면 크기/상태 기준으로 다시 계산 ---------- */
function computeStops(){
 const nav=navH(),H=innerHeight,y=scrollY,max=Math.max(0,root.scrollHeight-H);
 const top=el=>el.getBoundingClientRect().top+y;
 const list=[];
 const add=(v,dwell=0)=>list.push({y:Math.max(0,Math.min(max,Math.round(v))),dwell});
 const covered=new Set();
 // 보통 섹션(화면 한 장 높이)은 1칸, 더 길면 균등하게 나눈 여러 칸
 const sectionStops=(el,dwell=0)=>{
  const t=top(el)-nav,visible=H-nav,h=el.offsetHeight;
  const n=h>visible*1.15?Math.ceil((h-visible)/visible):0;
  for(let i=0;i<=n;i++)add(t+(n?i*(h-visible)/n:0),i===0?dwell:0);
 };

 // 1) 히어로 (장면 4개 + 글자 채움 화면)
 const hero=window.EvtagoHero?.geometry();
 if(hero){hero.stops.forEach(v=>add(v));add(hero.titleStop,2100);}
 // 2) 배터리 교환 (고정 화면: 1단계 / 2단계)
 const swap=q('.swap-scroll');
 if(swap){
  const stage=swap.querySelector('.swap-stage'),t=top(swap)-nav;
  add(t);if(swap.classList.contains('is-scroll-ready')&&stage)add(t+swap.offsetHeight-stage.offsetHeight);
 }
 // 3) 일상 (들어오면 자동 재생)
 const life=q('.lifestyle-scroll');if(life)add(top(life)-nav,1500);
 // 4) 스테이션 / 앱
 ['#network','.app-story'].forEach(s=>{const el=q(s);if(el&&!el.hidden&&el.offsetHeight)sectionStops(el);});
 // 5) 회사 (가로 카드: 처음/끝)
 const company=q('#company');
 if(company){
  const view=company.querySelector('.company-viewport'),t=top(company)-nav;
  if(view&&(company.classList.contains('is-horizontal')||company.classList.contains('is-mobile-pinned'))){add(t);add(t+company.offsetHeight-view.offsetHeight);}
  else sectionStops(company);
 }
 // 6) ESG (고정 화면: 제목 → E → S → G)
 const esg=q('#esg');
 if(esg){
  if(esg.classList.contains('is-scroll-sequence')){
   const t=top(esg)-nav,travel=esg.offsetHeight-(H-nav);
   [0,.3,.6,.9].forEach(p=>add(t+travel*p));
  }else{   // 모바일: 카드가 세로로 쌓여 있음 → 제목+E 카드, 그다음 카드마다 한 칸 (카드가 중간에 잘려 보이지 않게)
   add(top(esg)-nav);
   esg.querySelectorAll('.esg-panel').forEach(el=>add(top(el)-nav-12));   // 제목 → E → S → G
  }
 }
 // 7) 문의 + 푸터
 const contact=q('#contact');if(contact)sectionStops(contact);
 add(max);
 // 그 밖의 섹션(나중에 추가될 수 있음)
 document.querySelectorAll('main > section:not([hidden])').forEach(el=>{
  if(['battery','network','company','esg','contact'].includes(el.id)||el.matches('.app-story,.lifestyle-scroll,.swap-scroll')||el.querySelector('.swap-scroll,.lifestyle-scroll'))return;
  if(el.offsetHeight)sectionStops(el);
 });

 list.sort((a,b)=>a.y-b.y);
 const merged=[];
 for(const s of list){
  const prev=merged[merged.length-1];
  if(prev&&s.y-prev.y<STOP_MERGE){prev.y=s.y;prev.dwell=Math.max(prev.dwell,s.dwell);}
  else merged.push({...s});
 }
 return merged;
}

/* ---------- 이동 ---------- */
const ease=k=>k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;
const easeOut=k=>1-Math.pow(1-k,3);
// lockUntil 은 입력을 막지 않는다. 자동 재생 중에 settle() 이 위치를 보정하지 않도록 할 때만 쓴다.
function arrive(stop){anim=0;animTarget=null;handoff=false;lockUntil=performance.now()+(stop?.dwell||0);}
function glideTo(stop){
 const interrupted=anim!==0,curve=interrupted?easeOut:ease;   // 이동 중에 방향이 바뀌면 멈칫하지 않도록 바로 속도를 낸다
 cancelAnimationFrame(anim);anim=0;
 const from=scrollY,distance=stop.y-from;
 if(Math.abs(distance)<1){arrive(stop);return;}
 const duration=Math.min(1400,Math.max(550,450+Math.abs(distance)*.45));let begin=0;
 animTarget=stop.y;
 const stepFrame=now=>{
  if(!begin)begin=now;
  const k=Math.min(1,(now-begin)/duration);
  window.scrollTo({top:from+distance*curve(k),behavior:'instant'});
  if(k<1)anim=requestAnimationFrame(stepFrame);else arrive(stop);
 };
 anim=requestAnimationFrame(stepFrame);
}
function moveTo(stop,dir){
 const hero=window.EvtagoHero,g=hero?.geometry();
 // 히어로 마지막 장면 → 글자 화면: 배터리가 날아가는 연출은 히어로 엔진이 위치를 직접 움직인다
 if(g&&dir>0&&Math.abs(scrollY-g.end)<=TOLERANCE*2&&Math.abs(stop.y-g.titleStop)<2&&hero.handoff(stop.y)){
  handoff=true;animTarget=stop.y;
  const wait=()=>{if(hero.running())anim=requestAnimationFrame(wait);else arrive(stop);};
  anim=requestAnimationFrame(wait);return;
 }
 glideTo(stop);
}
const moving=()=>anim!==0||handoff;
function step(dir){
 if(broken)return false;
 try{
  const now=performance.now();
  if(now-lastStepAt<STEP_GAP)return false;
  const going=moving(),sameWay=going&&animTarget!==null&&Math.sign(animTarget-scrollY)===dir;
  const y=sameWay?animTarget:scrollY;   // 같은 방향이면 가고 있던 칸의 다음 칸으로, 반대 방향이면 현재 위치의 이전 칸으로
  const list=computeStops();
  const next=dir>0?list.find(s=>s.y>y+TOLERANCE):[...list].reverse().find(s=>s.y<y-TOLERANCE);
  if(!next)return false;
  if(handoff){window.EvtagoHero?.cancelHandoff();handoff=false;}
  lastStepAt=now;
  moveTo(next,dir);return true;
 }catch(err){broken=true;root.classList.remove('pager-on');console.error('[pager] 비활성화:',err);return false;}
}
function jump(which){
 if(broken||moving())return;
 try{const list=computeStops();glideTo(which<0?list[0]:list[list.length-1]);}catch(err){broken=true;}
}

/* ---------- 휠 ---------- */
let wLast=0,wPrev=0,wDir=0,wPeak=0;
addEventListener('wheel',e=>{
 if(broken||e.ctrlKey||e.metaKey||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;
 if(e.target.closest('input,textarea,select,[contenteditable="true"],dialog,[role="dialog"]')||root.classList.contains('mobile-menu-open'))return;
 e.preventDefault();
 let mag=Math.abs(e.deltaY);if(e.deltaMode===1)mag*=33;else if(e.deltaMode===2)mag*=innerHeight;
 if(mag<1)return;
 const dir=Math.sign(e.deltaY),now=performance.now(),prevDir=wDir;
 // 한 번의 휠 동작(burst)은 160ms 이상 입력이 없으면 끝난다.
 // 트랙패드 관성은 값이 점점 줄어들고, 마우스 휠은 일정하게 유지되므로 이를 이용해 "새 동작"을 구분한다.
 const idle=now-wLast>=160;
 if(idle)wPeak=0;
 const sustained=mag>=20&&mag>=wPeak*.85;
 wPeak=Math.max(wPeak,mag);
 const fresh=idle||sustained||(mag>=8&&(mag>wPrev*1.35+3||dir!==wDir));
 wPrev=mag;wDir=dir;wLast=now;
 if(fresh&&(dir!==prevDir||now-lastStepAt>=WHEEL_GAP))step(dir);
},{passive:false,capture:true});

/* ---------- 터치 ---------- */
let touch=null,touchEndAt=0,touchY=0;
addEventListener('touchstart',e=>{
 if(broken||e.touches.length!==1||root.classList.contains('mobile-menu-open')){touch=null;return;}
 const t=e.touches[0];
 touchY=scrollY;touch={x:t.clientX,y:t.clientY,time:performance.now(),mode:null,ignore:!!e.target.closest?.('input,textarea,select,[contenteditable="true"],dialog,[role="dialog"],.mobile-nav-panel,.site-header'),rail:!!e.target.closest?.('.company-carousel')};
},{passive:true});
addEventListener('touchmove',e=>{
 if(!touch||touch.ignore)return;
 const t=e.touches[0],dx=t.clientX-touch.x,dy=t.clientY-touch.y;
 if(!touch.mode){
  if(Math.hypot(dx,dy)<8)return;
  touch.mode=Math.abs(dy)>=Math.abs(dx)?'v':'h';
  if(touch.mode==='h'&&touch.rail){touch=null;return;}   // 카드 가로 넘기기는 기존 동작에 맡긴다
 }
 if(touch.mode==='v'&&e.cancelable)e.preventDefault();
},{passive:false});
addEventListener('touchend',e=>{
 const t0=touch;touch=null;touchEndAt=performance.now();
 if(!t0||t0.ignore||t0.mode!=='v'||broken)return;
 const t=e.changedTouches[0],dy=t0.y-t.clientY,dt=Math.max(1,performance.now()-t0.time);
 if(Math.abs(dy)>=36||(Math.abs(dy)>=16&&Math.abs(dy)/dt>.4))step(dy>0?1:-1);
},{passive:true});
addEventListener('touchcancel',()=>{touch=null;touchEndAt=performance.now();},{passive:true});

/* ---------- 마우스 드래그 ---------- */
let mouse=null;
addEventListener('pointerdown',e=>{
 if(broken||e.pointerType!=='mouse'||e.button!==0||e.target.closest(IGNORE)){mouse=null;return;}
 mouse={y:e.clientY,time:performance.now(),active:false};
},{capture:true});
addEventListener('pointermove',e=>{
 if(!mouse)return;
 if(!mouse.active){
  if(Math.abs(e.clientY-mouse.y)<6)return;
  mouse.active=true;root.classList.add('is-pager-dragging');getSelection()?.removeAllRanges();
 }
 e.preventDefault();
},{passive:false});
function endMouse(e){
 const m=mouse;mouse=null;root.classList.remove('is-pager-dragging');
 if(!m||!m.active)return;
 addEventListener('click',ev=>{ev.preventDefault();ev.stopPropagation();},{capture:true,once:true});
 const dy=m.y-e.clientY,dt=Math.max(1,performance.now()-m.time);
 if(Math.abs(dy)>=40||(Math.abs(dy)>=16&&Math.abs(dy)/dt>.4))step(dy>0?1:-1);
}
addEventListener('pointerup',endMouse,true);addEventListener('pointercancel',endMouse,true);
addEventListener('dragstart',e=>{if(mouse)e.preventDefault();});

/* ---------- 키보드 ---------- */
addEventListener('keydown',e=>{
 if(broken||e.altKey||e.ctrlKey||e.metaKey)return;
 if(e.target.closest?.('input,textarea,select,[contenteditable="true"]'))return;
 const key=e.key,onButton=!!e.target.closest?.('a,button,summary');
 if(key==='ArrowDown'||key==='PageDown'||(key===' '&&!onButton&&!e.shiftKey)){e.preventDefault();step(1);}
 else if(key==='ArrowUp'||key==='PageUp'||(key===' '&&!onButton&&e.shiftKey)){e.preventDefault();step(-1);}
 else if(key==='Home'){e.preventDefault();jump(-1);}
 else if(key==='End'){e.preventDefault();jump(1);}
});

/* ---------- 칸 사이에서 멈췄을 때(스크롤바, 앵커 링크 등) 가장 가까운 칸으로 ---------- */
let settleTimer=0;
function settle(){
 settleTimer=0;
 if(broken||moving())return;
 if(performance.now()<lockUntil||touch||mouse||performance.now()-touchEndAt<700){settleTimer=setTimeout(settle,300);return;}
 try{
  const list=computeStops(),y=scrollY;
  let best=list[0];for(const s of list)if(Math.abs(s.y-y)<Math.abs(best.y-y))best=s;
  if(Math.abs(best.y-y)>6)glideTo({...best,dwell:0});
 }catch(err){broken=true;}
}
addEventListener('scroll',()=>{
 if(touch&&touch.mode==='v'&&!moving()&&Math.abs(scrollY-touchY)>1){window.scrollTo({top:touchY,behavior:'instant'});return;}   // 손가락을 대고 있는 동안 브라우저가 따로 스크롤하면 되돌린다
 if(moving())return;clearTimeout(settleTimer);settleTimer=setTimeout(settle,260);},{passive:true});
addEventListener('load',()=>{setTimeout(settle,700);});

/* ---------- 스타일 ---------- */
const style=document.createElement('style');
style.textContent='html.pager-on{touch-action:none;overscroll-behavior:none}html.is-pager-dragging,html.is-pager-dragging *{cursor:grabbing!important;user-select:none!important;-webkit-user-select:none!important}';
document.head.append(style);
root.classList.add('pager-on');
window.EvtagoPager={stops:computeStops,step,disable(){broken=true;root.classList.remove('pager-on');}};
})();
