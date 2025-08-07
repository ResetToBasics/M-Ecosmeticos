import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const WhatsAppInterface = ({ cartItems, customerInfo, onSendOrder }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize conversation
    const initialMessages = [
      {
        id: 1,
        type: 'received',
        content: `Olá! Sou a Marina da M&C Fracionados 💄\n\nVi que você selecionou alguns produtos incríveis! Vou te ajudar a finalizar seu pedido com todo carinho.`,
        timestamp: new Date(Date.now() - 5000),
        sender: 'Marina - M&C'
      },
      {
        id: 2,
        type: 'received',
        content: `Aqui está o resumo dos seus produtos:\n\n${cartItems?.map(item => 
          `• ${item?.name} (${item?.size}) - Qtd: ${item?.quantity}\n  R$ ${(item?.price * item?.quantity)?.toFixed(2)}`
        )?.join('\n\n')}`,
        timestamp: new Date(Date.now() - 3000),
        sender: 'Marina - M&C'
      }
    ];

    setMessages(initialMessages);

    // Simulate typing and next message
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: 3,
          type: 'received',
          content: `Para finalizar seu pedido, preciso de algumas informações:\n\n📍 Endereço de entrega\n💳 Forma de pagamento preferida\n📱 Telefone para contato\n\nPode me enviar essas informações? 😊`,
          timestamp: new Date(),
          sender: 'Marina - M&C'
        }]);
      }, 2000);
    }, 1000);
  }, [cartItems]);

  const handleSendMessage = (messageContent) => {
    const newMessage = {
      id: messages?.length + 1,
      type: 'sent',
      content: messageContent,
      timestamp: new Date(),
      sender: 'Você'
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate response
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const responses = [
          `Perfeito! Recebi suas informações ✅\n\nVou processar seu pedido agora mesmo. Em alguns minutos você receberá a confirmação com os detalhes do pagamento.`,
          `Obrigada! Seu pedido foi registrado com sucesso 🎉\n\nVocê receberá o link de pagamento em instantes. Qualquer dúvida, estou aqui para te ajudar!`
        ];
        
        setMessages(prev => [...prev, {
          id: prev?.length + 1,
          type: 'received',
          content: responses?.[Math.floor(Math.random() * responses?.length)],
          timestamp: new Date(),
          sender: 'Marina - M&C'
        }]);
      }, 1500);
    }, 1000);
  };

  const quickReplies = [
    "Quero finalizar o pedido",
    "Tenho uma dúvida sobre os produtos",
    "Preciso alterar algum item",
    "Como funciona a entrega?"
  ];

  const formatTime = (date) => {
    return date?.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-card rounded-xl shadow-card overflow-hidden">
      {/* WhatsApp Header */}
      <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] p-4 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Icon name="MessageCircle" size={20} color="white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Marina - M&C Fracionados</h3>
            <div className="flex items-center space-x-2 text-sm opacity-90">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <span>Online agora</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={20} color="white" />
            <Icon name="Video" size={20} color="white" />
          </div>
        </div>
      </div>
      {/* Messages Area */}
      <div className="h-96 overflow-y-auto p-4 bg-[#E5DDD5] space-y-4">
        {messages?.map((message) => (
          <div
            key={message?.id}
            className={`flex ${message?.type === 'sent' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message?.type === 'sent' ?'bg-[#DCF8C6] text-gray-800' :'bg-white text-gray-800'
              } shadow-subtle`}
            >
              <p className="text-sm whitespace-pre-line">{message?.content}</p>
              <div className="flex items-center justify-end space-x-1 mt-1">
                <span className="text-xs text-gray-500">
                  {formatTime(message?.timestamp)}
                </span>
                {message?.type === 'sent' && (
                  <Icon name="Check" size={12} className="text-blue-500" />
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-2 rounded-lg shadow-subtle">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      {/* Quick Replies */}
      <div className="p-4 border-t border-border bg-surface">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {quickReplies?.map((reply, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleSendMessage(reply)}
              className="text-left justify-start text-sm"
            >
              {reply}
            </Button>
          ))}
        </div>

        {/* Customer Info Form */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <h4 className="font-medium text-text-primary mb-3">Suas Informações</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Nome:</span>
              <span className="text-text-primary">{customerInfo?.name || 'Não informado'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Telefone:</span>
              <span className="text-text-primary">{customerInfo?.phone || 'Não informado'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Email:</span>
              <span className="text-text-primary">{customerInfo?.email || 'Não informado'}</span>
            </div>
          </div>
        </div>

        {/* Send Order Button */}
        <Button
          variant="default"
          fullWidth
          iconName="Send"
          iconPosition="right"
          onClick={onSendOrder}
          className="bg-[#25D366] hover:bg-[#128C7E] text-white"
        >
          Enviar Pedido via WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default WhatsAppInterface;