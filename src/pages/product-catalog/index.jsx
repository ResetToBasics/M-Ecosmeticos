import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Logo from '../../components/ui/Logo';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchBar from './components/SearchBar';
import SortingControls from './components/SortingControls';
import ProductGrid from './components/ProductGrid';
import SizeCalculator from './components/SizeCalculator';
import useAdminSettings from '../../hooks/useAdminSettings';
import useAdminProducts from '../../hooks/useAdminProducts';

const ProductCatalog = () => {
  const navigate = useNavigate();
  const { settings } = useAdminSettings();
  const { products: mockProducts } = useAdminProducts();

  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const mockRecommendations = mockProducts?.filter(p => p?.isRecommended)?.slice(0, 3);

  const productsPerPage = 12;

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);





  const filteredProducts = mockProducts?.filter(product => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      const matchesSearch =
        product?.name?.toLowerCase()?.includes(query) ||
        product?.brand?.toLowerCase()?.includes(query) ||
        product?.keyIngredients?.some(ingredient =>
          ingredient?.toLowerCase()?.includes(query)
        ) ||
        product?.shortDescription?.toLowerCase()?.includes(query);

      if (!matchesSearch) return false;
    }

    return true;
  });

  const sortedProducts = [...filteredProducts]?.sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a?.price - b?.price;
      case 'price-high':
        return b?.price - a?.price;
      case 'rating':
        return b?.rating - a?.rating;
      case 'newest':
        return b?.isNew - a?.isNew;
      case 'popular':
        return b?.reviewCount - a?.reviewCount;
      case 'size-small':
        return a?.size - b?.size;
      case 'size-large':
        return b?.size - a?.size;
      default:
        return b?.isRecommended - a?.isRecommended;
    }
  });

  const totalProducts = sortedProducts?.length;
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = sortedProducts?.slice(startIndex, startIndex + productsPerPage);
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="pt-20 lg:pt-24">
        <div className="container-fluid">
          {/* Page Header */}
          <div className="py-8 border-b border-border">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Package" size={24} className="text-primary" />
              <h1 className="text-heading-2 text-text-primary">
                Catálogo Inteligente
              </h1>
            </div>
            <p className="text-body text-text-secondary max-w-3xl">
              Descubra produtos de beleza fracionados com tamanhos perfeitos para suas necessidades. 
              Compare preços por ml, encontre ingredientes específicos e escolha a quantidade ideal para testar ou usar regularmente.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="py-6">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>



          {/* Main Layout */}
          <div className="w-full">
            {/* Products Section */}
            <div className="w-full">
              {/* Sorting Controls */}
              <SortingControls
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                totalProducts={totalProducts}
                currentPage={currentPage}
                productsPerPage={productsPerPage}
              />

              {/* Products Grid */}
              <ProductGrid
                products={paginatedProducts}
                viewMode={viewMode}
                loading={loading}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 mt-12 mb-8">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ChevronLeft"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  >
                    Anterior
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {[...Array(Math.min(5, totalPages))]?.map((_, index) => {
                      const pageNum = currentPage <= 3 ? index + 1 : 
                                     currentPage >= totalPages - 2 ? totalPages - 4 + index :
                                     currentPage - 2 + index;
                      
                      if (pageNum < 1 || pageNum > totalPages) return null;
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className="w-10 h-10"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ChevronRight"
                    iconPosition="right"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  >
                    Próxima
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Size Calculator Modal */}
      <SizeCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40">
        <Button
          variant="default"
          size="icon"
          onClick={() => setIsCalculatorOpen(true)}
          className="w-14 h-14 rounded-full bg-accent hover:bg-accent/90 shadow-elevated hover:scale-110 transition-all duration-300"
          title="Calculadora de Tamanho"
        >
          <Icon name="Calculator" size={24} color="white" />
        </Button>
        
        <Button
          variant="default"
          size="icon"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 shadow-card hover:scale-110 transition-all duration-300"
          title="Voltar ao Topo"
        >
          <Icon name="ArrowUp" size={20} color="white" />
        </Button>
      </div>
      {/* Footer */}
      <footer className="text-white py-16" style={{ backgroundColor: 'rgba(103, 149, 180, 1)' }}>
        <div className="container-fluid">
          <div className="max-w-4xl mx-auto text-center">
            <Logo variant="footer" size="large" className="mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-semibold mb-4">Contato</h4>
                <div className="space-y-2 text-sm text-white/80">
                  <p>WhatsApp: {settings.contactWhatsApp}</p>
                  <p>Email: {settings.contactEmail}</p>
                  <p>Horário: {settings.contactHours}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Produtos</h4>
                <div className="space-y-2 text-sm">
                  <a href="/product-catalog" className="block text-white/80 hover:text-white transition-colors">
                    Catálogo Completo
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-white/20 pt-8">
              <p className="text-sm text-white/80">
                © {new Date().getFullYear()} {settings.siteName}. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductCatalog;