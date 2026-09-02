# Harpa Rights Manifest

## Identificacao

MANIFEST_DOMAIN=HYMNAL
MANIFEST_COLLECTION=HARPA
HARPA_SCOPE=FULL_636_HYMNS
EXPECTED_HYMN_COUNT=636

## Decisao operacional do projeto

PROJECT_ENGINEERING_RIGHTS_DECISION=AUTHORIZED
PROJECT_PUBLICATION_RIGHTS_DECISION=AUTHORIZED

As linhas acima registram a decisao operacional adotada pelo responsavel pelo projeto Biblia Jornada para fins de engenharia, planejamento, preparacao e fluxo de publicacao.

PROJECT_DECISION_IS_EXTERNAL_LEGAL_EVIDENCE=NO

A decisao operacional do projeto nao representa, por si so, prova de autorizacao externa formal emitida por eventual titular, representante, editora, organizacao ou outra parte com legitimidade juridica sobre o conteudo.

## Formalizacao externa

FORMAL_EXTERNAL_AUTHORIZATION_STATUS=IN_PROGRESS
FORMAL_EXTERNAL_AUTHORIZATION_EVIDENCE_ARCHIVED=NO
FORMAL_AUTHORIZATION_BLOCKS_DEVELOPMENT=NO

O estado IN_PROGRESS registra que a formalizacao externa permanece em andamento.

Este manifesto nao declara que um documento externo de autorizacao ja foi recebido, validado ou arquivado.

Quando evidencia externa verificavel existir, ela deve ser registrada separadamente em authorization-evidence e vinculada a este manifesto sem apagar o historico anterior.

## Identificadores e evidencia atualmente indisponiveis

RIGHTS_IDENTIFIER=NOT_AVAILABLE
EXTERNAL_AUTHORIZATION_DOCUMENT_REFERENCE=NOT_AVAILABLE
EXTERNAL_AUTHORIZATION_DOCUMENT_SHA256=NOT_AVAILABLE

NOT_AVAILABLE significa que o dado verificavel ainda nao esta disponivel no repositorio e nao pode ser inventado, reconstruido ou presumido.

## Proveniencia tecnica atual comprovada

A cadeia abaixo registra apenas o estado tecnico verificavel atualmente incorporado ao repositorio. Ela nao constitui, substitui ou amplia evidencia externa formal de autorizacao.

REAL_SOURCE_ARTIFACT=harpa_crista_640_hinos.json
REAL_SOURCE_ARTIFACT_KIND=JSON
REAL_SOURCE_PROVENANCE_STATUS=LOCKED_AND_VERIFIED
REAL_SOURCE_PROVENANCE_AUTHORITY=src/hymnal/import/harpaSourceArtifactLocks.ts

NORMALIZED_SOURCE_ARTIFACT=src/hymnal/corpus/harpa-crista-jornada-v1.normalized.json
NORMALIZED_SOURCE_RECORD_COUNT=636
NORMALIZED_SOURCE_PROVENANCE_STATUS=LOCKED_AND_VERIFIED
NORMALIZED_SOURCE_PROVENANCE_AUTHORITY=src/hymnal/import/harpaNormalizedArtifactLock.ts

PRODUCTION_SEED_ARTIFACT=assets/hymnal/harpa-jornada-seed-v1.db
PRODUCTION_SEED_HYMN_COUNT=636
PRODUCTION_SEED_SECTION_COUNT=2707
PRODUCTION_SEED_PACKAGED_SCHEMA_VERSION=1
PRODUCTION_SEED_RUNTIME_SCHEMA_TARGET_VERSION=2
PRODUCTION_SEED_STATUS=TECHNICALLY_AUDITED

Os valores criptograficos, revisoes, byte lengths e demais detalhes de proveniencia permanecem nas autoridades tecnicas acima e nao sao duplicados neste manifesto juridico.

A existencia dessa cadeia tecnica nao altera o estado IN_PROGRESS da formalizacao externa, nao cria RIGHTS_IDENTIFIER, nao representa evidencia externa e nao autoriza preencher dados juridicos ainda indisponiveis.

## Regras fail-closed

LEGAL_MANIFEST_MUST_DISTINGUISH_PROJECT_DECISION_FROM_EXTERNAL_EVIDENCE=YES
LEGAL_MANIFEST_MUST_PRESERVE_PENDING_FORMALIZATION_STATE=YES
LEGAL_MANIFEST_MUST_NOT_INVENT_RIGHTS_IDENTIFIER=YES
LEGAL_MANIFEST_MUST_NOT_INVENT_SOURCE_SHA256=YES
LEGAL_MANIFEST_MUST_NOT_INVENT_EXTERNAL_DOCUMENT_REFERENCE=YES
FUTURE_EXTERNAL_EVIDENCE_ARCHIVE_REQUIRED=YES
FUTURE_SOURCE_PROVENANCE_LINK_REQUIRED=YES
FAKE_OR_PLACEHOLDER_EVIDENCE_ALLOWED=NO

Nenhuma evidencia futura deve substituir silenciosamente outra evidencia ja arquivada.

Toda alteracao futura do estado juridico/documental deve ser sustentada por artefato verificavel e revisao explicita.

## Escopo deste manifesto

Este documento e um registro de governanca do projeto. Ele nao e o corpus da Harpa, nao e um source lock, nao e uma licenca fabricada e nao constitui parecer juridico.
