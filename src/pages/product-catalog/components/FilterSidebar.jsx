import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters, isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    skinType: true,
    concern: true,
    brand: false,
    size: true,
    price: false,
    ingredients: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleFilterChange = (category, value) => {
    const currentValues = filters?.[category] || [];
    const newValues = currentValues?.includes(value)
      ? currentValues?.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange(category, newValues);
  };

  const filterSections = [
    {
      id: 'skinType',
      title: 'Tipo de Pele',
      icon: 'User',
      options: [
        { value: 'oleosa', label: 'Oleosa', count: 45 },
        { value: 'seca', label: 'Seca', count: 38 },
        { value: 'mista', label: 'Mista', count: 52 },
        { value: 'sensivel', label: 'Sensível', count: 29 },
        { value: 'normal', label: 'Normal', count: 41 }
      ]
    },
    {
      id: 'concern',
      title: 'Preocupação',
      icon: 'Target',
      options: [
        { value: 'acne', label: 'Acne', count: 34 },
        { value: 'manchas', label: 'Manchas', count: 28 },
        { value: 'rugas', label: 'Rugas', count: 42 },
        { value: 'hidratacao', label: 'Hidratação', count: 56 },
        { value: 'oleosidade', label: 'Oleosidade', count: 31 },
        { value: 'poros', label: 'Poros Dilatados', count: 25 }
      ]
    },
    {
      id: 'brand',
      title: 'Marca',
      icon: 'Award',
      options: [
        { value: 'vichy', label: 'Vichy', count: 18 },
        { value: 'laroche', label: 'La Roche-Posay', count: 22 },
        { value: 'avene', label: 'Avène', count: 15 },
        { value: 'eucerin', label: 'Eucerin', count: 20 },
        { value: 'cerave', label: 'CeraVe', count: 16 }
      ]
    },
    {
      id: 'size',
      title: 'Tamanho Fracionado',
      icon: 'Package',
      options: [
        { value: 'teste', label: 'Perfeito para Testar (5-15ml)', count: 89 },
        { value: 'viagem', label: 'Ideal para Viagem (15-30ml)', count: 67 },
        { value: 'uso-regular', label: 'Uso Regular (30-50ml)', count: 45 },
        { value: 'economico', label: 'Econômico (50ml+)', count: 23 }
      ]
    },
    {
      id: 'price',
      title: 'Faixa de Preço',
      icon: 'DollarSign',
      options: [
        { value: '0-25', label: 'R$ 0 - R$ 25', count: 34 },
        { value: '25-50', label: 'R$ 25 - R$ 50', count: 56 },
        { value: '50-100', label: 'R$ 50 - R$ 100', count: 42 },
        { value: '100+', label: 'R$ 100+', count: 18 }
      ]
    },
    {
      id: 'ingredients',
      title: 'Ingredientes Ativos',
      icon: 'Beaker',
      options: [
        { value: 'acido-hialuronico', label: 'Ácido Hialurônico', count: 28 },
        { value: 'vitamina-c', label: 'Vitamina C', count: 35 },
        { value: 'retinol', label: 'Retinol', count: 22 },
        { value: 'niacinamida', label: 'Niacinamida', count: 31 },
        { value: 'acido-salicilico', label: 'Ácido Salicílico', count: 19 },
        { value: 'peptideos', label: 'Peptídeos', count: 15 }
      ]
    }
  ];

  const activeFiltersCount = Object.values(filters)?.reduce((total, filterArray) => 
    total + (filterArray?.length || 0), 0
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-full lg:h-auto w-80 lg:w-full
        bg-background border-r border-border lg:border-r-0
        transform transition-transform duration-300 ease-elegant
        z-50 lg:z-auto lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-6 lg:p-0 lg:border-b-0 lg:mb-6">
          <div className="flex items-center justify-between lg:justify-start">
            <div className="flex items-center space-x-3">
              <Icon name="Filter" size={20} className="text-primary" />
              <h2 className="font-heading text-lg font-semibold text-text-primary">
                Filtros
              </h2>
              {activeFiltersCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            

          </div>
        </div>

        {/* Filter Sections */}
        <div className="p-6 lg:p-0 space-y-6">
          {filterSections?.map((section) => (
            <div key={section?.id} className="border-b border-border pb-6 last:border-b-0">
              <button
                onClick={() => toggleSection(section?.id)}
                className="flex items-center justify-between w-full mb-4 group"
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={section?.icon} 
                    size={18} 
                    className="text-primary group-hover:text-primary/80 transition-colors" 
                  />
                  <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors">
                    {section?.title}
                  </h3>
                </div>
                <Icon 
                  name={expandedSections?.[section?.id] ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-text-secondary group-hover:text-primary transition-colors" 
                />
              </button>

              <div className={`
                transition-all duration-300 ease-elegant overflow-hidden
                ${expandedSections?.[section?.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
              `}>
                <div className="space-y-3">
                  {section?.options?.map((option) => (
                    <div key={option?.value} className="flex items-center justify-between">
                      <Checkbox
                        label={option?.label}
                        checked={filters?.[section?.id]?.includes(option?.value) || false}
                        onChange={(e) => handleFilterChange(section?.id, option?.value)}
                        className="flex-1"
                      />
                      <span className="text-xs text-text-secondary ml-2">
                        {option?.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}


        </div>
      </div>
    </>
  );
};

export default FilterSidebar;