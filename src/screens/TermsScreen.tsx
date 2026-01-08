import { View, ScrollView, Text, StyleSheet, StatusBar } from "react-native";
import { APP_INFO } from "../constants/appInfo";
import { colors } from "../theme/colors";

export default function TermsScreen() {
  const updatedAt = "2026-01-07"; // Data de atualização

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F8" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* HEADER */}
        <View style={{ marginBottom: 20, alignItems: "center" }}>
          <Text style={styles.screenTitle}>Termos de Uso</Text>
          <Text style={styles.screenSubtitle}>
            {APP_INFO.name} • v{APP_INFO.version}
          </Text>
          <Text style={styles.updatedAt}>Atualizado em {updatedAt}</Text>
        </View>

        {/* CARD DE CONTEÚDO */}
        <View style={styles.card}>
          
          {/* Seções de Texto */}
          <View style={styles.section}>
             <Text style={styles.sectionTitle}>1) Aceitação</Text>
             <Text style={styles.paragraph}>
               Ao usar o {APP_INFO.name}, você concorda com estes Termos de Uso. Se não concordar, não utilize o app.
             </Text>
          </View>

          <View style={styles.section}>
             <Text style={styles.sectionTitle}>2) Objetivo do app</Text>
             <Text style={styles.paragraph}>
               O {APP_INFO.name} é um aplicativo de apoio a um plano anual de leitura bíblica, com registro local de progresso, histórico e recursos de backup/restauração.
             </Text>
          </View>

          <View style={styles.section}>
             <Text style={styles.sectionTitle}>3) Conta e acesso</Text>
             <Text style={styles.paragraph}>
               O app não exige criação de conta e não faz autenticação. O progresso é salvo no próprio dispositivo (armazenamento local).
             </Text>
          </View>

          <View style={styles.section}>
             <Text style={styles.sectionTitle}>4) Responsabilidades do usuário</Text>
             <Text style={styles.paragraph}>
               Você é responsável por: (a) manter cópias de backup do seu progresso quando julgar necessário; (b) não tentar explorar falhas do app; (c) usar o app de forma lícita.
             </Text>
          </View>

          <View style={styles.section}>
             <Text style={styles.sectionTitle}>5) Conteúdo externo e links</Text>
             <Text style={styles.paragraph}>
               O app pode abrir leituras em páginas externas (ex.: BibleGateway, Bíblia Online) dentro do WebView ou navegador. O conteúdo, disponibilidade e termos desses sites são de responsabilidade dos respectivos provedores. O app não controla, não garante e não se responsabiliza por conteúdo externo.
             </Text>
          </View>

          <View style={styles.section}>
             <Text style={styles.sectionTitle}>6) Disponibilidade</Text>
             <Text style={styles.paragraph}>
               O app pode sofrer mudanças, correções e melhorias a qualquer momento, inclusive remoção/alteração de funcionalidades.
             </Text>
          </View>

          <View style={styles.section}>
             <Text style={styles.sectionTitle}>7) Isenção de garantias</Text>
             <Text style={styles.paragraph}>
               O app é fornecido “como está”, sem garantias de funcionamento ininterrupto, ausência de erros ou preservação de dados.
             </Text>
          </View>

          <View style={styles.section}>
             <Text style={styles.sectionTitle}>8) Limitação de responsabilidade</Text>
             <Text style={styles.paragraph}>
               Na máxima extensão permitida por lei, o {APP_INFO.name} não se responsabiliza por perdas de dados, danos indiretos ou prejuízos decorrentes do uso ou impossibilidade de uso do app.
             </Text>
          </View>

          <View style={styles.section}>
             <Text style={styles.sectionTitle}>9) Alterações destes termos</Text>
             <Text style={styles.paragraph}>
               Estes Termos podem ser atualizados. A data de atualização será revisada nesta tela. Ao continuar usando o app após alterações, você concorda com a versão atual.
             </Text>
          </View>

          {/* Seção de Contato Destacada */}
          <View style={styles.contactBox}>
             <Text style={[styles.sectionTitle, { color: colors.primary, marginBottom: 8 }]}>
                10) Contato
             </Text>
             
             <Text style={styles.contactText}>
                @2026 - Direitos Reservados.
             </Text>
             
             <View style={styles.divider} />
             
             <Text style={styles.contactLabel}>Responsável:</Text>
             <Text style={styles.contactValue}>Decleones Andrade de Souza</Text>

             <Text style={styles.contactLabel}>Cel/WhatsApp:</Text>
             <Text style={styles.contactValue}>+55 66 99640-6038</Text>

             <Text style={styles.contactLabel}>E-mail:</Text>
             <Text style={styles.contactValue}>Decleones@gmail.com</Text>
          </View>

          <Text style={styles.footerText}>
            © {new Date().getFullYear()} {APP_INFO.name}
          </Text>

        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// === ESTILOS ===
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
  },
  // Header
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
  },
  screenSubtitle: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 2,
  },
  updatedAt: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 4,
    fontStyle: "italic",
  },
  // Card Principal
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  // Seções de Texto
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
    textAlign: "justify",
  },
  // Box de Contato
  contactBox: {
    backgroundColor: "#F9F9F9",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    marginTop: 10,
    marginBottom: 10,
  },
  contactText: {
    fontSize: 14,
    color: colors.text,
    textAlign: "center",
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
  contactLabel: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 6,
  },
  contactValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "500",
  },
  // Footer
  footerText: {
    fontSize: 12,
    color: colors.muted,
    textAlign: "center",
    marginTop: 20,
  },
});