'use strict';

var path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/{helpers,mocks}/**/*.js',
      'test/spec/components/**/*.js'<% if(architecture === 'flux' || architecture === 'reflux') { %>,
      'test/spec/stores/**/*.js',
      'test/spec/actions/**/*.js'<% } %>
    ],
    preprocessors: {
      'test/spec/components/**/*.js': ['webpack']<% if(architecture === 'flux' || architecture === 'reflux') { %>,
      'test/spec/stores/**/*.js': ['webpack'],
      'test/spec/actions/**/*.js': ['webpack']<% } %>
    },
    webpack: {
      cache: true,
      module: {
        loaders: [{
          test: /\.gif/,
          loader: 'url-loader?limit=10000&mimetype=image/gif'
        }, {
          test: /\.jpg/,
          loader: 'url-loader?limit=10000&mimetype=image/jpg'
        }, {
          test: /\.png/,
          loader: 'url-loader?limit=10000&mimetype=image/png'
        }, {
          test: /\.js$/,
          loader: 'babel-loader'
        },<% if (stylesLanguage === 'sass') { %> {
          test: /\.sass/,
          loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
        },<% } %><% if (stylesLanguage === 'scss') { %> {
          test: /\.scss/,
          loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
        },<% } %><% if (stylesLanguage === 'less') { %> {
          test: /\.less/,
          loader: 'style-loader!css-loader!less-loader'
        },<% } %><% if (stylesLanguage === 'stylus') { %> {
          test: /\.styl/,
          loader: 'style-loader!css-loader!stylus-loader'
        },<% } %> {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        }, {
          test: /\.woff/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        }, {
          test: /\.woff2/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff2'
        }]
      },
      resolve: {
        alias: {
          'styles': path.join(process.cwd(), './src/styles/'),
          'components': path.join(process.cwd(), './src/components/')<% if(architecture === 'flux'||architecture === 'reflux') { %>,
          'stores': path.join(process.cwd(), './src/stores/'),
          'actions': path.join(process.cwd(), './src/actions/')<% } %>
        }
      }
    },
    webpackServer: {
      stats: {
        colors: true
      }
    },
    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: false,
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],
    reporters: ['progress'],
    captureTimeout: 60000,
    singleRun: true
  });
};