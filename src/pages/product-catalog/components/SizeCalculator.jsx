import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const SizeCalculator = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    productType: '',
    usageFrequency: '',
    applicationAmount: '',
    skinType: ''
  });
  const [result, setResult] = useState(null);

  const productTypes = [
    { value: 'cleanser', label: 'Limpador Facial', usage: 2 },
    { value: 'moisturizer', label: 'Hidratante', usage: 1.5 },
    { value: 'serum', label: 'Sérum', usage: 0.5 },
    { value: 'sunscreen', label: 'Protetor Solar', usage: 2.5 },
    { value: 'toner', label: 'Tônico', usage: 3 },
    { value: 'eye-cream', label: 'Creme para Olhos', usage: 0.3 }
  ];

  const usageOptions = [
    { value: 'daily', label: 'Diariamente (1x)', multiplier: 1 },
    { value: 'twice-daily', label: 'Duas vezes ao dia', multiplier: 2 },
    { value: 'alternate', label: 'Dias alternados', multiplier: 0.5 },
    { value: 'weekly', label: 'Semanalmente', multiplier: 0.14 }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateSize = () => {
    const product = productTypes?.find(p => p?.value === formData?.productType);
    const usage = usageOptions?.find(u => u?.value === formData?.usageFrequency);
    
    if (!product || !usage) return;

    const dailyUsage = product?.usage * usage?.multiplier;
    const monthlyUsage = dailyUsage * 30;
    
    const recommendations = [
      {
        period: '1 semana',
        size: Math.ceil(dailyUsage * 7),
        purpose: 'Teste inicial',
        description: 'Ideal para experimentar o produto'
      },
      {
        period: '1 mês',
        size: Math.ceil(monthlyUsage),
        purpose: 'Uso regular',
        description: 'Perfeito para uso contínuo'
      },
      {
        period: '3 meses',
        size: Math.ceil(monthlyUsage * 3),
        purpose: 'Economia',
        description: 'Melhor custo-benefício'
      }
    ];

    setResult({
      dailyUsage: dailyUsage?.toFixed(1),
      monthlyUsage: monthlyUsage?.toFixed(0),
      recommendations
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl shadow-elevated max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Calculator" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold text-text-primary">
                Calculadora de Tamanho
              </h2>
              <p className="text-sm text-text-secondary">
                Descubra o tamanho ideal para suas necessidades
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Product Type */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Tipo de Produto
            </label>
            <div className="grid grid-cols-2 gap-3">
              {productTypes?.map((type) => (
                <button
                  key={type?.value}
                  onClick={() => handleInputChange('productType', type?.value)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    formData?.productType === type?.value
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-text-primary'
                  }`}
                >
                  <span className="font-medium">{type?.label}</span>
                  <p className="text-xs text-text-secondary mt-1">
                    ~{type?.usage}ml por uso
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Usage Frequency */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Frequência de Uso
            </label>
            <div className="space-y-2">
              {usageOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleInputChange('usageFrequency', option?.value)}
                  className={`flex items-center justify-between w-full p-3 rounded-lg border text-left transition-colors ${
                    formData?.usageFrequency === option?.value
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-text-primary'
                  }`}
                >
                  <span className="font-medium">{option?.label}</span>
                  {formData?.usageFrequency === option?.value && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Calculate Button */}
          <Button
            variant="primary"
            fullWidth
            iconName="Calculator"
            iconPosition="left"
            onClick={calculateSize}
            disabled={!formData?.productType || !formData?.usageFrequency}
          >
            Calcular Tamanho Ideal
          </Button>

          {/* Results */}
          {result && (
            <div className="bg-muted rounded-lg p-6 space-y-4">
              <div className="text-center">
                <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                  Suas Recomendações Personalizadas
                </h3>
                <p className="text-sm text-text-secondary">
                  Uso diário estimado: <strong>{result?.dailyUsage}ml</strong> • 
                  Uso mensal: <strong>{result?.monthlyUsage}ml</strong>
                </p>
              </div>

              <div className="grid gap-4">
                {result?.recommendations?.map((rec, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      index === 1 
                        ? 'border-primary bg-primary/5' :'border-border bg-background'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-text-primary">
                          {rec?.size}ml
                        </span>
                        <span className="text-sm text-text-secondary">
                          para {rec?.period}
                        </span>
                        {index === 1 && (
                          <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                            Recomendado
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-medium text-primary">
                        {rec?.purpose}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      {rec?.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4 border-t border-border">
                <Button
                  variant="outline"
                  iconName="Search"
                  iconPosition="left"
                  onClick={onClose}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Buscar Produtos com Estes Tamanhos
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SizeCalculator;