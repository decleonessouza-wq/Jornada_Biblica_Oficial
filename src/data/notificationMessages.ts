// src/data/notificationMessages.ts

export type NotificationMessageType = "frase" | "versiculo" | "incentivo";

export type NotificationMessage = {
  id: number;
  type: NotificationMessageType;
  text: string;
  reference?: string; // só para versículos (opcional)
};

export const NOTIFICATION_MESSAGES: NotificationMessage[] = [
  // ====== PASTE_MESSAGES_JSON_HERE (INÍCIO) ======
  { "id": 1, "type": "frase", "text": "🌅 Comece o dia com Deus e termine em paz." },
  { "id": 2, "type": "versiculo", "text": "📖 Este é o dia que o Senhor fez; regozijemo-nos.", "reference": "Salmos 118:24" },

  { "id": 3, "type": "frase", "text": "🙏 Alguns minutos na Palavra mudam todo o dia." },
  { "id": 4, "type": "versiculo", "text": "📖 Lâmpada para os meus pés é a tua palavra.", "reference": "Salmos 119:105" },

  { "id": 5, "type": "frase", "text": "✨ Deus fala com quem separa tempo para ouvi-Lo." },
  { "id": 6, "type": "versiculo", "text": "📖 A minha ovelha ouve a minha voz.", "reference": "João 10:27" },

  { "id": 7, "type": "frase", "text": "📖 A constância na Palavra gera transformação." },
  { "id": 8, "type": "versiculo", "text": "📖 Antes tem o seu prazer na lei do Senhor.", "reference": "Salmos 1:2" },

  { "id": 9, "type": "frase", "text": "🕊️ Ler a Bíblia é descansar a alma em Deus." },
  { "id": 10, "type": "versiculo", "text": "📖 Vinde a mim todos os que estais cansados.", "reference": "Mateus 11:28" },

  { "id": 11, "type": "frase", "text": "🔥 A Palavra fortalece quem persevera." },
  { "id": 12, "type": "versiculo", "text": "📖 O Senhor é a minha força.", "reference": "Salmos 28:7" },

  { "id": 13, "type": "frase", "text": "📆 Um dia de cada vez, guiado por Deus." },
  { "id": 14, "type": "versiculo", "text": "📖 Entrega o teu caminho ao Senhor.", "reference": "Salmos 37:5" },

  { "id": 15, "type": "frase", "text": "🌱 Toda leitura gera crescimento espiritual." },
  { "id": 16, "type": "versiculo", "text": "📖 Crescei na graça e no conhecimento.", "reference": "2 Pedro 3:18" },

  { "id": 17, "type": "frase", "text": "💡 A Palavra ilumina decisões difíceis." },
  { "id": 18, "type": "versiculo", "text": "📖 Confia no Senhor de todo o teu coração.", "reference": "Provérbios 3:5" },

  { "id": 19, "type": "frase", "text": "📖 Deus honra quem O busca diariamente." },
  { "id": 20, "type": "versiculo", "text": "📖 Buscai primeiro o Reino de Deus.", "reference": "Mateus 6:33" },

  { "id": 21, "type": "frase", "text": "🙌 Perseverar hoje gera frutos amanhã." },
  { "id": 22, "type": "versiculo", "text": "📖 Não nos cansemos de fazer o bem.", "reference": "Gálatas 6:9" },

  { "id": 23, "type": "frase", "text": "🛤️ Deus guia cada passo de quem confia nEle." },
  { "id": 24, "type": "versiculo", "text": "📖 O Senhor firma os passos do homem.", "reference": "Salmos 37:23" },

  { "id": 25, "type": "frase", "text": "✨ A Palavra renova forças cansadas." },
  { "id": 26, "type": "versiculo", "text": "📖 Os que esperam no Senhor renovarão as forças.", "reference": "Isaías 40:31" },

  { "id": 27, "type": "frase", "text": "📖 Ler hoje é investir na sua fé." },
  { "id": 28, "type": "versiculo", "text": "📖 A fé vem pelo ouvir a Palavra.", "reference": "Romanos 10:17" },

  { "id": 29, "type": "frase", "text": "🙏 Deus age mesmo quando você não percebe." },
  { "id": 30, "type": "versiculo", "text": "📖 O Senhor pelejará por vós.", "reference": "Êxodo 14:14" },

  { "id": 31, "type": "frase", "text": "🔥 A Bíblia fortalece o coração aflito." },
  { "id": 32, "type": "versiculo", "text": "📖 O Senhor está perto dos que têm o coração quebrantado.", "reference": "Salmos 34:18" },

  { "id": 33, "type": "frase", "text": "🌄 Cada dia com Deus é um novo começo." },
  { "id": 34, "type": "versiculo", "text": "📖 As misericórdias do Senhor se renovam.", "reference": "Lamentações 3:22-23" },

  { "id": 35, "type": "frase", "text": "📖 Deus nunca abandona quem persevera." },
  { "id": 36, "type": "versiculo", "text": "📖 Não te deixarei, nem te desampararei.", "reference": "Hebreus 13:5" },

  { "id": 37, "type": "frase", "text": "🕊️ A Palavra traz paz ao coração." },
  { "id": 38, "type": "versiculo", "text": "📖 A paz de Deus guardará o vosso coração.", "reference": "Filipenses 4:7" },

  { "id": 39, "type": "frase", "text": "✨ Deus fala através da sua Palavra." },
  { "id": 40, "type": "versiculo", "text": "📖 Toda Escritura é inspirada por Deus.", "reference": "2 Timóteo 3:16" },

  { "id": 41, "type": "frase", "text": "📆 Um pequeno hábito diário gera grande fé." },
  { "id": 42, "type": "versiculo", "text": "📖 Sede firmes e constantes.", "reference": "1 Coríntios 15:58" },

  { "id": 43, "type": "frase", "text": "🙏 Deus honra a disciplina espiritual." },
  { "id": 44, "type": "versiculo", "text": "📖 Bem-aventurado o homem que confia no Senhor.", "reference": "Jeremias 17:7" },

  { "id": 45, "type": "frase", "text": "🔥 A Palavra sustenta em tempos difíceis." },
  { "id": 46, "type": "versiculo", "text": "📖 Deus é o nosso refúgio e fortaleza.", "reference": "Salmos 46:1" },

  { "id": 47, "type": "frase", "text": "✨ Ler a Bíblia é caminhar com Deus." },
  { "id": 48, "type": "versiculo", "text": "📖 Andai no caminho do Senhor.", "reference": "Deuteronômio 5:33" },

  { "id": 49, "type": "frase", "text": "🙌 Persevere: Deus vê sua fidelidade." },
  { "id": 50, "type": "versiculo", "text": "📖 O Senhor recompensará a tua fidelidade.", "reference": "Provérbios 28:20" },

  { "id": 51, "type": "frase", "text": "A Palavra de Deus sustenta quando tudo parece pesado." },
  { "id": 52, "type": "versiculo", "text": "O Senhor é a minha força e o meu escudo.", "reference": "Salmos 28:7" },

  { "id": 53, "type": "frase", "text": "Mesmo cansado, não deixe de ouvir a voz de Deus hoje." },
  { "id": 54, "type": "versiculo", "text": "Os que esperam no Senhor renovarão as suas forças.", "reference": "Isaías 40:31" },

  { "id": 55, "type": "frase", "text": "A fidelidade diária constrói uma fé sólida." },
  { "id": 56, "type": "versiculo", "text": "Sede perseverantes na oração.", "reference": "Romanos 12:12" },

  { "id": 57, "type": "frase", "text": "Deus se revela passo a passo, leitura por leitura." },
  { "id": 58, "type": "versiculo", "text": "Instrui-me, Senhor, no teu caminho.", "reference": "Salmos 86:11" },

  { "id": 59, "type": "frase", "text": "Não é quantidade, é constância na presença de Deus." },
  { "id": 60, "type": "versiculo", "text": "Bem-aventurados os que ouvem a palavra de Deus e a guardam.", "reference": "Lucas 11:28" },

  { "id": 61, "type": "frase", "text": "Cada dia na Palavra fortalece o espírito." },
  { "id": 62, "type": "versiculo", "text": "O temor do Senhor é o princípio da sabedoria.", "reference": "Provérbios 9:10" },

  { "id": 63, "type": "frase", "text": "Deus honra quem persevera, mesmo em silêncio." },
  { "id": 64, "type": "versiculo", "text": "Sê fiel até à morte, e dar-te-ei a coroa da vida.", "reference": "Apocalipse 2:10" },

  { "id": 65, "type": "frase", "text": "A Bíblia lida hoje será força amanhã." },
  { "id": 66, "type": "versiculo", "text": "Guardei a tua palavra no meu coração.", "reference": "Salmos 119:11" },

  { "id": 67, "type": "frase", "text": "Deus fala com quem decide parar e ouvir." },
  { "id": 68, "type": "versiculo", "text": "Fala, Senhor, porque o teu servo ouve.", "reference": "1 Samuel 3:10" },

  { "id": 69, "type": "frase", "text": "O alimento espiritual sustenta a caminhada." },
  { "id": 70, "type": "versiculo", "text": "Nem só de pão viverá o homem.", "reference": "Mateus 4:4" },

  { "id": 71, "type": "frase", "text": "A leitura diária fortalece a fé nos dias difíceis." },
  { "id": 72, "type": "versiculo", "text": "A fé vem pelo ouvir a palavra de Deus.", "reference": "Romanos 10:17" },

  { "id": 73, "type": "frase", "text": "Deus trabalha em quem permanece firme." },
  { "id": 74, "type": "versiculo", "text": "Aquele que começou boa obra em vós a aperfeiçoará.", "reference": "Filipenses 1:6" },

  { "id": 75, "type": "frase", "text": "Hoje é dia de ouvir, aprender e crescer." },
  { "id": 76, "type": "versiculo", "text": "Ensina-nos a contar os nossos dias.", "reference": "Salmos 90:12" },

  { "id": 77, "type": "frase", "text": "A Palavra corrige, consola e fortalece." },
  { "id": 78, "type": "versiculo", "text": "Toda a Escritura é inspirada por Deus.", "reference": "2 Timóteo 3:16" },

  { "id": 79, "type": "frase", "text": "Mesmo em silêncio, Deus está trabalhando." },
  { "id": 80, "type": "versiculo", "text": "O Senhor pelejará por vós.", "reference": "Êxodo 14:14" },

  { "id": 81, "type": "frase", "text": "Permaneça firme, a jornada vale a pena." },
  { "id": 82, "type": "versiculo", "text": "Combati o bom combate, completei a carreira.", "reference": "2 Timóteo 4:7" },

  { "id": 83, "type": "frase", "text": "A Palavra de Deus gera vida abundante." },
  { "id": 84, "type": "versiculo", "text": "Eu vim para que tenham vida.", "reference": "João 10:10" },

  { "id": 85, "type": "frase", "text": "Não desista hoje do que Deus começou em você." },
  { "id": 86, "type": "versiculo", "text": "Sede fortes e corajosos.", "reference": "Josué 1:9" },

  { "id": 87, "type": "frase", "text": "Deus fala também nos pequenos hábitos." },
  { "id": 88, "type": "versiculo", "text": "Quem é fiel no pouco também é fiel no muito.", "reference": "Lucas 16:10" },

  { "id": 89, "type": "frase", "text": "A leitura diária aproxima você de Deus." },
  { "id": 90, "type": "versiculo", "text": "Aproximai-vos de Deus, e Ele se aproximará.", "reference": "Tiago 4:8" },

  { "id": 91, "type": "frase", "text": "A Bíblia fortalece quando o coração está fraco." },
  { "id": 92, "type": "versiculo", "text": "O Senhor é bom e misericordioso.", "reference": "Salmos 145:9" },

  { "id": 93, "type": "frase", "text": "Hoje é dia de ouvir a voz do Senhor." },
  { "id": 94, "type": "versiculo", "text": "Hoje, se ouvirdes a sua voz, não endureçais o coração.", "reference": "Hebreus 3:15" },

  { "id": 95, "type": "frase", "text": "Quem anda com Deus nunca caminha sozinho." },
  { "id": 96, "type": "versiculo", "text": "O Senhor vai adiante de ti.", "reference": "Deuteronômio 31:8" },

  { "id": 97, "type": "frase", "text": "A Palavra prepara você para os desafios do dia." },
  { "id": 98, "type": "versiculo", "text": "Revesti-vos de toda a armadura de Deus.", "reference": "Efésios 6:11" },

  { "id": 99, "type": "frase", "text": "Cada leitura é um passo mais perto de Deus." },
  { "id": 100, "type": "versiculo", "text": "Bem-aventurados os que guardam a sua palavra.", "reference": "Apocalipse 1:3" },

  { "id": 101, "type": "frase", "text": "🌅 Comece o dia lembrando que Deus já está cuidando de tudo." },
  { "id": 102, "type": "versiculo", "text": "📖 Este é o dia que o Senhor fez; regozijemo-nos.", "reference": "Salmos 118:24" },

  { "id": 103, "type": "frase", "text": "🙏 A constância na Palavra transforma o coração." },
  { "id": 104, "type": "versiculo", "text": "📖 Bem-aventurado o homem que medita na lei do Senhor.", "reference": "Salmos 1:2" },

  { "id": 105, "type": "frase", "text": "🔥 Perseverar hoje é colher frutos amanhã." },
  { "id": 106, "type": "versiculo", "text": "📖 Não nos cansemos de fazer o bem.", "reference": "Gálatas 6:9" },

  { "id": 107, "type": "frase", "text": "✨ Deus se revela na simplicidade da leitura diária." },
  { "id": 108, "type": "versiculo", "text": "📖 A tua palavra é lâmpada para os meus pés.", "reference": "Salmos 119:105" },

  { "id": 109, "type": "frase", "text": "🛤️ Cada dia com Deus é um passo seguro." },
  { "id": 110, "type": "versiculo", "text": "📖 Confia no Senhor de todo o teu coração.", "reference": "Provérbios 3:5" },

  { "id": 111, "type": "frase", "text": "📖 A Palavra lida hoje fortalece sua fé amanhã." },
  { "id": 112, "type": "versiculo", "text": "📖 O Senhor é o meu pastor; nada me faltará.", "reference": "Salmos 23:1" },

  { "id": 113, "type": "frase", "text": "🕊️ Deus fala quando você decide ouvir." },
  { "id": 114, "type": "versiculo", "text": "📖 O Senhor guia os humildes na justiça.", "reference": "Salmos 25:9" },

  { "id": 115, "type": "frase", "text": "💡 A Bíblia ilumina decisões difíceis." },
  { "id": 116, "type": "versiculo", "text": "📖 Clama a mim, e responder-te-ei.", "reference": "Jeremias 33:3" },

  { "id": 117, "type": "frase", "text": "🌱 Pequenas leituras geram grandes raízes espirituais." },
  { "id": 118, "type": "versiculo", "text": "📖 O justo florescerá como a palmeira.", "reference": "Salmos 92:12" },

  { "id": 119, "type": "frase", "text": "⏳ Reserve tempo para Deus hoje." },
  { "id": 120, "type": "versiculo", "text": "📖 Buscai primeiro o Reino de Deus.", "reference": "Mateus 6:33" },

  { "id": 121, "type": "frase", "text": "💖 Deus honra quem permanece fiel." },
  { "id": 122, "type": "versiculo", "text": "📖 O Senhor firma os passos do homem bom.", "reference": "Salmos 37:23" },

  { "id": 123, "type": "frase", "text": "📘 A leitura diária fortalece sua caminhada espiritual." },
  { "id": 124, "type": "versiculo", "text": "📖 A palavra de Deus é viva e eficaz.", "reference": "Hebreus 4:12" },

  { "id": 125, "type": "frase", "text": "🌤️ Mesmo em dias nublados, Deus continua fiel." },
  { "id": 126, "type": "versiculo", "text": "📖 As misericórdias do Senhor se renovam a cada manhã.", "reference": "Lamentações 3:22-23" },

  { "id": 127, "type": "frase", "text": "🛡️ A Palavra fortalece contra o medo." },
  { "id": 128, "type": "versiculo", "text": "📖 O Senhor é a minha luz e salvação.", "reference": "Salmos 27:1" },

  { "id": 129, "type": "frase", "text": "📆 Um dia de cada vez, com Deus." },
  { "id": 130, "type": "versiculo", "text": "📖 Basta a cada dia o seu próprio mal.", "reference": "Mateus 6:34" },

  { "id": 131, "type": "frase", "text": "🙌 Ler a Bíblia é investir na eternidade." },
  { "id": 132, "type": "versiculo", "text": "📖 O céu e a terra passarão, mas as minhas palavras não.", "reference": "Mateus 24:35" },

  { "id": 133, "type": "frase", "text": "🧭 Deus guia quem confia." },
  { "id": 134, "type": "versiculo", "text": "📖 O Senhor te guiará continuamente.", "reference": "Isaías 58:11" },

  { "id": 135, "type": "frase", "text": "📖 A Palavra traz paz ao coração inquieto." },
  { "id": 136, "type": "versiculo", "text": "📖 A paz de Deus guardará o vosso coração.", "reference": "Filipenses 4:7" },

  { "id": 137, "type": "frase", "text": "🌟 Persevere: Deus está no controle." },
  { "id": 138, "type": "versiculo", "text": "📖 Entrega o teu caminho ao Senhor.", "reference": "Salmos 37:5" },

  { "id": 139, "type": "frase", "text": "📚 Cada leitura aproxima você da verdade." },
  { "id": 140, "type": "versiculo", "text": "📖 Conhecereis a verdade, e a verdade vos libertará.", "reference": "João 8:32" },

  { "id": 141, "type": "frase", "text": "🙏 Deus se revela a quem O busca de coração." },
  { "id": 142, "type": "versiculo", "text": "📖 Buscar-me-eis e me achareis.", "reference": "Jeremias 29:13" },

  { "id": 143, "type": "frase", "text": "🔥 A fé cresce quando alimentada diariamente." },
  { "id": 144, "type": "versiculo", "text": "📖 Sem fé é impossível agradar a Deus.", "reference": "Hebreus 11:6" },

  { "id": 145, "type": "frase", "text": "🕊️ Deus renova suas forças hoje." },
  { "id": 146, "type": "versiculo", "text": "📖 O Senhor é a força do seu povo.", "reference": "Salmos 28:8" },

  { "id": 147, "type": "frase", "text": "📖 Permaneça firme, mesmo quando não entender." },
  { "id": 148, "type": "versiculo", "text": "📖 Andamos por fé, não por vista.", "reference": "2 Coríntios 5:7" },

  { "id": 149, "type": "frase", "text": "✨ Deus honra quem não desiste da jornada." },
  { "id": 150, "type": "versiculo", "text": "📖 O Senhor cumprirá o seu propósito em mim.", "reference": "Salmos 138:8" },

  { "id": 151, "type": "frase", "text": "🌄 Deus já preparou graça suficiente para o dia de hoje." },
  { "id": 152, "type": "versiculo", "text": "📖 A minha graça te basta.", "reference": "2 Coríntios 12:9" },

  { "id": 153, "type": "frase", "text": "🙏 Quem começa o dia com Deus caminha em paz." },
  { "id": 154, "type": "versiculo", "text": "📖 O Senhor dará força ao seu povo.", "reference": "Salmos 29:11" },

  { "id": 155, "type": "frase", "text": "✨ A Palavra renova a mente e o coração." },
  { "id": 156, "type": "versiculo", "text": "📖 Sede transformados pela renovação da vossa mente.", "reference": "Romanos 12:2" },

  { "id": 157, "type": "frase", "text": "🛤️ Mesmo devagar, continue caminhando com Deus." },
  { "id": 158, "type": "versiculo", "text": "📖 O Senhor irá adiante de ti.", "reference": "Deuteronômio 31:8" },

  { "id": 159, "type": "frase", "text": "📖 A leitura diária fortalece sua fé silenciosamente." },
  { "id": 160, "type": "versiculo", "text": "📖 A fé vem pelo ouvir a Palavra de Deus.", "reference": "Romanos 10:17" },

  { "id": 161, "type": "frase", "text": "💡 Deus fala, mesmo quando tudo parece quieto." },
  { "id": 162, "type": "versiculo", "text": "📖 Aquietai-vos e sabei que eu sou Deus.", "reference": "Salmos 46:10" },

  { "id": 163, "type": "frase", "text": "🔥 Um coração fiel nunca caminha sozinho." },
  { "id": 164, "type": "versiculo", "text": "📖 O Senhor está perto dos que o invocam.", "reference": "Salmos 145:18" },

  { "id": 165, "type": "frase", "text": "🌱 Deus trabalha em você todos os dias." },
  { "id": 166, "type": "versiculo", "text": "📖 Aquele que começou a boa obra a completará.", "reference": "Filipenses 1:6" },

  { "id": 167, "type": "frase", "text": "📆 Um passo de fé hoje muda o amanhã." },
  { "id": 168, "type": "versiculo", "text": "📖 Tudo posso naquele que me fortalece.", "reference": "Filipenses 4:13" },

  { "id": 169, "type": "frase", "text": "🕊️ Deus cuida dos detalhes que você não vê." },
  { "id": 170, "type": "versiculo", "text": "📖 Lança o teu cuidado sobre o Senhor.", "reference": "Salmos 55:22" },

  { "id": 171, "type": "frase", "text": "✨ Perseverar na Palavra traz vida abundante." },
  { "id": 172, "type": "versiculo", "text": "📖 Eu vim para que tenham vida em abundância.", "reference": "João 10:10" },

  { "id": 173, "type": "frase", "text": "📖 A Bíblia consola, exorta e fortalece." },
  { "id": 174, "type": "versiculo", "text": "📖 O Deus de toda consolação nos consola.", "reference": "2 Coríntios 1:3" },

  { "id": 175, "type": "frase", "text": "🙌 Deus se agrada da constância, não da pressa." },
  { "id": 176, "type": "versiculo", "text": "📖 Melhor é o fim das coisas do que o princípio.", "reference": "Eclesiastes 7:8" },

  { "id": 177, "type": "frase", "text": "🛡️ A Palavra é abrigo em dias difíceis." },
  { "id": 178, "type": "versiculo", "text": "📖 Deus é o nosso refúgio e fortaleza.", "reference": "Salmos 46:1" },

  { "id": 179, "type": "frase", "text": "🌟 A obediência diária gera frutos eternos." },
  { "id": 180, "type": "versiculo", "text": "📖 Se me amais, guardai os meus mandamentos.", "reference": "João 14:15" },

  { "id": 181, "type": "frase", "text": "📘 A Palavra sustenta quando tudo falha." },
  { "id": 182, "type": "versiculo", "text": "📖 O Senhor sustém a todos os que caem.", "reference": "Salmos 145:14" },

  { "id": 183, "type": "frase", "text": "🙏 Deus honra quem O busca com sinceridade." },
  { "id": 184, "type": "versiculo", "text": "📖 Aproximai-vos de Deus, e Ele se aproximará.", "reference": "Tiago 4:8" },

  { "id": 185, "type": "frase", "text": "🔥 Cada leitura é uma semente de fé." },
  { "id": 186, "type": "versiculo", "text": "📖 Aquele que semeia com fé colherá com alegria.", "reference": "Salmos 126:5" },

  { "id": 187, "type": "frase", "text": "🕊️ Deus está presente mesmo no silêncio." },
  { "id": 188, "type": "versiculo", "text": "📖 O Senhor está contigo por onde quer que andares.", "reference": "Josué 1:9" },

  { "id": 189, "type": "frase", "text": "✨ A fidelidade diária constrói uma fé sólida." },
  { "id": 190, "type": "versiculo", "text": "📖 O justo viverá pela fé.", "reference": "Romanos 1:17" },

  { "id": 191, "type": "frase", "text": "📖 Deus nunca se atrasa em suas promessas." },
  { "id": 192, "type": "versiculo", "text": "📖 Fiel é o Senhor em todas as suas promessas.", "reference": "Salmos 145:13" },

  { "id": 193, "type": "frase", "text": "🌄 Um novo dia, uma nova oportunidade com Deus." },
  { "id": 194, "type": "versiculo", "text": "📖 Este é o dia que o Senhor fez.", "reference": "Salmos 118:24" },

  { "id": 195, "type": "frase", "text": "🙏 Continue firme: Deus vê sua perseverança." },
  { "id": 196, "type": "versiculo", "text": "📖 Sede firmes e constantes na obra do Senhor.", "reference": "1 Coríntios 15:58" },

  { "id": 197, "type": "frase", "text": "✨ A Palavra de Deus nunca volta vazia." },
  { "id": 198, "type": "versiculo", "text": "📖 A minha palavra não voltará vazia.", "reference": "Isaías 55:11" },

  { "id": 199, "type": "frase", "text": "🙌 Persevere hoje, Deus cuida do amanhã." },
  { "id": 200, "type": "versiculo", "text": "📖 O Senhor cumprirá o seu propósito.", "reference": "Salmos 57:2" },

  // ✅ daqui em diante: incentivos (201..350) — SEM abrir novo array!
  { "id": 201, "type": "incentivo", "text": "🌤️ Comece pequeno hoje. Constância vence pressa." },
  { "id": 202, "type": "incentivo", "text": "🔥 Um capítulo por vez. Uma vida transformada." },
  { "id": 203, "type": "incentivo", "text": "🧭 Se você tem direção, o passo de hoje já vale." },
  { "id": 204, "type": "incentivo", "text": "📖 A Palavra não pesa: ela sustenta." },
  { "id": 205, "type": "incentivo", "text": "💡 Disciplina é fé em movimento." },
  { "id": 206, "type": "incentivo", "text": "🌱 A semente é pequena. O fruto é grande." },
  { "id": 207, "type": "incentivo", "text": "⏳ Dez minutos com Deus mudam o resto do dia." },
  { "id": 208, "type": "incentivo", "text": "🛡️ Seu coração precisa de alimento, não de barulho." },
  { "id": 209, "type": "incentivo", "text": "🎯 Hoje é um ótimo dia para recomeçar com propósito." },
  { "id": 210, "type": "incentivo", "text": "🌊 Não pare na margem. Avance na leitura." },
  { "id": 211, "type": "incentivo", "text": "✨ A constância de hoje é o testemunho de amanhã." },
  { "id": 212, "type": "incentivo", "text": "🕯️ Uma luz por dia afasta muitas sombras." },
  { "id": 213, "type": "incentivo", "text": "🏃‍♂️ Não é velocidade. É perseverança." },
  { "id": 214, "type": "incentivo", "text": "🎵 Leia com calma: Deus fala até no silêncio." },
  { "id": 215, "type": "incentivo", "text": "🧱 Tijolo por tijolo: você está construindo fé." },
  { "id": 216, "type": "incentivo", "text": "🌟 Pequenas decisões diárias geram grandes vitórias." },
  { "id": 217, "type": "incentivo", "text": "📌 Faça do hoje um altar: Palavra, oração e paz." },
  { "id": 218, "type": "incentivo", "text": "🪶 Leve o coração a Deus antes de levar o dia ao mundo." },
  { "id": 219, "type": "incentivo", "text": "💪 Você não está atrasado: você está a caminho." },
  { "id": 220, "type": "incentivo", "text": "🔁 Recomeçar não é falhar. É amadurecer." },
  { "id": 221, "type": "incentivo", "text": "🌼 Fidelidade no secreto gera força no público." },
  { "id": 222, "type": "incentivo", "text": "📖 Um dia sem Palavra é um dia com menos direção." },
  { "id": 223, "type": "incentivo", "text": "🧠 Alimente a mente com verdade. O resto se alinha." },
  { "id": 224, "type": "incentivo", "text": "🧡 Sua jornada é única. Compare-se apenas com ontem." },
  { "id": 225, "type": "incentivo", "text": "🌙 Se hoje foi difícil, leia mesmo assim: Deus consola." },
  { "id": 226, "type": "incentivo", "text": "☀️ Amanheça com propósito: abra a Bíblia." },
  { "id": 227, "type": "incentivo", "text": "🧩 Cada leitura encaixa mais uma peça da sua fé." },
  { "id": 228, "type": "incentivo", "text": "📌 Foco no próximo passo, não no caminho inteiro." },
  { "id": 229, "type": "incentivo", "text": "🕊️ Deus honra quem não desiste." },
  { "id": 230, "type": "incentivo", "text": "🌿 Quando faltar força, mantenha o hábito." },
  { "id": 231, "type": "incentivo", "text": "🚪 Abra a Bíblia como quem abre uma porta para a paz." },
  { "id": 232, "type": "incentivo", "text": "🎯 Prioridade não é tempo; é escolha." },
  { "id": 233, "type": "incentivo", "text": "🧭 Deus guia passo a passo, não de uma vez." },
  { "id": 234, "type": "incentivo", "text": "💎 Persevere: o tesouro está na continuidade." },
  { "id": 235, "type": "incentivo", "text": "📖 Leia hoje para viver melhor amanhã." },
  { "id": 236, "type": "incentivo", "text": "🔥 O fogo se mantém com lenha diária." },
  { "id": 237, "type": "incentivo", "text": "🧱 O que você lê hoje sustenta o que você enfrenta." },
  { "id": 238, "type": "incentivo", "text": "🕰️ Um tempo com Deus sempre vale o tempo." },
  { "id": 239, "type": "incentivo", "text": "🧡 Não espere o ânimo. Aja com fé." },
  { "id": 240, "type": "incentivo", "text": "🌊 Mesmo devagar, siga: você está avançando." },
  { "id": 241, "type": "incentivo", "text": "📌 Hoje: menos distração, mais devoção." },
  { "id": 242, "type": "incentivo", "text": "🌟 A Palavra é farol quando tudo fica confuso." },
  { "id": 243, "type": "incentivo", "text": "🛠️ Deus trabalha em você enquanto você permanece." },
  { "id": 244, "type": "incentivo", "text": "📖 Se o dia está pesado, a leitura é descanso." },
  { "id": 245, "type": "incentivo", "text": "🧭 Caminhe com Deus e você não anda perdido." },
  { "id": 246, "type": "incentivo", "text": "💡 Clareza espiritual começa com hábitos simples." },
  { "id": 247, "type": "incentivo", "text": "⛺ A presença de Deus é seu lugar seguro." },
  { "id": 248, "type": "incentivo", "text": "🎯 Faça o essencial: leia hoje." },
  { "id": 249, "type": "incentivo", "text": "🌿 O coração floresce onde a Palavra é regada." },
  { "id": 250, "type": "incentivo", "text": "🕊️ Paz não se encontra: se constrói com Deus." },
  { "id": 251, "type": "incentivo", "text": "📖 Um versículo pode mudar um pensamento inteiro." },
  { "id": 252, "type": "incentivo", "text": "🔔 Lembre-se: Deus não falha. Continue." },
  { "id": 253, "type": "incentivo", "text": "🌤️ Hoje é oportunidade, não cobrança." },
  { "id": 254, "type": "incentivo", "text": "🧱 Constância é oração em forma de rotina." },
  { "id": 255, "type": "incentivo", "text": "🔥 Você não precisa sentir para fazer. Faça e sinta depois." },
  { "id": 256, "type": "incentivo", "text": "📌 A Bíblia aberta é um coração alinhado." },
  { "id": 257, "type": "incentivo", "text": "🧠 Troque ansiedade por Palavra." },
  { "id": 258, "type": "incentivo", "text": "🌿 Você está plantando eternidade no cotidiano." },
  { "id": 259, "type": "incentivo", "text": "🕯️ Um pouco de luz hoje vale mais que muita dúvida." },
  { "id": 260, "type": "incentivo", "text": "🏁 Progresso real é o que você sustenta." },
  { "id": 261, "type": "incentivo", "text": "💬 Deus fala. Sua parte é parar e ouvir." },
  { "id": 262, "type": "incentivo", "text": "📖 Faça da Palavra seu primeiro conselho do dia." },
  { "id": 263, "type": "incentivo", "text": "🧭 O rumo certo começa com um coração ensinável." },
  { "id": 264, "type": "incentivo", "text": "🌟 Você não está sozinho: continue firme." },
  { "id": 265, "type": "incentivo", "text": "🛡️ A leitura diária fortalece sua fé para as batalhas." },
  { "id": 266, "type": "incentivo", "text": "⏳ Não espere sobrar tempo. Separe tempo." },
  { "id": 267, "type": "incentivo", "text": "🌿 Um dia de cada vez. Um capítulo de cada vez." },
  { "id": 268, "type": "incentivo", "text": "💎 O que Deus começa, Ele sustenta." },
  { "id": 269, "type": "incentivo", "text": "🎯 Hoje você pode avançar 1%. Isso já é vitória." },
  { "id": 270, "type": "incentivo", "text": "📌 A constância é a linguagem dos maduros." },
  { "id": 271, "type": "incentivo", "text": "🕊️ Quem anda com Deus aprende a descansar." },
  { "id": 272, "type": "incentivo", "text": "🔥 Um coração aquecido pela Palavra resiste ao frio do mundo." },
  { "id": 273, "type": "incentivo", "text": "📖 Hoje, Deus tem algo para você. Abra a Bíblia." },
  { "id": 274, "type": "incentivo", "text": "🧠 Direção espiritual vem antes de decisão prática." },
  { "id": 275, "type": "incentivo", "text": "🌤️ A graça te chama para perto, não para longe." },
  { "id": 276, "type": "incentivo", "text": "🏗️ Persevere: hábitos santos constroem futuro santo." },
  { "id": 277, "type": "incentivo", "text": "🔁 Se perdeu um dia, retome hoje sem culpa." },
  { "id": 278, "type": "incentivo", "text": "📌 Leia com fé: Deus honra quem busca." },
  { "id": 279, "type": "incentivo", "text": "🌿 O ordinário vira extraordinário com Deus." },
  { "id": 280, "type": "incentivo", "text": "🕯️ A Palavra ilumina antes de explicar." },
  { "id": 281, "type": "incentivo", "text": "🏁 Quem termina é quem continua." },
  { "id": 282, "type": "incentivo", "text": "💬 Respire. Ore. Leia. Recomece." },
  { "id": 283, "type": "incentivo", "text": "📖 Um compromisso diário com Deus muda seu ano." },
  { "id": 284, "type": "incentivo", "text": "🧭 Você não precisa ver tudo, só obedecer hoje." },
  { "id": 285, "type": "incentivo", "text": "🌟 Há paz do outro lado da obediência." },
  { "id": 286, "type": "incentivo", "text": "🛡️ Palavra no coração, firmeza na vida." },
  { "id": 287, "type": "incentivo", "text": "⏳ O hoje é seu melhor investimento espiritual." },
  { "id": 288, "type": "incentivo", "text": "🌿 Constância é amor com prova." },
  { "id": 289, "type": "incentivo", "text": "💎 Deus não desperdiça sua fidelidade." },
  { "id": 290, "type": "incentivo", "text": "🎯 Faça o que depende de você: abrir a Bíblia." },
  { "id": 291, "type": "incentivo", "text": "📌 Um coração disposto aprende rápido." },
  { "id": 292, "type": "incentivo", "text": "🕊️ A paz cresce onde a Palavra habita." },
  { "id": 293, "type": "incentivo", "text": "🔥 Não negocie seu tempo com Deus." },
  { "id": 294, "type": "incentivo", "text": "📖 Deus te encontra na rotina." },
  { "id": 295, "type": "incentivo", "text": "🧠 Menos ruído, mais verdade." },
  { "id": 296, "type": "incentivo", "text": "🌤️ Hoje ainda dá tempo de fazer o essencial." },
  { "id": 297, "type": "incentivo", "text": "🏗️ O hábito de hoje vira força amanhã." },
  { "id": 298, "type": "incentivo", "text": "🔁 A jornada não exige perfeição. Exige retorno." },
  { "id": 299, "type": "incentivo", "text": "📌 Um passo com Deus vale mais que mil sozinho." },
  { "id": 300, "type": "incentivo", "text": "🌿 Continue: Deus está formando caráter em você." },
  { "id": 301, "type": "incentivo", "text": "🕯️ Você foi feito para a luz. Caminhe nela." },
  { "id": 302, "type": "incentivo", "text": "🏁 Não pare por cansaço. Descanse e continue." },
  { "id": 303, "type": "incentivo", "text": "💬 Um minuto de oração abre caminho para a leitura." },
  { "id": 304, "type": "incentivo", "text": "📖 A Palavra te firma quando o mundo te puxa." },
  { "id": 305, "type": "incentivo", "text": "🧭 Direção vem de Deus, não do desespero." },
  { "id": 306, "type": "incentivo", "text": "🌟 Você está mais perto do que imagina." },
  { "id": 307, "type": "incentivo", "text": "🛡️ Sua fé cresce no lugar da disciplina." },
  { "id": 308, "type": "incentivo", "text": "⏳ Hoje é o dia certo para a decisão certa." },
  { "id": 309, "type": "incentivo", "text": "🌿 A Palavra é água: regue sua alma." },
  { "id": 310, "type": "incentivo", "text": "💎 O céu valoriza a fidelidade diária." },
  { "id": 311, "type": "incentivo", "text": "🎯 Menos desculpas. Mais encontro com Deus." },
  { "id": 312, "type": "incentivo", "text": "📌 Perseverar é espiritualidade prática." },
  { "id": 313, "type": "incentivo", "text": "🕊️ Quando você para, Deus fala." },
  { "id": 314, "type": "incentivo", "text": "🔥 A chama se mantém com presença." },
  { "id": 315, "type": "incentivo", "text": "📖 Um dia bem vivido começa bem alimentado." },
  { "id": 316, "type": "incentivo", "text": "🧠 Você não precisa de mais motivação, precisa de ritmo." },
  { "id": 317, "type": "incentivo", "text": "🌤️ Deus te chama para perto, sempre." },
  { "id": 318, "type": "incentivo", "text": "🏗️ Não subestime o poder do hábito santo." },
  { "id": 319, "type": "incentivo", "text": "🔁 Se caiu, levante. Se falhou, retome." },
  { "id": 320, "type": "incentivo", "text": "📌 O que você repete, você se torna." },
  { "id": 321, "type": "incentivo", "text": "🌿 A Palavra é raiz: aprofunde-se." },
  { "id": 322, "type": "incentivo", "text": "🕯️ Uma mente iluminada gera escolhas melhores." },
  { "id": 323, "type": "incentivo", "text": "🏁 Você vai vencer mantendo o compromisso." },
  { "id": 324, "type": "incentivo", "text": "💬 Faça hoje o que você agradecerá amanhã." },
  { "id": 325, "type": "incentivo", "text": "📖 Deus usa sua disciplina como ponte para a graça." },
  { "id": 326, "type": "incentivo", "text": "🧭 Você está sendo guiado. Continue." },
  { "id": 327, "type": "incentivo", "text": "🌟 Há esperança em cada novo dia com Deus." },
  { "id": 328, "type": "incentivo", "text": "🛡️ Palavra primeiro, ansiedade depois não." },
  { "id": 329, "type": "incentivo", "text": "⏳ Não adie seu encontro com Deus." },
  { "id": 330, "type": "incentivo", "text": "🌿 Crescimento espiritual é repetição com propósito." },
  { "id": 331, "type": "incentivo", "text": "💎 O que é fiel no pouco prospera no essencial." },
  { "id": 332, "type": "incentivo", "text": "🎯 Um capítulo hoje é vitória real." },
  { "id": 333, "type": "incentivo", "text": "📌 A disciplina abre portas que a emoção fecha." },
  { "id": 334, "type": "incentivo", "text": "🕊️ Deus te encontra onde você decide permanecer." },
  { "id": 335, "type": "incentivo", "text": "🔥 Persevere: o céu está trabalhando." },
  { "id": 336, "type": "incentivo", "text": "📖 A Palavra é alimento: não pule sua refeição." },
  { "id": 337, "type": "incentivo", "text": "🧠 Renovar a mente começa na leitura." },
  { "id": 338, "type": "incentivo", "text": "🌤️ O hoje é suficiente para Deus fazer algo novo." },
  { "id": 339, "type": "incentivo", "text": "🏗️ Não busque perfeição. Busque constância." },
  { "id": 340, "type": "incentivo", "text": "🔁 Se atrasou, ajuste. Se perdeu, retorne." },
  { "id": 341, "type": "incentivo", "text": "📌 Seu futuro espiritual começa agora." },
  { "id": 342, "type": "incentivo", "text": "🌿 O hábito certo no lugar certo muda tudo." },
  { "id": 343, "type": "incentivo", "text": "🕯️ A Palavra acende coragem." },
  { "id": 344, "type": "incentivo", "text": "🏁 Você vai completar. Continue firme." },
  { "id": 345, "type": "incentivo", "text": "💬 O céu celebra sua persistência." },
  { "id": 346, "type": "incentivo", "text": "📖 Deus recompensa quem O busca com sinceridade." },
  { "id": 347, "type": "incentivo", "text": "🧭 Caminhe em paz: um dia de cada vez." },
  { "id": 348, "type": "incentivo", "text": "🌟 Sua melhor versão nasce na presença de Deus." },
  { "id": 349, "type": "incentivo", "text": "🛡️ Você não luta sozinho. Fortaleça-se na Palavra." },
  { "id": 350, "type": "incentivo", "text": "⏳ Hoje é um presente. Use-o com Deus." }
];

export function getRandomNotificationMessage(
  types?: NotificationMessageType[]
): NotificationMessage | null {
  const list =
    Array.isArray(types) && types.length > 0
      ? NOTIFICATION_MESSAGES.filter((m) => types.includes(m.type))
      : NOTIFICATION_MESSAGES;

  if (!list.length) return null;

  const idx = Math.floor(Math.random() * list.length);
  return list[idx] ?? null;
}
