import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4cb594',
        secondary: '##302c33',
        tertiary: '#124c94',
        light: '#f2fdff',
      }
    },
  },
  plugins: [],
}
export default config
