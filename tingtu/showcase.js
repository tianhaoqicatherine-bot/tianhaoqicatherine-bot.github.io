'use strict';
(() => {
 const realSpeak=speak,realEnd=end;
 function episode(i=index){return window.tingtuShowcase[chosenRoute.id]?.[i]}
 function prepare(i){const item=episode(i);return item?window.tingtuSpeech.prepare(item.text).catch(()=>null):Promise.resolve(null)}
 speak=function(){const item=episode();if(!item){toast('本站讲解暂未准备好');return}realSpeak({title:item.title,text:item.text,ids:item.ids});prepare(index+1)};
 ask=function(raw){if(/结束/.test(raw)){end();return}if(/暂停|安静|别说/.test(raw)){stopAudio();return}info()};
 end=function(){window.tingtuDrive?.close();realEnd()};$('#endBtn').onclick=end;
 window.tingtuAgent={reset(){stopAudio()},refresh(){stopAudio()},prepare,warm(){prepare(index);prepare(index+1)}};
 const closed=()=>{$('#chatToggle').checked=false;$('#wakeLabel').textContent='实时聊天稍后开放';$('#wakeStatus').textContent='展示版'};
 window.tingtuWake={start(){closed();info()},stop:closed,ready:closed,isSpeaking:()=>false,status:()=>({enabled:false,message:'展示版'})};closed();
 function info(){showSheet('听途 · 手机展示版','<p class="connection-copy">三条主题路线，已经准备好沿途讲解。实时语音问答稍后开放。</p><button class="sheet-action" id="showcaseListenBtn">听听这一站</button>');$('#showcaseListenBtn').onclick=()=>{closeSheet();speak()}}
 $('#voiceStatusBtn').onclick=info;
 function notes(){try{return JSON.parse(localStorage.getItem('tingtu-showcase-notes')||'[]')}catch{return []}}
 function compose(){if(!started)return;window.tingtuDrive?.pauseForDialog();stopAudio();const route=chosenRoute.id,place=index,name=stops[place].name;const recent=notes().filter(n=>n.route===route&&n.place===place).slice(-3).reverse();
  showSheet('在'+name+'发帖',`<form id="localNoteForm" class="community-form"><label for="noteBody">分享你的经历</label><textarea id="noteBody" maxlength="600" rows="5" required placeholder="这里有什么值得停下来的发现？"></textarea><button class="sheet-action" type="submit">发布</button></form>${recent.map(n=>`<div class="comment"><b>我的分享</b><p>${htmlText(n.body)}</p></div>`).join('')}`);
  $('#localNoteForm').onsubmit=e=>{e.preventDefault();const body=$('#noteBody').value.trim();if(!body)return;try{const data=notes();data.push({route,place,body,at:Date.now()});localStorage.setItem('tingtu-showcase-notes',JSON.stringify(data.slice(-100)));closeSheet();toast('发布成功')}catch{toast('暂时无法发布，请稍后再试')}};
 }
 window.tingtuCommunity={load:async()=>{},compose};$('#publishHereBtn').onclick=compose;$('#arrivalPostBtn').onclick=compose;
})();
