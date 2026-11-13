'use strict';
(() => {
 const key='tingtu-guide-v1';
 function showGuide(){
  const inTrip=started;window.tingtuDrive?.pauseForDialog();stopAudio();
  showSheet('第一次来，先这样玩',`<span class="guide-kicker">建议打开声音 · 约 1 分钟</span><p class="guide-lead">听途，把旅行分享变成沿途的声音。推荐从「云旅途」开始体验。</p><ol class="guide-steps"><li><b>01</b><div><strong>选路线，开一段云旅途</strong><p>科普、观光、人文，挑一条感兴趣的。</p></div></li><li><b>02</b><div><strong>推摇杆，到站听故事</strong><p>按住并推开摇杆前进，松手停车；到站会自动停下并播报。</p></div></li><li><b>03</b><div><strong>问一问，留下你的发现</strong><p>试试预设问答或发帖。结束行程后，点头像回看引用过的笔记。</p></div></li></ol><button id="guideStartBtn" class="sheet-action">${inTrip?'知道了，继续体验':'开始云旅途体验'}</button>${inTrip?'':'<button id="guideExploreBtn" class="guide-explore">我自己看看</button>'}<p class="guide-note">线上为预设体验；实时 AI 生成，欢迎到线下体验。</p>`);
  try{localStorage.setItem(key,'1')}catch{}
  $('#guideStartBtn').onclick=()=>{closeSheet();if(!inTrip)chooseRoute('cloud')};
  const explore=$('#guideExploreBtn');if(explore)explore.onclick=closeSheet;
 }
 $('#guideBtn').onclick=showGuide;$('#driveGuideBtn').onclick=showGuide;
 let seen=false;try{seen=localStorage.getItem(key)==='1'}catch{}
 if(!seen)requestAnimationFrame(()=>setTimeout(()=>{if(!started&&$('#modal').hidden&&!document.body.classList.contains('search-open'))showGuide()},120));
})();
