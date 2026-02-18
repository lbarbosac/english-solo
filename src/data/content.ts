// Game content data with phrases and dialogues for all levels
export interface PhraseContent {
  id: number;
  text: string;
  expectedTranscript: string;
  translation: string;
}

export interface DialogueLine {
  speaker: "A" | "B";
  text: string;
}

export interface DialogueContent {
  id: number;
  dialogue: DialogueLine[];
  expectedTranscript: string;
  translation: string;
}

export type GameContent = PhraseContent | DialogueContent;

export const easyPhrases: PhraseContent[] = [
  { id: 1, text: "Hello!", expectedTranscript: "hello", translation: "Olá!" },
  { id: 2, text: "Good morning.", expectedTranscript: "good morning", translation: "Bom dia." },
  { id: 3, text: "How are you?", expectedTranscript: "how are you", translation: "Como você está?" },
  { id: 4, text: "I'm fine.", expectedTranscript: "i'm fine", translation: "Estou bem." },
  { id: 5, text: "Thank you.", expectedTranscript: "thank you", translation: "Obrigado." },
  { id: 6, text: "You're welcome.", expectedTranscript: "you're welcome", translation: "De nada." },
  { id: 7, text: "Goodbye.", expectedTranscript: "goodbye", translation: "Adeus." },
  { id: 8, text: "See you later.", expectedTranscript: "see you later", translation: "Até logo." },
  { id: 9, text: "What's your name?", expectedTranscript: "what's your name", translation: "Qual é o seu nome?" },
  { id: 10, text: "My name is John.", expectedTranscript: "my name is john", translation: "Meu nome é John." },
  { id: 11, text: "Nice to meet you.", expectedTranscript: "nice to meet you", translation: "Prazer em conhecê-lo." },
  { id: 12, text: "I'm hungry.", expectedTranscript: "i'm hungry", translation: "Estou com fome." },
  { id: 13, text: "I'm thirsty.", expectedTranscript: "i'm thirsty", translation: "Estou com sede." },
  { id: 14, text: "I need help.", expectedTranscript: "i need help", translation: "Preciso de ajuda." },
  { id: 15, text: "Where is it?", expectedTranscript: "where is it", translation: "Onde está?" },
  { id: 16, text: "It's over there.", expectedTranscript: "it's over there", translation: "Está ali." },
  { id: 17, text: "How much?", expectedTranscript: "how much", translation: "Quanto custa?" },
  { id: 18, text: "That's expensive.", expectedTranscript: "that's expensive", translation: "Isso é caro." },
  { id: 19, text: "I don't understand.", expectedTranscript: "i don't understand", translation: "Não entendo." },
  { id: 20, text: "Please repeat.", expectedTranscript: "please repeat", translation: "Por favor, repita." },
  { id: 21, text: "Excuse me.", expectedTranscript: "excuse me", translation: "Com licença." },
  { id: 22, text: "I'm sorry.", expectedTranscript: "i'm sorry", translation: "Desculpe." },
  { id: 23, text: "No problem.", expectedTranscript: "no problem", translation: "Sem problema." },
  { id: 24, text: "Yes, please.", expectedTranscript: "yes please", translation: "Sim, por favor." },
  { id: 25, text: "No, thanks.", expectedTranscript: "no thanks", translation: "Não, obrigado." },
  { id: 26, text: "I like it.", expectedTranscript: "i like it", translation: "Eu gosto." },
  { id: 27, text: "I don't like it.", expectedTranscript: "i don't like it", translation: "Não gosto." },
  { id: 28, text: "It's good.", expectedTranscript: "it's good", translation: "É bom." },
  { id: 29, text: "It's bad.", expectedTranscript: "it's bad", translation: "É ruim." },
  { id: 30, text: "What time is it?", expectedTranscript: "what time is it", translation: "Que horas são?" },
  { id: 31, text: "It's ten o'clock.", expectedTranscript: "it's ten o'clock", translation: "São dez horas." },
  { id: 32, text: "I'm tired.", expectedTranscript: "i'm tired", translation: "Estou cansado." },
  { id: 33, text: "Good night.", expectedTranscript: "good night", translation: "Boa noite." },
  { id: 34, text: "Have a nice day.", expectedTranscript: "have a nice day", translation: "Tenha um bom dia." },
  { id: 35, text: "Take care.", expectedTranscript: "take care", translation: "Cuide-se." },
  { id: 36, text: "Wait a moment.", expectedTranscript: "wait a moment", translation: "Espere um momento." },
  { id: 37, text: "Come here.", expectedTranscript: "come here", translation: "Venha aqui." },
  { id: 38, text: "Let's go.", expectedTranscript: "let's go", translation: "Vamos." },
  { id: 39, text: "I'm happy.", expectedTranscript: "i'm happy", translation: "Estou feliz." },
  { id: 40, text: "That's great!", expectedTranscript: "that's great", translation: "Isso é ótimo!" },
  { id: 41, text: "I agree.", expectedTranscript: "i agree", translation: "Concordo." },
  { id: 42, text: "Maybe.", expectedTranscript: "maybe", translation: "Talvez." },
  { id: 43, text: "Of course.", expectedTranscript: "of course", translation: "Claro." },
  { id: 44, text: "I think so.", expectedTranscript: "i think so", translation: "Acho que sim." },
  { id: 45, text: "Not yet.", expectedTranscript: "not yet", translation: "Ainda não." },
  { id: 46, text: "Right now.", expectedTranscript: "right now", translation: "Agora mesmo." },
  { id: 47, text: "Just a little.", expectedTranscript: "just a little", translation: "Só um pouco." },
  { id: 48, text: "Very much.", expectedTranscript: "very much", translation: "Muito." },
  { id: 49, text: "Me too.", expectedTranscript: "me too", translation: "Eu também." },
  { id: 50, text: "That's right.", expectedTranscript: "that's right", translation: "Está certo." },
];

