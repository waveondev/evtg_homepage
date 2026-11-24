(()=>{'use strict';
// 스테이션 찾기: 카카오 지도 + 스테이션 마커 + 하단 정보 카드
// 목록은 같은 도메인의 /api/w/map/stations 에서 받는다. (배포: CloudFront 가 API 서버로 전달, 로컬: tools/serve.mjs 프록시)
const KAKAO_APP_KEY='261e3df2406131b677dab299a8410896';
const STATIONS_URL='/api/w/map/stations';
const DEFAULT_CENTER={lat:37.5665,lng:126.978};

const root=document.querySelector('[data-station-finder]');
if(!root)return;
const mapEl=root.querySelector('.finder-map');
const messageEl=root.querySelector('.finder-message');
const card=root.querySelector('.finder-card');
const nameEl=card.querySelector('.finder-card-name');
const addressEl=card.querySelector('.finder-card-address');
const statusEl=card.querySelector('.finder-card-status');

const en=new URLSearchParams(location.search).get('lang')==='en';
const text=en?{open:'Open',closed:'Closed',empty:'No stations to show yet.',error:'Couldn’t load the station map. Refresh the page and try again.'}
 :{open:'운영 중',closed:'운영 중단',empty:'표시할 스테이션이 아직 없습니다.',error:'스테이션 지도를 불러오지 못했습니다. 페이지를 새로고침해 주세요.'};

const showMessage=value=>{messageEl.textContent=value;messageEl.hidden=false;};

// 사용자 앱(BSSFE) 마커 이미지에서 숫자를 뺀 합성본. 원본 비율 35:43 유지.
const MARKER_SRC={open:'/assets/station/marker.png',closed:'/assets/station/marker-closed.png'};
const markerImage=(src,width,height)=>new kakao.maps.MarkerImage(src,new kakao.maps.Size(width,height),{offset:new kakao.maps.Point(width/2,height)});

const loadStations=async()=>{
 const response=await fetch(STATIONS_URL,{headers:{Accept:'application/json'}});
 if(!response.ok)throw new Error(`stations ${response.status}`);
 const body=await response.json();
 if(body.code!==200||!Array.isArray(body.data?.list))throw new Error('stations payload');
 return body.data.list.filter(s=>Number.isFinite(s.latitude)&&Number.isFinite(s.longitude));
};

const loadKakao=()=>new Promise((resolve,reject)=>{
 const script=document.createElement('script');
 script.src=`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&libraries=clusterer&autoload=false`;
 script.onload=()=>window.kakao?.maps?kakao.maps.load(resolve):reject(new Error('kakao sdk'));
 script.onerror=()=>reject(new Error('kakao sdk'));
 document.head.appendChild(script);
});

const start=async()=>{
 const [stations]=await Promise.all([loadStations(),loadKakao()]);
 const map=new kakao.maps.Map(mapEl,{center:new kakao.maps.LatLng(DEFAULT_CENTER.lat,DEFAULT_CENTER.lng),level:8});
 map.addControl(new kakao.maps.ZoomControl(),kakao.maps.ControlPosition.RIGHT);
 new ResizeObserver(()=>map.relayout()).observe(mapEl);

 if(!stations.length){showMessage(text.empty);return;}

 const images={open:markerImage(MARKER_SRC.open,35,43),closed:markerImage(MARKER_SRC.closed,35,43),openOn:markerImage(MARKER_SRC.open,46,56),closedOn:markerImage(MARKER_SRC.closed,46,56)};
 let selected=null;
 const restImage=item=>item.station.availableState==='Y'?images.open:images.closed;

 const closeCard=()=>{
  if(selected){selected.marker.setImage(restImage(selected));selected.marker.setZIndex(1);selected=null;}
  card.hidden=true;
 };

 const select=item=>{
  if(selected)selected.marker.setImage(restImage(selected));
  selected=item;
  const {station,marker}=item;
  const open=station.availableState==='Y';
  marker.setImage(open?images.openOn:images.closedOn);
  marker.setZIndex(10);
  nameEl.textContent=station.stationName||'';
  addressEl.textContent=[station.stationAddress,station.stationAddressDetail].map(v=>(v||'').trim()).filter(Boolean).join(' ');
  statusEl.textContent=open?text.open:text.closed;
  statusEl.classList.toggle('is-open',open);
  card.hidden=false;
  // 카드에 가려지지 않도록, 카드를 뺀 나머지 지도 영역의 가운데로 마커를 옮긴다.
  const point=map.getProjection().containerPointFromCoords(marker.getPosition());
  const targetY=(mapEl.clientHeight-card.offsetHeight-24)/2;
  map.panBy(point.x-mapEl.clientWidth/2,point.y-targetY);
 };

 const bounds=new kakao.maps.LatLngBounds();
 const markers=stations.map(station=>{
  const position=new kakao.maps.LatLng(station.latitude,station.longitude);
  bounds.extend(position);
  const item={station,marker:null};
  item.marker=new kakao.maps.Marker({position,image:restImage(item),title:station.stationName||'',clickable:true,zIndex:1});
  kakao.maps.event.addListener(item.marker,'click',()=>select(item));
  return item.marker;
 });

 const clusterStyle={width:'44px',height:'44px',lineHeight:'44px',borderRadius:'50%',background:'#121212',border:'2px solid #6fb7ff',boxSizing:'border-box',color:'#fff',fontSize:'15px',fontWeight:'700',textAlign:'center'};
 const clusterer=new kakao.maps.MarkerClusterer({map,averageCenter:true,minLevel:9,minClusterSize:3,gridSize:60,styles:[clusterStyle]});
 clusterer.addMarkers(markers);
 map.setBounds(bounds,80,80,80,80);

 kakao.maps.event.addListener(map,'click',closeCard);
 card.querySelector('.finder-card-close').addEventListener('click',closeCard);
 document.addEventListener('keydown',event=>{if(event.key==='Escape')closeCard();});
};

start().catch(error=>{console.error(error);showMessage(text.error);});
})();
