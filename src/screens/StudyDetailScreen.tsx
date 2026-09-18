import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import type { StudiesStackScreenProps } from "../navigation/types";
import { studyIconAssetManifest } from "../studies/presentation/studyAssetManifest";
import { getRuntimeStudyById } from "../studies/runtime/studyRuntimeCatalog";
import { colors } from "../theme/colors";

type Props = StudiesStackScreenProps<"StudyDetail">;

export default function StudyDetailScreen({ navigation, route }: Props) {
  const entry = getRuntimeStudyById(route.params.studyId);

  if (!entry) {
    return (
      <View style={styles.centered} testID="study-detail-not-found">
        <Text style={styles.emptyTitle}>Estudo indisponível</Text>
        <Text style={styles.emptyText}>
          Este estudo não está disponível para leitura no momento.
        </Text>
      </View>
    );
  }

  const { content } = entry;
  const estimatedTimeLabel =
    content.estimatedMinutes === null
      ? "Tempo não informado"
      : content.estimatedMinutes.minimum ===
          content.estimatedMinutes.maximum
        ? `${content.estimatedMinutes.minimum} min`
        : `${content.estimatedMinutes.minimum}-${content.estimatedMinutes.maximum} min`;

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      style={styles.screen}
      testID="study-detail-screen"
    >
      <View style={styles.heading}>
        <Text style={styles.eyebrow}>
          ESTUDO {String(content.number).padStart(2, "0")}
        </Text>
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.summary}>{content.summary}</Text>

        {entry.publicAuthorDisplayName ? (
          <Text style={styles.author}>
            Por {entry.publicAuthorDisplayName}
          </Text>
        ) : null}
      </View>

      <View style={styles.infoCard}>
        <View style={styles.sectionHeading}>
          <Image
            accessibilityLabel="Ícone da pergunta central"
            source={studyIconAssetManifest.perguntaCentral}
            style={styles.sectionIcon}
          />
          <Text style={styles.label}>Pergunta central</Text>
        </View>
        <Text style={styles.value}>{content.questionCentral}</Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.sectionHeading}>
          <Image
            accessibilityLabel="Ícone do objetivo"
            source={studyIconAssetManifest.objetivo}
            style={styles.sectionIcon}
          />
          <Text style={styles.label}>Objetivo</Text>
        </View>
        <Text style={styles.value}>{content.objective}</Text>
      </View>

      <View style={styles.metaCard}>
        <View style={styles.metaHeading}>
          <Image
            accessibilityLabel="Ícone de leitura"
            source={studyIconAssetManifest.leia}
            style={styles.metaIcon}
          />
          <Text style={styles.metaLabel}>Tempo estimado</Text>
        </View>
        <Text style={styles.metaValue}>{estimatedTimeLabel}</Text>
      </View>

      {content.nextStudyId ? (
        <Pressable
          accessibilityRole="button"
          onPress={() =>
            navigation.navigate("StudyDetail", {
              studyId: content.nextStudyId as string,
            })
          }
          style={({ pressed }) => [
            styles.nextButton,
            pressed && styles.nextButtonPressed,
          ]}
          testID="study-next-button"
        >
          <Text style={styles.nextButtonText}>Próximo estudo</Text>
        </Pressable>
      ) : (
        <Text style={styles.sequenceEnd} testID="study-sequence-end">
          Você chegou ao fim do conteúdo publicado desta sequência.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    paddingBottom: 42,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  centered: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  heading: {
    marginBottom: 4,
  },
  eyebrow: {
    color: colors.secondaryPressed,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  title: {
    color: colors.textStrong,
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 34,
    marginTop: 8,
  },
  summary: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 12,
  },
  author: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 12,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 16,
    padding: 18,
  },
  sectionHeading: {
    alignItems: "center",
    flexDirection: "row",
    gap: 9,
  },
  sectionIcon: {
    height: 28,
    width: 28,
  },
  label: {
    color: colors.secondaryPressed,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  value: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
  },
  metaCard: {
    alignItems: "center",
    backgroundColor: colors.primarySoft,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  metaHeading: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  metaIcon: {
    height: 24,
    width: 24,
  },
  metaLabel: {
    color: colors.textStrong,
    fontSize: 13,
    fontWeight: "700",
  },
  metaValue: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "800",
  },
  nextButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 16,
    marginTop: 22,
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
  nextButtonPressed: {
    backgroundColor: colors.primaryPressed,
  },
  nextButtonText: {
    color: colors.textInverse,
    fontSize: 15,
    fontWeight: "800",
  },
  sequenceEnd: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 22,
    textAlign: "center",
  },
  emptyTitle: {
    color: colors.textStrong,
    fontSize: 17,
    fontWeight: "800",
    textAlign: "center",
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 7,
    textAlign: "center",
  },
});
