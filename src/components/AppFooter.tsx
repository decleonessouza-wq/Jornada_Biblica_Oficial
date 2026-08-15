import { View, Text } from "react-native";
import { colors } from "../theme";
import { APP_INFO } from "../constants/appInfo";

export default function AppFooter() {
  return (
    <View style={{ marginTop: 18, paddingTop: 10 }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 11,
          color: colors.muted,
          lineHeight: 16,
        }}
      >
        {APP_INFO.name} – v {APP_INFO.version} - Ad Maiorem Dei Gloriam – by
        Decleones Andrade @2026. Direitos Reservados.
      </Text>
    </View>
  );
}
