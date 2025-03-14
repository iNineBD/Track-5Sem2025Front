import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        purple: {
          50:  '#E6E1F5',
          100: '#CDC3EB',
          200: '#B3A4E1',
          300: '#9985D7',
          400: '#7F66CD',
          500: '#6648C3',
          600: '#4E30B0',
          700: '#3D248F',
          800: '#2F1682',
          900: '#261263',
          950: '#1A0D46'
        },
        primary: {
          DEFAULT: 'purple-500',
          50: 'purple-50',
          100: 'purple-100',
          200: 'purple-200',
          300: 'purple-300',
          400: 'purple-400',
          500: 'purple-500',
          600: 'purple-600',
          700: 'purple-700',
          800: 'purple-800',
          900: 'purple-900',
          950: 'purple-950',
        },
      }
    }
  }
}
