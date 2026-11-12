'use strict';
window.tingtuSpeech=window.tingtuAudio.create({async load(text,signal){const item=Object.values(window.tingtuShowcase).flat().find(x=>x.text===text);if(!item)throw Error('本站讲解暂未准备好');const r=await fetch(new URL(item.audio,document.baseURI),{signal});if(!r.ok)throw Error('音频加载失败，请重试');return r.blob()}});
