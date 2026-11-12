'use strict';
window.tingtuSpeech=(()=>{
 let player,url,generation=0,active=0,finishClip;const cache=new Map(),queue=[];
 function pump(){while(active<2&&queue.length){const run=queue.shift();active++;run().finally(()=>{active--;pump()})}}
 function sections(text){if(text.length<110)return [text];const sentences=text.match(/[^。！？!?]+[。！？!?]?/g)||[text];let first='';while(sentences.length&&first.length<55)first+=sentences.shift();return sentences.length?[first,sentences.join('')]:[text]}
 function load(text){
  if(cache.has(text))return cache.get(text).promise;
  const controller=new AbortController();const entry={controller};
  entry.promise=new Promise((resolve,reject)=>{queue.push(async()=>{try{const r=await fetch('/api/voice/tts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text}),signal:controller.signal});if(!r.ok){let d;try{d=await r.json()}catch{}throw Error(d?.error||'语音准备失败，请重试')}resolve(await r.blob())}catch(e){if(cache.get(text)===entry)cache.delete(text);reject(e)}})});
  cache.set(text,entry);pump();return entry.promise;
 }
 function prepare(text){const parts=sections(text);const first=load(parts[0]);for(const part of parts.slice(1))load(part).catch(()=>{});return first}
 function stop(){generation++;finishClip?.();finishClip=null;if(player){player.pause();player.removeAttribute('src');player.load();player=null}if(url){URL.revokeObjectURL(url);url=null}}
 function clear(){stop();for(const entry of cache.values())entry.controller.abort();cache.clear()}
 async function play(text,handlers={}){
  stop();const current=generation;try{
   handlers.loading?.();prepare(text).catch(()=>{});let first=true;
   for(const part of sections(text)){
    const blob=await load(part);if(current!==generation)return;
    if(url)URL.revokeObjectURL(url);url=URL.createObjectURL(blob);player=new Audio(url);
    const ended=new Promise((resolve,reject)=>{finishClip=resolve;player.onended=resolve;player.onerror=()=>reject(Error('音频播放失败，请重试'))});
    player.onplaying=()=>{if(current===generation&&first){first=false;handlers.start?.()}};
    await player.play();await ended;if(current!==generation)return;
   }
   stop();handlers.end?.();
  }catch(e){if(current!==generation||e.name==='AbortError')return;stop();handlers.error?.(e.name==='NotAllowedError'?Error('浏览器阻止自动播放，请点击“听本站”后重试'):e)}
 }
 return {play,stop,prepare,clear};
})();
