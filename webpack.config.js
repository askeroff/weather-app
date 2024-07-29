const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: path.resolve(__dirname, "src/main.tsx"),
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    hot: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      title: "Vocab Training",
      filename: "index.html",
      template: "src/template.html",
    }),
  ],
};
