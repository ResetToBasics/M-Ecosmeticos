import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ cartItems, subtotal, shipping, total }) => {
  return (
    <div className="bg-card rounded-xl shadow-card p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-heading-4 text-text-primary">Resumo do Pedido</h2>
        <div className="flex items-center space-x-2 text-accent">
          <Icon name="Package" size={20} />
          <span className="font-medium">{cartItems?.length} {cartItems?.length === 1 ? 'item' : 'itens'}</span>
        </div>
      </div>
      <div className="space-y-4 mb-6">
        {cartItems?.map((item) => (
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
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-sm font-medium text-primary">R$ {item?.price?.toFixed(2)}</span>
                {item?.originalPrice && (
                  <span className="text-xs text-text-secondary line-through">
                    R$ {item?.originalPrice?.toFixed(2)}
                  </span>
                )}
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
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex justify-between text-text-secondary">
          <span>Subtotal</span>
          <span>R$ {subtotal?.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-text-secondary">
          <span>Frete</span>
          <span>{shipping === 0 ? 'Grátis' : `R$ ${shipping?.toFixed(2)}`}</span>
        </div>
        
        {shipping === 0 && (
          <div className="flex items-center space-x-2 text-success text-sm">
            <Icon name="Truck" size={16} />
            <span>Frete grátis para compras acima de R$ 150,00</span>
          </div>
        )}
        
        <div className="border-t border-border pt-3">
          <div className="flex justify-between text-lg font-semibold text-text-primary">
            <span>Total</span>
            <span className="text-primary">R$ {total?.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;