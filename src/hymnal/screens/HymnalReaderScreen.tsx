import React, {
  useEffect,
  useState,
} from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type {
  Hymn,
  HymnSection,
} from "../../domain/hymnal/hymn";
import type {
  HymnalStackScreenProps,
} from "../../navigation/types";
import { colors } from "../../theme/colors";
import {
  createSQLiteHymnalRepository,
} from "../repositories/sqliteHymnalRepository";

type ReaderStatus =
  | "loading"
  | "ready"
  | "notFound"
  | "error";

function getSectionDisplayLabel(
  section: HymnSection,
): string {
  if (section.label) {
    return section.label;
  }

  switch (section.kind) {
    case "VERSE":
      return `Estrofe ${section.order}`;
    case "CHORUS":
      return "Coro";
    case "REFRAIN":
      return "Refrão";
    case "BRIDGE":
      return "Ponte";
    case "OTHER":
      return `Seção ${section.order}`;
  }
}

export default function HymnalReaderScreen({
  navigation,
  route,
}: HymnalStackScreenProps<"HymnalReader">) {
  const {
    editionId,
    hymnId,
  } = route.params;

  const [status, setStatus] =
    useState<ReaderStatus>("loading");
  const [hymn, setHymn] =
    useState<Hymn | null>(null);
  const [retryGeneration, setRetryGeneration] =
    useState(0);
  const [hymnFontSize, setHymnFontSize] =
    useState(18);

  useEffect(() => {
    let active = true;

    setStatus("loading");
    setHymn(null);

    void (async () => {
      try {
        const repository =
          await createSQLiteHymnalRepository();

        const loadedHymn =
          await repository.getHymnById(
            editionId,
            hymnId,
          );

        if (!active) {
          return;
        }

        if (!loadedHymn) {
          setStatus("notFound");
          return;
        }

        setHymn(loadedHymn);
        setStatus("ready");
      } catch (error) {
        if (!active) {
          return;
        }

        console.warn(
          "HYMNAL_READER_LOAD_FAILED",
          error,
        );
        setHymn(null);
        setStatus("error");
      }
    })();

    return () => {
      active = false;
    };
  }, [editionId, hymnId, retryGeneration]);

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Pressable
          testID="hymnal-reader-back"
          accessibilityRole="button"
          accessibilityLabel="Voltar para a biblioteca da Harpa"
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
        >
          <Text style={styles.backButtonText}>
            ← Voltar
          </Text>
        </Pressable>

        <View
          accessibilityLabel="Tamanho da letra do hino"
          style={styles.fontControls}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Diminuir tamanho da letra"
            accessibilityState={{
              disabled: hymnFontSize <= 16,
            }}
            disabled={hymnFontSize <= 16}
            onPress={() => {
              setHymnFontSize((current) =>
                Math.max(16, current - 2),
              );
            }}
            style={({ pressed }) => [
              styles.fontControlButton,
              hymnFontSize <= 16 &&
                styles.fontControlButtonDisabled,
              pressed &&
                hymnFontSize > 16 &&
                styles.fontControlButtonPressed,
            ]}
            testID="hymnal-reader-font-decrease"
          >
            <Text style={styles.fontControlText}>
              A-
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Aumentar tamanho da letra"
            accessibilityState={{
              disabled: hymnFontSize >= 26,
            }}
            disabled={hymnFontSize >= 26}
            onPress={() => {
              setHymnFontSize((current) =>
                Math.min(26, current + 2),
              );
            }}
            style={({ pressed }) => [
              styles.fontControlButton,
              styles.fontControlButtonSpacing,
              hymnFontSize >= 26 &&
                styles.fontControlButtonDisabled,
              pressed &&
                hymnFontSize < 26 &&
                styles.fontControlButtonPressed,
            ]}
            testID="hymnal-reader-font-increase"
          >
            <Text style={styles.fontControlText}>
              A+
            </Text>
          </Pressable>
        </View>
      </View>

      {status === "loading" && (
        <View style={styles.centerState}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
          />
          <Text
            accessibilityRole="header"
            style={styles.stateTitle}
          >
            Carregando hino
          </Text>
          <Text style={styles.stateText}>
            Preparando a letra do hino.
          </Text>
        </View>
      )}

      {status === "notFound" && (
        <View style={styles.centerState}>
          <Text
            accessibilityRole="header"
            style={styles.stateTitle}
          >
            Hino não encontrado
          </Text>
          <Text style={styles.stateText}>
            Este hino não está disponível nesta edição.
          </Text>
        </View>
      )}

      {status === "error" && (
        <View style={styles.centerState}>
          <Text
            accessibilityRole="header"
            style={styles.stateTitle}
          >
            Não foi possível abrir o hino
          </Text>
          <Text style={styles.stateText}>
            O conteúdo não pôde ser carregado agora.
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Tentar abrir o hino novamente"
            onPress={() => {
              setRetryGeneration(
                (current) => current + 1,
              );
            }}
            style={({ pressed }) => [
              styles.retryButton,
              pressed && styles.retryButtonPressed,
            ]}
            testID="hymnal-reader-retry"
          >
            <Text style={styles.retryButtonText}>
              Tentar novamente
            </Text>
          </Pressable>        </View>
      )}

      {status === "ready" && hymn && (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <Text style={styles.hymnNumber}>
              HINO {hymn.number}
            </Text>
            <Text
              accessibilityRole="header"
              style={styles.title}
            >
              {hymn.title}
            </Text>

            {hymn.firstLine && (
              <Text style={styles.firstLine}>
                {hymn.firstLine}
              </Text>
            )}
          </View>

          <View style={styles.sections}>
            {hymn.sections.map((section) => {
              const isChorus =
                section.kind === "CHORUS";

              return (
                <View
                  key={`${hymn.id}:${section.order}`}
                  testID={
                    isChorus
                      ? `hymnal-reader-chorus-card-${section.order}`
                      : undefined
                  }
                  style={[
                    styles.sectionCard,
                    isChorus && styles.chorusCard,
                  ]}
                >
                  <Text
                    style={[
                      styles.sectionLabel,
                      isChorus && styles.chorusLabel,
                    ]}
                  >
                    {getSectionDisplayLabel(section)}
                  </Text>
                  <Text
                    testID={
                      isChorus
                        ? `hymnal-reader-chorus-text-${section.order}`
                        : undefined
                    }
                    style={[
                      styles.sectionText,
                      {
                        fontSize: hymnFontSize,
                        lineHeight: Math.round(
                          hymnFontSize * 1.6,
                        ),
                      },
                      isChorus && styles.chorusText,
                    ]}
                  >
                    {section.text}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  backButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 16,
  },
  backButtonPressed: {
    backgroundColor: colors.surfaceAlt,
  },
  backButtonText: {
    color: colors.textStrong,
    fontSize: 14,
    fontWeight: "800",
  },
  fontControls: {
    flexDirection: "row",
  },
  fontControlButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 44,
    minWidth: 48,
  },
  fontControlButtonSpacing: {
    marginLeft: 8,
  },
  fontControlButtonPressed: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  fontControlButtonDisabled: {
    opacity: 0.42,
  },
  fontControlText: {
    color: colors.textStrong,
    fontSize: 15,
    fontWeight: "800",
  },
  centerState: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingBottom: 56,
    paddingHorizontal: 28,
  },
  stateTitle: {
    color: colors.textStrong,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 14,
    textAlign: "center",
  },
  stateText: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    textAlign: "center",
  },
  retryButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 14,
    justifyContent: "center",
    marginTop: 18,
    minHeight: 48,
    paddingHorizontal: 20,
  },
  retryButtonPressed: {
    backgroundColor: colors.primaryPressed,
  },
  retryButtonText: {
    color: colors.textInverse,
    fontSize: 14,
    fontWeight: "800",
  },
  content: {
    paddingBottom: 36,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  hero: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 24,
  },
  hymnNumber: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  title: {
    color: colors.textInverse,
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 34,
    marginTop: 8,
  },
  firstLine: {
    color: colors.textInverse,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    opacity: 0.86,
  },
  sections: {
    marginTop: 18,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 12,
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  chorusCard: {
    backgroundColor: colors.surfaceHighlight,
    borderColor: colors.secondary,
    borderWidth: 1,
  },
  sectionLabel: {
    color: colors.textStrong,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.7,
    textTransform: "uppercase",
  },
  sectionText: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 29,
    marginTop: 10,
  },
  chorusLabel: {
    color: colors.warning,
  },
  chorusText: {
    color: colors.textStrong,
    fontWeight: "700",
  },
});
