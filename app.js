const ATTRS=["str","dex","int","wis","cha","sur"];
const ATTR_LABEL={str:"Força",dex:"Destreza",int:"Inteligência",wis:"Sabedoria",cha:"Carisma",sur:"Sobrevivência"};

const classes={
  Eremita:{hp:20,gold:10,attrs:{dex:1,sur:2},spec:["Esconder","Rastrear"],equipment:["Sabre (1d6; +1 para acertar)","Arco Composto (1d6)","10 Flechas","Gibão de Couro (8 PP)"]},
  Acadêmico:{hp:20,gold:10,attrs:{int:2,wis:1},spec:["Investigar","Usar Manifestações"],equipment:["Lança de Guerra (1d6; Arremesso)","Arco Simples (1d4)","10 Flechas","Cota de Malha (10 PP)","1 Poção da Resistência"]},
  Ferreiro:{hp:22,gold:10,attrs:{str:2,sur:1},spec:["Escalar","Fabricar/Consertar"],equipment:["Espada Simples (1d6)","Adaga (1d4; Arremesso)","Cota de Malha (10 PP)"]},
  Nobre:{hp:20,gold:100,attrs:{int:2,cha:1},spec:["Investigar","Negociar"],equipment:["Lança de Cavalaria (1d8+1; Longo; só montado)","Espada Simples (1d6)","Cota de Malha (10 PP)"]},
  Bárbaro:{hp:26,gold:0,attrs:{str:3},spec:["Escalar","Intimidar"],equipment:["Machado Bárbaro (1d10; duas mãos; Pesado)"]},
  Mago:{hp:20,gold:10,attrs:{int:1,wis:2},spec:["Investigar","Usar Manifestações"],equipment:["Cajado Arcano (1d4; foco: +1 em ataques mágicos)","Grimório Simples (5 Manifestações)"]},
  Bardo:{hp:18,gold:20,attrs:{cha:2,wis:1},spec:["Negociar","Discurso/Inspirar"],equipment:["Espada Simples (1d6)","Gibão de Couro (8 PP)","Instrumento Musical (duas mãos)"]},
  Clérigo:{hp:22,gold:10,attrs:{cha:1,wis:2},spec:["Primeiros Socorros","Usar Manifestações"],equipment:["Maça (1d8; Pesado)","Escudo","Cota de Malha (10 PP)","Símbolo Sagrado (produz Água Benta)","2 Poções de Vida (Pequena)","1 Poção da Resistência"]},
  Necromante:{hp:18,gold:10,attrs:{int:1,wis:1,sur:1},spec:["Investigar","Usar Manifestações","Rastrear"],equipment:["Cajado Necrótico (1d6+1 [Ácido])","Adaga (1d4)","Cota de Malha (10 PP)","Tomo Necrótico (duas mãos)","1 Poção de Vida (Pequena)"]},
  Druida:{hp:20,gold:10,attrs:{wis:1,sur:2},spec:["Rastrear","Domesticar"],equipment:["Bordão Druídico (1d6+1)","Adaga (1d4)","Manto de Pele (4 PP [Gelo])","Bolsa de Ervas (5 ingredientes)","1 Poção de Vida (Pequena)"]},
  Ladino:{hp:18,gold:50,attrs:{str:1,dex:1,int:1},spec:["Esconder","Roubar","Desarmar Armadilha"],equipment:["2 Adagas (1d4; Arremesso)","Arco Simples (1d4)","10 Flechas","Gibão de Couro (8 PP)","1 Frasco de Veneno (3 usos)"]},
  Amaldiçoado:{hp:24,gold:10,attrs:{dex:2,sur:1},spec:["Esconder","Rastrear"],equipment:["Espada Longa (1d6+1; Torque: 1d8+1)","Amuleto do Pacto","Couro Reforçado (9 PP)"]}
};

const races={
  Humano:{hp:0,classes:"Qualquer",affinity:false,attrs:{},equipment:["Espada Simples (1d6)","Escudo"],adv:"Adaptável: +1 em qualquer atributo na criação; Determinado: 1× por sessão, rerrole um teste; Manifestação aleatória.",pen:"Nenhuma."},
  Elfo:{hp:-2,classes:"Mago, Eremita, Bardo",attrs:{},equipment:["Arco Composto (1d6; duas mãos; distância)","10 Flechas"],adv:"Visão noturna; Passo silencioso: +2 em Esconder em Florestas e Selvas.",pen:"Não pode usar Ataque Poderoso."},
  Strix:{hp:-2,classes:"Eremita, Ladino, Druida",attrs:{},equipment:["Lança de Guerra (1d6; Arremesso)"],adv:"Visão 360°: vantagem em Perceber Perigo e Besta −3 para localizar você escondido; Silêncio noturno: +3 em Esconder à noite.",pen:"Sob luz intensa (Deserto e Planície de dia), −2 em todos os testes."},
  Anão:{hp:4,classes:"Ferreiro, Bárbaro, Clérigo",attrs:{},equipment:["Marreta com Ponta (1d10; duas mãos; Pesado; funciona como Picareta)","Elmo-Lanterna"],adv:"Toque de Ferreiro: +2 PP em uma peça de armadura, à escolha; Resistência a queda.",pen:"−1 em Acrobacia e Fugir."},
  Orc:{hp:6,classes:"Bárbaro, Ferreiro, Druida",attrs:{},equipment:["Gládio Orc (1d6+1)"],adv:"Fúria Bruta: 1×/combate, ataque +3 dano sem Fadiga; Regeneração Selvagem: +1 PV extra ao descansar ao ar livre.",pen:"−1 em Investigar em cidades; Reputação inicial −2 em civilizações humanas, élficas e anãs."},
  Anjo:{hp:0,classes:"Clérigo, Bardo, Nobre",attrs:{},equipment:[],adv:"Asas: 1×/combate, voa 1d4 turnos; Aura Sagrada: aliados adjacentes recuperam +1 PV ao descansar à noite.",pen:"+2 dano Sombrio sofrido; desvantagem em Mentir."},
  Demônio:{hp:2,classes:"Amaldiçoado, Necromante, Bárbaro",attrs:{},equipment:[],adv:"Resistência ao fogo: reduz 2 dano [Fogo]; Intimidação: 1×/sessão, inimigo perde 1 turno.",pen:"Reputação inicial −3 em civilizações não Orc/Demoníaca; dano Divino contra você +2."},
  Draconato:{hp:2,classes:"Bárbaro, Ferreiro, Mago",attrs:{},equipment:[],adv:"Sopro Elemental: 1×/combate, 2d6 em Área; Escamas Naturais: +2 PP passivos.",pen:"Esconder custa 1 Fadiga extra; Mover em Silêncio com desvantagem."},
  Gnomo:{hp:-2,classes:"Acadêmico, Mago, Ladino",attrs:{},equipment:[],adv:"Mentes inventivas: fabricação custa 1 ingrediente a menos (mín. 1); Sorte do Pequeno: 1×/sessão, rerrole e fique com o melhor.",pen:"Armas de duas mãos causam −2 dano."},
  Goblin:{hp:-5,classes:"Ladino, Eremita, Acadêmico",attrs:{},equipment:[],adv:"Faro para tesouros: role duas vezes ao abrir Baú; Explosivo: pode se sacrificar causando 10 dano em Área.",pen:"Reputação inicial −3 (exceto Goblins); preços +50% fora de cidades Goblin/Orc."},
  Fada:{hp:-4,classes:"Bardo, Mago, Druida",attrs:{},equipment:[],adv:"Voo permanente; +4 em Esquivar contra Altura 1; imunidade a Derrubar e ataques de Área pelo chão; Glamour 1×/sessão.",pen:"−1 dano em ataques corporais; não pode usar Cota de Malha ou Placas."},
  Pequenino:{hp:-2,classes:"Ladino, Eremita, Bardo",attrs:{},equipment:[],adv:"Bestas com 5 m ou mais nunca escolhem você como alvo direto, salvo se único alvo possível; +2 em Esquivar.",pen:"Armas de duas mãos usam no máximo d8."},
  "Povo Gato":{hp:0,classes:"Ladino, Eremita, Druida",attrs:{},equipment:[],adv:"Nunca sofre dano de queda; sempre age primeiro na ordem dos jogadores, exceto contra emboscada.",pen:"Ao ver Animal Selvagem pequeno, Sabedoria CD 16 para não persegui-lo."},
  "Povo Cão":{hp:2,classes:"Eremita, Clérigo, Bárbaro",attrs:{},equipment:[],adv:"+3 em Rastrear em qualquer terreno; quando aliado cai a 0 PV, pode gastar 1 Fadiga para agir imediatamente.",pen:"Ataques de Área sonoros causam +1 dano."},
  Ogro:{hp:8,classes:"Bárbaro, Ferreiro, Amaldiçoado",attrs:{},equipment:[],adv:"Corpo de rocha: −2 dano físico de cada ataque antes da armadura; Escalar automático (CD 10).",pen:"−3 em todos os testes de Destreza; Reputação inicial −3 em civilizações humanas, élficas e gnomas; não pode usar Manifestações."},
  Vampiro:{hp:2,classes:"Necromante, Amaldiçoado, Ladino",attrs:{},equipment:[],adv:"Drenagem: cada acerto corporal recupera 1 PV; ao chegar a 0 PV entra em torpor 1d4 turnos.",pen:"De dia −1 em todos os testes (−2 em Deserto/Planície); itens sagrados causam +2 dano."},
  Lobisomem:{hp:4,classes:"Bárbaro, Druida, Eremita",attrs:{},equipment:[],adv:"Regeneração: +1 PV no início de cada turno; Garras 1d6+1.",pen:"Em 1 natural no ataque, Sabedoria CD 12 ou transforma-se e ataca aliado aleatório por 1d4 turnos."},
  Zumbi:{hp:6,classes:"Necromante, Bárbaro, Amaldiçoado",attrs:{},equipment:[],adv:"Imune a Veneno/Envenenado; 1×/combate, ao chegar a 0 PV fica incapacitado por 1 turno e volta com 1 PV.",pen:"−2 em Esquivar; Reputação inicial −3, exceto Necrópoles, Goblins e Orcs."},
  Metamorfo:{hp:0,classes:"Ladino, Bardo, Acadêmico",attrs:{},equipment:[],adv:"Forma copiada; Adaptação: 1×/sessão, copia vantagem passiva de aliado adjacente por 1 combate.",pen:"Reputação inicial −2 em qualquer cidade; ao perder 50%+ PV, Sabedoria CD 12 ou perde a ação."},
  Semideus:{hp:4,classes:"Clérigo, Mago, Amaldiçoado",attrs:{},equipment:[],adv:"Dom Divino: escolha 1 elemento e fique imune; Ascensão: 1×/combate, ao chegar a 5 PV ou menos, +3 dano nos ataques por 2 turnos.",pen:"Lordes Demônios sempre priorizam você; templos de deuses rivais cobram o dobro."}
};

const state={
  campaign:null,view:"campaigns",rollMode:"auto",
  gm:{notes:"",quests:[],phaseNote:"",session:1},
  character:{id:"",name:"",reason:"",race:"Humano",class:"Clérigo",legend:0,attrs:{str:0,dex:0,int:0,wis:2,cha:1,sur:0},hp:22,maxHp:22,pp:10,def:10,fatigue:0,gold:10,supplies:10,torches:10,inventory:[],spec:[],reputation:{},choices:{}},
  characters:[],activeCharacterId:null,npcs:[],locations:{cities:[],dungeons:[]},
  map:{current:40,selected:40,cells:{40:{terrain:"Planície",locality:"Cidade Humana",discovered:true,visited:true,season:"Primavera Caótica"}},day:1,phase:"Cidade",objective:"Criar a ficha e partir para a primeira caçada.",history:[]},tracks:0,beast:null,combat:null,log:[]
};

const terrains=["Planície","Montanha","Floresta","Pântano","Deserto","Tundra","Geleira","Água"];
const terrainClass={Planície:"revealed",Montanha:"mountain",Floresta:"forest",Pântano:"forest",Deserto:"mountain",Tundra:"revealed",Geleira:"water",Água:"water"};

function migrateNPC(n){
  n.id=n.id||uid("npc"); n.name=n.name||"NPC"; n.role=n.role||""; n.faction=n.faction||""; n.status=n.status||"Ativo";
  n.agenda=Array.isArray(n.agenda)?n.agenda:[]; n.events=Array.isArray(n.events)?n.events:[]; n.movementHistory=Array.isArray(n.movementHistory)?n.movementHistory:[];
  n.dialogue=n.dialogue||{};
  n.dialogue.intro=n.dialogue.intro||`${n.name} observa o grupo com cautela.`;
  n.dialogue.clues=Array.isArray(n.dialogue.clues)?n.dialogue.clues:[];
  n.dialogue.branches=n.dialogue.branches||{};
  ["negotiate","intimidate","bluff","insight","seduce"].forEach(k=>{
    n.dialogue.branches[k]=n.dialogue.branches[k]||{prompt:"",success:"",fail:"",next:"",options:[],conflictOnFail:false};
    const b=n.dialogue.branches[k]; b.prompt=b.prompt||""; b.success=b.success||""; b.fail=b.fail||""; b.next=b.next||""; b.options=Array.isArray(b.options)?b.options:[]; b.conflictOnFail=!!b.conflictOnFail;
  });
  if(!n.position){ n.position={type:"hex",hex:Number(n.location??state.map?.current??HEX_CENTER),label:""}; }
  n.position.type=n.position.type||"hex"; n.position.hex=Number(n.position.hex??n.location??state.map?.current??HEX_CENTER); n.position.label=n.position.label||"";
  n.location=n.position.hex;
  return n;
}
function npcDialogueBranch(n,action){migrateNPC(n);return n.dialogue?.branches?.[action]||{};}
function npcDialogueText(n,action,key,fallback=""){const v=npcDialogueBranch(n,action)?.[key];return v||fallback;}
function npcClueHtml(n){migrateNPC(n);const clues=n.dialogue.clues.filter(Boolean);return clues.length?`<div class="card npc-clues"><h4>🔎 Pistas que este NPC pode revelar</h4><ul>${clues.map(x=>`<li>${x}</li>`).join("")}</ul></div>`:`<div class="card npc-clues"><h4>🔎 Pistas</h4><p class="muted">Nenhuma pista específica cadastrada para este NPC.</p></div>`;}
function npcPositionLabel(n){migrateNPC(n);const p=n.position; if(p.type==="city")return `Cidade · ${p.label||`Hex ${p.hex}`}`;if(p.type==="dungeon")return `Masmorra · ${p.label||`Hex ${p.hex}`}`;return `Hex ${p.hex}`;}
function npcAtHex(i){return state.npcs.filter(n=>{migrateNPC(n);return Number(n.position.hex)===Number(i)})}
function eventLocationForNPC(n){migrateNPC(n);return {type:n.position.type||"hex",hex:Number(n.position.hex),label:n.position.label||""}}
function eventTargetLabel(e){const t=e.trigger||{type:"hex",hex:state.map.current,label:""};return `${t.type==="city"?"Cidade":t.type==="dungeon"?"Masmorra":"Hex"} · ${t.label||t.hex}`}
function addNPCEvent(id){const n=state.npcs.find(x=>x.id===id);if(!n)return;migrateNPC(n);const p=n.position;openModal(`<div class="event-card"><div class="event-kicker">EVENTO AUTOMÁTICO DE NPC</div><h2>Novo evento para ${n.name}</h2><p class="muted">O evento será oferecido automaticamente quando o grupo entrar no local configurado.</p><div class="grid grid-2"><div class="field"><label>Dia mínimo</label><input id="npcEventDay" type="number" min="1" value="${state.map.day}"></div><div class="field"><label>Tipo</label><select id="npcEventType"><option>Encontro</option><option>Missão</option><option>Conflito</option><option>Movimento</option><option>Segredo</option></select></div><div class="field"><label>Local de disparo</label><select id="npcEventLocType"><option value="${p.type||'hex'}">Local atual do NPC (${p.type||'hex'})</option><option value="hex">Hexágono</option><option value="city">Cidade</option><option value="dungeon">Masmorra</option></select></div><div class="field"><label>Hex de disparo</label><input id="npcEventLocHex" type="number" min="0" value="${p.hex}"></div></div><div class="field"><label>Nome do local (cidade/masmorra)</label><input id="npcEventLocLabel" value="${p.label||''}" placeholder="Ex.: Cidade de Ferro / Cripta do Rei"></div><div class="field"><label>Título</label><input id="npcEventTitle" placeholder="O NPC encontra o grupo"></div><div class="field"><label>Descrição</label><textarea id="npcEventDesc" rows="3"></textarea></div><div class="field"><label>Ação do Mestre</label><input id="npcEventAction" placeholder="Abrir diálogo, iniciar combate, entregar missão..."></div><h3>Consequências por resultado</h3><p class="muted">Defina o que acontece mecanicamente ao concluir, adiar ou cancelar. Valores são aplicados a cada personagem do grupo.</p>${outcomeFields("Complete","✓ Ao concluir")}${outcomeFields("Defer","⏭ Ao adiar")}${outcomeFields("Cancel","✕ Ao cancelar")}<div class="row"><button class="btn primary" onclick="saveNPCEvent('${id}')">Criar evento automático</button><button class="btn" onclick="closeModal()">Cancelar</button></div></div>`)}
function npcOutcomeData(prefix){return {text:document.getElementById(`npcEvent${prefix}Text`)?.value.trim()||"",gold:Number(document.getElementById(`npcEvent${prefix}Gold`)?.value)||0,supplies:Number(document.getElementById(`npcEvent${prefix}Supplies`)?.value)||0,fatigue:Number(document.getElementById(`npcEvent${prefix}Fatigue`)?.value)||0,hp:Number(document.getElementById(`npcEvent${prefix}Hp`)?.value)||0,legend:Number(document.getElementById(`npcEvent${prefix}Legend`)?.value)||0}}
function outcomeFields(prefix,title){return `<div class="card"><h3>${title}</h3><div class="field"><label>Texto da consequência</label><input id="npcEvent${prefix}Text" placeholder="Ex.: O NPC entrega a recompensa e a missão avança."></div><div class="grid grid-3"><div class="field"><label>PO para cada personagem</label><input id="npcEvent${prefix}Gold" type="number" value="0"></div><div class="field"><label>Provisões para cada personagem</label><input id="npcEvent${prefix}Supplies" type="number" value="0"></div><div class="field"><label>Fadiga para cada personagem</label><input id="npcEvent${prefix}Fatigue" type="number" value="0"></div><div class="field"><label>PV para cada personagem</label><input id="npcEvent${prefix}Hp" type="number" value="0"></div><div class="field"><label>Lenda para cada personagem</label><input id="npcEvent${prefix}Legend" type="number" value="0"></div></div></div>`}
function saveNPCEvent(id){const n=state.npcs.find(x=>x.id===id);if(!n)return;migrateNPC(n);n.events.push({id:uid("ev"),day:Math.max(1,Number(document.getElementById("npcEventDay").value)||state.map.day),type:document.getElementById("npcEventType").value,title:document.getElementById("npcEventTitle").value.trim()||"Evento",description:document.getElementById("npcEventDesc").value.trim(),action:document.getElementById("npcEventAction").value.trim(),trigger:{type:document.getElementById("npcEventLocType").value,hex:Number(document.getElementById("npcEventLocHex").value)||state.map.current,label:document.getElementById("npcEventLocLabel").value.trim()},outcomes:{completed:npcOutcomeData("Complete"),deferred:npcOutcomeData("Defer"),cancelled:npcOutcomeData("Cancel")},status:"pending",done:false});closeModal();save();render()}
function normalizeNPCEvent(e,n){e.id=e.id||uid("ev");e.day=Math.max(1,Number(e.day)||1);e.status=e.status|| (e.done?"completed":"pending");e.done=e.status==="completed";e.trigger=e.trigger||eventLocationForNPC(n);e.trigger.type=e.trigger.type||"hex";e.trigger.hex=Number(e.trigger.hex??n.position?.hex??state.map.current);e.trigger.label=e.trigger.label||"";e.outcomes=e.outcomes||{};["completed","deferred","cancelled"].forEach(k=>{e.outcomes[k]=e.outcomes[k]||{text:"",gold:0,supplies:0,fatigue:0,hp:0,legend:0};["gold","supplies","fatigue","hp","legend"].forEach(x=>e.outcomes[k][x]=Number(e.outcomes[k][x])||0)});return e}
function npcEventMatchesArrival(e,n,cell){normalizeNPCEvent(e,n);if(e.status!=="pending"||state.map.day<e.day)return false;const t=e.trigger||eventLocationForNPC(n);if(Number(t.hex)!==Number(state.map.current))return false;if(t.type==="hex")return true;if(t.type==="city")return !!cell?.locality && (!t.label || t.label===cell.locality || t.label===n.position.label);if(t.type==="dungeon")return !!(cell?.dungeon||cell?.dungeonName||n.position.type==="dungeon") && (!t.label || t.label===cell?.dungeonName || t.label===n.position.label);return false}
function checkNPCEventsOnArrival(){ensureCampaignMap();const cell=mapCell(state.map.current),matches=[];state.npcs.forEach(n=>{migrateNPC(n);n.events.forEach(e=>{if(npcEventMatchesArrival(e,n,cell))matches.push({n,e})})});if(matches.length)openNPCArrivalEventQueue(matches);save();return matches.length}
function npcOutcomePreview(o){if(!o)return "";const bits=[];if(o.text)bits.push(o.text);if(o.gold)bits.push(`${o.gold>0?"+":""}${o.gold} PO/personagem`);if(o.supplies)bits.push(`${o.supplies>0?"+":""}${o.supplies} provisões/personagem`);if(o.fatigue)bits.push(`${o.fatigue>0?"+":""}${o.fatigue} Fadiga/personagem`);if(o.hp)bits.push(`${o.hp>0?"+":""}${o.hp} PV/personagem`);if(o.legend)bits.push(`${o.legend>0?"+":""}${o.legend} Lenda/personagem`);return bits.join(" · ")||"Nenhuma consequência mecânica definida."}
function openNPCArrivalEventQueue(matches){if(!matches.length)return;const {n,e}=matches[0];normalizeNPCEvent(e,n);openModal(`<div class="event-card"><div class="event-kicker">⚡ EVENTO AUTOMÁTICO · CHEGADA</div><h2>${e.title}</h2><p><b>${n.name}</b> · ${n.role||'NPC'} · ${e.type}</p><p class="muted">Dia ${state.map.day} · ${eventTargetLabel(e)}</p><div class="event-card"><p>${e.description||'O evento deste NPC foi acionado pela chegada do grupo.'}</p>${e.action?`<p><b>Ação do Mestre:</b> ${e.action}</p>`:''}</div><div class="card"><h3>Consequências</h3><p><b>✓ Concluir:</b> ${npcOutcomePreview(e.outcomes.completed)}</p><p><b>⏭ Adiar:</b> ${npcOutcomePreview(e.outcomes.deferred)}</p><p><b>✕ Cancelar:</b> ${npcOutcomePreview(e.outcomes.cancelled)}</p></div><div class="row"><button class="btn primary" onclick="resolveNPCArrivalEvent('${n.id}','${e.id}','completed')">✓ Concluir</button><button class="btn" onclick="resolveNPCArrivalEvent('${n.id}','${e.id}','deferred')">⏭ Adiar 1 dia</button><button class="btn danger" onclick="resolveNPCArrivalEvent('${n.id}','${e.id}','cancelled')">✕ Cancelar</button></div></div>`)}
function applyNPCEventConsequence(e,status,n){const o=e.outcomes?.[status];if(!o)return;const chars=Array.isArray(state.characters)&&state.characters.length?state.characters:[state.character];chars.forEach(c=>{if('gold' in c || !('po' in c)) c.gold=Math.max(0,Number(c.gold??0)+(o.gold||0)); if('po' in c) c.po=Math.max(0,Number(c.po??0)+(o.gold||0));c.supplies=Math.max(0,Math.min(Number(c.maxSupplies||15),Number(c.supplies||0)+(o.supplies||0)));c.fatigue=Math.max(0,Number(c.fatigue||0)+(o.fatigue||0));c.hp=Math.max(0,Math.min(Number(c.maxHp||999),Number(c.hp??c.pv??0)+(o.hp||0)));c.legend=Number(c.legend||0)+(o.legend||0)});const parts=[];if(o.text)parts.push(o.text);if(o.gold)parts.push(`${o.gold>0?'+':''}${o.gold} PO/personagem`);if(o.supplies)parts.push(`${o.supplies>0?'+':''}${o.supplies} provisões/personagem`);if(o.fatigue)parts.push(`${o.fatigue>0?'+':''}${o.fatigue} Fadiga/personagem`);if(o.hp)parts.push(`${o.hp>0?'+':''}${o.hp} PV/personagem`);if(o.legend)parts.push(`${o.legend>0?'+':''}${o.legend} Lenda/personagem`);if(parts.length){state.log.push(`Consequência do evento ${n.name} — ${e.title}: ${parts.join(" · ")}`);toast(`Consequência aplicada: ${o.text||"efeitos registrados"}`)}}
function resolveNPCArrivalEvent(id,eid,status){const n=state.npcs.find(x=>x.id===id);if(!n)return;migrateNPC(n);const e=n.events.find(x=>x.id===eid);if(!e)return;normalizeNPCEvent(e,n);applyNPCEventConsequence(e,status,n);if(status==="deferred"){e.day=Math.max(state.map.day+1,e.day+1);e.status="pending";state.log.push(`Evento adiado: ${n.name} — ${e.title} para o Dia ${e.day}.`);toast(`Evento adiado para o Dia ${e.day}.`)}else{e.status=status;e.done=status==="completed";state.log.push(`${status==="completed"?'Evento concluído':'Evento cancelado'}: ${n.name} — ${e.title}.`);toast(status==="completed"?'Evento concluído.':'Evento cancelado.')}save();closeModal();render();setTimeout(()=>checkNPCEventsOnArrival(),40)}
function addNPCAgenda(id){const n=state.npcs.find(x=>x.id===id);if(!n)return;openModal(`<div class="event-card"><div class="event-kicker">AGENDA</div><h2>Adicionar compromisso de ${n.name}</h2><div class="grid grid-2"><div class="field"><label>Dia</label><input id="npcAgDay" type="number" min="1" value="${state.map.day}"></div><div class="field"><label>Horário</label><input id="npcAgTime" value="08:00" placeholder="08:00"></div></div><div class="field"><label>Atividade / objetivo</label><input id="npcAgTitle" placeholder="Encontrar os jogadores na taverna"></div><div class="field"><label>Local</label><input id="npcAgLoc" value="${npcPositionLabel(n)}"></div><div class="field"><label>Observações</label><textarea id="npcAgNote" rows="3"></textarea></div><div class="row"><button class="btn primary" onclick="saveNPCAgenda('${id}')">Adicionar à agenda</button><button class="btn" onclick="closeModal()">Cancelar</button></div></div>`);}
function saveNPCAgenda(id){const n=state.npcs.find(x=>x.id===id);if(!n)return;migrateNPC(n);n.agenda.push({id:uid("ag"),day:Math.max(1,Number(document.getElementById("npcAgDay").value)||state.map.day),time:document.getElementById("npcAgTime").value.trim(),title:document.getElementById("npcAgTitle").value.trim()||"Atividade",location:document.getElementById("npcAgLoc").value.trim(),note:document.getElementById("npcAgNote").value.trim(),done:false});closeModal();render()}
function toggleNPCEvent(id,eid){const n=state.npcs.find(x=>x.id===id);if(!n)return;migrateNPC(n);const e=n.events.find(x=>x.id===eid);if(!e)return;normalizeNPCEvent(e,n);e.status=e.status==='completed'?'pending':'completed';e.done=e.status==='completed';state.log.push(`${e.done?'Concluído':'Reaberto'}: ${n.name} — ${e.title}.`);save();render()}
function toggleNPCAgenda(id,aid){const n=state.npcs.find(x=>x.id===id);if(!n)return;migrateNPC(n);const e=n.agenda.find(x=>x.id===aid);if(!e)return;e.done=!e.done;save();render()}
function executeNPCEvent(id,eid){const n=state.npcs.find(x=>x.id===id);if(!n)return;migrateNPC(n);const e=n.events.find(x=>x.id===eid);if(!e)return;normalizeNPCEvent(e,n);e.status="completed";e.done=true;state.log.push(`Evento acionado/concluído: ${n.name} — ${e.title}${e.action?` (${e.action})`:""}.`);toast(`Evento acionado: ${e.title}`);save();render()}
function moveNPC(id,toHex,reason="Movimento do Mestre"){const n=state.npcs.find(x=>x.id===id);if(!n)return;migrateNPC(n);const from=n.position.hex;n.position.hex=Number(toHex);n.location=n.position.hex;n.position.type="hex";n.position.label="";n.movementHistory.push({day:state.map.day,from,to:Number(toHex),reason,time:new Date().toISOString()});state.map.history.push(`Dia ${state.map.day}: ${n.name} mudou de Hex ${from} para Hex ${toHex} — ${reason}.`);toast(`${n.name} movido para o hex ${toHex}.`);save();render()}
function moveNPCToSelected(id){if(state.map.selected==null)return;moveNPC(id,state.map.selected,"Reposicionamento pelo Mestre")}
function npcDetails(id){const n=state.npcs.find(x=>x.id===id);if(!n)return;migrateNPC(n);const agenda=n.agenda.slice().sort((a,b)=>a.day-b.day||String(a.time).localeCompare(String(b.time)));const events=n.events.slice().sort((a,b)=>a.day-b.day);const hist=n.movementHistory.slice().reverse();openModal(`<div class="event-card"><div class="event-kicker">CONTROLE DO MESTRE</div><h2>${n.name}</h2><p class="muted">${n.role||"NPC"} · ${n.faction||"Sem facção"} · ${npcPositionLabel(n)}</p><div class="row"><button class="btn" onclick="closeModal();editNPC('${n.id}')">✏️ Editar</button><button class="btn" onclick="closeModal();addNPCAgenda('${n.id}')">📅 Agenda</button><button class="btn" onclick="closeModal();addNPCEvent('${n.id}')">⚡ Evento</button><button class="btn" onclick="closeModal();placeNPC('${n.id}')">📍 Mapa</button></div><hr><h3>📅 Agenda</h3>${agenda.length?agenda.map(a=>`<div class="party-row"><div><b>Dia ${a.day} · ${a.time||"—"}</b><div class="muted">${a.title} · ${a.location||"Sem local"}</div><small>${a.note||""}</small></div><button class="btn ${a.done?'':'primary'}" onclick="toggleNPCAgenda('${n.id}','${a.id}')">${a.done?'Desfeito':'Concluir'}</button></div>`).join(''):'<p class="muted">Nenhum compromisso.</p>'}<h3>⚡ Eventos acionáveis</h3>${events.length?events.map(e=>`<div class="party-row"><div><b>Dia ${e.day} · ${e.title}</b><div class="muted">${e.type} · ${e.description||"Sem descrição"}</div><small>${e.action?`Ação: ${e.action}`:""}</small></div><div class="row"><button class="btn primary" onclick="executeNPCEvent('${n.id}','${e.id}')">▶ Acionar</button><button class="btn" onclick="toggleNPCEvent('${n.id}','${e.id}')">${e.done?'Reabrir':'Concluir'}</button></div></div>`).join(''):'<p class="muted">Nenhum evento cadastrado.</p>'}<h3>🗺 Histórico de movimentação</h3>${hist.length?`<div class="log">${hist.slice(0,20).map(h=>`<div>Dia ${h.day}: Hex ${h.from} → Hex ${h.to} · ${h.reason}</div>`).join('')}</div>`:'<p class="muted">Nenhuma movimentação registrada.</p>'}</div>`)}
function save(){localStorage.setItem("sombra_v1",JSON.stringify(state))}
function resetAllSavedData(){
  const ok=confirm("ATENÇÃO: isso apagará TODOS os dados salvos desta aplicação, incluindo campanhas, personagens, NPCs, mapa, combate, eventos, agendas, dicas e anotações. Esta ação não pode ser desfeita.\n\nClique em OK para apagar definitivamente.");
  if(!ok)return;
  try {
    // Remove explicitamente os dados da campanha e quaisquer chaves criadas por versões anteriores.
    const keys=[];
    for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i); if(k) keys.push(k); }
    keys.forEach(k=>localStorage.removeItem(k));
    for(let i=0;i<sessionStorage.length;i++){ const k=sessionStorage.key(i); if(k) sessionStorage.removeItem(k); }
  } catch(err) {
    console.error('Falha ao limpar armazenamento:',err);
  }
  // Limpa também o estado em memória para impedir que um save posterior restaure a campanha.
  state = {campaign:null,characters:[],character:{},activeCharacterId:null,npcs:[],locations:{cities:[],dungeons:[]},map:{current:0,selected:0,day:1,phase:'Cidade',history:[],cells:{},objective:'Criar uma campanha.'},tracks:0,combat:null,view:'campaigns',gm:{session:1,notes:'',phaseNote:'',quests:[]},log:[],lastResult:null,rollMode:'auto'};
  try { localStorage.removeItem('sombra_v1'); } catch(e) {}
  alert('Todos os dados salvos foram apagados. A aplicação será reiniciada.');
  window.location.replace(window.location.pathname + '?reset=' + Date.now());
}
function load(){try{const x=JSON.parse(localStorage.getItem("sombra_v1"));if(x){Object.assign(state,x);state.map=state.map||{};state.map.selected=state.map.selected??state.map.current;state.locations=state.locations||{cities:[],dungeons:[]};state.npcs=Array.isArray(state.npcs)?state.npcs:[];state.npcs.forEach(n=>migrateNPC(n));state.character.attrs=state.character.attrs||{};state.character.choices=state.character.choices||{};state.character.inventory=state.character.inventory||[];state.rollMode=state.rollMode||"auto";}}catch(e){}migrateParty();ensureCampaignMap()}
function escapeHtml(v){return String(v??"").replace(/[&<>"\']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","\'":"&#39;"}[m]));}
function toast(s,opts={}){
  const t=document.getElementById("toast"); if(!t)return;
  clearTimeout(window.__toastTimer);
  const text=String(s||"");
  const title=opts.title || (/[✓✔]|conclu|resolvid|aplicad|registrad|sucesso|derrotad|encerrad|criad|salv|movid|forçou|forcado|declarad/i.test(text)?"Ação concluída":"Informação do Mestre");
  const icon=opts.icon || (title.includes("conclu")?"✓":"ℹ");
  t.innerHTML=`<div class="toast-icon">${icon}</div><div class="toast-copy"><b>${escapeHtml(title)}</b><span>${escapeHtml(text)}</span></div><button class="toast-close" aria-label="Fechar" onclick="this.parentElement.classList.remove('show')">×</button>`;
  t.classList.add("show");
  window.__toastTimer=setTimeout(()=>t.classList.remove("show"),opts.duration||5200);
}
function setRollMode(mode){state.rollMode=mode==='manual'?'manual':'auto';save();toast(state.rollMode==='manual'?'Modo padrão: rolagem manual.':'Modo padrão: rolagem automática.');render()}
function rollModeLabel(){return state.rollMode==='manual'?'✋ Manual':'🤖 Automático'}
let pendingTest=null;
function requestTest(label,attrKey,dc,extraMod=0,onResolve=null){
  const attr=(state.character.attrs?.[attrKey]||0), fatigue=fatigueMod(), totalMod=attr+extraMod+fatigue;
  const needed=Math.max(2,dc-totalMod);
  pendingTest={label,attrKey,dc,extraMod,totalMod,onResolve};
  openModal(`<div class="event-card"><div class="event-kicker">TESTE · d20</div><h2>🎲 ${label}</h2><div class="test-preview"><div><b>Atributo</b><br>${ATTR_LABEL[attrKey]||attrKey}</div><div><b>Modificador</b><br>${totalMod>=0?'+':''}${totalMod}</div><div><b>Dificuldade</b><br>CD ${dc}</div><div><b>Precisa tirar</b><br>${needed === 2 && dc-totalMod<=1 ? '2+ (1 natural falha)' : needed+'+'}</div></div><p class="muted">Modificador: atributo ${attr>=0?'+':''}${attr}${fatigue?` · Fadiga ${fatigue>=0?'+':''}${fatigue}`:''}${extraMod?` · Bônus ${extraMod>=0?'+':''}${extraMod}`:''}</p><div class="row"><button class="btn primary" onclick="resolvePendingTest('auto')">🤖 Rolar automaticamente</button><button class="btn" onclick="resolvePendingTest('manual')">🎲 Eu rolo o dado</button></div><div id="manualRollArea"></div></div>`);
}
function resolvePendingTest(mode){
  if(!pendingTest)return;
  const t=pendingTest;
  if(mode==='manual'){
    const area=document.getElementById('manualRollArea');
    if(area)area.innerHTML=`<div class="field"><label>Resultado do d20</label><input id="manualTestResult" type="number" min="1" max="20" placeholder="1–20"><button class="btn primary" onclick="finishManualTest()">Confirmar resultado</button></div>`;
    return;
  }
  const raw=d(20, t.label);
  if(raw===null)return;
  finishPendingTest(raw);
}
function finishManualTest(){const el=document.getElementById('manualTestResult');const raw=Number(el?.value);if(!Number.isInteger(raw)||raw<1||raw>20)return toast('Informe um resultado de 1 a 20.');finishPendingTest(raw)}
function finishPendingTest(raw){
  const t=pendingTest; pendingTest=null; closeModal();
  const total=raw+t.totalMod, success=raw!==1&&(raw===20||total>=t.dc), crit=raw===20, fumble=raw===1;
  state.log.push(`Teste ${t.label}: d20 ${raw} ${t.totalMod>=0?'+':''}${t.totalMod} = ${total} vs CD ${t.dc} → ${success?'SUCESSO':'FALHA'}${crit?' · CRÍTICO':''}${fumble?' · FALHA CRÍTICA':''}.`);
  if(typeof t.onResolve==='function')t.onResolve({raw,total,success,crit,fumble,dc:t.dc,mod:t.totalMod});
  save();render();
}
function d(n,label='Rolagem'){
  if(state.rollMode==='manual'){
    let raw=window.prompt(`${label} — role fisicamente o d${n} e informe o resultado (1-${n}):`);
    if(raw===null){toast('Rolagem cancelada.');return null}
    let value=Number(raw);
    while(!Number.isInteger(value)||value<1||value>n){
      raw=window.prompt(`Resultado inválido. Digite um número de 1 a ${n}:`);
      if(raw===null){toast('Rolagem cancelada.');return null}
      value=Number(raw);
    }
    toast(`d${n} manual → ${value}`);
    return value;
  }
  return Math.floor(Math.random()*n)+1
}
function rollDice(n){const r=d(n,'Teste livre');if(r!==null)toast(`d${n} → ${r}`);return r}
function show(view){state.view=view;document.querySelectorAll(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.view===view));render()}
function render(){migrateParty();document.getElementById("campaignName").textContent=state.campaign?.name||"Nenhuma campanha";document.getElementById("pageTitle").textContent=({campaigns:"Campanhas",party:"Grupo",character:"Criação de Personagem",sheet:"Ficha",map:"Mapa",tracking:"Rastreamento",beast:"Gerador de Besta",combat:"Combate",npcs:"NPCs",tips:"Dicas do Mestre"})[state.view];document.getElementById("content").innerHTML=views[state.view]();const rm=document.getElementById("rollModeSelect");if(rm)rm.value=state.rollMode||"auto";wire();const result=state.lastResult;state.lastResult=null;save();if(result){setTimeout(()=>showActionResult(result),0)}}
function showActionResult(result){const c=state.character||{};const cell=mapCell(state.map?.current);const effects=(result.effects||[]).filter(Boolean);openModal(`<div class="event-card result-modal"><div class="event-kicker">RESULTADO DA AÇÃO</div><h2>${result.icon||"📜"} ${result.title||"O que aconteceu"}</h2><p>${result.text||"A ação foi resolvida."}</p>${effects.length?`<div class="result-effects"><h3>📌 Efeitos</h3>${effects.map(x=>`<div class="party-row"><span>${x}</span></div>`).join('')}</div>`:''}${result.narration?`<div class="card" style="margin-top:12px"><h3>🎬 Sugestão de narração</h3><p>${result.narration}</p></div>`:''}<div class="result-summary"><div><b>Dia</b><br>${state.map?.day||1}</div><div><b>Fase</b><br>${state.map?.phase||"—"}</div><div><b>Local</b><br>${cell?.locality||cell?.terrain||"—"}</div><div><b>Rastros</b><br>${state.tracks||0}/3</div></div><p class="muted">O acontecimento foi registrado no histórico da campanha.</p><button class="btn primary" onclick="closeModal()">Continuar aventura</button></div>`) }
function wire(){document.querySelectorAll(".nav-btn").forEach(b=>b.onclick=()=>show(b.dataset.view))}
function newCampaign(){openModal(`<h2>Nova campanha</h2><div class="field"><label>Nome</label><input id="campName" placeholder="A Caçada do Primordial"></div><div class="field"><label>Jogadores</label><select id="players">${[1,2,3,4,5,6].map(n=>`<option>${n}</option>`).join("")}</select></div><button class="btn primary" onclick="createCampaign()">Criar campanha</button>`)}
function createCampaign(){
  state.campaign={name:document.getElementById("campName").value.trim()||"Nova Caçada",players:+document.getElementById("players").value,created:new Date().toISOString()};
  state.tracks=0;state.beast=null;state.combat=null;state.log=[];
  state.map={current:40,selected:40,cells:{40:{terrain:"Planície",locality:"Cidade Humana",discovered:true,visited:true,season:"Primavera Caótica"}},day:1,phase:"Cidade",objective:"Criar a ficha e partir para a primeira caçada.",history:[]};
  state.character={id:uid("pc"),name:"",reason:"",race:"Humano",class:"Clérigo",legend:0,attrs:{str:0,dex:0,int:0,wis:2,cha:1,sur:0},hp:22,maxHp:22,pp:10,def:10,fatigue:0,gold:10,supplies:10,torches:10,inventory:[],spec:[],reputation:{},choices:{}};state.characters=[];state.activeCharacterId=null;state.npcs=[];
  toast("Campanha criada: a cidade inicial está no hexágono central.");closeModal();show("character")
}
function openModal(html){document.getElementById("modalBody").innerHTML=html;document.getElementById("modal").classList.remove("hidden")}
function closeModal(){document.getElementById("modal").classList.add("hidden")}


