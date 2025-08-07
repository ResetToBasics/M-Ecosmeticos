import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortingControls = ({ 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange, 
  totalProducts, 
  currentPage, 
  productsPerPage 
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Mais Relevantes', icon: 'Star' },
    { value: 'price-low', label: 'Menor Preço', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Maior Preço', icon: 'ArrowDown' },
    { value: 'rating', label: 'Melhor Avaliados', icon: 'Heart' },
    { value: 'newest', label: 'Mais Recentes', icon: 'Clock' },
    { value: 'popular', label: 'Mais Populares', icon: 'TrendingUp' },
    { value: 'size-small', label: 'Menor Tamanho', icon: 'Minimize' },
    { value: 'size-large', label: 'Maior Tamanho', icon: 'Maximize' }
  ];

  const getCurrentSortLabel = () => {
    const option = sortOptions?.find(opt => opt?.value === sortBy);
    return option ? option?.label : 'Ordenar';
  };

  const getResultsText = () => {
    const start = (currentPage - 1) * productsPerPage + 1;
    const end = Math.min(currentPage * productsPerPage, totalProducts);
    return `${start}-${end} de ${totalProducts} produtos`;
  };

  return (
    <div className="flex items-center justify-between bg-background border border-border rounded-lg p-4 mb-6">
      {/* Results Count */}
      <div className="flex items-center space-x-3">
        <Icon name="Package" size={18} className="text-primary" />
        <span className="text-sm font-medium text-text-primary">
          {getResultsText()}
        </span>
      </div>
      {/* Controls */}
      <div className="flex items-center space-x-4">
        {/* Sort Dropdown */}
        <div className="relative group">
          <Button
            variant="outline"
            iconName="ArrowUpDown"
            iconPosition="left"
            className="text-sm"
          >
            <span className="hidden sm:inline">{getCurrentSortLabel()}</span>
            <span className="sm:hidden">Ordenar</span>
          </Button>
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-56 bg-background border border-border rounded-lg shadow-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="p-2">
              {sortOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => onSortChange(option?.value)}
                  className={`flex items-center space-x-3 w-full p-3 rounded-lg text-left transition-colors ${
                    sortBy === option?.value
                      ? 'bg-primary/10 text-primary' :'hover:bg-muted text-text-primary'
                  }`}
                >
                  <Icon 
                    name={option?.icon} 
                    size={16} 
                    className={sortBy === option?.value ? 'text-primary' : 'text-text-secondary'} 
                  />
                  <span className="text-sm font-medium">{option?.label}</span>
                  {sortBy === option?.value && (
                    <Icon name="Check" size={14} className="text-primary ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="hidden md:flex items-center bg-muted rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid' ?'bg-background text-primary shadow-subtle' :'text-text-secondary hover:text-text-primary'
            }`}
            title="Visualização em Grade"
          >
            <Icon name="Grid3X3" size={18} />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list' ?'bg-background text-primary shadow-subtle' :'text-text-secondary hover:text-text-primary'
            }`}
            title="Visualização em Lista"
          >
            <Icon name="List" size={18} />
          </button>
        </div>

        {/* Size Calculator Button */}
        <Button
          variant="ghost"
          size="sm"
          iconName="Calculator"
          iconPosition="left"
          className="hidden lg:flex text-accent hover:text-accent hover:bg-accent/10"
        >
          Calculadora
        </Button>
      </div>
    </div>
  );
};

export default SortingControls;