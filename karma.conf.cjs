module.exports = function (config) {
  config.set({
    // Frameworks de pruebas que Karma va a utilizar
    frameworks: ['jasmine', 'webpack'],

    // Archivos de prueba a cargar
    files: [
      { pattern: 'src/**/*.spec.jsx', watched: false },
      { pattern: 'src/**/*.spec.js', watched: false }
    ],

    // Preprocesadores: Pasa los archivos especificados por Webpack
    preprocessors: {
      'src/**/*.spec.jsx': ['webpack'],
      'src/**/*.spec.js': ['webpack']
    },

    // Configuración de Webpack para compilar JSX / ES6 e instrumentar cobertura
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

    // Reporteros de salida
    reporters: ['progress', 'coverage'],

    // Configuración del generador de reportes de cobertura (Istanbul)
    coverageReporter: {
      dir: 'coverage/',
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ],
      check: {
        global: {
          statements: 60,
          lines: 60,
          functions: 60,
          branches: 40
        }
      }
    },

    // Configuración del servidor Karma
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};