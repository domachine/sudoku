import { createRequire } from 'node:module'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)

export default /** @type {import('webpack').Configuration} */ ({
  entry: ['./resources/index.css', './resources/index.js'],
  output: {
    publicPath: '/sudoku/',
    path: fileURLToPath(new URL('..', import.meta.url)),
    ...(process.env.NODE_ENV === 'production'
      ? { filename: '[name].[contenthash].js' }
      : {}),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          require.resolve('css-loader'),
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                plugins: [
                  require.resolve('autoprefixer'),
                  [
                    require.resolve('tailwindcss'),
                    { config: './tailwind.config.cjs' },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './resources/index.html',
    }),
    new MiniCssExtractPlugin({
      ...(process.env.NODE_ENV === 'production'
        ? { filename: '[name].[contenthash].css' }
        : { filename: '[name].css' }),
    }),
  ],
  devServer: {
    liveReload: true,
  },
})
