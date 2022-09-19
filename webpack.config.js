const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

const FILE_PATH = '.env';

console.log(
  `ENV = ${process.env.NODE_ENV}, DEPLOYMENT= ${process.env.DEPLOYMENT}`,
);

module.exports = {
  entry: ['react-hot-loader/patch', './src/index.tsx'],
  target: 'web',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'js/[name].[hash].js',
    publicPath: '/',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      src: path.resolve('./src'),
      ...(() => {
        let aliases = {};
        const DEPLOYMENT = process.env.DEPLOYMENT;
        if (DEPLOYMENT === 'dev') return aliases;
        aliases[path.resolve('./src/config.ts')] = path.resolve(
          `./src/config.${DEPLOYMENT}.ts`,
        );
        return aliases;
      })(),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: 'last 2 versions' } }, // or whatever your project requires
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              '@babel/plugin-proposal-optional-chaining',
              'react-hot-loader/babel',
            ],
          },
        },
      },
      {
        test: /\.styl/,
        use: [
          process.env.NODE_ENV !== 'development'
            ? {
                loader: MiniCssExtractPlugin.loader,
              }
            : {
                loader: 'style-loader',
              },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[folder]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css/,
        use: [
          process.env.NODE_ENV !== 'development'
            ? {
                loader: MiniCssExtractPlugin.loader,
              }
            : {
                loader: 'style-loader',
              },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]',
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: /node_modules/,
          enforce: true,
        },
      },
    },
    runtimeChunk: true,
  },
  plugins: (() => {
    const plugins = [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[id].css',
        ignoreOrder: false,
      }),
      new ForkTsCheckerWebpackPlugin(),
      new Dotenv({ path: FILE_PATH }),
      new HtmlWebpackPlugin({
        hash: true,
        template: path.join(__dirname, 'index.html'),
      }),
    ];

    if (process.env.DEPLOYMENT !== 'dev') {
      plugins.unshift(new CleanWebpackPlugin());
    }

    return plugins;
  })(),
  devServer: {
    compress: true,
    host: '0.0.0.0',
    port: 80,
    hot: true,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
};
