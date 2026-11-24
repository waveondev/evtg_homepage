(()=>{'use strict';
const items=[['.motion','시작'],['#battery','배터리 교환'],['#lifestyle','전기로 달리는 일상'],['#product','제품 디자인'],['#network','스테이션'],['.app-story','앱'],['#company','회사소개'],['#esg','ESG'],['#contact','문의']];
const nav=document.createElement('nav');nav.className='side-progress';nav.setAttribute('aria-label','섹션 탐색');
const links=items.filter(([selector])=>{const el=document.querySelector(selector);return el&&!el.hidden}).map(([selector,label])=>{const el=document.querySelector(selector),button=document.createElement('button');button.type='button';button.setAttribute('aria-label',label);button.title=label;button.innerHTML='<span></span>';button.addEventListener('click',()=>{const offset=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'))||64;window.scrollTo({top:el.getBoundingClientRect().top+scrollY-offset,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});nav.append(button);return {el,button};});document.body.append(nav);
let raf=0;
function render(){raf=0;const marker=innerHeight*.42;let active=0;links.forEach(({el},i)=>{if(el.getBoundingClientRect().top<=marker)active=i;});links.forEach(({button},i)=>{if(i===active)button.setAttribute('aria-current','location');else button.removeAttribute('aria-current');});}
function update(){if(!raf)raf=requestAnimationFrame(render);}addEventListener('scroll',update,{passive:true});addEventListener('resize',update);render();
})();
