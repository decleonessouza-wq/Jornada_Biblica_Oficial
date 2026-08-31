/**
 * Schema lógico v1 do banco offline da Harpa.
 *
 * O schema v1 representa somente o corpus autoritativo e sua proveniência.
 * Infraestrutura de busca é uma evolução posterior e não pertence a este
 * contrato estrutural.
 */

export const HYMNAL_DATABASE_SCHEMA_VERSION = 1 as const;

export const HYMNAL_DATABASE_SCHEMA_V1_SQL = `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS hymnal_meta (
  key TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS hymnal_editions (
  id TEXT PRIMARY KEY NOT NULL
    CHECK (length(trim(id)) > 0),

  code TEXT NOT NULL UNIQUE
    CHECK (length(trim(code)) > 0),

  display_name TEXT NOT NULL
    CHECK (length(trim(display_name)) > 0),

  language_tag TEXT NOT NULL
    CHECK (length(trim(language_tag)) > 0),

  publication_year INTEGER
    CHECK (
      publication_year IS NULL OR
      publication_year > 0
    ),

  expected_hymn_count INTEGER NOT NULL
    CHECK (expected_hymn_count > 0),

  rights_kind TEXT NOT NULL
    CHECK (
      rights_kind IN (
        'PROJECT_AUTHORIZED',
        'FORMAL_AUTHORIZATION_DOCUMENTED',
        'PUBLIC_DOMAIN',
        'OPEN_LICENSE'
      )
    ),

  authorization_status TEXT NOT NULL
    CHECK (
      authorization_status IN (
        'PENDING_FORMALIZATION',
        'DOCUMENTED',
        'NOT_REQUIRED'
      )
    ),

  rights_identifier TEXT
    CHECK (
      rights_identifier IS NULL OR
      length(trim(rights_identifier)) > 0
    ),

  attribution_required INTEGER NOT NULL DEFAULT 0
    CHECK (attribution_required IN (0, 1)),

  enabled INTEGER NOT NULL DEFAULT 1
    CHECK (enabled IN (0, 1))
);

CREATE TABLE IF NOT EXISTS hymnal_installations (
  edition_id TEXT PRIMARY KEY NOT NULL,

  content_version TEXT NOT NULL
    CHECK (length(trim(content_version)) > 0),

  source_kind TEXT NOT NULL
    CHECK (length(trim(source_kind)) > 0),

  source_artifact TEXT NOT NULL
    CHECK (length(trim(source_artifact)) > 0),

  source_sha256 TEXT NOT NULL
    CHECK (
      length(source_sha256) = 64 AND
      source_sha256 = lower(source_sha256)
    ),

  normalized_sha256 TEXT NOT NULL
    CHECK (
      length(normalized_sha256) = 64 AND
      normalized_sha256 = lower(normalized_sha256)
    ),

  importer_version INTEGER NOT NULL
    CHECK (importer_version > 0),

  installed_at TEXT NOT NULL
    CHECK (length(trim(installed_at)) > 0),

  hymn_count INTEGER NOT NULL
    CHECK (hymn_count > 0),

  FOREIGN KEY (edition_id)
    REFERENCES hymnal_editions(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS hymns (
  edition_id TEXT NOT NULL,

  id TEXT NOT NULL
    CHECK (length(trim(id)) > 0),

  number INTEGER NOT NULL
    CHECK (number > 0),

  title TEXT NOT NULL
    CHECK (length(trim(title)) > 0),

  first_line TEXT
    CHECK (
      first_line IS NULL OR
      length(trim(first_line)) > 0
    ),

  PRIMARY KEY (edition_id, id),

  UNIQUE (edition_id, number),

  FOREIGN KEY (edition_id)
    REFERENCES hymnal_editions(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS hymn_sections (
  edition_id TEXT NOT NULL,

  hymn_id TEXT NOT NULL,

  section_order INTEGER NOT NULL
    CHECK (section_order > 0),

  kind TEXT NOT NULL
    CHECK (
      kind IN (
        'VERSE',
        'CHORUS',
        'REFRAIN',
        'BRIDGE',
        'OTHER'
      )
    ),

  label TEXT
    CHECK (
      label IS NULL OR
      length(trim(label)) > 0
    ),

  text TEXT NOT NULL
    CHECK (length(trim(text)) > 0),

  PRIMARY KEY (
    edition_id,
    hymn_id,
    section_order
  ),

  FOREIGN KEY (
    edition_id,
    hymn_id
  )
    REFERENCES hymns(
      edition_id,
      id
    )
    ON DELETE CASCADE
);

PRAGMA user_version = 1;
`.trim();

export const HYMNAL_DATABASE_SCHEMA_SQL =
  HYMNAL_DATABASE_SCHEMA_V1_SQL;
