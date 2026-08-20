/**
 * Schema lógico v1 do banco bíblico offline.
 *
 * Este arquivo é deliberadamente independente de expo-sqlite.
 * A conexão, execução de migrations e WAL entram no gate de infraestrutura.
 * FTS5 permanece fora desta fase e será introduzido na Fase 7.
 */

export const BIBLE_DATABASE_SCHEMA_VERSION = 1 as const;

export const BIBLE_DATABASE_SCHEMA_SQL = `
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
  license_kind TEXT NOT NULL CHECK (license_kind IN ('OPEN_LICENSE', 'PUBLIC_DOMAIN')),
  license_identifier TEXT NOT NULL,
  attribution_notice TEXT,
  source_kind TEXT NOT NULL CHECK (source_kind IN ('GIT_REPOSITORY', 'PUBLIC_DOMAIN_ARCHIVE')),
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

PRAGMA user_version = ${BIBLE_DATABASE_SCHEMA_VERSION};
`.trim();
