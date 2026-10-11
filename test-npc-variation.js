const fs=require('fs'), vm=require('vm');
const src=fs.readFileSync('/mnt/data/npcvar2/app.js','utf8');
function extract(name){const re=new RegExp('function '+name+'\\s*\\('); const m=re.exec(src); if(!m) throw Error('missing '+name); let i=src.indexOf('{',m.index); let d=0; for(let j=i;j<src.length;j++){if(src[j]==='{')d++; else if(src[j]==='}'&&!--d)return src.slice(m.index,j+1);} throw Error(name+' unclosed');}
const ctx={console,Math,Date}; ctx.state={}; ctx.uid=()=> 'x'; ctx.toast=()=>{}; ctx.save=()=>{}; ctx.render=()=>{}; ctx.closeModal=()=>{}; ctx.openModal=()=>{}; ctx.mapPOIResult=()=>{}; ctx.mapPOIKey=(i)=>String(i); ctx.checkNPCEventsOnArrival=()=>{}; ctx.migrateNPC=(n)=>{n.position=n.position||{type:'hex',hex:5,label:''};n.events=n.events||[]}; ctx.eventLocationForNPC=(n)=>({type:n.position?.type||'hex',hex:Number(n.position?.hex||5),label:n.position?.label||''});
for(const n of ['npcSocialOutcome','normalizeNPCEvent','applyNPCEventConsequence','resolveMapNPCEvent']) vm.runInNewContext(extract(n),ctx);
const results=[]; const pass=(name,ok,detail)=>results.push({name,pass:!!ok,detail});
function freshState(){ctx.state={map:{day:3,current:5,selected:5,history:[]},characters:[{id:'c1',name:'Ari',hp:10,maxHp:20,fatigue:2,supplies:5,gold:10,legend:1},{id:'c2',name:'Bela',hp:12,maxHp:18,fatigue:1,supplies:4,gold:7,legend:2}],character:null,npcs:[],log:[]};ctx.state.character=ctx.state.characters[0];}
freshState();
let r=ctx.npcSocialOutcome('negotiate',{total:17,success:true,fumble:false}); pass('Negociar sucesso',r.startsWith('Sucesso'),r);
r=ctx.npcSocialOutcome('negotiate',{total:9,success:false,fumble:false}); pass('Negociar falha',r.startsWith('Falha'),r);
r=ctx.npcSocialOutcome('bluff',{total:12,success:true,fumble:false}); pass('Blefe sucesso',r.startsWith('Sucesso'),r);
r=ctx.npcSocialOutcome('bluff',{total:11,success:false,fumble:false}); pass('Blefe falha',r.startsWith('Falha'),r);
const npc={id:'n1',name:'Guardião',events:[]}; ctx.state.npcs=[npc];
const outs={completed:{text:'Acordo fechado',gold:3,supplies:1,fatigue:-1,hp:2,legend:1},deferred:{text:'O assunto fica para amanhã',gold:0,supplies:0,fatigue:1,hp:0,legend:0},cancelled:{text:'A cena é cancelada',gold:-2,supplies:0,fatigue:0,hp:-1,legend:0}};
let e={id:'e1',title:'Sucesso',day:3,status:'pending',done:false,outcomes:outs};ctx.applyNPCEventConsequence(e,'completed',npc);pass('Sucesso: PO não duplica',ctx.state.characters[0].gold===13&&ctx.state.characters[1].gold===10,'gold='+ctx.state.characters.map(c=>c.gold).join(','));pass('Sucesso: demais efeitos',ctx.state.characters[0].hp===12&&ctx.state.characters[0].fatigue===1&&ctx.state.characters[0].legend===2,'Ari');
// Deferred
ctx.state.map.day=3; e={id:'e2',title:'Adiamento',day:3,status:'pending',done:false,outcomes:outs};npc.events=[e];ctx.resolveMapNPCEvent(0,npc.id,e.id,'deferred');pass('Adiamento: pendente + dia seguinte',e.status==='pending'&&e.done===false&&e.day===4,'day='+e.day);pass('Adiamento: consequência única',ctx.state.characters[0].fatigue===2&&ctx.state.characters[1].fatigue===1,'fatigue='+ctx.state.characters.map(c=>c.fatigue).join(','));
// Cancel
ctx.state.map.day=3;e={id:'e3',title:'Cancelamento',day:3,status:'pending',done:false,outcomes:outs};npc.events=[e];ctx.resolveMapNPCEvent(0,npc.id,e.id,'cancelled');pass('Cancelamento: encerrado',e.status==='cancelled'&&e.done===false,'status='+e.status);pass('Cancelamento: consequência única',ctx.state.characters[0].gold===11&&ctx.state.characters[1].gold===8&&ctx.state.characters[0].hp===11,'chars='+JSON.stringify(ctx.state.characters));
// Complete
ctx.state.map.day=3;e={id:'e4',title:'Conclusão',day:3,status:'pending',done:false,outcomes:outs};npc.events=[e];ctx.resolveMapNPCEvent(0,npc.id,e.id,'completed');pass('Conclusão: encerrado',e.status==='completed'&&e.done===true,'status='+e.status);
const ok=results.every(x=>x.pass);console.log(JSON.stringify({ok,passed:results.filter(x=>x.pass).length,total:results.length,results},null,2));process.exit(ok?0:1);
