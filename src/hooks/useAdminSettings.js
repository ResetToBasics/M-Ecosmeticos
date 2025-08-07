import { useState, useEffect } from 'react';

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

  useEffect(() => {
    // Carregar configurações do localStorage
    const savedSettings = localStorage.getItem('admin_settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsedSettings });
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
        setSettings(defaultSettings);
      }
    }
  }, []);

  const updateSettings = (newSettings) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('admin_settings', JSON.stringify(updatedSettings));
  };

  return {
    settings,
    updateSettings
  };
};

export default useAdminSettings;
