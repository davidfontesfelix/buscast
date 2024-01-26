import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        Dark: '#04081E',
        Blue: '#131E59',
        BlueLight: '#1D4ED8',
      },
      fontFamily: {
        familjenGrotesk: 'var(--font-familjen-grotesk)',
        JetBrainsMono: 'var(--font-jetbrains-monos)',
      },
    },
  },
  plugins: [],
}
export default config
