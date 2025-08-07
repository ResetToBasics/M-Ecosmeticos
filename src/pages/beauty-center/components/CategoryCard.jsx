import React from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CategoryCard = ({ category, onClick }) => {
  return (
    <div 
      onClick={() => onClick(category)}
      className="card-elegant hover-lift cursor-pointer group"
    >
      <div className="relative overflow-hidden rounded-t-lg h-48">
        <Image
          src={category?.image}
          alt={category?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4">
          <div className="w-10 h-10 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Icon name={category?.icon} size={20} color="white" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-heading-4 text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">
          {category?.title}
        </h3>
        <p className="text-body-sm text-text-secondary mb-4 line-clamp-2">
          {category?.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-primary font-medium">
            {category?.articleCount} artigos
          </span>
          <div className="flex items-center text-primary group-hover:translate-x-1 transition-transform duration-300">
            <span className="text-sm font-medium mr-1">Explorar</span>
            <Icon name="ArrowRight" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;