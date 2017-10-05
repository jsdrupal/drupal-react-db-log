const path = require('path');
const webpack = require('webpack');

module.exports = [
  {
    entry: './src/index.js',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
      hot: true,
      inline: true,
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    plugins: [
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('development') } }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: ['/node_modules/'],
          query: {
            plugins: [
              'external-helpers',
              'transform-class-properties',
              'transform-decorators-legacy',
              'transform-object-rest-spread',
            ],
            presets: [
              'react',
              [
                'env', {
                  modules: false,
                  targets: {
                    browsers: ['last 2 versions'],
                  },
                },
              ],
            ],
          },
        },
      ],
    },
  },
];
