const path = require('path');
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPrefixer = require('postcss-prefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pkg = require('./package.json');

const isProduction = process.env.NODE_ENV === 'production';
const isDevServer = process.env.DEV_SERVER === 'true';
const FILENAME = pkg.name + (isProduction ? '.min' : '');

const BANNER = [
  'TOAST UI Calendar',
  '@version ' + pkg.version + ' | ' + new Date().toDateString(),
  '@author ' + pkg.author,
  '@license ' + pkg.license
].join('\n');

const config = {
  entry: ['./src/sass/index.scss', './src/ts/index.ts'],
  output: {
    library: ['tui', 'Calendar'],
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.join(__dirname, 'dist'),
    filename: FILENAME + '.js',
    publicPath: '/dist'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@src': path.resolve(__dirname, './src/ts/')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader', 'eslint-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isDevServer ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                postcssPrefixer({
                  prefix: 'tui-full-calendar-'
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: BANNER,
      entryOnly: true
    }),
    new StyleLintPlugin(),
    new MiniCssExtractPlugin({
      filename: `${FILENAME}.css`
    }),
    new HtmlWebpackPlugin()
  ],
  devtool: 'source-map',
  devServer: {
    historyApiFallback: false,
    host: '0.0.0.0',
    disableHostCheck: true
  }
};

module.exports = config;
