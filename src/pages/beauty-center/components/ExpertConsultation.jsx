import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const ExpertConsultation = () => {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [consultationForm, setConsultationForm] = useState({
    name: '',
    email: '',
    skinType: '',
    concerns: '',
    question: ''
  });
  const [showForm, setShowForm] = useState(false);

  const experts = [
    {
      id: 1,
      name: "Dra. Marina Silva",
      specialty: "Dermatologia Estética",
      experience: "15 anos",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      bio: "Especialista em cuidados personalizados e produtos fracionados. Formada pela USP com pós-graduação em Cosmiatria.",
      rating: 4.9,
      consultations: 1250,
      specialties: ["Acne", "Anti-idade", "Hiperpigmentação", "Pele Sensível"],
      availability: "Seg-Sex: 9h-18h"
    },
    {
      id: 2,
      name: "Dra. Carolina Santos",
      specialty: "Cosmetologia Clínica",
      experience: "12 anos",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      bio: "Especialista em formulações cosméticas e rotinas personalizadas. Pioneira no uso de produtos fracionados no Brasil.",
      rating: 4.8,
      consultations: 980,
      specialties: ["Rotinas Personalizadas", "Ingredientes Ativos", "Pele Oleosa", "Produtos Fracionados"],
      availability: "Ter-Sáb: 8h-17h"
    },
    {
      id: 3,
      name: "Dr. Rafael Costa",
      specialty: "Tricologia e Dermatologia",
      experience: "18 anos",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      bio: "Especialista em cuidados capilares e tratamentos dermatológicos. Consultor em desenvolvimento de produtos fracionados.",
      rating: 4.9,
      consultations: 1450,
      specialties: ["Cuidados Capilares", "Dermatite", "Produtos Masculinos", "Tratamentos Intensivos"],
      availability: "Seg-Qui: 10h-19h"
    }
  ];

  const recentQuestions = [
    {
      id: 1,
      question: "Como usar sérum de vitamina C em pequenas quantidades?",
      expert: "Dra. Marina Silva",
      answer: `Para produtos fracionados de vitamina C, recomendo começar com 2-3 gotas pela manhã. A concentração menor permite uso diário sem irritação. Sempre aplicar antes do hidratante e protetor solar.`,
      date: "2025-01-05",
      likes: 24,
      category: "Antioxidantes"
    },
    {
      id: 2,
      question: "Qual a quantidade ideal de retinol fracionado para iniciantes?",
      expert: "Dra. Carolina Santos",
      answer: `Para iniciantes, 1 gota de retinol fracionado 2x por semana é ideal. Aumente gradualmente para uso diário conforme a tolerância. Sempre use à noite e não esqueça do protetor solar.`,
      date: "2025-01-04",
      likes: 31,
      category: "Anti-idade"
    },
    {
      id: 3,
      question: "Como combinar ácidos em produtos fracionados?",
      expert: "Dr. Rafael Costa",
      answer: `Com produtos fracionados, você pode alternar ácidos por dia: segunda (vitamina C), terça (niacinamida), quarta (ácido salicílico). Isso evita irritação e maximiza benefícios.`,
      date: "2025-01-03",
      likes: 18,
      category: "Ingredientes Ativos"
    }
  ];

  const handleExpertSelect = (expert) => {
    setSelectedExpert(expert);
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e?.preventDefault();
    const message = encodeURIComponent(
      `Olá ${selectedExpert?.name}! Gostaria de agendar uma consulta personalizada.\n\n` +
      `Nome: ${consultationForm?.name}\n` +
      `Email: ${consultationForm?.email}\n` +
      `Tipo de Pele: ${consultationForm?.skinType}\n` +
      `Principais Preocupações: ${consultationForm?.concerns}\n` +
      `Pergunta: ${consultationForm?.question}\n\n` +
      `Aguardo seu retorno para agendarmos a consulta!`
    );
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  const handleInputChange = (e) => {
    setConsultationForm(prev => ({
      ...prev,
      [e?.target?.name]: e?.target?.value
    }));
  };

  if (showForm && selectedExpert) {
    return (
      <div className="bg-card rounded-xl p-8 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={selectedExpert?.image}
                alt={selectedExpert?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-heading-4 text-text-primary">{selectedExpert?.name}</h3>
              <p className="text-text-secondary">{selectedExpert?.specialty}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowForm(false)}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nome Completo"
              type="text"
              name="name"
              value={consultationForm?.name}
              onChange={handleInputChange}
              required
              placeholder="Seu nome completo"
            />
            <Input
              label="E-mail"
              type="email"
              name="email"
              value={consultationForm?.email}
              onChange={handleInputChange}
              required
              placeholder="seu@email.com"
            />
          </div>

          <Input
            label="Tipo de Pele"
            type="text"
            name="skinType"
            value={consultationForm?.skinType}
            onChange={handleInputChange}
            placeholder="Ex: Oleosa, Seca, Mista, Sensível"
          />

          <Input
            label="Principais Preocupações"
            type="text"
            name="concerns"
            value={consultationForm?.concerns}
            onChange={handleInputChange}
            placeholder="Ex: Acne, manchas, sinais de idade"
          />

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Sua Pergunta
            </label>
            <textarea
              name="question"
              value={consultationForm?.question}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Descreva sua dúvida ou o que gostaria de saber sobre produtos fracionados..."
              required
            />
          </div>

          <div className="bg-primary/5 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-text-primary mb-1">Como funciona a consulta?</h4>
                <p className="text-sm text-text-secondary">
                  Após enviar sua solicitação, {selectedExpert?.name} entrará em contato via WhatsApp 
                  para agendar sua consulta personalizada. A primeira consulta é gratuita!
                </p>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="default"
            fullWidth
            iconName="MessageCircle"
            iconPosition="left"
          >
            Solicitar Consulta via WhatsApp
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Experts Section */}
      <div>
        <h3 className="text-heading-3 text-text-primary mb-6">Nossos Especialistas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts?.map((expert) => (
            <div key={expert?.id} className="card-elegant hover-lift">
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={expert?.image}
                      alt={expert?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">{expert?.name}</h4>
                    <p className="text-sm text-text-secondary">{expert?.specialty}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        <Icon name="Star" size={14} className="text-accent fill-current" />
                        <span className="text-sm text-text-secondary ml-1">{expert?.rating}</span>
                      </div>
                      <span className="text-xs text-text-secondary">•</span>
                      <span className="text-xs text-text-secondary">{expert?.consultations} consultas</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-text-secondary mb-4 line-clamp-3">
                  {expert?.bio}
                </p>

                <div className="mb-4">
                  <h5 className="text-sm font-medium text-text-primary mb-2">Especialidades:</h5>
                  <div className="flex flex-wrap gap-2">
                    {expert?.specialties?.slice(0, 3)?.map((specialty, index) => (
                      <span
                        key={index}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                    {expert?.specialties?.length > 3 && (
                      <span className="text-xs text-text-secondary">
                        +{expert?.specialties?.length - 3} mais
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-text-secondary mb-4">
                  <div className="flex items-center">
                    <Icon name="Clock" size={14} className="mr-1" />
                    {expert?.availability}
                  </div>
                  <div className="flex items-center">
                    <Icon name="Award" size={14} className="mr-1" />
                    {expert?.experience}
                  </div>
                </div>

                <Button
                  variant="default"
                  fullWidth
                  onClick={() => handleExpertSelect(expert)}
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Consultar Especialista
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Questions */}
      <div>
        <h3 className="text-heading-3 text-text-primary mb-6">Perguntas Recentes</h3>
        <div className="space-y-6">
          {recentQuestions?.map((item) => (
            <div key={item?.id} className="card-elegant">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                        {item?.category}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {new Date(item.date)?.toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <h4 className="font-semibold text-text-primary mb-2">
                      {item?.question}
                    </h4>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="User" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-primary">{item?.expert}</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item?.answer}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors">
                      <Icon name="ThumbsUp" size={16} />
                      <span className="text-sm">{item?.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors">
                      <Icon name="Share" size={16} />
                      <span className="text-sm">Compartilhar</span>
                    </button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MessageCircle"
                    iconPosition="left"
                    onClick={() => {
                      const message = encodeURIComponent(`Olá! Vi a pergunta "${item?.question}" no Centro de Beleza e gostaria de fazer uma consulta similar.`);
                      window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
                    }}
                  >
                    Pergunta Similar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertConsultation;