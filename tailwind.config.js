export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'Poppines': ['Poppines', 'Inter', 'sans-serif'],
        'Inter': ['Inter', 'sans-serif'],
        'JetBrains-Mono': ['"JetBrains Mono"', 'Poppines', 'Inter'],
      },
    },
  },
  plugins: [],
}