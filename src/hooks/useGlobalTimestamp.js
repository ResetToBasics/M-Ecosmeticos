import { useState, useEffect, useCallback } from 'react';

// Configurações do sistema de timestamp
const TIMESTAMP_CONFIG = {
  CHECK_INTERVAL: 30000, // Verificar a cada 30 segundos
  STORAGE_KEY: 'global_timestamp',
  LAST_CHECK_KEY: 'last_timestamp_check',
  VERSION_KEY: 'app_version',
  FORCE_UPDATE_KEY: 'force_update_timestamp'
};

// Timestamp inicial (será atualizado quando houver mudanças no admin)
const INITIAL_TIMESTAMP = Date.now();

export const useGlobalTimestamp = () => {
  const [currentTimestamp, setCurrentTimestamp] = useState(INITIAL_TIMESTAMP);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [lastUpdateCheck, setLastUpdateCheck] = useState(Date.now());
  const [isChecking, setIsChecking] = useState(false);

  // Função para obter o timestamp atual do localStorage
  const getCurrentStoredTimestamp = useCallback(() => {
    try {
      const stored = localStorage.getItem(TIMESTAMP_CONFIG.STORAGE_KEY);
      return stored ? parseInt(stored, 10) : INITIAL_TIMESTAMP;
    } catch (error) {
      console.warn('Erro ao ler timestamp:', error);
      return INITIAL_TIMESTAMP;
    }
  }, []);

  // Função para atualizar o timestamp global
  const updateGlobalTimestamp = useCallback((newTimestamp = Date.now()) => {
    try {
      localStorage.setItem(TIMESTAMP_CONFIG.STORAGE_KEY, newTimestamp.toString());
      localStorage.setItem(TIMESTAMP_CONFIG.LAST_CHECK_KEY, Date.now().toString());
      setCurrentTimestamp(newTimestamp);
      setLastUpdateCheck(Date.now());
      
      // Disparar evento customizado para notificar outras abas/componentes
      window.dispatchEvent(new CustomEvent('globalTimestampUpdate', {
        detail: { timestamp: newTimestamp }
      }));
      
      return newTimestamp;
    } catch (error) {
      console.error('Erro ao atualizar timestamp:', error);
      return currentTimestamp;
    }
  }, [currentTimestamp]);

  // Função para forçar atualização em todos os dispositivos
  const forceGlobalUpdate = useCallback(() => {
    const forceTimestamp = Date.now();
    localStorage.setItem(TIMESTAMP_CONFIG.FORCE_UPDATE_KEY, forceTimestamp.toString());
    updateGlobalTimestamp(forceTimestamp);
    
    // Recarregar a página após um pequeno delay para garantir que os dados sejam salvos
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }, [updateGlobalTimestamp]);

  // Função para verificar se há atualizações disponíveis
  const checkForUpdates = useCallback(async () => {
    if (isChecking) return;
    
    setIsChecking(true);
    
    try {
      const storedTimestamp = getCurrentStoredTimestamp();
      const forceUpdateTimestamp = localStorage.getItem(TIMESTAMP_CONFIG.FORCE_UPDATE_KEY);
      
      // Verificar se há uma atualização forçada
      if (forceUpdateTimestamp) {
        const forceTime = parseInt(forceUpdateTimestamp, 10);
        if (forceTime > currentTimestamp) {
          setIsUpdateAvailable(true);
          setCurrentTimestamp(forceTime);
          return true;
        }
      }
      
      // Verificar timestamp normal
      if (storedTimestamp > currentTimestamp) {
        setIsUpdateAvailable(true);
        setCurrentTimestamp(storedTimestamp);
        return true;
      }
      
      setLastUpdateCheck(Date.now());
      return false;
    } catch (error) {
      console.error('Erro ao verificar atualizações:', error);
      return false;
    } finally {
      setIsChecking(false);
    }
  }, [currentTimestamp, getCurrentStoredTimestamp, isChecking]);

  // Função para aplicar atualização
  const applyUpdate = useCallback(() => {
    setIsUpdateAvailable(false);
    
    // Limpar caches do localStorage relacionados aos dados do app
    const keysToUpdate = [
      'admin_products',
      'admin_settings',
      'product_cache',
      'settings_cache'
    ];
    
    keysToUpdate.forEach(key => {
      const data = localStorage.getItem(key);
      if (data) {
        try {
          const parsed = JSON.parse(data);
          parsed._timestamp = currentTimestamp;
          localStorage.setItem(key, JSON.stringify(parsed));
        } catch (error) {
          console.warn(`Erro ao atualizar cache ${key}:`, error);
        }
      }
    });
    
    // Recarregar a página para aplicar todas as mudanças
    window.location.reload();
  }, [currentTimestamp]);

  // Função para descartar atualização
  const dismissUpdate = useCallback(() => {
    setIsUpdateAvailable(false);
    updateGlobalTimestamp(currentTimestamp);
  }, [currentTimestamp, updateGlobalTimestamp]);

  // Inicialização e verificação periódica
  useEffect(() => {
    // Verificar timestamp inicial
    const storedTimestamp = getCurrentStoredTimestamp();
    if (storedTimestamp > currentTimestamp) {
      setCurrentTimestamp(storedTimestamp);
    }

    // Configurar verificação periódica
    const interval = setInterval(checkForUpdates, TIMESTAMP_CONFIG.CHECK_INTERVAL);

    // Listener para mudanças no localStorage (outras abas)
    const handleStorageChange = (e) => {
      if (e.key === TIMESTAMP_CONFIG.STORAGE_KEY || e.key === TIMESTAMP_CONFIG.FORCE_UPDATE_KEY) {
        checkForUpdates();
      }
    };

    // Listener para evento customizado
    const handleGlobalUpdate = (e) => {
      const { timestamp } = e.detail;
      if (timestamp > currentTimestamp) {
        setCurrentTimestamp(timestamp);
        setIsUpdateAvailable(true);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('globalTimestampUpdate', handleGlobalUpdate);

    // Verificação inicial
    checkForUpdates();

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('globalTimestampUpdate', handleGlobalUpdate);
    };
  }, [checkForUpdates, currentTimestamp, getCurrentStoredTimestamp]);

  return {
    currentTimestamp,
    isUpdateAvailable,
    lastUpdateCheck,
    isChecking,
    updateGlobalTimestamp,
    forceGlobalUpdate,
    checkForUpdates,
    applyUpdate,
    dismissUpdate
  };
};

export default useGlobalTimestamp;
