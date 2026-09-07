/**
 * Contratos de relógio e políticas de data da plataforma pessoal.
 *
 * Persistência usa timestamp UTC; data civil local permanece um conceito
 * separado para regras de calendário e apresentação.
 */

declare const personalUtcTimestampBrand: unique symbol;
declare const personalLocalDateBrand: unique symbol;

export type PersonalUtcTimestamp = string & {
  readonly [personalUtcTimestampBrand]: "PersonalUtcTimestamp";
};

export type PersonalLocalDate = string & {
  readonly [personalLocalDateBrand]: "PersonalLocalDate";
};

export interface PersonalClock {
  now(): Date;
}

export interface PersonalDatePolicy {
  toUtcTimestamp(date: Date): PersonalUtcTimestamp;

  toLocalDate(date: Date): PersonalLocalDate;
}
