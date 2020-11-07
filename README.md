# vue-cts
Simple SPA for maintaining personal contact list

## Connects to "Contacts.API" - ASP.NET Web API project

<a href="https://github.com/SkwanT/Contacts.API" target="_blank">Contacts.API</a>

## Project setup
```
npm install
```
## Compiles and hot-reloads for development
```
npm run serve
```

### Web API project is set to 'http://localhost:58178' in vue.config.js file.

vue.config.js

``` javascript
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
```
