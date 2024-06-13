const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// подключите к проекту mini-css-extract-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: { main: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
    publicPath: "",
  },
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    compress: true,
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: "babel-loader",
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: "/node_modules/",
      },
			{
				// регулярное выражение, которое ищет все файлы с такими расширениями
				test: /\.(svg)$/,
				type: 'asset/resource',
				generator: {
					filename: 'static/svg/[hash][ext][query]'
				}
			},
			{
				// регулярное выражение, которое ищет все файлы с такими расширениями
				test: /\.(ico)$/,
				type: 'asset/resource',
				generator: {
					filename: 'static/ico/[hash][ext][query]'
				}
			},
			{
				test: /\.(png|jpg|gif)$/i,
			 type: 'asset/resource',
			 generator: {
				 filename: 'static/images/[hash][ext][query]'
			 }
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf)$/i,
			 type: 'asset/resource',
			 generator: {
				 filename: 'static/font/[hash][ext][query]'
			 }
			},
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader, {
          	loader: 'css-loader',
          	options: { importLoaders: 1 }
          },
          'postcss-loader',
          {
          	loader: 'sass-loader',
          	options: {
          		sourceMap: true,
          		sassOptions: {
          			outputStyle: "compressed",
          		}
          	}
          }
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "WebPack",
      // favicon: "./src/images/favicon.svg",
      template: "./src/index.html",
      filename: "index.html",
    }),
    // new HtmlWebpackPlugin({
    //   title: "WebPack-404",
    //   favicon: "./src/svg/favicon.svg",
    //   filename: "404.html",
    //   template: "./src/error/404.html",
    // }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(
			{filename: '[name].[hash].css'}
		),
  ],
};
