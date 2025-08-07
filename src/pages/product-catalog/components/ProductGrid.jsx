import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, viewMode, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(12)]?.map((_, index) => (
          <div key={index} className="card-product animate-pulse">
            <div className="aspect-square bg-muted rounded-t-xl" />
            <div className="p-4 space-y-3">
              <div className="h-3 bg-muted rounded w-1/3" />
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="flex space-x-2">
                <div className="h-6 bg-muted rounded-full w-16" />
                <div className="h-6 bg-muted rounded-full w-20" />
              </div>
              <div className="flex justify-between">
                <div className="h-6 bg-muted rounded w-20" />
                <div className="h-4 bg-muted rounded w-16" />
              </div>
              <div className="h-10 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products?.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <svg 
            viewBox="0 0 24 24" 
            className="w-12 h-12 text-text-secondary"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
            <path d="M6 6h.008v.008H6V6z" />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">
          Nenhum produto encontrado
        </h3>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          Não encontramos produtos que correspondam aos seus filtros. Tente ajustar os critérios de busca ou limpar os filtros.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button className="text-primary hover:text-primary/80 font-medium">
            Limpar todos os filtros
          </button>
          <span className="text-text-secondary">ou</span>
          <button className="text-accent hover:text-accent/80 font-medium">
            Ver todos os produtos
          </button>
        </div>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {products?.map((product) => (
          <div key={product?.id} className="card-elegant p-6 hover:shadow-card transition-shadow">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
              {/* Product Image */}
              <div className="w-full md:w-48 aspect-square md:aspect-auto md:h-48 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <p className="text-xs text-primary font-medium mb-1 uppercase tracking-wide">
                      {product?.brand}
                    </p>
                    <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                      {product?.name}
                    </h3>
                    <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                      {product?.shortDescription}
                    </p>
                    
                    {/* Key Ingredients */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product?.keyIngredients?.map((ingredient) => (
                        <span
                          key={ingredient}
                          className="text-xs bg-muted text-text-secondary px-2 py-1 rounded-full"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-heading text-xl font-bold text-text-primary">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })?.format(product?.price)}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {product?.size}ml • {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })?.format(product?.pricePerMl)}/ml
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products?.map((product) => (
        <ProductCard
          key={product?.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;