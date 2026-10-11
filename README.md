# Sombra dos Monstros — Mestre Digital V1

## Auditoria de rolagens — controle total do Mestre

Esta versão revisa as rolagens de dados do sistema para que elas passem pelo controlador central `d(n, label)`.

### Modos
- **🤖 Automáticas:** o sistema gera os resultados.
- **✋ Mestre rola:** o sistema solicita o resultado físico ao Mestre antes de resolver a ação.

O modo é persistido na campanha e também pode ser selecionado nas telas que possuem controle específico, como o turno da Besta e o controle de Animais Selvagens.

### Áreas revisadas
- testes de atributo e ações sociais;
- fuga, rastreamento e investigação;
- descoberta de terreno, estação e localidade;
- eventos climáticos e encontros de viagem;
- dados de recursos e recuperação;
- geração de Besta: espécie, elemento, couraça e ataques descobertos;
- iniciativa dos personagens;
- tabela de Animais Selvagens e iniciativa;
- ataques e dano de personagens contra Animais Selvagens;
- efeitos de morte/reconstrução dos Animais Selvagens;
- sensibilidade das partes da Besta;
- Fúria e Fraqueza da Besta;
- ações da Besta: escolha de ataque, ataque, chacoalhar, percepção e ataque especial;
- rolagens de dano.

### Regra de cancelamento
No modo manual, cancelar ou não informar uma rolagem não substitui o resultado por um número automático. A ação é interrompida para que o Mestre possa decidir como continuar.

### Observação
`Math.random()` continua sendo usado apenas para tarefas técnicas ou escolhas que não representam uma rolagem de dados da regra, como geração de IDs e seleção de alguns alvos/narrações. As tabelas de jogo que dependem de dados foram migradas para o controlador de rolagem.

## Autonomia do Mestre
- Pontos de interesse do mapa agora possuem **Controle do Mestre**, permitindo forçar um encontro, perigo, evento climático ou ativar uma localidade mesmo que a rolagem aleatória não tenha selecionado aquele resultado.
- O Mestre também pode resolver um POI como sucesso/falha ou registrar uma decisão narrativa personalizada, mantendo o histórico do mapa.
- O combate ganhou **Controle do Mestre**, com intervenção direta nos PV da Besta, dano/cura, Fadiga, couraça/partes, derrota imediata e registro de decisões narrativas.
- Essas intervenções são explicitamente registradas como decisões do Mestre e não substituem as rolagens normais quando o Mestre preferir usar a mecânica.

## Comandos rápidos do Mestre no combate
A versão atual adiciona um painel `⚡ Comandos rápidos` diretamente no combate. O Mestre pode selecionar Besta ou personagem e, sem editar campos, aplicar condições (derrubar, prender, engolfar, envenenar, esconder/revelar e limpar), controlar perda/liberação de turnos, restaurar/gastar reação, encerrar a rodada, alterar PV/Fadiga em valores rápidos, declarar sucesso/falha/derrota e registrar acontecimentos narrativos. Essas intervenções não rolam dados e são registradas no log como decisões do Mestre.


## Auditoria de sessão V1
- Executado fluxo de campanha, criação de 2 personagens, descoberta de hex, evento climático, ponto de interesse, combate, resultado, retorno à cidade e descanso.
- Corrigido o comando de derrota do Mestre: `handleBeastDefeat()` era referenciado pelos comandos rápidos/controle do Mestre, mas não existia.
- Conclusões de POI agora alimentam a tela flutuante universal de resultado quando o status é concluído.

## Segunda sessão completa — NPC, diálogo, ramificação e conflito

Fluxo testado: NPC no mapa → abertura → ação social → resposta específica → teste social → fala/pista → registro no POI → evento automático → consequência → adiar/cancelar → conflito com NPC → derrota → retorno ao banco de NPCs.

### Falhas encontradas e corrigidas

1. **NPC sem opções de resposta ficava bloqueado antes do teste social.**
   - Causa: a interface sempre exigia uma opção de resposta, mesmo quando `options=[]`.
   - Correção: quando o NPC não possui opções cadastradas, o Mestre pode escolher diretamente o personagem que fará o teste.

2. **NPC com opções liberava o personagem antes de escolher a resposta.**
   - Causa: a condição de liberação do seletor de personagem considerava `null` como uma escolha válida.
   - Correção: o seletor só aparece após uma opção efetivamente selecionada.

3. **Eventos de NPC iniciados pelo ponto de interesse só podiam ser concluídos.**
   - Correção: agora o Mestre pode concluir, adiar ou cancelar o evento diretamente no encontro do mapa, com a consequência correspondente.

4. **NPC não possuía caminho funcional para conflito real dentro do módulo de combate.**
   - Correção: NPCs genéricos podem iniciar um conflito usando uma ficha operacional mínima (PV, Defesa, Corpo, dano e iniciativa). Essa ficha é explicitamente uma extensão de implementação e não uma regra impressa do livro.
   - Ao derrotar o NPC, não é concedida Lenda automaticamente; o resultado fica sob controle do Mestre.
   - Ao encerrar o conflito, o PV restante do NPC é sincronizado de volta para sua ficha.

### Resultado da sessão

- Abertura e diálogo: OK
- Ramificação social: OK
- Teste social: OK
- Pistas e gancho: OK
- Registro no mapa/POI: OK
- Consequências de evento: OK
- Adiar/cancelar evento: OK
- Conflito com NPC: OK
- Derrota do NPC: OK
- Retorno ao banco de NPCs: OK

## Teste adicional — conflito gerado por escolha social

Foi executada uma variação do fluxo em que uma escolha social pode iniciar um conflito. O caso de regressão usa **Intimidar com falha crítica**, que agora abre o conflito mantendo o contexto do diálogo.

Correções desta etapa:
- o conflito guarda NPC, hex selecionado e contexto do diálogo;
- durante o combate, o POI do NPC permanece como **Em andamento**;
- ao encerrar o combate, os PV restantes são sincronizados de volta ao NPC;
- o estado do NPC passa para `Incapacitado` se chegar a 0 PV, ou permanece `Ativo` caso contrário;
- o sistema retorna ao mapa e reabre o diálogo do NPC no mesmo local;
- conflitos iniciados diretamente pelo banco de NPCs, sem contexto de diálogo, continuam retornando ao painel de NPCs;
- o resultado do encerramento é registrado para a tela flutuante de conclusão.

### Regressão
`test-npc-conflict-return.js`: **11/11 verificações passaram**.

## Identidade gráfica por entidade
- Novo `icon-system.js` com ícones SVG inline consistentes, sem dependência externa.
- Navegação superior usa ícones gráficos por área: Campanha, Grupo, Personagem, Ficha, Mapa, Rastreamento, Besta, Combate, NPCs e Dicas.
- Botões e marcadores com emojis de interface são convertidos para ícones vetoriais quando apropriado.
- Ícone da marca e controles principais receberam tratamento próprio em vermelho.
- POIs, eventos, perigo, combate, NPCs, personagens e dicas possuem linguagem visual consistente.

GitHub Pages ativo.