export const mediumPhrases: PhraseContent[] = [
  { id: 1, text: "Could you please help me?", expectedTranscript: "could you please help me", translation: "Você poderia me ajudar, por favor?" },
  { id: 2, text: "I'm looking for the train station.", expectedTranscript: "i'm looking for the train station", translation: "Estou procurando a estação de trem." },
  { id: 3, text: "What do you do for a living?", expectedTranscript: "what do you do for a living", translation: "O que você faz da vida?" },
  { id: 4, text: "I work as a software developer.", expectedTranscript: "i work as a software developer", translation: "Trabalho como desenvolvedor de software." },
  { id: 5, text: "How long have you lived here?", expectedTranscript: "how long have you lived here", translation: "Há quanto tempo você mora aqui?" },
  { id: 6, text: "I've been here for three years.", expectedTranscript: "i've been here for three years", translation: "Estou aqui há três anos." },
  { id: 7, text: "Would you like something to drink?", expectedTranscript: "would you like something to drink", translation: "Você gostaria de algo para beber?" },
  { id: 8, text: "I'll have a coffee, please.", expectedTranscript: "i'll have a coffee please", translation: "Vou querer um café, por favor." },
  { id: 9, text: "The weather is really nice today.", expectedTranscript: "the weather is really nice today", translation: "O tempo está muito bom hoje." },
  { id: 10, text: "I need to make a reservation.", expectedTranscript: "i need to make a reservation", translation: "Preciso fazer uma reserva." },
  { id: 11, text: "What time does the store close?", expectedTranscript: "what time does the store close", translation: "A que horas a loja fecha?" },
  { id: 12, text: "Can I pay with credit card?", expectedTranscript: "can i pay with credit card", translation: "Posso pagar com cartão de crédito?" },
  { id: 13, text: "I'm sorry, I'm running late.", expectedTranscript: "i'm sorry i'm running late", translation: "Desculpe, estou atrasado." },
  { id: 14, text: "Let me check my schedule.", expectedTranscript: "let me check my schedule", translation: "Deixe-me verificar minha agenda." },
  { id: 15, text: "I have a meeting at two o'clock.", expectedTranscript: "i have a meeting at two o'clock", translation: "Tenho uma reunião às duas horas." },
  { id: 16, text: "Could you speak more slowly?", expectedTranscript: "could you speak more slowly", translation: "Você poderia falar mais devagar?" },
  { id: 17, text: "I'm still learning English.", expectedTranscript: "i'm still learning english", translation: "Ainda estou aprendendo inglês." },
  { id: 18, text: "That sounds like a great idea.", expectedTranscript: "that sounds like a great idea", translation: "Isso parece uma ótima ideia." },
  { id: 19, text: "I really appreciate your help.", expectedTranscript: "i really appreciate your help", translation: "Agradeço muito sua ajuda." },
  { id: 20, text: "What are you doing this weekend?", expectedTranscript: "what are you doing this weekend", translation: "O que você vai fazer neste fim de semana?" },
  { id: 21, text: "I'm planning to visit my family.", expectedTranscript: "i'm planning to visit my family", translation: "Estou planejando visitar minha família." },
  { id: 22, text: "Have you ever been to Brazil?", expectedTranscript: "have you ever been to brazil", translation: "Você já esteve no Brasil?" },
  { id: 23, text: "I would love to travel more.", expectedTranscript: "i would love to travel more", translation: "Adoraria viajar mais." },
  { id: 24, text: "What's your favorite type of food?", expectedTranscript: "what's your favorite type of food", translation: "Qual é seu tipo de comida favorita?" },
  { id: 25, text: "I really enjoy Italian cuisine.", expectedTranscript: "i really enjoy italian cuisine", translation: "Eu realmente gosto de comida italiana." },
  { id: 26, text: "Do you have any recommendations?", expectedTranscript: "do you have any recommendations", translation: "Você tem alguma recomendação?" },
  { id: 27, text: "I think we should take a break.", expectedTranscript: "i think we should take a break", translation: "Acho que devemos fazer uma pausa." },
  { id: 28, text: "Let me know if you need anything.", expectedTranscript: "let me know if you need anything", translation: "Me avise se precisar de algo." },
  { id: 29, text: "I'm looking forward to meeting you.", expectedTranscript: "i'm looking forward to meeting you", translation: "Estou ansioso para conhecê-lo." },
  { id: 30, text: "It was nice talking to you.", expectedTranscript: "it was nice talking to you", translation: "Foi bom conversar com você." },
  { id: 31, text: "I need to improve my pronunciation.", expectedTranscript: "i need to improve my pronunciation", translation: "Preciso melhorar minha pronúncia." },
  { id: 32, text: "Practice makes perfect, they say.", expectedTranscript: "practice makes perfect they say", translation: "A prática leva à perfeição, dizem." },
  { id: 33, text: "I usually wake up at seven.", expectedTranscript: "i usually wake up at seven", translation: "Geralmente acordo às sete." },
  { id: 34, text: "My commute takes about an hour.", expectedTranscript: "my commute takes about an hour", translation: "Meu trajeto leva cerca de uma hora." },
  { id: 35, text: "I prefer working from home.", expectedTranscript: "i prefer working from home", translation: "Prefiro trabalhar de casa." },
  { id: 36, text: "Could you send me an email?", expectedTranscript: "could you send me an email", translation: "Você poderia me enviar um e-mail?" },
  { id: 37, text: "I'll get back to you soon.", expectedTranscript: "i'll get back to you soon", translation: "Entrarei em contato em breve." },
  { id: 38, text: "That's exactly what I meant.", expectedTranscript: "that's exactly what i meant", translation: "É exatamente o que eu quis dizer." },
  { id: 39, text: "I didn't quite catch that.", expectedTranscript: "i didn't quite catch that", translation: "Não entendi bem." },
  { id: 40, text: "Could you explain that again?", expectedTranscript: "could you explain that again", translation: "Você poderia explicar de novo?" },
  { id: 41, text: "I'm not sure I understand.", expectedTranscript: "i'm not sure i understand", translation: "Não tenho certeza se entendi." },
  { id: 42, text: "That makes a lot of sense.", expectedTranscript: "that makes a lot of sense", translation: "Isso faz muito sentido." },
  { id: 43, text: "I completely agree with you.", expectedTranscript: "i completely agree with you", translation: "Concordo completamente com você." },
  { id: 44, text: "I see your point, but...", expectedTranscript: "i see your point but", translation: "Entendo seu ponto, mas..." },
  { id: 45, text: "Let's meet up for lunch sometime.", expectedTranscript: "let's meet up for lunch sometime", translation: "Vamos almoçar juntos algum dia." },
  { id: 46, text: "I'm free on Tuesday afternoon.", expectedTranscript: "i'm free on tuesday afternoon", translation: "Estou livre na terça à tarde." },
  { id: 47, text: "Does that work for you?", expectedTranscript: "does that work for you", translation: "Isso funciona para você?" },
  { id: 48, text: "I'll mark it on my calendar.", expectedTranscript: "i'll mark it on my calendar", translation: "Vou marcar no meu calendário." },
  { id: 49, text: "Looking forward to it!", expectedTranscript: "looking forward to it", translation: "Estou ansioso por isso!" },
  { id: 50, text: "It's been a pleasure working together.", expectedTranscript: "it's been a pleasure working together", translation: "Foi um prazer trabalhar juntos." },
];

