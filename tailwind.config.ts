import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
     textColor: {
      DEFAULT: 'white'
     },
    backgroundColor: {
      DEFAULT: 'black'
    }
    },
  },
  plugins: [],
}
export default config
