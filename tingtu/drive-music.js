'use strict';
window.tingtuDriveMusic=(()=>{
 let context,gain,bufferPromise,source,active=false,enabled=true,version=0,ducked=false,offset=0,startedAt=0,duration=60;
 try{enabled=localStorage.getItem('tingtu-bgm')!=='off'}catch{}
 function audioContext(){if(!context){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return null;context=new AC();gain=context.createGain();gain.gain.value=0;gain.connect(context.destination)}return context}
 function buttons(){return ['#musicToggle','#pageMusicToggle'].map(id=>document.querySelector(id)).filter(Boolean)}
 function paint(){for(const button of buttons()){button.dataset.state=source?'playing':active&&enabled?'loading':enabled?'paused':'off';button.setAttribute('aria-pressed',String(enabled));button.setAttribute('aria-label',enabled?'关闭背景音乐':'开启背景音乐');button.textContent='♫';button.title=enabled?'关闭背景音乐':'开启背景音乐'}}
 function unlock(){const ctx=audioContext();ctx?.resume().catch(()=>{})}
 for(const event of ['pointerdown','touchend','click','keydown'])document.addEventListener(event,unlock,{passive:true});
 function prepare(){if(!bufferPromise)bufferPromise=fetch(new URL('audio/bgm.mp3',document.baseURI)).then(r=>{if(!r.ok)throw Error('音乐加载失败');return r.arrayBuffer()}).then(data=>audioContext().decodeAudioData(data)).then(buffer=>{duration=buffer.duration;return buffer}).catch(e=>{bufferPromise=null;throw e});return bufferPromise}
 function halt(preserve){version++;if(source){if(preserve&&context)offset=(offset+context.currentTime-startedAt)%duration;else offset=0;source.onended=null;try{source.stop()}catch{}source.disconnect();source=null}else if(!preserve)offset=0;paint()}
 async function start(){active=true;const current=++version;paint();if(!enabled)return;try{const ctx=audioContext();if(!ctx)return;await ctx.resume();const buffer=await prepare();if(!active||!enabled||current!==version)return;if(source){source.stop();source.disconnect()}source=ctx.createBufferSource();source.buffer=buffer;source.loop=true;source.connect(gain);gain.gain.setValueAtTime(0,ctx.currentTime);gain.gain.setTargetAtTime(ducked ? .065 : .36,ctx.currentTime,.4);startedAt=ctx.currentTime;source.start(0,offset%duration);paint()}catch{enabled=false;paint();const button=document.querySelector('#musicToggle');if(button)button.title='音乐加载失败，点击重试'}}
 function update(quiet){quiet=!!quiet;if(quiet===ducked)return;ducked=quiet;if(context&&gain)gain.gain.setTargetAtTime(ducked ? .065 : .36,context.currentTime,.25)}
 function pause(){active=false;halt(true)}
 function stop(){active=false;halt(false)}
 function toggle(){enabled=!enabled;try{localStorage.setItem('tingtu-bgm',enabled?'on':'off')}catch{}paint();if(!enabled)halt(true);else if(active)start()}
 for(const button of buttons())button.onclick=toggle;paint();
 return {start,stop,pause,update};
})();
