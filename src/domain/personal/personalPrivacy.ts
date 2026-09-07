/**
 * Privacy policy contract for the personal platform.
 *
 * This module defines policy only. It does not read, write, transmit,
 * encrypt, export, import, or log personal data.
 */

export interface PersonalPrivacyPolicy {
  readonly storagePosture: "local-first";
  readonly remoteTelemetryEnabled: false;
  readonly rawPersonalDataInLogsAllowed: false;
  readonly rawErrorObjectsInLogsAllowed: false;
  readonly errorMessageInLogsAllowed: false;
  readonly errorStackInLogsAllowed: false;
  readonly rawCanonicalIdsInLogsAllowed: false;
  readonly rawDatesAndTimestampsInLogsAllowed: false;
  readonly userGeneratedTextInLogsAllowed: false;
  readonly secretOrCredentialLoggingAllowed: false;
  readonly stringMetadataValuesAllowed: false;
}

export const PERSONAL_PRIVACY_POLICY: PersonalPrivacyPolicy = {
  storagePosture: "local-first",
  remoteTelemetryEnabled: false,
  rawPersonalDataInLogsAllowed: false,
  rawErrorObjectsInLogsAllowed: false,
  errorMessageInLogsAllowed: false,
  errorStackInLogsAllowed: false,
  rawCanonicalIdsInLogsAllowed: false,
  rawDatesAndTimestampsInLogsAllowed: false,
  userGeneratedTextInLogsAllowed: false,
  secretOrCredentialLoggingAllowed: false,
  stringMetadataValuesAllowed: false,
};
