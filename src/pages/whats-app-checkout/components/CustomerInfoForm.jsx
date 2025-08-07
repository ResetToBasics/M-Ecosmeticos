import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CustomerInfoForm = ({ customerInfo, onUpdateInfo, onContinue }) => {
  const [formData, setFormData] = useState({
    name: customerInfo?.name || '',
    email: customerInfo?.email || '',
    phone: customerInfo?.phone || '',
    address: customerInfo?.address || '',
    number: customerInfo?.number || '',
    complement: customerInfo?.complement || '',
    neighborhood: customerInfo?.neighborhood || '',
    city: customerInfo?.city || '',
    state: customerInfo?.state || '',
    zipCode: customerInfo?.zipCode || '',
    paymentMethod: customerInfo?.paymentMethod || ''
  });

  const [errors, setErrors] = useState({});

  const brazilianStates = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' }
  ];

  const paymentMethods = [
    { value: 'pix', label: 'PIX - Pagamento instantâneo' },
    { value: 'credit', label: 'Cartão de Crédito' },
    { value: 'debit', label: 'Cartão de Débito' },
    { value: 'boleto', label: 'Boleto Bancário' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData?.email?.trim()) newErrors.email = 'Email é obrigatório';
    if (!formData?.phone?.trim()) newErrors.phone = 'Telefone é obrigatório';
    if (!formData?.address?.trim()) newErrors.address = 'Endereço é obrigatório';
    if (!formData?.number?.trim()) newErrors.number = 'Número é obrigatório';
    if (!formData?.neighborhood?.trim()) newErrors.neighborhood = 'Bairro é obrigatório';
    if (!formData?.city?.trim()) newErrors.city = 'Cidade é obrigatória';
    if (!formData?.state) newErrors.state = 'Estado é obrigatório';
    if (!formData?.zipCode?.trim()) newErrors.zipCode = 'CEP é obrigatório';
    if (!formData?.paymentMethod) newErrors.paymentMethod = 'Forma de pagamento é obrigatória';

    // Email validation
    if (formData?.email && !/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Email inválido';
    }

    // Phone validation (Brazilian format)
    if (formData?.phone && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/?.test(formData?.phone)) {
      newErrors.phone = 'Telefone deve estar no formato (11) 99999-9999';
    }

    // CEP validation
    if (formData?.zipCode && !/^\d{5}-\d{3}$/?.test(formData?.zipCode)) {
      newErrors.zipCode = 'CEP deve estar no formato 00000-000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      onUpdateInfo(formData);
      onContinue();
    }
  };

  const formatPhone = (value) => {
    const numbers = value?.replace(/\D/g, '');
    if (numbers?.length <= 11) {
      return numbers?.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const formatZipCode = (value) => {
    const numbers = value?.replace(/\D/g, '');
    if (numbers?.length <= 8) {
      return numbers?.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    return value;
  };

  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="User" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-heading-4 text-text-primary">Informações de Entrega</h2>
          <p className="text-sm text-text-secondary">Preencha seus dados para finalizar o pedido</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="UserCheck" size={18} />
            <span>Dados Pessoais</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nome Completo"
              type="text"
              placeholder="Seu nome completo"
              value={formData?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              error={errors?.name}
              required
            />
            
            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              required
            />
          </div>

          <Input
            label="Telefone"
            type="tel"
            placeholder="(11) 99999-9999"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', formatPhone(e?.target?.value))}
            error={errors?.phone}
            required
          />
        </div>

        {/* Address Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="MapPin" size={18} />
            <span>Endereço de Entrega</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="CEP"
              type="text"
              placeholder="00000-000"
              value={formData?.zipCode}
              onChange={(e) => handleInputChange('zipCode', formatZipCode(e?.target?.value))}
              error={errors?.zipCode}
              required
              className="md:col-span-1"
            />
            
            <Input
              label="Endereço"
              type="text"
              placeholder="Rua, Avenida, etc."
              value={formData?.address}
              onChange={(e) => handleInputChange('address', e?.target?.value)}
              error={errors?.address}
              required
              className="md:col-span-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Número"
              type="text"
              placeholder="123"
              value={formData?.number}
              onChange={(e) => handleInputChange('number', e?.target?.value)}
              error={errors?.number}
              required
            />
            
            <Input
              label="Complemento"
              type="text"
              placeholder="Apto, Bloco, etc. (opcional)"
              value={formData?.complement}
              onChange={(e) => handleInputChange('complement', e?.target?.value)}
              className="md:col-span-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Bairro"
              type="text"
              placeholder="Nome do bairro"
              value={formData?.neighborhood}
              onChange={(e) => handleInputChange('neighborhood', e?.target?.value)}
              error={errors?.neighborhood}
              required
            />
            
            <Input
              label="Cidade"
              type="text"
              placeholder="Nome da cidade"
              value={formData?.city}
              onChange={(e) => handleInputChange('city', e?.target?.value)}
              error={errors?.city}
              required
            />
            
            <Select
              label="Estado"
              placeholder="Selecione o estado"
              options={brazilianStates}
              value={formData?.state}
              onChange={(value) => handleInputChange('state', value)}
              error={errors?.state}
              required
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-4">
          <h3 className="font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="CreditCard" size={18} />
            <span>Forma de Pagamento</span>
          </h3>

          <Select
            label="Método de Pagamento"
            placeholder="Escolha como deseja pagar"
            options={paymentMethods}
            value={formData?.paymentMethod}
            onChange={(value) => handleInputChange('paymentMethod', value)}
            error={errors?.paymentMethod}
            required
          />

          {formData?.paymentMethod === 'pix' && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-success mb-2">
                <Icon name="Zap" size={16} />
                <span className="font-medium">PIX Selecionado</span>
              </div>
              <p className="text-sm text-text-secondary">
                Você receberá o código PIX via WhatsApp para pagamento instantâneo.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            iconName="ArrowLeft"
            iconPosition="left"
            onClick={() => window.history?.back()}
            className="sm:w-auto"
          >
            Voltar ao Carrinho
          </Button>
          
          <Button
            type="submit"
            variant="default"
            iconName="MessageCircle"
            iconPosition="right"
            className="flex-1 sm:flex-none bg-[#25D366] hover:bg-[#128C7E]"
          >
            Continuar no WhatsApp
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerInfoForm;