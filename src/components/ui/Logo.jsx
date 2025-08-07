import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({
  size = 'default',
  className = '',
  linkTo = '/'
}) => {
  // Size configurations
  const sizeConfig = {
    small: {
      container: 'h-20'
    },
    default: {
      container: 'h-24 lg:h-28'
    },
    large: {
      container: 'h-28 lg:h-32'
    }
  };

  const currentSize = sizeConfig[size] || sizeConfig.default;

  const LogoContent = () => (
    <div className={`flex items-center ${className}`}>
      <img
        src="/assets/images/logo1.svg"
        alt="M&C Fracionados Logo"
        className={`${currentSize.container} w-auto`}
      />
    </div>
  );

  // If linkTo is provided, wrap in Link component
  if (linkTo) {
    return (
      <Link 
        to={linkTo} 
        className="hover:opacity-80 transition-opacity duration-300"
      >
        <LogoContent />
      </Link>
    );
  }

  // Otherwise, return just the logo content
  return <LogoContent />;
};

export default Logo;
