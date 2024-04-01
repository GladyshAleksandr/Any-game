import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkGold: '#B59410',
        gray: '#282828',
        lightRed: '#EF4444',
        red: '#DC2626'
      },
      maxHeight: {
        '100': '400px'
      },

      textColor: {
        DEFAULT: 'white'
      },
      backgroundColor: {
        DEFAULT: 'black'
      },
      fontFamily: {
        archivo: ['Archivo Black', 'sans-serif']
      },
      screens: {
        xxs: '320px',
        xs: '430px',
        xsm: '520px',
        sm: '640px',
        md: '768px',
        mdlg: '975px',
        lg: '1024px',
        lgxl: '1180px',
        xl: '1280px',
        '1xl': '1440px',
        '2xl': '1536px',
        '3xl': '1920px'
      }
    }
  },
  plugins: []
}
export default config
