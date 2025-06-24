import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export type ChatMessage = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

export const OpenAIService = {
  sendMessage: async (message: string, chatHistory: ChatMessage[]): Promise<string> => {
    try {
      const messages = [
        {
          role: 'system' as const,
          content: `You are a helpful banking assistant for Shawbrook Bank. You can help customers with:
          - Account information and balances
          - Transaction history
          - Banking services and products
          - General financial advice
          - Security and fraud prevention
          
          Be friendly, professional, and concise. If you don't know specific account details, suggest they check their account or contact support.`
        },
        ...chatHistory
          .filter(msg => !msg.isUser) // only include bot messages in history
          .map(msg => ({
            role: 'assistant' as const,
            content: msg.text
          })),
        {
          role: 'user' as const,
          content: message
        }
      ];

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 300,
        temperature: 0.7,
      });

      return response.choices[0]?.message?.content || 'Sorry, I couldn\'t process your request.';
    } catch (error) {
      console.error('OpenAI API error:', error);
      return 'Sorry, I\'m having trouble connecting right now. Please try again later.';
    }
  },

  // generate a simple response as fallback
  getDemoResponse: (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('balance') || lowerMessage.includes('account')) {
      return 'I can help you check your account balance! You can view your balances in the Accounts tab, or I can help you with specific account information.';
    } else if (lowerMessage.includes('transfer') || lowerMessage.includes('send money')) {
      return 'To make a transfer, go to the Accounts tab and select an account, then use the Transfer button. I can guide you through the process!';
    } else if (lowerMessage.includes('transaction') || lowerMessage.includes('history')) {
      return 'You can view your transaction history by selecting any account from the Accounts tab. Each account shows its recent transactions.';
    } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return 'I\'m here to help! You can ask me about your accounts, transactions, transfers, or any banking services. What would you like to know?';
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! I\'m your Shawbrook Bank assistant. How can I help you today?';
    } else {
      return 'Thanks for your message! I\'m here to help with your banking needs. You can ask me about accounts, transactions, transfers, or any other banking services.';
    }
  }
}; 