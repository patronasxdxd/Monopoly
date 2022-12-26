module.exports = {
  module: {
    loaders: [
      { test: /\.css$/, loader:"style-loader!css-loader" },
    ]
  },

  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
