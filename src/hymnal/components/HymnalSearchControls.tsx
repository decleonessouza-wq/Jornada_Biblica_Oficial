import React from "react";
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors } from "../../theme/colors";
import type {
  HymnalSearchTextMode,
} from "../repositories/hymnalSearchRepository";

type HymnalSearchControlsProps = Readonly<{
  query: string;
  mode: HymnalSearchTextMode;
  active: boolean;
  resultCount: number;
  hasMore: boolean;
  searching: boolean;
  loadingMore: boolean;
  errorMessage: string | null;
  loadMoreErrorMessage: string | null;
  onChangeQuery: (value: string) => void;
  onChangeMode: (
    mode: HymnalSearchTextMode,
  ) => void;
  onSubmit: () => void;
  onClear: () => void;
  onLoadMore: () => void;
}>;

export default function HymnalSearchControls({
  query,
  mode,
  active,
  resultCount,
  hasMore,
  searching,
  loadingMore,
  errorMessage,
  loadMoreErrorMessage,
  onChangeQuery,
  onChangeMode,
  onSubmit,
  onClear,
  onLoadMore,
}: HymnalSearchControlsProps) {
  const busy = searching || loadingMore;

  const handleSubmit = () => {
    if (busy) {
      return;
    }

    Keyboard.dismiss();
    onSubmit();
  };

  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>
        BUSCA NA HARPA
      </Text>
      <Text style={styles.title}>
        Encontre um hino
      </Text>
      <Text style={styles.hint}>
        Procure por uma palavra ou frase conhecida.
      </Text>

      <TextInput
        accessibilityLabel="Texto para buscar na Harpa"
        accessibilityHint="Digite uma palavra ou frase do hino"
        value={query}
        onChangeText={onChangeQuery}
        onSubmitEditing={handleSubmit}
        placeholder="Ex.: graça ou firme nas promessas"
        placeholderTextColor={colors.muted}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        editable={!busy}
        style={styles.input}
        testID="hymnal-search-input"
      />

      <View
        accessibilityRole="radiogroup"
        style={styles.modeRow}
      >
        <Pressable
          accessibilityRole="radio"
          accessibilityState={{
            selected: mode === "WORD",
          }}
          accessibilityLabel="Buscar uma palavra"
          disabled={busy}
          onPress={() => onChangeMode("WORD")}
          style={({ pressed }) => [
            styles.modeButton,
            mode === "WORD" &&
              styles.modeButtonSelected,
            pressed &&
              !busy &&
              styles.modeButtonPressed,
          ]}
          testID="hymnal-search-mode-word"
        >
          <Text
            style={[
              styles.modeButtonText,
              mode === "WORD" &&
                styles.modeButtonTextSelected,
            ]}
          >
            Palavra
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="radio"
          accessibilityState={{
            selected: mode === "PHRASE",
          }}
          accessibilityLabel="Buscar uma frase"
          disabled={busy}
          onPress={() => onChangeMode("PHRASE")}
          style={({ pressed }) => [
            styles.modeButton,
            styles.modeButtonSpacing,
            mode === "PHRASE" &&
              styles.modeButtonSelected,
            pressed &&
              !busy &&
              styles.modeButtonPressed,
          ]}
          testID="hymnal-search-mode-phrase"
        >
          <Text
            style={[
              styles.modeButtonText,
              mode === "PHRASE" &&
                styles.modeButtonTextSelected,
            ]}
          >
            Frase
          </Text>
        </Pressable>
      </View>

      <View style={styles.actionRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Buscar na Harpa"
          disabled={busy}
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.searchButton,
            busy && styles.buttonDisabled,
            pressed &&
              !busy &&
              styles.searchButtonPressed,
          ]}
          testID="hymnal-search-submit"
        >
          {searching ? (
            <ActivityIndicator
              size="small"
              color={colors.textInverse}
            />
          ) : (
            <Text style={styles.searchButtonText}>
              Buscar
            </Text>
          )}
        </Pressable>

        {active && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Limpar busca da Harpa"
            disabled={busy}
            onPress={onClear}
            style={({ pressed }) => [
              styles.clearButton,
              busy && styles.buttonDisabled,
              pressed &&
                !busy &&
                styles.clearButtonPressed,
            ]}
            testID="hymnal-search-clear"
          >
            <Text style={styles.clearButtonText}>
              Limpar
            </Text>
          </Pressable>
        )}
      </View>

      {errorMessage && (
        <Text
          accessibilityLiveRegion="polite"
          style={styles.errorText}
        >
          {errorMessage}
        </Text>
      )}

      {active && !errorMessage && (
        <View style={styles.resultStatus}>
          <Text style={styles.resultStatusText}>
            {resultCount === 0
              ? "Nenhum resultado encontrado."
              : `${resultCount} resultado${resultCount === 1 ? "" : "s"} carregado${resultCount === 1 ? "" : "s"}.`}
          </Text>

          {hasMore && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Carregar mais resultados da Harpa"
              disabled={busy}
              onPress={onLoadMore}
              style={({ pressed }) => [
                styles.moreButton,
                busy && styles.buttonDisabled,
                pressed &&
                  !busy &&
                  styles.moreButtonPressed,
              ]}
              testID="hymnal-search-load-more"
            >
              {loadingMore ? (
                <ActivityIndicator
                  size="small"
                  color={colors.primary}
                />
              ) : (
                <Text style={styles.moreButtonText}>
                  Carregar mais
                </Text>
              )}
            </Pressable>
          )}
        </View>
      )}

      {active && loadMoreErrorMessage && (
        <Text
          accessibilityLiveRegion="polite"
          style={styles.errorText}
          testID="hymnal-search-load-more-error"
        >
          {loadMoreErrorMessage}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 16,
    padding: 16,
  },
  eyebrow: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.9,
  },
  title: {
    color: colors.textStrong,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 4,
  },
  hint: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },
  input: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    color: colors.textStrong,
    fontSize: 15,
    minHeight: 48,
    marginTop: 13,
    paddingHorizontal: 14,
  },
  modeRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  modeButton: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    minHeight: 42,
    paddingHorizontal: 12,
  },
  modeButtonSpacing: {
    marginLeft: 10,
  },
  modeButtonSelected: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  modeButtonPressed: {
    backgroundColor: colors.surfaceAlt,
  },
  modeButtonText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: "700",
  },
  modeButtonTextSelected: {
    color: colors.textStrong,
  },
  actionRow: {
    flexDirection: "row",
    marginTop: 12,
  },
  searchButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 14,
    flex: 1,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: 18,
  },
  searchButtonPressed: {
    backgroundColor: colors.primaryPressed,
  },
  searchButtonText: {
    color: colors.textInverse,
    fontSize: 15,
    fontWeight: "800",
  },
  clearButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: "center",
    marginLeft: 10,
    minHeight: 48,
    paddingHorizontal: 18,
  },
  clearButtonPressed: {
    backgroundColor: colors.surfaceAlt,
  },
  clearButtonText: {
    color: colors.textStrong,
    fontSize: 14,
    fontWeight: "800",
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
  },
  resultStatus: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  resultStatusText: {
    color: colors.textMuted,
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    paddingRight: 10,
  },
  moreButton: {
    alignItems: "center",
    backgroundColor: colors.primarySoft,
    borderRadius: 12,
    justifyContent: "center",
    minHeight: 38,
    minWidth: 112,
    paddingHorizontal: 12,
  },
  moreButtonPressed: {
    backgroundColor: colors.surfaceAlt,
  },
  moreButtonText: {
    color: colors.textStrong,
    fontSize: 12,
    fontWeight: "800",
  },
});
