// src/hooks/useAdminSettings.js
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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
  const [loading, setLoading] = useState(true);

  // Carregar configurações do Supabase
  const loadSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('settings')
        .select('data')
        .eq('id', 1)
        .single();

      if (error) {
        console.error('Erro ao carregar configurações:', error);
        // Se não encontrar, usar configurações padrão
        await saveSettingsToSupabase(defaultSettings);
        setSettings(defaultSettings);
      } else {
        // Mesclar configurações padrão com as salvas
        const mergedSettings = { ...defaultSettings, ...data.data };
        setSettings(mergedSettings);
      }
    } catch (error) {
      console.error('Erro ao conectar com Supabase:', error);
      setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  };

  // Salvar configurações no Supabase
  const saveSettingsToSupabase = async (newSettings) => {
    try {
      const { error } = await supabase
        .from('settings')
        .upsert({ 
          id: 1, 
          data: newSettings,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Erro ao salvar configurações:', error);
        throw error;
      }
    } catch (error) {
      console.error('Erro ao salvar no Supabase:', error);
      throw error;
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      const updatedSettings = { ...settings, ...newSettings };
      setSettings(updatedSettings);
      await saveSettingsToSupabase(updatedSettings);
    } catch (error) {
      console.error('Erro ao atualizar configurações:', error);
      // Em caso de erro, reverter o estado local
      loadSettings();
    }
  };

  useEffect(() => {
    loadSettings();

    // Escutar mudanças em tempo real
    const subscription = supabase
      .channel('settings-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'settings'
      }, (payload) => {
        console.log('Configurações atualizadas em tempo real!', payload);
        if (payload.new && payload.new.data) {
          setSettings({ ...defaultSettings, ...payload.new.data });
        }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    settings,
    loading,
    updateSettings
  };
};

export default useAdminSettings;