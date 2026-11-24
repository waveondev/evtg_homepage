(()=>{'use strict';
const en=new URLSearchParams(location.search).get('lang')==='en';
if(en){document.querySelectorAll('[data-en]').forEach(el=>el.innerHTML=el.dataset.en);document.title=(document.body.classList.contains('about-page')?'Company':'ESG')+' — EVTAGO';document.querySelector('.skip-link').textContent='Skip to content';}
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
// Rebuild visual lines at the current width, keeping one accessible text label.
const textTargets=[...document.querySelectorAll('.hero-copy h1,.hero-copy .section-lead,.section-intro h2,.section-intro .section-lead,.history-heading h2,.history-heading .section-lead,.sub-cta h2,.mission-bottom p')];
const textBlocks=textTargets.map(el=>({el,html:el.innerHTML,lines:[]}));
let textFrame=0,resizeTimer;
function buildTextLines(){
 textBlocks.forEach(block=>{
  const {el}=block;el.innerHTML=block.html;
  const breaks=[...el.querySelectorAll('br')].map(br=>getComputedStyle(br).display==='none'?' ':'\n');
  const copy=el.cloneNode(true);copy.querySelectorAll('br').forEach((br,i)=>br.replaceWith(breaks[i]));
  const text=copy.textContent;el.setAttribute('aria-label',text.replace(/\s+/g,' ').trim());
  el.textContent='';
  text.split('\n').forEach((paragraph,index)=>{
   if(index)el.append(document.createElement('br'));
   paragraph.trim().split(/[ \t\r\n]+/).filter(Boolean).forEach(word=>{const span=document.createElement('span');span.textContent=word+' ';span.style.display='inline-block';el.append(span)});
  });
  const rows=[];
  [...el.querySelectorAll('span')].forEach(word=>{const top=word.offsetTop;let row=rows[rows.length-1];if(!row||Math.abs(row.top-top)>2){row={top,text:''};rows.push(row)}row.text+=word.textContent});
  el.textContent='';block.lines=rows.map(row=>{const line=document.createElement('span');line.className='scroll-text-line';line.setAttribute('aria-hidden','true');line.textContent=row.text.trim();el.append(line);return line});
 });renderText();
}
function renderText(){
 textFrame=0;
 textBlocks.forEach(({el,lines})=>{
  const top=el.getBoundingClientRect().top;
  lines.forEach((line,index)=>{
   const progress=reduced.matches?1:Math.max(0,Math.min(1,(innerHeight*.92-top-index*24)/(innerHeight*.28)));
   const eased=1-Math.pow(1-progress,3);
   line.style.opacity=String(.12+.88*eased);
   line.style.transform='translateY('+((1-eased)*24)+'px)';
   line.style.filter='blur('+((1-eased)*4)+'px)';
  });
 });
}
function scheduleText(){if(!textFrame)textFrame=requestAnimationFrame(renderText)}
addEventListener('scroll',scheduleText,{passive:true});
addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(buildTextLines,120)});
reduced.addEventListener('change',scheduleText);
document.fonts.ready.then(buildTextLines);buildTextLines();
// Only non-text cards use a timed entrance, avoiding nested text animations.
if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;io.unobserve(entry.target);if(!reduced.matches)entry.target.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:700,delay:Math.min([...entry.target.parentElement.children].indexOf(entry.target),3)*90,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});});},{threshold:.08});document.querySelectorAll('.value-card,.roadmap-card,.impact-stat,.commitment-card').forEach(el=>io.observe(el));}
const panels=[...document.querySelectorAll('.commitment-panel:not(.commitment-card)')];
function openPanel(panel,value){panel.classList.toggle('is-open',value);panel.querySelector('button').setAttribute('aria-expanded',String(value));panel.querySelector('.commitment-detail').setAttribute('aria-hidden',String(!value));}
panels.forEach(panel=>{const button=panel.querySelector('button');let pinned=false;openPanel(panel,false);panel.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')openPanel(panel,true)});panel.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'&&!pinned)openPanel(panel,false)});button.addEventListener('focus',()=>openPanel(panel,true));button.addEventListener('blur',()=>{if(!pinned)openPanel(panel,false)});button.addEventListener('click',()=>{pinned=!pinned;openPanel(panel,pinned)});button.addEventListener('keydown',e=>{if(e.key==='Escape'){pinned=false;openPanel(panel,false)}});});
const activities=[...document.querySelectorAll('.activity-item')],photo=document.querySelector('.activity-image');
activities.forEach(item=>item.addEventListener('toggle',()=>{if(!item.open)return;activities.forEach(other=>{if(other!==item)other.open=false});if(photo){photo.src=item.dataset.image;photo.alt=en?item.querySelector('h3').textContent:item.dataset.imageAlt;}}));
// Fill roadmap tracks as their cards enter the reading area.
const tracks=[...document.querySelectorAll('.esg-page .progress-track i')];
if('IntersectionObserver' in window){const trackObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;trackObserver.unobserve(entry.target);if(!reduced.matches)entry.target.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:1000,delay:180,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});}),{threshold:1});tracks.forEach(track=>trackObserver.observe(track));}
const timeline=document.querySelector('.timeline');
if(timeline){
 const items=[...timeline.querySelectorAll('.timeline-item')];let frame=0;
 function renderTimeline(){
  frame=0;
  const rect=timeline.getBoundingClientRect();
  const centers=items.map(item=>{const year=item.querySelector('.timeline-year');return item.offsetTop+year.offsetTop+year.offsetHeight/2});
  const start=centers[0],length=Math.max(1,centers[centers.length-1]-start);
  const cursor=innerHeight*.55-rect.top;
  const progress=reduced.matches?1:Math.max(0,Math.min(1,(cursor-start)/length));
  timeline.style.setProperty('--rail-start',start+'px');
  timeline.style.setProperty('--rail-length',length+'px');
  timeline.style.setProperty('--rail-progress',String(progress));
  items.forEach((item,i)=>item.classList.toggle('is-reached',reduced.matches||centers[i]<=cursor));
 }
 function scheduleTimeline(){if(!frame)frame=requestAnimationFrame(renderTimeline)}
 addEventListener('scroll',scheduleTimeline,{passive:true});addEventListener('resize',scheduleTimeline);
 reduced.addEventListener('change',scheduleTimeline);
 if('ResizeObserver' in window)new ResizeObserver(scheduleTimeline).observe(timeline);
 document.fonts?.ready.then(scheduleTimeline);scheduleTimeline();
}
})();
