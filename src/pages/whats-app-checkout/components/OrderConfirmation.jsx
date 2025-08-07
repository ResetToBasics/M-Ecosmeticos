import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const OrderConfirmation = ({ orderData, onNewOrder }) => {
  const [orderStatus, setOrderStatus] = useState('confirmed');
  const [trackingCode, setTrackingCode] = useState('');

  useEffect(() => {
    // Generate tracking code
    const code = `MC${Date.now()?.toString()?.slice(-8)}`;
    setTrackingCode(code);

    // Simulate order status updates
    const statusUpdates = [
      { status: 'confirmed', delay: 0 },
      { status: 'processing', delay: 2000 },
      { status: 'shipped', delay: 5000 }
    ];

    statusUpdates?.forEach(({ status, delay }) => {
      setTimeout(() => setOrderStatus(status), delay);
    });
  }, []);

  const getStatusInfo = (status) => {
    const statusMap = {
      confirmed: {
        icon: 'CheckCircle',
        color: 'text-success',
        bgColor: 'bg-success/10',
        title: 'Pedido Confirmado!',
        description: 'Seu pedido foi recebido e está sendo processado.'
      },
      processing: {
        icon: 'Package',
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        title: 'Preparando Pedido',
        description: 'Estamos separando seus produtos com todo cuidado.'
      },
      shipped: {
        icon: 'Truck',
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        title: 'Pedido Enviado!',
        description: 'Seu pedido está a caminho. Acompanhe pelo código de rastreamento.'
      }
    };
    return statusMap?.[status];
  };

  const statusInfo = getStatusInfo(orderStatus);

  const handleWhatsAppSupport = () => {
    const message = encodeURIComponent(
      `Olá! Preciso de ajuda com meu pedido #${trackingCode}.\n\nDetalhes do pedido:\n• Total: R$ ${orderData?.total?.toFixed(2)}\n• Itens: ${orderData?.items?.length}\n• Status: ${statusInfo?.title}`
    );
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  const handleTrackOrder = () => {
    const message = encodeURIComponent(
      `Olá! Gostaria de rastrear meu pedido #${trackingCode}. Pode me enviar as informações de entrega?`
    );
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="container-narrow">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className={`w-20 h-20 ${statusInfo?.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <Icon name={statusInfo?.icon} size={40} className={statusInfo?.color} />
          </div>
          
          <h1 className="text-heading-2 text-text-primary mb-2">{statusInfo?.title}</h1>
          <p className="text-body text-text-secondary max-w-md mx-auto">
            {statusInfo?.description}
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-card rounded-xl shadow-card p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-heading-4 text-text-primary">Detalhes do Pedido</h2>
              <p className="text-sm text-text-secondary">Pedido #{trackingCode}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-secondary">Data do pedido</p>
              <p className="font-medium text-text-primary">
                {new Date()?.toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4 mb-6">
            {orderData?.items?.map((item) => (
              <div key={item?.id} className="flex items-center space-x-4 p-4 bg-surface rounded-lg">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item?.image}
                    alt={item?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-text-primary truncate">{item?.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-text-secondary">{item?.size}</span>
                    <span className="text-sm text-text-secondary">•</span>
                    <span className="text-sm text-text-secondary">Qtd: {item?.quantity}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-semibold text-text-primary">
                    R$ {(item?.price * item?.quantity)?.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex justify-between text-text-secondary">
              <span>Subtotal</span>
              <span>R$ {orderData?.subtotal?.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-text-secondary">
              <span>Frete</span>
              <span>{orderData?.shipping === 0 ? 'Grátis' : `R$ ${orderData?.shipping?.toFixed(2)}`}</span>
            </div>
            
            {orderData?.discount > 0 && (
              <div className="flex justify-between text-success">
                <span>Desconto</span>
                <span>-R$ {orderData?.discount?.toFixed(2)}</span>
              </div>
            )}
            
            <div className="border-t border-border pt-2">
              <div className="flex justify-between text-lg font-semibold text-text-primary">
                <span>Total</span>
                <span className="text-primary">R$ {orderData?.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-card rounded-xl shadow-card p-6 mb-6">
          <h3 className="font-semibold text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="MapPin" size={18} />
            <span>Informações de Entrega</span>
          </h3>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-text-secondary">Entregar para:</p>
              <p className="font-medium text-text-primary">{orderData?.customerInfo?.name}</p>
            </div>
            
            <div>
              <p className="text-sm text-text-secondary">Endereço:</p>
              <p className="text-text-primary">
                {orderData?.customerInfo?.address}, {orderData?.customerInfo?.number}
                {orderData?.customerInfo?.complement && `, ${orderData?.customerInfo?.complement}`}
              </p>
              <p className="text-text-primary">
                {orderData?.customerInfo?.neighborhood} - {orderData?.customerInfo?.city}/{orderData?.customerInfo?.state}
              </p>
              <p className="text-text-primary">CEP: {orderData?.customerInfo?.zipCode}</p>
            </div>
            
            <div>
              <p className="text-sm text-text-secondary">Prazo de entrega:</p>
              <p className="font-medium text-text-primary">3-5 dias úteis</p>
            </div>
          </div>
        </div>

        {/* Order Status Timeline */}
        <div className="bg-card rounded-xl shadow-card p-6 mb-6">
          <h3 className="font-semibold text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Clock" size={18} />
            <span>Status do Pedido</span>
          </h3>
          
          <div className="space-y-4">
            {[
              { status: 'confirmed', title: 'Pedido Confirmado', time: 'Agora' },
              { status: 'processing', title: 'Preparando Pedido', time: '2-4 horas' },
              { status: 'shipped', title: 'Pedido Enviado', time: '1-2 dias' },
              { status: 'delivered', title: 'Entregue', time: '3-5 dias' }
            ]?.map((step, index) => {
              const isCompleted = ['confirmed', 'processing', 'shipped']?.includes(orderStatus) && 
                                 ['confirmed', 'processing', 'shipped']?.indexOf(step?.status) <= 
                                 ['confirmed', 'processing', 'shipped']?.indexOf(orderStatus);
              const isCurrent = step?.status === orderStatus;
              
              return (
                <div key={step?.status} className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted || isCurrent 
                      ? 'bg-primary text-white' :'bg-border text-text-secondary'
                  }`}>
                    {isCompleted ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${
                      isCompleted || isCurrent ? 'text-text-primary' : 'text-text-secondary'
                    }`}>
                      {step?.title}
                    </p>
                    <p className="text-sm text-text-secondary">{step?.time}</p>
                  </div>
                  {isCurrent && (
                    <div className="flex items-center space-x-1 text-primary">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Em andamento</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Button
            variant="outline"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={handleWhatsAppSupport}
            className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
          >
            Suporte WhatsApp
          </Button>
          
          <Button
            variant="outline"
            iconName="Truck"
            iconPosition="left"
            onClick={handleTrackOrder}
          >
            Rastrear Pedido
          </Button>
          
          <Button
            variant="default"
            iconName="ShoppingBag"
            iconPosition="left"
            onClick={onNewOrder}
          >
            Novo Pedido
          </Button>
        </div>

        {/* Additional Information */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-primary mb-2">
            <Icon name="Heart" size={16} />
            <span className="font-medium">Obrigada pela confiança!</span>
          </div>
          <p className="text-sm text-text-secondary">
            Sua beleza é nossa prioridade. Qualquer dúvida, estamos aqui para ajudar via WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;