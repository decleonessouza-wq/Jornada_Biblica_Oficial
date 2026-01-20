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

export default function TermsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={stylesTokens.bg} />

      {/* Glow decorativo */}
      <View pointerEvents="none" style={styles.glowTopLeft} />
      <View pointerEvents="none" style={styles.glowMidRight} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* HERO */}
        <View style={[styles.hero, shadowCard()]}>
          <Text style={styles.title}>Termos de Uso</Text>
          <Text style={styles.subtitle}>
            {APP_INFO.name} • v{APP_INFO.version}
          </Text>
          <Text style={styles.updatedAt}>Atualizado em {UPDATED_AT}</Text>
        </View>

        {/* CARD PRINCIPAL */}
        <View style={[styles.card, shadowCard()]}>
          {/* SEÇÕES */}
          <Section title="1) Aceitação">
            Ao usar o {APP_INFO.name}, você concorda com estes Termos de Uso. Se não concordar, não
            utilize o app.
          </Section>

          <Section title="2) Objetivo do app">
            O {APP_INFO.name} é um aplicativo de apoio a um plano anual de leitura bíblica, com
            registro local de progresso, histórico e recursos de backup/restauração.
          </Section>

          <Section title="3) Conta e acesso">
            O app não exige criação de conta e não realiza autenticação. Todo o progresso é salvo
            localmente no dispositivo do usuário.
          </Section>

          <Section title="4) Responsabilidades do usuário">
            Você é responsável por manter backups quando julgar necessário, utilizar o app de forma
            lícita e não tentar explorar falhas ou vulnerabilidades do sistema.
          </Section>

          <Section title="5) Conteúdo externo e links">
            O app pode abrir leituras em sites externos (como BibleGateway ou Bíblia Online). O
            conteúdo e disponibilidade desses sites são de responsabilidade de seus respectivos
            provedores.
          </Section>

          <Section title="6) Disponibilidade">
            O aplicativo pode sofrer mudanças, correções, melhorias ou remoção de funcionalidades a
            qualquer momento.
          </Section>

          <Section title="7) Isenção de garantias">
            O app é fornecido “como está”, sem garantias de funcionamento contínuo, ausência de erros
            ou preservação absoluta de dados.
          </Section>

          <Section title="8) Limitação de responsabilidade">
            Na máxima extensão permitida por lei, o {APP_INFO.name} não se responsabiliza por perdas
            de dados ou danos decorrentes do uso do aplicativo.
          </Section>

          <Section title="9) Alterações destes termos">
            Estes Termos podem ser atualizados a qualquer momento. A data de atualização será sempre
            informada nesta tela.
          </Section>

          {/* CONTATO */}
          <View style={styles.contactBox}>
            <Text style={styles.contactTitle}>10) Contato</Text>

            <Text style={styles.contactHighlight}>
              © {new Date().getFullYear()} – Direitos Reservados
            </Text>

            <View style={styles.divider} />

            <ContactRow label="Responsável" value="Decleones Andrade de Souza" />
            <ContactRow label="WhatsApp" value="+55 66 99640-6038" />
            <ContactRow label="E-mail" value="Decleones@gmail.com" />
          </View>
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
});
