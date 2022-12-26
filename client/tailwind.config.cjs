/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        siteblack: '#131519',
        siteDimBlack: '#191d23',
        siteViolet: '#7f46f0',
        siteWhite: '#9eacc7',
      },


//       import Dharock from './Dharock.png'
// import Bronze from './bronze.webp'
// import Bandos from './bandos.webp'
// import Graandor from './Graandor.webp'
// import Dragon from './dragon.webp'
// import Mage from './mage.webp'
// import noobranger from './noobranger.webp'
// import ahrim from './ahrim.webp'
// import wom from './Wise_old_Man.webp'
// import virtus from './virtus.webp'
      backgroundImage: {
        
        astral: "url('/src/assets/background/kha.webp')",
        saiman: "url('/src/assets/background/wildy.webp')",
        eoaalien: "url('/src/assets/background/eoaalien.jpg')",
        panight: "url('/src/assets/background/panight.jpg')",
        heroImg: "url('/src/assets/background/hero-img.jpg')",
        landing: "url('/src/assets/background/landing.jpg')",
      },
      fontFamily: {
        runescape: ['runescape'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
