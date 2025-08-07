import { useState, useEffect } from 'react';

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

  useEffect(() => {
    // Carregar produtos do localStorage
    const savedProducts = localStorage.getItem('admin_products');
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts);
        setProducts(parsedProducts);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        setProducts(defaultProducts);
      }
    }
  }, []);

  const updateProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem('admin_products', JSON.stringify(newProducts));
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(), // ID simples baseado em timestamp
      pricePerMl: product.price / product.size
    };
    const updatedProducts = [...products, newProduct];
    updateProducts(updatedProducts);
  };

  const updateProduct = (id, updatedProduct) => {
    const updatedProducts = products.map(product => 
      product.id === id 
        ? { ...updatedProduct, pricePerMl: updatedProduct.price / updatedProduct.size }
        : product
    );
    updateProducts(updatedProducts);
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    updateProducts(updatedProducts);
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateProducts
  };
};

export default useAdminProducts;
