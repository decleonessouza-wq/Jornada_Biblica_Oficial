import { readFileSync } from "fs";
import { join } from "path";

import { PERSONAL_PRIVACY_POLICY } from "../src/domain/personal/personalPrivacy";

function readRepoSource(relativePath: string): string {
  return readFileSync(join(process.cwd(), relativePath), "utf8");
}

describe("Journal privacy/lock prep contract P16-P9", () => {
  it("keeps the Journal private/local and personal content outside logs, telemetry and analytics", () => {
    expect(PERSONAL_PRIVACY_POLICY).toEqual(
      expect.objectContaining({
        storagePosture: "local-first",
        journalPrivacyPosture: "private-local",
        rawPersonalDataInLogsAllowed: false,
        userGeneratedTextInLogsAllowed: false,
        personalContentInTelemetryOrAnalyticsAllowed: false,
        personalSearchAnalyticsAllowed: false,
      }),
    );
  });

  it("keeps device authentication as optional contract-only preparation without runtime or dependency", () => {
    expect(PERSONAL_PRIVACY_POLICY.journalDeviceAuthProtection).toBe(
      "optional-contract-only",
    );

    const packageSource = readRepoSource("package.json");
    expect(packageSource).not.toMatch(
      /expo-local-authentication|expo-secure-store|react-native-keychain|react-native-biometrics/i,
    );

    const runtimeSource = [
      readRepoSource("App.tsx"),
      readRepoSource("src/navigation/JournalNavigator.tsx"),
      readRepoSource("src/screens/JournalScreen.tsx"),
      readRepoSource("src/screens/JournalEntryEditorScreen.tsx"),
      readRepoSource("src/screens/JournalEntryDetailScreen.tsx"),
    ].join("\n");

    expect(runtimeSource).not.toMatch(
      /LocalAuthentication|authenticateAsync|react-native-biometrics|deviceAuth|journalProtection/i,
    );
  });

  it("forbids homemade cryptography and automatic external Journal export", () => {
    expect(PERSONAL_PRIVACY_POLICY.homemadeCryptographyAllowed).toBe(false);
    expect(
      PERSONAL_PRIVACY_POLICY.externalPersonalExportRequiresExplicitUserAction,
    ).toBe(true);

    const journalSurfaceSource = [
      readRepoSource("src/navigation/JournalNavigator.tsx"),
      readRepoSource("src/screens/JournalScreen.tsx"),
      readRepoSource("src/screens/JournalEntryEditorScreen.tsx"),
      readRepoSource("src/screens/JournalEntryDetailScreen.tsx"),
    ].join("\n");

    expect(journalSurfaceSource).not.toMatch(
      /Sharing\.shareAsync|Share\.share|shareAsync|StorageAccessFramework|writeAsStringAsync/i,
    );
    expect(journalSurfaceSource).not.toMatch(
      /CryptoJS|createCipheriv|createDecipheriv|react-native-aes|tweetnacl|libsodium/i,
    );
  });
});
