const styles = {
  // general
  headText: 'font-rajdhani font-bold text-white sm:text-6xl text-4xl',
  normalText: 'font-rajdhani font-normal text-[24px] text-siteWhite',
  footerText: 'font-rajdhani font-medium text-base text-white',
  infoText: 'font-rajdhani font-medium text-lg text-siteViolet cursor-pointer',

  // glassmorphism
  glassEffect: 'bg-white backdrop-filter backdrop-blur-lg bg-opacity-10',

  // hoc page
  hocContainer: 'min-h-screen flex xl:flex-row flex-col relative',
  hocContentBox: 'flex flex-1 justify-between bg-siteblack py-8 sm:px-12 px-8 flex-col',
  hocLogo: 'w-[150px] h-[52px] object-contain cursor-pointer',
  hocBodyWrapper: 'flex-1 flex justify-center flex-col xl:mt-0 my-16',



  // Game page
  gameContainer: 'w-screen min-h-screen bg-cover bg-no-repeat bg-center flex-col',
  gameMoveBox: 'sm:w-20 w-14 sm:h-20 h-14 rounded-full cursor-pointer border-[2px]',
  gameMoveIcon: 'w-1/2 h-1/w-1/2 object-contain',



  // custom button component
  btn: 'px-4 py-2 rounded-lg bg-siteViolet w-fit text-white font-rajdhani font-bold',

  // custom input component
  label: 'font-rajdhani font-semibold text-2xl text-white mb-3',
  input: 'bg-siteDimBlack text-white outline-none focus:outline-siteViolet p-4 rounded-md sm:max-w-[50%] max-w-full',


 

  // common
  flexCenter: 'flex items-center justify-center',
  flexEnd: 'flex justify-end items-end',
  flexBetween: 'flex justify-between items-center',

  // alert
  info: 'text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800',
  success: 'text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800',
  failure: 'text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800',
  alertContainer: 'absolute z-10 top-5 left-0 right-0',
  alertWrapper: 'p-4 rounded-lg font-rajdhani font-semibold text-lg ',
  alertIcon: 'flex-shrink-0 inline w-6 h-6 mr-2',


};

export default styles;
