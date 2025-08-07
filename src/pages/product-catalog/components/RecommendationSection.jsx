import React from 'react';
import Icon from '../../../components/AppIcon';


const RecommendationSection = ({ recommendations }) => {
  if (!recommendations || recommendations?.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-primary rounded-xl p-6 mb-8">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Sparkles" size={32} className="text-white" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-white mb-2">
          Recomendações Personalizadas
        </h2>
        <p className="text-white/90 max-w-2xl mx-auto">
          Com base no seu histórico de navegação e preferências, selecionamos estes produtos especialmente para você.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {recommendations?.slice(0, 3)?.map((product) => (
          <div key={product?.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors">
            <div className="aspect-square bg-white/20 rounded-lg mb-4 overflow-hidden">
              <img
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <p className="text-white/80 text-xs font-medium mb-1 uppercase tracking-wide">
                {product?.brand}
              </p>
              <h3 className="font-heading text-white font-semibold mb-2 line-clamp-2">
                {product?.name}
              </h3>
              <div className="flex items-center justify-center space-x-1 mb-3">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={12}
                    className={i < Math.floor(product?.rating) ? 'text-accent fill-current' : 'text-white/30'}
                  />
                ))}
                <span className="text-white/80 text-xs ml-1">
                  {product?.rating}
                </span>
              </div>
              <p className="font-heading text-lg font-bold text-white mb-3">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })?.format(product?.price)}
              </p>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default RecommendationSection;