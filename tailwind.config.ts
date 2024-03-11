import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
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
