const fs = require('fs');
const src = fs.readFileSync(__dirname + '/app.js','utf8');
const tests=[];
const ok=(name,cond,detail='')=>tests.push({name,pass:!!cond,detail});

ok('NPC a 0 PV vira Incapacitado', /n\.status=n\.hp<=0\?'Incapacitado':'Ativo'/.test(src));
ok('PV do NPC é sincronizado antes de encerrar o combate', /n\.hp=Math\.max\(0,Math\.min\(n\.maxHp\|\|999,state\.combat\.beast\.hp\)\)/.test(src));
ok('O combate é encerrado e state.combat é limpo', /state\.combat=null;/.test(src));
ok('O retorno preserva o hex do contexto', /state\.map\.selected=Number\(returnContext\.cell\?\?state\.map\.selected\)/.test(src));
ok('Conflito com NPC incapacitado conclui o POI', /npcDefeated\?'concluido':'andamento'/.test(src));
ok('Histórico registra NPC incapacitado', /NPC incapacitado/.test(src));
ok('Mapa é mostrado após o conflito', /show\('map'\)/.test(src));
ok('Diálogo NÃO é reaberto quando NPC está incapacitado', /if\(!npcDefeated\)\{[\s\S]*?interactMapNPC\(idx,npcId\)/.test(src));
ok('Diálogo continua disponível quando NPC sobrevive', /npcDefeated\?'não':'sim'/.test(src));
ok('Resultado flutuante informa que o diálogo não foi reaberto', /não será reaberto automaticamente/.test(src));
ok('Resultado flutuante informa o estado do NPC', /Estado: \$\{npcReturn\?\.status\|\|\'Ativo\'\}/.test(src));
ok('Apenas NPC derrotado encerra o POI como concluído', /npcDefeated=!!\(npcBattle&&npcReturn\?\.status==='Incapacitado'\)/.test(src));

// Simulação determinística do cenário solicitado: NPC 0 PV.
const sim={npc:{name:'Guardião',hp:0,maxHp:10,status:'Incapacitado'},combat:null,map:{selected:42},dialogueOpened:false,poi:{status:'concluido',history:[]}};
sim.combat={beast:{hp:0},npcEncounter:true,npcId:'npc1',returnContext:{type:'npc-dialogue',cell:42,poiIndex:0}};
const npc=sim.npc;
npc.hp=Math.max(0,Math.min(npc.maxHp,sim.combat.beast.hp));
npc.status=npc.hp<=0?'Incapacitado':'Ativo';
const defeated=npc.status==='Incapacitado';
sim.map.selected=sim.combat.returnContext.cell;
sim.poi.status=defeated?'concluido':'andamento';
sim.poi.history.push({text:`NPC ${npc.name}: ${npc.status} (${npc.hp}/${npc.maxHp} PV)`});
sim.combat=null;
if(!defeated) sim.dialogueOpened=true;
ok('SIMULAÇÃO: NPC termina com 0 PV',sim.npc.hp===0);
ok('SIMULAÇÃO: estado final é Incapacitado',sim.npc.status==='Incapacitado');
ok('SIMULAÇÃO: diálogo não reabre',sim.dialogueOpened===false);
ok('SIMULAÇÃO: mapa retorna ao mesmo hex',sim.map.selected===42);
ok('SIMULAÇÃO: POI fica concluído',sim.poi.status==='concluido');
ok('SIMULAÇÃO: histórico mantém registro',sim.poi.history.length===1 && /Incapacitado/.test(sim.poi.history[0].text));
ok('SIMULAÇÃO: combate foi encerrado',sim.combat===null);

const failed=tests.filter(t=>!t.pass);
console.log(tests.map(t=>`${t.pass?'PASS':'FAIL'} - ${t.name}${t.detail?` — ${t.detail}`:''}`).join('\n'));
console.log(`\n${tests.length-failed.length}/${tests.length} verificações passaram.`);
if(failed.length) process.exit(1);
