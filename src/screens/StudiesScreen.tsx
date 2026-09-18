import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import type { StudiesStackScreenProps } from "../navigation/types";
import { studyTrackPresentationCatalog } from "../studies/presentation/studyTrackPresentationCatalog";
import { studyRuntimeCatalog } from "../studies/runtime/studyRuntimeCatalog";
import { colors } from "../theme/colors";

type Props = StudiesStackScreenProps<"StudiesHome">;

const getRuntimeStudyCount = (trackId: string): number =>
  studyRuntimeCatalog.studies.filter(
    (entry) => entry.content.trackId === trackId,
  ).length;

export default function StudiesScreen({ navigation }: Props) {
  const tracks = [...studyTrackPresentationCatalog].sort(
    (left, right) => left.order - right.order,
  );

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      style={styles.screen}
      testID="studies-screen"
    >
      <Text style={styles.eyebrow}>BIBLIOTECA DE ESTUDOS</Text>
      <Text style={styles.title}>Aprofunde sua jornada na Palavra</Text>
      <Text style={styles.subtitle}>
        Escolha uma trilha e avance no seu ritmo pelos estudos disponíveis.
      </Text>

      {tracks.length === 0 ? (
        <View style={styles.emptyCard} testID="studies-empty-state">
          <Text style={styles.emptyTitle}>Nenhuma trilha disponível</Text>
          <Text style={styles.emptyText}>
            As trilhas de estudo aparecerão aqui quando estiverem disponíveis.
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {tracks.map((track) => {
            const studyCount = getRuntimeStudyCount(track.trackId);

            return (
              <Pressable
                key={track.trackId}
                accessibilityRole="button"
                onPress={() =>
                  navigation.navigate("StudyTrack", {
                    trackId: track.trackId,
                  })
                }
                style={({ pressed }) => [
                  styles.card,
                  pressed && styles.cardPressed,
                ]}
                testID={`study-track-${track.trackId}`}
              >
                <Image
                  accessibilityLabel={`Imagem da ${track.title}`}
                  resizeMode="cover"
                  source={track.assets.card}
                  style={styles.cardImage}
                />

                <View style={styles.cardBody}>
                  <Text style={styles.trackLabel}>
                    Trilha {String(track.order).padStart(2, "0")}
                  </Text>
                  <Text style={styles.cardTitle}>{track.title}</Text>
                  <Text style={styles.cardNature}>{track.nature}</Text>
                  <Text
                    style={styles.cardCount}
                    testID={`study-track-count-${track.trackId}`}
                  >
                    {studyCount}{" "}
                    {studyCount === 1
                      ? "estudo disponível"
                      : "estudos disponíveis"}
                  </Text>
                  <Text style={styles.cardAction}>Abrir trilha</Text>
                </View>
              </Pressable>
            );
          })}
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
    paddingHorizontal: 18,
    paddingTop: 24,
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
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
  },
  list: {
    gap: 14,
    marginTop: 24,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 156,
    overflow: "hidden",
  },
  cardPressed: {
    opacity: 0.74,
  },
  cardImage: {
    alignSelf: "stretch",
    width: 118,
  },
  cardBody: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  trackLabel: {
    color: colors.secondaryPressed,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.7,
    textTransform: "uppercase",
  },
  cardTitle: {
    color: colors.textStrong,
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 22,
    marginTop: 4,
  },
  cardNature: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 5,
  },
  cardCount: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 10,
  },
  cardAction: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 5,
  },
  emptyCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 24,
    paddingHorizontal: 22,
    paddingVertical: 30,
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
