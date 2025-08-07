import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WhatsAppOrderSection = ({ product, selectedSize }) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    skinType: '',
    concerns: '',
    previousExperience: '',
    additionalNotes: ''
  });

  const [showConsultationForm, setShowConsultationForm] = useState(false);

  const skinTypes = [
    { value: 'oleosa', label: 'Oleosa' },
    { value: 'seca', label: 'Seca' },
    { value: 'mista', label: 'Mista' },
    { value: 'sensivel', label: 'Sensível' },
    { value: 'normal', label: 'Normal' }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })?.format(price);
  };

  const generateWhatsAppMessage = (isConsultation = false) => {
    if (isConsultation) {
      return `🌟 *Consulta Personalizada - M&C Fracionados*

📱 *Produto de Interesse:*
${product?.name}

👤 *Informações Pessoais:*
• Nome: ${customerInfo?.name}
• Telefone: ${customerInfo?.phone}
• Email: ${customerInfo?.email}

🧴 *Perfil de Pele:*
• Tipo de pele: ${customerInfo?.skinType}
• Principais preocupações: ${customerInfo?.concerns}
• Experiência anterior: ${customerInfo?.previousExperience}

📝 *Observações adicionais:*
${customerInfo?.additionalNotes}

Gostaria de uma consulta personalizada para escolher o tamanho ideal e receber orientações de uso. Obrigado(a)!`;
    } else {
      if (!selectedSize) {
        return `🌟 *Interesse em Produto - M&C Fracionados*

📱 *Produto:*
${product?.name}

Olá! Tenho interesse neste produto e gostaria de mais informações sobre os tamanhos disponíveis e orientações de uso.

Obrigado(a)!`;
      }

      return `🛒 *Pedido - M&C Fracionados*

📱 *Produto:*
${product?.name}

📦 *Tamanho Selecionado:*
• Volume: ${selectedSize?.volume}ml
• Preço: ${formatPrice(selectedSize?.price)}
• Duração estimada: ${selectedSize?.duration}

👤 *Dados do Cliente:*
• Nome: ${customerInfo?.name || '[A preencher]'}
• Telefone: ${customerInfo?.phone || '[A preencher]'}

Gostaria de finalizar este pedido. Aguardo orientações para pagamento e entrega.

Obrigado(a)!`;
    }
  };

  const handleWhatsAppOrder = (isConsultation = false) => {
    const message = generateWhatsAppMessage(isConsultation);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInputChange = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-surface rounded-xl p-6 border border-border">
        <h3 className="text-heading-4 font-semibold mb-4">Resumo do Pedido</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Package" size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{product?.name}</h4>
              <p className="text-sm text-text-secondary">{product?.category}</p>
            </div>
          </div>

          {selectedSize ? (
            <div className="bg-background rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Tamanho: {selectedSize?.volume}ml</span>
                <span className="font-bold text-primary text-lg">
                  {formatPrice(selectedSize?.price)}
                </span>
              </div>
              <div className="text-sm text-text-secondary">
                Duração estimada: {selectedSize?.duration}
              </div>
            </div>
          ) : (
            <div className="bg-warning/10 rounded-lg p-4 border border-warning/20">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-warning" />
                <span className="text-sm font-medium text-warning">
                  Selecione um tamanho para continuar
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Quick Customer Info */}
      <div className="bg-background rounded-xl p-6 border border-border">
        <h4 className="font-semibold mb-4">Informações Básicas (Opcional)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nome"
            type="text"
            placeholder="Seu nome completo"
            value={customerInfo?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
          />
          <Input
            label="WhatsApp"
            type="tel"
            placeholder="(11) 99999-9999"
            value={customerInfo?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
          />
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-4">
        <Button
          variant="default"
          size="lg"
          fullWidth
          iconName="MessageCircle"
          iconPosition="left"
          onClick={() => handleWhatsAppOrder(false)}
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-4"
        >
          {selectedSize ? 'Finalizar Pedido via WhatsApp' : 'Solicitar Informações'}
        </Button>

        <Button
          variant="outline"
          size="lg"
          fullWidth
          iconName="UserCheck"
          iconPosition="left"
          onClick={() => setShowConsultationForm(!showConsultationForm)}
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Consulta Personalizada Gratuita
        </Button>
      </div>
      {/* Consultation Form */}
      {showConsultationForm && (
        <div className="bg-primary/5 rounded-xl p-6 border border-primary/20 space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Sparkles" size={20} className="text-primary" />
            <h4 className="font-semibold text-primary">Consulta Personalizada</h4>
          </div>
          
          <p className="text-sm text-text-secondary mb-4">
            Preencha as informações abaixo para receber uma recomendação personalizada sobre o tamanho ideal e modo de uso.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nome Completo"
              type="text"
              placeholder="Como podemos te chamar?"
              value={customerInfo?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              required
            />
            
            <Input
              label="WhatsApp"
              type="tel"
              placeholder="(11) 99999-9999"
              value={customerInfo?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              required
            />
            
            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={customerInfo?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
            />
            
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Pele</label>
              <select
                value={customerInfo?.skinType}
                onChange={(e) => handleInputChange('skinType', e?.target?.value)}
                className="w-full border border-border rounded-lg px-3 py-2 bg-background"
              >
                <option value="">Selecione seu tipo de pele</option>
                {skinTypes?.map((type) => (
                  <option key={type?.value} value={type?.value}>
                    {type?.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input
            label="Principais Preocupações"
            type="text"
            placeholder="Ex: acne, manchas, ressecamento, sinais de idade..."
            value={customerInfo?.concerns}
            onChange={(e) => handleInputChange('concerns', e?.target?.value)}
          />

          <Input
            label="Experiência Anterior"
            type="text"
            placeholder="Já usou produtos similares? Como foi a experiência?"
            value={customerInfo?.previousExperience}
            onChange={(e) => handleInputChange('previousExperience', e?.target?.value)}
          />

          <div>
            <label className="block text-sm font-medium mb-2">Observações Adicionais</label>
            <textarea
              value={customerInfo?.additionalNotes}
              onChange={(e) => handleInputChange('additionalNotes', e?.target?.value)}
              placeholder="Alguma informação adicional que possa nos ajudar a te atender melhor?"
              className="w-full border border-border rounded-lg px-3 py-2 bg-background h-20 resize-none"
            />
          </div>

          <Button
            variant="default"
            size="lg"
            fullWidth
            iconName="Send"
            iconPosition="left"
            onClick={() => handleWhatsAppOrder(true)}
            disabled={!customerInfo?.name || !customerInfo?.phone}
            className="bg-primary hover:bg-primary/90"
          >
            Solicitar Consulta via WhatsApp
          </Button>
        </div>
      )}
      {/* Trust Signals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="flex items-center space-x-2 justify-center">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-sm text-text-secondary">Compra Segura</span>
        </div>
        <div className="flex items-center space-x-2 justify-center">
          <Icon name="Truck" size={16} className="text-primary" />
          <span className="text-sm text-text-secondary">Entrega Rápida</span>
        </div>
        <div className="flex items-center space-x-2 justify-center">
          <Icon name="RotateCcw" size={16} className="text-accent" />
          <span className="text-sm text-text-secondary">Troca Garantida</span>
        </div>
      </div>
      {/* Contact Info */}
      <div className="text-center text-sm text-text-secondary">
        <p>Atendimento personalizado via WhatsApp</p>
        <p className="font-medium">(11) 99999-9999</p>
        <p>Segunda a Sexta: 9h às 18h | Sábado: 9h às 14h</p>
      </div>
    </div>
  );
};

export default WhatsAppOrderSection;