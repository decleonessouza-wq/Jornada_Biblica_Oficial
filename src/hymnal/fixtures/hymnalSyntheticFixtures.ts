/**
 * Fixtures sintéticas e inelegíveis para produção.
 *
 * Estes registros não representam hinos reais da Harpa.
 * São exclusivos para testes de contratos, repositories e serviços futuros.
 */

import type {
  Hymn,
} from "../../domain/hymnal/hymn";

export const HYMNAL_SYNTHETIC_FIXTURE_EDITION_ID =
  "synthetic-test-only" as const;

export const HYMNAL_SYNTHETIC_FIXTURE_POLICY =
  Object.freeze({
    kind: "SYNTHETIC_TEST_ONLY" as const,
    productionEligible: false as const,
    hymnCount: 3 as const,
    editionId:
      HYMNAL_SYNTHETIC_FIXTURE_EDITION_ID,
  });

export const HYMNAL_SYNTHETIC_FIXTURES = [
  {
    id: "synthetic-hymn-9001",
    number: 9001,
    title: "Hino Sintético Alfa",
    firstLine:
      "[SYNTHETIC] Primeira linha artificial Alfa.",
    editionId:
      HYMNAL_SYNTHETIC_FIXTURE_EDITION_ID,
    sections: [
      {
        order: 1,
        kind: "VERSE",
        label: "1",
        text:
          "[SYNTHETIC] Conteúdo artificial Alfa para teste.",
      },
    ],
  },
  {
    id: "synthetic-hymn-9002",
    number: 9002,
    title: "Hino Sintético Beta",
    firstLine:
      "[SYNTHETIC] Primeira linha artificial Beta.",
    editionId:
      HYMNAL_SYNTHETIC_FIXTURE_EDITION_ID,
    sections: [
      {
        order: 1,
        kind: "VERSE",
        label: "1",
        text:
          "[SYNTHETIC] Estrofe artificial Beta para teste.",
      },
      {
        order: 2,
        kind: "CHORUS",
        label: "Coro",
        text:
          "[SYNTHETIC] Coro artificial Beta para teste.",
      },
    ],
  },
  {
    id: "synthetic-hymn-9003",
    number: 9003,
    title: "Hino Sintético Gama",
    firstLine:
      "[SYNTHETIC] Primeira linha artificial Gama.",
    editionId:
      HYMNAL_SYNTHETIC_FIXTURE_EDITION_ID,
    sections: [
      {
        order: 1,
        kind: "VERSE",
        label: "1",
        text:
          "[SYNTHETIC] Estrofe artificial Gama para teste.",
      },
      {
        order: 2,
        kind: "REFRAIN",
        label: "Refrão",
        text:
          "[SYNTHETIC] Refrão artificial Gama para teste.",
      },
      {
        order: 3,
        kind: "BRIDGE",
        label: "Ponte",
        text:
          "[SYNTHETIC] Ponte artificial Gama para teste.",
      },
    ],
  },
] as const satisfies readonly Hymn[];
