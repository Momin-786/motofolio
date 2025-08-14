module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'ub-grey': '#111111',
      'ub-warm-grey': "#AEA79F",
      'ub-cool-grey': "#333333",
      'ub-orange': "#2777FF",
      'ub-lite-abrgn': "#77216F",
      'ub-med-abrgn': "#5E2750",
      'ub-drk-abrgn': "rgba(0, 0, 0, 0.6)",
      'ub-window-title': "#1a1c23",
 
    }),
    textColor: theme => ({
      ...theme('colors'),
      'ubt-grey': '#F6F6F5',
      'ubt-warm-grey': "#AEA79F",
      'ubt-cool-grey': "#333333",
      'ubt-blue': "#3465A4",
      'ubt-green': "#4E9A06",
      'ubt-kili-green':'#93AC8F'
    }),
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.300', 'currentColor'),
      'ubb-orange': '#2777FF'
    }),
    minWidth: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },
    minHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },
    extend: {
      zIndex: {
        '-10': '-10',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
