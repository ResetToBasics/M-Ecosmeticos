import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import OrderSummary from './components/OrderSummary';
import WhatsAppInterface from './components/WhatsAppInterface';
import CustomerInfoForm from './components/CustomerInfoForm';
import PaymentMethods from './components/PaymentMethods';
import OrderConfirmation from './components/OrderConfirmation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const WhatsAppCheckout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('info'); // info, payment, whatsapp, confirmation
  const [cartItems, setCartItems] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [orderData, setOrderData] = useState(null);

  // Mock cart data
  useEffect(() => {
    const mockCartItems = [
      {
        id: 1,
        name: "Sérum Vitamina C Premium",
        size: "15ml (Tamanho Teste)",
        quantity: 1,
        price: 45.90,
        originalPrice: 89.90,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop"
      },
      {
        id: 2,
        name: "Hidratante Facial Ácido Hialurônico",
        size: "30ml (Meio Tamanho)",
        quantity: 2,
        price: 32.50,
        originalPrice: 65.00,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop"
      },
      {
        id: 3,
        name: "Protetor Solar Facial FPS 60",
        size: "25ml (Tamanho Viagem)",
        quantity: 1,
        price: 28.90,
        originalPrice: 55.90,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop"
      }
    ];

    setCartItems(mockCartItems);
  }, []);

  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const shipping = subtotal >= 150 ? 0 : 15.90;
  const discount = selectedPaymentMethod === 'pix' ? subtotal * 0.05 : 
                  selectedPaymentMethod === 'debit' ? subtotal * 0.02 : 0;
  const total = subtotal + shipping - discount;

  const steps = [
    { id: 'info', title: 'Informações', icon: 'User' },
    { id: 'payment', title: 'Pagamento', icon: 'CreditCard' },
    { id: 'whatsapp', title: 'WhatsApp', icon: 'MessageCircle' },
    { id: 'confirmation', title: 'Confirmação', icon: 'CheckCircle' }
  ];

  const getCurrentStepIndex = () => {
    return steps?.findIndex(step => step?.id === currentStep);
  };

  const handleUpdateCustomerInfo = (info) => {
    setCustomerInfo(info);
  };

  const handleContinueToPayment = () => {
    setCurrentStep('payment');
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleContinueToWhatsApp = () => {
    if (!selectedPaymentMethod) {
      alert('Por favor, selecione uma forma de pagamento.');
      return;
    }
    setCurrentStep('whatsapp');
  };

  const handleSendOrder = () => {
    // Create order data
    const order = {
      id: `MC${Date.now()?.toString()?.slice(-8)}`,
      items: cartItems,
      customerInfo,
      paymentMethod: selectedPaymentMethod,
      subtotal,
      shipping,
      discount,
      total,
      createdAt: new Date()
    };

    setOrderData(order);

    // Generate WhatsApp message
    const paymentMethodNames = {
      pix: 'PIX',
      credit: 'Cartão de Crédito',
      debit: 'Cartão de Débito',
      boleto: 'Boleto Bancário'
    };

    const message = `🛍️ *NOVO PEDIDO - M&C FRACIONADOS*\n\n` +
      `👤 *Cliente:* ${customerInfo?.name}\n` +
      `📱 *Telefone:* ${customerInfo?.phone}\n` +
      `📧 *Email:* ${customerInfo?.email}\n\n` +
      `📦 *PRODUTOS:*\n` +
      cartItems?.map(item => 
        `• ${item?.name}\n  ${item?.size} - Qtd: ${item?.quantity}\n  R$ ${(item?.price * item?.quantity)?.toFixed(2)}`
      )?.join('\n\n') +
      `\n\n📍 *ENTREGA:*\n` +
      `${customerInfo?.address}, ${customerInfo?.number}${customerInfo?.complement ? `, ${customerInfo?.complement}` : ''}\n` +
      `${customerInfo?.neighborhood} - ${customerInfo?.city}/${customerInfo?.state}\n` +
      `CEP: ${customerInfo?.zipCode}\n\n` +
      `💳 *PAGAMENTO:* ${paymentMethodNames?.[selectedPaymentMethod]}\n\n` +
      `💰 *RESUMO FINANCEIRO:*\n` +
      `Subtotal: R$ ${subtotal?.toFixed(2)}\n` +
      `Frete: ${shipping === 0 ? 'Grátis' : `R$ ${shipping?.toFixed(2)}`}\n` +
      (discount > 0 ? `Desconto: -R$ ${discount?.toFixed(2)}\n` : '') +
      `*TOTAL: R$ ${total?.toFixed(2)}*\n\n` +
      `🕐 *Pedido realizado em:* ${new Date()?.toLocaleString('pt-BR')}\n\n` +
      `✅ Confirme o pedido para prosseguirmos com o pagamento!`;

    // Open WhatsApp with the message
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5511999999999?text=${encodedMessage}`, '_blank');

    // Move to confirmation step
    setTimeout(() => {
      setCurrentStep('confirmation');
    }, 2000);
  };

  const handleNewOrder = () => {
    navigate('/product-catalog');
  };

  const handleBackStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentStep(steps?.[currentIndex - 1]?.id);
    }
  };

  if (currentStep === 'confirmation' && orderData) {
    return <OrderConfirmation orderData={orderData} onNewOrder={handleNewOrder} />;
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <div className="pt-20 pb-8">
        <div className="container-fluid">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 sm:space-x-8">
              {steps?.map((step, index) => {
                const isActive = step?.id === currentStep;
                const isCompleted = getCurrentStepIndex() > index;
                
                return (
                  <div key={step?.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-success text-white' 
                          : isActive 
                            ? 'bg-primary text-white' :'bg-border text-text-secondary'
                      }`}>
                        {isCompleted ? (
                          <Icon name="Check" size={16} />
                        ) : (
                          <Icon name={step?.icon} size={16} />
                        )}
                      </div>
                      <span className={`text-xs mt-2 font-medium ${
                        isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-text-secondary'
                      }`}>
                        {step?.title}
                      </span>
                    </div>
                    {index < steps?.length - 1 && (
                      <div className={`w-8 sm:w-16 h-0.5 mx-2 sm:mx-4 ${
                        isCompleted ? 'bg-success' : 'bg-border'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary - Always visible */}
            <div className="lg:col-span-1">
              <OrderSummary
                cartItems={cartItems}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
              />

              {/* Quick Actions */}
              <div className="bg-card rounded-xl shadow-card p-4">
                <h3 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
                  <Icon name="Headphones" size={18} />
                  <span>Precisa de Ajuda?</span>
                </h3>
                
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="MessageCircle"
                    iconPosition="left"
                    onClick={() => {
                      const message = encodeURIComponent('Olá! Preciso de ajuda com meu pedido no checkout.');
                      window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
                    }}
                    className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
                  >
                    Chat WhatsApp
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    fullWidth
                    iconName="Phone"
                    iconPosition="left"
                    onClick={() => window.open('tel:+5511999999999', '_self')}
                  >
                    Ligar Agora
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {currentStep === 'info' && (
                <CustomerInfoForm
                  customerInfo={customerInfo}
                  onUpdateInfo={handleUpdateCustomerInfo}
                  onContinue={handleContinueToPayment}
                />
              )}

              {currentStep === 'payment' && (
                <div className="space-y-6">
                  <PaymentMethods
                    selectedMethod={selectedPaymentMethod}
                    onMethodSelect={handlePaymentMethodSelect}
                    orderTotal={total}
                  />
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      iconName="ArrowLeft"
                      iconPosition="left"
                      onClick={handleBackStep}
                      className="sm:w-auto"
                    >
                      Voltar
                    </Button>
                    
                    <Button
                      variant="default"
                      iconName="MessageCircle"
                      iconPosition="right"
                      onClick={handleContinueToWhatsApp}
                      disabled={!selectedPaymentMethod}
                      className="flex-1 sm:flex-none bg-[#25D366] hover:bg-[#128C7E]"
                    >
                      Continuar no WhatsApp
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 'whatsapp' && (
                <div className="space-y-6">
                  <div className="bg-card rounded-xl shadow-card p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-[#25D366]/10 rounded-lg flex items-center justify-center">
                        <Icon name="MessageCircle" size={20} className="text-[#25D366]" />
                      </div>
                      <div>
                        <h2 className="text-heading-4 text-text-primary">Finalizar no WhatsApp</h2>
                        <p className="text-sm text-text-secondary">
                          Clique no botão abaixo para enviar seu pedido via WhatsApp
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#25D366]/5 border border-[#25D366]/20 rounded-lg p-4 mb-6">
                      <div className="flex items-start space-x-3">
                        <Icon name="Info" size={20} className="text-[#25D366] mt-0.5" />
                        <div>
                          <h4 className="font-medium text-text-primary mb-1">Como funciona?</h4>
                          <ul className="text-sm text-text-secondary space-y-1">
                            <li>• Seu pedido será enviado automaticamente via WhatsApp</li>
                            <li>• Nossa consultora Marina irá confirmar todos os detalhes</li>
                            <li>• Você receberá o link de pagamento em instantes</li>
                            <li>• Acompanhe todo o processo pelo WhatsApp</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        variant="outline"
                        iconName="ArrowLeft"
                        iconPosition="left"
                        onClick={handleBackStep}
                        className="sm:w-auto"
                      >
                        Voltar
                      </Button>
                      
                      <Button
                        variant="default"
                        iconName="Send"
                        iconPosition="right"
                        onClick={handleSendOrder}
                        className="flex-1 sm:flex-none bg-[#25D366] hover:bg-[#128C7E] text-lg py-4"
                      >
                        Enviar Pedido via WhatsApp
                      </Button>
                    </div>
                  </div>

                  <WhatsAppInterface
                    cartItems={cartItems}
                    customerInfo={customerInfo}
                    onSendOrder={handleSendOrder}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppCheckout;