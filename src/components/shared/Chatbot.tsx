import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const quickReplies = [
  { text: 'Como me tornar membro?', emoji: '👥' },
  { text: 'Próximos eventos', emoji: '📅' },
  { text: 'Como doar?', emoji: '💝' },
  { text: 'Informações de contato', emoji: '📞' },
];

const botResponses: Record<string, string> = {
  'como me tornar membro?': 'Para se tornar membro, clique em "Seja Membro" no menu principal e preencha o formulário de registro. Nossa equipe analisará sua candidatura em até 48 horas. 🎉',
  'próximos eventos': 'Temos vários eventos incríveis planejados! Visite nossa página de Eventos para ver a lista completa e fazer sua inscrição. 📅',
  'como doar?': 'Você pode fazer doações através da nossa página de Contato. Aceitamos transferências bancárias, cartão de crédito e MB Way. Cada contribuição faz a diferença! 💖',
  'informações de contato': 'Entre em contato conosco através do email info@thegraces.org ou telefone +351 123 456 789. Estamos disponíveis de segunda a sexta, das 9h às 18h. 📧',
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Olá! 👋 Sou o assistente virtual da The Graces OAC. Como posso ajudá-lo hoje?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response with typing indicator
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let botText = botResponses[lowerText] || 
        'Desculpe, não entendi completamente sua pergunta. 🤔 Por favor, escolha uma das opções rápidas ou entre em contato conosco pelo formulário de contato.';

      const botMessage: Message = {
        id: messages.length + 2,
        text: botText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div className="relative">
          {/* Pulse Animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] rounded-full animate-ping opacity-30" />
          <div className="relative w-16 h-16 bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] rounded-full shadow-2xl shadow-[#00BFA5]/40 flex items-center justify-center hover:scale-110 hover:shadow-[#00BFA5]/60 transition-all duration-300">
            <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-400 animate-pulse" />
            <MessageCircle className="text-white" size={26} />
          </div>
        </div>
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-[380px] bg-white rounded-3xl shadow-2xl shadow-black/20 flex flex-col z-50 border border-gray-100 overflow-hidden transition-all duration-500 ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0 h-[550px]' 
            : 'opacity-0 scale-95 translate-y-4 h-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00BFA5] via-teal-500 to-[#9C27B0] p-5 flex items-center justify-between relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
          
          <div className="flex items-center space-x-3 relative z-10">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <Bot className="text-[#00BFA5]" size={24} />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-lg">Assistente TG</h3>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                <span className="text-white/80 text-xs">Online agora</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="relative z-10 w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto bg-gray-50/50">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                style={{
                  animation: 'slideIn 0.3s ease-out',
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] flex items-center justify-center flex-shrink-0">
                    <Bot className="text-white" size={16} />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-[#00BFA5] to-teal-500 text-white rounded-br-md'
                      : 'bg-white text-gray-700 rounded-bl-md border border-gray-100'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString('pt-PT', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] flex items-center justify-center">
                  <Bot className="text-white" size={16} />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Replies */}
        {messages.length <= 2 && (
          <div className="px-4 py-3 bg-white border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2 font-medium">💡 Perguntas frequentes:</p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(reply.text)}
                  className="text-xs px-3 py-2 bg-gray-100 hover:bg-[#00BFA5]/10 hover:text-[#00BFA5] rounded-xl text-gray-600 transition-all duration-300 border border-gray-200 hover:border-[#00BFA5]/30"
                >
                  <span className="mr-1">{reply.emoji}</span>
                  {reply.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              placeholder="Escreva sua mensagem..."
              className="flex-1 rounded-xl border-gray-200 focus:border-[#00BFA5] focus:ring-[#00BFA5]/20 bg-gray-50"
            />
            <Button
              onClick={() => handleSendMessage(inputValue)}
              size="icon"
              className="w-11 h-11 rounded-xl bg-gradient-to-r from-[#00BFA5] to-teal-500 hover:from-[#00BFA5] hover:to-[#9C27B0] shadow-lg shadow-[#00BFA5]/30 transition-all duration-300"
              disabled={!inputValue.trim()}
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
