'use strict';
(() => {
 let enabled=false,message='已关闭',stream,context,segment,interval,controller,session=0,transcriptVersion=0,recognizing=0;
 function paint(label,detail){$('#wakeLabel').textContent=label;$('#wakeStatus').textContent=detail;message=detail;const mic=$('#micConnectionState');if(mic)mic.textContent=detail}
 function ready(){if(enabled)paint('直接说，我在听','等你开口')}
 function stop(){session++;transcriptVersion++;enabled=false;recognizing=0;clearInterval(interval);controller?.abort();controller=null;if(segment?.recorder.state==='recording'){segment.recorder.onstop=null;segment.recorder.stop()}segment=null;stream?.getTracks().forEach(t=>t.stop());stream=null;context?.close().catch(()=>{});context=null;const toggle=$('#chatToggle');if(toggle)toggle.checked=false;paint('开启聊一聊，随时提问','已关闭')}
 function consume(text){if(!started)return;const spoken=String(text||'').trim();if(!spoken)return;const question=spoken.replace(/^(?:你好|嗨|嘿|hi|hey)[，,\s]*(?:听途|听图|听土|听涂|ting\s*tu)[，,。!！?？\s]*/i,'').trim()||spoken;stopAudio();paint('听到了，正在回答','正在回答');ask(question)}
 async function startWake(){
  if(enabled)return;stop();enabled=true;const current=session;const toggle=$('#chatToggle');if(toggle)toggle.checked=true;
  if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder||!(window.AudioContext||window.webkitAudioContext)){stop();paint('可打字问我','当前浏览器不支持录音');return}
  paint('直接说，我在听','正在开启…');
  try{
   const acquired=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true}});
   if(current!==session||!enabled){acquired.getTracks().forEach(t=>t.stop());return}stream=acquired;
   context=new (window.AudioContext||window.webkitAudioContext)();await context.resume();if(current!==session)return;
   const source=context.createMediaStreamSource(stream),high=context.createBiquadFilter(),low=context.createBiquadFilter(),analyser=context.createAnalyser();
   high.type='highpass';high.frequency.value=180;low.type='lowpass';low.frequency.value=3600;analyser.fftSize=1024;source.connect(high);high.connect(low);low.connect(analyser);const samples=new Uint8Array(analyser.fftSize);
   const mime=['audio/webm;codecs=opus','audio/mp4','audio/ogg;codecs=opus'].find(x=>MediaRecorder.isTypeSupported(x));let noiseFloor=.003;
   function begin(){
    if(current!==session||!enabled)return;
    const part={chunks:[],began:performance.now(),talking:false,voiceFrames:0,attack:0,speechStartedAt:0,lastVoice:0,version:0};
    part.recorder=new MediaRecorder(stream,mime?{mimeType:mime}:undefined);segment=part;
    part.recorder.ondataavailable=e=>{if(e.data.size)part.chunks.push(e.data)};
    part.recorder.onstop=async()=>{
     if(current!==session||!enabled)return;if(segment===part)segment=null;begin();
     if(!part.talking||part.voiceFrames<2||part.version!==transcriptVersion)return;
     const version=part.version;recognizing++;
     try{
      paint('我在听','正在识别…');const recorded=new Blob(part.chunks,{type:part.recorder.mimeType});const decoded=await context.decodeAudioData(await recorded.arrayBuffer());if(current!==session||version!==transcriptVersion)return;
      // Keep a short pre-roll so interrupting does not lose the first syllable.
      const offset=Math.max(0,Math.min(decoded.length-1,Math.floor((part.speechStartedAt-part.began-260)/1000*decoded.sampleRate)));
      const clip={length:decoded.length-offset,sampleRate:decoded.sampleRate,numberOfChannels:decoded.numberOfChannels,getChannelData:i=>decoded.getChannelData(i).subarray(offset)};
      const blob=window.tingtuWav.encode(clip);const audio=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result).split(',')[1]);reader.onerror=reject;reader.readAsDataURL(blob)});
      if(current!==session||version!==transcriptVersion)return;controller=new AbortController();
      const r=await fetch('/api/voice/recognize',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({audio,mime:'audio/wav'}),signal:controller.signal});const result=await r.json();if(current!==session||version!==transcriptVersion||!enabled)return;if(!r.ok)throw Error(result.error||'语音识别暂时不可用');ready();if(result.text)consume(result.text);
     }catch(e){if(current!==session||version!==transcriptVersion||e.name==='AbortError')return;stop();paint('可打字问我',e.message||'识别失败，请重新开启')}
     finally{recognizing=Math.max(0,recognizing-1)}
    };part.recorder.start();
   }
   begin();ready();
   interval=setInterval(()=>{
    const part=segment;if(current!==session||!enabled||!part||part.recorder.state!=='recording')return;
    analyser.getByteTimeDomainData(samples);let sum=0;for(const x of samples)sum+=((x-128)/128)**2;
    const rms=Math.sqrt(sum/samples.length),now=performance.now(),threshold=Math.max(playing ? .026 : .018,noiseFloor*3.2);
    if(rms>threshold){
     if(!part.attack)part.speechStartedAt=now;part.attack++;part.voiceFrames++;part.lastVoice=now;
     if(!part.talking&&part.attack>=2){part.talking=true;part.version=++transcriptVersion;controller?.abort();controller=null;stopAudio();paint('我在听，你说','正在听你说话')}
    }else{part.attack=0;if(!playing&&!part.talking)noiseFloor=noiseFloor*.97+Math.min(rms,.018)*.03}
    if(part.talking&&playing){stopAudio();paint('我在听，你说','正在听你说话')}
    if(playing&&!part.talking)paint('说话就能打断我','正在播报');
    if((part.talking&&now-part.lastVoice>750)||now-part.began>(part.talking?20000:10000))part.recorder.stop();
   },80);
  }catch(e){if(current!==session)return;stop();paint('可打字问我',e.name==='NotAllowedError'?'麦克风未授权':e.name==='NotFoundError'?'未找到麦克风':'语音启动失败，请重新开启')}
 }
 window.tingtuWake={start:startWake,stop,ready,isSpeaking:()=>enabled&&(!!segment?.talking||recognizing>0),status:()=>({enabled,message}),demo:(question='这里有什么特色')=>{consume(question);toast('正在演示提问，非麦克风识别')}};
})();
