  module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:58178',
          ws: true,
          changeOrigin: true,
        },
      },
    },
  };