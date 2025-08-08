import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import useAdminProducts from '../../hooks/useAdminProducts';
import useGlobalTimestamp from '../../hooks/useGlobalTimestamp';
import SyncStatus from '../../components/SyncStatus';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('products');
  const { products, addProduct, updateProduct, deleteProduct } = useAdminProducts();
  const { forceGlobalUpdate, currentTimestamp } = useGlobalTimestamp();
  const [siteSettings, setSiteSettings] = useState({
    siteName: 'M&E Fracionados',
    heroTitle: 'M&E Fracionados',
    heroSubtitle: 'Seu hub completo sobre produtos fracionados e cuidados personalizados.',
    contactWhatsApp: '(11) 99999-9999',
    contactEmail: 'contato@mefracionados.com.br',
    contactHours: 'Seg-Sex 9h às 18h'
  });

  // Verificar autenticação ao carregar
  useEffect(() => {
    const authStatus = localStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    // Carregar configurações do localStorage
    const savedSettings = localStorage.getItem('admin_settings');
    if (savedSettings) {
      setSiteSettings(JSON.parse(savedSettings));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Login simples - em produção seria mais seguro
    if (loginForm.username === 'admin' && loginForm.password === 'mc2024') {
      localStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      loadData();
    } else {
      alert('Usuário ou senha incorretos!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    navigate('/');
  };

  const saveSettings = (newSettings) => {
    localStorage.setItem('admin_settings', JSON.stringify(newSettings));
    setSiteSettings(newSettings);
  };

  // Tela de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-card p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                Painel Administrativo
              </h1>
              <p className="text-text-secondary">
                Faça login para gerenciar o site
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Usuário
                </label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <Button type="submit" variant="default" className="w-full">
                Entrar
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Voltar ao Site
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Painel principal
  return (
    <div className="min-h-screen bg-background">
      {/* Header do Admin */}
      <header className="bg-white shadow-sm border-b border-border">
        <div className="container-fluid">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-text-primary">
                Painel Administrativo
              </h1>
              <SyncStatus />
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                iconName="ExternalLink"
                iconPosition="left"
              >
                Ver Site
              </Button>

              <Button
                variant="secondary"
                onClick={forceGlobalUpdate}
                iconName="RefreshCw"
                iconPosition="left"
                title="Forçar atualização em todos os dispositivos"
              >
                Atualizar Global
              </Button>

              <Button
                variant="outline"
                onClick={handleLogout}
                iconName="LogOut"
                iconPosition="left"
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-fluid py-8">
        <div className="flex gap-8">
          {/* Sidebar de navegação */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'products' 
                    ? 'bg-primary text-white' 
                    : 'text-text-secondary hover:bg-gray-100'
                }`}
              >
                <Icon name="Package" size={20} className="inline mr-3" />
                Produtos
              </button>
              
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'settings' 
                    ? 'bg-primary text-white' 
                    : 'text-text-secondary hover:bg-gray-100'
                }`}
              >
                <Icon name="Settings" size={20} className="inline mr-3" />
                Configurações
              </button>
            </nav>
          </div>

          {/* Conteúdo principal */}
          <div className="flex-1">
            {activeTab === 'products' && (
              <ProductsManager
                products={products}
                onAdd={addProduct}
                onUpdate={updateProduct}
                onDelete={deleteProduct}
              />
            )}
            
            {activeTab === 'settings' && (
              <SettingsManager 
                settings={siteSettings} 
                onSave={saveSettings} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para gerenciar produtos
const ProductsManager = ({ products, onAdd, onUpdate, onDelete }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-text-primary">
          Gerenciar Produtos ({products?.length || 0})
        </h2>

        <Button
          variant="default"
          onClick={() => setShowAddForm(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Adicionar Produto
        </Button>
      </div>

      {showAddForm && (
        <ProductForm
          onSave={(product) => {
            if (typeof onAdd === 'function') {
              onAdd(product);
              setShowAddForm(false);
            } else {
              console.error('onAdd não é uma função:', onAdd);
              alert('Erro ao adicionar produto. Tente recarregar a página.');
            }
          }}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onSave={(product) => {
            if (typeof onUpdate === 'function') {
              onUpdate(editingProduct.id, product);
              setEditingProduct(null);
            } else {
              console.error('onUpdate não é uma função:', onUpdate);
              alert('Erro ao atualizar produto. Tente recarregar a página.');
            }
          }}
          onCancel={() => setEditingProduct(null)}
        />
      )}

      <div className="space-y-4">
        {(products || []).map((product) => (
          <div key={product.id} className="border border-border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-medium text-text-primary">{product.name}</h3>
                <p className="text-sm text-text-secondary">{product.brand}</p>
                <p className="text-sm text-primary font-medium">
                  R$ {product.price?.toFixed(2)} ({product.size}ml)
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingProduct(product)}
                iconName="Edit"
              >
                Editar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (confirm('Tem certeza que deseja excluir este produto?')) {
                    if (typeof onDelete === 'function') {
                      onDelete(product.id);
                    } else {
                      console.error('onDelete não é uma função:', onDelete);
                      alert('Erro ao excluir produto. Tente recarregar a página.');
                    }
                  }
                }}
                iconName="Trash2"
                className="text-red-600 hover:text-red-700"
              >
                Excluir
              </Button>
            </div>
          </div>
        ))}

        {(!products || products.length === 0) && (
          <div className="text-center py-8 text-text-secondary">
            <Icon name="Package" size={48} className="mx-auto mb-4 opacity-50" />
            <p>Nenhum produto cadastrado</p>
            <p className="text-sm mt-2">
              Clique em "Adicionar Produto" para começar!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente para gerenciar configurações
const SettingsManager = ({ settings, onSave }) => {
  const [formData, setFormData] = useState(settings);
  const { currentTimestamp, forceGlobalUpdate } = useGlobalTimestamp();

  const handleSave = () => {
    onSave(formData);
    alert('Configurações salvas com sucesso! Todos os dispositivos serão notificados.');
  };

  const handleSaveAndUpdate = () => {
    onSave(formData);
    forceGlobalUpdate();
  };

  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <h2 className="text-xl font-bold text-text-primary mb-6">
        Configurações do Site
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Nome do Site
          </label>
          <input
            type="text"
            value={formData.siteName}
            onChange={(e) => setFormData(prev => ({ ...prev, siteName: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Título Principal (Hero)
          </label>
          <input
            type="text"
            value={formData.heroTitle}
            onChange={(e) => setFormData(prev => ({ ...prev, heroTitle: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Subtítulo (Hero)
          </label>
          <textarea
            value={formData.heroSubtitle}
            onChange={(e) => setFormData(prev => ({ ...prev, heroSubtitle: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              WhatsApp
            </label>
            <input
              type="text"
              value={formData.contactWhatsApp}
              onChange={(e) => setFormData(prev => ({ ...prev, contactWhatsApp: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Horário de Atendimento
          </label>
          <input
            type="text"
            value={formData.contactHours}
            onChange={(e) => setFormData(prev => ({ ...prev, contactHours: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Informações de Timestamp */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-text-primary mb-2">
            Informações de Sincronização
          </h4>
          <div className="text-sm text-text-secondary space-y-1">
            <p>Timestamp atual: {new Date(currentTimestamp).toLocaleString('pt-BR')}</p>
            <p>Todas as alterações são sincronizadas automaticamente em tempo real</p>
          </div>
        </div>

        <div className="pt-4 flex space-x-3">
          <Button
            variant="default"
            onClick={handleSave}
            iconName="Save"
            iconPosition="left"
          >
            Salvar Configurações
          </Button>

          <Button
            variant="secondary"
            onClick={handleSaveAndUpdate}
            iconName="RefreshCw"
            iconPosition="left"
            title="Salvar e forçar atualização imediata em todos os dispositivos"
          >
            Salvar e Atualizar Global
          </Button>
        </div>
      </div>
    </div>
  );
};

// Biblioteca de imagens pré-definidas
const imageLibrary = [
  {
    id: 1,
    name: "Sérum Vitamina C",
    url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop&crop=center&auto=format&q=80&bg=1a1a1a"
  },
  {
    id: 2,
    name: "Hidratante Facial",
    url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop&crop=center&auto=format&q=80&bg=2a2a2a"
  },
  {
    id: 3,
    name: "Protetor Solar",
    url: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop&crop=center&auto=format&q=80&bg=1f1f1f"
  },
  {
    id: 4,
    name: "Sérum Anti-idade",
    url: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop&crop=center&auto=format&q=80&bg=252525"
  },
  {
    id: 5,
    name: "Limpador Facial",
    url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop&crop=center&auto=format&q=80&bg=1e1e1e"
  },
  {
    id: 6,
    name: "Tônico Facial",
    url: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop&crop=center&auto=format&q=80&bg=2b2b2b"
  },
  {
    id: 7,
    name: "Creme para Olhos",
    url: "https://images.unsplash.com/photo-1585652757141-4d3ffd4c2b42?w=400&h=400&fit=crop&crop=center&auto=format&q=80&bg=1c1c1c"
  },
  {
    id: 8,
    name: "Máscara Facial",
    url: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop&crop=center&auto=format&q=80&bg=222222"
  },
  {
    id: 9,
    name: "Óleo Facial",
    url: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=400&fit=crop&crop=center&auto=format&q=80&bg=1a1a1a"
  },
  {
    id: 10,
    name: "Esfoliante",
    url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&crop=center&auto=format&q=80&bg=2a2a2a"
  },
  {
    id: 11,
    name: "Base Facial",
    url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop&crop=center&auto=format&q=80&bg=1f1f1f"
  },
  {
    id: 12,
    name: "Primer",
    url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&crop=center&auto=format&q=80&bg=252525"
  },
  {
    id: 13,
    name: "Batom",
    url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop&crop=center&auto=format&q=80&bg=1e1e1e"
  },
  {
    id: 14,
    name: "Blush",
    url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop&crop=center&auto=format&q=80&bg=2b2b2b"
  },
  {
    id: 15,
    name: "Rímel",
    url: "https://images.unsplash.com/photo-1631214540242-5ce2c0b8b0b5?w=400&h=400&fit=crop&crop=center&auto=format&q=80&bg=1c1c1c"
  },
  {
    id: 16,
    name: "Perfume",
    url: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&crop=center&auto=format&q=80&bg=222222"
  },
  {
    id: 17,
    name: "Shampoo",
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center&auto=format&q=80&bg=1a1a1a"
  },
  {
    id: 18,
    name: "Condicionador",
    url: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center&auto=format&q=80&bg=2a2a2a"
  }
];

// Componente para formulário de produto
const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    brand: product?.brand || '',
    image: product?.image || '',
    price: product?.price || '',
    originalPrice: product?.originalPrice || '',
    size: product?.size || '',
    originalSize: product?.originalSize || '',
    rating: product?.rating || 4.5,
    reviewCount: product?.reviewCount || 0,
    keyIngredients: product?.keyIngredients?.join(', ') || '',
    shortDescription: product?.shortDescription || '',
    estimatedDays: product?.estimatedDays || 30,
    isNew: product?.isNew || false,
    isRecommended: product?.isRecommended || false,
    skinTypes: product?.skinTypes?.join(', ') || '',
    concerns: product?.concerns?.join(', ') || ''
  });

  const [showImageLibrary, setShowImageLibrary] = useState(false);
  const [imageSource, setImageSource] = useState('library'); // 'library', 'upload' ou 'url'

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, image: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice),
      size: parseInt(formData.size),
      originalSize: parseInt(formData.originalSize),
      rating: parseFloat(formData.rating),
      reviewCount: parseInt(formData.reviewCount),
      estimatedDays: parseInt(formData.estimatedDays),
      keyIngredients: formData.keyIngredients.split(',').map(s => s.trim()).filter(s => s),
      skinTypes: formData.skinTypes.split(',').map(s => s.trim()).filter(s => s),
      concerns: formData.concerns.split(',').map(s => s.trim()).filter(s => s)
    };

    onSave(productData);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-bold text-text-primary mb-4">
        {product ? 'Editar Produto' : 'Adicionar Novo Produto'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Nome do Produto *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Marca *
            </label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Imagem do Produto *
            </label>

            {/* Seletor de fonte da imagem */}
            <div className="flex flex-wrap gap-4 mb-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="imageSource"
                  value="library"
                  checked={imageSource === 'library'}
                  onChange={(e) => setImageSource(e.target.value)}
                  className="mr-2"
                />
                Biblioteca
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="imageSource"
                  value="upload"
                  checked={imageSource === 'upload'}
                  onChange={(e) => setImageSource(e.target.value)}
                  className="mr-2"
                />
                Galeria do Celular
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="imageSource"
                  value="url"
                  checked={imageSource === 'url'}
                  onChange={(e) => setImageSource(e.target.value)}
                  className="mr-2"
                />
                URL Personalizada
              </label>
            </div>

            {imageSource === 'library' ? (
              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowImageLibrary(!showImageLibrary)}
                  iconName="Image"
                  iconPosition="left"
                  className="mb-3"
                >
                  {formData.image ? 'Trocar Imagem' : 'Selecionar da Biblioteca'}
                </Button>

                {formData.image && (
                  <div className="mb-3">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  </div>
                )}

                {showImageLibrary && (
                  <div className="border border-border rounded-lg p-4 bg-gray-50 max-h-60 overflow-y-auto">
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {imageLibrary.map((img) => (
                        <div
                          key={img.id}
                          className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
                            formData.image === img.url
                              ? 'border-primary ring-2 ring-primary/20'
                              : 'border-gray-200 hover:border-primary/50'
                          }`}
                          onClick={() => {
                            setFormData(prev => ({ ...prev, image: img.url }));
                            setShowImageLibrary(false);
                          }}
                        >
                          <img
                            src={img.url}
                            alt={img.name}
                            className="w-full h-16 object-cover"
                          />
                          <div className="p-1 text-xs text-center text-text-secondary bg-white">
                            {img.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : imageSource === 'upload' ? (
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('imageUpload').click()}
                    iconName="Upload"
                    iconPosition="left"
                  >
                    {formData.image ? 'Trocar Foto' : 'Escolher da Galeria'}
                  </Button>

                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {formData.image && (
                  <div className="mb-3">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  </div>
                )}

                <p className="text-xs text-text-secondary">
                  Selecione uma imagem da galeria do seu celular ou computador
                </p>
              </div>
            ) : (
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://exemplo.com/imagem.jpg"
                required
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Preço Fracionado (R$) *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Preço Original (R$) *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.originalPrice}
              onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Tamanho Fracionado (ml) *
            </label>
            <input
              type="number"
              value={formData.size}
              onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Descrição Curta *
          </label>
          <textarea
            value={formData.shortDescription}
            onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Ingredientes Principais (separados por vírgula)
          </label>
          <input
            type="text"
            value={formData.keyIngredients}
            onChange={(e) => setFormData(prev => ({ ...prev, keyIngredients: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ex: Vitamina C, Ácido Hialurônico"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isNew}
              onChange={(e) => setFormData(prev => ({ ...prev, isNew: e.target.checked }))}
              className="mr-2"
            />
            Produto Novo
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isRecommended}
              onChange={(e) => setFormData(prev => ({ ...prev, isRecommended: e.target.checked }))}
              className="mr-2"
            />
            Produto Recomendado
          </label>
        </div>

        <div className="flex items-center space-x-4 pt-4">
          <Button type="submit" variant="default">
            {product ? 'Atualizar' : 'Adicionar'} Produto
          </Button>

          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminPanel;