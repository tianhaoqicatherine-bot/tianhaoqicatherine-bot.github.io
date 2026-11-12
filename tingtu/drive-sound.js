'use strict';
window.tingtuDriveSound=(()=>{
 let ctx,master,engine,engineGain,harmonic,noise,roadGain,lastBrake=0;
 function stop(){if(!ctx)return;try{engine.stop();harmonic.stop();noise.stop()}catch{}ctx.close().catch(()=>{});ctx=null}
 function start(){stop();const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;try{
  ctx=new AC();ctx.resume().catch(()=>{});master=ctx.createGain();master.gain.value=.5;master.connect(ctx.destination);
  engine=ctx.createOscillator();engine.type='sawtooth';engine.frequency.value=38;
  harmonic=ctx.createOscillator();harmonic.type='sine';harmonic.frequency.value=76;
  engineGain=ctx.createGain();engineGain.gain.value=.018;const low=ctx.createBiquadFilter();low.type='lowpass';low.frequency.value=230;engine.connect(low);harmonic.connect(low);low.connect(engineGain);engineGain.connect(master);
  const buffer=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate),channel=buffer.getChannelData(0);for(let i=0;i<channel.length;i++)channel[i]=Math.random()*2-1;
  noise=ctx.createBufferSource();noise.buffer=buffer;noise.loop=true;const filter=ctx.createBiquadFilter();filter.type='bandpass';filter.frequency.value=700;filter.Q.value=.5;roadGain=ctx.createGain();roadGain.gain.value=0;noise.connect(filter);filter.connect(roadGain);roadGain.connect(master);
  engine.start();harmonic.start();noise.start();
 }catch{stop()}}
 function update(speed,gas,steer,narration){if(!ctx)return;const t=ctx.currentTime,rpm=Math.max(0,Math.min(1,speed/44)),duck=narration ? .25 : 1;engine.frequency.setTargetAtTime(38+rpm*76+(gas?10:0),t,.12);harmonic.frequency.setTargetAtTime(76+rpm*152,t,.12);engineGain.gain.setTargetAtTime((.015+rpm*.028)*duck,t,.12);roadGain.gain.setTargetAtTime(rpm*.055*duck,t,.18)}
 function brake(speed=30){if(!ctx||speed<5||Date.now()-lastBrake<450)return;lastBrake=Date.now();const t=ctx.currentTime,source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();source.buffer=noise.buffer;filter.type='bandpass';filter.frequency.setValueAtTime(1600,t);filter.frequency.exponentialRampToValueAtTime(500,t+.25);gain.gain.setValueAtTime(.0001,t);gain.gain.exponentialRampToValueAtTime(.09,t+.025);gain.gain.exponentialRampToValueAtTime(.0001,t+.32);source.connect(filter);filter.connect(gain);gain.connect(master);source.start(t);source.stop(t+.34);source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect()}}
 return {start,stop,update,brake};
})();
