'use strict';
window.tingtuMarkerLayout={arrange(points,width,height){
 const scale=Math.max(.62,Math.min(1,Math.sqrt(Math.max(1,(width-76)*(height-84))/(Math.max(1,points.length)*78*76))*.9)),gapX=78*scale,gapY=76*scale;
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),bound=p=>{p.x=clamp(p.x,38*scale,Math.max(38*scale,width-38*scale));p.y=clamp(p.y,30*scale,Math.max(30*scale,height-54*scale))};points.forEach(bound);
 for(let pass=0;pass<160;pass++){let moved=false;for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){const a=points[i],b=points[j],dx=b.x-a.x,dy=b.y-a.y,px=gapX-Math.abs(dx),py=gapY-Math.abs(dy);if(px<=0||py<=0)continue;moved=true;if(px<py){const d=(px+.2)/2*(dx<0?-1:1);a.x-=d;b.x+=d}else{const d=(py+.2)/2*(dy<0?-1:1);a.y-=d;b.y+=d}bound(a);bound(b)}if(!moved)break}
 return scale;
}};
