module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],

    files: [
      { pattern: 'src/**/*.spec.jsx', watched: false },
      { pattern: 'src/**/*.spec.js', watched: false }
    ],

    preprocessors: {
      'src/**/*.spec.jsx': ['webpack'],
      'src/**/*.spec.js': ['webpack']
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react'],
                plugins: ['babel-plugin-istanbul']
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      dir: 'coverage/',
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ],
      check: {
        global: {
          statements: 80,
          lines: 80,
          functions: 80,
          branches: 70
        }
      }
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};