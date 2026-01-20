import React from "react";
import { View, ScrollView, Text, StyleSheet, StatusBar, Platform } from "react-native";
import { APP_INFO } from "../constants/appInfo";
import { colors } from "../theme/colors";

const UPDATED_AT = "2026-01-07";

function shadowCard() {
  return Platform.select({
    android: { elevation: 3 },
    ios: {
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
    },
    default: {},
  }) as any;
}

export default function PrivacyScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={stylesTokens.bg} />

      {/* Glow decorativo */}
      <View pointerEvents="none" style={styles.glowTopLeft} />
      <View pointerEvents="none" style={styles.glowMidRight} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* HERO */}
        <View style={[styles.hero, shadowCard()]}>
          <Text style={styles.title}>Política de Privacidade</Text>
          <Text style={styles.subtitle}>
            {APP_INFO.name} • v{APP_INFO.version}
          </Text>
          <Text style={styles.updatedAt}>Atualizado em {UPDATED_AT}</Text>
        </View>

        {/* CARD PRINCIPAL */}
        <View style={[styles.card, shadowCard()]}>
          <Section title="1) Dados coletados">
            O {APP_INFO.name} não coleta dados pessoais para servidores próprios. O app salva localmente no
            seu dispositivo apenas informações necessárias para funcionamento, como dias concluídos
            (“completedDays”) e preferências de leitura.
          </Section>

          <Section title="2) Onde os dados ficam">
            Os dados ficam armazenados localmente no seu dispositivo (AsyncStorage). Eles podem ser apagados
            ao remover o app, limpar dados do aplicativo ou executar o reset nas configurações.
          </Section>

          <Section title="3) Compartilhamento">
            O app não compartilha dados com terceiros. Caso você exporte um backup, o controle sobre
            armazenamento ou envio desse conteúdo é exclusivamente seu.
          </Section>

          <Section title="4) Conteúdo e links externos">
            O aplicativo pode abrir conteúdos bíblicos em sites de terceiros (como BibleGateway ou Bíblia
            Online). Esses serviços seguem suas próprias políticas de privacidade e podem coletar dados de
            navegação.
          </Section>

          <Section title="5) Segurança">
            Nenhum sistema é 100% seguro. Embora o {APP_INFO.name} não envie dados para servidores próprios,
            você é responsável por proteger seu dispositivo e guardar seus backups com cuidado.
          </Section>

          <Section title="6) Seus controles">
            Você pode exportar e importar backups, restaurar backups automáticos e apagar todo o progresso
            diretamente pela tela de Configurações.
          </Section>

          <Section title="7) Alterações desta política">
            Esta Política de Privacidade pode ser atualizada periodicamente. A data da última atualização
            estará sempre visível nesta tela.
          </Section>

          {/* CONTATO */}
          <View style={styles.contactBox}>
            <Text style={styles.contactTitle}>8) Contato</Text>

            <Text style={styles.contactHighlight}>© {new Date().getFullYear()} – Direitos Reservados</Text>

            <View style={styles.divider} />

            <ContactRow label="Responsável" value="Decleones Andrade de Souza" />
            <ContactRow label="WhatsApp" value="+55 66 99640-6038" />
            <ContactRow label="E-mail" value="Decleones@gmail.com" />
          </View>

          <Text style={styles.footerText}>
            © {new Date().getFullYear()} {APP_INFO.name}
          </Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

/* ======================
   COMPONENTES AUX
====================== */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.paragraph}>{children}</Text>
    </View>
  );
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={styles.contactLabel}>{label}</Text>
      <Text style={styles.contactValue}>{value}</Text>
    </View>
  );
}

/* ======================
   STYLES
====================== */

const stylesTokens = {
  bg: "#F4F6F8",
  card: "#FFFFFF",
  border: "rgba(0,0,0,0.06)",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: stylesTokens.bg,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 24,
  },

  // glow
  glowTopLeft: {
    position: "absolute",
    top: -160,
    left: -150,
    width: 360,
    height: 360,
    borderRadius: 999,
    backgroundColor: "rgba(4,206,146,0.10)",
  },
  glowMidRight: {
    position: "absolute",
    top: 240,
    right: -180,
    width: 420,
    height: 420,
    borderRadius: 999,
    backgroundColor: "rgba(218,165,32,0.10)",
  },

  hero: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: stylesTokens.border,
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.primary,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: colors.muted,
  },
  updatedAt: {
    marginTop: 6,
    fontSize: 12,
    color: colors.muted,
    fontStyle: "italic",
  },

  card: {
    backgroundColor: stylesTokens.card,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: stylesTokens.border,
  },

  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
    textAlign: "justify",
  },

  contactBox: {
    backgroundColor: "rgba(4,206,146,0.08)",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(4,206,146,0.16)",
    marginTop: 10,
  },
  contactTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.primary,
    marginBottom: 8,
  },
  contactHighlight: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.12)",
    marginVertical: 10,
  },
  contactLabel: {
    fontSize: 12,
    color: colors.muted,
  },
  contactValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "600",
  },

  footerText: {
    fontSize: 12,
    color: colors.muted,
    textAlign: "center",
    marginTop: 20,
  },
});
