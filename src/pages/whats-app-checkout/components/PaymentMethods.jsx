import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentMethods = ({ selectedMethod, onMethodSelect, orderTotal, handlePixCode }) => {
  const [showPixDetails, setShowPixDetails] = useState(false);

  const paymentMethods = [
  {
    id: 'pix',
    name: 'PIX',
    description: 'Pagamento instantâneo',
    icon: 'Zap',
    discount: 5,
    processingTime: 'Imediato',
    benefits: ['Desconto de 5%', 'Confirmação instantânea', 'Sem taxas']
  },
  {
    id: 'credit',
    name: 'Cartão de Crédito',
    description: 'Parcelamento disponível',
    icon: 'CreditCard',
    discount: 0,
    processingTime: '1-2 dias úteis',
    benefits: ['Parcelamento em até 12x', 'Proteção ao comprador', 'Cashback disponível']
  },
  {
    id: 'debit',
    name: 'Cartão de Débito',
    description: 'Débito em conta',
    icon: 'CreditCard',
    discount: 2,
    processingTime: 'Imediato',
    benefits: ['Desconto de 2%', 'Débito direto', 'Confirmação rápida']
  },
  {
    id: 'boleto',
    name: 'Boleto Bancário',
    description: 'Vencimento em 3 dias',
    icon: 'FileText',
    discount: 0,
    processingTime: '1-3 dias úteis',
    benefits: ['Sem necessidade de cartão', 'Pagamento em qualquer banco', 'Comprovante oficial']
  }];


  const calculateDiscountedTotal = (method) => {
    const discount = method?.discount / 100;
    return orderTotal - orderTotal * discount;
  };

  const generatePixCode = () => {
    return `00020126580014br.gov.bcb.pix013636c4c14e-4b2a-4c8a-9b1a-8f2e3d4c5b6a5204000053039865802BR5925M&C FRACIONADOS LTDA6009SAO PAULO62070503***6304${Math.random()?.toString()?.substr(2, 4)}`;
  };

  const handlePixPayment = () => {
    setShowPixDetails(true);
    const pixCode = generatePixCode();

    // Simulate WhatsApp message with PIX details
    const message = `🔥 *PIX GERADO COM SUCESSO!*\n\n💰 *Valor:* R$ ${calculateDiscountedTotal(paymentMethods?.[0])?.toFixed(2)}\n💸 *Desconto PIX:* 5% (R$ ${(orderTotal * 0.05)?.toFixed(2)})\n\n📋 *Código PIX:*\n\`${pixCode}\`\n\n⏰ *Válido até:* ${new Date(Date.now() + 30 * 60 * 1000)?.toLocaleString('pt-BR')}\n\n✅ Após o pagamento, envie o comprovante aqui no chat!`;

    console.log('PIX Message:', message);
  };

  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="CreditCard" size={20} className="text-accent" />
        </div>
        <div>
          <h2 className="text-heading-4 text-text-primary">Formas de Pagamento</h2>
          <p className="text-sm text-text-secondary">Escolha a melhor opção para você</p>
        </div>
      </div>
      <div className="space-y-4">
        {paymentMethods?.map((method) =>
        <div
          key={method?.id}
          className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-card ${
          selectedMethod === method?.id ?
          'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`
          }
          onClick={() => onMethodSelect(method?.id)}>

            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              selectedMethod === method?.id ? 'bg-primary text-white' : 'bg-surface text-text-secondary'}`
              }>
                  <Icon name={method?.icon} size={20} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-text-primary">{method?.name}</h3>
                    {method?.discount > 0 &&
                  <span className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full font-medium">
                        -{method?.discount}%
                      </span>
                  }
                  </div>
                  
                  <p className="text-sm text-text-secondary mb-2">{method?.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{method?.processingTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                {method?.discount > 0 ?
              <div>
                    <div className="text-sm text-text-secondary line-through">
                      R$ {orderTotal?.toFixed(2)}
                    </div>
                    <div className="font-semibold text-success">
                      R$ {calculateDiscountedTotal(method)?.toFixed(2)}
                    </div>
                  </div> :

              <div className="font-semibold text-text-primary">
                    R$ {orderTotal?.toFixed(2)}
                  </div>
              }
              </div>
            </div>

            {selectedMethod === method?.id &&
          <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {method?.benefits?.map((benefit, index) =>
              <div key={index} className="flex items-center space-x-2 text-sm text-success">
                      <Icon name="Check" size={14} />
                      <span>{benefit}</span>
                    </div>
              )}
                </div>

                {method?.id === 'pix' &&
            <div className="mt-4">
                    <Button
                variant="default"
                size="sm"
                iconName="Zap"
                iconPosition="left"
                onClick={handlePixCode}
                className="bg-[#25D366] hover:bg-[#128C7E]">

                      Gerar Código PIX
                    </Button>
                  </div>
            }

                {method?.id === 'credit' &&
            <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-text-primary">Opções de Parcelamento:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                      {[1, 2, 3, 6, 9, 12]?.map((installments) =>
                <div key={installments} className="text-text-secondary">
                          {installments}x R$ {(orderTotal / installments)?.toFixed(2)}
                        </div>
                )}
                    </div>
                  </div>
            }
              </div>
          }
          </div>
        )}
      </div>
      {/* PIX Details Modal */}
      {showPixDetails && selectedMethod === 'pix' &&
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-xl shadow-elevated max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-heading-4 text-text-primary">Pagamento PIX</h3>
              <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowPixDetails(false)}>

                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="text-center space-y-4">
              <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                <Icon name="QrCode" size={48} className="text-gray-400" />
              </div>

              <div>
                <p className="text-sm text-text-secondary mb-2">Valor a pagar:</p>
                <p className="text-2xl font-bold text-success">
                  R$ {calculateDiscountedTotal(paymentMethods?.[0])?.toFixed(2)}
                </p>
                <p className="text-sm text-success">Desconto de 5% aplicado!</p>
              </div>

              <div className="bg-surface rounded-lg p-4">
                <p className="text-xs text-text-secondary mb-2">Código PIX:</p>
                <p className="text-xs font-mono bg-white p-2 rounded border break-all">
                  {generatePixCode()}
                </p>
              </div>

              <div className="flex space-x-2">
                <Button
                variant="outline"
                size="sm"
                iconName="Copy"
                iconPosition="left"
                onClick={() => navigator.clipboard?.writeText(generatePixCode())}>

                  Copiar Código
                </Button>
                
                <Button
                variant="default"
                size="sm"
                iconName="MessageCircle"
                iconPosition="left"
                className="bg-[#25D366] hover:bg-[#128C7E]"
                onClick={() => setShowPixDetails(false)}>

                  Enviar no WhatsApp
                </Button>
              </div>

              <p className="text-xs text-text-secondary">
                ⏰ Código válido por 30 minutos
              </p>
            </div>
          </div>
        </div>
      }
    </div>);

};

export default PaymentMethods;