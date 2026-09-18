import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import type { StudiesStackScreenProps } from "../navigation/types";
import { studyTrackPresentationCatalog } from "../studies/presentation/studyTrackPresentationCatalog";
import { studyRuntimeCatalog } from "../studies/runtime/studyRuntimeCatalog";
import { colors } from "../theme/colors";

type Props = StudiesStackScreenProps<"StudyTrack">;

export default function StudyTrackScreen({ navigation, route }: Props) {
  const { trackId } = route.params;
  const presentation =
    studyTrackPresentationCatalog.find(
      (candidate) => candidate.trackId === trackId,
    ) ?? null;

  if (!presentation) {
    return (
      <View style={styles.centered} testID="study-track-not-found">
        <Text style={styles.emptyTitle}>Trilha indisponível</Text>
        <Text style={styles.emptyText}>
          Esta trilha não está disponível para leitura no momento.
        </Text>
      </View>
    );
  }

  const studies = studyRuntimeCatalog.studies
    .filter((entry) => entry.content.trackId === trackId)
    .sort((left, right) => left.content.number - right.content.number);

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      style={styles.screen}
      testID="study-track-screen"
    >
      <Image
        accessibilityLabel={`Imagem da ${presentation.title}`}
        resizeMode="cover"
        source={presentation.assets.trackHero}
        style={styles.hero}
        testID="study-track-hero"
      />

      <View style={styles.header}>
        <Text style={styles.eyebrow}>
          Trilha {String(presentation.order).padStart(2, "0")}
        </Text>
        <Text style={styles.title}>{presentation.title}</Text>
        <Text style={styles.subtitle}>{presentation.nature}</Text>
        <Text style={styles.count} testID="study-track-runtime-count">
          {studies.length}{" "}
          {studies.length === 1 ? "estudo disponível" : "estudos disponíveis"}
        </Text>
      </View>

      {studies.length === 0 ? (
        <View style={styles.emptyCard} testID="study-track-empty-state">
          <Text style={styles.emptyTitle}>Nenhum estudo disponível</Text>
          <Text style={styles.emptyText}>
            Ainda não há estudos publicados nesta trilha.
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {studies.map((entry) => (
            <Pressable
              key={entry.content.id}
              accessibilityRole="button"
              onPress={() =>
                navigation.navigate("StudyDetail", {
                  studyId: entry.content.id,
                })
              }
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
              testID={`study-${entry.content.id}`}
            >
              <Text style={styles.studyNumber}>
                Estudo {String(entry.content.number).padStart(2, "0")}
              </Text>
              <Text style={styles.cardTitle}>{entry.content.title}</Text>
              <Text style={styles.cardDescription}>
                {entry.content.summary}
              </Text>
              <Text style={styles.cardAction}>Abrir estudo</Text>
            </Pressable>
          ))}
        </View>
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
    paddingBottom: 40,
  },
  hero: {
    height: 210,
    width: "100%",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  centered: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  eyebrow: {
    color: colors.secondaryPressed,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  title: {
    color: colors.textStrong,
    fontSize: 27,
    fontWeight: "800",
    lineHeight: 33,
    marginTop: 7,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  count: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 12,
  },
  list: {
    gap: 12,
    marginTop: 22,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
  },
  cardPressed: {
    opacity: 0.72,
  },
  studyNumber: {
    color: colors.secondaryPressed,
    fontSize: 12,
    fontWeight: "800",
  },
  cardTitle: {
    color: colors.textStrong,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 5,
  },
  cardDescription: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 7,
  },
  cardAction: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 14,
  },
  emptyCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    marginHorizontal: 20,
    marginTop: 22,
    paddingHorizontal: 22,
    paddingVertical: 28,
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
