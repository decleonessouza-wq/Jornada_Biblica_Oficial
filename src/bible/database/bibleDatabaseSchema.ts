/**
 * Schema lógico v2 do banco bíblico offline.
 *
 * Histórico:
 * - v1: corpus bíblico, proveniência e metadados;
 * - v2: estruturas persistentes da busca bíblica da Fase 7.
 *
 * A representação portátil foi congelada em 7-P2-A2-D4 como:
 * - documents: inteiro document_id + referência canônica + texto normalizado;
 * - dictionary: inteiro term_id + termo normalizado único;
 * - postings: term_id + document_id + frequência, WITHOUT ROWID.
 *
 * A tabela FTS5 nativa NÃO faz parte do schema estrutural obrigatório porque
 * o runtime Web/wa-sqlite atual não garante FTS5. Ela é criada de forma
 * capability-gated somente em Android/iOS.
 *
 * O seed empacotado continua imutável em schema v1. A cópia runtime instalada
 * é promovida para o schema atual pelo runner sequencial de migrations.
 */

export const BIBLE_DATABASE_SCHEMA_VERSION = 2 as const;

export const BIBLE_DATABASE_SCHEMA_V1_SQL = `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS bible_meta (
  key TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS bible_versions (
  id TEXT PRIMARY KEY NOT NULL,
  code TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  language_tag TEXT NOT NULL,
  publication_year INTEGER,
  rights_kind TEXT NOT NULL CHECK (rights_kind IN ('OPEN_LICENSE', 'PUBLIC_DOMAIN')),
  rights_identifier TEXT NOT NULL CHECK (length(trim(rights_identifier)) > 0),
  rights_basis_jurisdiction TEXT NOT NULL CHECK (rights_basis_jurisdiction IN ('BR', 'US')),
  rights_evidence_url TEXT NOT NULL CHECK (length(trim(rights_evidence_url)) > 0),
  attribution_notice TEXT,
  source_kind TEXT NOT NULL CHECK (source_kind IN ('GIT_REPOSITORY', 'HISTORICAL_ARCHIVE')),
  source_url TEXT NOT NULL,
  source_revision TEXT NOT NULL,
  source_artifact TEXT NOT NULL,
  source_sha256 TEXT NOT NULL,
  normalized_sha256 TEXT NOT NULL,
  importer_version INTEGER NOT NULL CHECK (importer_version > 0),
  installed_at TEXT NOT NULL,
  verse_count INTEGER NOT NULL CHECK (verse_count > 0),
  enabled INTEGER NOT NULL DEFAULT 1 CHECK (enabled IN (0, 1))
);

CREATE TABLE IF NOT EXISTS bible_books (
  id TEXT PRIMARY KEY NOT NULL,
  canonical_order INTEGER NOT NULL UNIQUE CHECK (canonical_order BETWEEN 1 AND 66),
  testament TEXT NOT NULL CHECK (testament IN ('OLD', 'NEW')),
  canonical_name TEXT NOT NULL,
  chapter_count INTEGER NOT NULL CHECK (chapter_count > 0)
);

CREATE TABLE IF NOT EXISTS bible_chapters (
  version_id TEXT NOT NULL,
  book_id TEXT NOT NULL,
  chapter INTEGER NOT NULL CHECK (chapter > 0),
  verse_count INTEGER NOT NULL CHECK (verse_count > 0),
  PRIMARY KEY (version_id, book_id, chapter),
  FOREIGN KEY (version_id) REFERENCES bible_versions(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES bible_books(id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS bible_verses (
  version_id TEXT NOT NULL,
  book_id TEXT NOT NULL,
  chapter INTEGER NOT NULL CHECK (chapter > 0),
  verse INTEGER NOT NULL CHECK (verse > 0),
  text TEXT NOT NULL CHECK (length(trim(text)) > 0),
  PRIMARY KEY (version_id, book_id, chapter, verse),
  FOREIGN KEY (version_id, book_id, chapter)
    REFERENCES bible_chapters(version_id, book_id, chapter)
    ON DELETE CASCADE
);

PRAGMA user_version = 1;
`.trim();

/**
 * Estruturas portáteis compactas da busca.
 *
 * bible_search_documents:
 * - exatamente uma linha por versículo;
 * - document_id inteiro reduz o custo dos postings;
 * - normalized_text pode ser vazio apenas para linhas canônicas sem conteúdo
 *   lexical, preservadas para navegação direta por referência.
 *
 * bible_search_dictionary:
 * - cada termo normalizado é armazenado uma única vez;
 * - term_id inteiro é usado pelos postings.
 *
 * bible_search_postings:
 * - uma linha por termo distinto em cada documento;
 * - term_frequency fica disponível para ranking;
 * - WITHOUT ROWID evita um B-tree redundante sobre a PK composta.
 *
 * Nenhuma destas tabelas substitui bible_verses como fonte autoritativa.
 */
export const BIBLE_DATABASE_SEARCH_SCHEMA_V2_SQL = `
CREATE TABLE IF NOT EXISTS bible_search_documents (
  document_id INTEGER PRIMARY KEY NOT NULL,
  version_id TEXT NOT NULL,
  book_id TEXT NOT NULL,
  chapter INTEGER NOT NULL CHECK (chapter > 0),
  verse INTEGER NOT NULL CHECK (verse > 0),
  normalized_text TEXT NOT NULL,
  UNIQUE (version_id, book_id, chapter, verse),
  FOREIGN KEY (version_id, book_id, chapter, verse)
    REFERENCES bible_verses(version_id, book_id, chapter, verse)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bible_search_dictionary (
  term_id INTEGER PRIMARY KEY NOT NULL,
  term TEXT NOT NULL UNIQUE CHECK (length(trim(term)) > 0)
);

CREATE TABLE IF NOT EXISTS bible_search_postings (
  term_id INTEGER NOT NULL,
  document_id INTEGER NOT NULL,
  term_frequency INTEGER NOT NULL DEFAULT 1 CHECK (term_frequency > 0),
  PRIMARY KEY (term_id, document_id),
  FOREIGN KEY (term_id)
    REFERENCES bible_search_dictionary(term_id)
    ON DELETE CASCADE,
  FOREIGN KEY (document_id)
    REFERENCES bible_search_documents(document_id)
    ON DELETE CASCADE
) WITHOUT ROWID;
`.trim();

/**
 * Representação materializada do schema lógico mais recente.
 *
 * O runner de migrations usa os blocos históricos individualmente; esta
 * composição é útil para validação, tooling e criação controlada de banco novo.
 */
export const BIBLE_DATABASE_SCHEMA_SQL = `
${BIBLE_DATABASE_SCHEMA_V1_SQL}

${BIBLE_DATABASE_SEARCH_SCHEMA_V2_SQL}

PRAGMA user_version = ${BIBLE_DATABASE_SCHEMA_VERSION};
`.trim();
