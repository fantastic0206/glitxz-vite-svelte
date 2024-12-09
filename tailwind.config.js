/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors:{
        primaryGreen : '#00ff4e',    
        primaryRed : '#ff0000',    
        primaryBlue : '#031cff',    
        primarySalmon : '#F06B6F',    
        primaryCyan : '#1BFFE2',    
      },
      fontFamily: {
        'navigo': ['navigo', 'sans-serif']
      },
  },
  },
}

