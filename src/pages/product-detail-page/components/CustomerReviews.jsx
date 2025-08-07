import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CustomerReviews = ({ product }) => {
  const [selectedSizeFilter, setSelectedSizeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const sizeFilters = [
    { id: 'all', label: 'Todos os tamanhos' },
    { id: '5ml', label: '5ml' },
    { id: '15ml', label: '15ml' },
    { id: '30ml', label: '30ml' },
    { id: '50ml', label: '50ml' }
  ];

  const sortOptions = [
    { id: 'recent', label: 'Mais recentes' },
    { id: 'helpful', label: 'Mais úteis' },
    { id: 'rating', label: 'Maior avaliação' }
  ];

  const filteredReviews = product?.reviews?.filter(review => 
    selectedSizeFilter === 'all' || review?.purchasedSize === selectedSizeFilter
  );

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={i < rating ? 'text-accent fill-current' : 'text-border'}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-heading-4 font-semibold">Avaliações dos Clientes</h3>
          <p className="text-sm text-text-secondary">
            {product?.reviewCount} avaliações • Média {product?.rating}/5
          </p>
        </div>
        
        <button className="btn-outline text-sm px-4 py-2">
          Escrever Avaliação
        </button>
      </div>
      {/* Rating Summary */}
      <div className="bg-surface rounded-lg p-6 border border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{product?.rating}</div>
            <div className="flex items-center justify-center space-x-1 mb-2">
              {renderStars(Math.floor(product?.rating))}
            </div>
            <p className="text-sm text-text-secondary">
              Baseado em {product?.reviewCount} avaliações
            </p>
          </div>
          
          <div className="space-y-2">
            {[5, 4, 3, 2, 1]?.map((stars) => {
              const count = product?.ratingDistribution?.[stars] || 0;
              const percentage = (count / product?.reviewCount) * 100;
              
              return (
                <div key={stars} className="flex items-center space-x-3">
                  <span className="text-sm w-8">{stars}★</span>
                  <div className="flex-1 bg-border rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-text-secondary w-12 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Filtrar por tamanho:</span>
          <select
            value={selectedSizeFilter}
            onChange={(e) => setSelectedSizeFilter(e?.target?.value)}
            className="text-sm border border-border rounded-lg px-3 py-2 bg-background"
          >
            {sizeFilters?.map((filter) => (
              <option key={filter?.id} value={filter?.id}>
                {filter?.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Ordenar por:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="text-sm border border-border rounded-lg px-3 py-2 bg-background"
          >
            {sortOptions?.map((option) => (
              <option key={option?.id} value={option?.id}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews?.map((review) => (
          <div key={review?.id} className="bg-background rounded-lg p-6 border border-border">
            <div className="flex items-start space-x-4">
              <Image
                src={review?.customerAvatar}
                alt={review?.customerName}
                className="w-12 h-12 rounded-full object-cover"
              />
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{review?.customerName}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center space-x-1">
                        {renderStars(review?.rating)}
                      </div>
                      <span className="text-sm text-text-secondary">•</span>
                      <span className="text-sm text-text-secondary">
                        {formatDate(review?.date)}
                      </span>
                      <span className="text-sm text-text-secondary">•</span>
                      <span className="text-sm text-primary font-medium">
                        Comprou {review?.purchasedSize}
                      </span>
                    </div>
                  </div>
                  
                  {review?.verified && (
                    <div className="flex items-center space-x-1 text-success text-sm">
                      <Icon name="ShieldCheck" size={16} />
                      <span>Compra verificada</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <p className="text-body leading-relaxed">{review?.comment}</p>
                  
                  {review?.pros && review?.pros?.length > 0 && (
                    <div>
                      <h5 className="font-medium text-success mb-2">Pontos Positivos:</h5>
                      <ul className="space-y-1">
                        {review?.pros?.map((pro, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <Icon name="Plus" size={14} className="text-success mt-0.5 flex-shrink-0" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {review?.cons && review?.cons?.length > 0 && (
                    <div>
                      <h5 className="font-medium text-warning mb-2">Pontos de Atenção:</h5>
                      <ul className="space-y-1">
                        {review?.cons?.map((con, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <Icon name="Minus" size={14} className="text-warning mt-0.5 flex-shrink-0" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {review?.images && review?.images?.length > 0 && (
                    <div className="flex space-x-3 overflow-x-auto">
                      {review?.images?.map((image, index) => (
                        <Image
                          key={index}
                          src={image}
                          alt={`Foto do cliente ${index + 1}`}
                          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-sm text-text-secondary hover:text-primary transition-colors duration-300">
                      <Icon name="ThumbsUp" size={16} />
                      <span>Útil ({review?.helpfulCount})</span>
                    </button>
                    
                    <button className="text-sm text-text-secondary hover:text-primary transition-colors duration-300">
                      Responder
                    </button>
                  </div>
                  
                  {review?.skinType && (
                    <div className="text-sm text-text-secondary">
                      Tipo de pele: <span className="font-medium">{review?.skinType}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More Button */}
      <div className="text-center">
        <button className="btn-outline px-6 py-3">
          Carregar Mais Avaliações
        </button>
      </div>
    </div>
  );
};

export default CustomerReviews;