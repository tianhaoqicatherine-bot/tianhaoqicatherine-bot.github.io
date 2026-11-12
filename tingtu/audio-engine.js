'use strict';
// Reuse one gesture-unlocked audio context for every station on mobile browsers.
window.tingtuAudio={create({load,split=text=>[text]}){
 let context,gain,source,finish,generation=0,active=0;const cache=new Map(),queue=[];
 function audioContext(){if(!context){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)throw Error('当前浏览器不支持音频播放');context=new AC();gain=context.createGain();gain.gain.value=.95;gain.connect(context.destination)}return context}
 function unlock(){try{audioContext().resume().catch(()=>{})}catch{}}
 if(typeof document!=='undefined')for(const event of ['pointerdown','touchend','click','keydown'])document.addEventListener(event,unlock,{passive:true});
 function pump(){while(active<2&&queue.length){const job=queue.shift();active++;job().finally(()=>{active--;pump()})}}
 function part(text){if(cache.has(text))return cache.get(text).promise;const controller=new AbortController(),entry={controller};entry.promise=new Promise((resolve,reject)=>{queue.push(async()=>{try{const blob=await load(text,controller.signal);const buffer=await audioContext().decodeAudioData(await blob.arrayBuffer());resolve(buffer)}catch(e){if(cache.get(text)===entry)cache.delete(text);reject(e)}})});cache.set(text,entry);while(cache.size>10){const key=cache.keys().next().value;cache.delete(key)}pump();return entry.promise}
 function prepare(text){const parts=split(text),first=part(parts[0]);for(const text of parts.slice(1))part(text).catch(()=>{});return first}
 function stop(){generation++;if(source){source.onended=null;try{source.stop()}catch{}source.disconnect();source=null}finish?.();finish=null}
 function clear(){stop();for(const item of cache.values())item.controller.abort();cache.clear()}
 async function running(){const ctx=audioContext();if(ctx.state==='running')return;await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('点一下“听本站”开始播放')),1800);ctx.resume().then(()=>{clearTimeout(timer);resolve()},e=>{clearTimeout(timer);reject(e)})});if(ctx.state!=='running')throw Error('点一下“听本站”开始播放')}
 async function play(text,handlers={}){stop();const current=generation;try{handlers.loading?.();prepare(text).catch(()=>{});let first=true;for(const textPart of split(text)){const buffer=await part(textPart);if(current!==generation)return;await running();if(current!==generation)return;const ctx=audioContext(),clip=ctx.createBufferSource();clip.buffer=buffer;clip.connect(gain);source=clip;const ended=new Promise(resolve=>{finish=resolve;clip.onended=resolve});clip.start();if(first){first=false;handlers.start?.()}await ended;if(current!==generation)return;clip.disconnect();source=null;finish=null}stop();handlers.end?.()}catch(e){if(current!==generation||e.name==='AbortError')return;stop();handlers.error?.(e)}}
 return {prepare,play,stop,clear,unlock};
}};
