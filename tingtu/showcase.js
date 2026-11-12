'use strict';
(() => {
 const realSpeak=speak,realEnd=end,realCloseSheet=closeSheet;let presetOpen=false,presetFocus;
 function episode(i=index){return window.tingtuShowcase[chosenRoute.id]?.[i]}
 function prepare(i){const item=episode(i);return item?window.tingtuSpeech.prepare(item.text).catch(()=>null):Promise.resolve(null)}
 speak=function(){const item=episode();if(!item){toast('本站讲解暂未准备好');return}realSpeak({title:item.title,text:item.text,ids:item.ids});prepare(index+1)};
 ask=function(raw){if(/结束/.test(raw)){end();return}if(/暂停|安静|别说/.test(raw)){stopAudio();return}info()};
 end=function(){window.tingtuDrive?.close();realEnd()};$('#endBtn').onclick=end;
 window.tingtuAgent={reset(){stopAudio()},refresh(){stopAudio()},prepare,warm(){prepare(index);prepare(index+1)}};
 const closed=()=>{$('#chatToggle').checked=false;$('#wakeLabel').textContent='选个问题，聊一聊';$('#wakeStatus').textContent='预设问答'};
 window.tingtuWake={start(){closed();info()},stop:closed,ready:closed,isSpeaking:()=>false,status:()=>({enabled:false,message:'展示版'})};closed();
 const questions={
  dunes:[['沙丘为什么会移动？',0],['沙漠里的湖水从哪里来？',3],['沙漠到了晚上为什么会变凉？',5]],
  coast:[['清晨去灯塔，可以看到什么？',0],['在礁石观景台能看到什么？',2],['晚霞值得等一等吗？',4]],
  mountains:[['旧巷里有什么值得留意的？',0],['老茶坊里有什么有趣的？',2],['手作工坊值得停下来看看吗？',4]]
 };
 const offlineNote='线上为预设问答体验；想试实时 AI 生成，欢迎到线下体验。';
 closeSheet=function(){if(presetOpen){stopAudio();presetOpen=false}realCloseSheet()};
 function info(){
  const opening=!presetOpen;window.tingtuDrive?.pauseForDialog();stopAudio();presetOpen=true;
  showSheet('聊一聊',`<span class="preset-label">预设问答体验</span><p class="preset-prompt">选一个你感兴趣的问题。</p><div class="preset-questions">${questions[chosenRoute.id].map(([q],i)=>`<button type="button" data-preset="${i}"><span>${htmlText(q)}</span><b>↗</b></button>`).join('')}</div><p class="preset-note">${offlineNote}</p>`);
  if(opening)presetFocus=lastFocus;else lastFocus=presetFocus;
  document.querySelectorAll('[data-preset]').forEach(button=>button.onclick=()=>reply(+button.dataset.preset));
 }
 function reply(i){
  const [question,place]=questions[chosenRoute.id][i],item=episode(place);stopAudio();presetOpen=true;
  showSheet('听途的回答',`<span class="preset-label">预设问答体验</span><h3 class="preset-question">${htmlText(question)}</h3><p class="preset-answer">${htmlText(item.text)}</p><div class="preset-actions"><button type="button" id="presetListen">播放 / 暂停</button><button type="button" id="presetBack">换个问题</button></div><p class="preset-note">${offlineNote}</p>`);
  lastFocus=presetFocus;const play=()=>realSpeak({title:question,text:item.text,ids:item.ids});play();
  $('#presetListen').onclick=()=>{if(playing)stopAudio();else play()};$('#presetBack').onclick=info;
 }
 $('#voiceStatusBtn').onclick=info;$('#showcaseChatBtn').onclick=info;$('#showcaseAskBtn').onclick=info;
 function notes(){try{return JSON.parse(localStorage.getItem('tingtu-showcase-notes')||'[]')}catch{return []}}
 function compose(){if(!started)return;window.tingtuDrive?.pauseForDialog();stopAudio();const route=chosenRoute.id,place=index,name=stops[place].name;const recent=notes().filter(n=>n.route===route&&n.place===place).slice(-3).reverse();
  showSheet('在'+name+'发帖',`<form id="localNoteForm" class="community-form"><label for="noteBody">分享你的经历</label><textarea id="noteBody" maxlength="600" rows="5" required placeholder="这里有什么值得停下来的发现？"></textarea><button class="sheet-action" type="submit">发布</button></form>${recent.map(n=>`<div class="comment"><b>我的分享</b><p>${htmlText(n.body)}</p></div>`).join('')}`);
  $('#localNoteForm').onsubmit=e=>{e.preventDefault();const body=$('#noteBody').value.trim();if(!body)return;try{const data=notes();data.push({route,place,body,at:Date.now()});localStorage.setItem('tingtu-showcase-notes',JSON.stringify(data.slice(-100)));closeSheet();toast('发布成功')}catch{toast('暂时无法发布，请稍后再试')}};
 }
 window.tingtuCommunity={load:async()=>{},compose};$('#publishHereBtn').onclick=compose;$('#arrivalPostBtn').onclick=compose;
})();
