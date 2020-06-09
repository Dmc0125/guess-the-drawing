module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/scss/bundle.sass"',
      },
    },
  },
};
