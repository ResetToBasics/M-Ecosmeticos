import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ relatedProducts }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })?.format(price);
  };

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={i < Math.floor(rating) ? 'text-accent fill-current' : 'text-border'}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-heading-3 font-semibold mb-2">Produtos Relacionados</h3>
        <p className="text-body text-text-secondary">
          Outros produtos que nossos clientes adoram
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {relatedProducts?.map((product) => (
          <div key={product?.id} className="card-product group">
            <div className="relative">
              {/* Product Image */}
              <div className="aspect-square bg-surface rounded-t-xl overflow-hidden">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                  {product?.isNew && (
                    <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                      Novo
                    </span>
                  )}
                  {product?.bestSeller && (
                    <span className="bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded-full">
                      Mais Vendido
                    </span>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors duration-300">
                    <Icon name="Heart" size={16} />
                  </button>
                  <button className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors duration-300">
                    <Icon name="Eye" size={16} />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                      {product?.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      {renderStars(product?.rating)}
                      <span className="text-xs text-text-secondary ml-1">
                        ({product?.reviewCount})
                      </span>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-sm leading-tight line-clamp-2">
                    {product?.name}
                  </h4>
                  
                  <p className="text-xs text-text-secondary line-clamp-2">
                    {product?.shortDescription}
                  </p>
                </div>

                {/* Size Options */}
                <div className="space-y-2">
                  <div className="text-xs text-text-secondary">Tamanhos disponíveis:</div>
                  <div className="flex items-center space-x-2">
                    {product?.availableSizes?.map((size, index) => (
                      <span
                        key={index}
                        className="text-xs bg-surface px-2 py-1 rounded-full border border-border"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-primary">
                        A partir de {formatPrice(product?.startingPrice)}
                      </div>
                      {product?.originalPrice && (
                        <div className="text-xs text-text-secondary line-through">
                          {formatPrice(product?.originalPrice)}
                        </div>
                      )}
                    </div>
                    {product?.discount && (
                      <span className="text-xs bg-error text-error-foreground px-2 py-1 rounded-full font-medium">
                        -{product?.discount}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2">
                  <Link to={`/product-detail-page?id=${product?.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      iconName="Eye"
                      iconPosition="left"
                      className="text-xs"
                    >
                      Ver Detalhes
                    </Button>
                  </Link>
                  
                  <Button
                    variant="default"
                    size="sm"
                    fullWidth
                    iconName="MessageCircle"
                    iconPosition="left"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground text-xs"
                    onClick={() => {
                      const message = encodeURIComponent(`Olá! Tenho interesse no produto: ${product?.name}. Gostaria de mais informações sobre os tamanhos disponíveis.`);
                      window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
                    }}
                  >
                    Consultar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* View All Button */}
      <div className="text-center">
        <Link to="/product-catalog">
          <Button
            variant="outline"
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
            className="px-8"
          >
            Ver Todos os Produtos
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RelatedProducts;