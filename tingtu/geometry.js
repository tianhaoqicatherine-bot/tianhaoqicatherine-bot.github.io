'use strict';
(() => {
 const path=document.querySelector('#travelPath'),length=path.getTotalLength(),samples=[],cache=new Map();
 // Sample the unchanged road once, instead of repeatedly querying SVG geometry on entry.
 for(let i=0;i<=384;i++){const distance=length*i/384,point=path.getPointAtLength(distance);samples.push({distance,x:point.x,y:point.y})}
 window.tingtuGeometry={measure(stops){const key=stops.map(s=>s.pos.join(',')).join(';');if(!cache.has(key))cache.set(key,stops.map(stop=>{let nearest=0,error=Infinity;for(const p of samples){const e=(p.x-stop.pos[0])**2+(p.y-stop.pos[1])**2;if(e<error){error=e;nearest=p.distance}}return nearest}));return [...cache.get(key)]}};
})();
