import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SizeSelector = ({ product, selectedSize, onSizeChange }) => {
  const [showUsageGuide, setShowUsageGuide] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })?.format(price);
  };

  const calculateSavings = (size) => {
    const fullSizePrice = product?.sizes?.find(s => s?.id === 'full')?.price || 0;
    const pricePerMl = fullSizePrice / product?.sizes?.find(s => s?.id === 'full')?.volume;
    const expectedPrice = pricePerMl * size?.volume;
    const savings = expectedPrice - size?.price;
    const savingsPercentage = (savings / expectedPrice) * 100;
    
    return {
      amount: savings,
      percentage: savingsPercentage
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-heading-4 font-semibold">Escolha seu Tamanho</h3>
        <button
          onClick={() => setShowUsageGuide(!showUsageGuide)}
          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-300"
        >
          <Icon name="HelpCircle" size={18} />
          <span className="text-sm font-medium">Guia de Uso</span>
        </button>
      </div>
      {/* Usage Guide Modal */}
      {showUsageGuide && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-primary">Guia de Duração</h4>
            <button
              onClick={() => setShowUsageGuide(false)}
              className="text-primary hover:text-primary/80"
            >
              <Icon name="X" size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="text-center p-3 bg-background rounded-lg">
              <div className="font-medium text-primary">5ml</div>
              <div className="text-text-secondary">7-10 dias</div>
              <div className="text-xs text-text-secondary mt-1">Uso diário</div>
            </div>
            <div className="text-center p-3 bg-background rounded-lg">
              <div className="font-medium text-primary">15ml</div>
              <div className="text-text-secondary">3-4 semanas</div>
              <div className="text-xs text-text-secondary mt-1">Uso diário</div>
            </div>
            <div className="text-center p-3 bg-background rounded-lg">
              <div className="font-medium text-primary">30ml</div>
              <div className="text-text-secondary">6-8 semanas</div>
              <div className="text-xs text-text-secondary mt-1">Uso diário</div>
            </div>
          </div>
        </div>
      )}
      {/* Size Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {product?.sizes?.map((size) => {
          const savings = calculateSavings(size);
          const isSelected = selectedSize?.id === size?.id;
          
          return (
            <button
              key={size?.id}
              onClick={() => onSizeChange(size)}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-card ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-card'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {/* Popular Badge */}
              {size?.popular && (
                <div className="absolute -top-2 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                  Mais Popular
                </div>
              )}
              {/* Best Value Badge */}
              {size?.bestValue && (
                <div className="absolute -top-2 right-4 bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-medium">
                  Melhor Custo
                </div>
              )}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                      isSelected ? 'border-primary bg-primary' : 'border-border'
                    }`}>
                      {isSelected && (
                        <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                          <Icon name="Check" size={10} color="white" />
                        </div>
                      )}
                    </div>
                    <span className="font-semibold text-lg">{size?.volume}ml</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-primary">
                      {formatPrice(size?.price)}
                    </div>
                    {size?.originalPrice && (
                      <div className="text-sm text-text-secondary line-through">
                        {formatPrice(size?.originalPrice)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Duração estimada:</span>
                    <span className="font-medium">{size?.duration}</span>
                  </div>
                  
                  {savings?.amount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">Economia:</span>
                      <span className="font-medium text-success">
                        {formatPrice(savings?.amount)} ({savings?.percentage?.toFixed(0)}%)
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Por ml:</span>
                    <span className="font-medium">
                      {formatPrice(size?.price / size?.volume)}
                    </span>
                  </div>
                </div>

                {size?.description && (
                  <div className="text-sm text-text-secondary">
                    {size?.description}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      {/* Selected Size Summary */}
      {selectedSize && (
        <div className="bg-surface rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Tamanho Selecionado</h4>
              <p className="text-sm text-text-secondary">
                {selectedSize?.volume}ml - {selectedSize?.duration} de uso
              </p>
            </div>
            <div className="text-right">
              <div className="font-bold text-xl text-primary">
                {formatPrice(selectedSize?.price)}
              </div>
              <div className="text-sm text-text-secondary">
                {formatPrice(selectedSize?.price / selectedSize?.volume)}/ml
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SizeSelector;