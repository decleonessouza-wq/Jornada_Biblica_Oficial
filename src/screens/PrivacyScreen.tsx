import { View, ScrollView, Text, StyleSheet, StatusBar } from "react-native";
import { APP_INFO } from "../constants/appInfo";
import { colors } from "../theme/colors";

export default function PrivacyScreen() {
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
          <Text style={styles.screenTitle}>Política de Privacidade</Text>
          <Text style={styles.screenSubtitle}>
            {APP_INFO.name} • v{APP_INFO.version}
          </Text>
          <Text style={styles.updatedAt}>Atualizado em {updatedAt}</Text>
        </View>

        {/* CARD DE CONTEÚDO */}
        <View style={styles.card}>
          
          <View style={styles.section}>
             <Text style={styles.sectionTitle}>1) Dados coletados</Text>
             <Text style={styles.paragraph}>
               O {APP_INFO.name} não coleta dados pessoais para servidores próprios. O app salva localmente no seu dispositivo informações de uso necessárias para funcionar, como: dias concluídos (“completedDays”) e preferências (ex.: versão bíblica selecionada).
             </Text>
          </View>

          <View style={styles.section}>
             <Text style={styles.sectionTitle}>2) Onde os dados ficam</Text>
             <Text style={styles.paragraph}>
               Os dados ficam armazenados no armazenamento local do seu dispositivo (AsyncStorage). Eles podem ser apagados se você remover o app, limpar dados do app ou executar o “reset” nas configurações.
             </Text>
          </View>

          <View style={styles.section}>
             <Text style={styles.sectionTitle}>3) Compartilhamento</Text>
             <Text style={styles.paragraph}>
               O app não compartilha seus dados com terceiros. Quando você exporta backup como texto, você escolhe se irá copiar/guardar/compartilhar esse conteúdo por conta própria.
             </Text>
          </View>

          <View style={styles.section}>
             <Text style={styles.sectionTitle}>4) Links e conteúdo de terceiros</Text>
             <Text style={styles.paragraph}>
               O app pode abrir conteúdo bíblico em sites de terceiros (ex.: BibleGateway, Bíblia Online), dentro do WebView ou navegador. Esses serviços podem coletar dados de navegação conforme as políticas deles. Ao acessar sites externos, você estará sujeito aos termos e políticas desses provedores.
             </Text>
          </View>

          <View style={styles.section}>
             <Text style={styles.sectionTitle}>5) Segurança</Text>
             <Text style={styles.paragraph}>
               O app não envia dados para um servidor próprio. Ainda assim, nenhum sistema é 100% seguro. Você é responsável por manter seu dispositivo protegido e por guardar backups exportados com cuidado.
             </Text>
          </View>

          <View style={styles.section}>
             <Text style={styles.sectionTitle}>6) Seus controles</Text>
             <Text style={styles.paragraph}>
               Você pode: (a) exportar seu backup; (b) importar um backup; (c) restaurar do backup automático; (d) resetar e apagar todo o progresso usando a tela de Configurações.
             </Text>
          </View>

          <View style={styles.section}>
             <Text style={styles.sectionTitle}>7) Alterações desta política</Text>
             <Text style={styles.paragraph}>
               Esta Política pode ser atualizada. A data de atualização será revisada nesta tela. O uso contínuo do app após alterações indica aceitação da versão atual.
             </Text>
          </View>

          {/* Seção de Contato Destacada */}
          <View style={styles.contactBox}>
             <Text style={[styles.sectionTitle, { color: colors.primary, marginBottom: 8 }]}>
                8) Contato
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
    elevation: 2,
    shadowColor: "#000",
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