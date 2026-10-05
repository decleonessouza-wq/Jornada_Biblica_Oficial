# Jornada Bíblica — Governança editorial da Trilha 5

## Status desta decisão

- Fase: `P17-P17C-A2-A3-A18-A13-A1-T5`
- Natureza: decisão de governança editorial e técnica
- Publicação autorizada: **não**
- Alteração de runtime/release/UI: **não**
- Alteração de arquivos de curadoria: **não**

## 1. Estrutura editorial da Trilha 5

A Trilha 5 permanece como a área colaborativa do Jornada Bíblica.

A partir desta decisão, a Trilha 5 passa a reconhecer **dois modelos editoriais distintos**:

1. **Estudo**
   - Continua usando a estrutura atual de estudos da Fase 17.
   - A estrutura atual de `StudyContentPackage` permanece reservada aos conteúdos classificados editorialmente como estudo.
   - Os estudos já integrados não são reclassificados por esta decisão.

2. **Devocional**
   - Permanece dentro da própria Trilha 5.
   - Não deve ser forçado para a estrutura de `StudyContentPackage` apenas para caber no modelo atual.
   - Terá uma estrutura editorial e técnica própria, a ser definida em fase específica antes de qualquer integração em runtime/UI.
   - A definição futura deve preservar autoria, proveniência, curadoria, revisão teológica, autorização pública e os gates já adotados na Trilha 5.

Esta decisão **não renomeia a Trilha 5 na UI** e não altera sua apresentação pública nesta etapa.

## 2. Efeito Mulher Samaritana

Material:

- Título Jornada: **Efeito Mulher Samaritana: Quando Jesus Transforma um Encontro em Missão**
- Classificação editorial oficial: `DEVOCIONAL`
- Pertencimento: `TRACK_05`
- Integração como `Study`: **não**
- Integração como `StudyContentPackage`: **não**
- Integração em runtime/release/UI: **não autorizada nesta etapa**
- Conteúdo teológico/editorial alterado por esta decisão: **não**

O material permanece preservado como conteúdo colaborativo da Trilha 5 e deverá aguardar a definição da estrutura própria de Devocionais antes de qualquer integração técnica.

## 3. Identidade interna do autor

Fica registrada como decisão explícita do projeto a seguinte identidade autoral:

- **Adriel Jackson Batista de Oliveira**

Os seguintes conteúdos pertencem ao mesmo autor:

- **Efeito Mulher Samaritana: Quando Jesus Transforma um Encontro em Missão**
- **Cadê Pedro? Fé para Caminhar, Mãos para Socorrer**
- **Você Será Julgado: Os Diferentes Juízos nas Escrituras**

A identidade interna está resolvida para fins de governança e curadoria do projeto.

A autorização de exibição pública do nome permanece separada:

- `publicDisplayAuthorization = UNRESOLVED`

Esta decisão de identidade **não equivale a autorização de publicação**.

## 4. Conteúdo futuro — Carta Aberta

Fica registrada a intenção do mantenedor do projeto de futuramente publicar um conteúdo próprio chamado **Carta Aberta**.

Nesta etapa:

- `Carta Aberta` é apenas um **candidato futuro ao modelo Devocional da Trilha 5**;
- nenhum conteúdo, autoria pública, slug, ID, posição, estrutura ou metadata técnica é criado;
- nenhum intake é considerado realizado;
- nenhuma publicação é autorizada.

A integração somente poderá ocorrer depois da definição e aprovação da estrutura própria de Devocionais.

## 5. Estado do intake colaborativo da Fase 17

Com esta decisão:

- o intake dos conteúdos classificados como **Estudo** e atualmente auditados para a Trilha 5 fica encerrado nesta etapa;
- **Efeito Mulher Samaritana** não é descartado nem retirado da Trilha 5: ele migra conceitualmente para o fluxo futuro de **Devocionais**;
- o fluxo de Devocionais passa a ser uma frente separada de modelagem dentro da própria Trilha 5;
- nenhum Devocional está publicado ou integrado ao runtime por esta decisão.

## 6. Próximo passo

Definir, em etapa própria e antes de qualquer integração, a arquitetura editorial e técnica do modelo **Devocional da Trilha 5**, incluindo no mínimo:

- identidade e tipo do conteúdo;
- estrutura de leitura;
- tamanho e ritmo editorial;
- campos obrigatórios e opcionais;
- autoria e proveniência;
- notas internas de curadoria;
- referências bíblicas;
- reflexão, oração e aplicação quando pertinentes;
- comportamento de favoritos, diário e progresso;
- critérios de runtime/publicação;
- apresentação visual futura;
- compatibilidade com conteúdos colaborativos e autorais.

