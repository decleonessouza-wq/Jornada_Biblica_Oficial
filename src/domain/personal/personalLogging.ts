/**
 * Logging contracts for the personal platform.
 *
 * Diagnostic codes are developer-defined and must never be derived from
 * personal or user-generated data. Safe metadata intentionally excludes
 * strings, objects, errors, dates, timestamps, and canonical identifiers.
 */

declare const personalDiagnosticCodeBrand: unique symbol;

export type PersonalDiagnosticCode = string & {
  readonly [personalDiagnosticCodeBrand]: "PersonalDiagnosticCode";
};

export function definePersonalDiagnosticCode(
  code: string,
): PersonalDiagnosticCode {
  return code as PersonalDiagnosticCode;
}

export type PersonalLogLevel = "info" | "warn" | "error";

export type PersonalLogSafeMetadataValue = boolean | number | null;

export type PersonalLogSafeMetadata = Readonly<
  Record<string, PersonalLogSafeMetadataValue>
>;

export interface PersonalLogger {
  log(
    level: PersonalLogLevel,
    code: PersonalDiagnosticCode,
    metadata?: PersonalLogSafeMetadata,
  ): void;
}
