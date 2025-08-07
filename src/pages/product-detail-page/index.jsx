import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import ProductImageGallery from './components/ProductImageGallery';
import SizeSelector from './components/SizeSelector';
import ProductInfo from './components/ProductInfo';
import CustomerReviews from './components/CustomerReviews';
import WhatsAppOrderSection from './components/WhatsAppOrderSection';
import RelatedProducts from './components/RelatedProducts';
import SizeAdvisor from './components/SizeAdvisor';

const ProductDetailPage = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams?.get('id') || 'serum-vitamina-c';
  
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [isSticky, setIsSticky] = useState(false);

  // Mock product data
  const product = {
    id: 'serum-vitamina-c',
    name: 'Sérum Vitamina C Concentrado',
    category: 'Séruns Faciais',
    shortDescription: 'Sérum antioxidante com 20% de Vitamina C pura para iluminação e proteção da pele contra radicais livres.',
    description: `Nosso Sérum de Vitamina C Concentrado é formulado com 20% de ácido L-ascórbico puro, a forma mais potente e biodisponível da vitamina C. Esta fórmula avançada combina ingredientes ativos cientificamente comprovados para proporcionar uma pele mais luminosa, uniforme e protegida.

Desenvolvido especialmente para o clima brasileiro, nossa fórmula estabilizada garante máxima eficácia sem irritação, sendo adequada para todos os tipos de pele. O produto é livre de parabenos, sulfatos e fragrâncias artificiais, seguindo os mais altos padrões de qualidade e segurança.`,
    mainImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=800&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=800&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 247,
    ratingDistribution: {
      5: 189,
      4: 42,
      3: 12,
      2: 3,
      1: 1
    },
    isNew: true,
    sizes: [
      {
        id: '5ml',
        volume: 5,
        price: 29.90,
        originalPrice: 39.90,
        duration: '7-10 dias',
        description: 'Ideal para teste inicial',
        popular: false,
        bestValue: false
      },
      {
        id: '15ml',
        volume: 15,
        price: 79.90,
        originalPrice: 99.90,
        duration: '3-4 semanas',
        description: 'Perfeito para conhecer o produto',
        popular: true,
        bestValue: false
      },
      {
        id: '30ml',
        volume: 30,
        price: 139.90,
        originalPrice: 179.90,
        duration: '6-8 semanas',
        description: 'Melhor custo-benefício',
        popular: false,
        bestValue: true
      },
      {
        id: '50ml',
        volume: 50,
        price: 199.90,
        originalPrice: 259.90,
        duration: '10-12 semanas',
        description: 'Tamanho profissional',
        popular: false,
        bestValue: false
      }
    ],
    benefits: [
      'Ilumina e uniformiza o tom da pele',
      'Reduz manchas e sinais de idade',
      'Estimula a produção de colágeno',
      'Protege contra radicais livres',
      'Melhora a textura da pele',
      'Hidratação profunda'
    ],
    idealFor: [
      'Peles com manchas e hiperpigmentação',
      'Sinais de envelhecimento precoce',
      'Peles opacas e sem brilho',
      'Prevenção do fotoenvelhecimento',
      'Todos os tipos de pele'
    ],
    activeIngredients: [
      {
        name: 'Vitamina C (L-Ascórbico)',
        concentration: '20%',
        benefit: 'Antioxidante potente, estimula colágeno e clareia manchas'
      },
      {
        name: 'Vitamina E',
        concentration: '2%',
        benefit: 'Potencializa a ação da Vitamina C e protege contra oxidação'
      },
      {
        name: 'Ácido Ferúlico',
        concentration: '0.5%',
        benefit: 'Estabiliza a fórmula e aumenta a eficácia antioxidante'
      },
      {
        name: 'Ácido Hialurônico',
        concentration: '1%',
        benefit: 'Hidratação intensa e preenchimento de linhas finas'
      }
    ],
    fullIngredientsList: 'Aqua, L-Ascorbic Acid, Propylene Glycol, Tocopherol, Ferulic Acid, Sodium Hyaluronate, Glycerin, Phenoxyethanol, Ethylhexylglycerin, Disodium EDTA',
    expertTip: 'Para melhores resultados, aplique pela manhã após a limpeza e antes do protetor solar. Comece com uso em dias alternados para adaptar a pele.',
    usageSteps: [
      {
        title: 'Limpeza',
        description: 'Limpe o rosto com seu produto de limpeza habitual e seque delicadamente'
      },
      {
        title: 'Aplicação',
        description: 'Aplique 2-3 gotas do sérum no rosto e pescoço, evitando a área dos olhos'
      },
      {
        title: 'Massagem',
        description: 'Massageie suavemente até completa absorção, aguarde 5 minutos'
      },
      {
        title: 'Proteção',
        description: 'Finalize com hidratante e protetor solar (uso matinal obrigatório)'
      }
    ],
    dosList: [
      'Use protetor solar diariamente',
      'Comece com uso gradual',
      'Armazene em local fresco e seco',
      'Aplique em pele limpa e seca',
      'Use preferencialmente pela manhã'
    ],
    dontsList: [
      'Não misture com retinol no mesmo momento',
      'Evite exposição solar sem proteção',
      'Não aplique em pele irritada',
      'Não use em excesso',
      'Evite contato com os olhos'
    ],
    perfectPairings: [
      {
        title: 'Protetor Solar FPS 60',
        category: 'Proteção Solar',
        description: 'Potencializa a proteção antioxidante e previne manchas',
        boost: 40,
        icon: 'Sun'
      },
      {
        title: 'Hidratante Ácido Hialurônico',
        category: 'Hidratação',
        description: 'Complementa a hidratação e melhora a absorção',
        boost: 25,
        icon: 'Droplets'
      }
    ],
    reviews: [
      {
        id: 1,
        customerName: 'Marina Silva',
        customerAvatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        rating: 5,
        date: '2025-01-15',
        purchasedSize: '15ml',
        verified: true,
        skinType: 'Mista',
        comment: 'Produto incrível! Comecei com o tamanho de 15ml para testar e já estou vendo resultados. Minha pele está mais luminosa e as manchinhas estão clareando. A textura é leve e absorve rapidamente.',
        pros: ['Absorção rápida', 'Resultados visíveis', 'Não resseca'],
        cons: ['Preço um pouco alto'],
        helpfulCount: 23,
        images: ['https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&h=200&fit=crop']
      },
      {
        id: 2,
        customerName: 'Ana Carolina',
        customerAvatar: 'https://randomuser.me/api/portraits/women/45.jpg',
        rating: 5,
        date: '2025-01-10',
        purchasedSize: '30ml',
        verified: true,
        skinType: 'Seca',
        comment: 'Já uso há 2 meses e os resultados são fantásticos. Comprei o de 30ml depois de testar o menor. Minha pele nunca esteve tão uniforme e hidratada.',
        pros: ['Resultados duradouros', 'Hidratação excelente', 'Embalagem prática'],
        cons: [],
        helpfulCount: 18
      },
      {
        id: 3,
        customerName: 'Carla Mendes',
        customerAvatar: 'https://randomuser.me/api/portraits/women/28.jpg',
        rating: 4,
        date: '2025-01-05',
        purchasedSize: '5ml',
        verified: true,
        skinType: 'Oleosa',
        comment: 'Comecei com o tamanho menor para testar. Gostei bastante, não deixa a pele oleosa e realmente clareia. Já encomendei o tamanho maior.',
        pros: ['Não oleoso', 'Clareamento eficaz', 'Tamanho teste perfeito'],
        cons: ['Demora um pouco para ver resultados'],
        helpfulCount: 15
      }
    ]
  };

  // Mock related products
  const relatedProducts = [
    {
      id: 'serum-niacinamida',
      name: 'Sérum Niacinamida 10%',
      category: 'Séruns Faciais',
      shortDescription: 'Controla oleosidade e minimiza poros dilatados',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 189,
      startingPrice: 24.90,
      originalPrice: 34.90,
      discount: 28,
      availableSizes: ['5ml', '15ml', '30ml'],
      isNew: false,
      bestSeller: true
    },
    {
      id: 'hidratante-hialuronico',
      name: 'Hidratante Ácido Hialurônico',
      category: 'Hidratantes',
      shortDescription: 'Hidratação intensa com ácido hialurônico puro',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 312,
      startingPrice: 32.90,
      availableSizes: ['10ml', '20ml', '50ml'],
      isNew: true,
      bestSeller: false
    },
    {
      id: 'protetor-fps60',
      name: 'Protetor Solar Facial FPS 60',
      category: 'Proteção Solar',
      shortDescription: 'Proteção avançada com base hidratante',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop',
      rating: 4.6,
      reviewCount: 156,
      startingPrice: 39.90,
      originalPrice: 49.90,
      discount: 20,
      availableSizes: ['15ml', '30ml', '60ml'],
      isNew: false,
      bestSeller: true
    },
    {
      id: 'esfoliante-aha',
      name: 'Esfoliante AHA 7%',
      category: 'Esfoliantes',
      shortDescription: 'Renovação celular com ácidos naturais',
      image: 'https://images.unsplash.com/photo-1556228883-c4f9e5d6e9c0?w=400&h=400&fit=crop',
      rating: 4.5,
      reviewCount: 98,
      startingPrice: 27.90,
      availableSizes: ['5ml', '15ml', '25ml'],
      isNew: true,
      bestSeller: false
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleSizeRecommendation = (recommendedSize) => {
    setSelectedSize(recommendedSize);
    setActiveSection('order');
  };

  const sections = [
    { id: 'overview', label: 'Visão Geral', icon: 'Eye' },
    { id: 'advisor', label: 'Consultor', icon: 'Brain' },
    { id: 'reviews', label: 'Avaliações', icon: 'Star' },
    { id: 'order', label: 'Pedido', icon: 'ShoppingCart' }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Breadcrumb */}
      <div className="container-fluid pt-20 pb-4">
        <nav className="flex items-center space-x-2 text-sm text-text-secondary">
          <Link to="/" className="hover:text-primary transition-colors duration-300">
            Início
          </Link>
          <Icon name="ChevronRight" size={16} />
          <Link to="/product-catalog" className="hover:text-primary transition-colors duration-300">
            Catálogo
          </Link>
          <Icon name="ChevronRight" size={16} />
          <span className="text-text-primary font-medium">{product?.name}</span>
        </nav>
      </div>
      {/* Main Content */}
      <div className="container-fluid pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Product Images and Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Product Images */}
            <ProductImageGallery product={product} />

            {/* Section Navigation */}
            <div className="bg-surface rounded-xl p-4 border border-border">
              <nav className="flex space-x-4 overflow-x-auto">
                {sections?.map((section) => (
                  <button
                    key={section?.id}
                    onClick={() => scrollToSection(section?.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                      activeSection === section?.id
                        ? 'bg-primary text-primary-foreground shadow-card'
                        : 'text-text-secondary hover:text-text-primary hover:bg-background'
                    }`}
                  >
                    <Icon name={section?.icon} size={16} />
                    <span>{section?.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Product Info Section */}
            <div id="overview">
              <ProductInfo product={product} />
            </div>

            {/* Size Advisor Section */}
            <div id="advisor">
              <SizeAdvisor 
                product={product} 
                onSizeRecommendation={handleSizeRecommendation}
              />
            </div>

            {/* Reviews Section */}
            <div id="reviews">
              <CustomerReviews product={product} />
            </div>

            {/* Related Products */}
            <RelatedProducts relatedProducts={relatedProducts} />
          </div>

          {/* Right Column - Size Selector and Order */}
          <div className="lg:col-span-1">
            <div className={`space-y-6 ${isSticky ? 'lg:sticky lg:top-24' : ''}`}>
              {/* Size Selector */}
              <div className="bg-card rounded-xl p-6 shadow-card border border-border">
                <SizeSelector 
                  product={product}
                  selectedSize={selectedSize}
                  onSizeChange={handleSizeChange}
                />
              </div>

              {/* WhatsApp Order Section */}
              <div id="order" className="bg-card rounded-xl p-6 shadow-card border border-border">
                <WhatsAppOrderSection 
                  product={product}
                  selectedSize={selectedSize}
                />
              </div>

              {/* Trust Badges */}
              <div className="bg-surface rounded-xl p-6 border border-border">
                <h4 className="font-semibold mb-4 text-center">Garantias M&C</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                      <Icon name="Shield" size={20} className="text-success" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Produto Original</div>
                      <div className="text-xs text-text-secondary">Certificado ANVISA</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <Icon name="Truck" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Entrega Rápida</div>
                      <div className="text-xs text-text-secondary">2-5 dias úteis</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                      <Icon name="RotateCcw" size={20} className="text-accent" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Satisfação Garantida</div>
                      <div className="text-xs text-text-secondary">30 dias para troca</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Floating WhatsApp Button - Mobile */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <Button
          variant="default"
          size="icon"
          onClick={() => {
            const message = encodeURIComponent(`Olá! Tenho interesse no produto: ${product?.name}. Gostaria de mais informações.`);
            window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
          }}
          className="w-14 h-14 rounded-full bg-accent hover:bg-accent/90 shadow-elevated animate-pulse hover:animate-none hover:scale-110 transition-all duration-300"
        >
          <Icon name="MessageCircle" size={24} color="white" />
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailPage;