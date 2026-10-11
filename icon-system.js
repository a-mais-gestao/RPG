(function(){
  const ICONS={
    campaigns:'<path d="M4 19V6l8-3 8 3v13l-8 3-8-3Z"/><path d="M12 5v14M4 8l8 3 8-3"/>',
    party:'<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3.5 19c.7-3.2 2.4-4.8 5.5-4.8s4.8 1.6 5.5 4.8M14 14.8c2.6-.4 4.5 1 5 4.2"/>',
    character:'<circle cx="12" cy="7" r="3.5"/><path d="M5 21c.6-4.5 2.8-6.7 7-6.7s6.4 2.2 7 6.7"/>',
    sheet:'<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v5h5M9 12h6M9 16h6M9 8h3"/>',
    map:'<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15M15 6v15"/>',
    tracking:'<circle cx="11" cy="11" r="6"/><path d="m16 16 5 5M8 11h6M11 8v6"/>',
    beast:'<path d="M7 8 4 4l5 2 3-3 3 3 5-2-3 4 1 7-6 4-6-4 1-7Z"/><circle cx="9" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="11" r="1" fill="currentColor" stroke="none"/>',
    combat:'<path d="m5 4 15 15M19 5 5 19"/><path d="m4 4 4 1 2 2-3 3-2-2-1-4ZM20 20l-4-1-2-2 3-3 2 2 1 4Z"/>',
    npcs:'<path d="M5 5h14v10H9l-4 4V5Z"/><circle cx="9" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r="1" fill="currentColor" stroke="none"/>',
    tips:'<path d="M9 18h6M10 21h4"/><path d="M8.2 14.5C6.8 13.4 6 11.7 6 9.8A6 6 0 0 1 18 10c0 1.8-.8 3.5-2.2 4.5-.8.6-1.3 1.5-1.3 2.5h-5c0-1-.5-1.9-1.3-2.5Z"/><path d="M12 2v2M4.9 4.9l1.4 1.4M19.1 4.9l-1.4 1.4"/>',
    dice:'<path d="M5 3h14v18H5z"/><circle cx="9" cy="8" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="16" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="8" r="1" fill="currentColor" stroke="none"/><circle cx="9" cy="16" r="1" fill="currentColor" stroke="none"/>',
    trash:'<path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    success:'<path d="m5 12 4 4L19 6"/>',
    fail:'<path d="m6 6 12 12M18 6 6 18"/>',
    next:'<path d="m6 5 8 7-8 7V5ZM14 5v14"/>',
    danger:'<path d="M12 3 21 20H3L12 3Z"/><path d="M12 9v5M12 17h.01"/>',
    location:'<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>',
    event:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/><circle cx="12" cy="12" r="4"/>',
    skull:'<circle cx="12" cy="11" r="7"/><path d="M9 18v3h6v-3M9 10h.01M15 10h.01M9 14c1.7 1 4.3 1 6 0"/>',
    shield:'<path d="M12 3 19 6v6c0 4.5-2.8 7.4-7 9-4.2-1.6-7-4.5-7-9V6l7-3Z"/><path d="m9 12 2 2 4-4"/>',
    sword:'<path d="m6 18 11-11 3 3-11 11H6v-3Z"/><path d="m14 6 4 4M5 21l4-4"/>',
    coin:'<circle cx="12" cy="12" r="8"/><path d="M14.5 9.5c-.7-.8-1.6-1.2-2.7-1.2-1.5 0-2.5.8-2.5 1.8s.8 1.5 2.5 1.9 2.5.9 2.5 1.9-1 1.8-2.5 1.8c-1.1 0-2-.4-2.7-1.2"/>',
    calendar:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 9h16"/>',
    eye:'<path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.5"/>',
    heal:'<path d="M12 21S4 16.2 4 9.5C4 6.5 6 4 8.8 4c1.5 0 2.6.7 3.2 1.8C12.6 4.7 13.7 4 15.2 4 18 4 20 6.5 20 9.5 20 16.2 12 21 12 21Z"/><path d="M12 8v6M9 11h6"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'
  };
  const LEADING={
    '🗺️':'map','🗺':'map','👥':'party','🧙':'character','📜':'sheet','🌍':'map','🔎':'tracking','🐲':'beast','⚔️':'combat','⚔':'combat','🎭':'npcs','💡':'tips','🎲':'dice','🗑️':'trash','🗑':'trash','＋':'plus','✓':'success','✔️':'success','✔':'success','❌':'fail','✕':'fail','⏭️':'next','⏭':'next','⚡':'event','📍':'location','💀':'skull','🩸':'danger','🛡️':'shield','🛡':'shield','👁️':'eye','👁':'eye','🧪':'heal','💰':'coin','📅':'calendar','ℹ️':'info','ℹ':'info','🗡️':'sword','🗡':'sword'
  };
  function icon(name,cls=''){
    const body=ICONS[name]||ICONS.info;
    return `<svg class="ui-icon ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${body}</svg>`;
  }
  function cleanLeading(el){
    if(!el || el.dataset.iconized==='1') return;
    if(el.children.length && !el.matches('button.btn,button.icon-btn')) return;
    const text=el.textContent.trim();
    const key=Object.keys(LEADING).find(k=>text.startsWith(k));
    if(!key) return;
    const name=LEADING[key];
    const rest=text.slice(key.length).trimStart();
    if(!rest) return;
    el.dataset.iconized='1';
    el.innerHTML=icon(name,'entity-icon')+`<span class="icon-label">${rest}</span>`;
  }
  function iconizeNav(){
    const navMap={campaigns:'campaigns',party:'party',character:'character',sheet:'sheet',map:'map',tracking:'tracking',beast:'beast',combat:'combat',npcs:'npcs',tips:'tips'};
    document.querySelectorAll('.nav-btn[data-view]').forEach(el=>{
      if(el.dataset.iconized==='1') return;
      const name=navMap[el.dataset.view];
      if(!name) return;
      const label=el.textContent.trim().replace(/^\S+\s*/,'');
      el.dataset.iconized='1';
      el.innerHTML=icon(name,'nav-icon')+`<span class="icon-label">${label}</span>`;
    });
  }
  function iconize(root=document){
    iconizeNav();
    const selectors=['button.btn','button.icon-btn','.map-poi-icon','.event-kicker','.tips-icon','.section-title','.panel-title'];
    root.querySelectorAll(selectors.join(',')).forEach(cleanLeading);
    const brand=document.querySelector('.brand>span');
    if(brand && brand.dataset.iconized!=='1'){
      brand.dataset.iconized='1';
      brand.innerHTML=icon('beast','brand-icon');
    }
    const danger=document.querySelector('.sidebar>.nav-btn.danger');
    if(danger && danger.dataset.iconized!=='1'){
      danger.dataset.iconized='1';
      danger.innerHTML=icon('trash','entity-icon')+'<span class="icon-label">Apagar todos os dados</span>';
    }
    const newBtn=document.querySelector('.new-campaign');
    if(newBtn && newBtn.dataset.iconized!=='1'){
      newBtn.dataset.iconized='1';
      newBtn.innerHTML=icon('plus','entity-icon')+'<span class="icon-label">Nova campanha</span>';
    }
    const roll=document.querySelector('.roll-mode-control>span');
    if(roll && roll.dataset.iconized!=='1'){
      roll.dataset.iconized='1';
      roll.innerHTML=icon('dice','entity-icon')+'<span class="icon-label">Rolagens</span>';
    }
    const d20=document.querySelector('.top-actions .icon-btn');
    if(d20 && d20.dataset.iconized!=='1'){
      d20.dataset.iconized='1';
      d20.innerHTML=icon('dice','entity-icon')+'<span class="icon-label">d20</span>';
    }
  }
  window.SombraIcons={iconize};
  document.addEventListener('DOMContentLoaded',()=>{
    iconize();
    const target=document.getElementById('content');
    if(target){
      const observer=new MutationObserver(()=>requestAnimationFrame(()=>iconize(target)));
      observer.observe(target,{childList:true,subtree:true});
    }
  });
})();
