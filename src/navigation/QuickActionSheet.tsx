import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "../theme/colors";

export type QuickActionSheetProps = {
  visible: boolean;
  onClose: () => void;
  onOpenPlan: () => void;
  onOpenProgress: () => void;
  onOpenHistory: () => void;
};

type QuickActionButtonProps = {
  label: string;
  onPress: () => void;
};

function QuickActionButton({
  label,
  onPress,
}: QuickActionButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        pressed && styles.actionButtonPressed,
      ]}
    >
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
  );
}

export default function QuickActionSheet({
  visible,
  onClose,
  onOpenPlan,
  onOpenProgress,
  onOpenHistory,
}: QuickActionSheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalRoot}>
        <Pressable
          accessible={false}
          onPress={onClose}
          style={styles.backdrop}
        />

        <View
          style={[
            styles.sheet,
            {
              paddingBottom: Math.max(insets.bottom, 16),
            },
          ]}
        >
          <View style={styles.handle} />

          <Text style={styles.title}>Ações rápidas</Text>
          <Text style={styles.subtitle}>
            Escolha um destino para continuar sua jornada.
          </Text>

          <View style={styles.actions}>
            <QuickActionButton
              label="Abrir Plano"
              onPress={onOpenPlan}
            />

            <QuickActionButton
              label="Ver Progresso"
              onPress={onOpenProgress}
            />

            <QuickActionButton
              label="Abrir Histórico"
              onPress={onOpenHistory}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  handle: {
    alignSelf: "center",
    backgroundColor: colors.border,
    borderRadius: 999,
    height: 4,
    marginBottom: 16,
    width: 44,
  },
  title: {
    color: colors.textStrong,
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  actions: {
    gap: 10,
    marginTop: 20,
  },
  actionButton: {
    alignItems: "center",
    backgroundColor: colors.primarySoft,
    borderRadius: 14,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  actionButtonPressed: {
    backgroundColor: colors.secondarySoft,
  },
  actionLabel: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700",
  },
});
