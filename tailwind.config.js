/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core System Colors
        background: 'var(--color-background)', // white
        foreground: 'var(--color-foreground)', // slate-800
        border: 'var(--color-border)', // gray-200
        input: 'var(--color-input)', // gray-50
        ring: 'var(--color-ring)', // blue-400
        
        // Card & Surface Colors
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)' // slate-800
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)' // slate-800
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // gray-50
          foreground: 'var(--color-muted-foreground)' // slate-500
        },
        
        // Brand Primary Colors
        primary: {
          DEFAULT: 'var(--color-primary)', // blue-400
          foreground: 'var(--color-primary-foreground)' // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // blue-300
          foreground: 'var(--color-secondary-foreground)' // slate-800
        },
        
        // Accent & Luxury Colors
        accent: {
          DEFAULT: 'var(--color-accent)', // yellow-600
          foreground: 'var(--color-accent-foreground)' // white
        },
        
        // Status Colors
        success: {
          DEFAULT: 'var(--color-success)', // green-600
          foreground: 'var(--color-success-foreground)' // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // orange-500
          foreground: 'var(--color-warning-foreground)' // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-500
          foreground: 'var(--color-error-foreground)' // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-500
          foreground: 'var(--color-destructive-foreground)' // white
        },
        
        // Additional Brand Colors
        surface: 'var(--color-surface)', // gray-50
        'text-primary': 'var(--color-text-primary)', // slate-800
        'text-secondary': 'var(--color-text-secondary)', // slate-500
        trust: 'var(--color-trust)', // green-800
        cta: 'var(--color-cta)' // blue-500
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Dancing Script', 'cursive']
      },
      fontSize: {
        'xs': 'var(--font-size-xs)', // 12px
        'sm': 'var(--font-size-sm)', // 14px
        'base': 'var(--font-size-base)', // 16px
        'lg': 'var(--font-size-lg)', // 18px
        'xl': 'var(--font-size-xl)', // 20px
        '2xl': 'var(--font-size-2xl)', // 24px
        '3xl': 'var(--font-size-3xl)', // 30px
        '4xl': 'var(--font-size-4xl)', // 36px
        '5xl': 'var(--font-size-5xl)', // 48px
        '6xl': 'var(--font-size-6xl)' // 60px
      },
      spacing: {
        'xs': 'var(--spacing-xs)', // 8px
        'sm': 'var(--spacing-sm)', // 16px
        'md': 'var(--spacing-md)', // 24px
        'lg': 'var(--spacing-lg)', // 40px
        'xl': 'var(--spacing-xl)' // 64px
      },
      boxShadow: {
        'subtle': 'var(--shadow-subtle)',
        'card': 'var(--shadow-card)',
        'elevated': 'var(--shadow-elevated)'
      },
      borderRadius: {
        'sm': 'var(--radius-sm)', // 6px
        'md': 'var(--radius-md)', // 8px
        'lg': 'var(--radius-lg)', // 12px
        'xl': 'var(--radius-xl)' // 16px
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-gentle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(40px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          }
        }
      },
      backdropBlur: {
        'elegant': '20px'
      },
      transitionTimingFunction: {
        'elegant': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      gridTemplateColumns: {
        'golden': '1.618fr 1fr',
        'product': 'repeat(auto-fit, minmax(280px, 1fr))',
        'hero': '60% 40%'
      },
      aspectRatio: {
        'product': '3/4',
        'hero': '16/9'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate')
  ],
}