export const advancedDialogues: DialogueContent[] = [
  { id: 1, dialogue: [{ speaker: "A", text: "Good morning! I have a reservation under the name Smith." }, { speaker: "B", text: "Let me check... Yes, I found it. A double room for three nights, correct?" }, { speaker: "A", text: "That's right. Is breakfast included?" }], expectedTranscript: "good morning i have a reservation under the name smith", translation: "Bom dia! Tenho uma reserva no nome Smith." },
  { id: 2, dialogue: [{ speaker: "A", text: "Excuse me, I'm having trouble with the Wi-Fi connection." }, { speaker: "B", text: "I apologize for the inconvenience. Let me reset your access." }, { speaker: "A", text: "Thank you. I need it for a video conference." }], expectedTranscript: "excuse me i'm having trouble with the wifi connection", translation: "Com licença, estou tendo problemas com a conexão Wi-Fi." },
  { id: 3, dialogue: [{ speaker: "A", text: "I'd like to discuss the project timeline with you." }, { speaker: "B", text: "Sure, I have some concerns about the deadline." }, { speaker: "A", text: "What do you think would be a realistic timeframe?" }], expectedTranscript: "i'd like to discuss the project timeline with you", translation: "Gostaria de discutir o cronograma do projeto com você." },
  { id: 4, dialogue: [{ speaker: "A", text: "Have you had a chance to review the proposal?" }, { speaker: "B", text: "Yes, I think it needs some revisions in the budget section." }, { speaker: "A", text: "I agree. Let's schedule a meeting to go over the details." }], expectedTranscript: "have you had a chance to review the proposal", translation: "Você teve a chance de revisar a proposta?" },
  { id: 5, dialogue: [{ speaker: "A", text: "I'm calling to inquire about the job opening." }, { speaker: "B", text: "Of course! Are you available for an interview next week?" }, { speaker: "A", text: "Yes, I'm available on Wednesday or Thursday." }], expectedTranscript: "i'm calling to inquire about the job opening", translation: "Estou ligando para perguntar sobre a vaga de emprego." },
  { id: 6, dialogue: [{ speaker: "A", text: "Could you walk me through the main features of this product?" }, { speaker: "B", text: "Absolutely. The key benefit is its energy efficiency." }, { speaker: "A", text: "That's important. What about the warranty?" }], expectedTranscript: "could you walk me through the main features of this product", translation: "Você poderia me explicar as principais características deste produto?" },
  { id: 7, dialogue: [{ speaker: "A", text: "I noticed there's an error on my bill." }, { speaker: "B", text: "I'm so sorry about that. Let me look into it right away." }, { speaker: "A", text: "I appreciate your help in resolving this." }], expectedTranscript: "i noticed there's an error on my bill", translation: "Notei que há um erro na minha conta." },
  { id: 8, dialogue: [{ speaker: "A", text: "What's your opinion on the new company policy?" }, { speaker: "B", text: "I think it has both advantages and disadvantages." }, { speaker: "A", text: "Could you elaborate on the disadvantages?" }], expectedTranscript: "what's your opinion on the new company policy", translation: "Qual é sua opinião sobre a nova política da empresa?" },
  { id: 9, dialogue: [{ speaker: "A", text: "I'm thinking about pursuing a master's degree." }, { speaker: "B", text: "That's a great idea! What field are you considering?" }, { speaker: "A", text: "I'm interested in data science or machine learning." }], expectedTranscript: "i'm thinking about pursuing a master's degree", translation: "Estou pensando em fazer mestrado." },
  { id: 10, dialogue: [{ speaker: "A", text: "How do you usually handle stressful situations at work?" }, { speaker: "B", text: "I try to prioritize tasks and take short breaks." }, { speaker: "A", text: "That's a good approach. I should try that." }], expectedTranscript: "how do you usually handle stressful situations at work", translation: "Como você geralmente lida com situações estressantes no trabalho?" },
  { id: 11, dialogue: [{ speaker: "A", text: "I'd like to return this item. I have the receipt." }, { speaker: "B", text: "No problem. Would you prefer a refund or exchange?" }, { speaker: "A", text: "A refund would be great, thank you." }], expectedTranscript: "i'd like to return this item i have the receipt", translation: "Gostaria de devolver este item. Tenho o recibo." },
  { id: 12, dialogue: [{ speaker: "A", text: "Could you recommend a good restaurant nearby?" }, { speaker: "B", text: "There's an excellent Italian place two blocks away." }, { speaker: "A", text: "Do they take reservations?" }], expectedTranscript: "could you recommend a good restaurant nearby", translation: "Você poderia recomendar um bom restaurante por perto?" },
  { id: 13, dialogue: [{ speaker: "A", text: "I'm experiencing some technical difficulties with the software." }, { speaker: "B", text: "Have you tried restarting the application?" }, { speaker: "A", text: "Yes, but the problem persists." }], expectedTranscript: "i'm experiencing some technical difficulties with the software", translation: "Estou tendo algumas dificuldades técnicas com o software." },
  { id: 14, dialogue: [{ speaker: "A", text: "What's the best way to get to the airport from here?" }, { speaker: "B", text: "You can take the express train. It's faster than driving." }, { speaker: "A", text: "How long does it usually take?" }], expectedTranscript: "what's the best way to get to the airport from here", translation: "Qual é a melhor forma de chegar ao aeroporto daqui?" },
  { id: 15, dialogue: [{ speaker: "A", text: "I'm concerned about the project's progress." }, { speaker: "B", text: "What specific areas are you worried about?" }, { speaker: "A", text: "Mainly the integration phase and testing timeline." }], expectedTranscript: "i'm concerned about the project's progress", translation: "Estou preocupado com o progresso do projeto." },
  { id: 16, dialogue: [{ speaker: "A", text: "Do you have this shirt in a larger size?" }, { speaker: "B", text: "Let me check in the back. What color were you looking for?" }, { speaker: "A", text: "Navy blue, if possible." }], expectedTranscript: "do you have this shirt in a larger size", translation: "Você tem esta camisa em um tamanho maior?" },
  { id: 17, dialogue: [{ speaker: "A", text: "I'd like to open a savings account." }, { speaker: "B", text: "Certainly. Do you have two forms of identification?" }, { speaker: "A", text: "Yes, I have my passport and driver's license." }], expectedTranscript: "i'd like to open a savings account", translation: "Gostaria de abrir uma conta poupança." },
  { id: 18, dialogue: [{ speaker: "A", text: "What are your thoughts on remote work?" }, { speaker: "B", text: "I believe it increases productivity for many people." }, { speaker: "A", text: "I agree, though it requires good self-discipline." }], expectedTranscript: "what are your thoughts on remote work", translation: "O que você acha do trabalho remoto?" },
  { id: 19, dialogue: [{ speaker: "A", text: "I'm having trouble understanding the contract terms." }, { speaker: "B", text: "Which section is causing confusion?" }, { speaker: "A", text: "The cancellation policy isn't clear to me." }], expectedTranscript: "i'm having trouble understanding the contract terms", translation: "Estou tendo dificuldade para entender os termos do contrato." },
  { id: 20, dialogue: [{ speaker: "A", text: "How did the presentation go yesterday?" }, { speaker: "B", text: "It went really well. The client was impressed." }, { speaker: "A", text: "That's wonderful news! Congratulations!" }], expectedTranscript: "how did the presentation go yesterday", translation: "Como foi a apresentação ontem?" },
  { id: 21, dialogue: [{ speaker: "A", text: "Could we reschedule our meeting to next week?" }, { speaker: "B", text: "Sure, what day works best for you?" }, { speaker: "A", text: "How about Tuesday morning?" }], expectedTranscript: "could we reschedule our meeting to next week", translation: "Podemos remarcar nossa reunião para a próxima semana?" },
  { id: 22, dialogue: [{ speaker: "A", text: "I'd like to request some time off next month." }, { speaker: "B", text: "How many days were you thinking?" }, { speaker: "A", text: "About a week, from the 15th to the 22nd." }], expectedTranscript: "i'd like to request some time off next month", translation: "Gostaria de solicitar folga no próximo mês." },
  { id: 23, dialogue: [{ speaker: "A", text: "The flight has been delayed by two hours." }, { speaker: "B", text: "Will we still make our connection?" }, { speaker: "A", text: "I'm checking with the airline right now." }], expectedTranscript: "the flight has been delayed by two hours", translation: "O voo foi atrasado em duas horas." },
  { id: 24, dialogue: [{ speaker: "A", text: "What programming languages are you proficient in?" }, { speaker: "B", text: "I'm most comfortable with Python and JavaScript." }, { speaker: "A", text: "That's perfect for this position." }], expectedTranscript: "what programming languages are you proficient in", translation: "Em quais linguagens de programação você é proficiente?" },
  { id: 25, dialogue: [{ speaker: "A", text: "I've been having some health issues lately." }, { speaker: "B", text: "I'm sorry to hear that. Have you seen a doctor?" }, { speaker: "A", text: "Yes, I have an appointment scheduled for tomorrow." }], expectedTranscript: "i've been having some health issues lately", translation: "Tenho tido alguns problemas de saúde ultimamente." },
  { id: 26, dialogue: [{ speaker: "A", text: "Can you explain the differences between these two plans?" }, { speaker: "B", text: "The premium plan includes additional features and support." }, { speaker: "A", text: "Is it worth the extra cost?" }], expectedTranscript: "can you explain the differences between these two plans", translation: "Você pode explicar as diferenças entre esses dois planos?" },
  { id: 27, dialogue: [{ speaker: "A", text: "I need to submit my report by end of day." }, { speaker: "B", text: "Do you need any assistance with it?" }, { speaker: "A", text: "Actually, yes. Could you review the financial section?" }], expectedTranscript: "i need to submit my report by end of day", translation: "Preciso entregar meu relatório até o final do dia." },
  { id: 28, dialogue: [{ speaker: "A", text: "What are the payment options available?" }, { speaker: "B", text: "We accept credit cards, PayPal, and bank transfers." }, { speaker: "A", text: "Is there a discount for paying upfront?" }], expectedTranscript: "what are the payment options available", translation: "Quais são as opções de pagamento disponíveis?" },
  { id: 29, dialogue: [{ speaker: "A", text: "I think we need to reconsider our strategy." }, { speaker: "B", text: "What changes would you suggest?" }, { speaker: "A", text: "We should focus more on digital marketing." }], expectedTranscript: "i think we need to reconsider our strategy", translation: "Acho que precisamos reconsiderar nossa estratégia." },
  { id: 30, dialogue: [{ speaker: "A", text: "How would you describe your management style?" }, { speaker: "B", text: "I believe in collaborative leadership and open communication." }, { speaker: "A", text: "That aligns well with our company culture." }], expectedTranscript: "how would you describe your management style", translation: "Como você descreveria seu estilo de gestão?" },
  { id: 31, dialogue: [{ speaker: "A", text: "Could you provide some references from previous clients?" }, { speaker: "B", text: "Absolutely. I'll email you a list this afternoon." }, { speaker: "A", text: "That would be very helpful, thank you." }], expectedTranscript: "could you provide some references from previous clients", translation: "Você poderia fornecer algumas referências de clientes anteriores?" },
  { id: 32, dialogue: [{ speaker: "A", text: "I'm interested in learning more about your services." }, { speaker: "B", text: "I'd be happy to give you a detailed overview." }, { speaker: "A", text: "Do you have any brochures I could take?" }], expectedTranscript: "i'm interested in learning more about your services", translation: "Tenho interesse em saber mais sobre seus serviços." },
  { id: 33, dialogue: [{ speaker: "A", text: "The quarterly results exceeded our expectations." }, { speaker: "B", text: "That's fantastic! What contributed to this success?" }, { speaker: "A", text: "The new marketing campaign played a significant role." }], expectedTranscript: "the quarterly results exceeded our expectations", translation: "Os resultados trimestrais superaram nossas expectativas." },
  { id: 34, dialogue: [{ speaker: "A", text: "I apologize for any inconvenience this may have caused." }, { speaker: "B", text: "No worries. These things happen sometimes." }, { speaker: "A", text: "I'll make sure it doesn't happen again." }], expectedTranscript: "i apologize for any inconvenience this may have caused", translation: "Peço desculpas por qualquer inconveniente que isso possa ter causado." },
  { id: 35, dialogue: [{ speaker: "A", text: "What's the typical response time for support tickets?" }, { speaker: "B", text: "We aim to respond within 24 hours." }, { speaker: "A", text: "That's reasonable. Thank you for the information." }], expectedTranscript: "what's the typical response time for support tickets", translation: "Qual é o tempo de resposta típico para tickets de suporte?" },
  { id: 36, dialogue: [{ speaker: "A", text: "Have you considered expanding into international markets?" }, { speaker: "B", text: "Yes, we're currently exploring opportunities in Europe." }, { speaker: "A", text: "That sounds like an exciting venture." }], expectedTranscript: "have you considered expanding into international markets", translation: "Você já considerou expandir para mercados internacionais?" },
  { id: 37, dialogue: [{ speaker: "A", text: "I need to transfer money to an overseas account." }, { speaker: "B", text: "We can help with that. There's a small fee involved." }, { speaker: "A", text: "How long does the transfer usually take?" }], expectedTranscript: "i need to transfer money to an overseas account", translation: "Preciso transferir dinheiro para uma conta no exterior." },
  { id: 38, dialogue: [{ speaker: "A", text: "Could you brief me on the meeting agenda?" }, { speaker: "B", text: "Sure. We'll be discussing the Q3 budget and new hires." }, { speaker: "A", text: "Great, I'll prepare some notes beforehand." }], expectedTranscript: "could you brief me on the meeting agenda", translation: "Você poderia me informar sobre a pauta da reunião?" },
  { id: 39, dialogue: [{ speaker: "A", text: "I'm not satisfied with the quality of this product." }, { speaker: "B", text: "I understand your concern. Would you like a replacement?" }, { speaker: "A", text: "Yes, or a full refund if that's not possible." }], expectedTranscript: "i'm not satisfied with the quality of this product", translation: "Não estou satisfeito com a qualidade deste produto." },
  { id: 40, dialogue: [{ speaker: "A", text: "What skills do you think are essential for this role?" }, { speaker: "B", text: "Strong communication and problem-solving abilities." }, { speaker: "A", text: "I believe those are my strengths." }], expectedTranscript: "what skills do you think are essential for this role", translation: "Quais habilidades você acha essenciais para este cargo?" },
  { id: 41, dialogue: [{ speaker: "A", text: "The deadline is approaching fast. Are we on track?" }, { speaker: "B", text: "We're about 80% complete. Should finish on time." }, { speaker: "A", text: "Let me know if you need additional resources." }], expectedTranscript: "the deadline is approaching fast are we on track", translation: "O prazo está chegando rápido. Estamos no caminho certo?" },
  { id: 42, dialogue: [{ speaker: "A", text: "I'd like to upgrade my subscription plan." }, { speaker: "B", text: "Great choice! The upgrade takes effect immediately." }, { speaker: "A", text: "Will I be charged the difference right away?" }], expectedTranscript: "i'd like to upgrade my subscription plan", translation: "Gostaria de fazer upgrade do meu plano de assinatura." },
  { id: 43, dialogue: [{ speaker: "A", text: "Can we arrange a demonstration of the software?" }, { speaker: "B", text: "Absolutely. Would next Wednesday work for your team?" }, { speaker: "A", text: "Let me confirm with my colleagues and get back to you." }], expectedTranscript: "can we arrange a demonstration of the software", translation: "Podemos organizar uma demonstração do software?" },
  { id: 44, dialogue: [{ speaker: "A", text: "What's the procedure for reporting a technical issue?" }, { speaker: "B", text: "You can submit a ticket through our online portal." }, { speaker: "A", text: "Is there also a phone support option?" }], expectedTranscript: "what's the procedure for reporting a technical issue", translation: "Qual é o procedimento para relatar um problema técnico?" },
  { id: 45, dialogue: [{ speaker: "A", text: "I've been working on improving my public speaking skills." }, { speaker: "B", text: "That's admirable. Have you taken any courses?" }, { speaker: "A", text: "Yes, I joined a Toastmasters club recently." }], expectedTranscript: "i've been working on improving my public speaking skills", translation: "Tenho trabalhado para melhorar minhas habilidades de falar em público." },
  { id: 46, dialogue: [{ speaker: "A", text: "The network seems to be running slowly today." }, { speaker: "B", text: "IT is aware of the issue and working on it." }, { speaker: "A", text: "Do they have an estimated time for the fix?" }], expectedTranscript: "the network seems to be running slowly today", translation: "A rede parece estar lenta hoje." },
  { id: 47, dialogue: [{ speaker: "A", text: "Would you be interested in a collaborative project?" }, { speaker: "B", text: "It depends on the scope and timeline involved." }, { speaker: "A", text: "Let me send you the proposal for review." }], expectedTranscript: "would you be interested in a collaborative project", translation: "Você estaria interessado em um projeto colaborativo?" },
  { id: 48, dialogue: [{ speaker: "A", text: "I appreciate you taking the time to meet with me." }, { speaker: "B", text: "It was my pleasure. Let's stay in touch." }, { speaker: "A", text: "Absolutely. I'll follow up via email." }], expectedTranscript: "i appreciate you taking the time to meet with me", translation: "Agradeço por ter dedicado tempo para se encontrar comigo." },
  { id: 49, dialogue: [{ speaker: "A", text: "What measures are in place for data security?" }, { speaker: "B", text: "We use encryption and regular security audits." }, { speaker: "A", text: "That's reassuring. Privacy is a top priority for us." }], expectedTranscript: "what measures are in place for data security", translation: "Quais medidas estão em vigor para segurança de dados?" },
  { id: 50, dialogue: [{ speaker: "A", text: "I'd like to propose a toast to our successful partnership." }, { speaker: "B", text: "Cheers! Here's to many more years of collaboration." }, { speaker: "A", text: "Thank you all for making this possible." }], expectedTranscript: "i'd like to propose a toast to our successful partnership", translation: "Gostaria de propor um brinde à nossa parceria de sucesso." },
];

/**
 * Get 10 content items for a specific task within a mode/level.
 * Cycles through available content if taskId * 10 exceeds pool size.
 */
export const getContentForTask = (
  mode: 'phrases' | 'dialogues',
  level: 'easy' | 'medium' | 'advanced',
  taskId: number
): GameContent[] => {
  let pool: GameContent[];
  
  if (mode === 'phrases') {
    pool = level === 'easy' ? easyPhrases : mediumPhrases;
  } else {
    pool = advancedDialogues;
  }
  
  const phrases: GameContent[] = [];
  for (let i = 0; i < 10; i++) {
    const index = ((taskId - 1) * 10 + i) % pool.length;
    phrases.push(pool[index]);
  }
  return phrases;
};

export const getContentByLevel = (level: 'easy' | 'medium' | 'advanced'): GameContent[] => {
  switch (level) {
    case 'easy': return easyPhrases;
    case 'medium': return mediumPhrases;
    case 'advanced': return advancedDialogues;
    default: return easyPhrases;
  }
};

export const isDialogue = (content: GameContent): content is DialogueContent => {
  return 'dialogue' in content;
};
