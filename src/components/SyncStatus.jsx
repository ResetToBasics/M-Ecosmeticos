import React, { useState, useEffect } from 'react';
import Icon from './AppIcon';
import useGlobalTimestamp from '../hooks/useGlobalTimestamp';

const SyncStatus = ({ className = '' }) => {
  const {
    currentTimestamp,
    lastUpdateCheck,
    isChecking,
    isUpdateAvailable
  } = useGlobalTimestamp();

  const [isVisible, setIsVisible] = useState(false);
  const [syncStatus, setSyncStatus] = useState('synced');

  useEffect(() => {
    if (isUpdateAvailable) {
      setSyncStatus('update-available');
    } else if (isChecking) {
      setSyncStatus('checking');
    } else {
      setSyncStatus('synced');
    }
  }, [isUpdateAvailable, isChecking]);

  const getStatusConfig = () => {
    switch (syncStatus) {
      case 'update-available':
        return {
          icon: 'AlertCircle',
          color: 'text-orange-500',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          text: 'Atualização disponível',
          pulse: true
        };
      case 'checking':
        return {
          icon: 'RefreshCw',
          color: 'text-blue-500',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          text: 'Verificando...',
          spin: true
        };
      default:
        return {
          icon: 'CheckCircle',
          color: 'text-green-500',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          text: 'Sincronizado',
          pulse: false
        };
    }
  };

  const config = getStatusConfig();
  const timeSinceLastCheck = Math.floor((Date.now() - lastUpdateCheck) / 1000);

  return (
    <div 
      className={`
        inline-flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200
        ${config.bgColor} ${config.borderColor} ${className}
      `}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <Icon 
        name={config.icon} 
        size={16} 
        className={`
          ${config.color} 
          ${config.spin ? 'animate-spin' : ''} 
          ${config.pulse ? 'animate-pulse' : ''}
        `} 
      />
      
      <span className={`text-sm font-medium ${config.color}`}>
        {config.text}
      </span>

      {/* Tooltip com informações detalhadas */}
      {isVisible && (
        <div className="absolute z-50 bottom-full left-0 mb-2 w-64 p-3 bg-white rounded-lg shadow-lg border border-border">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-text-secondary">Status:</span>
              <span className={`font-medium ${config.color}`}>{config.text}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-text-secondary">Última verificação:</span>
              <span className="text-text-primary">
                {timeSinceLastCheck < 60 
                  ? `${timeSinceLastCheck}s atrás`
                  : `${Math.floor(timeSinceLastCheck / 60)}min atrás`
                }
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-text-secondary">Timestamp:</span>
              <span className="text-text-primary">
                {new Date(currentTimestamp).toLocaleTimeString('pt-BR')}
              </span>
            </div>

            {isUpdateAvailable && (
              <div className="pt-2 border-t border-border">
                <p className="text-orange-600 font-medium">
                  Nova versão disponível! Clique na notificação para atualizar.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SyncStatus;
