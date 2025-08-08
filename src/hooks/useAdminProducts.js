import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Produtos padrão (mock data)
const defaultProducts = [
  {
    id: 1,
    name: "Sérum Vitamina C Concentrado",
    brand: "La Roche-Posay",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop&crop=center&auto=format&q=80&bg=1a1a1a",
    price: 45.90,
    originalPrice: 189.90,
    size: 15,
    originalSize: 30,
    pricePerMl: 3.06,
    rating: 4.8,
    reviewCount: 234,
    keyIngredients: ["Vitamina C", "Ácido Hialurônico"],
    shortDescription: "Sérum antioxidante que ilumina e protege a pele contra os radicais livres, proporcionando luminosidade natural.",
    estimatedDays: 30,
    isNew: true,
    isRecommended: false,
    skinTypes: ["normal", "seca", "mista"],
    concerns: ["manchas", "luminosidade"]
  },
  {
    id: 2,
    name: "Hidratante Facial Ácido Hialurônico",
    brand: "Vichy",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop&crop=center&auto=format&q=80&bg=2a2a2a",
    price: 32.50,
    originalPrice: 129.90,
    size: 25,
    originalSize: 50,
    pricePerMl: 1.30,
    rating: 4.6,
    reviewCount: 189,
    keyIngredients: ["Ácido Hialurônico", "Água Termal"],
    shortDescription: "Hidratante intensivo que repõe a umidade natural da pele, deixando-a macia e suave por 24 horas.",
    estimatedDays: 45,
    isNew: false,
    isRecommended: true,
    skinTypes: ["seca", "sensivel"],
    concerns: ["hidratacao", "ressecamento"]
  },
  {
    id: 3,
    name: "Protetor Solar Facial FPS 60",
    brand: "Eucerin",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop&crop=center&auto=format&q=80&bg=1f1f1f",
    price: 28.90,
    originalPrice: 89.90,
    size: 20,
    originalSize: 60,
    pricePerMl: 1.45,
    rating: 4.9,
    reviewCount: 312,
    keyIngredients: ["Filtros UV", "Antioxidantes"],
    shortDescription: "Proteção solar avançada com textura leve e não oleosa, ideal para uso diário no rosto.",
    estimatedDays: 25,
    isNew: false,
    isRecommended: true,
    skinTypes: ["oleosa", "mista", "normal"],
    concerns: ["protecao", "oleosidade"]
  },
  {
    id: 4,
    name: "Sérum Anti-idade Retinol",
    brand: "Avène",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop&crop=center&auto=format&q=80&bg=252525",
    price: 52.90,
    originalPrice: 219.90,
    size: 12,
    originalSize: 30,
    pricePerMl: 4.41,
    rating: 4.7,
    reviewCount: 156,
    keyIngredients: ["Retinol", "Vitamina E"],
    shortDescription: "Sérum anti-idade com retinol que reduz linhas finas e melhora a textura da pele.",
    estimatedDays: 20,
    isNew: false,
    isRecommended: true,
    skinTypes: ["normal", "mista"],
    concerns: ["rugas", "anti-idade"]
  }
];

export const useAdminProducts = () => {
  const [products, setProducts] = useState(defaultProducts);
  const [loading, setLoading] = useState(true);

  // Carregar produtos do Supabase
  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('data')
        .eq('id', 1)
        .single();

      if (error) {
        console.error('Erro ao carregar produtos:', error);
        // Se não encontrar, usar produtos padrão
        await saveProductsToSupabase(defaultProducts);
        setProducts(defaultProducts);
      } else {
        // Se encontrar dados válidos, usar eles
        const productsData = Array.isArray(data.data) && data.data.length > 0 
          ? data.data 
          : defaultProducts;
        setProducts(productsData);
      }
    } catch (error) {
      console.error('Erro ao conectar com Supabase:', error);
      setProducts(defaultProducts);
    } finally {
      setLoading(false);
    }
  };

  // Salvar produtos no Supabase
  const saveProductsToSupabase = async (newProducts) => {
    try {
      const { error } = await supabase
        .from('products')
        .upsert({ 
          id: 1, 
          data: newProducts,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Erro ao salvar produtos:', error);
        throw error;
      }
    } catch (error) {
      console.error('Erro ao salvar no Supabase:', error);
      throw error;
    }
  };

  const updateProducts = async (newProducts) => {
    try {
      setProducts(newProducts);
      await saveProductsToSupabase(newProducts);
    } catch (error) {
      console.error('Erro ao atualizar produtos:', error);
      // Em caso de erro, reverter o estado local
      loadProducts();
    }
  };

  const addProduct = async (product) => {
    const newProduct = {
      ...product,
      id: Date.now(), // ID simples baseado em timestamp
      pricePerMl: product.price / product.size,
      _createdAt: Date.now(),
      _updatedAt: Date.now()
    };
    const updatedProducts = [...products, newProduct];
    await updateProducts(updatedProducts);
  };

  const updateProduct = async (id, updatedProduct) => {
    const updatedProducts = products.map(product =>
      product.id === id
        ? {
            ...updatedProduct,
            pricePerMl: updatedProduct.price / updatedProduct.size,
            _updatedAt: Date.now(),
            _createdAt: product._createdAt || Date.now()
          }
        : product
    );
    await updateProducts(updatedProducts);
  };

  const deleteProduct = async (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    await updateProducts(updatedProducts);
  };

  useEffect(() => {
    loadProducts();

    // Escutar mudanças em tempo real
    const subscription = supabase
      .channel('products-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'products'
      }, (payload) => {
        console.log('Produtos atualizados em tempo real!', payload);
        if (payload.new && payload.new.data) {
          setProducts(payload.new.data);
        }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    updateProducts
  };
};

export default useAdminProducts;