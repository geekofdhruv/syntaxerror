module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Adjust to match your project structure
  ],
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '2rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2.5rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    extend: {
      screens: {
        xs: '420px',
        sm: '540px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      },
      fontFamily: {
        'public-sans': ['"Public Sans"', 'sans-serif'],
        'dm-sans': ['"DM Sans"', 'sans-serif'],
        // Keep the commented fonts if they are needed
        /* sans: 'var(--font-inter)',
        display: ['var(--font-lexend)', { fontFeatureSettings: '"ss01"' }], */
      },
      maxWidth: {
        '8xl': '88rem',
      },
      colors: {
        'dark-900': '#0b0d1a',  // Custom dark color
        'blue-900': '#003c72',  // Custom blue color
      },
    },
  },
  
}
