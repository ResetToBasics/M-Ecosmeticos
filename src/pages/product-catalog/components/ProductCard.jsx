import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })?.format(price);
  };

  const getSizeLabel = (size) => {
    if (size <= 15) return 'Teste';
    if (size <= 30) return 'Viagem';
    if (size <= 50) return 'Regular';
    return 'Econômico';
  };

  const getSizeBadgeColor = (size) => {
    if (size <= 15) return 'bg-accent/10 text-accent border-accent/20';
    if (size <= 30) return 'bg-primary/10 text-primary border-primary/20';
    if (size <= 50) return 'bg-success/10 text-success border-success/20';
    return 'bg-secondary/10 text-secondary border-secondary/20';
  };

  return (
    <div 
      className="card-product group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to="/product-detail-page" className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-t-xl bg-muted aspect-square">
          <Image
            src={product?.image}
            alt={product?.name}
            className={`w-full h-full object-cover transition-all duration-500 ease-elegant ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {product?.isNew && (
              <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full shadow-subtle">
                Novo
              </span>
            )}
            {product?.isRecommended && (
              <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full shadow-subtle">
                Recomendado
              </span>
            )}
            <span className={`text-xs font-medium px-2 py-1 rounded-full border shadow-subtle ${getSizeBadgeColor(product?.size)}`}>
              {getSizeLabel(product?.size)}
            </span>
          </div>

          {/* Size Comparison */}
          <div className="absolute top-3 right-3">
            <div className="bg-background/90 backdrop-blur-sm rounded-lg p-2 shadow-subtle">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-4 bg-border rounded-sm" />
                <div 
                  className="bg-primary rounded-sm"
                  style={{ 
                    width: `${Math.max(6, (product?.size / 100) * 12)}px`, 
                    height: '16px' 
                  }}
                />
              </div>
              <p className="text-xs text-text-secondary mt-1 text-center">
                {product?.size}ml
              </p>
            </div>
          </div>

          {/* Hover Overlay */}
          <div className={`
            absolute inset-0 bg-black/20 transition-opacity duration-300 ease-elegant
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="absolute bottom-3 left-3 right-3">
              <div className="bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-card">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={12}
                        className={i < Math.floor(product?.rating) ? 'text-accent fill-current' : 'text-border'}
                      />
                    ))}
                    <span className="text-xs text-text-secondary ml-1">
                      ({product?.reviewCount})
                    </span>
                  </div>
                  <span className="text-xs text-text-secondary">
                    {formatPrice(product?.pricePerMl)}/ml
                  </span>
                </div>
                <p className="text-xs text-text-secondary line-clamp-2">
                  {product?.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Brand */}
          <p className="text-xs text-primary font-medium mb-1 uppercase tracking-wide">
            {product?.brand}
          </p>

          {/* Name */}
          <h3 className="font-heading text-base font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product?.name}
          </h3>

          {/* Key Ingredients */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product?.keyIngredients?.slice(0, 2)?.map((ingredient) => (
              <span
                key={ingredient}
                className="text-xs bg-muted text-text-secondary px-2 py-1 rounded-full"
              >
                {ingredient}
              </span>
            ))}
            {product?.keyIngredients?.length > 2 && (
              <span className="text-xs text-text-secondary px-2 py-1">
                +{product?.keyIngredients?.length - 2}
              </span>
            )}
          </div>

          {/* Price and Size Info */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-heading text-lg font-bold text-text-primary">
                {formatPrice(product?.price)}
              </p>
              <p className="text-xs text-text-secondary">
                {product?.size}ml • {formatPrice(product?.pricePerMl)}/ml
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-secondary">
                Original: {product?.originalSize}ml
              </p>
              <p className="text-xs text-success font-medium">
                Economia: {Math.round((1 - product?.price / product?.originalPrice) * 100)}%
              </p>
            </div>
          </div>

          {/* Usage Indicator */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} className="text-text-secondary" />
              <span className="text-xs text-text-secondary">
                Dura ~{product?.estimatedDays} dias
              </span>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  className={i < Math.floor(product?.rating) ? 'text-accent fill-current' : 'text-border'}
                />
              ))}
              <span className="text-xs text-text-secondary ml-1">
                {product?.rating}
              </span>
            </div>
          </div>
        </div>
      </Link>

    </div>
  );
};

export default ProductCard;