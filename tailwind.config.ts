import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'violet-500',
          50: 'violet-50',
          100: 'violet-100',
          200: 'violet-200',
          300: 'violet-300',
          400: 'violet-400',
          500: 'violet-500',
          600: 'violet-600',
          700: 'violet-700',
          800: 'violet-800',
          900: 'violet-900',
          950: 'violet-950',
        }
      }
    }
  }
}
