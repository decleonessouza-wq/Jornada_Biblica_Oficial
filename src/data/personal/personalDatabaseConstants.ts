/**
 * Identidade física do banco SQLite mutável da plataforma pessoal.
 *
 * Este banco é independente dos bancos imutáveis da Bíblia e da Harpa.
 * O arquivo é criado em runtime pelo SQLite; não existe seed empacotado.
 */
export const PERSONAL_DATABASE_NAME =
  "biblia-jornada-personal.db" as const;
