'use strict';
window.tingtuSpeech=window.tingtuAudio.create({async load(text,signal){
 const item=Object.values(window.tingtuShowcase).flat().find(x=>x.text===text);if(!item)throw Error('本站讲解暂未准备好');
 const controller=new AbortController(),abort=()=>controller.abort();if(signal.aborted)abort();else signal.addEventListener('abort',abort,{once:true});
 let timedOut=false;const timer=setTimeout(()=>{timedOut=true;controller.abort()},15000);
 try{const r=await fetch(new URL(item.audio,document.baseURI),{signal:controller.signal});if(!r.ok)throw Error('音频加载失败，点“听本站”重试');return await r.blob()}
 catch(e){if(timedOut)throw Error('网络有点慢，点“听本站”重试');throw e}
 finally{clearTimeout(timer);signal.removeEventListener('abort',abort)}
}});
