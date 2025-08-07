import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SizeAdvisor = ({ product, onSizeRecommendation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendation, setRecommendation] = useState(null);
  const [showAdvisor, setShowAdvisor] = useState(false);

  const questions = [
    {
      id: 'skinType',
      question: 'Qual é o seu tipo de pele?',
      type: 'single',
      options: [
        { value: 'oleosa', label: 'Oleosa', description: 'Brilho excessivo, poros dilatados' },
        { value: 'seca', label: 'Seca', description: 'Ressecamento, descamação' },
        { value: 'mista', label: 'Mista', description: 'Zona T oleosa, bochechas secas' },
        { value: 'sensivel', label: 'Sensível', description: 'Irritação fácil, vermelhidão' },
        { value: 'normal', label: 'Normal', description: 'Equilibrada, sem problemas específicos' }
      ]
    },
    {
      id: 'usage',
      question: 'Com que frequência pretende usar o produto?',
      type: 'single',
      options: [
        { value: 'daily', label: 'Diariamente', description: '1-2 vezes por dia' },
        { value: 'frequent', label: 'Frequentemente', description: '4-5 vezes por semana' },
        { value: 'occasional', label: 'Ocasionalmente', description: '2-3 vezes por semana' },
        { value: 'rare', label: 'Raramente', description: '1 vez por semana ou menos' }
      ]
    },
    {
      id: 'experience',
      question: 'Qual sua experiência com produtos similares?',
      type: 'single',
      options: [
        { value: 'beginner', label: 'Iniciante', description: 'Primeira vez usando este tipo de produto' },
        { value: 'some', label: 'Alguma experiência', description: 'Já usei produtos similares algumas vezes' },
        { value: 'experienced', label: 'Experiente', description: 'Uso regularmente produtos de skincare' },
        { value: 'expert', label: 'Especialista', description: 'Conheço bem minha pele e produtos' }
      ]
    },
    {
      id: 'budget',
      question: 'Qual seu orçamento preferido para testar o produto?',
      type: 'single',
      options: [
        { value: 'low', label: 'Até R$ 50', description: 'Quero testar com investimento mínimo' },
        { value: 'medium', label: 'R$ 50 - R$ 100', description: 'Investimento moderado para teste' },
        { value: 'high', label: 'R$ 100 - R$ 200', description: 'Posso investir mais para teste completo' },
        { value: 'premium', label: 'Acima de R$ 200', description: 'Quero a melhor opção disponível' }
      ]
    },
    {
      id: 'goals',
      question: 'Qual seu principal objetivo?',
      type: 'multiple',
      options: [
        { value: 'test', label: 'Testar o produto', description: 'Conhecer antes de comprar tamanho maior' },
        { value: 'travel', label: 'Viagem', description: 'Levar em viagens e deslocamentos' },
        { value: 'routine', label: 'Rotina regular', description: 'Usar como parte da rotina diária' },
        { value: 'gift', label: 'Presente', description: 'Dar de presente para alguém' },
        { value: 'backup', label: 'Reserva', description: 'Ter como produto de backup' }
      ]
    }
  ];

  const calculateRecommendation = () => {
    let recommendedSize = product?.sizes?.[0]; // Default to smallest
    let confidence = 0;
    let reasons = [];

    // Logic based on answers
    if (answers?.usage === 'daily') {
      recommendedSize = product?.sizes?.find(s => s?.volume >= 30) || product?.sizes?.[product?.sizes?.length - 1];
      confidence += 25;
      reasons?.push('Uso diário requer maior quantidade');
    } else if (answers?.usage === 'occasional') {
      recommendedSize = product?.sizes?.find(s => s?.volume >= 15 && s?.volume <= 30) || product?.sizes?.[1];
      confidence += 20;
      reasons?.push('Uso ocasional combina com tamanho médio');
    }

    if (answers?.experience === 'beginner') {
      recommendedSize = product?.sizes?.find(s => s?.volume <= 15) || product?.sizes?.[0];
      confidence += 20;
      reasons?.push('Iniciantes devem começar com tamanhos menores');
    }

    if (answers?.budget === 'low') {
      recommendedSize = product?.sizes?.[0];
      confidence += 15;
      reasons?.push('Opção mais econômica para teste');
    } else if (answers?.budget === 'premium') {
      recommendedSize = product?.sizes?.[product?.sizes?.length - 1];
      confidence += 15;
      reasons?.push('Melhor custo-benefício no tamanho maior');
    }

    if (answers?.goals && answers?.goals?.includes('test')) {
      recommendedSize = product?.sizes?.find(s => s?.volume <= 15) || product?.sizes?.[0];
      confidence += 20;
      reasons?.push('Tamanho ideal para teste inicial');
    }

    if (answers?.goals && answers?.goals?.includes('travel')) {
      recommendedSize = product?.sizes?.find(s => s?.volume >= 5 && s?.volume <= 15) || product?.sizes?.[0];
      confidence += 15;
      reasons?.push('Tamanho prático para viagens');
    }

    confidence = Math.min(confidence, 95); // Cap at 95%

    return {
      size: recommendedSize,
      confidence,
      reasons,
      alternatives: product?.sizes?.filter(s => s?.id !== recommendedSize?.id)?.slice(0, 2)
    };
  };

  const handleAnswer = (questionId, value) => {
    const question = questions?.[currentStep];
    
    if (question?.type === 'multiple') {
      const currentAnswers = answers?.[questionId] || [];
      const newAnswers = currentAnswers?.includes(value)
        ? currentAnswers?.filter(a => a !== value)
        : [...currentAnswers, value];
      
      setAnswers(prev => ({
        ...prev,
        [questionId]: newAnswers
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [questionId]: value
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < questions?.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const rec = calculateRecommendation();
      setRecommendation(rec);
      onSizeRecommendation(rec?.size);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetAdvisor = () => {
    setCurrentStep(0);
    setAnswers({});
    setRecommendation(null);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })?.format(price);
  };

  if (!showAdvisor) {
    return (
      <div className="bg-gradient-primary rounded-xl p-6 text-center text-white">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Brain" size={32} color="white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Consultor Inteligente de Tamanhos</h3>
            <p className="text-white/90 text-sm">
              Responda algumas perguntas e receba uma recomendação personalizada do tamanho ideal para você
            </p>
          </div>
          <Button
            variant="secondary"
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => setShowAdvisor(true)}
            className="bg-white text-primary hover:bg-white/90"
          >
            Iniciar Consulta
          </Button>
        </div>
      </div>
    );
  }

  if (recommendation) {
    return (
      <div className="bg-success/5 rounded-xl p-6 border border-success/20">
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h3 className="text-xl font-semibold text-success mb-2">
              Recomendação Personalizada
            </h3>
            <p className="text-sm text-text-secondary">
              Baseado nas suas respostas, encontramos o tamanho ideal para você
            </p>
          </div>

          <div className="bg-background rounded-lg p-6 border border-border">
            <div className="text-center mb-4">
              <h4 className="text-2xl font-bold text-primary mb-1">
                {recommendation?.size?.volume}ml
              </h4>
              <p className="text-lg font-semibold">
                {formatPrice(recommendation?.size?.price)}
              </p>
              <p className="text-sm text-text-secondary">
                Duração: {recommendation?.size?.duration}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Confiança da recomendação:</span>
                <span className="text-sm font-bold text-success">{recommendation?.confidence}%</span>
              </div>
              
              <div className="w-full bg-border rounded-full h-2">
                <div 
                  className="bg-success h-2 rounded-full transition-all duration-500"
                  style={{ width: `${recommendation?.confidence}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="font-semibold">Por que recomendamos este tamanho:</h5>
            <ul className="space-y-2">
              {recommendation?.reasons?.map((reason, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {recommendation?.alternatives?.length > 0 && (
            <div className="space-y-3">
              <h5 className="font-semibold">Alternativas a considerar:</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {recommendation?.alternatives?.map((alt) => (
                  <div key={alt?.id} className="bg-surface rounded-lg p-3 border border-border">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{alt?.volume}ml</span>
                      <span className="text-primary font-semibold">
                        {formatPrice(alt?.price)}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary mt-1">
                      {alt?.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={resetAdvisor}
              className="flex-1"
            >
              Nova Consulta
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
              onClick={() => {
                const message = encodeURIComponent(`Olá! Usei o Consultor Inteligente e recebi a recomendação de ${recommendation?.size?.volume}ml para o produto ${product?.name}. Gostaria de finalizar o pedido.`);
                window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
              }}
              className="flex-1 bg-accent hover:bg-accent/90"
            >
              Pedir Agora
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions?.[currentStep];
  const currentAnswer = answers?.[currentQuestion?.id];
  const canProceed = currentQuestion?.type === 'multiple' 
    ? currentAnswer && currentAnswer?.length > 0
    : currentAnswer;

  return (
    <div className="bg-background rounded-xl p-6 border border-border">
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Pergunta {currentStep + 1} de {questions?.length}</span>
            <span className="text-text-secondary">
              {Math.round(((currentStep + 1) / questions?.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions?.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">{currentQuestion?.question}</h4>
          
          <div className="space-y-3">
            {currentQuestion?.options?.map((option) => {
              const isSelected = currentQuestion?.type === 'multiple'
                ? currentAnswer && currentAnswer?.includes(option?.value)
                : currentAnswer === option?.value;

              return (
                <button
                  key={option?.value}
                  onClick={() => handleAnswer(currentQuestion?.id, option?.value)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-card'
                      : 'border-border hover:border-primary/50 hover:bg-surface'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 transition-colors duration-300 ${
                      isSelected ? 'border-primary bg-primary' : 'border-border'
                    }`}>
                      {isSelected && (
                        <Icon name="Check" size={12} color="white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{option?.label}</div>
                      <div className="text-sm text-text-secondary mt-1">
                        {option?.description}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronLeft"
            iconPosition="left"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Anterior
          </Button>
          
          <Button
            variant="default"
            size="sm"
            iconName={currentStep === questions?.length - 1 ? "Sparkles" : "ChevronRight"}
            iconPosition="right"
            onClick={nextStep}
            disabled={!canProceed}
            className="bg-primary hover:bg-primary/90"
          >
            {currentStep === questions?.length - 1 ? 'Ver Recomendação' : 'Próxima'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SizeAdvisor;