function uid(prefix="id"){return prefix+Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
function migrateParty(){
  state.characters=Array.isArray(state.characters)?state.characters:[];
  state.npcs=Array.isArray(state.npcs)?state.npcs:[];
  state.gm=state.gm||{notes:"",quests:[],phaseNote:"",session:1};
  state.gm.quests=Array.isArray(state.gm.quests)?state.gm.quests:[];
  state.gm.session=Number(state.gm.session||1);
  if(!state.character)state.character={id:uid("pc"),name:"",attrs:{str:0,dex:0,int:0,wis:0,cha:0,sur:0},inventory:[],choices:{},reputation:{}};
  if(!state.character.id)state.character.id=uid("pc");
  if(!state.characters.length && state.character.name)state.characters=[state.character];
  if(state.characterDraftId){
    // Durante a criação, a ficha em edição é independente do personagem ativo já salvo.
    // Não deixe a migração trocar o rascunho pelo personagem anterior.
    if(state.character?.id!==state.characterDraftId) state.character.id=state.characterDraftId;
    state.activeCharacterId=state.characterDraftId;
    return;
  }
  if(!state.activeCharacterId)state.activeCharacterId=state.characters[0]?.id||state.character.id;
  const a=state.characters.find(c=>c.id===state.activeCharacterId);if(a)state.character=a;
}
function upsertCharacter(c){migrateParty();const i=state.characters.findIndex(x=>x.id===c.id);if(i<0)state.characters.push(c);else state.characters[i]=c;state.character=c;state.activeCharacterId=c.id;delete state.characterDraftId;save()}
function selectCharacter(id){const c=(state.characters||[]).find(x=>x.id===id);if(!c)return;state.activeCharacterId=id;state.character=c;render()}
function newCharacter(){
  migrateParty();
  if(state.characters.length>=6)return toast("O grupo já tem 6 personagens — limite do jogo.");
  // Preserva explicitamente o personagem atual antes de abrir uma nova ficha.
  // A criação de uma ficha nova nunca deve substituir um personagem já salvo.
  if(state.character?.name){
    const existing=state.characters.findIndex(c=>c.id===state.character.id);
    if(existing<0)state.characters.push(state.character);
    else state.characters[existing]=state.character;
  }
  state.character={id:uid("pc"),name:"",reason:"",race:"Humano",class:"Clérigo",legend:0,attrs:{str:0,dex:0,int:0,wis:2,cha:1,sur:0},hp:22,maxHp:22,pp:10,def:10,fatigue:0,gold:10,supplies:10,torches:10,inventory:[],spec:[],reputation:{},choices:{}};
  state.characterDraftId=state.character.id;
  // O novo personagem é uma ficha em edição; o personagem anterior continua salvo no grupo.
  state.activeCharacterId=state.character.id;
  save();
  show("character")
}
function deleteCharacter(id){if(state.characters.length<=1)return toast("A campanha precisa ter pelo menos um personagem.");state.characters=state.characters.filter(c=>c.id!==id);if(state.activeCharacterId===id){state.activeCharacterId=state.characters[0].id;state.character=state.characters[0]}render()}
function partyActions(id){
  const c=state.characters.find(x=>x.id===id); if(!c)return;
  state.activeCharacterId=id;state.character=c;
  openModal(`<div class="event-card"><div class="event-kicker">CONTROLE DO MESTRE</div><h2>${c.name||'Personagem'}</h2><div class="grid grid-2">
    <div><label class="label">PV atual</label><input id="gmHp" type="number" value="${c.hp||0}"></div>
    <div><label class="label">Fadiga</label><input id="gmFat" type="number" value="${c.fatigue||0}"></div>
    <div><label class="label">PO</label><input id="gmGold" type="number" value="${c.gold||0}"></div>
    <div><label class="label">Provisões</label><input id="gmSup" type="number" value="${c.supplies||0}"></div>
    <div><label class="label">Tochas</label><input id="gmTor" type="number" value="${c.torches||0}"></div>
    <div><label class="label">Lenda</label><input id="gmLegend" type="number" value="${c.legend||0}"></div>
  </div><div class="row" style="margin-top:12px"><button class="btn primary" onclick="saveGMCharacter('${c.id}')">Salvar</button><button class="btn" onclick="closeModal()">Cancelar</button></div></div>`)
}
function saveGMCharacter(id){const c=state.characters.find(x=>x.id===id);if(!c)return; c.hp=Math.max(0,Number(document.getElementById('gmHp').value)||0);c.fatigue=Math.max(0,Number(document.getElementById('gmFat').value)||0);c.gold=Math.max(0,Number(document.getElementById('gmGold').value)||0);c.supplies=Math.max(0,Number(document.getElementById('gmSup').value)||0);c.torches=Math.max(0,Number(document.getElementById('gmTor').value)||0);c.legend=Math.max(0,Number(document.getElementById('gmLegend').value)||0);state.character=c;closeModal();render()}
function healParty(){state.characters.forEach(c=>{c.hp=c.maxHp||c.hp;c.fatigue=0});toast('Grupo restaurado: PV máximos e Fadiga 0.');render()}
function resetPartyFatigue(){state.characters.forEach(c=>c.fatigue=0);toast('Fadiga de todos os personagens zerada.');render()}
function partyView(){migrateParty();return `<div class="hero"><div class="between"><div><h2>Central do Mestre</h2><p>O grupo inteiro fica disponível ao mesmo tempo. O limite de 6 jogadores segue a estrutura do livro, e cada ficha mantém seus próprios recursos e progressão.</p></div><span class="tag">${state.characters.length}/6 jogadores</span></div><div class="row"><button class="btn primary" onclick="newCharacter()">＋ Criar personagem</button><button class="btn" onclick="healParty()">❤ Recuperar grupo</button><button class="btn" onclick="resetPartyFatigue()">⚡ Zerar Fadiga</button><button class="btn" onclick="show('campaigns')">▣ Painel da campanha</button></div></div>
<div class="grid grid-3"><div class="card"><span class="label">Jogadores</span><div class="stat">${state.characters.length}/6</div><div class="muted">Todos entram no combate.</div></div><div class="card"><span class="label">Rastros</span><div class="stat">${state.tracks}/3</div><div class="muted">3 Rastros localizam a Besta.</div></div><div class="card"><span class="label">Lenda do grupo</span><div class="stat">${Math.max(0,...state.characters.map(c=>c.legend||0))}</div><div class="muted">O mais lendário define o Rank liberado.</div></div></div><br><div class="card"><h3>Todos os personagens</h3>${state.characters.map((c,i)=>`<div class="party-row ${c.id===state.activeCharacterId?'active':''}"><div><b>${i+1}. ${c.name||'Sem nome'}</b><div class="muted">${c.race} · ${c.class} · Lenda ${c.legend||0}</div></div><div class="party-stats"><span>❤ ${c.hp}/${c.maxHp}</span><span>🛡 ${c.pp||0} PP</span><span>⚡ ${c.fatigue||0}/8</span><span>💰 ${c.gold||0} PO</span><span>🍞 ${c.supplies||0}</span></div><div class="row"><button class="btn ${c.id===state.activeCharacterId?'primary':''}" onclick="selectCharacter('${c.id}')">Assumir controle</button><button class="btn" onclick="partyActions('${c.id}')">Ajustar</button><button class="btn danger" onclick="deleteCharacter('${c.id}')">Excluir</button></div></div>`).join('')||'<p class="muted">Nenhum personagem criado.</p>'}</div>`}
function npcView(){migrateParty();state.npcs.forEach(migrateNPC);const today=state.map.day;const due=state.npcs.flatMap(n=>n.events.map(e=>({n,e}))).filter(x=>x.e.day<=today&&!x.e.done);const agenda=state.npcs.flatMap(n=>n.agenda.map(e=>({n,e}))).filter(x=>x.e.day===today&&!x.e.done);return `<div class="hero"><div class="between"><div><h2>Banco de NPCs & Mundo</h2><p>Vincule cada NPC a um hexágono, cidade ou masmorra. Controle agenda, eventos acionáveis e todo o histórico de movimentação.</p></div><span class="tag">${state.npcs.length} NPCs · Dia ${today}</span></div><div class="row"><button class="btn primary" onclick="addNPC()">＋ Criar NPC</button><button class="btn" onclick="show('map')">📍 Ver posições</button><button class="btn" onclick="openNPCScheduleBoard()">📅 Agenda do dia</button></div></div><div class="grid grid-3"><div class="card"><span class="label">NPCs</span><div class="stat">${state.npcs.length}</div></div><div class="card"><span class="label">Eventos pendentes</span><div class="stat">${due.length}</div></div><div class="card"><span class="label">Compromissos hoje</span><div class="stat">${agenda.length}</div></div></div><br><div class="card"><h3>NPCs</h3>${state.npcs.map(n=>{migrateNPC(n);return `<div class="party-row"><div><b>${n.name||'NPC'}</b><div class="muted">${n.role||'NPC'} · ${n.faction||'Sem facção'} · ${n.status||'Ativo'}</div><small>${npcPositionLabel(n)} · ${n.agenda.length} agenda · ${n.events.filter(e=>!e.done).length} eventos pendentes</small></div><div class="party-stats"><span>❤ ${n.hp}/${n.maxHp}</span><span>🛡 Def ${n.def}</span><span>PP ${n.pp||0}</span><span>💰 ${n.gold||0}</span></div><div class="row"><button class="btn primary" onclick="npcDetails('${n.id}')">🎭 Controle</button><button class="btn" onclick="editNPC('${n.id}')">Editar</button><button class="btn" onclick="placeNPC('${n.id}')">📍 Mapa</button><button class="btn" onclick="npcToCombat('${n.id}')">⚔ Combate</button><button class="btn danger" onclick="deleteNPC('${n.id}')">Excluir</button></div></div>`}).join('')||'<p class="muted">Nenhum NPC cadastrado.</p>'}</div>`}
function addNPC(existing){const n=existing||{id:uid('npc'),name:'',role:'',faction:'',status:'Ativo',race:'',class:'',hp:10,maxHp:10,pp:0,def:10,gold:0,location:state.map?.current??HEX_CENTER,position:{type:'hex',hex:state.map?.current??HEX_CENTER,label:''},agenda:[],events:[],movementHistory:[],attrs:{str:0,dex:0,int:0,wis:0,cha:0,sur:0},notes:'',behavior:'',inventory:'',dialogue:{intro:'',clues:[],branches:{}}};migrateNPC(n);const b=n.dialogue.branches;openModal(`<div class="event-card"><div class="event-kicker">${existing?'EDITAR NPC':'NOVO NPC'}</div><h2>${existing?'Editar':'Criar'} NPC</h2><div class="grid grid-2"><div class="field"><label>Nome</label><input id="npcName" value="${n.name||''}"></div><div class="field"><label>Função / papel</label><input id="npcRole" value="${n.role||''}" placeholder="Comerciante, guarda, chefe..."></div><div class="field"><label>Facção / grupo</label><input id="npcFaction" value="${n.faction||''}"></div><div class="field"><label>Status</label><select id="npcStatus">${['Ativo','Ferido','Morto','Desaparecido','Hostil'].map(x=>`<option ${n.status===x?'selected':''}>${x}</option>`).join('')}</select></div><div class="field"><label>Raça</label><input id="npcRace" value="${n.race||''}"></div><div class="field"><label>Classe / arquétipo</label><input id="npcClass" value="${n.class||''}"></div><div class="field"><label>Tipo de localização</label><select id="npcLocType"><option value="hex" ${n.position.type==='hex'?'selected':''}>Hexágono</option><option value="city" ${n.position.type==='city'?'selected':''}>Cidade</option><option value="dungeon" ${n.position.type==='dungeon'?'selected':''}>Masmorra</option></select></div><div class="field"><label>Hex específico</label><input id="npcLoc" type="number" min="0" value="${n.position.hex}"></div><div class="field"><label>Nome do local (cidade/masmorra)</label><input id="npcLocLabel" value="${n.position.label||''}" placeholder="Ex.: Cidade de Ferro / Cripta"></div><div class="field"><label>PO</label><input id="npcGold" type="number" value="${n.gold||0}"></div><div class="field"><label>PV máximos</label><input id="npcMaxHp" type="number" value="${n.maxHp||10}"></div><div class="field"><label>PV atuais</label><input id="npcHp" type="number" value="${n.hp??10}"></div><div class="field"><label>PP</label><input id="npcPP" type="number" value="${n.pp||0}"></div><div class="field"><label>Defesa</label><input id="npcDef" type="number" value="${n.def||10}"></div></div><div class="field"><label>Comportamento / objetivo</label><input id="npcBehavior" value="${n.behavior||''}"></div><div class="field"><label>Equipamentos / itens</label><input id="npcInventory" value="${n.inventory||''}"></div><div class="field"><label>Notas do Mestre</label><textarea id="npcNotes" rows="4">${n.notes||''}</textarea></div><hr><h3>💬 Roteiro do encontro</h3><p class="muted">Defina falas e pistas próprias deste NPC. Os campos abaixo entram automaticamente na cena quando a ação social correspondente for escolhida.</p><div class="field"><label>Fala de abertura</label><textarea id="npcDialogueIntro" rows="3">${n.dialogue.intro||''}</textarea></div><div class="field"><label>Pistas (uma por linha)</label><textarea id="npcDialogueClues" rows="5">${(n.dialogue.clues||[]).join('\n')}</textarea></div><div class="grid grid-2">${[['negotiate','🤝 Negociar'],['intimidate','😠 Intimidar'],['bluff','🎭 Mentir / Blefar'],['insight','🔍 Intuição'],['seduce','💫 Seduzir']].map(([k,label])=>{const x=b[k]||{};return `<div class="card"><h4>${label}</h4><div class="field"><label>Fala / provocação</label><textarea id="npcBranch_${k}_prompt" rows="2">${x.prompt||''}</textarea></div><div class="field"><label>Resposta no sucesso</label><textarea id="npcBranch_${k}_success" rows="2">${x.success||''}</textarea></div><div class="field"><label>Resposta na falha</label><textarea id="npcBranch_${k}_fail" rows="2">${x.fail||''}</textarea></div><div class="field"><label>Próxima pista / gancho</label><textarea id="npcBranch_${k}_next" rows="2">${x.next||''}</textarea></div><div class="field"><label>Opções de resposta do jogador (uma por linha)</label><textarea id="npcBranch_${k}_options" rows="3">${(x.options||[]).join('\n')}</textarea></div></div>`}).join('')}</div><div class="row"><button class="btn primary" onclick="saveNPC('${n.id}')">Salvar NPC</button><button class="btn" onclick="closeModal()">Cancelar</button></div></div>`);}
function saveNPC(id){let n=state.npcs.find(x=>x.id===id);if(!n){n={id};state.npcs.push(n)}migrateNPC(n);const oldHex=n.position.hex;n.name=document.getElementById('npcName').value.trim()||'NPC';n.role=document.getElementById('npcRole').value.trim();n.faction=document.getElementById('npcFaction').value.trim();n.status=document.getElementById('npcStatus').value;n.race=document.getElementById('npcRace').value.trim();n.class=document.getElementById('npcClass').value.trim();n.position={type:document.getElementById('npcLocType').value,hex:Number(document.getElementById('npcLoc').value)||state.map.current,label:document.getElementById('npcLocLabel').value.trim()};n.location=n.position.hex;n.gold=Math.max(0,Number(document.getElementById('npcGold').value)||0);n.maxHp=Math.max(1,Number(document.getElementById('npcMaxHp').value)||10);n.hp=Math.max(0,Math.min(n.maxHp,Number(document.getElementById('npcHp').value)||0));n.pp=Math.max(0,Number(document.getElementById('npcPP').value)||0);n.def=Number(document.getElementById('npcDef').value)||10;n.behavior=document.getElementById('npcBehavior').value.trim();n.inventory=document.getElementById('npcInventory').value.trim();n.notes=document.getElementById('npcNotes').value.trim();migrateNPC(n);n.dialogue.intro=document.getElementById('npcDialogueIntro').value.trim();n.dialogue.clues=document.getElementById('npcDialogueClues').value.split(/\n+/).map(x=>x.trim()).filter(Boolean);['negotiate','intimidate','bluff','insight','seduce'].forEach(k=>{n.dialogue.branches[k]={prompt:document.getElementById(`npcBranch_${k}_prompt`).value.trim(),success:document.getElementById(`npcBranch_${k}_success`).value.trim(),fail:document.getElementById(`npcBranch_${k}_fail`).value.trim(),next:document.getElementById(`npcBranch_${k}_next`).value.trim(),options:document.getElementById(`npcBranch_${k}_options`).value.split(/\n+/).map(x=>x.trim()).filter(Boolean)};});if(oldHex!==n.position.hex)n.movementHistory.push({day:state.map.day,from:oldHex,to:n.position.hex,reason:'Edição da ficha',time:new Date().toISOString()});closeModal();render()}
function editNPC(id){const n=state.npcs.find(x=>x.id===id);if(n)addNPC(n)}
function deleteNPC(id){state.npcs=state.npcs.filter(n=>n.id!==id);render()}
function placeNPC(id){const n=state.npcs.find(x=>x.id===id);if(!n)return;migrateNPC(n);state.map.selected=Number(n.position.hex);show('map')}
function openNPCScheduleBoard(){const items=state.npcs.flatMap(n=>{migrateNPC(n);return n.agenda.map(a=>({n,a}))}).filter(x=>x.a.day===state.map.day).sort((a,b)=>String(a.a.time).localeCompare(String(b.a.time)));openModal(`<div class="event-card"><div class="event-kicker">AGENDA DO DIA ${state.map.day}</div><h2>Movimentos e compromissos</h2>${items.length?items.map(x=>`<div class="party-row"><div><b>${x.a.time||'—'} · ${x.n.name}</b><div class="muted">${x.a.title} · ${x.a.location||npcPositionLabel(x.n)}</div></div><button class="btn primary" onclick="toggleNPCAgenda('${x.n.id}','${x.a.id}')">${x.a.done?'Reabrir':'Concluir'}</button></div>`).join(''):'<p class="muted">Nenhum compromisso para hoje.</p>'}<button class="btn" onclick="closeModal()">Fechar</button></div>`)}
function npcToCombat(id){const n=state.npcs.find(x=>x.id===id);if(!n)return;migrateNPC(n);state.log.push(`NPC ${n.name} preparado para conflito.`);openModal(`<div class="event-card"><div class="event-kicker">⚔️ CONFLITO COM NPC</div><h2>${n.name}</h2><p>${n.role||'NPC'} · PV ${n.hp}/${n.maxHp} · Defesa ${n.def} · PP ${n.pp||0}</p><p class="muted">O NPC pode entrar em combate usando uma ficha operacional mínima do sistema. Os valores de dano e iniciativa são extensões para NPCs genéricos, não valores impressos no livro.</p><div class="row"><button class="btn primary" onclick="closeModal();startNPCCombat('${n.id}')">⚔️ Iniciar conflito agora</button><button class="btn" onclick="closeModal();show('combat')">Abrir painel de combate</button></div></div>`)}
function startNPCCombat(id,returnPoiIndex=null){const n=state.npcs.find(x=>x.id===id);if(!n)return;if(!(state.characters||[]).length)return toast('Crie pelo menos um personagem antes do combate.');migrateNPC(n);const hp=Math.max(1,Number(n.hp||n.maxHp||10));const maxHp=Math.max(hp,Number(n.maxHp||hp));const returnContext=returnPoiIndex==null?null:{type:'npc-dialogue',npcId:n.id,poiIndex:returnPoiIndex,cell:Number(state.map.selected),day:Number(state.map.day)};state.combat={beast:{species:n.name,maxHp,hp,rank:1,element:'Neutro',bc:0,dodge:Number(n.def||10),dmg:2,players:state.characters.length,conditions:{},attacks:Array.from({length:6},()=>({name:'Ataque do NPC',type:'direct',effect:'Ataque físico do NPC.',discovered:true})),attackMarker:3,parts:[{name:'Corpo',def:Number(n.def||10),height:1,armor:0,maxArmor:0,broken:false,sensitive:false,sensitivity:''}]},round:1,reaction:true,order:[],current:0,logStart:state.log.length,playerStates:{},playerOrder:[],animals:[],animalOrder:[],animalIndex:0,npcEncounter:true,npcId:n.id,returnContext};if(initCombat()===false){state.combat=null;return;}state.log.push(`⚔️ Conflito iniciado com NPC ${n.name}.`);show('combat');save();}

function baseAttrs(cls,race,free,humanBonus){
  const out=Object.fromEntries(ATTRS.map(a=>[a,0]));
  Object.entries(classes[cls].attrs).forEach(([a,v])=>out[a]+=v);
  Object.entries(races[race].attrs||{}).forEach(([a,v])=>out[a]+=v);
  (free||[]).forEach(a=>out[a]++);
  if(race==="Humano"&&humanBonus) out[humanBonus]++;
  return out;
}
function selectedFree(){return ATTRS.flatMap(a=>Array.from({length:+document.getElementById(`free-${a}`)?.value||0},()=>a))}
function previewCharacter(){
  const race=document.getElementById("race")?.value||state.character.race;
  const cls=document.getElementById("class")?.value||state.character.class;
  const free=selectedFree(), humanBonus=document.getElementById("humanBonus")?.value;
  const attrs=baseAttrs(cls,race,free,humanBonus);
  return {race,cls,free,humanBonus,attrs};
}
function calcDerived(race,cls,attrs,inventory){
  const r=races[race], c=classes[cls];
  const affinity=r.affinity===false?false:r.classes==="Qualquer"?false:r.classes.split(", ").includes(cls);
  const hp=c.hp+r.hp+(affinity?2:0);
  const shield=(inventory||[]).some(x=>x.startsWith("Escudo"));
  const armorPP=(inventory||[]).reduce((sum,x)=>sum+(x.includes("Placas")?14:x.includes("Cota de Malha")?10:x.includes("Couro Reforçado")?9:x.includes("Gibão de Couro")?8:x.includes("Manto de Pele")?4:0),0);
  return {hp,affinity,pp:armorPP,def:10+(attrs.dex||0)+(shield?1:0),slots:8+(attrs.str||0),initiative:`d20 + ${attrs.dex||0}`,melee:`Força ÷ 2 = ${Math.floor((attrs.str||0)/2)}`,ranged:`Destreza ÷ 2 = ${Math.floor((attrs.dex||0)/2)}`,magic:`Sabedoria ÷ 2 = ${Math.floor((attrs.wis||0)/2)}`};
}
function validateCharacter(){
  const name=document.getElementById("charName")?.value.trim();
  const reason=document.getElementById("reason")?.value.trim();
  const p=previewCharacter(), errors=[];
  if(!state.campaign) errors.push("Crie ou selecione uma campanha antes do personagem.");
  if(!name) errors.push("Informe o nome do personagem.");
  if(!reason) errors.push("Informe o motivo para caçar.");
  if(p.free.length!==3) errors.push(`Você precisa distribuir exatamente 3 pontos livres (atual: ${p.free.length}).`);
  Object.entries(p.attrs).forEach(([a,v])=>{if(v>4) errors.push(`${ATTR_LABEL[a]} começa em ${v}; nenhum atributo pode começar acima de 4.`);if(v<0) errors.push(`${ATTR_LABEL[a]} não pode ficar negativo.`)});
  if(races[p.race].classes!=="Qualquer"&&!races[p.race].classes.split(", ").includes(p.cls)) toast("Classe fora da afinidade: o personagem ainda é válido, mas não recebe +2 PV.");
  if(p.race==="Humano"&&!p.humanBonus) errors.push("Humano precisa escolher o atributo do bônus Adaptável.");
  if(p.race==="Draconato"&&!document.getElementById("dragonElement")?.value) errors.push("Draconato precisa escolher o elemento do Sopro Elemental.");
  if(p.race==="Semideus"&&!document.getElementById("divineElement")?.value) errors.push("Semideus precisa escolher o elemento do Dom Divino.");
  if(p.race==="Amaldiçoado"&&!document.getElementById("pactLord")?.value) errors.push("Amaldiçoado precisa escolher o Lord do Pacto.");
  return {errors,p};
}
function setCharacter(){
  const v=validateCharacter(); if(v.errors.length){openModal(`<h2>Ficha incompleta</h2><ul>${v.errors.map(e=>`<li>${e}</li>`).join("")}</ul><button class="btn" onclick="closeModal()">Corrigir</button>`);return}
  const {race,cls,free,humanBonus,attrs}=v.p;
  const r=races[race], c=classes[cls];
  const inv=[...c.equipment,...r.equipment];
  const derived=calcDerived(race,cls,attrs,inv);
  const id=state.character.id||uid("pc");
  state.character={...state.character,id,name:document.getElementById("charName").value.trim(),reason:document.getElementById("reason").value.trim(),race,class:cls,attrs,hp:derived.hp,maxHp:derived.hp,pp:derived.pp,def:derived.def,gold:c.gold,supplies:10,torches:10,inventory:inv,spec:c.spec,fatigue:0,legend:state.character.legend||0,choices:{humanBonus,dragonElement:document.getElementById("dragonElement")?.value||"",divineElement:document.getElementById("divineElement")?.value||"",pactLord:document.getElementById("pactLord")?.value||"",dwarfArmor:document.getElementById("dwarfArmor")?.value||""}};
  upsertCharacter(state.character); state.characterDraftId=null; toast("Personagem criado e adicionado ao grupo");show("party")
}
function charSelectOptions(){
  const race=state.character.race;
  return `<div class="field"><label>Raça</label><select id="race" onchange="renderCharacterPreview()">${Object.keys(races).map(x=>`<option ${x===race?"selected":""}>${x}</option>`).join("")}</select></div>`;
}
function freePointControls(attrs){
  return `<div class="grid grid-3">${ATTRS.map(a=>`<div class="field"><label>${ATTR_LABEL[a]}</label><input id="free-${a}" type="number" min="0" max="3" value="0" oninput="renderCharacterPreview()"></div>`).join("")}</div>`;
}
function specialChoiceFields(race){
  let h="";
  if(race==="Humano") h+=`<div class="field"><label>Bônus Adaptável (+1)</label><select id="humanBonus"><option value="">Escolha...</option>${ATTRS.map(a=>`<option>${a}</option>`).join("")}</select></div>`;
  if(race==="Draconato") h+=`<div class="field"><label>Elemento do Sopro Elemental</label><select id="dragonElement">${["Fogo","Gelo","Eletricidade","Ácido"].map(x=>`<option>${x}</option>`).join("")}</select></div>`;
  if(race==="Semideus") h+=`<div class="field"><label>Elemento do Dom Divino</label><select id="divineElement">${["Fogo","Gelo","Eletricidade","Ácido","Sagrado","Sombrio"].map(x=>`<option>${x}</option>`).join("")}</select></div>`;
  if(race==="Amaldiçoado") h+=`<div class="field"><label>Lord do Pacto</label><select id="pactLord"><option value="">Escolha...</option><option>Malachar — Ácido</option><option>Pyraxus — Fogo</option><option>Velthara — Gelo</option></select></div>`;
  if(race==="Anão") h+=`<div class="field"><label>Toque de Ferreiro: armadura que recebe +2 PP</label><select id="dwarfArmor"><option>Gibão de Couro</option><option>Couro Reforçado</option><option>Cota de Malha</option><option>Placas</option><option>Manto de Pele</option></select></div>`;
  return h;
}
function characterForm(){
  const r=races[state.character.race], c=classes[state.character.class];
  return `<div class="hero"><h2>Criação completa</h2><p>20 raças, 12 classes, seis atributos, afinidade, escolhas raciais, equipamento inicial e validações da ficha.</p></div>
  <div class="grid grid-2">
    <div class="card"><h3>1. Identidade</h3>
      <div class="field"><label>Nome</label><input id="charName" value="${state.character.name||""}" placeholder="Nome do caçador"></div>
      <div class="field"><label>Motivo para caçar</label><textarea id="reason" rows="3" placeholder="Vingança, glória, proteger alguém...">${state.character.reason||""}</textarea></div>
      ${charSelectOptions()}
      <div class="field"><label>Classe</label><select id="class" onchange="renderCharacterPreview()">${Object.keys(classes).map(x=>`<option ${x===state.character.class?"selected":""}>${x}</option>`).join("")}</select></div>
      <div id="specialChoices">${specialChoiceFields(state.character.race)}</div>
    </div>
    <div class="card"><h3>2. Atributos</h3><p class="muted">Todos começam em 0. Some Classe + Raça e distribua exatamente 3 pontos livres. Nenhum atributo pode começar acima de 4.</p>${freePointControls(state.character.attrs)}<div id="attrPreview"></div></div>
  </div>
  <br>
  <div class="grid grid-2"><div class="card"><h3>3. Raça selecionada</h3><p><b>${state.character.race}</b> · PV ${r.hp>=0?"+":""}${r.hp}</p><p>${r.adv}</p><p class="muted">${r.pen}</p><p><b>Classes afins:</b> ${r.classes}</p><p><b>Equipamento racial:</b> ${r.equipment.length?r.equipment.join(" · "):"Nenhum informado no livro."}</p></div>
  <div class="card"><h3>4. Classe selecionada</h3><p><b>${state.character.class}</b> · ${c.hp} PV · ${c.gold} PO</p><p><b>Atributos:</b> ${Object.entries(c.attrs).map(([a,v])=>`${ATTR_LABEL[a]} +${v}`).join(", ")}</p><p><b>Especialidades:</b> ${c.spec.join(", ")}</p><p><b>Equipamento:</b> ${c.equipment.join(" · ")}</p></div></div>
  <br><div id="creationDerived"></div>
  <button class="btn primary" onclick="setCharacter()">✓ Validar e criar personagem</button>`;
}
function renderCharacterPreview(){
  const race=document.getElementById("race").value, cls=document.getElementById("class").value;
  state.character.race=race;state.character.class=cls;
  document.getElementById("specialChoices").innerHTML=specialChoiceFields(race);
  const p=previewCharacter(), inv=[...classes[cls].equipment,...races[race].equipment], derv=calcDerived(race,cls,p.attrs,inv);
  document.getElementById("attrPreview").innerHTML=`<div class="grid grid-3">${ATTRS.map(a=>`<div class="card"><span class="label">${ATTR_LABEL[a]}</span><div class="stat">${p.attrs[a]}</div></div>`).join("")}</div>`;
  document.getElementById("creationDerived").innerHTML=`<div class="card"><h3>5. Prévia da ficha</h3><div class="grid grid-3">
  <div><span class="label">PV</span><div class="stat">${derv.hp}${derv.affinity?" (+2 afinidade)":""}</div></div>
  <div><span class="label">PP</span><div class="stat">${derv.pp}</div></div>
  <div><span class="label">Defesa</span><div class="stat">${derv.def}</div></div>
  <div><span class="label">Mochila</span><div class="stat">${derv.slots} slots</div></div>
  <div><span class="label">Iniciativa</span><div class="stat">${derv.initiative}</div></div>
  <div><span class="label">Bônus corpo/distância/magia</span><div>${derv.melee} · ${derv.ranged} · ${derv.magic}</div></div>
  </div></div>`;
}
function characterActionLabel(action){return ({investigate:"Investigar a localidade",track:"Rastrear",rest:"Descansar / Acampar",supplies:"Comprar provisões",hunt:"Preparar a caçada",travel:"Viajar para o hexágono selecionado"}[action]||action)}
function chooseCharacterForAction(action){
  migrateParty();
  const chars=(state.characters||[]).filter(c=>c&&c.name);
  if(!chars.length)return toast("Crie pelo menos um personagem antes de realizar esta ação.");
  if(chars.length===1){state.activeCharacterId=chars[0].id;state.character=chars[0];save();return chooseCharacterAction(chars[0].id,action)}
  const cards=chars.map((c,i)=>`<button class="actor-card ${c.id===state.activeCharacterId?'selected':''}" onclick="chooseCharacterAction('${c.id}','${action}')"><div class="actor-number">${i+1}</div><div class="actor-main"><b>${c.name}</b><span>${c.race} · ${c.class}</span><div class="actor-bars"><span>❤ ${c.hp}/${c.maxHp}</span><span>⚡ ${c.fatigue||0}/8</span><span>🪙 ${c.gold||0} PO</span></div></div></button>`).join('');
  openModal(`<div class="event-card"><div class="event-kicker">ESCOLHA DO MESTRE</div><h2>Quem está fazendo: ${characterActionLabel(action)}?</h2><p class="muted">Selecione o personagem responsável por esta ação.</p><div class="actor-picker">${cards}</div><button class="btn" onclick="closeModal()">Cancelar</button></div>`);
}
function chooseMapActor(action){chooseCharacterForAction(action)}
function chooseCharacterAction(id,action){
  const c=state.characters.find(x=>x.id===id);if(!c)return;
  state.activeCharacterId=id;state.character=c;save();closeModal();
  const actions={investigate:()=>gatherClues(),track:()=>trackRoll(),rest:()=>campRest(),supplies:()=>buySupplies(),hunt:()=>launchHunt(),travel:()=>enterSelectedHex()};
  const fn=actions[action];if(fn)fn();
}

function sheet(){
  migrateParty(); const chars=state.characters||[];
  if(!chars.length)return `<div class="hero"><h2>Fichas do grupo</h2><p class="muted">Nenhum personagem criado ainda.</p><button class="btn primary" onclick="show('character')">Criar personagem</button></div>`;
  return `<div class="hero"><div class="between"><div><h2>Fichas do grupo</h2><p>Todos os personagens ficam visíveis em cartões independentes. Selecione um cartão quando quiser controlar aquele personagem.</p></div><span class="tag">${chars.length}/6 personagens</span></div></div><div class="sheet-columns">${chars.map((c,i)=>{const r=races[c.race]||races.Humano,attrs=c.attrs||{};return `<article class="sheet-card ${c.id===state.activeCharacterId?'selected':''}"><div class="sheet-card-head"><div><span class="sheet-index">${i+1}</span><div class="sheet-name">${c.name||'Sem nome'}</div><div class="muted">${c.race} · ${c.class}</div></div><button class="btn ${c.id===state.activeCharacterId?'primary':''}" onclick="selectCharacter('${c.id}')">${c.id===state.activeCharacterId?'✓ Selecionado':'Selecionar'}</button></div><div class="sheet-hp"><span>❤ PV</span><b>${c.hp}/${c.maxHp}</b><div class="progress"><i style="width:${Math.max(0,Math.min(100,(c.hp/(c.maxHp||1))*100))}%"></i></div></div><div class="sheet-mini-grid"><div><span class="label">Defesa</span><b>${c.def||0}</b></div><div><span class="label">PP</span><b>${c.pp||0}</b></div><div><span class="label">Fadiga</span><b>${c.fatigue||0}/8</b></div><div><span class="label">Lenda</span><b>${c.legend||0}</b></div></div><h4>Atributos</h4><div class="sheet-attrs">${ATTRS.map(k=>`<span>${ATTR_LABEL[k]} <b>${attrs[k]||0}</b></span>`).join('')}</div><h4>Recursos</h4><div class="sheet-resources"><span>🪙 ${c.gold||0} PO</span><span>🍞 ${c.supplies||0}</span><span>🔥 ${c.torches||0}</span></div><h4>Equipamento</h4><div class="sheet-tags">${(c.inventory||[]).map(x=>`<span class="tag">${x}</span>`).join('')||'<span class="muted">Nenhum</span>'}</div><div class="sheet-card-footer"><button class="btn" onclick="partyActions('${c.id}')">⚙ Ajustar</button><button class="btn" onclick="chooseCharacterAction('${c.id}','track')">🔎 Usar para rastrear</button></div></article>`}).join('')}</div>`;
}
const HEX_COLS=9, HEX_ROWS=7, HEX_CENTER=40;
const LOCALITIES=["Aldeia","Ruínas Antigas","Torre Abandonada","Santuário","Caverna","Acampamento de Caçadores","Cidade Humana"];
const TERRAIN_COST={Planície:1,Montanha:3,Floresta:2,Pântano:2,Deserto:2,Tundra:2,Geleira:2,Água:2,Selva:2,Mangue:2};
const terrainNames=["Planície","Montanha","Floresta","Pântano","Deserto","Tundra","Geleira","Água"];
function cellRC(i){return {r:Math.floor(i/HEX_COLS),c:i%HEX_COLS}}
function rcCell(r,c){return r<0||c<0||r>=HEX_ROWS||c>=HEX_COLS?null:r*HEX_COLS+c}
function hexNeighbors(i){const {r,c}=cellRC(i),odd=r%2;const dirs=odd?[[0,-1],[0,1],[-1,0],[-1,1],[1,0],[1,1]]:[[0,-1],[0,1],[-1,-1],[-1,0],[1,-1],[1,0]];return dirs.map(([dr,dc])=>rcCell(r+dr,c+dc)).filter(x=>x!==null)}
function ensureCampaignMap(){if(!state.map||!state.map.cells)state.map={current:HEX_CENTER,cells:{},day:1,phase:"Cidade",objective:"Partir da cidade.",history:[]};if(!state.map.cells[HEX_CENTER])state.map.cells[HEX_CENTER]={terrain:"Planície",locality:"Cidade Humana",discovered:true,visited:true,season:"Primavera Caótica"};state.map.selected=state.map.selected??state.map.current;state.map.day=state.map.day||1;state.map.history=state.map.history||[];state.map.phase=state.map.phase||"Cidade";state.map.objective=state.map.objective||"Explorar o mundo.";state.locations=state.locations||{cities:[],dungeons:[]};state.npcs=(state.npcs||[]).map(migrateNPC)}
function mapCell(i){ensureCampaignMap();return state.map.cells[i]||null}
function terrainFromCurrent(i){const from=mapCell(i),base=from?.terrain||"Planície",roll=d(20,'Definição do terreno');if(roll===null)return null;const warm={Planície:[[1,3,"Água"],[4,7,"Montanha"],[8,10,"Floresta"],[11,20,"Planície"]],Montanha:[[1,3,"Deserto"],[4,7,"Montanha"],[8,10,"Montanha"],[11,13,"Floresta"],[14,17,"Selva"],[18,20,"Planície"]],Floresta:[[1,3,"Água"],[4,7,"Pântano"],[8,10,"Montanha"],[11,13,"Floresta"],[14,17,"Selva"],[18,20,"Planície"]],Pântano:[[1,3,"Água"],[4,7,"Água"],[8,10,"Floresta"],[11,17,"Pântano"],[18,20,"Mangue"]],Deserto:[[1,7,"Deserto"],[8,10,"Deserto"],[11,13,"Montanha"],[14,17,"Montanha"],[18,20,"Montanha"]],Água:[[1,13,"Água"],[14,17,"Mangue"],[18,20,"Planície"]]};const rows=warm[base]||warm.Planície;return rows.find(x=>roll>=x[0]&&roll<=x[1])?.[2]||"Planície"}
function seasonRoll(){const r=d(20,'Definição da estação');if(r===null)return null;return r<=5?"Primavera Caótica":r<=10?"Verão Abrasador":r<=15?"Outono da Morte":"Inverno Eterno"}
function seasonEffect(season){if(season==="Primavera Caótica")return "Rastrear −1; Bestas +5 PV; +1d4 ingredientes raros.";if(season==="Verão Abrasador")return "Bestas de Fogo +10 PV/+2 dano; Bestas de Gelo −10 PV; descanso −10%.";if(season==="Outono da Morte")return "Mortos-vivos +10 PV; −1 em testes de Carisma.";return "Bestas de Gelo +10 PV/+2 BC; Bestas de Fogo −10 PV; abrigo aberto −3 PV/noite."}
function localityRoll(terrain){const chance=d(20,'Verificação de localidade');if(chance===null)return null;if(chance<18)return '';const idx=d(LOCALITIES.length,'Tipo de localidade');if(idx===null)return null;return terrain==='Planície'?'Cidade Humana':LOCALITIES[idx-1]}
function recordTravel(text){state.map.history=state.map.history||[];const entry=`Dia ${state.map.day}: ${text}`;state.map.history.push(entry);state.log.push(text);state.lastResult={title:"Acontecimento da aventura",icon:"📜",text, effects:[]}}
function revealNeighbor(i){ensureCampaignMap();const cur=state.map.current;if(!hexNeighbors(cur).includes(i))return toast("Você só pode viajar para um hexágono adjacente.");const terrain=terrainFromCurrent(cur);if(terrain===null)return;const season=seasonRoll();if(season===null)return;const locality=localityRoll(terrain);if(locality===null)return;state.map.cells[i]={terrain,locality,discovered:true,visited:false,season};recordTravel(`Novo hexágono: ${terrain}${locality?` · Localidade: ${locality}`:""} · ${season}.`);state.lastResult.title="Novo hexágono descoberto";state.lastResult.icon="🗺️";state.lastResult.effects=[`Terreno: ${terrain}`,`Estação: ${season}`,locality?`Localidade: ${locality}`:"Nenhuma localidade encontrada"];travelTo(i,true)}
function travelCost(terrain){return TERRAIN_COST[terrain]||2}
function travelTo(i){ensureCampaignMap();const cell=mapCell(i);if(!cell)return;const cost=travelCost(cell.terrain);if(cell.terrain==="Água"&&!state.character.inventory.some(x=>/barco|barqueiro/i.test(x))){openModal(`<h2>Água impede a passagem</h2><p>O livro exige um barco para atravessar Água. Contrate um Barqueiro na Taverna de uma cidade.</p><button class="btn" onclick="closeModal()">Entendi</button>`);return}if(state.character.supplies<cost){const missing=cost-state.character.supplies;state.character.hp=Math.max(1,state.character.hp-missing*3);state.character.supplies=0;recordTravel(`Faltaram ${missing} provisões e você perdeu ${missing*3} PV.`);state.lastResult.effects=[`−${missing} provisão(ões)`, `−${missing*3} PV`]}else state.character.supplies-=cost;state.map.current=i;cell.visited=true;state.map.day+=cost;state.map.phase=cell.locality?"Cidade":"Viagem";if(cell.locality){state.map.objective=state.tracks>=3?"Levar a pista para a cidade e preparar a caçada.":"Explorar a localidade ou seguir rastros.";recordTravel(`Chegada à ${cell.locality}.`);state.lastResult.title="Chegada ao local";state.lastResult.icon="📍";state.lastResult.effects=[`Você entrou em ${cell.locality}`,`Dia avançou ${cost} unidade(s)`];toast(`${cell.locality} descoberta!`)}else{state.map.objective=state.tracks>=3?"A Besta está próxima: prepare a caçada.":"Encontrar 3 Rastros da Besta.";travelEventDetailed(cell.terrain)};if(cell.season==="Inverno Eterno"&&cell.terrain==="Geleira"){state.character.hp=Math.max(1,state.character.hp-2);recordTravel("Geleira: frio extremo causou 2 dano [Gelo].")}render()}
const TRAVEL_EVENTS={
  Água:{rare:{name:"Kraken",type:"combat",hp:50,dmg:10},encounter:{name:"Piratas",type:"choice",loot:true},danger:{name:"Tempestade",type:"skill",skill:"dex",dc:12,fail:"move"}},
  Planície:{rare:{name:"Wyvern",type:"combat",hp:12,dmg:6,element:"Fogo"},encounter:{name:"Orc",type:"choice",hp:6,dmg:3,loot:true},danger:{name:"Chuva pesada",type:"resource",supplies:1}},
  Montanha:{rare:{name:"Dragão",type:"combat",hp:30,dmg:7,element:"Fogo"},encounter:{name:"Orcs",type:"choice",hp:6,dmg:3,loot:true},danger:{name:"Avalanche",type:"resource",hp:5}},
  Floresta:{rare:{name:"Troll",type:"combat",hp:10,dmg:6,regen:true},encounter:{name:"Goblins",type:"choice",hp:3,dmg:1,loot:true},danger:{name:"Chuva pesada",type:"resource",supplies:1}},
  Pântano:{rare:{name:"Gigante de Musgo",type:"combat",hp:20,dmg:4},encounter:{name:"Chuva pesada",type:"resource",supplies:1},danger:{name:"Tempestade",type:"resource",supplies:2}},
  Deserto:{rare:{name:"Verme Gigante",type:"combat",hp:30,dmg:10},encounter:{name:"Tempestade de areia",type:"resource",supplies:2},danger:{name:"Tempestade de areia",type:"resource",supplies:2}},
  Tundra:{rare:{name:"Yeti",type:"combat",hp:20,dmg:5},encounter:{name:"Nevasca",type:"resource",supplies:2},danger:{name:"Nevasca",type:"resource",supplies:2}},
  Geleira:{rare:{name:"Gelo Rachado",type:"skill",skill:"dex",dc:16,fail:"halfHp"},encounter:{name:"Gelo Rachado",type:"skill",skill:"dex",dc:16,fail:"halfHp"},danger:{name:"Nevasca",type:"resource",supplies:2}}
};
const WEATHER_EVENTS={
  "Primavera Caótica":[
    {min:1,max:5,title:"Chuva de pólen",text:"A vegetação explode em cores estranhas.",choices:[{label:"Forragear",skill:"sur",dc:12,success:"Você encontra 1d4 ingredientes raros.",fail:"Um fungo irritante causa 1 Fadiga."},{label:"Ignorar",success:"Você segue viagem sem efeito."}]},
    {min:6,max:10,title:"Trilha lavada",text:"A chuva apaga marcas recentes.",choices:[{label:"Rastrear",skill:"sur",dc:16,success:"+1 Rastro.",fail:"−1 provisão."},{label:"Poupar tempo",success:"Você não ganha nem perde nada."}]}
  ],
  "Verão Abrasador":[
    {min:1,max:5,title:"Miragem",text:"Uma silhueta parece oferecer água ao longe.",choices:[{label:"Investigar",skill:"wis",dc:12,success:"Você encontra um oásis: recupera 1d4 PV.",fail:"Perde 1 provisão perseguindo a miragem."},{label:"Ignorar",success:"Você evita o desvio."}]},
    {min:6,max:10,title:"Calor extremo",text:"O equipamento esquenta e a marcha pesa.",choices:[{label:"Marchar",skill:"con",dc:12,success:"Segue normalmente.",fail:"+1 Fadiga."},{label:"Parar",success:"Perde 1 dia, mas evita a Fadiga."}]}
  ],
  "Outono da Morte":[
    {min:1,max:5,title:"Sussurros dos mortos",text:"Vozes parecem chamar pelo nome do grupo.",choices:[{label:"Rezar",skill:"wis",dc:12,success:"Recebe uma visão: +1 Rastro.",fail:"+1 Fadiga."},{label:"Seguir a voz",skill:"wis",dc:16,success:"Você encontra 1d6 PO esquecidas.",fail:"Role novamente o evento de viagem."}]},
    {min:6,max:10,title:"Corvos negros",text:"Uma revoada acompanha a expedição.",choices:[{label:"Observar",skill:"wis",dc:12,success:"Você percebe perigo antes de uma emboscada.",fail:"Nenhuma informação."},{label:"Afastá-los",skill:"cha",dc:12,success:"Eles vão embora.",fail:"−1 Reputação em uma próxima localidade."}]}
  ],
  "Inverno Eterno":[
    {min:1,max:5,title:"Gelo quebradiço",text:"O chão racha sob seus pés.",choices:[{label:"Testar o caminho",skill:"dex",dc:16,success:"Você atravessa com segurança.",fail:"Perde metade dos PV atuais."},{label:"Dar a volta",success:"Gasta +1 provisão, mas evita o risco."}]},
    {min:6,max:10,title:"Vento cortante",text:"A visibilidade cai e o frio atravessa a armadura.",choices:[{label:"Montar abrigo",skill:"sur",dc:12,success:"O grupo se protege.",fail:"−2 PV."},{label:"Continuar",success:"Avança, mas ganha +1 Fadiga."}]}
  ]
};
function eventSkillLabel(k){return ({str:"Força",dex:"Destreza",con:"Constituição",int:"Inteligência",wis:"Sabedoria",cha:"Carisma",sur:"Sobrevivência"}[k]||k)}
function rollTravelTest(skill,dc,success,fail){
  requestTest(`Teste de ${eventSkillLabel(skill)}`,skill==='con'?'str':skill,dc,0,(r)=>{const result=r.success?success:fail;recordTravel(`${eventSkillLabel(skill)} CD ${dc}: ${r.raw} + ${r.mod} = ${r.total} → ${result}`);applyTravelConsequence(result,skill);toast(r.success?'Teste bem-sucedido!':'Teste falhou.')});
}
function applyTravelConsequence(text,skill){
  const m=text.match(/([+−-])(\d+)\s*(PV|provisão|provisões|Fadiga|Rastro|PO)/i);
  if(m){const n=Number(m[2])*(m[1]==='+'?1:-1),what=m[3].toLowerCase();if(what.includes('pv'))state.character.hp=Math.max(1,state.character.hp+n);else if(what.includes('provis'))state.character.supplies=Math.max(0,state.character.supplies+n);else if(what.includes('fadiga'))state.character.fatigue=Math.max(0,state.character.fatigue+n);else if(what.includes('rastro'))state.tracks=Math.max(0,Math.min(3,state.tracks+n));else if(what.includes('po'))state.character.gold=Math.max(0,state.character.gold+n)}
  if(/metade dos PV/i.test(text))state.character.hp=Math.max(1,Math.floor(state.character.hp/2));
  if(/1d4 PV/i.test(text)){const r=rollDiceValue(4,'Recuperação de PV');if(r!==null)state.character.hp=Math.min(state.character.maxHp,state.character.hp+r);}
  if(/1d6 PO/i.test(text)){const r=rollDiceValue(6,'Ganho de PO');if(r!==null)state.character.gold+=r;}
  if(/1d4 ingredientes/i.test(text)){const r=rollDiceValue(4,'Ingredientes raros');if(r!==null)state.character.inventory.push(`${r} ingredientes raros`);}
  if(/Rastrear|Rastro/i.test(text)&&/\+1 Rastro/i.test(text))state.tracks=Math.min(3,state.tracks+1);
}
function rollDiceValue(n,label='Rolagem de recurso'){return d(n,label)}
function weatherEvent(terrain,season){
  const list=WEATHER_EVENTS[season]||[]; if(!list.length)return false;
  const r=d(20,`Evento climático — ${season}`);if(r===null)return false; const ev=list.find(x=>r>=x.min&&r<=x.max); if(!ev)return false;
  const choices=ev.choices.map((c,i)=>`<button class="btn ${i===0?'primary':''}" onclick="resolveTravelChoice(${JSON.stringify(c).replace(/"/g,'&quot;')},'${season.replace(/'/g,"\\'")}')">${c.label}${c.skill?` · ${eventSkillLabel(c.skill)} CD ${c.dc}`:""}</button>`).join('');
  openModal(`<div class="event-card"><div class="event-kicker">${season} · ${terrain}</div><h2>🌦️ ${ev.title}</h2><p>${ev.text}</p><div class="row">${choices}</div></div>`);
  recordTravel(`Clima: ${ev.title}.`);return true;
}
function resolveTravelChoice(choice,season){
  closeModal();
  if(choice.skill){rollTravelTest(choice.skill,choice.dc,choice.success,choice.fail)}else{applyTravelConsequence(choice.success,choice.skill||'');recordTravel(choice.success)}
  toast(choice.skill?`Teste de ${eventSkillLabel(choice.skill)} resolvido.`:"Escolha resolvida.");render();
}
function terrainEvent(t){
  const r=d(20,`Evento de viagem — ${t}`);if(r===null)return false;const table=TRAVEL_EVENTS[t]||TRAVEL_EVENTS.Planície;
  if(r===1){const e=table.rare;recordTravel(`Evento raro (${t}): ${e.name}.`);openTravelEncounter(e.name,t,true,e);return true}
  if(r<=4){const e=table.encounter;recordTravel(`Encontro (${t}): ${e.name}.`);openTravelEncounter(e.name,t,false,e);return true}
  if(r<=8){const e=table.danger;resolveTerrainDanger(e,t);return true}
  return false;
}
function resolveTerrainDanger(e,t){
  if(e.type==='resource'){
    if(e.supplies){state.character.supplies=Math.max(0,state.character.supplies-e.supplies);recordTravel(`${e.name}: −${e.supplies} provisões.`)}
    if(e.hp){state.character.hp=Math.max(1,state.character.hp-e.hp);recordTravel(`${e.name}: −${e.hp} PV.`)}
    toast(`${e.name}: consequências aplicadas.`);return;
  }
  if(e.type==='skill'){
    openModal(`<div class="event-card"><div class="event-kicker">Perigo de ${t}</div><h2>⚠️ ${e.name}</h2><p>Faça um teste de ${eventSkillLabel(e.skill)} CD ${e.dc}.</p><button class="btn primary" onclick="closeModal();rollTerrainSkill('${e.skill}',${e.dc},'${e.fail}')">🎲 Testar</button></div>`);return;
  }
  if(e.fail==='move'){recordTravel('A tempestade desviou o grupo 1 hexágono.');randomAdjacentMove();}
}
function rollTerrainSkill(skill,dc,fail){
  closeModal();
  requestTest(`Perigo: ${eventSkillLabel(skill)}`,skill,dc,0,(r)=>{if(r.success){recordTravel(`Teste de ${eventSkillLabel(skill)}: ${r.raw}+${r.mod}=${r.total}. Sucesso!`);toast('Você superou o perigo.')}else{recordTravel(`Teste de ${eventSkillLabel(skill)}: ${r.raw}+${r.mod}=${r.total}. Falha.`);if(fail==='halfHp')state.character.hp=Math.max(1,Math.floor(state.character.hp/2));if(fail==='move')randomAdjacentMove();toast('O perigo teve consequência.')}});
}
function randomAdjacentMove(){const ns=hexNeighbors(state.map.current).filter(i=>mapCell(i));if(!ns.length)return;const raw=d(ns.length,'Escolha do deslocamento forçado');if(raw===null)return;travelTo(ns[raw-1]);}
function weatherModifierForEvent(){const c=mapCell(state.map.current);return c?.season||'Primavera Caótica'}
function travelEventDetailed(t){
  const triggered=terrainEvent(t);
  if(triggered)return true;
  const season=weatherModifierForEvent();
  if(weatherEvent(t,season))return true;
  recordTravel(`Viagem tranquila por ${t}.`);return false;
}
function openTravelEncounter(name,terrain,rare,data={},poiIndex=null){
  const multi=Math.min(4,state.characters?.length||state.campaign?.players||1);
  const scaledHp=data.hp?(rare?data.hp*multi:data.hp):undefined;
  const text=rare?`Um encontro raro exige uma decisão imediata.`:`O encontro pode ser enfrentado, evitado ou contornado. Quando for uma criatura, o Mestre pode iniciar uma batalha usando o combate completo do sistema.`;
  const safe=name.replace(/'/g,"\'");
  openModal(`<div class="event-card"><div class="event-kicker">${terrain} · ${rare?'Encontro raro':'Encontro de viagem'} · ${multi} personagem(ns)</div><h2>⚔️ ${name}</h2><p>${text}</p>${data.hp?`<div class="card"><b>Combate disponível</b><p class="muted">PV operacional: ${scaledHp}. Dano: ${data.dmg||'—'}${data.element?` · Elemento: ${data.element}`:''}</p></div>`:''}<div class="row"><button class="btn primary" onclick="startTravelCombat('${safe}','${terrain}',${rare},${JSON.stringify(data).replace(/"/g,'&quot;')},${poiIndex===null?'null':poiIndex})">⚔️ Batalhar</button><button class="btn" onclick="travelEncounterSkill('${safe}','${terrain}','${rare}', 'dex',${poiIndex===null?'null':poiIndex})">Tentar evitar · Destreza CD 12</button><button class="btn" onclick="travelEncounterSkill('${safe}','${terrain}','${rare}', 'wis',${poiIndex===null?'null':poiIndex})">Observar · Sabedoria CD 16</button><button class="btn" onclick="travelEncounterNegotiate('${safe}','${terrain}',${poiIndex===null?'null':poiIndex})">Negociar / Blefar</button></div><small class="muted">${scaledHp?`A batalha será aberta no módulo de Combate com ${scaledHp} PV operacionais.`:'Este encontro não possui estatísticas de combate definidas na tabela; o Mestre pode evitar, observar ou negociar.'}</small></div>`);
}
function travelEncounterSkill(name,terrain,rare,skill,poiIndex=null){
  closeModal(); const dc=skill==='dex'?12:16;
  requestTest(`${name}: ${skill==='dex'?'evitar':'observar'} encontro`,skill,dc,0,(r)=>{if(r.success){const text=`${name}: ${skill==='dex'?'encontro evitado':'observação concluída'} (${r.raw}+${r.mod}=${r.total} vs CD ${r.dc}).`;recordTravel(text);if(poiIndex!=null)mapPOIResult(`${state.map.selected}:${rare?'rare':'encounter'}`,text);toast('Encontro resolvido sem combate.')}else{const text=`${name}: tentativa de ${eventSkillLabel(skill)} falhou.`;recordTravel(text);if(poiIndex!=null)mapPOIResult(`${state.map.selected}:${rare?'rare':'encounter'}`,text,'andamento');startTravelCombat(name,terrain,rare,null,poiIndex)}});
}
function travelEncounterNegotiate(name,terrain,poiIndex=null){
  closeModal(); const rep=state.character.reputation?.[terrain]||0;
  requestTest(`Negociar / Blefar com ${name}`,'cha',12,rep,(r)=>{const key=poiIndex!=null?`${state.map.selected}:${'encounter'}`:null;const total=r.total;if(r.raw===1){state.character.gold=Math.max(0,state.character.gold-3);const text='Negociação falhou: −3 PO.';if(key)mapPOIResult(key,text,'andamento');toast('A negociação deu errado: perdeu 3 PO.')}else if(total>=20){state.character.gold+=2;const text='Acordo favorável: +2 PO.';if(key)mapPOIResult(key,text);toast('Você conseguiu um acordo favorável.')}else if(total>=12){const text='O encontro recuou sem combate.';if(key)mapPOIResult(key,text);toast('O encontro recuou sem combate.')}else{if(key)mapPOIResult(key,'Negociação falhou; combate iniciado.','andamento');startTravelCombat(name,terrain,false,null,poiIndex)}});
}
function startTravelCombat(name,terrain,rare=false,data=null,poiIndex=null){
  closeModal();
  const mapEnemy={Orc:{hp:6,dmg:3},Orcs:{hp:6,dmg:3},Goblins:{hp:3,dmg:1},Piratas:{hp:5,dmg:2},Wyvern:{hp:12,dmg:6,element:'Fogo'},Troll:{hp:10,dmg:6},"Gigante de Musgo":{hp:20,dmg:4},Yeti:{hp:20,dmg:5},Dragão:{hp:30,dmg:7,element:'Fogo'},"Verme Gigante":{hp:30,dmg:10},Kraken:{hp:50,dmg:10}};
  const e={...(mapEnemy[name]||{hp:10,dmg:3}),...(data||{})};
  const players=Math.min(4,state.characters?.length||state.campaign?.players||1);
  const hp=Math.max(1,Number(e.hp)||10);
  const scaledHp=rare?hp*players:hp;
  state.combat={beast:{species:name,rank:1,element:e.element||'Normal',hp:scaledHp,maxHp:scaledHp,bc:3,dodge:12,dmg:Number(e.dmg)||3,weakness:null,parts:[{name:'Corpo',def:10,height:1,armor:0,maxArmor:0,broken:false,sensitive:false,sensitivity:'Normal'}]},round:1,reaction:true,order:[],current:0,playerStates:{},playerOrder:[],animals:[],animalOrder:[],animalIndex:0,travelEncounter:{name,terrain,rare:!!rare,baseHp:hp,loot:!!e.loot,element:e.element||'Normal',poiIndex:poiIndex===null?null:Number(poiIndex),poiCell:state.map.selected}};
  initCombat();
  recordTravel(`Batalha de encontro de viagem iniciada contra ${name} (${terrain}).`);
  show('combat');
}
function evadeTravelEncounter(){const raw=d(20,'Fuga do encontro');if(raw===null)return;closeModal();const total=raw+(state.character.attrs.dex||0);if(total>=12){recordTravel(`Você evitou o encontro (${raw}+${state.character.attrs.dex||0} = ${total}).`);toast("Encontro evitado!")}else{recordTravel(`A tentativa de fuga falhou (${raw}+${state.character.attrs.dex||0} = ${total}).`);toast("Você não conseguiu evitar.")}render()}
function campRest(){ensureCampaignMap();if(state.map.phase==="Cidade"){state.character.hp=state.character.maxHp;state.character.fatigue=0;recordTravel("Descanso na cidade: PV e Fadiga recuperados.");state.lastResult.title="Descanso na cidade";state.lastResult.icon="🛏️";state.lastResult.effects=["PV restaurados ao máximo","Fadiga zerada"];toast("Descanso completo.")}else{const heal=Math.max(1,Math.floor(state.character.maxHp*.25));state.character.hp=Math.min(state.character.maxHp,state.character.hp+heal);state.character.fatigue=Math.max(0,state.character.fatigue-1);state.map.day++;recordTravel(`Acampamento: +${heal} PV, −1 Fadiga. Novo dia.`);state.lastResult.title="Acampamento concluído";state.lastResult.icon="⛺";state.lastResult.effects=[`+${heal} PV`,`−1 Fadiga`,`Novo dia: Dia ${state.map.day}`];toast("Acampamento realizado.")}render()}
function buySupplies(){if(state.map.phase!=="Cidade")return toast("Só é possível comprar provisões em uma cidade.");const max=10+(state.character.attrs.str>=4?5:0),amount=Math.max(0,Math.min(max-state.character.supplies,Math.floor(state.character.gold)));if(!amount)return toast("Sem espaço ou sem PO.");state.character.gold-=amount;state.character.supplies+=amount;recordTravel(`Compradas ${amount} provisões.`);state.lastResult.title="Suprimentos comprados";state.lastResult.icon="🎒";state.lastResult.effects=[`+${amount} provisão(ões)`,`−${amount} PO`];render()}
function gatherClues(){const cell=mapCell(state.map.current);if(cell?.locality){const raw=d(2,'Quantidade de rastros encontrados');if(raw===null)return;const gain=1+raw;state.tracks=Math.min(3,state.tracks+gain);recordTravel(`Investigação em ${cell.locality}: +${gain} Rastro(s).`);state.lastResult.title="Investigação concluída";state.lastResult.icon="🔎";state.lastResult.effects=[`+${gain} Rastro(s)`,`Progresso: ${state.tracks}/3`];if(state.tracks>=3)state.map.objective="A Besta foi localizada. Gere uma Besta e inicie a caçada.";toast(`Rastros: ${state.tracks}/3`);render();return}trackRoll()}
function launchHunt(){if(state.tracks<3)return toast("Você precisa de 3 Rastros para encontrar a Besta.");generateBeast();state.map.phase="Caçada";state.map.objective="A Besta foi localizada. Inicie o combate.";recordTravel("A trilha terminou: a Besta foi localizada!");show("beast")}
function returnToCity(){const city=Object.entries(state.map.cells).find(([i,c])=>c.locality==="Cidade Humana"&&c.visited);if(!city)return toast("Nenhuma cidade descoberta.");travelTo(Number(city[0]))}
function mapStatus(){ensureCampaignMap();const cell=mapCell(state.map.current),discovered=Object.values(state.map.cells).filter(x=>x.discovered).length;return {cell,discovered}}

function hexGeometry(i){
  const {r,c}=cellRC(i), size=38, w=Math.sqrt(3)*size, h=2*size, v=1.5*size, ox=52, oy=48;
  const x=ox+c*w+(r%2?w/2:0), y=oy+r*v;
  const pts=Array.from({length:6},(_,k)=>{const a=Math.PI/180*(60*k-30);return `${(x+size*Math.cos(a)).toFixed(1)},${(y+size*Math.sin(a)).toFixed(1)}`}).join(' ');
  return {x,y,pts};
}
function mapAvailability(cell){
  if(!cell||!cell.discovered)return {features:[],actions:[],events:[],animals:[],npcs:[]};
  const here=state.map.current===state.map.selected;
  const terrain=normalizeTerrainForAnimals(cell.terrain||'Planície');
  const animalList=WILD_ANIMALS[terrain]||[];
  const table=TRAVEL_EVENTS[cell.terrain]||TRAVEL_EVENTS[terrain]||TRAVEL_EVENTS.Planície;
  const weather=(WEATHER_EVENTS[cell.season]||[]).map(e=>e.title).filter(Boolean);
  const npcs=npcAtHex(state.map.selected);
  const features=[];
  features.push(`🌍 Terreno: ${cell.terrain}`);
  features.push(`💰 Custo de viagem: ${travelCost(cell.terrain)} provisão(ões)`);
  features.push(`🌦️ Estação: ${cell.season||'Não definida'}`);
  if(cell.locality)features.push(`📍 Localidade: ${cell.locality}`);
  if(cell.terrain==='Água')features.push('⛵ Travessia exige barco');
  const actions=[];
  if(here&&cell.locality)actions.push({key:'investigate',label:'🔎 Investigar localidade'});
  if(here)actions.push({key:'track',label:'🧭 Rastrear'});
  if(here)actions.push({key:'rest',label:state.map.phase==='Cidade'?'⛺ Descansar na cidade':'⛺ Acampar'});
  if(here&&state.map.phase==='Cidade')actions.push({key:'supplies',label:'🍞 Comprar provisões'});
  if(here&&state.tracks>=3)actions.push({key:'hunt',label:'🐲 Caçar a Besta'});
  const events=[];
  if(table?.rare?.name)events.push(`⚠️ Raro: ${table.rare.name}`);
  if(table?.encounter?.name)events.push(`👥 Encontro: ${table.encounter.name}`);
  if(table?.danger?.name)events.push(`☠️ Perigo: ${table.danger.name}`);
  weather.forEach(w=>events.push(`🌦️ Clima: ${w}`));
  const animals=animalList.map(a=>({name:a.name,hp:a.max,damage:a.damage,effect:a.effect}));
  return {features,actions,events,animals,npcs};
}
function poiDataForCell(cell){
  if(!cell||!cell.discovered)return [];
  const terrain=normalizeTerrainForAnimals(cell.terrain||'Planície');
  const table=TRAVEL_EVENTS[cell.terrain]||TRAVEL_EVENTS[terrain]||TRAVEL_EVENTS.Planície;
  const weather=(WEATHER_EVENTS[cell.season]||[]);
  const npcs=npcAtHex(state.map.selected);
  const pois=[];
  if(cell.locality)pois.push({id:'locality',icon:'📍',title:cell.locality,type:'Localidade',summary:'Ponto de interesse principal deste hexágono.',data:{name:cell.locality,terrain:cell.terrain,season:cell.season}});
  if(table?.rare)pois.push({id:'rare',icon:'⚠️',title:table.rare.name,type:'Encontro raro',summary:'Pode surgir com uma rolagem rara durante a viagem.',data:table.rare});
  if(table?.encounter)pois.push({id:'encounter',icon:'⚔️',title:table.encounter.name,type:'Encontro',summary:'Encontro de viagem associado ao terreno.',data:table.encounter});
  if(table?.danger)pois.push({id:'danger',icon:'☠️',title:table.danger.name,type:'Perigo',summary:'Perigo de viagem associado ao terreno.',data:table.danger});
  weather.forEach((w,i)=>pois.push({id:`weather-${i}`,icon:'🌦️',title:w.title,type:'Evento climático',summary:w.text,data:w}));
  const animals=WILD_ANIMALS[terrain]||[];
  if(animals.length)pois.push({id:'animals',icon:'🐾',title:`Animais Selvagens de ${terrain}`,type:'Fauna',summary:`${animals.length} opções disponíveis nesta região.`,data:{terrain,animals}});
  if(npcs.length)pois.push({id:'npcs',icon:'🎭',title:`NPCs no local (${npcs.length})`,type:'Personagens',summary:'NPCs posicionados neste hexágono.',data:{npcs}});
  return pois;
}
function poiRewards(data){
  const out=[];
  (data?.choices||[]).forEach(c=>{if(c.success)out.push(c.success)});
  if(data?.fail&&/PO|PV|provis|Rastro|ingrediente|Fadiga/i.test(data.fail))out.push(`Consequência em falha: ${data.fail}`);
  if(data?.supplies)out.push(`Consome ${data.supplies} provisão(ões)`);
  if(data?.hp)out.push(`Causa ${data.hp} PV de dano`);
  return [...new Set(out)];
}
function mapPOIKey(index){
  const cell=mapCell(state.map.selected), pois=poiDataForCell(cell), p=pois[index];
  return p?`${state.map.selected}:${p.id}`:null;
}
function mapPOIResult(key,text,status='concluido'){
  if(!key)return;
  const cell=mapCell(state.map.selected); if(!cell)return;
  cell.poiResults=cell.poiResults||{};
  const previous=cell.poiResults[key];
  const entry={status,text,day:state.map.day,time:new Date().toISOString()};
  cell.poiResults[key]={...entry,history:[...(previous?.history||[]),entry].slice(-30)};
  recordTravel(`POI ${key}: ${text}`);
  if(status==='concluido'){
    state.lastResult={title:'Ponto de interesse concluído',icon:'✓',text, effects:[`POI: ${key}`,`Status: concluído`,`Dia: ${state.map.day}`]};
  }
  save();
}
function mapPOIStatus(index){
  const key=mapPOIKey(index), r=mapCell(state.map.selected)?.poiResults?.[key];
  if(!r)return '';
  return `<span class="map-poi-status ${r.status==='andamento'?'active':''}">${r.status==='andamento'?'⏳ Em andamento':'✓ '+r.text}</span>`;
}
function startMapPOI(index){
  const cell=mapCell(state.map.selected), pois=poiDataForCell(cell), p=pois[index];
  if(!p)return toast('Ponto de interesse indisponível.');
  const dta=p.data||{}, key=mapPOIKey(index);
  if(p.id==='rare'||p.id==='encounter'){
    if(dta.type==='combat'){
      mapPOIResult(key,`Encontro iniciado: ${p.title}.`,'andamento');
      startTravelCombat(p.title,cell.terrain,p.id==='rare',dta,index);
      return;
    }
    if(dta.type==='choice'){
      mapPOIResult(key,`Encontro iniciado: ${p.title}.`,'andamento');
      openTravelEncounter(p.title,cell.terrain,p.id==='rare',dta,index);
      return;
    }
  }
  if(p.id==='danger'){
    if(dta.type==='resource'){
      closeModal();
      if(dta.supplies)state.character.supplies=Math.max(0,state.character.supplies-dta.supplies);
      if(dta.hp)state.character.hp=Math.max(1,state.character.hp-dta.hp);
      const effects=[]; if(dta.supplies)effects.push(`−${dta.supplies} provisão(ões)`); if(dta.hp)effects.push(`−${dta.hp} PV`);
      mapPOIResult(key,effects.join(' · ')||'Perigo resolvido.');
      toast('Perigo resolvido.'); render(); return;
    }
    closeModal();
    requestTest(`Perigo: ${p.title}`,dta.skill||'wis',dta.dc||12,0,(r)=>{
      const result=r.success?`Teste bem-sucedido (${r.raw}+${r.mod}=${r.total} vs CD ${r.dc}).`:`Falha no teste (${r.raw}+${r.mod}=${r.total} vs CD ${r.dc}): ${dta.fail||'consequência não especificada'}.`;
      if(!r.success){ if(dta.fail==='halfHp')state.character.hp=Math.max(1,Math.floor(state.character.hp/2)); if(dta.fail==='move')randomAdjacentMove(); }
      mapPOIResult(key,result); toast(r.success?'Perigo superado.':'O perigo teve consequência.'); save(); render();
    }); return;
  }
  if(/^weather-/.test(p.id)){
    closeModal(); openModal(`<div class="event-card"><div class="event-kicker">EVENTO CLIMÁTICO · ${cell.season||'Clima'}</div><h2>🌦️ ${p.title}</h2><p>${dta.text||''}</p><div class="row">${(dta.choices||[]).map((c,i)=>`<button class="btn ${i===0?'primary':''}" onclick="resolveMapPOIChoice(${index},${i})">${c.label}${c.skill?` · ${eventSkillLabel(c.skill)} CD ${c.dc}`:''}</button>`).join('')}</div><button class="btn" onclick="closeModal()">Cancelar</button></div>`); return;
  }
  if(p.id==='npcs')return toast('Selecione um NPC abaixo para interagir.');
  if(p.id==='locality'){mapPOIResult(key,`Interação com ${p.title} iniciada.`,'andamento');toast('Localidade marcada como em andamento.');render();}
}
function openGMLocationControl(index){
  const cell=mapCell(state.map.selected), pois=poiDataForCell(cell), p=pois[index];
  if(!p)return toast('Ponto de interesse indisponível.');
  const dta=p.data||{}, key=mapPOIKey(index);
  const canStart=['rare','encounter','danger'].includes(p.id)||/^weather-/.test(p.id)||p.id==='locality';
  const outcomeOptions=[];
  if(p.id==='rare'||p.id==='encounter'){
    outcomeOptions.push(`<button class="btn primary" onclick="gmForcePOIStart(${index})">▶️ Fazer acontecer agora</button>`);
    if(dta.type==='combat') outcomeOptions.push(`<button class="btn" onclick="gmForcePOICombat(${index})">⚔️ Forçar combate deste ponto</button>`);
    if(dta.type==='choice') outcomeOptions.push(`<button class="btn" onclick="gmForcePOIResolve(${index},'success')">✓ Resolver como sucesso</button>`);
  }
  if(p.id==='danger'){
    outcomeOptions.push(`<button class="btn primary" onclick="gmForcePOIStart(${index})">⚠️ Fazer o perigo acontecer</button>`);
    outcomeOptions.push(`<button class="btn" onclick="gmForcePOIResolve(${index},'success')">✓ Considerar superado</button>`);
    outcomeOptions.push(`<button class="btn" onclick="gmForcePOIResolve(${index},'fail')">✕ Aplicar consequência</button>`);
  }
  if(/^weather-/.test(p.id)){
    outcomeOptions.push(`<button class="btn primary" onclick="gmForcePOIStart(${index})">🌦️ Forçar evento climático</button>`);
    outcomeOptions.push(`<button class="btn" onclick="gmForcePOIResolve(${index},'success')">✓ Resolver pelo sucesso</button>`);
  }
  if(p.id==='locality') outcomeOptions.push(`<button class="btn primary" onclick="gmForcePOIStart(${index})">📍 Tornar a localidade ativa</button>`);
  openModal(`<div class="event-card gm-control-modal"><div class="event-kicker">🎭 CONTROLE DO MESTRE · LOCALIZAÇÃO</div><h2>${p.icon} ${p.title}</h2><p>${p.summary||''}</p><div class="card"><b>Autonomia do Mestre</b><p class="muted">Você pode fazer este ponto acontecer mesmo que uma rolagem anterior não o tenha selecionado. Esta intervenção é registrada no histórico do mapa.</p></div><div class="row">${outcomeOptions.join('')}</div><div class="field" style="margin-top:12px"><label>Registrar acontecimento personalizado</label><textarea id="gmPOINote" rows="3" placeholder="Ex.: O Mestre decidiu que o grupo encontra o santuário escondido."></textarea></div><div class="row"><button class="btn" onclick="gmRecordPOINote(${index})">📝 Registrar decisão</button><button class="btn" onclick="closeModal()">Cancelar</button></div></div>`);
}
function gmForcePOIStart(index){
  closeModal();
  const cell=mapCell(state.map.selected), pois=poiDataForCell(cell), p=pois[index]; if(!p)return;
  const key=mapPOIKey(index);
  mapPOIResult(key,`🎭 Mestre forçou o acontecimento: ${p.title}.`,'andamento');
  startMapPOI(index);
}
function gmForcePOICombat(index){
  closeModal();
  const cell=mapCell(state.map.selected), pois=poiDataForCell(cell), p=pois[index]; if(!p)return;
  const dta=p.data||{}; mapPOIResult(mapPOIKey(index),`🎭 Mestre forçou o combate: ${p.title}.`,'andamento');
  startTravelCombat(p.title,cell.terrain,p.id==='rare',dta,index);
}
function gmForcePOIResolve(index,result){
  const cell=mapCell(state.map.selected), pois=poiDataForCell(cell), p=pois[index], dta=p?.data||{}; if(!p)return;
  closeModal();
  let text='';
  if(/^weather-/.test(p.id)) text=`🎭 Mestre resolveu o evento climático ${p.title} como ${result==='success'?'sucesso':'falha'}.`;
  else if(p.id==='danger'){
    if(result==='fail'){
      if(dta.type==='resource'){
        if(dta.supplies)state.character.supplies=Math.max(0,state.character.supplies-dta.supplies);
        if(dta.hp)state.character.hp=Math.max(1,state.character.hp-dta.hp);
      } else if(dta.fail==='halfHp') state.character.hp=Math.max(1,Math.floor(state.character.hp/2));
      else if(dta.fail==='move') randomAdjacentMove();
      text=`🎭 Mestre aplicou a consequência do perigo ${p.title}: ${dta.fail||'consequência definida pelo Mestre'}.`;
    } else text=`🎭 Mestre decidiu que o grupo superou ${p.title} sem precisar da rolagem.`;
  } else text=`🎭 Mestre resolveu ${p.title} como ${result==='success'?'sucesso':'resultado escolhido pelo Mestre'}.`;
  mapPOIResult(mapPOIKey(index),text);save();render();toast('Decisão do Mestre registrada.');
}
function gmRecordPOINote(index){
  const note=document.getElementById('gmPOINote')?.value.trim(); if(!note)return toast('Descreva o acontecimento.');
  const cell=mapCell(state.map.selected), pois=poiDataForCell(cell), p=pois[index]; if(!p)return;
  mapPOIResult(mapPOIKey(index),`🎭 Decisão do Mestre: ${note}`,'concluido');closeModal();toast('Decisão do Mestre registrada no mapa.');render();
}
function openGMCombatControl(){
  if(!state.combat)return;
  const b=state.combat.beast;
  openModal(`<div class="event-card gm-control-modal"><div class="event-kicker">🎭 CONTROLE DO MESTRE · COMBATE</div><h2>Intervenção livre</h2><p class="muted">O Mestre pode alterar o estado da batalha sem depender de rolagens. Use isso para fazer acontecer uma decisão narrativa ou uma consequência específica.</p><div class="grid grid-2"><div class="field"><label>PV da Besta</label><input id="gmCombatHp" type="number" min="0" value="${Math.max(0,b.hp)}"></div><div class="field"><label>Fadiga do personagem ativo</label><input id="gmCombatFatigue" type="number" min="0" value="${Math.max(0,state.character.fatigue||0)}"></div><div class="field"><label>Dano direto na Besta</label><input id="gmCombatDamage" type="number" min="0" value="0"></div><div class="field"><label>PV restaurados à Besta</label><input id="gmCombatHeal" type="number" min="0" value="0"></div></div><h3>Couraça / partes</h3><div class="row">${b.parts.map((part,i)=>`<button class="btn" onclick="gmSetPartState(${i},'broken')">💥 Romper ${part.name}</button><button class="btn" onclick="gmSetPartState(${i},'armor0')">🛡️ Zerar couraça</button>`).join('')}</div><h3 style="margin-top:14px">Resultado imediato</h3><div class="row"><button class="btn primary" onclick="gmApplyCombatState()">✓ Aplicar alterações</button><button class="btn danger" onclick="gmDefeatBeast()">☠️ Declarar Besta derrotada</button></div><div class="field" style="margin-top:12px"><label>Registro narrativo</label><textarea id="gmCombatNote" rows="3" placeholder="Ex.: A ponte desaba e a Besta fica presa; o Mestre decide que ela perde a próxima ação."></textarea></div><button class="btn" onclick="gmRecordCombatNote()">📝 Registrar decisão do Mestre</button><div class="row" style="margin-top:12px"><button class="btn" onclick="closeModal()">Fechar</button></div></div>`);
}
function gmApplyCombatState(){
  if(!state.combat)return; const b=state.combat.beast;
  const hp=Math.max(0,Number(document.getElementById('gmCombatHp')?.value));
  const dmg=Math.max(0,Number(document.getElementById('gmCombatDamage')?.value)||0);
  const heal=Math.max(0,Number(document.getElementById('gmCombatHeal')?.value)||0);
  const fatigue=Math.max(0,Number(document.getElementById('gmCombatFatigue')?.value)||0);
  if(Number.isFinite(hp))b.hp=Math.min(b.maxHp,hp);
  if(dmg)b.hp=Math.max(0,b.hp-dmg);
  if(heal)b.hp=Math.min(b.maxHp,b.hp+heal);
  state.character.fatigue=fatigue;
  state.log.push(`🎭 Mestre interveio no combate: PV da Besta ${b.hp}/${b.maxHp}${dmg?` · −${dmg} dano`:''}${heal?` · +${heal} PV`:''}.`);
  if(b.hp<=0)handleBeastDefeat();
  closeModal();save();render();toast('Intervenção do Mestre aplicada.');
}
function gmSetPartState(index,mode){
  const part=state.combat?.beast?.parts?.[index]; if(!part)return;
  if(mode==='broken'){part.broken=true;part.armor=0;part.maxArmor=Math.max(part.maxArmor||0,part.armor||0);}
  else if(mode==='armor0'){part.armor=0;}
  state.log.push(`🎭 Mestre alterou a parte ${part.name}: ${mode==='broken'?'rompida':'couraça zerada'}.`);save();render();toast(`${part.name} ajustada pelo Mestre.`);
}
function gmDefeatBeast(){
  if(!state.combat)return; state.combat.beast.hp=0;state.log.push(`🎭 Mestre declarou ${state.combat.beast.species} derrotada.`);closeModal();handleBeastDefeat();save();render();
}
function gmRecordCombatNote(){
  const note=document.getElementById('gmCombatNote')?.value.trim(); if(!note)return toast('Descreva a decisão do Mestre.');
  state.log.push(`🎭 Decisão do Mestre: ${note}`);save();closeModal();render();toast('Decisão registrada no combate.');
}
function gmCombatTargets(){
  const chars=(state.characters||[]).filter(c=>Number(c.hp)>=0).map(c=>({id:c.id,label:c.name||'Personagem',type:'player'}));
  return [{id:'beast',label:state.combat?.beast?.species||'Besta',type:'beast'},...chars];
}
function gmCombatTargetHtml(selected='beast'){
  return gmCombatTargets().map(t=>`<option value="${t.type}:${t.id}" ${selected===`${t.type}:${t.id}`?'selected':''}>${t.type==='beast'?'👹':'🧑'} ${t.label}</option>`).join('');
}
function gmQuickTarget(){
  const v=document.getElementById('gmQuickTarget')?.value||'beast';
  const [type,id]=v.split(':');
  if(type==='beast')return {type,id:'beast',label:state.combat?.beast?.species||'Besta'};
  const c=state.characters.find(x=>x.id===id); return c?{type,id,label:c.name||'Personagem'}:null;
}
function gmQuickPlayerState(t){return t&&t.type==='player'?state.combat.playerStates[t.id]||(state.combat.playerStates[t.id]={hidden:false,hideScore:0,climbing:null,climbingScore:0,poisoned:false,poisonNights:0,skipTurns:0,skipReason:'',downTurns:0,dead:false,restrained:false,engulfed:false,prone:false,nextAttack:0,bonusUsed:false,actionsUsed:false,reaction:true}):null}
function gmQuickLog(text){state.log.push(`🎭 Comando rápido do Mestre: ${text}`);save();render();toast(text);}
function openGMCombatQuickActions(){
  if(!state.combat)return toast('Nenhum combate ativo.');
  const current=state.combat.currentTurnType==='player'?`player:${state.combat.currentTurnId}`:'beast';
  openModal(`<div class="event-card gm-control-modal gm-quick-modal"><div class="event-kicker">⚡ COMANDOS RÁPIDOS · MESTRE</div><h2>Intervenção instantânea</h2><p class="muted">Aplique uma decisão narrativa em um clique, sem editar campos. Os comandos não fazem rolagens e ficam registrados no histórico.</p>
  <div class="field"><label>Alvo</label><select id="gmQuickTarget">${gmCombatTargetHtml(current)}</select></div>
  <h3>⚡ Condições rápidas</h3><div class="quick-command-grid">
    <button class="btn" onclick="gmQuickCondition('prone',true)">⬇️ Derrubar</button><button class="btn" onclick="gmQuickCondition('restrained',true)">🪢 Prender</button><button class="btn" onclick="gmQuickCondition('engulfed',true)">🫧 Engolfar</button><button class="btn" onclick="gmQuickCondition('poisoned',true)">☠️ Envenenar</button><button class="btn" onclick="gmQuickCondition('hidden',true)">🫥 Esconder</button><button class="btn" onclick="gmQuickCondition('hidden',false)">👁️ Revelar</button><button class="btn" onclick="gmQuickCondition('restrained',false)">🔓 Libertar</button><button class="btn" onclick="gmQuickClearConditions()">✨ Limpar condições</button>
  </div>
  <h3>⏱️ Turno e ação</h3><div class="quick-command-grid"><button class="btn" onclick="gmQuickSkip(1)">⏭️ Perder próximo turno</button><button class="btn" onclick="gmQuickSkip(2)">⏭️ Perder 2 turnos</button><button class="btn" onclick="gmQuickReady()">⚔️ Liberar ação</button><button class="btn" onclick="gmQuickUseReaction(false)">↪️ Restaurar reação</button><button class="btn" onclick="gmQuickUseReaction(true)">🚫 Gastar reação</button><button class="btn primary" onclick="gmQuickEndRound()">🔔 Encerrar rodada</button></div>
  <h3>❤️ Estado instantâneo</h3><div class="quick-command-grid"><button class="btn" onclick="gmQuickDamage(1)">💥 −1 PV</button><button class="btn" onclick="gmQuickDamage(5)">💥 −5 PV</button><button class="btn" onclick="gmQuickHeal(5)">💚 +5 PV</button><button class="btn" onclick="gmQuickFatigue(1)">⚡ +1 Fadiga</button><button class="btn" onclick="gmQuickFatigue(-1)">🔋 −1 Fadiga</button><button class="btn" onclick="gmQuickDeclare('success')">✅ Declarar sucesso</button><button class="btn" onclick="gmQuickDeclare('failure')">❌ Declarar falha</button><button class="btn danger" onclick="gmQuickDeclare('defeat')">☠️ Declarar derrotado</button></div>
  <div class="field"><label>Comando narrativo</label><textarea id="gmQuickNote" rows="2" placeholder="Ex.: A porta se fecha e a Besta fica presa atrás dela."></textarea></div><div class="row"><button class="btn" onclick="gmQuickNarrative()">📝 Aplicar e registrar</button><button class="btn" onclick="closeModal()">Fechar</button></div></div>`);
}
function gmQuickCondition(cond,on){const t=gmQuickTarget();if(!t)return;if(t.type==='beast'){state.combat.beast.conditions=state.combat.beast.conditions||{};state.combat.beast.conditions[cond]=on;}else{const p=gmQuickPlayerState(t);p[cond]=on;if(cond==='poisoned'&&on)p.poisonNights=p.poisonNights||0;if(cond==='hidden'&&!on)p.hideScore=0;}gmQuickLog(`${t.label}: ${on?'aplicou':'removeu'} condição ${cond}.`);closeModal();}
function gmQuickClearConditions(){const t=gmQuickTarget();if(!t)return;if(t.type==='beast'){state.combat.beast.conditions={};}else{const p=gmQuickPlayerState(t);['prone','restrained','engulfed','poisoned','hidden','climbing'].forEach(k=>{if(k==='climbing')p[k]=null;else p[k]=false;});p.skipTurns=0;p.skipReason='';}gmQuickLog(`${t.label}: condições limpas.`);closeModal();}
function gmQuickSkip(n){const t=gmQuickTarget();if(!t||t.type==='beast'){return toast('Escolha um personagem para alterar turnos.')}const p=gmQuickPlayerState(t);p.skipTurns=Math.max(0,(p.skipTurns||0)+n);p.skipReason='Decisão do Mestre';gmQuickLog(`${t.label}: perderá ${n} turno(s).`);closeModal();}
function gmQuickReady(){const t=gmQuickTarget();if(!t||t.type==='beast')return;const p=gmQuickPlayerState(t);p.actionsUsed=false;p.skipTurns=0;p.skipReason='';gmQuickLog(`${t.label}: ação liberada pelo Mestre.`);closeModal();}
function gmQuickUseReaction(used){const t=gmQuickTarget();if(!t||t.type==='beast')return;gmQuickPlayerState(t).reaction=!used;gmQuickLog(`${t.label}: reação ${used?'gasta':'restaurada'}.`);closeModal();}
function gmQuickDamage(amount){const t=gmQuickTarget();if(!t)return;if(t.type==='beast'){state.combat.beast.hp=Math.max(0,state.combat.beast.hp-amount);gmQuickLog(`${t.label}: −${amount} PV.`);if(state.combat.beast.hp<=0){closeModal();handleBeastDefeat();return;}}else{const c=state.characters.find(x=>x.id===t.id);c.hp=Math.max(0,Number(c.hp||0)-amount);if(c.hp===0)state.combat.playerStates[c.id].dead=true;gmQuickLog(`${t.label}: −${amount} PV.`);}closeModal();}
function gmQuickHeal(amount){const t=gmQuickTarget();if(!t)return;if(t.type==='beast'){const b=state.combat.beast;b.hp=Math.min(b.maxHp,b.hp+amount);}else{const c=state.characters.find(x=>x.id===t.id);c.hp=Math.min(c.maxHp,Number(c.hp||0)+amount);state.combat.playerStates[c.id].dead=false;}gmQuickLog(`${t.label}: +${amount} PV.`);closeModal();}
function gmQuickFatigue(amount){const t=gmQuickTarget();if(!t||t.type==='beast')return;const c=state.characters.find(x=>x.id===t.id);c.fatigue=Math.max(0,Math.min(8,Number(c.fatigue||0)+amount));gmQuickLog(`${t.label}: ${amount>0?'+':''}${amount} Fadiga.`);closeModal();}
function gmQuickDeclare(result){const t=gmQuickTarget();if(!t)return;const label=t.label;if(result==='defeat'){if(t.type==='beast'){state.combat.beast.hp=0;gmQuickLog(`${label}: derrotado por decisão do Mestre.`);closeModal();handleBeastDefeat();return;}const c=state.characters.find(x=>x.id===t.id);c.hp=0;state.combat.playerStates[c.id].dead=true;}state.log.push(`🎭 Mestre declarou ${label}: ${result==='success'?'sucesso':result==='failure'?'falha':'derrotado'}.`);save();closeModal();render();toast(`${label}: resultado declarado pelo Mestre.`);}
function gmQuickEndRound(){if(!state.combat)return;state.log.push(`🎭 Mestre encerrou a rodada ${state.combat.round}.`);startNextRound(state.combat.currentTurnType==='animal');closeModal();}
function gmQuickNarrative(){const note=document.getElementById('gmQuickNote')?.value.trim();if(!note)return toast('Escreva o acontecimento narrativo.');state.log.push(`🎭 Mestre: ${note}`);save();closeModal();render();toast('Acontecimento narrativo registrado.');}
function resolveMapPOIChoice(index,choiceIndex){
  const cell=mapCell(state.map.selected), pois=poiDataForCell(cell), p=pois[index], c=p?.data?.choices?.[choiceIndex];
  if(!p||!c)return toast('Escolha indisponível.');
  const key=mapPOIKey(index); closeModal();
  if(c.skill){
    requestTest(`${p.title}: ${c.label}`,c.skill==='con'?'str':c.skill,c.dc||12,0,(r)=>{
      const outcome=r.success?(c.success||'Sucesso.'):(c.fail||'Falha.');
      applyTravelConsequence(outcome,c.skill);
      mapPOIResult(key,`${c.label}: ${r.success?'sucesso':'falha'} — ${outcome}`);
      toast(r.success?'Evento resolvido com sucesso.':'Evento resolvido com falha.'); save(); render();
    });
  }else{
    applyTravelConsequence(c.success||c.label,c.skill||''); mapPOIResult(key,`${c.label}: ${c.success||'resolvido.'}`); toast('Evento resolvido.'); render();
  }
}
function npcSocialActions(){return [
  {id:'negotiate',label:'🤝 Negociar',attr:'cha',dc:12},
  {id:'intimidate',label:'😠 Intimidar',attr:'cha',dc:12},
  {id:'bluff',label:'🎭 Mentir / Blefar',attr:'cha',dc:12},
  {id:'insight',label:'🔍 Intuição',attr:'wis',dc:12},
  {id:'seduce',label:'💫 Seduzir',attr:'cha',dc:20}
]}
function npcSocialOutcome(action,r){
  if(r.fumble){
    if(action==='negotiate')return 'Falha crítica: preço sobe 30%; o NPC expulsa o grupo e −1 Reputação.';
    if(action==='intimidate')return 'Falha crítica: o alvo ataca com vantagem.';
    if(action==='bluff')return 'Falha crítica: o NPC percebe a mentira e −2 Reputação.';
    if(action==='insight')return 'Falha crítica: você confia no errado; desvantagem no próximo teste social.';
    if(action==='seduce')return 'Falha crítica: role no Desastre da Sedução.';
  }
  if(action==='negotiate'){
    if(r.total<=9)return 'Falha: preço normal; o NPC não negocia mais hoje.';
    if(r.total<=13)return 'Parcial: 10% de desconto OU uma informação bônus.';
    if(r.total<=17)return 'Sucesso: 20% de desconto OU um item extra na compra.';
    if(r.total<=21)return 'Pleno: 35% de desconto OU um trato vantajoso.';
    return 'Épico: 50% de desconto, aliança ou favor futuro do NPC.';
  }
  if(action==='intimidate')return r.success?'Sucesso: o alvo hesita 1 turno ou foge.':'Falha: a intimidação não funciona.';
  if(action==='bluff')return r.success?'Sucesso: o NPC acredita; a consequência é evitada.':'Falha: o NPC percebe a mentira.';
  if(action==='insight')return r.success?'Sucesso: você percebe mentira, intenção ou perigo social do NPC.':'Falha: a intenção do NPC permanece incerta.';
  if(action==='seduce'){
    if(r.total<20)return 'Falha: o alvo percebe a tentativa e fica desconfiado.';
    if(r.total<=23)return 'Encantado (fraco): responde com a verdade por 1d4 turnos fora de combate.';
    if(r.total<=27)return 'Encantado: revela 1 segredo fora de combate.';
    return 'Profundamente encantado: obedece 1 ordem simples não suicida e cede 1 item menor.';
  }
  return r.success?'Sucesso.':'Falha.';
}
function startNPCSocialEncounter(index,npcId,actionId,optIndex=null){
  const n=state.npcs.find(x=>x.id===npcId); if(!n)return; const action=npcSocialActions().find(a=>a.id===actionId); if(!action)return; migrateNPC(n);
  const chars=(state.characters||[]).filter(c=>c&&c.name&&Number(c.hp??0)>0); if(!chars.length)return toast('Não há personagem capaz de realizar a interação.');
  const branch=npcDialogueBranch(n,action.id); const options=(branch.options||[]).filter(Boolean); const hasOptions=options.length>0; const selected=optIndex==null?null:options[optIndex];
  const canChooseActor=!hasOptions || (optIndex!=null && selected!==undefined);
  const cards=chars.map((c,i)=>`<button class="actor-card" onclick="executeNPCSocialTest(${index},'${n.id}','${action.id}','${c.id}',${optIndex==null?'null':optIndex})"><div class="actor-number">${i+1}</div><div class="actor-main"><b>${c.name}</b><span>${c.race} · ${c.class}</span><div class="actor-bars"><span>${ATTR_LABEL[action.attr]} ${c.attrs?.[action.attr]||0}</span><span>❤ ${c.hp}/${c.maxHp}</span></div></div></button>`).join('');
  const optionHtml=hasOptions&&!selected?`<div class="card"><h4>🗣️ Escolha a resposta</h4><div class="row">${options.map((o,i)=>`<button class="btn" onclick="startNPCSocialEncounter(${index},'${n.id}','${action.id}',${i})">${o}</button>`).join('')}</div></div>`:'';
  openModal(`<div class="event-card npc-encounter"><div class="event-kicker">ENCONTRO COM NPC · DIA ${state.map.day}</div><h2>🎭 ${n.name}</h2><p><b>${n.role||'NPC'}</b>${n.faction?` · ${n.faction}`:''} · ${npcPositionLabel(n)}</p><div class="card npc-dialogue"><div class="label">Fala de abertura</div><p>“${n.dialogue.intro}”</p>${branch.prompt?`<div class="npc-branch"><div class="label">Fala específica · ${action.label}</div><p>“${branch.prompt}”</p></div>`:''}${selected?`<div class="npc-branch"><div class="label">Resposta escolhida</div><p>“${selected}”</p></div>`:''}</div>${npcClueHtml(n)}${optionHtml}<div class="card"><h3>${action.label}</h3><p class="muted">Regra: d20 + atributo contra CD ${action.dc}. 1 natural é falha crítica e 20 natural é sucesso crítico.</p>${canChooseActor?'<h4>Quem conduz a resposta?</h4><div class="actor-picker">'+cards+'</div>':'<p class="muted">Escolha primeiro uma resposta para continuar a ramificação.</p>'}</div><button class="btn" onclick="closeModal()">Cancelar</button></div>`);
}
function executeNPCSocialTest(index,npcId,actionId,charId,optIndex=null){
  const n=state.npcs.find(x=>x.id===npcId); if(!n)return; const action=npcSocialActions().find(a=>a.id===actionId); const c=state.characters.find(x=>x.id===charId); if(!action||!c)return;
  state.activeCharacterId=charId; state.character=c; save(); closeModal();
  requestTest(`${action.label} com ${n.name}`,action.attr,action.dc,0,(r)=>{
    const outcome=npcSocialOutcome(action.id,r); const branch=npcDialogueBranch(n,action.id); const selected=optIndex!=null?(branch.options||[])[optIndex]||'': ''; const dialogue=r.fumble||!r.success?(branch.fail||'O NPC reage de forma desfavorável.'):(branch.success||'O NPC reage de forma favorável.'); const next=branch.next||''; const key=mapPOIKey(index);
    const shouldConflict=!!branch.conflictOnFail || (action.id==='intimidate' && !!r.fumble);
    const result=`${c.name} usou ${action.label} com ${n.name}${selected?` e escolheu “${selected}”`:''}: d20 ${r.raw}${r.mod>=0?'+':''}${r.mod}=${r.total} vs CD ${r.dc} → ${outcome}${dialogue?` | Fala: “${dialogue}”`:''}${next?` | Gancho: ${next}`:''}${shouldConflict?' | Conflito iniciado.':''}`;
    mapPOIResult(key,shouldConflict?`${result} O diálogo fica em andamento até o conflito terminar.`:result,shouldConflict?'andamento':'concluido'); state.log.push(`🎭 ${result}`); closeModal();
    if(shouldConflict){
      openModal(`<div class="event-card npc-result"><div class="event-kicker">⚠️ CONFLITO GERADO PELA ESCOLHA SOCIAL · ${n.name}</div><h2>${action.label}</h2><div class="card npc-dialogue"><div class="label">Fala do NPC</div><p>“${dialogue}”</p></div><div class="card"><b>Consequência</b><p>${outcome}</p><p class="muted">O combate será encerrado com retorno ao diálogo deste NPC, mantendo o estado do personagem e do mapa.</p></div><button class="btn danger" onclick="closeModal();startNPCCombat('${n.id}',${index})">⚔️ Iniciar conflito</button></div>`);
    } else {
      openModal(`<div class="event-card npc-result"><div class="event-kicker">RESULTADO DO ENCONTRO · ${n.name}</div><h2>${action.label}</h2><p><b>${c.name}</b> · ${r.raw}${r.mod>=0?'+':''}${r.mod} = <b>${r.total}</b> vs CD ${r.dc}</p><div class="card npc-dialogue"><div class="label">Fala do NPC</div><p>“${dialogue}”</p></div>${next?`<div class="card"><h4>🔎 Próxima pista / gancho</h4><p>${next}</p></div>`:''}<div class="card"><b>Regra / consequência</b><p>${outcome}</p></div><button class="btn primary" onclick="closeModal();render()">Continuar encontro</button></div>`);
    }
    toast(shouldConflict?'A escolha social iniciou um conflito.':'Resposta do NPC registrada no mapa.'); save();
  });
}
function interactMapNPC(index,npcId){
  const n=state.npcs.find(x=>x.id===npcId); if(!n)return; migrateNPC(n);
  const events=n.events.filter(e=>{normalizeNPCEvent(e,n);return e.status==='pending' && state.map.day>=e.day;});
  const eventHtml=events.length?events.map(e=>{
    const action=e.action?`<small>Ação: ${e.action}</small>`:'';
    return `<div class="party-row"><div><b>${e.title}</b><div class="muted">${e.description||'Sem descrição.'}</div>${action}</div><div class="row"><button class="btn primary" onclick="resolveMapNPCEvent(${index},'${n.id}','${e.id}','completed')">✓ Concluir</button><button class="btn" onclick="resolveMapNPCEvent(${index},'${n.id}','${e.id}','deferred')">⏭ Adiar</button><button class="btn danger" onclick="resolveMapNPCEvent(${index},'${n.id}','${e.id}','cancelled')">✕ Cancelar</button></div></div>`;
  }).join(''):'<p class="muted">Nenhum evento pendente.</p>';
  const social=npcSocialActions().map(a=>`<button class="btn" onclick="startNPCSocialEncounter(${index},'${n.id}','${a.id}')">${a.label} · CD ${a.dc}</button>`).join('');
  openModal(`<div class="event-card"><div class="event-kicker">ENCONTRO COM NPC · DIA ${state.map.day}</div><h2>🎭 ${n.name}</h2><p>${n.role||'NPC'}${n.faction?` · ${n.faction}`:''} · ${npcPositionLabel(n)}</p><div class="card"><h3>💬 Ações sociais</h3><p class="muted">Escolha uma abordagem e depois o personagem que fará o teste.</p><div class="row">${social}</div></div>${events.length?`<h4>⚡ Eventos disponíveis</h4>${eventHtml}`:eventHtml}<div class="row"><button class="btn primary" onclick="registerMapNPCInteraction(${index},'${n.id}')">🗣️ Registrar interação livre</button><button class="btn" onclick="closeModal()">Fechar</button></div></div>`);
}
function registerMapNPCInteraction(index,npcId){
  const n=state.npcs.find(x=>x.id===npcId); if(!n)return;
  const text=prompt(`Resultado da interação com ${n.name}:`); if(text===null)return;
  const key=mapPOIKey(index); mapPOIResult(key,`${n.name}: ${text}`); closeModal(); toast('Interação registrada no mapa.'); render();
}
function resolveMapNPCEvent(index,npcId,eid,status='completed'){
  const n=state.npcs.find(x=>x.id===npcId); if(!n)return; const e=n.events.find(x=>x.id===eid); if(!e)return;
  normalizeNPCEvent(e,n); const key=mapPOIKey(index); closeModal();
  applyNPCEventConsequence(e,status,n);
  if(status==='deferred'){e.day=Math.max(state.map.day+1,e.day+1);e.status='pending';e.done=false;}
  else {e.status=status;e.done=status==='completed';}
  const label=status==='completed'?'concluído':status==='deferred'?`adiado para o Dia ${e.day}`:'cancelado';
  const action=e.action?`: ${e.action}`:'';
  mapPOIResult(key,`${n.name} — ${e.title} ${label}${action}.`);
  state.log.push(`NPC ${n.name}: ${e.title} ${label}.`); save(); toast(`Evento de ${n.name} ${label}.`); render();
}
function openMapPOI(index){
  const cell=mapCell(state.map.selected), pois=poiDataForCell(cell), p=pois[index];
  if(!p)return toast('Ponto de interesse indisponível.');
  const dta=p.data||{};
  let body=`<div class="event-card"><div class="event-kicker">${p.type}</div><h2>${p.icon} ${p.title}</h2><p>${p.summary||''}</p>`;
  if(p.id==='animals'){
    body+=`<h4>Animais disponíveis</h4><div class="map-poi-list">${dta.animals.map(x=>`<div class="map-poi-detail"><div><b>${x.name}</b><span>PV ${x.max} · ${x.damage}</span><small>${x.effect||'Sem efeito especial'}</small></div></div>`).join('')}</div>`;
  }else if(p.id==='npcs'){
    const r=cell.poiResults?.[mapPOIKey(index)];
    body+=`<h4>NPCs presentes</h4><div class="map-poi-list">${dta.npcs.map(n=>`<div class="map-poi-detail"><div><b>${n.name}</b><span>${n.role||'NPC'} · ${n.status||'Ativo'}</span></div><div class="row"><button class="btn primary" onclick="interactMapNPC(${index},'${n.id}')">🗣️ Iniciar encontro</button><button class="btn" onclick="closeModal();npcDetails('${n.id}')">Controle</button></div></div>`).join('')}</div>${r?.history?.length?`<h4>📜 Histórico deste ponto</h4><div class="log">${r.history.slice().reverse().map(h=>`<div>Dia ${h.day} · ${h.text}</div>`).join('')}</div>`:''}`;
  }else if(dta.choices){
    body+=`<h4>Descrição</h4><p>${dta.text||'Sem descrição adicional.'}</p><h4>Escolhas</h4><div class="map-poi-list">${dta.choices.map(c=>`<div class="map-poi-choice"><b>${c.label}</b>${c.skill?` · ${eventSkillLabel(c.skill)} CD ${c.dc}`:''}<br><small>Sucesso: ${c.success||'—'}${c.fail?` · Falha: ${c.fail}`:''}</small></div>`).join('')}</div>`;
  }else if(p.id==='rare'||p.id==='encounter'){
    body+=`<h4>Como funciona</h4><p>${dta.type==='combat'?'Este ponto pode iniciar um combate.':dta.type==='resource'?'Este encontro afeta diretamente os recursos do grupo.':`Exige teste de ${eventSkillLabel(dta.skill||'wis')} CD ${dta.dc||12}.`}</p>`;
  }else if(p.id==='danger'){
    body+=`<h4>Perigo</h4><p>${dta.type==='resource'?`Consome ${dta.supplies||0} provisão(ões)${dta.hp?` e causa ${dta.hp} PV`:''}.`:`Teste de ${eventSkillLabel(dta.skill||'wis')} CD ${dta.dc||12}. Consequência: ${dta.fail||'não especificada'}.`}</p>`;
  }else{
    body+=`<h4>Informações do local</h4><div class="map-info-grid"><div class="map-info-item">🌍 Terreno: ${dta.terrain||cell.terrain}</div><div class="map-info-item">🌦️ Estação: ${dta.season||cell.season||'Não definida'}</div></div>`;
  }
  if(p.id==='rare'||p.id==='encounter'||p.id==='danger'||/^weather-/.test(p.id)||p.id==='locality') body+=`<div class="map-poi-action"><button class="btn primary" onclick="startMapPOI(${index})">▶ Iniciar ${p.id==='danger'?'perigo':/^weather-/.test(p.id)?'evento':(p.id==='locality'?'interação':'encontro')}</button><button class="btn" onclick="openGMLocationControl(${index})">🎭 Controle do Mestre</button>${mapPOIStatus(index)}</div>`;
  const rewards=poiRewards(dta);
  if(rewards.length)body+=`<h4>🎁 Recompensas / resultados</h4><div class="map-poi-list">${rewards.map(r=>`<div class="map-poi-detail"><span>${r}</span></div>`).join('')}</div>`;
  body+=`<div class="row" style="margin-top:14px"><button class="btn" onclick="closeModal()">Fechar</button></div></div>`;
  openModal(body);
}
function mapAvailabilityHtml(cell){
  if(!cell)return `<div class="muted">Selecione um hexágono para ver suas informações.</div>`;
  if(!cell.discovered)return `<div class="event-card"><div class="event-kicker">TERRITÓRIO DESCONHECIDO</div><h3>?</h3><p class="muted">Entre no hexágono para revelar terreno, estação, localidade, eventos e recursos disponíveis.</p></div>`;
  const a=mapAvailability(cell), pois=poiDataForCell(cell);
  const featureHtml=a.features.map(x=>`<div class="map-info-item">${x}</div>`).join('');
  const poiHtml=pois.length?pois.map((p,i)=>`<button class="map-poi-card" onclick="openMapPOI(${i})"><span class="map-poi-icon">${p.icon}</span><span><b>${p.title}</b><small>${p.type} · ${p.summary||''}</small></span><span class="map-poi-open">Abrir ›</span>${mapPOIStatus(i)}</button>`).join(''):`<div class="muted">Nenhum ponto de interesse registrado para este local.</div>`;
  const actionHtml=a.actions.length?a.actions.map(x=>`<button class="btn ${x.key==='hunt'?'primary':''}" onclick="chooseMapActor('${x.key}')">${x.label}</button>`).join(''):'<span class="muted">As ações ficam disponíveis quando você estiver neste hexágono.</span>';
  return `<div class="map-availability"><div class="event-kicker">VISÃO COMPLETA DO LOCAL</div><h3>${cell.locality||cell.terrain}</h3><div class="map-info-grid">${featureHtml}</div><h4>📌 Pontos de interesse</h4><div class="map-poi-grid">${poiHtml}</div><h4>🎯 Ações disponíveis agora</h4><div class="row">${actionHtml}</div></div>`;
}
function mapActionPanel(cell){
  if(!cell)return `<div class="muted">Selecione um hexágono para ver suas informações.</div>`;
  const isHere=state.map.current===state.map.selected, canEnter=hexNeighbors(state.map.current).includes(state.map.selected);
  if(!isHere && canEnter)return `<div class="event-card"><div class="event-kicker">HEXÁGONO SELECIONADO</div>${mapAvailabilityHtml(cell)}<div class="row" style="margin-top:12px"><button class="btn primary" onclick="chooseMapActor('travel')">🚶 Entrar neste hexágono</button></div></div>`;
  if(!isHere)return `<div class="event-card"><div class="event-kicker">FORA DE ALCANCE</div>${mapAvailabilityHtml(cell)}<p class="muted">Você só pode entrar em um dos seis hexágonos adjacentes ao atual.</p></div>`;
  return mapAvailabilityHtml(cell);
}
function openNPCPlacement(){const here=npcAtHex(state.map.current);openModal(`<div class="event-card"><div class="event-kicker">POSIÇÃO NO MAPA</div><h2>NPCs no hex ${state.map.current}</h2>${here.length?here.map(n=>`<div class="party-row"><div><b>${n.name}</b><div class="muted">${n.role||'NPC'} · ${n.status||'Ativo'}</div></div><button class="btn" onclick="npcDetails('${n.id}')">Controle</button><button class="btn primary" onclick="moveNPC('${n.id}',state.map.current,'Movimento pelo mapa')">Mover para cá</button></div>`).join(''):'<p class="muted">Nenhum NPC neste hex.</p>'}<div class="row" style="margin-top:12px"><button class="btn primary" onclick="closeModal();addNPC()">＋ Criar NPC aqui</button><button class="btn" onclick="closeModal()">Fechar</button></div></div>`)}

function mapView(){
  ensureCampaignMap(); const {cell,discovered}=mapStatus(); const selected=mapCell(state.map.selected)||cell;
  const W=9*Math.sqrt(3)*38+104,H=9*1.5*38+96;
  let svg=`<svg class="hexsvg" viewBox="0 0 ${W.toFixed(0)} ${H.toFixed(0)}" role="grid" aria-label="Mapa hexagonal da campanha">`;
  for(let i=0;i<HEX_ROWS*HEX_COLS;i++){
    const c=mapCell(i), g=hexGeometry(i), here=i===state.map.current, sel=i===state.map.selected, neigh=hexNeighbors(state.map.current).includes(i);
    const cls=`hexpoly ${terrainClass[c?.terrain]||'unknown'} ${c?'revealed':''} ${c?.locality?'city':''} ${here?'current':''} ${sel?'selected':''} ${neigh?'neighbor':''}`;
    const label=c?(c.locality?'⌂':c.terrain.slice(0,3)):'?';
    const npcCount=npcAtHex(i).length;
    const animalCount=c?.discovered?((WILD_ANIMALS[normalizeTerrainForAnimals(c.terrain)]||[]).length):0;
    const eventCount=c?.discovered?((TRAVEL_EVENTS[c.terrain]||TRAVEL_EVENTS[normalizeTerrainForAnimals(c.terrain)]||TRAVEL_EVENTS.Planície)?3:0):0;
    const badges=(npcCount||animalCount||eventCount)?`<text class="hex-badge-text" x="${g.x}" y="${g.y+20}">${npcCount?'🎭'+npcCount+' ':''}${animalCount?'🐾'+animalCount+' ':''}${eventCount?'⚡'+eventCount:''}</text>`:'';
    svg+=`<g class="hexnode ${cls}" onclick="hexClick(${i})" role="gridcell" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();hexClick(${i})}"><polygon points="${g.pts}"></polygon><text x="${g.x}" y="${g.y+3}">${label}</text>${npcCount?`<circle class="npc-marker" cx="${g.x+18}" cy="${g.y-14}" r="8"></circle><text class="npc-count" x="${g.x+18}" y="${g.y-11}">${npcCount}</text>`:""}${badges}</g>`;
  }
  svg+='</svg>';
  return `<div class="hero"><div class="between"><div><h2>Mapa da campanha</h2><p>Cada célula é um hexágono real da malha. Clique em qualquer hexágono para selecioná-lo; em um vizinho, escolha <b>Entrar</b> para revelar e ocupar o território.</p></div><div class="tag">Dia ${state.map.day} · ${state.map.phase}</div></div></div><div class="grid grid-3"><div class="card"><span class="label">Local atual</span><div class="stat">${cell.locality||cell.terrain}</div><div class="muted">${cell.terrain} · ${state.character.supplies} provisões</div></div><div class="card"><span class="label">Objetivo</span><div>${state.map.objective}</div><div class="progress" style="margin-top:10px"><i style="width:${Math.min(100,state.tracks/3*100)}%"></i></div><small class="muted">${state.tracks}/3 Rastros</small></div><div class="card"><span class="label">Mapa descoberto</span><div class="stat">${discovered}/${HEX_ROWS*HEX_COLS}</div><div class="muted">${cell.season||'Estação desconhecida'}<br><small>${seasonEffect(cell.season||'Primavera Caótica')}</small></div></div></div><br><div class="grid grid-2"><div class="card map-card"><div class="between"><h3>Malha hexagonal</h3><span class="muted">Clique para selecionar</span></div><div class="map-scroll">${svg}</div><div class="map-legend"><span>● Atual</span><span>◈ Vizinho</span><span>⌂ Localidade</span><span>🐾 Animais</span><span>⚡ Eventos</span><span>🎭 NPC</span><span>?</span> Desconhecido</div></div><div class="card"><h3>Hexágono selecionado</h3>${mapActionPanel(selected)}</div></div><br><div class="card"><h3>Diário da campanha</h3><div class="log">${(state.map.history||[]).slice(-14).reverse().map(x=>`<div>${x}</div>`).join('')||'A aventura começa na cidade central.'}</div></div>`;
}
function hexClick(i){ensureCampaignMap();state.map.selected=i;save();render()}
function enterSelectedHex(){ensureCampaignMap();const i=state.map.selected;if(i===state.map.current)return toast("Você já está aqui.");if(!hexNeighbors(state.map.current).includes(i))return toast("Hexágono não adjacente.");if(!mapCell(i))return revealNeighbor(i);travelTo(i)}
function revealCurrent(){toast("Selecione um hexágono vizinho para explorar.")}
function travelEvent(t){return travelEventDetailed(t)}
function tracking(){migrateParty();const c=state.character||{};return `<div class="hero"><div class="between"><div><h2>Rastreamento</h2><p>Junte 3 Rastros para encontrar a Besta. Escolha explicitamente qual personagem está fazendo o teste.</p></div><span class="tag">Responsável atual: ${c.name||"nenhum"}</span></div></div><div class="grid grid-2"><div class="card"><div class="label">Rastros encontrados</div><div class="stat">${state.tracks}/3</div><div class="progress"><i style="width:${state.tracks/3*100}%"></i></div><br><button class="btn primary" onclick="chooseMapActor('track')">🔎 Escolher quem rastreia</button><p class="muted">O teste usa Sobrevivência do personagem escolhido.</p></div><div class="card"><h3>Quem pode rastrear?</h3><div class="tracking-roster">${state.characters.map(x=>`<div class="party-row ${x.id===state.activeCharacterId?'active':''}"><div><b>${x.name}</b><div class="muted">Sobrevivência +${x.attrs?.sur||0} · Fadiga ${x.fatigue||0}/8</div></div><button class="btn" onclick="chooseCharacterAction('${x.id}','track')">Usar este personagem</button></div>`).join('')}</div></div></div><br><div class="card"><h3>Registro</h3><div class="log">${state.log.slice(-10).map(x=>`<div>${x}</div>`).join("")||"Nenhum teste ainda."}</div></div>`}
function trackRoll(){const cell=mapCell(state.map.current),bonus=cell?.season==="Primavera Caótica"?-1:0;requestTest('Rastrear','sur',16,bonus,(r)=>{if(r.success)state.tracks=Math.min(3,state.tracks+(r.total>=25?2:1));state.log.push(`Rastrear: ${r.raw} + ${r.mod} = ${r.total} → ${r.success?'sucesso':'falha'}`);if(r.success){state.map.objective=state.tracks>=3?'A Besta foi localizada. Gere uma Besta e inicie a caçada.':'Encontrar mais Rastros da Besta.';toast(`Rastro encontrado! ${state.tracks}/3`)}else toast('Nenhum rastro.')})}
function beast(){
  const suggested=Math.min(5,Math.max(1,Math.floor((state.character.legend||0)/4)+1));
  return `<div class="hero"><h2>Gerador de Besta</h2><p>Preparação conforme o Capítulo 5: Rank, escala de grupo, espécie, elemento, iniciativa e partes com Couraça.</p></div>
  <div class="grid grid-2">
    <div class="card"><h3>Preparação</h3>
      <div class="field"><label>Rank</label><select id="rankSelect">${[1,2,3,4,5].map(x=>`<option ${x===suggested?"selected":""}>${x}</option>`).join("")}</select></div>
      <div class="field"><label>Jogadores</label><select id="playerScale">${[1,2,3,4,5,6].map(x=>`<option ${x===(state.campaign?.players||4)?"selected":""}>${x}</option>`).join("")}</select></div>
      <div class="row"><button class="btn primary" onclick="generateBeast()">🎲 Preparar Besta</button></div>
    </div>
    <div class="card">${state.beast?beastCard():"<p class='muted'>Nenhuma Besta preparada.</p>"}</div>
  </div>`;
}

const beastRanks={
  1:{hp:90,armor:[20,30],def:10,bc:4,dodge:12,dmg:6},
  2:{hp:130,armor:[30,40],def:11,bc:5,dodge:13,dmg:8},
  3:{hp:180,armor:[40,55],def:12,bc:6,dodge:14,dmg:10},
  4:{hp:240,armor:[55,75],def:13,bc:7,dodge:15,dmg:13},
  5:{hp:320,armor:[75,110],def:14,bc:8,dodge:16,dmg:16}
};
const speciesByRank=[
 ["Rexian","Boviatan","Uborosso","Argoth","Raidormum"],
 ["Albivian","Boviatan","Uborosso","Argoth","Raidormum"],
 ["Crokion","Gaiark","Renotaur","Kingon","Raidormum"],
 ["Ermiloth","Gorgantis","Kandra","Kingon","Goshin"],
 ["Claker","Euplosor","Fenkeen","Mathulu","Goshin"]
];
const elements=["Fogo","Gelo","Eletricidade","Ácido"];

function groupScale(players){
  return {1:{hp:.4,dmg:-2},2:{hp:.6,dmg:-1},3:{hp:.8,dmg:0},4:{hp:1,dmg:0},5:{hp:1.25,dmg:0},6:{hp:1.5,dmg:0}}[players];
}
function round5(n){return Math.max(5,Math.round(n/5)*5)}
function rollArmor(rank){const a=beastRanks[rank].armor;const span=Math.max(1,Math.round(a[1]-a[0])+1);const raw=d(span,`Couraça inicial (Rank ${rank})`);if(raw===null)return null;return round5(a[0]+raw-1)}
const OFFICIAL_ATTACK_TABLE_A=[
  [3,'Arremesso','direct','D + 4 de dano; o alvo perde o próximo turno (parte: escolha)'],
  [6,'Concentração','self','O próximo ataque causa +D/2 de dano [Elemento] (sem parte)'],
  [9,'Invocar Animal','special','Invoca 1 Animal Selvagem da região (sem parte)'],
  [12,'Regeneração','self','Recupera 5 de Couraça em todas as partes (sem parte)'],
  [16,'Paralisante','area','D de dano [Elemento] em Área; todos perdem o próximo turno, a menos que gastem 2 Fadiga'],
  [20,'Sopro / Rajada','area','D + 4 de dano [Elemento] em Área (parte: escolha)']
];
const OFFICIAL_ATTACK_TABLE_B=[
  [3,'Encontrão','direct','D de dano (sem parte)'],
  [6,'Camuflagem','self','Não pode ser alvo por 1 rodada; o próximo ataque causa +3'],
  [9,'Rugido','area','Todos perdem o próximo turno, a menos que gastem 1 Fadiga (parte: escolha)'],
  [12,'Impacto','area','D − 1 de dano em Área, só em quem toca o chão (parte: escolha)'],
  [16,'Golpe Venenoso','direct','D − 1 de dano e Envenena (parte: escolha)'],
  [20,'Jato','area','D − 2 de dano [Elemento] em Área (parte: escolha)']
];
function resolveOfficialBlankAttack(slot,mode,logDiscovery=true){
  const raw=beastRoll(mode,`Definição do ataque #${slot+1}`);
  if(raw===null)return null;
  const table=(slot===0||slot===5)?'A':'B';
  const rows=table==='A'?OFFICIAL_ATTACK_TABLE_A:OFFICIAL_ATTACK_TABLE_B;
  const hit=rows.find(r=>raw<=r[0]);
  const attack={name:hit[1],type:hit[2],effect:hit[3],known:true,official:true,source:`Livro — Tabela ${table}`,discovered:logDiscovery,roll:raw};
  if(logDiscovery) state.log.push(`🔓 Ataque #${slot+1} descoberto pela Tabela ${table}: ${attack.name} (d20 ${raw}).`);
  return attack;
}

function generateBeast(){
  const rank=+document.getElementById("rankSelect").value;
  const players=+document.getElementById("playerScale").value;
  const base=beastRanks[rank], sc=groupScale(players);
  const speciesRoll=d(5,'Espécie da Besta');if(speciesRoll===null)return;
  const elementRoll=d(20,'Elemento da Besta');if(elementRoll===null)return;
  const species=speciesByRank[speciesRoll-1][rank-1];
  const element=elements[Math.floor((elementRoll-1)/5)];
  const hp=round5(base.hp*sc.hp);
  const names=["Tronco","Pata E","Pata D","Cauda","Cabeça","Núcleo"];
  const adjustments=[0,1,1,1,3,2];
  const heights=[1,1,1,1,2,3];
  const parts=[];for(let i=0;i<names.length;i++){const armor=rollArmor(rank);if(armor===null)return;parts.push({name:names[i],def:base.def+adjustments[i],height:heights[i],armor,maxArmor:armor,broken:false,sensitive:false,sensitivity:'Normal'});}
  // O livro fornece seis espaços numerados e define as Tabelas A/B para preencher espaços vazios.
  // Ele não publica no texto desta edição um bloco de seis ataques exclusivo por espécie; por isso
  // não inventamos ataques "oficiais" por espécie. Os três ataques iniciais são resolvidos pelas
  // próprias tabelas do livro e os demais continuam sendo descobertos em jogo.
  const initialSlots=[0,1,2];
  const attacks=Array(6).fill(null);
  for(const slot of initialSlots){const attack=resolveOfficialBlankAttack(slot, state.rollMode||'auto', false);if(!attack)return;attacks[slot]=attack;}
  state.beast={name:species,rank,players,species,element,weakness:null,furious:false,fury:null,hp,maxHp:hp,bc:base.bc,dodge:base.dodge,dmg:Math.max(3,base.dmg+sc.dmg),parts,attacks,attackMarker:3,round:1,discovered:false};
  state.log.push(`Besta preparada: ${species} — Rank ${rank} — ${element} — ${players} jogador(es).`);
  toast("Besta preparada pelas regras de Rank e escala");
  render();
}
function beastCard(){
  const b=state.beast;
  return `<h3>${b.species}</h3>
  <p><span class="tag">Rank ${b.rank}</span><span class="tag">${b.element}</span><span class="tag">BC +${b.bc}</span><span class="tag">Esquiva CD ${b.dodge}</span></p>
  <p>PV ${b.hp}/${b.maxHp} · Dano Base ${b.dmg} · Grupo: ${b.players}</p>
  <div class="progress"><i style="width:${Math.max(0,b.hp/b.maxHp*100)}%"></i></div><br>
  <div class="body-parts">${b.parts.map((p,i)=>`<div class="part"><div class="between"><b>${p.name}</b><span>Def ${p.def} · Couraça ${p.armor}/${p.maxArmor}</span></div><small>Altura ${p.height}${p.broken?" · ROMPIDA":""}</small></div>`).join("")}</div><br>
  <button class="btn primary" onclick="startCombat(true)">⚔ Iniciar combate</button>`;
}

function setCombatActor(id){
  const c=(state.characters||[]).find(x=>x.id===id); if(!c)return;
  state.activeCharacterId=id;state.character=c;
  state.combat.player=state.combat.playerStates[id]||(state.combat.playerStates[id]={hidden:false,hideScore:0,climbing:null,climbingScore:0,poisoned:false,poisonNights:0,skipTurns:0,skipReason:'',downTurns:0,dead:false,restrained:false,engulfed:false,prone:false,nextAttack:0,bonusUsed:false,actionsUsed:false});
  state.combat.reaction=state.combat.player.reaction!==false;
}
function combatTurnOwner(){
  if(!state.combat)return null;
  if(state.combat.currentTurnType==='beast')return {type:'beast',name:'Besta'};
  if(state.combat.currentTurnType==='animal'){const a=(state.combat.animals||[]).find(x=>x.id===state.combat.currentTurnId);return a?{type:'animal',id:a.id,name:a.name}:null;}
  const c=(state.characters||[]).find(x=>x.id===state.combat.currentTurnId);
  return c?{type:'player',id:c.id,name:c.name||'Caçador'}:null;
}
function isCombatTurnOwner(id){return !!state.combat&&state.combat.currentTurnType==='player'&&state.combat.currentTurnId===id;}
function requireCombatTurn(){
  const owner=combatTurnOwner();
  if(!owner||owner.type!=='player'||owner.id!==state.activeCharacterId){toast(`É o turno de ${owner?.name||'outro combatente'}.`);return false;}
  return true;
}

function initCombat(){
  migrateParty();
  if(!state.characters.length){toast('Crie pelo menos um personagem antes do combate.');return false;}
  state.characters.forEach(c=>c.fatigue=0);
  state.combat.animals=state.combat.animals||[];
  state.combat.playerStates={};
  state.characters.forEach(c=>state.combat.playerStates[c.id]={hidden:false,hideScore:0,climbing:null,climbingScore:0,poisoned:false,poisonNights:0,skipTurns:0,skipReason:'',downTurns:0,dead:false,restrained:false,engulfed:false,prone:false,nextAttack:0,bonusUsed:false,actionsUsed:false,reaction:true});
  const initiativeRolls=[];for(const c of state.characters){const raw=d(20,`Iniciativa de ${c.name||'Caçador'}`);if(raw===null)return false;initiativeRolls.push({id:c.id,initiative:raw+(c.attrs?.dex||0),name:c.name||'Caçador',type:'player',roll:raw});}state.combat.playerOrder=initiativeRolls;
  state.combat.playerOrder.sort((a,b)=>b.initiative-a.initiative);
  state.combat.order=[...state.combat.playerOrder,{type:'beast',initiative:-1,name:'Besta'}];
  state.combat.round=1;state.combat.currentPlayerIndex=0;state.combat.current=0;state.combat.currentTurnId=state.combat.playerOrder[0]?.id||null;state.combat.currentTurnType='player';state.combat.battleStartedByGroup=true;
  setCombatActor(state.combat.playerOrder[0].id);
  state.log.push(`Iniciativa do grupo: ${state.combat.playerOrder.map(x=>x.name+' '+x.initiative).join(' → ')}`);
}
function startCombat(fromGenerator=false){
  if(!state.beast){generateBeast();return}
  state.combat={beast:JSON.parse(JSON.stringify(state.beast)),round:1,reaction:true,order:[],current:0,logStart:state.log.length,playerStates:{},playerOrder:[],animals:[],animalOrder:[],animalIndex:0};
  if(initCombat()===false){state.combat=null;return;}
  state.log.push(`Combate iniciado. Iniciativa: ${state.combat.order.map(x=>x.name+" "+x.initiative).join(" → ")}.`);
  show("combat");
}


// Animais Selvagens — fichas derivadas das tabelas oficiais do livro.
// O livro fornece PV, dano e efeito, mas não publica Defesa, atributos ou iniciativa próprios.
// Para o controle de combate, usamos uma ficha operacional mínima: Atq +2, Defesa 10 e iniciativa d20+2.
// Esses três valores são extensões de implementação, não valores impressos no livro.
const WILD_ANIMALS={
  Floresta:[
    {max:9,name:'Besouro Gigante',damage:'1d6-2',effect:'Gatilho alto: o dano inteiro é [Fogo]',trigger:'high',fireOnTrigger:true},
    {max:3,name:'Macaco-Demônio',damage:'1d6-1',effect:'Gatilho baixo: aparecem mais dois',trigger:'low',summonCount:2},
    {max:9,name:'Lobo',damage:'1d6',effect:'Ao morrer, role 1d20: 1–3, aparecem 2 lobos',deathSpawn:true},
    {max:10,name:'Pantera',damage:'1d6+1',effect:'Gatilho baixo: não causa dano e recupera 3 PV',trigger:'low',healOnTrigger:3},
    {max:13,name:'Aranha Gigante',damage:'1d6',effect:'Gatilho baixo: Envenenado',trigger:'low',poison:true},
    {max:15,name:'Lobo Gigante',damage:'1d6+1',effect:'10 mortos permitem a Poção do Lobo Gigante'}
  ],
  Pântano:[
    {max:8,name:'Esqueleto Antigo',damage:'1d6-2',effect:'Ao cair, 1d20: 1–3 se reconstrói com 6 PV',reconstruct:true},
    {max:8,name:'Lagarto Voador',damage:'1d6-1',effect:'Gatilho alto: dano inteiro [Eletricidade]',trigger:'high',elementOnTrigger:'Eletricidade'},
    {max:9,name:'Serpente Gigante',damage:'1d6',effect:'Gatilho baixo: o alvo fica Preso por 1 turno',trigger:'low',restrain:true},
    {max:10,name:'Caranguejo Gigante',damage:'1d6',effect:'Gatilho baixo: +3 de dano no próximo turno',trigger:'low',nextAttackBonus:3},
    {max:13,name:'Vespa Gigante',damage:'1d6',effect:'Gatilho baixo: Envenenado',trigger:'low',poison:true},
    {max:12,name:'Serpente de Fogo',damage:'1d6+2',effect:'Sempre [Fogo]',element:'Fogo'}
  ],
  Montanha:[
    {max:7,name:'Carneiro',damage:'1d6-2',effect:'Gatilho alto: causa 7 de dano total',trigger:'high',fixedOnTrigger:7},
    {max:6,name:'Fungoide',damage:'1d6-1',effect:'Gatilho baixo: surge outro Fungoide',trigger:'low',summonSelf:1},
    {max:10,name:'Condor dos Alpes',damage:'1d6',effect:'Gatilho alto: dano inteiro [Gelo]',trigger:'high',elementOnTrigger:'Gelo'},
    {max:14,name:'Escorpião Gigante',damage:'1d6+1',effect:'Gatilho baixo: o alvo fica Preso 1 turno',trigger:'low',restrain:true},
    {max:13,name:'Vespa Gigante',damage:'1d6',effect:'Gatilho baixo: Envenenado',trigger:'low',poison:true},
    {max:20,name:'Homem Pedra',damage:'1d6-1',effect:'Imune a dano elemental',immuneElements:true}
  ],
  Planície:[
    {max:15,name:'Ave Gigante',damage:'1d6-1',effect:'Gatilho baixo: não causa dano e Se Afasta; +3 no próximo ataque',trigger:'low',retreat:true,nextAttackBonus:3},
    {max:6,name:'Fungoide',damage:'1d6-1',effect:'Gatilho baixo: surge outro Fungoide',trigger:'low',summonSelf:1},
    {max:9,name:'Puma',damage:'1d6',effect:'Gatilho alto: +2 de dano e sai do combate',trigger:'high',bonusOnTrigger:2,retreat:true},
    {max:10,name:'Planta Deslocadora',damage:'1d6-1',effect:'Quem a ataca sofre 1 de dano [Ácido]',counterAcid:1},
    {max:8,name:'Raptor',damage:'1d6+2',effect:'Ao cair, 1d20: 1–3 aparece outro',deathSpawn:true},
    {max:15,name:'Lobo Gigante',damage:'1d6+1',effect:'10 mortos permitem a Poção do Lobo Gigante'}
  ],
  Tundra:[
    {max:7,name:'Fogo Vivo',damage:'1d6-2',effect:'Todo dano [Fogo]; imune a Fogo',element:'Fogo',immuneElements:true},
    {max:8,name:'Aranha das Neves',damage:'1d6',effect:'Gatilho baixo: Envenenado',trigger:'low',poison:true},
    {max:10,name:'Yeti',damage:'1d6',effect:'Gatilho alto: dano inteiro [Gelo]',trigger:'high',elementOnTrigger:'Gelo'},
    {max:20,name:'Tartaruga de Cristal',damage:'1d6-2',effect:'Gatilho baixo: recupera 6 PV',trigger:'low',healOnTrigger:6},
    {max:14,name:'Leão Branco',damage:'1d6',effect:'Gatilho baixo: no próximo turno +3 [Gelo]',trigger:'low',nextAttackBonus:3,nextAttackElement:'Gelo'},
    {max:15,name:'Lobo Gigante',damage:'1d6+1',effect:'10 mortos permitem a Poção do Lobo Gigante'}
  ],
  Deserto:[
    {max:3,name:'Rato do Deserto',damage:'1d6-2',effect:'Gatilho baixo: aparecem mais dois',trigger:'low',summonCount:2},
    {max:8,name:'Mariposa Gigante',damage:'1d6-1',effect:'Gatilho alto: dano inteiro [Eletricidade]',trigger:'high',elementOnTrigger:'Eletricidade'},
    {max:9,name:'Lagarto Cuspidor',damage:'1d6',effect:'Sempre [Ácido]; imune a Ácido',element:'Ácido',immuneElement:'Ácido'},
    {max:15,name:'Escorpião Gigante',damage:'1d6+1',effect:'Gatilho baixo: Envenenado',trigger:'low',poison:true},
    {max:12,name:'Serpente de Fogo',damage:'1d6+2',effect:'Sempre [Fogo]; imune a Fogo',element:'Fogo',immuneElement:'Fogo'},
    {max:20,name:'Verme Maldito',damage:'1d6',effect:'Gatilho baixo: enterra-se; o próximo ataque causa +3',trigger:'low',nextAttackBonus:3,burrow:true}
  ]
};
function normalizeTerrainForAnimals(terrain){
  if(terrain==='Selva'||terrain==='Mangue') return terrain==='Selva'?'Floresta':'Pântano';
  if(terrain==='Geleira') return 'Tundra';
  return terrain;
}
function animalRollDamage(expr){
  const m=String(expr).match(/^1d6([+-]\d+)?$/i);const raw=d(6,`Dano do Animal (${expr})`);if(raw===null)return null;let n=raw;if(m&&m[1])n+=Number(m[1]);return Math.max(0,n);
}
function animalInitiative(a){if(a.initiative!=null)return a.initiative;const raw=d(20,'Iniciativa do Animal Selvagem');return raw===null?null:raw+2}
function createWildAnimal(template,terrain,source='Invocar Animal'){
  const initiative=animalInitiative({});if(initiative===null)return null;const a={id:uid('animal'),name:template.name,maxHp:template.max,hp:template.max,damage:template.damage,attackBonus:2,def:10,initiative,terrain,effect:template.effect||'',source,trigger:template.trigger||null,poison:false,restrained:false,dead:false,nextAttackBonus:0,element:template.element||'Normal',immuneElements:!!template.immuneElements,immuneElement:template.immuneElement||null,retreat:false,template:JSON.parse(JSON.stringify(template)),control:'Mestre',controlMode:'auto',selectedAttack:'basic',lastRoll:null};
  return a;
}
function spawnWildAnimal(terrain,forcedName=null,source='Invocar Animal'){
  terrain=normalizeTerrainForAnimals(terrain);
  const list=WILD_ANIMALS[terrain];
  if(!list||!list.length){state.log.push(`⚠️ Não há tabela de Animais Selvagens no livro para ${terrain}.`);return null;}
  let t;
  if(forcedName){t=list.find(x=>x.name===forcedName)}
  else {const raw=d(20,`Tabela de Animal Selvagem — ${terrain}`);if(raw===null)return null;t=list.find(x=>raw<=x.max)||list[list.length-1];}
  if(!t)return null;
  const a=createWildAnimal(t,terrain,source);if(!a)return null;(state.combat.animals||(state.combat.animals=[])).push(a);return a;
}
function livingAnimals(){return (state.combat?.animals||[]).filter(a=>a.hp>0&&!a.dead&&!a.retreat)}
function animalRosterHtml(){
  return (state.combat?.animals||[]).map(a=>`<div class="animal-combat-card ${a.hp<=0?'down':''} ${state.combat.selectedAnimalId===a.id?'selected':''}"><div class="between"><b>🐾 ${a.name}</b><span class="tag">${a.terrain}</span></div><div class="animal-mini">PV <b>${Math.max(0,a.hp)}/${a.maxHp}</b> · Atq +${a.attackBonus} · Def ${a.def} · Inic. ${a.initiative}</div><div class="animal-bars"><i style="width:${Math.max(0,Math.min(100,a.hp/a.maxHp*100))}%"></i></div><div class="muted">Atq +${a.attackBonus} · Defesa ${a.def} · Iniciativa ${a.initiative} · Modo ${a.controlMode==='manual'?'Manual':'Automático'}</div><div class="muted">Ataque: ${a.damage}${a.element&&a.element!=='Normal'?` · [${a.element}]`:''} · ${a.effect||'Sem efeito adicional'}</div><div class="muted">Atributos próprios: não especificados no livro; ficha usa Atq +2.</div><div class="row" style="margin-top:6px"><button class="btn ${state.combat.selectedAnimalId===a.id?'primary':''}" onclick="controlWildAnimal('${a.id}')">Controlar</button>${(state.combat.currentTurnType==='animal'&&state.combat.currentTurnId===a.id&&a.hp>0)?`<button class="btn primary" onclick="openWildAnimalAction('${a.id}')">Escolher ação</button>`:''}<button class="btn danger" onclick="removeWildAnimal('${a.id}')">Remover</button></div></div>`).join('')||'<p class="muted">Nenhum Animal Selvagem aliado ou invocado.</p>';
}
function controlWildAnimal(id){
  const a=(state.combat?.animals||[]).find(x=>x.id===id);if(!a)return;
  state.combat.selectedAnimalId=id;render();
}
function removeWildAnimal(id){
  if(!state.combat)return;state.combat.animals=(state.combat.animals||[]).filter(a=>a.id!==id);state.combat.order=(state.combat.order||[]).filter(x=>x.id!==id);if(state.combat.selectedAnimalId===id)state.combat.selectedAnimalId=null;render();
}

function handleWildAnimalDefeat(a){
  if(!a||a.dead)return;
  a.hp=0;a.dead=true;
  const t=a.template||{};
  if(t.reconstruct){
    const r=d(20,`Reconstrução de ${a.name}`);if(r===null)return;if(r<=3){a.dead=false;a.hp=6;state.log.push(`☠️ ${a.name}: reconstrução ativada (${r}) → retorna com 6 PV.`);return;}
  }
  if(t.deathSpawn){
    const r=d(20,`Efeito ao cair de ${a.name}`);if(r===null)return;if(r<=3){
      const count=a.name==='Raptor'||a.name==='Lobo'?2:1;
      for(let i=0;i<count;i++)spawnWildAnimal(a.terrain,a.name,'Efeito ao cair');
      state.log.push(`🐾 ${a.name}: efeito ao cair ativado (${r}) → ${count} novo(s) animal(is).`);
    }
  }
  state.log.push(`☠️ ${a.name} foi derrotado.`);
}
function wildAnimalEffectOptions(a){
  const t=a.template||{};
  const opts=[{v:'none',label:'Sem efeito especial'}];
  if(t.trigger) opts.push({v:'trigger',label:`Aplicar gatilho ${t.trigger==='low'?'baixo (1–3)':'alto (18–20)'}`});
  if(t.poison) opts.push({v:'poison',label:'Aplicar Envenenado'});
  if(t.restrain) opts.push({v:'restrain',label:'Aplicar Preso por 1 turno'});
  if(t.healOnTrigger) opts.push({v:'heal',label:`Recuperar ${t.healOnTrigger} PV`});
  if(t.summonCount||t.summonSelf) opts.push({v:'summon',label:'Invocar os animais adicionais da ficha'});
  if(t.retreat) opts.push({v:'retreat',label:'Se Afasta / sai do combate'});
  if(t.burrow) opts.push({v:'burrow',label:'Enterrar-se (+3 no próximo ataque)'});
  if(t.deathSpawn||t.reconstruct) opts.push({v:'death',label:'Executar efeito de queda/reconstrução (se aplicável)'});
  if(t.counterAcid) opts.push({v:'counter',label:`Contra-efeito: ${t.counterAcid} dano [Ácido] ao atacante`});
  return opts;
}
function openWildAnimalAction(id){
  const a=(state.combat?.animals||[]).find(x=>x.id===id); if(!a)return;
  if(state.combat.currentTurnType!=='animal'||state.combat.currentTurnId!==id)return toast('Este não é o turno desse Animal Selvagem.');
  const targets=(state.characters||[]).filter(c=>c.hp>0).map(c=>`<option value="${c.id}">${c.name||'Caçador'} — PV ${c.hp}/${c.maxHp||c.hp}</option>`).join('');
  const effects=wildAnimalEffectOptions(a).map(o=>`<option value="${o.v}">${o.label}</option>`).join('');
  openModal(`<div class="event-card wild-animal-action-modal"><div class="event-kicker">CONTROLE INDIVIDUAL DO ANIMAL</div><h2>🐾 ${a.name}</h2><p class="muted">Escolha alvo, ataque e efeito. Você pode usar rolagem automática ou informar os dados manualmente.</p><div class="grid grid-2"><div class="field"><label>Modo de rolagem</label><select id="waMode"><option value="auto" ${a.controlMode!=='manual'?'selected':''}>Automático</option><option value="manual" ${a.controlMode==='manual'?'selected':''}>Manual</option></select></div><div class="field"><label>Ataque</label><select id="waAttack"><option value="basic" selected>Ataque básico — ${a.damage} · Atq +${a.attackBonus}</option></select></div><div class="field"><label>Alvo</label><select id="waTarget">${targets||'<option value="">Nenhum alvo vivo</option>'}</select></div><div class="field"><label>Efeito especial</label><select id="waEffect">${effects}</select></div><div class="field"><label>d20 do ataque (manual)</label><input id="waD20" type="number" min="1" max="20" placeholder="1–20"></div><div class="field"><label>Dano final (manual)</label><input id="waDamage" type="number" min="0" placeholder="Opcional — substitui a rolagem de dano"></div></div><p class="muted">No modo automático, o sistema rola d20 e dano. No manual, você controla os resultados. O bônus de Ataque +2 permanece o valor definido pelo livro.</p><div class="row"><button class="btn primary" onclick="executeWildAnimalAction('${a.id}')">🐾 Executar ação</button><button class="btn" onclick="closeModal()">Cancelar</button></div></div>`);
}
function executeWildAnimalAction(id){
  const a=(state.combat?.animals||[]).find(x=>x.id===id); if(!a)return closeModal();
  if(state.combat.currentTurnType!=='animal'||state.combat.currentTurnId!==id)return closeModal(),toast('Não é o turno desse Animal Selvagem.');
  const targetId=document.getElementById('waTarget')?.value;
  const mode=document.getElementById('waMode')?.value||'auto';
  const attack=document.getElementById('waAttack')?.value||'basic';
  const effect=document.getElementById('waEffect')?.value||'none';
  const manualD20=Number(document.getElementById('waD20')?.value);
  const manualDamage=document.getElementById('waDamage')?.value;
  closeModal();
  a.controlMode=mode;a.selectedAttack=attack;a.selectedEffect=effect;
  animalTurn({targetId,mode,manualD20,manualDamage,effect});
}
function attackWildAnimal(id){
  if(!requireCombatTurn())return;
  const a=(state.combat.animals||[]).find(x=>x.id===id),c=state.character,p=state.combat.player;
  if(!a||a.hp<=0||a.dead)return toast('Esse animal não está mais em combate.');
  if(p.dead||p.restrained||p.engulfed||p.actionsUsed)return toast('Você não pode agir agora.');
  const w=weaponData();let attr=w.ranged?(c.attrs.dex||0):(c.attrs.str||0);const mod=Math.floor(attr/2)+w.bonus;
  const raw=d(20,`Ataque de ${c.name||'Caçador'} contra ${a.name}`);if(raw===null)return;const total=raw+mod;
  const hit=raw===20||total>=a.def;
  let damage=0;
  if(hit){const firstDamage=dieRoll(w.die,`Dano de ${c.name||'Caçador'} contra ${a.name}`);if(firstDamage===null)return;damage=firstDamage+Math.floor(attr/2)+w.bonus;if(raw===20){const critDamage=dieRoll(w.die,`Dano crítico de ${c.name||'Caçador'} contra ${a.name}`);if(critDamage===null)return;damage+=critDamage;}if(c.class==='Bárbaro'&&c.choices?.rage)damage+=2;}
  if(hit){a.hp=Math.max(0,a.hp-damage);state.log.push(`⚔️ ${c.name} atacou ${a.name}: ${raw}+${mod}=${total} vs Def ${a.def} → ${damage} dano.`);if(a.template.counterAcid){c.hp=Math.max(0,c.hp-a.template.counterAcid);state.log.push(`🧪 ${a.name}: atacante sofre ${a.template.counterAcid} dano [Ácido].`);}if(a.hp<=0)handleWildAnimalDefeat(a);combatResult(a.hp<=0?'Animal derrotado!':'Ataque no Animal',a.hp<=0?'☠️':'⚔️',`${c.name||'O caçador'} atacou ${a.name}.`,[`Rolagem: d20 ${raw} + ${mod} = ${total}`,`Defesa do animal: ${a.def}`,`Dano: ${damage}`,`PV: ${a.hp}/${a.maxHp}`,...(a.template.counterAcid?[`Contra-efeito: ${a.template.counterAcid} dano [Ácido] ao atacante`]:[])],[],`${c.name||'O caçador'} muda o foco e enfrenta ${a.name} diretamente.`)}
  else {state.log.push(`⚔️ ${c.name} errou ${a.name}: ${raw}+${mod}=${total} vs Def ${a.def}.`);combatResult('Ataque falhou','🛡️',`${c.name||'O caçador'} tentou atingir ${a.name}, mas o animal escapou do golpe.`,[`Rolagem: d20 ${raw} + ${mod} = ${total}`,`Defesa: ${a.def}`,'Dano: 0']);}
  p.actionsUsed=true;endPlayerTurn();
}

function animalTurn(options={}){
  const a=(state.combat.animals||[]).find(x=>x.id===state.combat.currentTurnId);if(!a||a.hp<=0||a.dead||a.retreat)return startNextRound();
  state.combat.currentTurnType='animal';
  const alive=livingCombatants();if(!alive.length)return endCombat();
  const target=(options.targetId&&alive.find(x=>x.id===options.targetId))||alive[Math.floor(Math.random()*alive.length)];
  const manual=options.mode==='manual';
  const roll=manual&&Number.isFinite(options.manualD20)&&options.manualD20>=1&&options.manualD20<=20?options.manualD20:d(20,`Ataque de ${a.name}`);if(roll===null)return;const total=roll+a.attackBonus;
  let damage=manual&&options.manualDamage!==''&&options.manualDamage!=null&&!Number.isNaN(Number(options.manualDamage))?Math.max(0,Number(options.manualDamage)):animalRollDamage(a.damage);if(damage===null)return;damage+=(a.nextAttackBonus||0);a.nextAttackBonus=0;
  if(a.template.fixedOnTrigger&&roll>=18)damage=a.template.fixedOnTrigger;
  if(a.template.elementOnTrigger&&roll>=18)a.element=a.template.elementOnTrigger;
  if(a.template.bonusOnTrigger&&roll>=18)damage+=a.template.bonusOnTrigger;
  if(a.template.immuneElements&&a.element!=='Normal'){}
  if(a.template.trigger==='low'&&roll<=3){
    if(a.template.healOnTrigger){a.hp=Math.min(a.maxHp,a.hp+a.template.healOnTrigger);damage=0;state.log.push(`🐾 ${a.name}: gatilho baixo, recupera ${a.template.healOnTrigger} PV.`)}
    if(a.template.summonCount){for(let i=0;i<a.template.summonCount;i++)spawnWildAnimal(a.terrain,a.name==='Macaco-Demônio'?undefined:a.name,'Gatilho do animal')}
    if(a.template.summonSelf){spawnWildAnimal(a.terrain,a.name,'Gatilho do animal')}
    if(a.template.restrain)a.restrained=false;
    if(a.template.poison){};
    if(a.template.retreat){a.retreat=true;state.log.push(`🐾 ${a.name} se afasta após o gatilho baixo.`)}
    if(a.template.burrow){a.nextAttackBonus=3;state.log.push(`🐾 ${a.name} enterra-se; próximo ataque +3.`)}
  }
  if(a.template.trigger==='high'&&roll>=18){
    if(a.template.elementOnTrigger)a.element=a.template.elementOnTrigger;
    if(a.template.fixedOnTrigger)damage=a.template.fixedOnTrigger;
    if(a.template.retreat)a.retreat=true;
  }
  const chosenEffect=options.effect||a.selectedEffect||'none';
  if(manual){
    if(chosenEffect==='poison'&&a.template.poison){const ps=state.combat.playerStates[target.id]||{};ps.poisoned=true;ps.poisonNights=ps.poisonNights||0;}
    if(chosenEffect==='restrain'&&a.template.restrain){const ps=state.combat.playerStates[target.id]||{};ps.restrained=true;}
    if(chosenEffect==='heal'&&a.template.healOnTrigger)a.hp=Math.min(a.maxHp,a.hp+a.template.healOnTrigger);
    if(chosenEffect==='summon'){if(a.template.summonCount)for(let i=0;i<a.template.summonCount;i++)spawnWildAnimal(a.terrain,undefined,'Efeito manual');if(a.template.summonSelf)spawnWildAnimal(a.terrain,a.name,'Efeito manual');}
    if(chosenEffect==='retreat')a.retreat=true;
    if(chosenEffect==='burrow')a.nextAttackBonus=3;
    if(chosenEffect==='counter'&&a.template.counterAcid)target.hp=Math.max(0,target.hp-a.template.counterAcid);
  }
  const hit=total>=target.def||roll===20;
  let actual=0;
  if(hit&&damage>0){
    actual=applyPlayerDamage(damage,a.element||'Normal',target);
    const ps=state.combat.playerStates[target.id]||{};
    if(a.template.poison&&roll<=3){ps.poisoned=true;ps.poisonNights=ps.poisonNights||0;state.log.push(`☠️ ${target.name} ficou Envenenado por ${a.name}.`)}
    if(a.template.restrain&&roll<=3){ps.restrained=true;state.log.push(`⛓️ ${target.name} ficou Preso por 1 turno.`)}
  }
  if(a.template.deathSpawn&&a.hp<=0){
    const r=d(20,`Efeito ao morrer de ${a.name}`);if(r!==null&&r<=3)spawnWildAnimal(a.terrain,a.name==='Lobo'?'Lobo':a.name,'Efeito ao morrer');
  }
  a.lastRoll={d20:roll,total,targetId:target.id,damage,mode:manual?'manual':'auto',effect:chosenEffect};
  state.log.push(`🐾 ${a.name}: ${manual?'MANUAL':'AUTO'} d20 ${roll}+2=${total} vs Defesa ${target.def} → ${hit?`${actual} dano em ${target.name}`:'falha'}${chosenEffect!=='none'?` · efeito ${chosenEffect}`:''}.`);
  combatResult(hit?'Ataque do Animal':'Animal errou',hit?'🐾':'💨',`${a.name} atacou ${target.name||'o caçador'}.`,[`Iniciativa: ${a.initiative}`,`Modo: ${manual?'Manual':'Automático'}`,`Ataque: ${a.damage} · d20 ${roll} + 2 = ${total}`,`Defesa do alvo: ${target.def}`,`Dano: ${hit?actual:0}`,`PV do alvo: ${target.hp}`,`Efeito escolhido: ${chosenEffect}`,...(a.effect?[`Efeito da ficha: ${a.effect}`]:[])],[],`${a.name} investe contra ${target.name||'o caçador'} com um movimento rápido e instintivo.`);
  advanceAnimalTurn();
}
function startAnimalPhase(){
  const animals=livingAnimals();
  if(!animals.length)return startNextRound(true);
  animals.sort((a,b)=>b.initiative-a.initiative);
  state.combat.animalOrder=animals.map(a=>a.id);
  state.combat.animalIndex=0;
  state.combat.currentTurnType='animal';state.combat.currentTurnId=animals[0].id;
  render();
}
function advanceAnimalTurn(){
  const ids=state.combat.animalOrder||[];let idx=ids.indexOf(state.combat.currentTurnId);if(idx<0)idx=-1;
  const next=ids.slice(idx+1).find(id=>{const a=state.combat.animals.find(x=>x.id===id);return a&&a.hp>0&&!a.dead&&!a.retreat});
  if(next){state.combat.currentTurnId=next;state.combat.currentTurnType='animal';render();return;}
  startNextRound(true);
}
function executeSelectedAnimal(){
  if(state.combat?.currentTurnType!=='animal')return toast('Não é o turno de um Animal Selvagem.');
  const id=state.combat.currentTurnId;const a=state.combat.animals.find(x=>x.id===id);if(!a)return startNextRound(true);animalTurn();
}

function combat(){
  if(!state.combat)return `<div class="hero"><h2>Combate</h2><p>Prepare uma Besta e inicie o combate.</p><button class="btn primary" onclick="show('beast')">Ir para Bestas</button></div>`;
  const b=state.combat.beast,c=state.character,p=state.combat.player;
  const owner=combatTurnOwner();
  const isOwner=owner?.type==='player'&&owner.id===state.activeCharacterId;
  const canAct=isOwner&&!p.dead&&!p.restrained&&!p.engulfed&&!p.actionsUsed;
  const roster=(state.combat.playerOrder||[]).map(x=>{const pc=state.characters.find(q=>q.id===x.id),ps=state.combat.playerStates[x.id],ownerHere=state.combat.currentTurnId===x.id&&state.combat.currentTurnType==='player';const hp=Number(pc?.hp||0),max=Number(pc?.maxHp||1);return `<div class="party-row ${ownerHere?'active':''}" style="margin:6px 0"><div><b>${ownerHere?'▶ ':''}${pc?.name||x.name}</b><div class="muted">${pc?.race||''} · ${pc?.class||''} · Iniciativa ${x.initiative}</div></div><div class="party-stats"><span>❤ ${hp}/${max}</span><span>🛡 ${pc?.pp||0} PP</span><span>⚡ ${pc?.fatigue||0}/8</span><span>${ps?.reaction?'↪ Reação':'⛔ Reação usada'}</span></div><button class="btn ${ownerHere?'primary':''}" onclick="setCombatActor('${x.id}');render()">Controlar</button></div>`}).join('');
  return `<div class="combat-layout">
  <div>
    <div class="card combat-roster"><h3>Ordem dos turnos</h3><div class="row">${roster}</div>${(state.combat.animals||[]).length?`<h4 style="margin-top:14px">🐾 Animais Selvagens</h4><div class="animal-roster">${animalRosterHtml()}</div>`:''}<p class="muted">Dono do turno: <b>${owner?.name||'—'}</b>${owner?.type==='beast'?' · a Besta age agora.':owner?.type==='animal'?' · Animal Selvagem age agora.':` · ${isOwner?'você controla este personagem.':'aguarde seu turno.'}`}</p></div><div class="card"><div class="between"><div><h2>${b.species}</h2><span class="tag">Rodada ${state.combat.round}</span><span class="tag">${b.element}</span></div><b>PV ${b.hp}/${b.maxHp}</b></div>
      <div class="progress"><i style="width:${Math.max(0,b.hp/b.maxHp*100)}%"></i></div>
      <p>BC +${b.bc} · CD Esquiva ${b.dodge} · Dano Base ${b.dmg} ${b.defBonus?`· Defesa ${b.defBonus>0?'+':''}${b.defBonus}`:''} ${b.weakness?`· Fraqueza: ${b.weakness}`:"· Fraqueza desconhecida"}</p><p class="muted">👥 Grupo: ${livingCombatants().length}/${state.characters.length} ativos · ${state.characters.filter(c=>c.hp<=0).length} incapacitado(s)</p>
      <div class="body-parts">${b.parts.map((part,i)=>`<div class="part ${part.broken?"broken":""}">
        <div class="between"><b>${part.name}</b><span>Def ${part.def} · Alt ${part.height}</span></div>
        <div class="progress"><i style="width:${part.broken?0:Math.max(0,part.armor/part.maxArmor*100)}%"></i></div>
        <small>${part.broken?"Rompida — dano direto nos PV":`Couraça ${part.armor}/${part.maxArmor}${part.sensitive?" · "+part.sensitivity:""}`}</small>
        ${canAct?`<button class="btn" style="margin-top:8px" onclick="attackPart(${i})">Atacar esta parte</button>`:""}
      </div>`).join("")}</div>
    </div>
    <br>
    <div class="card">
      <h3>${isOwner?'Turno de '+(c.name||'Caçador'):'Ações do dono do turno'}</h3>
      <p>PV ${c.hp}/${c.maxHp} · Fadiga ${c.fatigue}/8 · Reação ${p.reaction!==false?'disponível':'usada'}${p.hidden?' · Escondido':''}${p.climbing!==null?' · Escalando':''}</p>${!isOwner?'<p class="tag">⏳ Aguarde. Apenas o dono do turno pode escolher uma ação.</p>':''}
      <div class="row">
        ${owner?.type==='beast'?`<span class="tag">👹 Turno da Besta</span><button class="btn primary" onclick="beastTurn()">Executar ação da Besta</button><button class="btn" onclick="startAnimalPhase()">Encerrar turno da Besta</button>`:owner?.type==='animal'?`<span class="tag">🐾 Turno de ${owner.name}</span><button class="btn primary" onclick="executeSelectedAnimal()">Executar ataque do Animal</button><button class="btn" onclick="advanceAnimalTurn()">Passar turno</button>`:canAct?`<button class="btn" onclick="playerAction('descansar')">Descansar</button><button class="btn" onclick="playerAction('esconder')">Esconder</button><button class="btn" onclick="playerAction('escalar')">Escalar</button><button class="btn" onclick="playerAction('analisar')">Analisar Fraqueza</button><button class="btn" onclick="playerAction('ajudar')">Ajudar</button><button class="btn" onclick="playerAction('item')">Poção/Item</button><button class="btn" onclick="playerAction('proximo')">Encerrar turno</button>`:`<button class="btn" disabled>Aguardando dono do turno</button>`}
      </div>
      <div class="row" style="margin-top:8px">
        <button class="btn" onclick="playerAction('esquiva')">↪ Esquiva (reação)</button>
        <button class="btn" onclick="playerAction('bloqueio')">🛡 Bloqueio (reação)</button>
        <button class="btn" onclick="openGMCombatControl()">🎭 Controle do Mestre</button><button class="btn primary" onclick="openGMCombatQuickActions()">⚡ Comandos rápidos</button><button class="btn danger" onclick="endCombat()">Abandonar</button>
      </div>
      <p class="muted">Área não pode ser Esquivada/Bloqueada. Esquiva custa 1 Fadiga. Bloqueio usa Escudo ou arma.</p>
    </div>
  </div>
  <div class="card"><h3>Registro</h3><div class="log">${state.log.slice(-25).map(x=>`<div>${x}</div>`).join("")}</div></div>
  </div>`;
}

function fatigueMod(){const f=state.character.fatigue||0;return f>=7?-2:f>=5?-1:0}
function currentPart(i){return state.combat.beast.parts[i]}
function weaponData(){
  const inv=state.character.inventory||[];
  const x=inv.find(i=>/Espada|Sabre|Adaga|Lança|Maça|Machado|Marreta|Alabarda|Arco|Cajado|Bordão|Gládio|Magia|Varinha|Grimório/.test(i))||"Espada Simples (1d6)";
  let die=/1d10/.test(x)?"d10":/1d8/.test(x)?"d8":/1d6/.test(x)?"d6":"d4";
  let ranged=/Arco|Besta|Flecha/.test(x);
  let type=/Machad|Machado|Machadinha/i.test(x)?"axe":/Arco|Besta|Flecha/i.test(x)?"bow":/Magia|Cajado|Varinha|Feitiço|Mágic|Grimório/i.test(x)?"magic":/Martelo|Marreta|Maça|Mace|Montante|Espadão|Alabarda|Pesad|Duas mãos|Duas-mãos/i.test(x)?"heavy":/Espada|Sabre|Adaga|Lança|Gládio|Faca/i.test(x)?"sword":"generic";
  let bonus=/Sabre/.test(x)?1:0;
  return {name:x,die,ranged,bonus,type};
}
function dieRoll(s,label='Rolagem de dano'){return d(+s.slice(1),label)}

function combatResult(title,icon,text,effects=[],details=[],narration=''){
  state.lastResult={title,icon,text,effects:[...effects,...details],combat:true,narration};
}
function cinematicAttackNarration(kind, attacker, target, extra='', weaponType='generic', weaponName='arma'){
  const A=attacker||'o caçador', T=target||'o alvo';
  const W=weaponName||'arma';
  const lines={
    sword:{normal:`${A} avança com ${W}, encontra uma abertura na defesa de ${T} e desfere um corte preciso que faz a criatura recuar.`,critical:`O tempo parece desacelerar. ${A} identifica o ponto exato e desfere um golpe perfeito com ${W}, atingindo ${T} com força devastadora.`,armor:`O golpe de ${A} encontra a proteção de ${T} no ângulo exato. ${W} rasga a defesa e a armadura se parte em meio a faíscas.`,destroyed:`Com um movimento preciso, ${A} atinge ${T} com ${W}. A parte atingida cede sob o corte e deixa a criatura perigosamente vulnerável.`,downed:`O golpe de ${W} atinge ${T} com força suficiente para tirar seu equilíbrio. ${T} cambaleia e cai ao chão.`},
    axe:{normal:`${A} ergue ${W} e o desce em um arco pesado. O impacto faz ${T} estremecer e abre uma brecha na defesa.`,critical:`${A} concentra toda a força no golpe de ${W}. O machado desce como um raio e atinge ${T} com violência devastadora.`,armor:`O machado de ${A} encontra a proteção de ${T} e não para. Metal e couro cedem sob o impacto brutal.`,destroyed:`${A} desfere um golpe brutal com ${W}. A parte atingida não suporta a pancada e se rompe, arrancando um rugido da criatura.`,downed:`${W} atinge ${T} com uma força esmagadora. ${T} perde o apoio, cai pesadamente e tenta se recompor.`},
    bow:{normal:`${A} prende a respiração, solta a corda e a flecha de ${W} encontra ${T} em cheio.`,critical:`O tempo parece parar. ${A} solta a flecha no instante perfeito, e o disparo de ${W} atravessa a abertura da defesa de ${T}.`,armor:`A flecha dispara com precisão. O impacto de ${W} atinge uma junção da proteção de ${T}, fazendo a armadura estalar.`,destroyed:`${A} encontra o ponto exato e dispara. A flecha de ${W} atinge ${T}, e a parte ferida finalmente cede.`,downed:`A flecha de ${W} encontra seu alvo e ${T} perde o equilíbrio. A criatura cai, momentaneamente incapaz de responder.`},
    magic:{normal:`${A} canaliza sua energia e libera ${W}. A magia envolve ${T} em um clarão antes de atingir o alvo.`,critical:`A energia se concentra por um instante e explode nas mãos de ${A}. O poder de ${W} atinge ${T} com força sobrenatural.`,armor:`A magia de ${A} se infiltra pelas frestas da proteção de ${T}. A armadura range, racha e finalmente cede diante da energia.`,destroyed:`O poder de ${W} se concentra sobre ${T}. A energia explode no ponto atingido e a parte da criatura cede, deixando-a exposta.`,downed:`Uma onda de energia lançada por ${W} atinge ${T}. A criatura é arremessada para trás e cai, atordoada.`},
    heavy:{normal:`${A} gira ${W} com esforço e acerta ${T} com um impacto que reverbera pelo campo de batalha.`,critical:`${A} encontra o momento perfeito e descarrega todo o peso de ${W} sobre ${T}. O impacto é brutal.`,armor:`O peso de ${W} vence a proteção de ${T}. A armadura entorta, racha e finalmente se rompe.`,destroyed:`${A} desfere um golpe esmagador com ${W}. A parte atingida cede sob a pressão e a criatura solta um rugido.`,downed:`O impacto de ${W} é devastador. ${T} é derrubado pelo golpe e permanece no chão por um instante.`},
    generic:{normal:`${A} encontra uma abertura na defesa de ${T} e desfere um golpe que muda o ritmo da batalha.`,critical:`Por um instante, tudo parece desacelerar. ${A} identifica o ponto exato e desfere um golpe devastador em ${T}.`,armor:`O impacto ecoa pelo campo. A proteção de ${T} não aguenta a pressão e se parte em meio ao choque.`,destroyed:`O golpe atinge o limite. A parte atingida de ${T} cede e é destruída, deixando a criatura vulnerável.`,downed:`O impacto é brutal. ${T} perde o equilíbrio, cai ao chão e a batalha ganha um novo nível de tensão.`}
  };
  return ((lines[weaponType]||lines.generic)[kind]||(lines[weaponType]||lines.generic).normal)+(extra?` ${extra}`:'');
}
function combatRollLine(label,raw,mod,total,target){
  return `${label}: d20 ${raw} ${mod>=0?'+':''}${mod} = ${total} vs ${target}`;
}
function attackPart(i){
  const c=state.character,b=state.combat.beast,p=state.combat.player,part=b.parts[i];
  if(!requireCombatTurn())return;
  if(p.dead||p.restrained||p.engulfed)return toast("Você não pode agir agora.");
  if(p.climbing!==null&&p.climbing!==i)return toast("Escalando, você só pode atacar a parte onde está.");
  const w=weaponData();
  if(!w.ranged && part.height>1 && p.climbing===null && !(/Longo/.test(w.name)&&["Anjo","Draconato"].includes(c.race)))return toast("Arma corporal não alcança essa Altura.");
  if(w.ranged && p.hidden){p.hideScore=Math.max(0,p.hideScore-1)}
  else if(!w.ranged)p.hidden=false;
  let atkAttr=w.ranged?(c.attrs.dex||0):(c.attrs.str||0);
  const attackBonus=w.bonus+(c.choices?.nextAttack||0);
  c.choices.nextAttack=0;
  requestTest(`Ataque em ${part.name}`,(w.ranged?'dex':'str'),part.def,attackBonus,(r)=>{
    const atk=r.total, raw=r.raw;
    const armorBefore=part.armor, beastHpBefore=b.hp;
    let dieD=dieRoll(w.die);
  let mod=Math.floor(atkAttr/2);
  if(p.climbing!==null){dieD+=4;p.climbing=Math.max(0,p.climbingScore-1)}
  let damage=dieD+mod+w.bonus;
  const nat=raw;
  if(nat===1){c.choices.nextAttack=-2;state.log.push(`Falha crítica contra ${part.name}: próximo ataque −2.`);combatResult('Falha crítica','💥',`${c.name||'O caçador'} erra o golpe contra ${part.name} e fica exposto.`,[`Rolagem: d20 = 1`,`Próximo ataque: −2`],[],cinematicAttackNarration('normal',c.name||'O caçador',part.name,'A arma passa perto demais e a criatura aproveita a abertura.'));p.actionsUsed=true;endPlayerTurn();return}
  let crit=nat===20;
  if(crit){damage=dieD+dieRoll(w.die)+mod+w.bonus}
  if(c.class==="Ladino"&&p.hidden){damage+=dieRoll("d6");p.hidden=false;state.log.push("Ataque Furtivo: +1d6.")}
  if(c.class==="Amaldiçoado"&&c.choices?.demonRage){damage+=5}
  if(c.class==="Bárbaro"&&c.choices?.rage){damage+=2}
  if(c.class==="Ferreiro"&&c.choices?.forgeStrike){damage+=Math.min(c.pp,8);c.choices.forgeStrike=false}
  if(c.class==="Ladino"&&c.choices?.lowBlow){damage+=5;c.choices.lowBlow=false}
  if(crit && !part.broken)part.armor=Math.max(0,part.armor-5);
  if(atk>=part.def||crit){
    const hitInfo=applyBeastDamage(part,damage,w.ranged?"Normal":"Normal",crit) || {};
    const armorBroken=armorBefore>0 && part.armor===0;
    const destroyed=!!hitInfo.destroyed;
    const effects=[`Rolagem: d20 ${raw} + modificadores = ${atk}`,`Defesa de ${part.name}: ${part.def}`,`Dano causado: ${damage}`,`Armadura: ${armorBefore} → ${part.armor}`,`PV da Besta: ${beastHpBefore} → ${b.hp}`];
    if(armorBroken)effects.push('🛡️ Armadura da parte foi quebrada.');
    if(destroyed)effects.push('💥 Parte destruída.');
    if(hitInfo.sensitivity)effects.push(`🔎 Sensibilidade: ${hitInfo.sensitivity}`);
    const kind=destroyed?'destroyed':armorBroken?'armor':crit?'critical':'normal';
    const title=destroyed?'Parte destruída!':armorBroken?'Armadura quebrada!':crit?'CRÍTICO!':'Acerto!';
    combatResult(title,crit?'💥':destroyed?'🩸':armorBroken?'🛡️':'⚔️',`${c.name||'O caçador'} atingiu ${part.name} da ${b.species}.`,effects,[],cinematicAttackNarration(kind,c.name||'O caçador',part.name,'',w.type,w.name));
    state.log.push(`Ataque em ${part.name}: ${nat} + atributo/bônus = ${atk} vs Def ${part.def} → ${crit?"CRÍTICO, ":""}${damage} dano.`);
  }else{
    state.log.push(`Ataque em ${part.name}: ${nat} + atributo/bônus = ${atk} vs Def ${part.def} → falha.`);
    combatResult('Ataque bloqueado','🛡️',`${c.name||'O caçador'} tentou atingir ${part.name}, mas a defesa da Besta segurou o golpe.`,[`Rolagem: d20 ${raw} + modificadores = ${atk}`,`Defesa: ${part.def}`,'Dano: 0'],[],cinematicAttackNarration('normal',c.name||'O caçador',part.name,'A criatura absorve o impacto e permanece firme.'));
  }
    p.actionsUsed=true;
    if(checkBeastDefeat())return;
    endPlayerTurn();
  });
}
function applyBeastDamage(part,damage,type,crit=false){
  const b=state.combat.beast;
  if(!part.broken){
    const before=part.armor;
    part.armor=Math.max(0,part.armor-damage);
    const excess=Math.max(0,damage-before);
    if(part.armor===0&&!part.broken){
      part.broken=true;
      const sens=d(20,`Sensibilidade de ${part.name}`);if(sens===null){part.broken=false;part.armor=1;return {destroyed:false,sensitivity:null,cancelled:true};}
      if(part.name==="Cabeça"||part.name==="Núcleo"||part.name==="Pata E"||part.name==="Pata D"){}
      if(sens<=10){part.sensitive=true;part.sensitivity="Frágil ×2"}
      else if(sens>=19){part.sensitive=true;part.sensitivity="Dura ÷2"}
      if(excess>0)damageBeastHP(excess,part.sensitivity);
      if(!b.furious){const triggered=triggerFuryAndWeakness();if(triggered===false){b.furious=false;return {destroyed:false,sensitivity:part.sensitivity||null,cancelled:true};}}
    }
  }else damageBeastHP(damage,part.sensitivity);
  return {destroyed:!!part.broken,sensitivity:part.sensitivity||null};
}
function damageBeastHP(amount,sens){
  const b=state.combat.beast;
  let n=amount;
  if(sens==="Frágil ×2")n*=2;
  if(sens==="Dura ÷2")n=Math.floor(n/2);
  if(b.weakness && state.lastDamageElement===b.weakness)n*=2;
  b.hp=Math.max(0,b.hp-n);
}
function triggerFuryAndWeakness(){
  const b=state.combat.beast;
  const f=d(20,'Fúria da Besta');if(f===null)return false;b.fury=f<=3?"Invocar Animais":f<=7?"Restauração":f<=10?"Aura Elemental":f<=14?"Ataque Especial":f<=17?"Terremoto":"Força Elemental";
  const w=d(20,'Fraqueza da Besta');if(w===null){b.fury=null;return false;}b.weakness=w<=3?"Gelo":w<=10?"Fogo":w<=17?"Eletricidade":"Ácido";
  state.log.push(`🔥 Fúria: ${b.fury}. Fraqueza descoberta: ${b.weakness}.`);
}
function resolveSkipTurn(id,spendFatigue){
  const c=(state.characters||[]).find(x=>x.id===id),p=state.combat?.playerStates?.[id];
  if(!c||!p)return;
  if(p.skipTurns<=0){closeModal();return}
  if(spendFatigue){
    if((c.fatigue||0)>=8)return toast('Fadiga já está no máximo.');
    c.fatigue=(c.fatigue||0)+1;
    p.skipTurns=Math.max(0,(p.skipTurns||0)-1);
    state.log.push(`⚡ ${c.name}: gastou 1 Fadiga para agir apesar de ${p.skipReason||'efeito especial'}.`);
  }else{
    p.skipTurns=Math.max(0,(p.skipTurns||0)-1);
    state.log.push(`⏭ ${c.name}: perdeu o turno por ${p.skipReason||'efeito especial'}.`);
  }
  p.skipReason='';
  closeModal();
  if(!spendFatigue) endPlayerTurn(); else {p.actionsUsed=false;endPlayerTurn();}
}
function offerSkipTurn(id){
  const c=(state.characters||[]).find(x=>x.id===id),p=state.combat?.playerStates?.[id];
  if(!c||!p||!(p.skipTurns>0))return false;
  openModal(`<div class="event-card"><div class="event-kicker">⏭ TURNO IMPEDIDO</div><h2>${c.name||'Caçador'} está sob efeito especial</h2><p>${p.skipReason||'A Besta impediu sua ação neste turno.'}</p><div class="row"><button class="btn" onclick="resolveSkipTurn('${id}',false)">⏭ Perder o turno</button><button class="btn primary" onclick="resolveSkipTurn('${id}',true)">⚡ Gastar 1 Fadiga e agir</button></div></div>`);
  return true;
}

function playerAction(action){
  const c=state.character,b=state.combat.beast,p=state.combat.player;
  if(!requireCombatTurn())return;
  if(p.dead)return;
  if((p.skipTurns||0)>0){ offerSkipTurn(c.id); return; }
  if(action==="proximo"){endPlayerTurn();return}
  if(action==="descansar"){
    if(p.climbing!==null)return toast("Não pode descansar escalando.");
    const raw=d(4,'Recuperação de Fadiga');if(raw===null)return;const rec=raw+1;c.fatigue=Math.max(0,c.fatigue-rec);p.actionsUsed=true;state.log.push(`Descanso: −${rec} Fadiga.`);endPlayerTurn();return
  }
  if(action==="esconder"){
    requestTest('Esconder','dex',12,0,(r)=>{if(r.success){if(r.total>p.hideScore)p.hideScore=r.total;p.hidden=true;state.log.push(`Esconder: ${r.total}.`)}else{state.log.push(`Esconder falhou: ${r.total} vs CD 12.`)}p.actionsUsed=true;endPlayerTurn()});return
  }
  if(action==="escalar"){
    const valid=p.climbing!==null?p.climbing:b.parts.findIndex(x=>x.height===1&&!x.broken);if(valid<0)return toast('Nenhuma parte de Altura 1 disponível.');requestTest(`Escalar ${b.parts[valid].name}`,'str',12,0,(r)=>{if(r.success){p.climbing=valid;p.climbingScore=r.total;state.log.push(`Escalada em ${b.parts[valid].name}: ${r.total}.`)}else state.log.push(`Escalada falhou: ${r.total} vs CD 12.`);p.actionsUsed=true;endPlayerTurn()});return
  }
  if(action==="analisar"){
    requestTest('Analisar Fraqueza','int',20,0,(r)=>{if(r.success){const rawWeak=d(4,'Definição da fraqueza');if(rawWeak===null)return;b.weakness=b.weakness||['Fogo','Gelo','Eletricidade','Ácido'][rawWeak-1];state.log.push(`Análise: sucesso. Fraqueza = ${b.weakness}.`)}else state.log.push(`Análise: ${r.total} vs CD 20 → falha.`);p.actionsUsed=true;endPlayerTurn()});return
  }
  if(action==="ajudar"){c.choices.help=2;p.actionsUsed=true;state.log.push("Ajuda: próximo teste/ataque de aliado recebe +2.");endPlayerTurn();return}
  if(action==="item"){useCombatItem();return}
  if(action==="esquiva"){reactionDodge();return}
  if(action==="bloqueio"){reactionBlock();return}
}
function useCombatItem(){
  if(!requireCombatTurn())return;
  const c=state.character,p=state.combat.player;
  const idx=(c.inventory||[]).findIndex(x=>/Poção de Vida/.test(x));
  if(idx<0)return toast("Nenhuma Poção de Vida na ficha.");
  const heal=/Grande/.test(c.inventory[idx])?c.maxHp:8;c.hp=Math.min(c.maxHp,c.hp+heal);c.inventory.splice(idx,1);state.log.push(`Poção de Vida: +${heal} PV.`);p.actionsUsed=true;endPlayerTurn();
}
function openBeastReactionModal(c,attack,damage,attackRoll,total,finish){
  const p=state.combat.playerStates[c.id]||{};
  const shield=(c.inventory||[]).some(x=>/^Escudo/i.test(x));
  const fatigueOk=Number(c.fatigue||0)<8;
  openModal(`<div class="event-card beast-reaction-card">
    <div class="event-kicker">⚠️ REAÇÃO · ATAQUE DIRETO DA BESTA</div>
    <h2>${attack.name} contra ${c.name||'Caçador'}</h2>
    <p>A Besta acertou o ataque. Pelas regras, ataques diretos podem ser <b>Esquivados ou Bloqueados</b>; ataques de Área não permitem reação.</p>
    <div class="grid grid-3">
      <div class="card"><b>Rolagem da Besta</b><div class="stat">${attackRoll} + ${state.combat.beast.bc} = ${total}</div></div>
      <div class="card"><b>Dano antes da reação</b><div class="stat">${damage}</div></div>
      <div class="card"><b>Reação</b><div class="stat">Disponível</div></div>
    </div>
    <div class="row" style="margin-top:14px">
      <button class="btn primary" onclick="resolveBeastReaction('dodge')" ${fatigueOk?'':'disabled'}>↪ Esquivar${fatigueOk?' · +1 Fadiga':' · Fadiga 8/8'}</button>
      <button class="btn" onclick="resolveBeastReaction('block')" ${shield?'':'disabled'}>🛡 Bloquear${shield?'':' · requer Escudo'}</button>
      <button class="btn danger" onclick="resolveBeastReaction('take')">💥 Sofrer o ataque</button>
    </div>
  </div>`);
}
function finishPendingBeastReaction(){
  const pending=state.combat?.pendingBeastReaction;
  if(!pending)return;
  state.combat.pendingBeastReaction=null;
  closeModal();
  pending.finish(pending.damage);
  startNextRound();
}
function resolveBeastReaction(choice){
  const pending=state.combat?.pendingBeastReaction;if(!pending)return;
  const c=state.characters.find(x=>x.id===pending.characterId);if(!c)return;
  const p=state.combat.playerStates[c.id];
  if(choice==='take'){
    p.reaction=false;
    state.log.push(`🩸 ${c.name||'Caçador'} optou por não reagir ao ataque ${pending.attackName}.`);
    finishPendingBeastReaction();
    return;
  }
  if(choice==='dodge'){
    if(p.reaction===false)return toast('Reação já usada.');
    if(Number(c.fatigue||0)>=8)return toast('Fadiga 8/8: não é possível Esquivar.');
    c.fatigue=Math.min(8,(Number(c.fatigue)||0)+1);
    requestTest(`Esquiva contra ${pending.attackName}`,'dex',state.combat.beast.dodge,0,(r)=>{
      p.reaction=false;
      if(r.fumble){
        state.log.push(`↪ ${c.name}: Esquiva falhou criticamente.`);
        pending.damage*=2;
        finishPendingBeastReaction();
      }else if(r.success){
        state.log.push(`↪ ${c.name}: Esquiva ${r.total} vs CD ${state.combat.beast.dodge} → ataque evitado.`);
        state.combat.pendingBeastReaction=null;
        combatResult('Esquiva bem-sucedida','↪️',`${c.name||'O caçador'} se lança para fora da trajetória do ataque.`,[`Esquiva: d20 ${r.raw} + ${r.mod} = ${r.total}`,`CD da Besta: ${state.combat.beast.dodge}`],[],`${c.name||'O caçador'} percebe o golpe no último instante e escapa por pouco.`);
        startNextRound();
      }else{
        state.log.push(`↪ ${c.name}: Esquiva ${r.total} vs CD ${state.combat.beast.dodge} → falhou.`);
        finishPendingBeastReaction();
      }
    });
    return;
  }
  if(choice==='block'){
    const shield=(c.inventory||[]).some(x=>/^Escudo/i.test(x));
    if(!shield)return toast('Bloqueio exige Escudo.');
    requestTest(`Bloqueio contra ${pending.attackName}`,'str',16,0,(r)=>{
      p.reaction=false;
      if(r.success){
        pending.damage=0;
        state.log.push(`🛡 ${c.name}: Bloqueio ${r.total} → dano anulado.`);
        state.combat.pendingBeastReaction=null;closeModal();
        combatResult('Bloqueio perfeito','🛡️',`${c.name||'O caçador'} intercepta o ataque com o escudo.`,[`Bloqueio: d20 ${r.raw} + ${r.mod} = ${r.total}`,`CD: 16`,'Dano sofrido: 0'],[],`${c.name||'O caçador'} firma os pés e desvia o impacto com o escudo.`);
        startNextRound();
      }else if(r.total>=10){
        pending.damage=Math.floor(pending.damage/2);
        state.log.push(`🛡 ${c.name}: Bloqueio parcial ${r.total} → metade do dano.`);
        finishPendingBeastReaction();
      }else{
        state.log.push(`🛡 ${c.name}: Bloqueio falhou (${r.total}).`);
        finishPendingBeastReaction();
      }
    });
  }
}
function reactionDodge(){
  if(!state.combat)return;
  const c=state.characters.find(x=>x.id===state.activeCharacterId);const p=state.combat.playerStates?.[c?.id];
  if(!c||!p)return;
  if(state.combat.currentTurnType==='beast' && state.combat.pendingBeastReaction?.characterId===c.id)return resolveBeastReaction('dodge');
  if(p.reaction===false)return toast('Reação já usada.');
  toast('Esquiva só pode ser escolhida quando um ataque direto da Besta exigir uma reação.');
}
function reactionBlock(){
  if(!state.combat)return;
  const c=state.characters.find(x=>x.id===state.activeCharacterId);const p=state.combat.playerStates?.[c?.id];
  if(!c||!p)return;
  if(state.combat.currentTurnType==='beast' && state.combat.pendingBeastReaction?.characterId===c.id)return resolveBeastReaction('block');
  toast('Bloqueio só pode ser escolhido quando um ataque direto da Besta exigir uma reação.');
}
function endPlayerTurn(){
  const order=state.combat.playerOrder||[];
  const idx=order.findIndex(x=>x.id===state.combat.currentTurnId);
  if(idx<0){beastTurn();return}
  state.combat.playerStates[state.combat.currentTurnId].actionsUsed=false;
  const next=order.slice(idx+1).find(x=>!state.combat.playerStates[x.id]?.dead);
  if(next){
    state.combat.currentPlayerIndex=order.findIndex(x=>x.id===next.id);
    state.combat.currentTurnId=next.id;
    state.combat.currentTurnType='player';
    setCombatActor(next.id);
    render();
    return;
  }
  state.combat.currentTurnType='beast';
  state.combat.currentTurnId=null;
  state.activeCharacterId=order.find(x=>!state.combat.playerStates[x.id]?.dead)?.id||state.activeCharacterId;
  if(state.activeCharacterId)setCombatActor(state.activeCharacterId);
  beastTurn();
}
function beastTurn(){
  const b=state.combat.beast;
  state.combat.currentTurnType='beast';state.combat.currentTurnId=null;
  if(b.hp<=0){checkBeastDefeat();return}
  state.combat.reaction=true;
  const alive=(state.characters||[]).filter((c)=>c.hp>0 && !state.combat.playerStates?.[c.id]?.dead);
  if(!alive.length){endCombat();return}
  const hasClimber=alive.some(c=>(state.combat.playerStates[c.id]?.climbing!==null));
  const hasHidden=alive.some(c=>(state.combat.playerStates[c.id]?.hidden));
  const attackSlots=(b.attacks||[]).map((a,i)=>a?`<span class="tag ${i+1===b.attackMarker?'primary':''}">${i+1}. ${a.name||'Ataque conhecido'}</span>`:`<span class="tag">${i+1}. Desconhecido</span>`).join(' ');
  openModal(`<div class="event-card beast-turn-card">
    <div class="event-kicker">👹 TURNO DA BESTA · RODADA ${state.combat.round}</div>
    <h2>${b.species} escolhe seu próximo ataque</h2>
    <p class="muted">Regra do livro: role 1d20 e converta em um número de ataque. A Besta avança, repete ou recua apenas 1 posição em relação ao último ataque usado.</p>
    <div class="card"><b>Sequência de ataques</b><div class="row" style="margin-top:8px">${attackSlots}</div><p class="muted">Último ataque: <b>#${b.attackMarker||3}</b></p></div>
    <div class="grid grid-2" style="margin-top:12px">
      <div class="field"><label>Modo das rolagens da Besta</label><select id="beastDiceMode"><option value="auto" ${(state.rollMode||'auto')==='auto'?'selected':''}>🎲 Automático</option><option value="manual" ${(state.rollMode||'auto')==='manual'?'selected':''}>✋ Mestre rola e informa</option></select></div>
      <div class="field"><label>Escolha do alvo</label><div class="tag">A regra escolhe automaticamente conforme o tipo do ataque</div></div>
    </div>
    <div class="card" style="margin-top:12px"><b>🎬 Sugestão de narração</b><p id="beastNarration" class="muted">A Besta observa o grupo e prepara seu próximo movimento...</p></div>
    <div class="row" style="margin-top:12px">
      <button class="btn primary" onclick="executeBeastTurn()">▶ Rolar e executar ataque</button>
      <button class="btn" onclick="closeModal();startNextRound()">⏭️ Passar turno</button>
    </div>
  </div>`);
}
function updateBeastNarration(intent){
  const el=document.getElementById('beastNarration');if(!el)return;
  const texts={
    attack:'A criatura avança de repente, procurando a abertura mais fácil na defesa do grupo.',
    brutal:'A Besta abandona a cautela e desfere um golpe pesado, capaz de mudar o rumo da rodada.',
    precise:'Ela finge atacar de um lado e concentra toda a força no ponto mais vulnerável do alvo.',
    shake:'A criatura se debate com violência, tentando lançar ao chão quem ousou subir em seu corpo.',
    hunt:'Ela fareja, escuta e vasculha o terreno até encontrar o caçador que tentou desaparecer.',
    roar:'Um rugido monstruoso ecoa pelo campo. Por um instante, até os mais corajosos hesitam.',
    special:'A Fúria da Besta desperta. O Mestre pode narrar a manifestação de acordo com sua personalidade.',
    reposition:'A criatura recua, muda o ângulo e prepara uma posição muito mais difícil de atacar.'
  };el.textContent=texts[intent]||texts.attack;
}
function beastRoll(mode,label){
  if(mode==='manual'){
    let raw=window.prompt(`${label} — role 1d20 fisicamente e informe o resultado (1–20):`);
    if(raw===null){toast('Rolagem da Besta cancelada.');return null}
    let value=Number(raw);
    while(!Number.isInteger(value)||value<1||value>20){raw=window.prompt('Resultado inválido. Digite um número de 1 a 20.');if(raw===null)return null;value=Number(raw)}
    return value;
  }
  return d(20,label);
}
function convertBeastAttackRoll(raw){return raw<=3?1:raw<=6?2:raw<=10?3:raw<=14?4:raw<=17?5:6}
function discoverBlankAttack(slot,mode){
  return resolveOfficialBlankAttack(slot,mode,true);
}

function executeBeastTurn(){
  const b=state.combat.beast;
  const mode=document.getElementById('beastDiceMode')?.value||state.rollMode||'auto';
  const hasClimber=(state.characters||[]).some(c=>c.hp>0&&(state.combat.playerStates[c.id]?.climbing!==null));
  if(hasClimber){closeModal();return executeBeastShake((state.characters||[]).find(c=>c.hp>0&&state.combat.playerStates[c.id]?.climbing!==null));}
  const choice=beastRoll(mode,'Escolha do ataque da Besta'); if(choice===null)return;
  const previous=b.attackMarker||3;
  const rolled=convertBeastAttackRoll(choice);
  let next=rolled===previous?previous:(rolled>previous?Math.min(6,previous+1):Math.max(1,previous-1));
  let attack=b.attacks?.[next-1];
  if(!attack)attack=discoverBlankAttack(next-1,mode);
  if(!attack)return;
  b.attackMarker=next;
  closeModal();
  state.combat.currentTurnType='beast';state.combat.currentTurnId=null;state.combat.reaction=true;state.combat.pendingDamage=0;state.combat.cancelAttack=false;state.combat.blockMode=null;
  const alive=livingCombatants();
  const direct=attack.type==='direct';
  const candidates=alive.filter(c=>!state.combat.playerStates[c.id]?.hidden); const target=direct ? (()=>{const pool=(candidates.length?candidates:alive);const min=Math.min(...pool.map(c=>c.hp));const ties=pool.filter(c=>c.hp===min);return ties[Math.floor(Math.random()*ties.length)]})() : alive[0];
  const targets=attack.name==='Impacto'?alive.filter(c=>state.combat.playerStates[c.id]?.climbing===null):(attack.type==='area'?alive:(target?[target]:[]));
  const D=b.dmg;
  const effects=[`Rolagem de escolha: d20 ${choice} → resultado ${rolled}`,`Ataque anterior: #${previous} → ataque usado: #${next}`,`Ataque: ${attack.name}`,`Efeito da ficha/tabela: ${attack.effect||'Ataque direto da ficha'}`];
  if(attack.discovered)effects.push(`Ataque #${next} foi descoberto e agora permanece conhecido.`);
  if(attack.type==='self'){
    if(attack.name==='Regeneração'){let total=0;b.parts.forEach(p=>{const n=Math.min(5,p.maxArmor-p.armor);p.armor+=n;total+=n});combatResult('Regeneração','🔥',`${b.species} recupera sua Couraça.`,[...effects,`Couraça recuperada: ${total}`]);}
    else if(attack.name==='Concentração'){b.nextAttackBonus=Math.floor(D/2);combatResult('Concentração','🎯',`${b.species} concentra energia para o próximo ataque.`,[...effects,`Próximo ataque: +${Math.floor(D/2)} dano [Elemento]`]);}
    else if(attack.name==='Camuflagem'){b.hiddenUntilRound=state.combat.round+1;b.nextAttackBonus=3;combatResult('Camuflagem','🌫️',`${b.species} desaparece entre sombras e prepara um contra-ataque.`,[...effects,'Não pode ser alvo por 1 rodada','Próximo ataque: +3']);}
    else {combatResult(attack.name,'👹',`${b.species} executa ${attack.name}.`,effects)}
    return startNextRound();
  }
  if(attack.name==='Invocar Animal'){const terrain=normalizeTerrainForAnimals(state.map?.cells?.[state.map?.current]?.terrain||state.map?.cells?.[state.map?.selected]?.terrain||'Floresta');const a=spawnWildAnimal(terrain,null,'Invocar Animal');if(a){combatResult('Invocar Animal','🐺',`${b.species} invoca um ${a.name}.`,[...effects,`Animal: ${a.name}`,`PV: ${a.hp}/${a.maxHp}`,`Dano: ${a.damage}`,`Atq: +${a.attackBonus}`,`Defesa operacional: ${a.def}`,`Iniciativa: ${a.initiative}`,`Efeito: ${a.effect||'—'}`]);}else combatResult('Invocar Animal','🐺',`${b.species} tenta invocar um animal, mas não há tabela de animais para este terreno no livro.`,effects);return startNextRound()}
  if(attack.name==='Rugido'){alive.forEach(c=>{const ps=state.combat.playerStates[c.id];ps.skipTurns=(ps.skipTurns||0)+1;ps.skipReason='Rugido: perca o próximo turno ou gaste 1 Fadiga para agir.'});combatResult('Rugido','🗣️',`${b.species} solta um rugido que paralisa o grupo por um instante.`,[...effects,'Cada caçador deve perder o próximo turno ou gastar 1 Fadiga para agir.']);return startNextRound()}
  const applyOne=(c)=>{
    const p=state.combat.playerStates[c.id]||{}; let damage=D; let hpBefore=c.hp;
    if(attack.name==='Arremesso')damage=D+4;
    if(attack.name==='Impacto')damage=Math.max(0,D-1);
    if(attack.name==='Golpe Venenoso')damage=Math.max(0,D-1);
    if(attack.name==='Jato')damage=Math.max(0,D-2);
    if(attack.name==='Sopro / Rajada')damage=D+4;
    if(attack.name==='Paralisante')damage=D;
    if(attack.name==='Encontrão')damage=D;
    if(b.nextAttackBonus){damage+=b.nextAttackBonus;b.nextAttackBonus=0}
    const attackRoll=beastRoll(mode,`Ataque ${attack.name} contra ${c.name||'o caçador'}`);if(attackRoll===null)return false;
    const total=attackRoll+b.bc;
    const directAttack=attack.type!=='area';
    if(directAttack && attackRoll===1){
      combatResult('Falha da Besta','💨',`${b.species} erra o ataque contra ${c.name||'o caçador'}.`,[...effects,`Rolagem: d20 1 + BC ${b.bc} = ${total}`,`Defesa: ${c.def}`]);
      return true;
    }
    const hit=attack.name==='Arremesso'||attack.name==='Golpe Venenoso'||attack.name==='Encontrão'||attack.name==='Ataque 3 (ficha)'||attack.name==='Ataque 2 (ficha)'||attack.name==='Ataque 1 (ficha)' ? (attackRoll===20||total>=c.def) : true;
    if(directAttack&&!hit){
      combatResult('A Besta errou','🛡️',`${b.species} tentou atingir ${c.name||'o caçador'}, mas a defesa segurou o golpe.`,[...effects,`Rolagem: d20 ${attackRoll} + BC ${b.bc} = ${total}`,`Defesa: ${c.def}`]);
      return true;
    }
    const finish=(finalDamage=damage)=>{
      const before=c.hp;
      const actual=applyPlayerDamage(finalDamage,'Normal',c);
      const extra=[];
      if(attack.name==='Arremesso'){p.skipTurns=(p.skipTurns||0)+1;p.skipReason='Arremesso: perca o próximo turno.';extra.push('Alvo perde o próximo turno.');}
      if(attack.name==='Paralisante'){alive.forEach(t=>{const ps=state.combat.playerStates[t.id];ps.skipTurns=(ps.skipTurns||0)+1;ps.skipReason='Paralisante: perca o próximo turno ou gaste 2 Fadiga para agir.'});extra.push('Todos perdem o próximo turno, a menos que gastem 2 Fadiga.');}
      if(attack.name==='Golpe Venenoso'){p.poisoned=true;p.poisonNights=p.poisonNights||0;extra.push('Alvo fica Envenenado: não recupera PV e sofre 1d6 de dano imbloqueável a cada noite, até Antídoto, Templo ou 3 noites.');}
      if(c.hp===0)extra.push('☠ Personagem chegou a 0 PV e está Morrendo.');
      combatResult(c.hp===0?'Personagem derrubado!':'Ataque da Besta','👹',`${b.species} usa ${attack.name} contra ${c.name||'o caçador'}.`,[...effects,`Rolagem: d20 ${attackRoll} + BC ${b.bc} = ${total}`,`Defesa: ${c.def}`,`Dano Base: ${finalDamage}`,`Dano sofrido: ${actual}`,`PV: ${before} → ${c.hp}`,...extra],[],cinematicAttackNarration(c.hp===0?'downed':'normal',b.species,c.name||'o caçador'));
    };
    if(directAttack && p.reaction!==false && c.hp>0){
      state.combat.pendingBeastReaction={characterId:c.id,attackName:attack.name,damage,effects,attackRoll,total,mode,finish};
      openBeastReactionModal(c,attack,damage,attackRoll,total,finish);
      return 'pending';
    }
    finish();
    return true;
  };
  const reactionPending=targets.map(applyOne).includes('pending');
  if(reactionPending)return;
  startNextRound();
}
function executeBeastShake(c){
  const b=state.combat.beast,p=state.combat.playerStates[c.id]||{};
  if(p.climbing===null){state.log.push(`🧗 ${c.name||'o caçador'} não está escalando; a Besta perde a oportunidade.`);return startNextRound();}
  const raw=d(20,'Teste da Besta para chacoalhar');if(raw===null)return;const shake=raw+b.bc;
  if(shake>=p.climbingScore){
    const hpBefore=c.hp; p.climbing=null;const dmg=Math.max(2,(b.parts[0]?.height||1)*3);c.hp=Math.max(0,c.hp-dmg);state.log.push(`🧗 ${b.species} chacoalha ${c.name||'o caçador'}: ${shake} vs Escalada ${p.climbingScore} → queda de ${dmg} dano.`);if(c.hp===0)handleDowned();combatResult('Queda!','🧗',`${b.species} chacoalhou ${c.name||'o caçador'} e o derrubou.`,[`Rolagem: ${shake} vs Escalada ${p.climbingScore}`,`Dano da queda: ${dmg}`,`PV: ${hpBefore} → ${c.hp}`]);
  }else state.log.push(`🧗 ${b.species} tenta chacoalhar ${c.name||'o caçador'}: ${shake} vs ${p.climbingScore} → ele se segura.`);
  startNextRound();
}
function executeBeastHunt(c){
  const b=state.combat.beast,p=state.combat.playerStates[c.id]||{};
  const raw=d(20,'Percepção da Besta');if(raw===null)return;const seek=raw+b.bc;
  if(p.hidden && seek>=p.hideScore){p.hidden=false;state.log.push(`👁️ ${b.species} fareja ${c.name||'o caçador'} e revela seu esconderijo.`);combatResult('Esconderijo descoberto','👁️',`${b.species} encontrou ${c.name||'o caçador'} escondido.`,[`Percepção da Besta: ${seek}`,`Esconderijo: ${p.hideScore}`]);}else {state.log.push(`👁️ ${b.species} procura ${c.name||'o caçador'} (${seek}) sem encontrá-lo.`);combatResult('A Besta não encontrou o alvo','👁️',`${b.species} procurou ${c.name||'o caçador'}, mas não conseguiu localizá-lo.`,[`Percepção da Besta: ${seek}`,`Esconderijo: ${p.hideScore}`]);}
  startNextRound();
}
function executeBeastSpecial(c){
  const b=state.combat.beast;
  const special=b.fury||'Ataque Especial';
  if(special==='Restauração'){const heal=Math.min(b.maxHp-b.hp,Math.max(3,Math.floor(b.maxHp*.1)));b.hp+=heal;state.log.push(`🔥 Restauração: ${b.species} recupera ${heal} PV.`);combatResult('Restauração','🔥',`${b.species} recupera forças em plena batalha.`,[`+${heal} PV para a Besta`,`PV: ${b.hp-heal} → ${b.hp}`])}
  else if(special==='Terremoto'){(state.characters||[]).filter(x=>x.hp>0).forEach(x=>{x.hp=Math.max(0,x.hp-2);x.fatigue=Math.min(8,(x.fatigue||0)+1);});state.log.push('🔥 Terremoto: todos sofrem 2 dano e +1 Fadiga.');combatResult('Terremoto','🌋',`${b.species} golpeia o terreno e abala todo o grupo.`,['Todos os personagens: −2 PV','Todos os personagens: +1 Fadiga'])}
  else if(special==='Aura Elemental'){b.dmg+=2;state.log.push(`🔥 Aura Elemental: dano da ${b.species} aumenta em 2.`);combatResult('Aura Elemental','🔥',`${b.species} envolve-se em energia elemental.`,['+2 dano da Besta'])}
  else if(special==='Invocar Animais'){state.log.push('🔥 Invocar Animais: o Mestre pode narrar criaturas menores cercando o grupo; até a próxima rodada, todos os ataques dos caçadores sofrem −1.') ;state.combat.huntersPenalty=1;combatResult('Invocar Animais','🐺',`${b.species} invoca criaturas menores para pressionar os caçadores.`,['Ataques dos caçadores: −1 até a próxima rodada'])}
  else if(special==='Força Elemental'){b.dmg+=3;state.log.push(`🔥 Força Elemental: ${b.species} recebe +3 dano neste combate.`);combatResult('Força Elemental','⚡',`${b.species} concentra poder elemental em seus ataques.`,['+3 dano da Besta neste combate'])}
  else {const raw=d(20,'Ataque Especial da Besta');if(raw===null)return;const atk=raw+b.bc;const damage=b.dmg+3;const hpBefore=c.hp;if(atk>=c.def)applyPlayerDamage(damage,'Normal',c);state.log.push(`🔥 Ataque Especial contra ${c.name||'o caçador'}: ${atk} vs Defesa ${c.def}.`);combatResult(atk>=c.def?'Ataque especial!':'Ataque especial falhou','🔥',`${b.species} manifesta sua Fúria contra ${c.name||'o caçador'}.`,[`Rolagem: ${atk} vs Defesa ${c.def}`,`Dano bruto: ${damage}`,`PV: ${hpBefore} → ${c.hp}`]);}
  startNextRound();
}
function groupDamageBonus(){const p=state.combat.beast.players;return p===6?0:p===1?-2:p===2?-1:0}
function applyPlayerDamage(amount,type,target=null){
  const c=target||state.character;
  if(!c)return 0;
  const ps=state.combat?.playerStates?.[c.id]||{};
  let dmg=Number(amount)||0;
  const block=ps.blockMode||null;
  if(block==='full')dmg=0;
  else if(block==='half')dmg=Math.floor(dmg/2);
  if(type==='Normal')dmg=Math.max(0,dmg-(Number(c.pp)||0));
  if(c.class==='Bárbaro'&&c.choices?.rage&&type==='Normal')dmg=Math.max(0,dmg-2);
  // Regras raciais defensivas já representadas na ficha.
  if(c.race==='Ogro'&&type==='Normal')dmg=Math.max(0,dmg-2);
  c.hp=Math.max(0,(Number(c.hp)||0)-dmg);
  state.log.push(`${c.name||'Caçador'} sofre ${dmg} dano.`);
  if(c.hp===0)handleDowned(c);
  return dmg;
}
function handleDowned(c=state.character){
  if(!c)return;
  const p=state.combat?.playerStates?.[c.id]||{};
  p.downTurns=3;p.dead=false;p.actionsUsed=true;
  if(state.combat?.playerStates)cState(c.id,p);
  state.log.push(`☠ ${c.name||'Caçador'} chegou a 0 PV: Morrendo. Primeiros Socorros CD 12, Poção de Vida ou Cura estabilizam.`);
}
function cState(id,p){if(state.combat?.playerStates)state.combat.playerStates[id]=p;}
function livingCombatants(){
  return (state.characters||[]).filter(c=>Number(c.hp)>0&&!state.combat?.playerStates?.[c.id]?.dead);
}
function checkPartyDefeat(){
  const alive=livingCombatants();
  if(!alive.length){
    state.log.push('☠ Todo o grupo está incapacitado. A caçada foi perdida.');
    combatResult('Grupo derrotado','☠️','Todos os personagens estão em 0 PV.', ['A Besta permanece em combate.','O Mestre deve decidir a consequência narrativa.']);
    return true;
  }
  return false;
}
function handleBeastDefeat(){
  const resolved=checkBeastDefeat();
  if(resolved){save();render();}
  return resolved;
}
function checkBeastDefeat(){
  if(state.combat?.beast?.hp<=0){
    const b=state.combat.beast;
    if(state.combat.npcEncounter){const n=state.npcs.find(x=>x.id===state.combat.npcId);if(n){n.hp=0;n.status='Incapacitado';}state.log.push(`⚔️ NPC ${b.species} foi derrotado em combate.`);combatResult('NPC derrotado','⚔️',`${b.species} foi derrotado no conflito.`,['O resultado fica sob controle do Mestre.','Nenhuma recompensa automática de Lenda foi aplicada.']);toast(`NPC derrotado · ${b.species}`);return true;}
    const travel=state.combat.travelEncounter;
    if(travel){const effects=[`${b.species} foi derrotado no encontro de viagem.`,`Terreno: ${travel.terrain}`];if(travel.poiIndex!=null&&Number(travel.poiCell)===Number(state.map.selected)){mapPOIResult(`${travel.poiCell}:${travel.rare?'rare':'encounter'}`,`${b.species} derrotado no encontro.`)}if(travel.loot)effects.push('O encontro possui recompensa/saque associado à tabela; resolva o saque conforme a cena.');state.log.push(`🏆 Encontro de viagem vencido: ${b.species}.`);combatResult('Encontro vencido','🏆',`${b.species} foi derrotado.`,effects);toast(`Encontro vencido · ${b.species}`);return true;}
    const gain=b.rank<=2?1:b.rank<=4?2:3;(state.characters||[state.character]).forEach(c=>c.legend=(c.legend||0)+gain);state.log.push(`🏆 Besta abatida! +${gain} Lenda para cada participante.`);combatResult('Besta abatida!','🏆',`${b.species} foi derrotada.`,[`+${gain} Lenda para cada participante`,`Participantes: ${(state.characters||[]).map(c=>c.name).join(', ')}`]);toast(`Besta derrotada · +${gain} Lenda`);return true;
  }
  return false;
}
function startNextRound(fromAnimalPhase=false){
  if(checkBeastDefeat())return;
  if(!fromAnimalPhase && state.combat?.currentTurnType==='beast' && livingAnimals().length){ return startAnimalPhase(); }
  if(fromAnimalPhase && state.combat?.currentTurnType==='animal'){}
  if(checkPartyDefeat())return;
  state.combat.round++;
  const order=state.combat.playerOrder||[];
  order.forEach(x=>{
    const ps=state.combat.playerStates[x.id];
    if(ps){
      ps.actionsUsed=false;
      ps.reaction=true;
      ps.blockMode=null;
      if(ps.downTurns>0)ps.downTurns--;
    }
  });
  const first=order.find(x=>Number(state.characters.find(c=>c.id===x.id)?.hp)>0&&!state.combat.playerStates[x.id]?.dead);
  if(first){
    state.combat.currentPlayerIndex=order.findIndex(x=>x.id===first.id);
    state.combat.currentTurnId=first.id;
    state.combat.currentTurnType='player';
    setCombatActor(first.id);
  }
  state.combat.reaction=true;
  state.log.push(`— Rodada ${state.combat.round} —`);
  render();
}
function combatAction(a){ // compatibilidade com versões anteriores
  if(a==="Esquivar")reactionDodge();else if(a==="Bloquear")reactionBlock();else playerAction(a==="Manifestação"?"analisar":a==="Poção"?"item":"proximo");
}
function endCombat(){
  const wasTravel=!!state.combat?.travelEncounter;
  const npcId=state.combat?.npcId;
  const npcBattle=!!state.combat?.npcEncounter;
  const returnContext=state.combat?.returnContext||null;
  let npcReturn=null;
  if(npcBattle&&npcId){
    const n=state.npcs.find(x=>x.id===npcId);
    if(n&&state.combat?.beast){
      n.hp=Math.max(0,Math.min(n.maxHp||999,state.combat.beast.hp));
      n.status=n.hp<=0?'Incapacitado':'Ativo';
      npcReturn={name:n.name,hp:n.hp,maxHp:n.maxHp,status:n.status};
    }
  }
  const npcDefeated=!!(npcBattle&&npcReturn?.status==='Incapacitado');
  if(npcBattle&&returnContext?.type==='npc-dialogue'){
    state.map.selected=Number(returnContext.cell??state.map.selected);
    if(returnContext.poiIndex!=null){
      const key=mapPOIKey(Number(returnContext.poiIndex));
      if(key) mapPOIResult(key,
        npcDefeated
          ? `⚔️ Conflito com ${npcReturn?.name||'NPC'} encerrado: NPC incapacitado (${npcReturn?.hp??0}/${npcReturn?.maxHp??'—'} PV). O diálogo não foi reaberto.`
          : `⚔️ Conflito com ${npcReturn?.name||'NPC'} encerrado: ${npcReturn?.hp??'—'}/${npcReturn?.maxHp??'—'} PV. O diálogo permanece disponível.`,
        npcDefeated?'concluido':'andamento'
      );
    }
  }
  state.combat=null;
  save();
  toast(npcBattle?"Conflito com NPC encerrado":"Combate encerrado");
  if(npcBattle&&returnContext?.type==='npc-dialogue'){
    state.lastResult={
      title:'Conflito com NPC encerrado',icon:'✓',
      text:npcDefeated
        ? `${npcReturn?.name||'NPC'} ficou incapacitado. O mapa foi preservado e o diálogo não será reaberto automaticamente.`
        : `${npcReturn?.name||'NPC'} sobreviveu ao conflito. O mapa foi preservado e o diálogo continua disponível.`,
      effects:[
        `PV do NPC: ${npcReturn?.hp??'—'}/${npcReturn?.maxHp??'—'}`,
        `Estado: ${npcReturn?.status||'Ativo'}`,
        `Retorno: mapa`,
        `Diálogo automático: ${npcDefeated?'não':'sim'}`
      ]
    };
    show('map');
    if(!npcDefeated){
      setTimeout(()=>{
        const idx=poiDataForCell(mapCell(state.map.selected)).findIndex(p=>p.id==='npcs');
        if(idx>=0&&npcId){openMapPOI(idx);setTimeout(()=>interactMapNPC(idx,npcId),0);}
      },0);
    }
    save();
    return;
  }
  show(wasTravel?'map':npcBattle?'npcs':'beast');
}
function addQuest(){const q=prompt('Nome da missão/objetivo:');if(!q)return;state.gm.quests.push({id:uid('q'),text:q,done:false});render()}
function toggleQuest(id){const q=state.gm.quests.find(x=>x.id===id);if(q)q.done=!q.done;render()}
function saveGMNotes(){state.gm.notes=document.getElementById('gmNotes')?.value||'';state.gm.phaseNote=document.getElementById('gmPhaseNote')?.value||'';save();toast('Anotações do Mestre salvas.');render()}
function sessionDashboard(){
  ensureCampaignMap();
  migrateParty();
  const chars=state.characters||[];
  const cell=mapCell(state.map.current)||{};
  const pending=[];
  state.npcs.forEach(n=>{
    migrateNPC(n);
    n.events.forEach(e=>{
      normalizeNPCEvent(e,n);
      if(e.status==='pending' && state.map.day>=e.day) pending.push({n,e,current:npcEventMatchesArrival(e,n,cell)});
    });
  });
  const currentEvents=pending.filter(x=>x.current);
  const low=chars.filter(c=>(Number(c.hp)||0)>0 && Number(c.hp||0)<=Math.max(1,Number(c.maxHp||1)*.25));
  const down=chars.filter(c=>(Number(c.hp)||0)<=0);
  const exhausted=chars.filter(c=>(Number(c.fatigue)||0)>=8);
  const supplies=chars.reduce((a,c)=>a+Number(c.supplies||0),0);
  const torches=chars.reduce((a,c)=>a+Number(c.torches||0),0);
  const gold=chars.reduce((a,c)=>a+Number(c.gold??c.po??0),0);
  const pp=chars.reduce((a,c)=>a+Number(c.pp||0),0);
  const legend=chars.reduce((a,c)=>a+Number(c.legend||0),0);
  const objective=state.map.objective||state.gm.quests.find(q=>!q.done)?.text||'Defina o próximo objetivo da sessão.';
  const activeQuest=state.gm.quests.find(q=>!q.done);
  const alerts=[];
  if(down.length) alerts.push(`🔴 ${down.length} personagem(ns) está(ão) caído(s).`);
  if(low.length) alerts.push(`🟠 PV baixo: ${low.map(c=>c.name||'Sem nome').join(', ')}.`);
  if(exhausted.length) alerts.push(`😴 Fadiga crítica: ${exhausted.map(c=>c.name||'Sem nome').join(', ')}.`);
  if(supplies<=Math.max(0,chars.length*2)) alerts.push('🎒 As provisões do grupo estão baixas.');
  if(state.tracks>=3) alerts.push('🔎 O rastreamento está completo: a caçada pode avançar para a Besta.');
  if(currentEvents.length) alerts.push(`⚡ ${currentEvents.length} evento(s) de NPC pode(m) ser acionado(s) neste local.`);
  if(state.combat) alerts.push(`⚔️ Combate em andamento · rodada ${state.combat.round||1}.`);
  if(!alerts.length) alerts.push('✅ Nenhum alerta crítico no momento.');
  const tips={
    Cidade:'Use a cidade para preparar o grupo, revisar recursos e apresentar NPCs antes da próxima viagem.',
    Viagem:'Ao entrar em um novo hexágono, confira terreno, clima, eventos e NPCs antes de narrar a próxima cena.',
    Rastreamento:'Dê pistas visíveis ao grupo e deixe os jogadores escolherem como investigar; o Mestre decide a consequência.',
    Combate:'No turno da Besta, escolha uma intenção antes do ataque e narre a reação da criatura ao estado do grupo.',
    Masmorra:'Use o ambiente para criar escolhas: perigo, exploração, recurso ou oportunidade narrativa.',
    Extração:'Depois da vitória, transforme cada parte obtida em uma decisão: extrair agora, arriscar mais ou voltar à cidade.',
    Forja:'Mostre ao grupo o que pode ser criado com as partes conquistadas para dar peso às recompensas.'
  };
  const tip=tips[state.map.phase]||'Observe o estado atual do grupo e transforme a próxima ação em uma escolha clara para os jogadores.';
  return `<div class="session-hero"><div><div class="event-kicker">CENTRAL DA SESSÃO</div><h2>${state.campaign?.name||'Painel do Mestre'}</h2><p>${state.map.phase} · Dia ${state.map.day} · ${cell.locality||cell.terrain||'Local desconhecido'} · Hex ${state.map.current}</p></div><div class="session-hero-actions"><span class="tag">Sessão ${state.gm.session}</span><button class="btn primary" onclick="show('map')">🗺️ Mapa</button><button class="btn" onclick="show('combat')">⚔️ Combate</button></div></div>
  <div class="session-grid">
    <section class="card session-objective"><div class="between"><h3>🎯 Objetivo atual</h3><button class="btn" onclick="addQuest()">＋ Objetivo</button></div><div class="session-objective-main">${objective}</div><p class="muted">${activeQuest?'Objetivo manual ativo.':'Objetivo definido pela fase da campanha.'}</p><div class="row"><span class="tag">Fase: ${state.map.phase}</span><span class="tag">Rastros: ${state.tracks}/3</span><span class="tag">Local: ${cell.locality||cell.terrain||'—'}</span></div></section>
    <section class="card"><h3>💡 Dica narrativa</h3><p class="session-tip">${tip}</p><button class="btn" onclick="showGMNarrativeTip()">🎭 Ver sugestão do Mestre</button></section>
  </div>
  <div class="grid grid-3 session-stats">
    <div class="card"><span class="label">👥 Grupo</span><div class="stat">${chars.length}/6</div><div class="muted">${down.length?'⚠️ '+down.length+' caído(s)':low.length?'🟠 '+low.length+' em risco':'🟢 Grupo operacional'}</div></div>
    <div class="card"><span class="label">🎒 Provisões</span><div class="stat">${supplies}</div><div class="muted">${torches} tochas · ${gold} PO · ${pp} PP</div></div>
    <div class="card"><span class="label">🏆 Lenda</span><div class="stat">${legend}</div><div class="muted">Total acumulado do grupo</div></div>
  </div>
  <div class="session-grid session-main-grid">
    <section class="card"><div class="between"><h3>👥 Estado do grupo</h3><button class="btn" onclick="show('party')">Abrir grupo</button></div>${chars.length?chars.map(c=>{const hp=Number(c.hp||0),max=Math.max(1,Number(c.maxHp||1)),fat=Number(c.fatigue||0),cls=hp<=0?'danger':hp<=max*.25?'warn':'ok';return `<div class="session-party-row"><div><b>${c.name||'Sem nome'}</b><div class="muted">${c.race||'Raça'} · ${c.class||'Classe'}</div></div><div class="session-bar"><span>PV ${hp}/${max}</span><i class="${cls}" style="width:${Math.max(0,Math.min(100,hp/max*100))}%"></i></div><div class="session-mini">Fadiga ${fat} · ${Number(c.supplies||0)} prov.</div></div>`}).join(''):'<p class="muted">Nenhum personagem foi adicionado ao grupo.</p>'}</section>
    <section class="card"><div class="between"><h3>⚠️ Alertas</h3><span class="tag">${alerts.length}</span></div><div class="session-alerts">${alerts.map(a=>`<div class="session-alert">${a}</div>`).join('')}</div></section>
  </div>
  <div class="session-grid">
    <section class="card"><div class="between"><h3>⚡ Eventos pendentes</h3><button class="btn" onclick="show('npcs')">Gerenciar NPCs</button></div>${pending.length?pending.slice(0,6).map(x=>`<div class="session-event-row"><div><b>${x.e.title}</b><div class="muted">${x.n.name} · Dia ${x.e.day} · ${eventTargetLabel(x.e)}</div></div><span class="tag ${x.current?'session-hot':''}">${x.current?'ATIVO AQUI':'PENDENTE'}</span></div>`).join(''):'<p class="muted">Nenhum evento pendente para hoje.</p>'}</section>
    <section class="card"><div class="between"><h3>📌 Próximos objetivos</h3><button class="btn" onclick="addQuest()">＋ Adicionar</button></div>${state.gm.quests.filter(q=>!q.done).slice(0,5).map(q=>`<div class="session-event-row"><div><b>○ ${q.text}</b></div><button class="btn" onclick="toggleQuest('${q.id}')">Concluir</button></div>`).join('')||'<p class="muted">Nenhum objetivo manual pendente.</p>'}</section>
  </div>
  <div class="card session-actions"><h3>🎛️ Ações rápidas do Mestre</h3><div class="row"><button class="btn primary" onclick="show('map')">🗺️ Explorar mapa</button><button class="btn" onclick="show('tracking')">🔎 Rastreamento</button><button class="btn" onclick="show('npcs')">🎭 NPCs e eventos</button><button class="btn" onclick="show('beast')">🐲 Preparar Besta</button><button class="btn" onclick="healParty()">❤️ Recuperar grupo</button><button class="btn" onclick="resetPartyFatigue()">😴 Zerar Fadiga</button></div></div>`;
}
function showGMNarrativeTip(){
  const tips=[
    'Pergunte aos jogadores o que pretendem fazer antes de revelar a solução. A decisão deles deve determinar a próxima cena.',
    'Quando houver perigo, descreva primeiro os sinais do problema e só depois peça o teste. Isso aumenta a tensão.',
    'Dê às consequências uma forma visível: uma mudança no NPC, no mapa, nos recursos ou na situação do grupo.',
    'Em combate, faça a Besta reagir ao comportamento dos caçadores; ela não precisa repetir o mesmo ataque todo turno.',
    'Se a mesa estiver parada, introduza uma informação ou escolha pequena em vez de simplesmente avançar o tempo.'
  ];
  openModal(`<div class="event-card"><div class="event-kicker">DICA NARRATIVA DO MESTRE</div><h2>🎭 Conduza a próxima cena</h2><p>${tips[Math.floor(Math.random()*tips.length)]}</p><p class="muted">Fase atual: ${state.map.phase} · Dia ${state.map.day}</p><button class="btn primary" onclick="closeModal()">Continuar</button></div>`);
}
function campaigns(){return sessionDashboard()}
function tipsView(){
  const phaseTips={
    Cidade:[
      'Apresente NPCs e rumores antes da partida para dar direção à sessão.',
      'Use a cidade para preparar recursos, equipamentos e objetivos claros.',
      'Se o grupo estiver indeciso, ofereça duas ou três escolhas concretas em vez de uma solução pronta.'
    ],
    Viagem:[
      'Ao entrar em um hexágono, descreva primeiro o ambiente e só depois revele os pontos de interesse.',
      'Use clima, terreno e recursos para transformar deslocamento em decisão.',
      'O resultado dos dados orienta a cena, mas o Mestre pode intervir quando a narrativa exigir.'
    ],
    Rastreamento:[
      'Apresente pistas diferentes para abordagens diferentes: percepção, investigação, sobrevivência ou interação.',
      'Não esconda toda a informação atrás de uma única rolagem; use falhas para criar complicações.',
      'Quando o rastreamento estiver completo, transforme a descoberta em uma escolha narrativa.'
    ],
    Combate:[
      'Defina a intenção da Besta antes de escolher o ataque.',
      'Use as condições e o ambiente para variar o ritmo do combate.',
      'Os comandos rápidos do Mestre permitem ajustar uma cena sem quebrar o fluxo.'
    ],
    Masmorra:[
      'Dê sinais de perigo antes de exigir uma decisão.',
      'Faça recursos, atalhos e riscos competirem entre si.',
      'Uma consequência interessante pode ser melhor do que simplesmente bloquear o caminho.'
    ],
    Extração:[
      'Depois de uma vitória, ofereça a escolha entre extrair, investigar mais ou recuar.',
      'Mostre o valor das partes obtidas para tornar a decisão significativa.'
    ],
    Forja:[
      'Apresente claramente o benefício de cada criação antes da escolha.',
      'Use recursos conquistados como parte da narrativa, não apenas como números.'
    ]
  };
  const phase=state.map?.phase||'Cidade';
  const current=phaseTips[phase]||phaseTips.Cidade;
  const alerts=[];
  const chars=state.characters||[];
  if((state.combat)) alerts.push('⚔️ Há um combate em andamento.');
  if((state.tracks||0)>=3) alerts.push('🔎 O rastreamento está completo.');
  if((state.npcs||[]).some(n=>(n.events||[]).some(e=>e.status==='pending'))) alerts.push('🎭 Existem eventos de NPC pendentes.');
  return `<div class="tips-hero"><div><div class="event-kicker">GUIA DO MESTRE</div><h2>💡 Dicas do Mestre</h2><p>Ferramentas rápidas para conduzir a sessão sem perder autonomia narrativa.</p></div><button class="btn primary" onclick="showGMNarrativeTip()">🎭 Sortear uma dica</button></div>
  <div class="tips-grid">
    <section class="card tips-feature"><div class="tips-icon">${phase==='Combate'?'⚔️':phase==='Viagem'?'🗺️':phase==='Rastreamento'?'🔎':'🎭'}</div><div><span class="label">FASE ATUAL</span><h3>${phase}</h3><p>${current[0]}</p><button class="btn" onclick="showGMNarrativeTip()">Próxima sugestão</button></div></section>
    <section class="card"><h3>📌 Situação da sessão</h3>${alerts.length?alerts.map(a=>`<div class="tip-alert">${a}</div>`).join(''):'<div class="tip-alert ok">✅ Nenhum alerta especial no momento.</div>'}<div class="row" style="margin-top:12px"><span class="tag">Dia ${state.map?.day||1}</span><span class="tag">Rastros ${state.tracks||0}/3</span><span class="tag">Grupo ${chars.length}/6</span></div></section>
  </div>
  <div class="grid grid-3 tips-cards">${Object.entries(phaseTips).map(([name,items])=>`<article class="card tip-card"><span class="label">${name.toUpperCase()}</span><h3>${name==='Combate'?'⚔️':name==='Viagem'?'🗺️':name==='Rastreamento'?'🔎':name==='Cidade'?'🏰':'🎭'} ${name}</h3>${items.map((t,i)=>`<div class="tip-item"><b>${i+1}</b><span>${t}</span></div>`).join('')}</article>`).join('')}</div>
  <section class="card tips-principle"><h3>🎭 Regra de ouro</h3><p>Os dados ajudam a decidir o que acontece, mas o Mestre continua com a palavra final sobre acontecimentos específicos, consequências narrativas e ritmo da sessão.</p></section>`;
}

const views={campaigns:campaigns,party:partyView,character:characterForm,sheet:sheet,map:mapView,tracking:tracking,beast:beast,combat:combat,npcs:npcView,tips:tipsView};
load();render();setTimeout(()=>{if(state.view==="character")renderCharacterPreview()},0);
