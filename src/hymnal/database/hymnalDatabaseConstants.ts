/**
 * Identidade física dos artefatos SQLite do domínio Harpa.
 *
 * O banco Harpa é independente do banco bíblico.
 * Instalação do seed, conexão e bootstrap pertencem a etapas posteriores.
 */

export const HYMNAL_DATABASE_NAME =
  "harpa-jornada.db" as const;

export const HYMNAL_DATABASE_SEED_ASSET_NAME =
  "harpa-jornada-seed-v1.db" as const;
