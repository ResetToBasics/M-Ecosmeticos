import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ArticleCard = ({ article, onRead }) => {
  const formatReadTime = (minutes) => {
    return `${minutes} min de leitura`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <article className="card-elegant hover-lift cursor-pointer group" onClick={() => onRead(article)}>
      <div className="relative overflow-hidden rounded-t-lg h-48">
        <Image
          src={article?.image}
          alt={article?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {article?.isNew && (
          <div className="absolute top-4 left-4">
            <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
              Novo
            </span>
          </div>
        )}
        {article?.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Icon name="Play" size={24} color="white" />
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-3">
          <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
            {article?.category}
          </span>
          <span className="text-xs text-text-secondary">
            {formatDate(article?.publishDate)}
          </span>
        </div>
        
        <h3 className="text-heading-4 text-text-primary mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {article?.title}
        </h3>
        
        <p className="text-body-sm text-text-secondary mb-4 line-clamp-3">
          {article?.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} className="text-text-secondary" />
              <span className="text-xs text-text-secondary">
                {formatReadTime(article?.readTime)}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={14} className="text-text-secondary" />
              <span className="text-xs text-text-secondary">
                {article?.views}
              </span>
            </div>
          </div>
          
          <div className="flex items-center text-primary group-hover:translate-x-1 transition-transform duration-300">
            <span className="text-sm font-medium mr-1">
              {article?.type === 'video' ? 'Assistir' : 'Ler'}
            </span>
            <Icon name="ArrowRight" size={16} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;