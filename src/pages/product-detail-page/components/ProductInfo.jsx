import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductInfo = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Descrição', icon: 'FileText' },
    { id: 'ingredients', label: 'Ingredientes', icon: 'Beaker' },
    { id: 'usage', label: 'Como Usar', icon: 'Play' },
    { id: 'pairings', label: 'Combinações', icon: 'Heart' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-4">
            <p className="text-body leading-relaxed">{product?.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-primary">Benefícios Principais</h4>
                <ul className="space-y-2">
                  {product?.benefits?.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="Check" size={16} className="text-success mt-1 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-primary">Ideal Para</h4>
                <ul className="space-y-2">
                  {product?.idealFor?.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="Star" size={16} className="text-accent mt-1 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );

      case 'ingredients':
        return (
          <div className="space-y-6">
            <div className="bg-surface rounded-lg p-4 border border-border">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Shield" size={20} className="text-success" />
                <span className="font-semibold text-success">Ingredientes Certificados</span>
              </div>
              <p className="text-sm text-text-secondary">
                Todos os ingredientes são certificados pela ANVISA e livres de parabenos, sulfatos e crueldade animal.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Ingredientes Ativos</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product?.activeIngredients?.map((ingredient, index) => (
                  <div key={index} className="bg-background rounded-lg p-4 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{ingredient?.name}</h5>
                      <span className="text-sm text-primary font-medium">{ingredient?.concentration}</span>
                    </div>
                    <p className="text-sm text-text-secondary">{ingredient?.benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Lista Completa (INCI)</h4>
              <div className="bg-surface rounded-lg p-4 text-sm text-text-secondary leading-relaxed">
                {product?.fullIngredientsList}
              </div>
            </div>
          </div>
        );

      case 'usage':
        return (
          <div className="space-y-6">
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Lightbulb" size={20} className="text-primary" />
                <span className="font-semibold text-primary">Dica de Especialista</span>
              </div>
              <p className="text-sm">{product?.expertTip}</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Passo a Passo</h4>
              <div className="space-y-4">
                {product?.usageSteps?.map((step, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium mb-1">{step?.title}</h5>
                      <p className="text-sm text-text-secondary">{step?.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-success">Faça</h4>
                <ul className="space-y-2">
                  {product?.dosList?.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="Check" size={16} className="text-success mt-1 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-error">Evite</h4>
                <ul className="space-y-2">
                  {product?.dontsList?.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="X" size={16} className="text-error mt-1 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );

      case 'pairings':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Combinações Perfeitas</h4>
              <p className="text-sm text-text-secondary">
                Produtos que potencializam os resultados quando usados juntos
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product?.perfectPairings?.map((pairing, index) => (
                <div key={index} className="bg-surface rounded-lg p-4 border border-border">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={pairing?.icon} size={24} className="text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium">{pairing?.title}</h5>
                      <p className="text-sm text-text-secondary">{pairing?.category}</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary mb-3">{pairing?.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-success">
                      +{pairing?.boost}% de eficácia
                    </span>
                    <button className="text-primary hover:text-primary/80 text-sm font-medium">
                      Ver Produto
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Gift" size={20} className="text-accent" />
                <span className="font-semibold text-accent">Kit Completo</span>
              </div>
              <p className="text-sm mb-3">
                Adquira o kit completo com todos os produtos complementares e economize até 25%
              </p>
              <button className="btn-accent text-sm px-4 py-2">
                Ver Kit Completo
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Product Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
            {product?.category}
          </span>
          {product?.isNew && (
            <span className="text-sm text-accent font-medium bg-accent/10 px-3 py-1 rounded-full">
              Novidade
            </span>
          )}
        </div>
        
        <h1 className="text-heading-2 font-bold">{product?.name}</h1>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={16}
                className={i < Math.floor(product?.rating) ? 'text-accent fill-current' : 'text-border'}
              />
            ))}
            <span className="text-sm font-medium ml-2">{product?.rating}</span>
            <span className="text-sm text-text-secondary">({product?.reviewCount} avaliações)</span>
          </div>
        </div>
        
        <p className="text-body-lg text-text-secondary leading-relaxed">
          {product?.shortDescription}
        </p>
      </div>
      {/* Tabs Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-300 ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductInfo;