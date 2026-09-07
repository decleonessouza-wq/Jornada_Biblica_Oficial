/**
 * Contratos de identidade canônica da plataforma pessoal.
 *
 * IDs de features são strings estáveis e tipadas por domínio. A estratégia
 * concreta de geração pertence às fases que compõem a plataforma pessoal.
 */

declare const personalCanonicalIdBrand: unique symbol;

export type PersonalCanonicalId<TKind extends string> = string & {
  readonly [personalCanonicalIdBrand]: TKind;
};

export interface PersonalCanonicalIdFactory {
  create<TKind extends string>(
    kind: TKind,
  ): PersonalCanonicalId<TKind>;
}
