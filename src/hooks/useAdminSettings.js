import { useState, useEffect } from 'react';
import useGlobalTimestamp from './useGlobalTimestamp';

// Configurações padrão
const defaultSettings = {
  siteName: 'M&E Fracionados',
  heroTitle: 'M&E Fracionados',
  heroSubtitle: 'Seu hub completo sobre produtos fracionados e cuidados personalizados.',
  contactWhatsApp: '(11) 99999-9999',
  contactEmail: 'contato@mefracionados.com.br',
  contactHours: 'Seg-Sex 9h às 18h'
};

export const useAdminSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const { updateGlobalTimestamp } = useGlobalTimestamp();

  useEffect(() => {
    // Carregar configurações do localStorage
    const savedSettings = localStorage.getItem('admin_settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        // Extrair dados se estiver no novo formato com timestamp
        const settingsData = parsedSettings.data || parsedSettings;
        setSettings({ ...defaultSettings, ...settingsData });
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
        setSettings(defaultSettings);
      }
    }
  }, []);

  const updateSettings = (newSettings) => {
    const updatedSettings = { ...settings, ...newSettings };
    const timestamp = Date.now();
    const settingsWithTimestamp = {
      data: updatedSettings,
      _timestamp: timestamp,
      _lastModified: timestamp
    };

    setSettings(updatedSettings);
    localStorage.setItem('admin_settings', JSON.stringify(settingsWithTimestamp));

    // Atualizar timestamp global para notificar outros dispositivos
    updateGlobalTimestamp(timestamp);
  };

  return {
    settings,
    updateSettings
  };
};

export default useAdminSettings;
