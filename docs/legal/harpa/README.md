# Harpa - Governanca juridica e de direitos

Este diretorio registra a governanca documental relacionada ao dominio Harpa do projeto Biblia Jornada.

Ele existe para separar tres responsabilidades que nao devem ser confundidas:

1. a decisao operacional adotada pelo projeto;
2. a evidencia externa formal eventualmente recebida e arquivada;
3. a proveniencia tecnica do artefato-fonte utilizado na cadeia de importacao.

## Estado estrutural

DOMAIN=HYMNAL
COLLECTION=HARPA
EXPECTED_HYMN_COUNT=636
PURPOSE=LEGAL_AND_RIGHTS_TRACEABILITY

PROJECT_DECISION_RECORD=YES
EXTERNAL_AUTHORIZATION_EVIDENCE=SEPARATE_CONCERN
SOURCE_PROVENANCE=SEPARATE_BUT_LINKED_CONCERN

## Limites deste diretorio

Este diretorio nao e o corpus da Harpa e nao deve armazenar letras como substituto do pipeline oficial de conteudo.

Este diretorio nao substitui os contratos tecnicos de importacao, persistencia ou validacao do dominio hymnal.

A evidencia externa formal, quando existir, deve ser arquivada na area authorization-evidence de forma rastreavel.

A proveniencia do artefato-fonte deve permanecer vinculada aos contratos tecnicos que controlam sourceArtifact, sourceArtifactKind, sourceArtifactOrigin, sourceRevision, sourceSha256, sourceByteLength, lockedAt, normalizedSha256 e importerVersion.

Nenhum campo juridico, identificador, documento, hash ou dado de proveniencia deve ser preenchido por suposicao.

## Documentos

- harpa-rights-manifest.md: manifesto de estado juridico/editorial conhecido pelo projeto.
- authorization-evidence/README.md: regras para arquivamento futuro de evidencia externa formal.

## Regra de integridade

PROJECT_DECISION_IS_EXTERNAL_LEGAL_EVIDENCE=NO
FAKE_OR_PLACEHOLDER_EVIDENCE_ALLOWED=NO
