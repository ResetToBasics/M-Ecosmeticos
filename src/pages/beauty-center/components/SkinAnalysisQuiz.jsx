import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkinAnalysisQuiz = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 'skinType',
      question: 'Como você descreveria seu tipo de pele?',
      options: [
        { value: 'oily', label: 'Oleosa - Brilho excessivo, poros dilatados' },
        { value: 'dry', label: 'Seca - Ressecamento, descamação' },
        { value: 'combination', label: 'Mista - Zona T oleosa, bochechas secas' },
        { value: 'sensitive', label: 'Sensível - Irritação, vermelhidão fácil' },
        { value: 'normal', label: 'Normal - Equilibrada, sem problemas específicos' }
      ]
    },
    {
      id: 'concerns',
      question: 'Quais são suas principais preocupações?',
      multiple: true,
      options: [
        { value: 'acne', label: 'Acne e cravos' },
        { value: 'aging', label: 'Sinais de envelhecimento' },
        { value: 'pigmentation', label: 'Manchas e hiperpigmentação' },
        { value: 'hydration', label: 'Falta de hidratação' },
        { value: 'sensitivity', label: 'Sensibilidade e irritação' },
        { value: 'pores', label: 'Poros dilatados' }
      ]
    },
    {
      id: 'routine',
      question: 'Qual é sua rotina atual de cuidados?',
      options: [
        { value: 'minimal', label: 'Mínima - Apenas limpeza básica' },
        { value: 'basic', label: 'Básica - Limpeza, hidratante, protetor solar' },
        { value: 'intermediate', label: 'Intermediária - 4-6 produtos regulares' },
        { value: 'advanced', label: 'Avançada - Rotina completa com ativos' }
      ]
    },
    {
      id: 'experience',
      question: 'Qual sua experiência com produtos fracionados?',
      options: [
        { value: 'none', label: 'Nunca usei - Primeira vez' },
        { value: 'beginner', label: 'Iniciante - Poucos produtos testados' },
        { value: 'experienced', label: 'Experiente - Uso regularmente' },
        { value: 'expert', label: 'Expert - Conheço bem as vantagens' }
      ]
    }
  ];

  const handleAnswer = (questionId, value, isMultiple = false) => {
    if (isMultiple) {
      const currentAnswers = answers?.[questionId] || [];
      const newAnswers = currentAnswers?.includes(value)
        ? currentAnswers?.filter(v => v !== value)
        : [...currentAnswers, value];
      setAnswers(prev => ({ ...prev, [questionId]: newAnswers }));
    } else {
      setAnswers(prev => ({ ...prev, [questionId]: value }));
    }
  };

  const nextStep = () => {
    if (currentStep < questions?.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateResults();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateResults = () => {
    const recommendations = {
      skinType: answers?.skinType,
      recommendedProducts: getRecommendedProducts(answers),
      fractionalSizes: getFractionalRecommendations(answers),
      routine: getRoutineRecommendations(answers)
    };
    
    setShowResults(true);
    onComplete(recommendations);
  };

  const getRecommendedProducts = (answers) => {
    const products = [];
    
    if (answers?.skinType === 'oily') {
      products?.push('Sérum Niacinamida 10ml', 'Gel de Limpeza Profunda 30ml');
    } else if (answers?.skinType === 'dry') {
      products?.push('Hidratante Intensivo 15ml', 'Óleo Facial Nutritivo 5ml');
    } else if (answers?.skinType === 'combination') {
      products?.push('Tônico Equilibrante 50ml', 'Hidratante Gel-Creme 20ml');
    }
    
    if (answers?.concerns?.includes('aging')) {
      products?.push('Sérum Vitamina C 10ml', 'Retinol 0.5% 5ml');
    }
    
    if (answers?.concerns?.includes('acne')) {
      products?.push('Ácido Salicílico 2% 10ml', 'Argila Purificante 25g');
    }
    
    return products;
  };

  const getFractionalRecommendations = (answers) => {
    if (answers?.experience === 'none' || answers?.experience === 'beginner') {
      return {
        serums: '5-10ml',
        moisturizers: '15-20ml',
        treatments: '5ml',
        reason: 'Tamanhos ideais para testar novos produtos sem desperdício'
      };
    } else {
      return {
        serums: '10-15ml',
        moisturizers: '20-30ml',
        treatments: '10ml',
        reason: 'Porções otimizadas para uso regular e economia'
      };
    }
  };

  const getRoutineRecommendations = (answers) => {
    const routine = {
      morning: ['Limpeza suave', 'Sérum antioxidante', 'Hidratante', 'Protetor solar'],
      evening: ['Limpeza profunda', 'Tônico', 'Tratamento específico', 'Hidratante noturno']
    };
    
    if (answers?.routine === 'minimal') {
      routine.morning = routine?.morning?.slice(0, 3);
      routine.evening = routine?.evening?.slice(0, 2);
    }
    
    return routine;
  };

  const currentQuestion = questions?.[currentStep];
  const isAnswered = answers?.[currentQuestion?.id] && 
    (currentQuestion?.multiple ? answers?.[currentQuestion?.id]?.length > 0 : true);

  if (showResults) {
    return (
      <div className="bg-card rounded-xl p-8 shadow-card">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Sparkles" size={32} color="white" />
          </div>
          <h3 className="text-heading-3 text-text-primary mb-2">
            Análise Completa!
          </h3>
          <p className="text-body text-text-secondary">
            Suas recomendações personalizadas estão prontas
          </p>
        </div>
        <div className="space-y-6">
          <div className="bg-primary/5 rounded-lg p-6">
            <h4 className="font-semibold text-text-primary mb-3 flex items-center">
              <Icon name="User" size={20} className="mr-2 text-primary" />
              Seu Perfil de Pele
            </h4>
            <p className="text-text-secondary capitalize">
              Tipo: {answers?.skinType} | Preocupações: {answers?.concerns?.join(', ')}
            </p>
          </div>
          
          <div className="bg-accent/5 rounded-lg p-6">
            <h4 className="font-semibold text-text-primary mb-3 flex items-center">
              <Icon name="Package" size={20} className="mr-2 text-accent" />
              Produtos Recomendados
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {getRecommendedProducts(answers)?.map((product, index) => (
                <div key={index} className="flex items-center text-text-secondary">
                  <Icon name="Check" size={16} className="mr-2 text-accent" />
                  {product}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button
            variant="default"
            fullWidth
            iconName="ShoppingBag"
            iconPosition="left"
            onClick={() => window.open('/product-catalog', '_blank')}
          >
            Ver Produtos Recomendados
          </Button>
          <Button
            variant="outline"
            fullWidth
            iconName="MessageCircle"
            iconPosition="left"
            onClick={() => {
              const message = encodeURIComponent(`Olá! Completei a análise de pele no Centro de Beleza. Gostaria de uma consulta personalizada sobre os produtos recomendados para meu tipo de pele: ${answers?.skinType}.`);
              window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
            }}
          >
            Consulta Personalizada
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-8 shadow-card">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-heading-3 text-text-primary">
            Análise de Pele Personalizada
          </h3>
          <span className="text-sm text-text-secondary">
            {currentStep + 1} de {questions?.length}
          </span>
        </div>
        
        <div className="w-full bg-border rounded-full h-2 mb-6">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / questions?.length) * 100}%` }}
          />
        </div>
        
        <h4 className="text-heading-4 text-text-primary mb-6">
          {currentQuestion?.question}
        </h4>
        
        <div className="space-y-3">
          {currentQuestion?.options?.map((option) => (
            <label
              key={option?.value}
              className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:border-primary/50 ${
                currentQuestion?.multiple
                  ? (answers?.[currentQuestion?.id]?.includes(option?.value) ? 'border-primary bg-primary/5' : 'border-border')
                  : (answers?.[currentQuestion?.id] === option?.value ? 'border-primary bg-primary/5' : 'border-border')
              }`}
            >
              <input
                type={currentQuestion?.multiple ? 'checkbox' : 'radio'}
                name={currentQuestion?.id}
                value={option?.value}
                checked={
                  currentQuestion?.multiple
                    ? answers?.[currentQuestion?.id]?.includes(option?.value) || false
                    : answers?.[currentQuestion?.id] === option?.value
                }
                onChange={(e) => handleAnswer(currentQuestion?.id, option?.value, currentQuestion?.multiple)}
                className="sr-only"
              />
              <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mr-3 mt-0.5 transition-all duration-300 ${
                currentQuestion?.multiple
                  ? (answers?.[currentQuestion?.id]?.includes(option?.value) ? 'border-primary bg-primary' : 'border-border')
                  : (answers?.[currentQuestion?.id] === option?.value ? 'border-primary bg-primary' : 'border-border')
              }`}>
                {((currentQuestion?.multiple && answers?.[currentQuestion?.id]?.includes(option?.value)) ||
                  (!currentQuestion?.multiple && answers?.[currentQuestion?.id] === option?.value)) && (
                  <Icon name="Check" size={12} color="white" className="m-0.5" />
                )}
              </div>
              <div>
                <span className="font-medium text-text-primary block">
                  {option?.label?.split(' - ')?.[0]}
                </span>
                {option?.label?.includes(' - ') && (
                  <span className="text-sm text-text-secondary">
                    {option?.label?.split(' - ')?.[1]}
                  </span>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={currentStep === 0}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Anterior
        </Button>
        
        <Button
          variant="default"
          onClick={nextStep}
          disabled={!isAnswered}
          iconName={currentStep === questions?.length - 1 ? "Sparkles" : "ArrowRight"}
          iconPosition="right"
        >
          {currentStep === questions?.length - 1 ? 'Ver Resultados' : 'Próximo'}
        </Button>
      </div>
    </div>
  );
};

export default SkinAnalysisQuiz;