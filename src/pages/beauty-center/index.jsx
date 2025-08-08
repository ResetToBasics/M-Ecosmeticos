import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Logo from '../../components/ui/Logo';
import Icon from '../../components/AppIcon';
import useAdminSettings from '../../hooks/useAdminSettings';

const BeautyCenter = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { settings } = useAdminSettings();

  // Carrossel de imagens profissionais de cosméticos
  const carouselImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      alt: "Sérum de Vitamina C Premium"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      alt: "Hidratante Facial Luxuoso"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      alt: "Tratamento Anti-idade"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      alt: "Limpador Facial Premium"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      alt: "Tônico Facial Profissional"
    }
  ];

  // Auto-play do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16 relative overflow-hidden">
        {/* Carrossel de Fundo */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            {carouselImages.map((image, index) => (
              <div
                key={image.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                {/* Overlay escuro e borrado */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
              </div>
            ))}
          </div>
          
          {/* Indicadores do carrossel */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-110' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Conteúdo do Hero */}
        <div className="container-fluid relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="GraduationCap" size={40} color="white" />
            </div>
            
            <h1 className="text-heading-1 mb-6 animate-fade-in">
              {settings.heroTitle}
            </h1>

            <p className="text-body-lg mb-8 text-white/90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {settings.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Sobre Nós */}
      <section className="py-16 bg-background">
        <div className="container-fluid">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-heading-2 text-text-primary mb-4">
                Sobre a M&E Fracionados
              </h2>
              <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
                Uma pequena loja com grandes sonhos, criada para democratizar o acesso aos melhores produtos de beleza.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Texto sobre a loja */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    Nossa História
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    A M&E Fracionados nasceu da paixão por beleza e do desejo de tornar produtos premium acessíveis a todos.
                    Começamos pequenos, mas com a visão de que cada pessoa merece experimentar o melhor da cosmética
                    sem comprometer o orçamento.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    Nossa Missão
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    Oferecemos produtos fracionados de alta qualidade, permitindo que você teste e use
                    exatamente a quantidade que precisa. Acreditamos que beleza deve ser inteligente,
                    sustentável e acessível.
                  </p>
                </div>
              </div>

              {/* Imagem/Stats */}
              <div className="space-y-8 lg:mt-0">
                <div className="bg-card rounded-xl p-8 shadow-subtle">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="Package" size={24} className="text-primary" />
                      </div>
                      <h4 className="text-2xl font-bold text-text-primary">500+</h4>
                      <p className="text-sm text-text-secondary">Produtos Fracionados</p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="Users" size={24} className="text-primary" />
                      </div>
                      <h4 className="text-2xl font-bold text-text-primary">1000+</h4>
                      <p className="text-sm text-text-secondary">Clientes Satisfeitos</p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="Star" size={24} className="text-primary" />
                      </div>
                      <h4 className="text-2xl font-bold text-text-primary">4.9</h4>
                      <p className="text-sm text-text-secondary">Avaliação Média</p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name="Heart" size={24} className="text-primary" />
                      </div>
                      <h4 className="text-2xl font-bold text-text-primary">100%</h4>
                      <p className="text-sm text-text-secondary">Amor pelo que fazemos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

export default BeautyCenter;