Somente após essa definição deverá ser avaliada a integração de **Efeito Mulher Samaritana** e, futuramente, de **Carta Aberta**.

---

**Governança:** esta decisão registra classificação e direção arquitetural. Não realiza publicação, promoção a runtime, alteração de UI, staging, commit ou push.

---

## Adendo de reconciliação — 04/10/2026 — checkpoint A16

Este adendo registra as etapas posteriores comprovadas, preservando integralmente a decisão histórica acima. Os estados de não implementação/publicação do texto original descrevem aquela etapa e não devem ser lidos como o estado atual do app.

- Branch: `feature/fase-17-studies`.
- HEAD: `13d17d6dfa28207a2e906a64c58530a69006246f`.
- Checkpoint comprovado: `A16_TRACK01_TEST_CONTRACT_FIX`, em **78 dirty / 0 staged**.
- Trilha 5 integrada ao app: **9 estudos e 3 devocionais**; catálogo de estudos com 84 itens.
- IDs, conteúdo autoral, curadorias e assets foram preservados nas correções A14-R5/R6 e A16. Os perfis públicos receberam somente os ajustes de identidade/localidade confirmados pelo usuário em A14-R5/R6; A16 preservou esses perfis.
- A16 alterou somente `tests/studyTrack01DraftBatch.test.ts`; source canônico e conteúdo Track01 permaneceram congelados.
- TypeScript e ESLint: exit 0; pertinentes: **121/121, 11 suítes**; regressão completa: **909/909, 97 suítes, exit 0**.
- A única falha histórica Track01 foi resolvida na expectativa do teste, preservando a igualdade exata dos blocos originais e do fallback de parágrafo.
- Os outros 475 arquivos inventariados e o índice Git permaneceram byte a byte iguais; o único novo caminho dirty foi o teste Track01.

### Aceitação e encerramento

Os heroes dos três devocionais foram aprovados visualmente pelo usuário. Os demais fluxos manuais foram aprovados por sua declaração de 03/10/2026, cuja única ressalva foram as localidades dos estudos 03, 04, 05, 07, 08 e 09. A A14-R6 aplicou Rondonópolis/MT nesses seis cards. Em 04/10/2026, o usuário confirmou que todos estão corretos, concluindo a aceitação visual por sua declaração. Aparelho e versão do Android não foram informados.

Esta reconciliação registra a implementação validada e não constitui encerramento formal de F17. A aceitação manual está concluída por declaração; o fechamento depende da reconciliação documental, da auditoria final e do procedimento governado P17-P17. Staging, commit, push e merge continuam sem autorização neste escopo. Não foram realizadas instalações, builds nativos, ADB ou operações diretas no banco/estado do usuário por A16. F18 não foi iniciada.

### Evidência

- Relatório: `P17-P17C-A2-A3-A18-A14-A8-A7-A16-TRACK01-TEST-CONTRACT-FIX.txt`.
- SHA256: `99A44AAF1F88140604B71DA6FC84BFB0BE7D8F17618BAAF699A1448195716DBF`.
- Pasta: `C:\Users\Marcio\Downloads\JB-F17-A16-20261004-140623-09934b5f`.
- Hash do teste validado: `30B422D26D9EACEF16310BE3DE312A5E583A6C188219D0018E48E62FF3A0E92A`.

O inventário do checkpoint A16 foi derivado do checkpoint A14-R6 validado e do único pós-hash A16, com as igualdades confirmadas pelo relatório Windows. Não houve nova execução de testes durante a reconciliação externa dessas evidências.

### Identificação autoral atual dos nove estudos

| Estudo | Nome público | Cargo | Cidade/UF |
| --- | --- | --- | --- |
| 01 | Michael Batista da Silva | Presbítero | Rondonópolis/MT |
| 02 | Neterson Oliveira de Souza | Presbítero/Dirigente de congregação | Pedra Preta/MT |
| 03 | Adriel Jackson Batista de Oliveira | Evangelista | Rondonópolis/MT |
| 04 | Eliete Alves | Líder do ministério de mulheres | Rondonópolis/MT |
| 05 | Hélio Nascimento Sousa | Presbítero · Professor de Escola Bíblica | Rondonópolis/MT |
| 06 | Nelson Ramos de Oliveira | Pastor | Rondonópolis/MT |
| 07 | Adriel Jackson Batista de Oliveira | Evangelista | Rondonópolis/MT |
| 08 | Sidinei Rodrigues de Souza | Pastor | Rondonópolis/MT |
| 09 | Adriel Jackson Batista de Oliveira | Evangelista | Rondonópolis/MT |

