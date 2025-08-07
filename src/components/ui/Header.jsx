import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Início', path: '/', icon: 'Home' },
    { name: 'Catálogo', path: '/product-catalog', icon: 'Package' }
  ];



  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: 'rgba(103, 149, 180, 1)' }}
    >
      <div className="container-fluid">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300"
            onClick={closeMenu}
          >
            <div className="flex items-center">
              <img
                src="/assets/images/logo1.svg"
                alt="M&C Fracionados Logo"
                className="h-24 lg:h-28 w-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-elegant hover:bg-white/20 hover:-translate-y-0.5 ${
                  location.pathname === item?.path
                    ? 'text-white bg-white/20 shadow-subtle'
                    : 'text-white hover:text-white/80'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              iconName="Search"
              iconPosition="left"
              className="text-white hover:text-white/80"
            >
              Buscar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              iconName="Search"
              className="text-white hover:text-white/80"
            />

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="text-white hover:text-white/80"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`lg:hidden transition-all duration-300 ease-elegant overflow-hidden ${
            isMenuOpen 
              ? 'max-h-96 opacity-100 pb-6' :'max-h-0 opacity-0 pb-0'
          }`}
        >
          <nav className="flex flex-col space-y-2 pt-4 border-t border-white/20">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={closeMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ease-elegant hover:bg-white/20 ${
                  location.pathname === item?.path
                    ? 'text-white bg-white/20 shadow-subtle'
                    : 'text-white hover:text-white/80'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.name}</span>
              </Link>
            ))}

          </nav>
        </div>
      </div>

    </header>
  );
};

export default Header;