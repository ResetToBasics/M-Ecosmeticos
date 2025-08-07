import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const popularSearches = [
    'Vitamina C',
    'Ácido Hialurônico',
    'Protetor Solar',
    'Hidratante Facial',
    'Sérum Anti-idade',
    'Limpeza Facial',
    'Retinol',
    'Niacinamida',
    'Esfoliante',
    'Água Micelar'
  ];

  const beautyTerms = [
    'acne', 'manchas', 'rugas', 'hidratação', 'oleosidade', 'poros',
    'anti-idade', 'clareamento', 'firmeza', 'luminosidade', 'renovação',
    'proteção', 'limpeza', 'tonificação', 'nutrição', 'reparação'
  ];

  const ingredientTerms = [
    'ácido hialurônico', 'vitamina c', 'retinol', 'niacinamida',
    'ácido salicílico', 'ácido glicólico', 'peptídeos', 'colágeno',
    'ceramidas', 'antioxidantes', 'ácido lático', 'bakuchiol'
  ];

  useEffect(() => {
    if (searchQuery?.length > 0) {
      const allTerms = [...popularSearches, ...beautyTerms, ...ingredientTerms];
      const filtered = allTerms?.filter(term => 
          term?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        )?.slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions(popularSearches?.slice(0, 6));
      setShowSuggestions(isFocused);
    }
  }, [searchQuery, isFocused]);

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
    inputRef?.current?.blur();
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Escape') {
      setShowSuggestions(false);
      inputRef?.current?.blur();
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-3">
        {/* Search Input Container */}
        <div className="relative flex-1">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <Input
              ref={inputRef}
              type="search"
              placeholder="Busque por produto, marca ou ingrediente..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              onKeyDown={handleKeyDown}
              className="pl-12 pr-12 h-12 bg-background border-border focus:border-primary focus:ring-primary/20"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
              >
                <Icon name="X" size={18} />
              </button>
            )}
          </div>

          {/* Search Suggestions */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-card z-50 max-h-80 overflow-y-auto">
              <div className="p-4">
                <h4 className="text-sm font-medium text-text-primary mb-3">
                  {searchQuery ? 'Sugestões' : 'Buscas Populares'}
                </h4>
                <div className="space-y-2">
                  {suggestions?.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-muted transition-colors text-left"
                    >
                      <Icon 
                        name={searchQuery ? "Search" : "TrendingUp"} 
                        size={16} 
                        className="text-text-secondary" 
                      />
                      <span className="text-sm text-text-primary">
                        {suggestion}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {!searchQuery && (
                <div className="border-t border-border p-4">
                  <h5 className="text-xs font-medium text-text-secondary mb-2 uppercase tracking-wide">
                    Categorias Rápidas
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {['Limpeza', 'Hidratação', 'Anti-idade', 'Proteção']?.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleSuggestionClick(category)}
                        className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Advanced Search Button */}
        <button className="hidden md:flex items-center space-x-2 px-4 py-3 bg-background border border-border rounded-lg hover:bg-muted transition-colors">
          <Icon name="Settings" size={18} className="text-text-secondary" />
          <span className="text-sm text-text-primary">Busca Avançada</span>
        </button>
      </div>
      {/* Search Tips */}
      {isFocused && !searchQuery && (
        <div className="mt-3 p-3 bg-muted rounded-lg">
          <p className="text-xs text-text-secondary">
            💡 <strong>Dica:</strong> Busque por ingredientes como "vitamina c" ou preocupações como "acne" para resultados mais precisos.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;