A A14-R5 confirmou Neterson Oliveira de Souza e Nelson Ramos de Oliveira nos estudos 02 e 06. A A14-R6 completou Rondonópolis/MT nos estudos 03, 04, 05, 07, 08 e 09. A proveniência de intake permanece preservada.

## Reconciliação final A19-R2 / auditoria A20 — 04/10/2026

Este adendo atualiza o checkpoint técnico após a A17; preserva integralmente os registros históricos acima e não constitui encerramento formal de F17.

- Branch: `feature/fase-17-studies`; HEAD: `13d17d6dfa28207a2e906a64c58530a69006246f`.
- Checkpoint real A19-R2: 77 dirty / 0 staged, 45 tracked modificados, 32 untracked e 476 arquivos inventariados. O Plano voltou aos bytes de HEAD; a Trilha 5 continua denominada **Estudos Colaborativos**.
- A19-R2 aprovada no Windows: TypeScript e ESLint com exit 0, regressão completa 910/910 em 97 suítes, testes pertinentes 122/122 em 11 suítes e diff check aprovado. Os 909 casos anteriores foram preservados; um teste protege o convite público da Trilha 4 ao primeiro estudo real de Michael.
- Catálogo atual: 84 estudos publicados em seis trilhas; Trilha 5 com nove estudos e três devocionais. Permanecem as identidades autorais, cidades/UF e o aceite manual dos heroes, leitores e estudos confirmado pelo usuário.
- A19-R2 alterou exclusivamente os três alvos autorizados; os outros 473 arquivos, bytes do índice, conteúdo semântico do índice e refs locais foram preservados. Backup e relock passaram; não houve rollback, instalação, build, banco/estado pessoal ou escrita Git.
- Evidência R2: `P17-P17C-A2-A3-A18-A14-A8-A7-A19-R2-CONTROLLED-CLOSURE-FIXES.txt`; SHA256 `958FCF3B35BC810504255F8013265715F395FA3C62839A74F405AE6334979DB5`.
- O pacote `closure-final.zip` recebido na A20 foi conferido: SHA256 `98CDAEA3A2BFC063F12E5C7593A86003F60AEDE05BD2CBDC0A2BEF419162375C`. O manifesto final tem SHA256 `96D543897DDBEDCAD406F91CD7D9A152CAA01D4A7EDDD8493DB44D29684E7426`; os sidecars, o inventário e as 97 leituras Git com preservação do índice conferem.
- A20 revisou o diff líquido completo contra main local: 130 caminhos tracked e 32 untracked, total 162, incluindo os 15 commits anteriores. São 116 caminhos de texto e 46 PNGs identificados por metadados/hashes. Não foi identificado novo bloqueador de source na revisão; os achados A18-F01/F02 foram resolvidos pela A19-R2. Não houve nova edição ou execução do app nesta auditoria.
- O gate E2E P17-P15 foi recuperado do fechamento de 24/09/2026: três E2E de Estudos e três regressões Playwright aprovados. Relatório `Jornada-Biblica-P17-P15-A1-CLOSURE-20260924-114859.txt`, SHA256 `A205125CBC1991FEF874953B4D2A6CF7A8E297D5C208BF76AEF9515A940B7103`. Os quatro hashes de specs/config permanecem iguais ao inventário atual. Essa prova corresponde ao catálogo anterior de 76 estudos; não representa nova execução E2E dos 84 estudos. As adições posteriores têm validação Jest atual e aceite manual próprio.
- Para o fechamento completo ainda faltam aplicar e confirmar esta reconciliação documental, comprovar as condições remotas e concluir staging, commit, push, PR e merge sob autorizações específicas; depois registrar main limpa e sincronizada, SHA/tree finais e baseline da F18. Main local/cache: `92a6c39b2ee2c6bc3ddb29b77f3b53f33288d5ec`; a atualidade do servidor não foi verificada na A20. Não iniciar F18 antes desse fechamento.

Este adendo não autoriza mutação de source, testes, assets, conteúdo autoral, domínio/runtime/release, banco, dependências ou estado do usuário, nem Expo prebuild, Gradle, EAS, ADB, fetch, staging, commit, push ou merge. A reconciliação documental prevista limita-se aos dois documentos de governança e deve terminar exatamente em 77 dirty / 0 staged, com os outros 474 arquivos preservados.
