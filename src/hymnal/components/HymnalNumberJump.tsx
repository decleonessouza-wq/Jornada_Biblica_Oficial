import React, {
  useCallback,
  useState,
} from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors } from "../../theme/colors";

type HymnalNumberJumpProps = Readonly<{
  maxNumber: number;
  onSubmitNumber: (
    hymnNumber: number,
  ) => boolean;
}>;

export default function HymnalNumberJump({
  maxNumber,
  onSubmitNumber,
}: HymnalNumberJumpProps) {
  const [value, setValue] = useState("");
  const [feedback, setFeedback] =
    useState<string | null>(null);

  const handleChangeText = useCallback(
    (nextValue: string) => {
      setValue(
        nextValue.replace(/[^0-9]/g, ""),
      );
      setFeedback(null);
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    if (value.length === 0) {
      setFeedback(
        "Informe o número do hino.",
      );
      return;
    }

    const hymnNumber = Number(value);

    if (
      !Number.isInteger(hymnNumber) ||
      hymnNumber <= 0 ||
      hymnNumber > maxNumber
    ) {
      setFeedback(
        `Digite um número entre 1 e ${maxNumber}.`,
      );
      return;
    }

    if (!onSubmitNumber(hymnNumber)) {
      setFeedback(
        `O hino nº ${hymnNumber} não está disponível nesta edição.`,
      );
      return;
    }

    setFeedback(
      `Hino nº ${hymnNumber} encontrado.`,
    );
    Keyboard.dismiss();
  }, [
    maxNumber,
    onSubmitNumber,
    value,
  ]);

  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>
        ACESSO DIRETO
      </Text>
      <Text style={styles.title}>
        Abrir hino pelo número
      </Text>
      <Text style={styles.hint}>
        Digite o número do hino para abrir mais rápido.
      </Text>

      <View style={styles.row}>
        <TextInput
          accessibilityLabel="Número do hino"
          accessibilityHint={`Digite um número entre 1 e ${maxNumber}`}
          value={value}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmit}
          placeholder={`1–${maxNumber}`}
          placeholderTextColor={colors.muted}
          keyboardType="number-pad"
          returnKeyType="go"
          maxLength={String(maxNumber).length}
          style={styles.input}
          testID="hymnal-number-jump-input"
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ir para o hino informado"
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          testID="hymnal-number-jump-button"
        >
          <Text style={styles.buttonText}>
            Ir
          </Text>
        </Pressable>
      </View>

      {feedback && (
        <Text
          accessibilityLiveRegion="polite"
          style={styles.feedback}
        >
          {feedback}
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
  row: {
    flexDirection: "row",
    marginTop: 13,
  },
  input: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    color: colors.textStrong,
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
    minHeight: 48,
    paddingHorizontal: 14,
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 14,
    justifyContent: "center",
    marginLeft: 10,
    minHeight: 48,
    paddingHorizontal: 20,
  },
  buttonPressed: {
    backgroundColor: colors.primaryPressed,
  },
  buttonText: {
    color: colors.textInverse,
    fontSize: 15,
    fontWeight: "800",
  },
  feedback: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
  },
});
