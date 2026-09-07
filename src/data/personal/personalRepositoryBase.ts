/**
 * Base mínima para adapters de repositório da plataforma pessoal.
 *
 * Não define CRUD, SQL genérico ou regras de features. Apenas mantém a
 * dependência explícita da fronteira PersonalDatabase.
 */

import type { PersonalDatabase } from "./personalDatabase";

export abstract class PersonalRepositoryBase {
  protected constructor(
    protected readonly personalDatabase: PersonalDatabase,
  ) {}
}
