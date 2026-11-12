'use strict';
(() => {
 function preset(text){return Object.values(window.tingtuPreset||{}).flat().find(item=>item.text===text)}
 function split(text){if(preset(text)||text.length<110)return [text];const sentences=text.match(/[^。！？!?]+[。！？!?]?/g)||[text];let first='';while(sentences.length&&first.length<55)first+=sentences.shift();return sentences.length?[first,sentences.join('')]:[text]}
 window.tingtuSpeech=window.tingtuAudio.create({split,async load(text,signal){const fixed=preset(text);const r=await fetch(fixed?new URL(fixed.audio,document.baseURI):'/api/voice/tts',fixed?{signal}:{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text}),signal});if(!r.ok){let data;try{data=await r.json()}catch{}throw Error(data?.error||'语音准备失败，请重试')}return r.blob()}});
})();
