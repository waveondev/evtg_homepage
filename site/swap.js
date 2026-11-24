/* Pinned image and expanding step descriptions, following Toss's asset section. */
(()=>{'use strict';
const root=document.querySelector('.swap-scroll');if(!root)return;
const stage=root.querySelector('.swap-stage'),steps=[...root.querySelectorAll('.swap-step')],reduced=matchMedia('(prefers-reduced-motion: reduce)');
let selected=-1,raf=0,compact=false,navH=64;const readNav=()=>{navH=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'))||64;};readNav();
const clamp=n=>Math.max(0,Math.min(1,n));
steps.forEach((step,i)=>{
 const heading=step.querySelector('h3'),description=step.querySelector('p');
 const button=document.createElement('button');button.type='button';button.innerHTML=heading.innerHTML;heading.replaceChildren(button);
 const body=document.createElement('div');body.className='swap-body';body.id=`swap-description-${i}`;description.replaceWith(body);body.append(description);
 button.setAttribute('aria-controls',body.id);
 button.addEventListener('click',()=>activate(i));
});
function activate(index){
 if(selected===index)return;selected=index;root.style.setProperty('--swap-mix',index);
 steps.forEach((step,i)=>{const active=i===index;step.classList.toggle('is-active',active);step.querySelector('button').setAttribute('aria-expanded',String(active||reduced.matches));step.querySelector('.swap-body').inert=!active&&!reduced.matches;});
}
function update(){raf=0;
 const nav=navH;
 const rect=root.getBoundingClientRect(),progress=clamp((nav-rect.top)/Math.max(1,root.offsetHeight-stage.offsetHeight));
 root.classList.toggle('is-entered',rect.top<innerHeight*.82);
 if(!compact)activate(progress>=.5?1:0);
}
function request(){if(!raf)raf=requestAnimationFrame(update);}
function setup(){readNav();compact=innerHeight<700&&!reduced.matches;root.classList.toggle('is-compact',compact);root.classList.toggle('is-scroll-ready',!reduced.matches&&!compact);selected=-1;activate(0);update();}
addEventListener('scroll',request,{passive:true});addEventListener('resize',setup);reduced.addEventListener('change',setup);setup();
})();
