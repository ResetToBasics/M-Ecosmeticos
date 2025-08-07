import React, { useState, useEffect } from 'react';
import Icon from './AppIcon';
import Button from './ui/Button';
import useGlobalTimestamp from '../hooks/useGlobalTimestamp';

const UpdateNotification = () => {
  const {
    isUpdateAvailable,
    applyUpdate,
    dismissUpdate,
    lastUpdateCheck,
    isChecking
  } = useGlobalTimestamp();

  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (isUpdateAvailable) {
      setIsVisible(true);
      setIsMinimized(false);
    } else {
      setIsVisible(false);
    }
  }, [isUpdateAvailable]);

  const handleApplyUpdate = () => {
    setIsVisible(false);
    applyUpdate();
  };

  const handleDismiss = () => {
    setIsVisible(false);
    dismissUpdate();
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay para desktop */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 hidden md:block" />
      
      {/* Notificação */}
      <div className={`
        fixed z-50 transition-all duration-300 ease-in-out
        ${isMinimized 
          ? 'bottom-4 right-4 w-auto' 
          : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4 md:mx-0'
        }
      `}>
        <div className={`
          bg-white rounded-lg shadow-2xl border border-border overflow-hidden
          ${isMinimized ? 'p-3' : 'p-6'}
        `}>
          {isMinimized ? (
            // Versão minimizada
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-text-primary">
                Atualização disponível
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMinimize}
                iconName="Maximize2"
                className="p-1"
              />
            </div>
          ) : (
            // Versão completa
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="RefreshCw" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      Nova Atualização Disponível
                    </h3>
                    <p className="text-sm text-text-secondary">
                      Há mudanças no conteúdo do site
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMinimize}
                  iconName="Minimize2"
                  className="p-1"
                />
              </div>

              {/* Conteúdo */}
              <div className="mb-6">
                <div className="bg-primary/5 rounded-lg p-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Info" size={16} className="text-primary mt-0.5" />
                    <div className="text-sm">
                      <p className="text-text-primary font-medium mb-1">
                        O que há de novo?
                      </p>
                      <ul className="text-text-secondary space-y-1">
                        <li>• Produtos atualizados</li>
                        <li>• Configurações modificadas</li>
                        <li>• Melhorias no conteúdo</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>
                    Última verificação: {new Date(lastUpdateCheck).toLocaleTimeString('pt-BR')}
                  </span>
                  {isChecking && (
                    <div className="flex items-center space-x-1">
                      <Icon name="RefreshCw" size={12} className="animate-spin" />
                      <span>Verificando...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Ações */}
              <div className="flex space-x-3">
                <Button
                  variant="default"
                  onClick={handleApplyUpdate}
                  iconName="Download"
                  iconPosition="left"
                  className="flex-1"
                >
                  Atualizar Agora
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleDismiss}
                  className="px-4"
                >
                  Depois
                </Button>
              </div>

              {/* Nota */}
              <p className="text-xs text-text-secondary mt-3 text-center">
                A página será recarregada para aplicar as atualizações
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateNotification;
