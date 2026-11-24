/* A bounded playhead shared by the browser and deterministic playback tests. */
(function(root){
'use strict';
class ScrollPlayback{
 constructor(frame=1){this.position=frame;this.frame=frame;this.speed=0;this.direction=0;}
 // `slack`: how many frames behind the landing frame may stand in for it. At full speed the playhead lands on
 // every third frame anyway, so frames it passes over are not required, and a nearby one avoids a visible stop.
 step(target,elapsed,ready,rate=1,slack=0){
  const delta=target-this.position,direction=Math.sign(delta),distance=Math.abs(delta);
  if(distance<.001){this.speed=0;return {frame:this.frame,position:this.position,moving:false,waiting:0};}
  if(direction!==this.direction){this.speed=0;this.direction=direction;}
  const dt=Math.min(32,Math.max(0,elapsed))/1000;
  // Limit both acceleration and the distance moved in one display refresh.
  const desired=Math.min(60*rate,Math.sqrt(2*240*rate*rate*distance));
  this.speed=Math.min(desired,this.speed+240*rate*rate*dt);
  const next=this.position+direction*Math.min(distance,rate,this.speed*dt);
  const frame=Math.round(next);
  if(frame!==this.frame){
   let available=false;
   for(let i=0;i<=slack&&!available;i++)available=ready(frame-i*direction);
   if(!available){
    this.speed=0;
    return {frame:this.frame,position:this.position,moving:true,waiting:frame};
   }
  }
  this.position=next;this.frame=frame;
  return {frame,position:next,moving:Math.abs(target-next)>.001,waiting:0};
 }
}
if(typeof module==='object'&&module.exports)module.exports=ScrollPlayback;
else root.ScrollPlayback=ScrollPlayback;
})(typeof window==='object'?window:globalThis);
