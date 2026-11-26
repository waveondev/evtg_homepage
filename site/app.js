(()=>{'use strict';
/*
 * Hero scroll animation (EV iVAN).
 *
 * Visual output is unchanged from the original build. What differs is how it is produced:
 *  - Frames are downloaded (fetch → Blob) independently from decoding. At full speed the playhead lands on every
 *    third frame, so those "key" frames (plus every frame around the scene stops) are pre-fetched first at low
 *    priority. The frames in between are fetched only for displays that can show them (high refresh desktop).
 *  - Only a small window around the playhead is kept decoded (ImageBitmap) and painted on a <canvas>,
 *    which avoids the flicker of swapping <img src> and keeps memory bounded.
 *  - Every tick reads layout first and writes after (no forced synchronous layout), measured values are
 *    cached and refreshed through ResizeObserver, and unchanged styles are not rewritten.
 *  - A fresh wheel gesture is recognised while the previous trackpad momentum is still decaying.
 */
const section=document.querySelector('.motion'),screen=document.querySelector('.screen'),stage=document.querySelector('.stage'),poster=document.querySelector('#bike'),error=document.querySelector('#load-error'),intro=document.querySelector('.intro'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
const wordmark=document.querySelector('.bike-wordmark'),callout=document.querySelector('.design-callout');
const design=document.querySelector('.design-caption'),battery=document.querySelector('.battery-caption'),progress=document.querySelector('.motion-progress i');
const total=540,frames=new Map(),blobs=new Map(),fetching=new Map(),decoding=new Set(),failed=new Map();
const playback=new ScrollPlayback();
const titleScene=document.querySelector('.battery-title-scene'),titleView=titleScene.querySelector('.battery-title-view'),titleHeading=titleView.querySelector('h2');
const designMetrics=design.querySelector('.design-metrics'),batteryMetrics=battery.querySelector('.battery-metrics');
const carry=new Image();carry.src='assets/story/battery-carry-corrected-v6.webp';carry.className='bike-carry';carry.alt='다음 섹션으로 이어지는 교환형 배터리';
carry.style.cssText='position:fixed;pointer-events:none;background:none;box-shadow:none;z-index:8;left:0;top:0;transition:opacity 100ms linear;max-width:none;height:auto;transform-origin:50% 50%;visibility:hidden;opacity:0';
document.body.append(carry);
const physical=n=>Math.min(n,540);
// Runs of byte-identical frames: only the first file of each run is requested. Re-check this table if the frames are replaced.
const canonical=new Uint16Array(total+1).map((_,n)=>n);
for(const [a,b] of [[1,11],[119,135],[385,387],[425,429],[515,540]])canonical.fill(a,a,b+1);
const FRAME_STEP=3,FRAME_SLACK=FRAME_STEP-1;
const isKey=n=>(n-1)%FRAME_STEP===0||n<=8||n>=532||Math.abs(n-180)<=8;   // 장면이 멈추는 1·180·540 근처는 감속이 보이므로 모든 프레임
const allFrames=[...new Set(canonical.subarray(1))],keyFrames=[...new Set(Array.from({length:total},(_,i)=>i+1).filter(isKey).map(n=>canonical[n]))];
const hasFrame=n=>frames.has(canonical[n]);
const canBitmap='createImageBitmap' in window;
let view=poster,ctx=null,canvasMode=false,refreshMs=16.7;
let openingTarget=0,opening=0,exitTarget=0,exitOpacity=0,handoffRun=null;
let target=1,shown=0,queue=[],last=0,raf=0,requested='',geometry={},waiting=0,loadingTimer=0,retryTimer=0,bgTimer=0,bgFailUntil=0,bgActive=0;
let secRect={top:0,bottom:0},carryShown=false;
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*x*(x*(x*6-15)+10);};
const between=(n,a,b)=>ease((n-a)/(b-a));
const mix=(a,b,t)=>a+(b-a)*t;
// 모바일 폭으로 접속하면 800px 프레임을 쓴다. 이 폴더에는 keyFrames 만 있으므로 사이 프레임을 요청하지 않는다.
const smallFrames=matchMedia('(max-width: 759px)').matches;
const path=n=>`assets/${smallFrames?'final-800':n>=310?'final-clean':'final'}/frame_${String(n).padStart(4,'0')}.webp`;

// Write a style value only when it changed, so idle properties never invalidate style.
const lastStyle=new WeakMap();
function setStyle(el,prop,value){
 let m=lastStyle.get(el);if(!m){m={};lastStyle.set(el,m);}
 if(m[prop]===value)return;m[prop]=value;el.style[prop]=value;
}
function reveal(el,alpha){setStyle(el,'opacity',String(alpha));setStyle(el,'transform',`translate3d(0,${(1-alpha)*24}px,0)`);setStyle(el,'visibility',alpha>.001?'visible':'hidden');}

/* ---------- geometry (measured only when the layout can have changed) ---------- */
function measure(){
 const w=screen.clientWidth,h=screen.clientHeight,ih=intro.offsetHeight;
 geometry={w,h,ih,introTop:intro.offsetTop,mobile:w<760,nav:parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'))||64,
  designH:design.offsetHeight,batteryH:battery.offsetHeight,designMetricsTop:designMetrics.offsetTop,
  titleFont:parseFloat(getComputedStyle(titleHeading).fontSize)};
}

/* ---------- frame loading ---------- */
function fetchBlob(n,priority){
 n=canonical[n];
 if(blobs.has(n))return Promise.resolve(blobs.get(n));
 if(fetching.has(n))return fetching.get(n);
 const p=fetch(path(n),priority?{priority}:undefined).then(r=>{if(!r.ok)throw new Error(r.status);return r.blob();}).then(b=>{blobs.set(n,b);return b;}).finally(()=>fetching.delete(n));
 fetching.set(n,p);return p;
}
function loadFrame(n){
 return fetchBlob(n).then(b=>{
  if(canvasMode&&canBitmap)return createImageBitmap(b);
  const url=URL.createObjectURL(b),im=new Image();im.src=url;im._url=url;
  return im.decode().then(()=>im);
 });
}
function release(f){if(f.close)f.close();else if(f._url)URL.revokeObjectURL(f._url);}
function evict(){
 const limit=geometry.mobile?40:60;
 if(frames.size<=limit)return;
 const cur=physical(playback.frame);
 // 재생 방향 앞쪽에 준비해 둔 프레임은 지우지 않는다. 지우면 곧바로 다시 디코딩하게 된다.
 const direction=target>=playback.position?1:-1,span=(geometry.mobile?24:32)*(wantsEveryFrame()?1:FRAME_STEP);
 const ahead=k=>{const d=(k-cur)*direction;return d>=0&&d<=span;};
 const keys=[...frames.keys()].filter(k=>k!==canonical[shown]&&Math.abs(k-cur)>16&&!ahead(k)).sort((a,b)=>Math.abs(b-cur)-Math.abs(a-cur));
 for(const k of keys){if(frames.size<=limit)break;release(frames.get(k));frames.delete(k);}
}
function present(n){
 const f=frames.get(canonical[n]);if(!f)return false;
 if(canonical[n]===canonical[shown]){shown=n;view.dataset.frame=String(n);return true;}
 if(canvasMode){ctx.clearRect(0,0,view.width,view.height);ctx.drawImage(f,0,0);}else view.src=f.src;
 shown=n;view.dataset.frame=String(n);return true;
}
function pump(){
 while(decoding.size<8&&queue.length){
  const n=queue.shift(),failure=failed.get(n);
  if(frames.has(n)||decoding.has(n)||(failure&&Date.now()-failure.at<1200))continue;
  decoding.add(n);
  loadFrame(n).then(f=>{frames.set(n,f);failed.delete(n);evict();}).catch(()=>{
   failed.set(n,{at:Date.now()});
   if(waiting&&Math.abs(n-waiting)<=FRAME_SLACK)error.textContent='연결이 지연되고 있습니다. 잠시 후 다시 불러옵니다.';
   if(!retryTimer)retryTimer=setTimeout(()=>{retryTimer=0;requested='';requestFrames();wake();},1300);
  }).finally(()=>{decoding.delete(n);pump();if(waiting||Math.abs(n-physical(playback.frame))<=FRAME_STEP)wake();});
 }
}
// 120Hz 이상 PC 는 사이 프레임까지 보여 줄 수 있다. 그 외에는 어차피 건너뛰므로 받지도, 디코딩하지도 않는다.
const wantsEveryFrame=()=>!smallFrames&&!geometry.mobile&&refreshMs<12;
function requestFrames(){
 const n=playback.frame,direction=target>=playback.position?1:-1,resting=Math.abs(target-playback.position)<.5,key=`${n}:${direction}:${resting}`;
 if(requested===key)return;requested=key;
 const ahead=geometry.mobile?24:32,behind=geometry.mobile?6:10,dense=wantsEveryFrame(),want=[];
 const cur=physical(n);
 if((resting&&!smallFrames)||dense||isKey(cur))want.push(cur);   // 멈춰 있을 때는 정확한 프레임을 보여 준다
 const walk=(dir,count)=>{for(let f=cur+dir,c=0;f>=1&&f<=total&&c<count;f+=dir)if(dense||isKey(f)){want.push(f);c++;}};
 walk(direction,ahead);walk(-direction,behind);
 queue=[...new Set(want.map(f=>canonical[f]))];pump();
}
// Low-priority background download: key frames from the playhead outward, then (only if they can be shown) the rest.
function nextToFetch(list,cur){
 const missing=f=>!blobs.has(f)&&!fetching.has(f);
 const start=list.findIndex(f=>f>=cur);
 if(start>=0)for(let i=start;i<list.length;i++)if(missing(list[i]))return list[i];
 for(let i=(start<0?list.length:start)-1;i>=0;i--)if(missing(list[i]))return list[i];
 return 0;
}
function backgroundFetch(){
 bgTimer=0;
 const conn=navigator.connection;
 if(conn&&(conn.saveData||/(^|-)2g$/.test(conn.effectiveType||'')))return;
 if(document.hidden)return;
 if(Date.now()<bgFailUntil){bgTimer=setTimeout(backgroundFetch,bgFailUntil-Date.now()+50);return;}
 const cur=Math.max(1,physical(playback.frame));
 while(bgActive<4&&fetching.size<8){
  const n=nextToFetch(keyFrames,cur)||(wantsEveryFrame()?nextToFetch(allFrames,cur):0);
  if(!n)return;
  bgActive++;
  fetchBlob(n,'low').catch(()=>{bgFailUntil=Date.now()+3000;}).finally(()=>{bgActive--;if(!bgTimer)bgTimer=setTimeout(backgroundFetch,0);});
 }
}
function startBackground(){if(!bgTimer)bgTimer=setTimeout(backgroundFetch,0);}
document.addEventListener('visibilitychange',()=>{if(!document.hidden)startBackground();});

/* ---------- layout: pure math, then reads, then writes ---------- */
function layout(n,timeline=n){
 const {w,h,ih,mobile}=geometry;
 const pose=Math.min(timeline,540);
 const enter=between(pose,28,125),cross=between(pose,235,350),introOut=between(pose,15,78);
 const first=between(n,70,128)*(1-between(n,218,273)),second=between(n,342,402);
 const initial=Math.max(180,Math.min(w/.94,h/.90,1120));
 const initialY=(h-initial)/2-initial*.055;
 const revealProgress=ease(opening);
 const contentBottom=geometry.introTop+ih,gap=mobile?58:32;
 const baselineTop=mobile?24:Math.max(24,Math.min(innerHeight*.045,56));
 const teaser=Math.max(100,Math.min(w*(mobile?1.55:.9),(h-baselineTop-ih-(mobile?18:gap)-48)/.65,820))*1.15*1.2*(mobile?1.15:1.3);
 const teaserY=contentBottom+gap-teaser*.25+innerHeight*(mobile?0:.10);
 const openingSize=mix(teaser,initial,revealProgress);
 const openingY=mix(teaserY,initialY,revealProgress);
 // The transparent frames have generous top margins: account for the visible product,
 // and leave independent text columns rather than overlapping the image with copy.
 const compact=mobile;
 const mobileDesignTop=Math.max(24,Math.min(40,h*.035));
 const mobileFull=Math.min(w*1.03,Math.max(170,(h-mobileDesignTop-geometry.designH-44)/.78));
 const mobileBattery=Math.min(w*1.03,Math.max(170,(h-geometry.batteryH-64)/1.02));
 const full=compact?mix(mobileFull,mobileBattery,cross):Math.min(w*.57,h/.99,1010);
 const size=mix(openingSize,Math.max(170,full),enter);
 const centeredY=(h-size)/2-size*.055;
 // Center each caption/product pair as one group, preserving its internal spacing.
 const designGroupHeight=geometry.designH+24+size*.73;
 const designGroupTop=Math.max(24,(h-designGroupHeight)/2);
 const mobileDesignY=designGroupTop+geometry.designH+24-size*.22;
 const batteryGroupHeight=size*.85+16+geometry.batteryH;
 const batteryGroupTop=Math.max(24,(h-batteryGroupHeight)/2);
 const mobileBatteryY=batteryGroupTop-size*.1;
 const fullY=mobile?mix(mobileDesignY,mobileBatteryY,cross):centeredY;
 const x=0;
 const isBattery=second>first;

 // ---- reads (layout is clean here: nothing has been written yet this frame) ----
 secRect=section.getBoundingClientRect();
 const handoff=!reduced.matches&&timeline>540&&carry.complete&&carry.naturalWidth>0&&secRect.bottom<h+geometry.nav;
 let captionRect=null,stageRect=null,metricsTop=0,titleRect=null,titleBottom=0;
 if(callout&&!mobile){
  captionRect=(isBattery?battery:design).getBoundingClientRect();stageRect=stage.getBoundingClientRect();
  if(isBattery)metricsTop=batteryMetrics.getBoundingClientRect().top;
 }
 if(handoff){titleRect=titleHeading.getBoundingClientRect();titleBottom=titleScene.getBoundingClientRect().bottom;}

 // ---- writes ----
 if(mobile)setStyle(battery,'top',`${fullY+size*.95+16}px`);else setStyle(battery,'top','');
 stage.style.setProperty('--image-width',`${initial}px`);
 stage.style.setProperty('--image-top','0px');
 setStyle(view,'left','50%');
 if(callout){
  if(!mobile){
   const anchorX=isBattery?w/2+size*.19:w/2-size*.32;
   const anchorY=isBattery?metricsTop-stageRect.top:innerHeight/2-stageRect.top;
   setStyle(design,'top',`${anchorY-geometry.designMetricsTop}px`);setStyle(design,'marginTop','0px');
   const startX=(isBattery?captionRect.right:captionRect.left)-stageRect.left;
   const vb=`0 0 ${w} ${h}`;
   if(callout._vb!==vb){callout._vb=vb;callout.setAttribute('viewBox',vb);}
   const d=`M ${anchorX} ${anchorY} L ${startX} ${anchorY}`;
   if(callout._d!==d){callout._d=d;callout._path=callout._path||callout.querySelector('path');callout._dot=callout._dot||callout.querySelector('circle');
    callout._path.setAttribute('d',d);callout._dot.setAttribute('cx',anchorX);callout._dot.setAttribute('cy',anchorY);}
   setStyle(callout,'opacity',String(Math.max(first,second)*(1-exitOpacity)));
  }else{
   setStyle(design,'top',`${designGroupTop}px`);setStyle(design,'marginTop','0px');
   setStyle(callout,'opacity','0');
  }
 }
 setStyle(view,'transform',`translate3d(calc(-50% + ${x}px),${mix(openingY,fullY,enter)}px,0) scale(${size/initial})`);
 const wordmarkAlpha=between(opening,.65,.96)*(1-between(timeline,520,560));
 setStyle(wordmark,'opacity',String(wordmarkAlpha));setStyle(wordmark,'visibility',wordmarkAlpha>.001?'visible':'hidden');
 setStyle(wordmark,'transform','translate(-50%,-50%)');
 const dark=between(n,70,128)>.02;
 if(screen.classList.contains('battery-dark')!==dark)screen.classList.toggle('battery-dark',dark);
 const titleOut=Math.max(introOut,between(opening,.1,.76));
 setStyle(intro,'opacity',String(1-titleOut));setStyle(intro,'transform',`translate3d(0,${-70*titleOut}px,0) scale(${1+.08*titleOut})`);setStyle(intro,'visibility',titleOut===1?'hidden':'visible');
 if(!reduced.matches){reveal(design,first*(1-exitOpacity));reveal(battery,second*(1-exitOpacity));}
 setStyle(progress,'transform',`scaleX(${(Math.min(timeline,540)-1)/(total-1)})`);

 // The product's battery flies to the next section's title.
 const k=between(timeline,540,760);
 if(handoff){
  const small=(mobile?75:100)*1.15;
  const destX=titleRect.left+geometry.titleFont;
  const carryAspect=carry.naturalHeight/Math.max(1,carry.naturalWidth);
  const destY=titleRect.top+geometry.titleFont*.55-(small/.92)*carryAspect*.5;
  const originX=w/2+x,originY=geometry.nav+mix(openingY,fullY,enter);
  const startWidth=size*.263/.92,endWidth=small/.92,frameSize=mix(startWidth,endWidth,k);
  const carryX=mix(originX-size/2+size*.594-startWidth*.51,destX-endWidth*.51,k);
  const carryY=mix(originY+size*.334-startWidth*.04,destY-endWidth*.04,k);
  const fade=clamp((titleBottom-geometry.nav)/160)*between(timeline,540,560)*(1-clamp((timeline-760)/60));
  setStyle(carry,'width',`${frameSize}px`);
  setStyle(carry,'transform',`translate3d(${carryX}px,${carryY}px,0) rotate(${mobile?0:-10*k}deg)`);
  setStyle(carry,'opacity',String(fade));setStyle(carry,'visibility','visible');carryShown=true;
 }else if(carryShown){
  setStyle(carry,'opacity','0');setStyle(carry,'visibility','hidden');carryShown=false;
 }
 setStyle(view,'opacity',handoff?String(1-between(timeline,540,610)):'1');
}
function wake(){if(!raf)raf=requestAnimationFrame(tick);}
function syncProgress(){
 const r=secRect;
 const v=!waiting&&r.top<=geometry.nav+2&&r.bottom>=geometry.h+geometry.nav-2?'1':'0';
 setStyle(progress.parentElement,'--progress-visible',v);
}
function setWaiting(n){
 if(n!==waiting){
  waiting=n;stage.setAttribute('aria-busy',n?'true':'false');
  if(n&&!loadingTimer)loadingTimer=setTimeout(()=>{loadingTimer=0;if(waiting)error.textContent='애니메이션을 불러오는 중…';},450);
  if(!n){clearTimeout(loadingTimer);loadingTimer=0;error.textContent='';}
 }
 syncProgress();
}
function update(){
 const r=section.getBoundingClientRect(),p=reduced.matches?0:clamp((geometry.nav-r.top)/(section.offsetHeight-screen.clientHeight));
 openingTarget=reduced.matches?1:clamp(p/.17);
 target=1+clamp((p-.17)/.83)*(total-1);
 if(!reduced.matches&&p===1){const beyond=Math.max(0,geometry.h+geometry.nav-r.bottom);target=540+300*clamp(beyond/(geometry.h*1.25));}
 exitTarget=reduced.matches?0:clamp((geometry.h+geometry.nav-r.bottom)/(geometry.h*.22));
 if(handoffRun)target=840;
 const started=p>.025;
 if(stage.classList.contains('started')!==started)stage.classList.toggle('started',started);
 wake();
}
function tick(t){
 raf=0;const dt=last?Math.min(32,t-last):16.7;last=t;
 opening+=(openingTarget-opening)*(1-Math.exp(-dt/90));
 if(Math.abs(opening-openingTarget)<.0001)opening=openingTarget;
 exitOpacity+=(exitTarget-exitOpacity)*(1-Math.exp(-dt/110));
 if(Math.abs(exitOpacity-exitTarget)<.0001)exitOpacity=exitTarget;
 // The battery handoff runs 150% faster; product rotation keeps its existing pace.
 const playbackRate=playback.position>=540&&(target>540||playback.position>540)?7.5:3;
 const next=playback.step(target,dt,n=>hasFrame(physical(n)),playbackRate,FRAME_SLACK);
 if(handoffRun){
  const k=between(next.position,540,840);
  window.scrollTo({top:mix(handoffRun.start,handoffRun.end,k),behavior:'instant'});
  if(next.position>=840){handoffRun=null;update();}
 }
 // Show the landing frame or, if it was not fetched, the nearest one behind it (the playhead only passes if one exists).
 let frame=physical(next.frame);
 for(let i=1;i<=FRAME_SLACK&&!hasFrame(frame);i++){const c=physical(next.frame)-i*(playback.direction||1);if(c>=1&&hasFrame(c))frame=c;}
 if(frame!==shown)present(frame);
 // Position changes every refresh, independently of integer image swaps.
 // A missing frame pauses this same playhead so image and composition stay aligned.
 layout(physical(next.position),next.position);setWaiting(next.waiting?physical(next.waiting):0);requestFrames();
 if((next.moving&&!next.waiting)||opening!==openingTarget||exitOpacity!==exitTarget)wake();
}
function resize(){measure();layout(physical(playback.position),playback.position);update();}

/* ---------- boot: first frame comes from the poster <img> (already requested by the HTML) ---------- */
function adoptCanvas(bitmap){
 const canvas=document.createElement('canvas');
 canvas.width=bitmap.width;canvas.height=bitmap.height;
 canvas.id='bike';canvas.setAttribute('role','img');canvas.setAttribute('aria-label',poster.alt);
 canvas.style.cssText=poster.style.cssText;
 ctx=canvas.getContext('2d');canvasMode=true;
 frames.set(1,bitmap);
 ctx.drawImage(bitmap,0,0);
 (poster.closest('picture')||poster).replaceWith(canvas);view=canvas;lastStyle.delete(poster);
 shown=1;view.dataset.frame='1';
}
// 화면 주사율 측정: 사이 프레임이 필요한 화면인지 판단한다.
function measureRefresh(){
 const gaps=[];let prev=0;
 requestAnimationFrame(function loop(t){
  if(prev)gaps.push(t-prev);prev=t;
  if(gaps.length<24)return requestAnimationFrame(loop);
  refreshMs=gaps.sort((a,b)=>a-b)[gaps.length>>1];requested='';startBackground();
 });
}
function boot(){
 measureRefresh();
 const ready=poster.complete&&poster.naturalWidth?Promise.resolve():new Promise((res,rej)=>{poster.addEventListener('load',res,{once:true});poster.addEventListener('error',rej,{once:true});});
 ready.then(()=>canBitmap&&!/[?&]hero=img\b/.test(location.search)?createImageBitmap(poster):Promise.reject()).then(adoptCanvas).catch(()=>{canvasMode=false;shown=1;view.dataset.frame='1';poster.parentElement.querySelector('source')?.remove();}).finally(()=>{
  resize();
  const go=()=>startBackground();   // 첫 프레임과 글꼴이 먼저 도착하도록 그 뒤에 시작한다
  if('requestIdleCallback' in window)requestIdleCallback(go,{timeout:1500});else setTimeout(go,600);
 });
}
reduced.addEventListener('change',()=>{
 if(reduced.matches){playback.position=1;playback.frame=1;playback.speed=0;setWaiting(0);if(!present(1)){requested='';requestFrames();}}
 requested='';resize();
});

// 섹션 이동은 pager.js 가 담당한다. 여기서는 히어로 장면 위치만 알려준다.
// (스크롤 위치가 바뀌면 재생 헤드가 알아서 따라오므로, 장면은 항상 모든 프레임을 거쳐 재생된다.)
const sceneStops=[0,.17,.17+.83*179/539,1];
function heroGeometry(){
 const r=section.getBoundingClientRect(),length=section.offsetHeight-screen.clientHeight;
 const start=scrollY+r.top-geometry.nav,end=start+length;
 const title=titleScene?Math.round(titleScene.getBoundingClientRect().top+scrollY-geometry.nav):end+geometry.h*1.25;
 return{start,end,length,stops:sceneStops.map(n=>Math.round(start+length*n)),titleStop:title};
}
window.EvtagoHero={
 geometry:heroGeometry,
 // 재생 헤드/오프닝이 목표에 아직 도달하지 못했으면 true
 busy:()=>!reduced.matches&&(Math.abs(playback.position-target)>.5||Math.abs(opening-openingTarget)>.005||!!handoffRun),
 running:()=>!!handoffRun,
 // 눈에 띄는 움직임이 끝났으면 true (자동 장면 넘김용: busy 보다 느슨한 기준)
 settled:()=>reduced.matches||(Math.abs(playback.position-target)<=3&&Math.abs(opening-openingTarget)<=.03&&!handoffRun),
 // 배터리 연출 도중 다른 곳으로 이동할 때: 위치 제어를 페이저에 돌려준다
 cancelHandoff(){handoffRun=null;update();},
 // 마지막 장면에서 글자 화면으로: 배터리 이미지가 날아가는 연출을 재생하며 스크롤을 옮긴다
 handoff(to){
  if(reduced.matches||playback.position<539)return false;
  const g=heroGeometry();handoffRun={start:g.end,end:to};target=840;wake();return true;
 }
};
addEventListener('scroll',update,{passive:true});addEventListener('resize',resize);
// Re-measure when captions / title reflow (language switch, web fonts, viewport changes).
if('ResizeObserver' in window){
 let pendingResize=0;
 const ro=new ResizeObserver(()=>{if(pendingResize)return;pendingResize=requestAnimationFrame(()=>{pendingResize=0;resize();});});
 [design,battery,intro,titleHeading].forEach(el=>ro.observe(el));
}
if(document.fonts)document.fonts.ready.then(resize);

// ?debug 를 주소 뒤에 붙이면 왼쪽 아래에 상태 표시(fps, 프레임 로딩 현황)가 나타난다. 느린 기기 진단용.
if(/[?&]debug\b/.test(location.search)){
 const box=document.createElement('pre');
 box.style.cssText='position:fixed;left:8px;bottom:8px;z-index:99999;margin:0;padding:8px 10px;background:rgba(0,0,0,.78);color:#7CFC9A;font:11px/1.45 ui-monospace,Menlo,monospace;border-radius:8px;pointer-events:none;white-space:pre';
 document.body.append(box);
 let n=0,t0=performance.now(),prev=t0,worst=0;
 (function loop(t){
  n++;worst=Math.max(worst,t-prev);prev=t;
  if(t-t0>=500){
   const c=navigator.connection||{};
   box.textContent=`fps ${Math.round(n*1000/(t-t0))}  worst ${Math.round(worst)}ms\nframe ${shown}/540  waiting ${waiting||'-'}\nfetched ${blobs.size}/${wantsEveryFrame()?allFrames.length:keyFrames.length}  decoded ${frames.size}\nin-flight fetch ${fetching.size}  decode ${decoding.size}\nrender ${canvasMode?'canvas':'img'}  dpr ${devicePixelRatio}  ${innerWidth}x${innerHeight}\nnet ${c.effectiveType||'?'} ${c.downlink||'?'}Mbps`;
   n=0;t0=t;worst=0;
  }
  requestAnimationFrame(loop);
 })(performance.now());
}
measure();
boot();
})();
