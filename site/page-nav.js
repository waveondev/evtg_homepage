(()=>{'use strict';
// Keep the chosen language when moving between locally built pages.
const language=new URLSearchParams(location.search).get('lang');
if(language)document.querySelectorAll('a[href]').forEach(a=>{const href=a.getAttribute('href');if(!href||href.startsWith('#'))return;const url=new URL(href,location.href);if(url.origin===location.origin){url.searchParams.set('lang',language);a.href=url.href;}});
// Restart the home animation through a real reload, without a scroll journey.
if(document.querySelector('.motion')){
 const homeURL=new URL(location.href);homeURL.hash='';
 document.querySelectorAll('.site-header .brand,.site-header .nav-links a[href="#home"]').forEach(link=>{
  link.href=homeURL.href;
  link.addEventListener('click',event=>{
   if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
   event.preventDefault();event.stopImmediatePropagation();
   history.scrollRestoration='manual';history.replaceState(history.state,'',homeURL.href);
   window.scrollTo({top:0,left:0,behavior:'instant'});location.reload();
  },true);
 });
}

// "제품 소개" 하위 메뉴: 마우스가 없는 기기(태블릿 등)에서는 첫 탭에 메뉴를 열고, 한 번 더 누르면 이동한다.
document.querySelectorAll('.nav-item.has-sub').forEach(item=>{
 const link=item.querySelector(':scope>a'),touchDesktop=matchMedia('(hover:none) and (min-width:760px)');
 link.addEventListener('click',e=>{if(!touchDesktop.matches||item.classList.contains('is-open'))return;e.preventDefault();item.classList.add('is-open')});
 document.addEventListener('click',e=>{if(!item.contains(e.target))item.classList.remove('is-open')});
});

// One accessible mobile disclosure, shared by all three pages.
const header=document.querySelector('.site-header'),nav=header?.querySelector('.nav-inner');
if(nav){
 const links=nav.querySelector('.nav-links'),languageGroup=nav.querySelector('.nav-language');
 const mobile=matchMedia('(max-width:759px)'),english=new URLSearchParams(location.search).get('lang')==='en';
 const panel=document.createElement('div');panel.className='mobile-nav-panel';panel.id='site-navigation-panel';
 nav.append(panel);panel.append(links,languageGroup);
 const toggle=document.createElement('button');toggle.type='button';toggle.className='nav-toggle';toggle.setAttribute('aria-controls',panel.id);toggle.innerHTML='<span></span><span></span><span></span>';nav.insertBefore(toggle,panel);
 const background=[...document.body.children].filter(el=>el!==header&&!el.contains(header)&&!['SCRIPT','STYLE','LINK'].includes(el.tagName));
 const originalInert=new Map(background.map(el=>[el,el.inert]));
 function setOpen(open,restore=false){
 document.documentElement.classList.toggle('mobile-menu-open',open&&mobile.matches);
 background.forEach(el=>{el.inert=open&&mobile.matches?true:originalInert.get(el)});
 header.classList.toggle('menu-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',english?(open?'Close menu':'Open menu'):(open?'메뉴 닫기':'메뉴 열기'));panel.inert=mobile.matches&&!open;if(restore)toggle.focus()}
 toggle.addEventListener('click',()=>setOpen(!header.classList.contains('menu-open')));
 panel.addEventListener('click',e=>{if(e.target.closest('a,button'))setOpen(false)});
 document.addEventListener('keydown',e=>{if(e.key==='Tab'&&mobile.matches&&header.classList.contains('menu-open')){const items=[toggle,...panel.querySelectorAll('a[href],button')].filter(el=>!el.disabled);const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}if(e.key==='Escape'&&header.classList.contains('menu-open'))setOpen(false,true)});
 document.addEventListener('click',e=>{if(header.classList.contains('menu-open')&&!header.contains(e.target))setOpen(false)});
 mobile.addEventListener('change',()=>setOpen(false));setOpen(false);
}
})();
