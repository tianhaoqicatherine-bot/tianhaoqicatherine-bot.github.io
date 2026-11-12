'use strict';
// Convert browser recorder output to a small, predictable mono PCM WAV upload.
window.tingtuWav={encode(audio){
 const rate=16000,count=Math.floor(audio.length*rate/audio.sampleRate),bytes=new ArrayBuffer(44+count*2),v=new DataView(bytes);
 const str=(offset,text)=>{for(let i=0;i<text.length;i++)v.setUint8(offset+i,text.charCodeAt(i))};
 str(0,'RIFF');v.setUint32(4,36+count*2,true);str(8,'WAVE');str(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,rate,true);v.setUint32(28,rate*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);str(36,'data');v.setUint32(40,count*2,true);
 const channels=Array.from({length:audio.numberOfChannels},(_,i)=>audio.getChannelData(i));
 for(let i=0;i<count;i++){const position=i*audio.sampleRate/rate,a=Math.floor(position),b=Math.min(a+1,audio.length-1),fraction=position-a;let sample=0;for(const ch of channels)sample+=(ch[a]*(1-fraction)+ch[b]*fraction)/channels.length;sample=Math.max(-1,Math.min(1,sample));v.setInt16(44+i*2,sample<0?sample*32768:sample*32767,true)}
 return new Blob([bytes],{type:'audio/wav'});
}};
