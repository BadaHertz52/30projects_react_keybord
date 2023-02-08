const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  //js 진입점
  entry: "./src/js/index.js",
  //번들타입 속성
  output: {
    filename: "bundle.js",
    //번틀 위치
      // 상대경로 말고 절대경로를 넣어주어야함
      //path.resolve(__dirname, ) 웹팩이 절대경로를 찾을 수 있도록 함 , 
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
  //빌드 파일과 원본파일을 연결
  devtool: 'source-map',
  // mode :  development or  production 
  mode: "development",
  // devserver 실행은 "npx webpack-dev-server"
  devServer: {
    host: "localhost",
    port: 4200,
    open: true,
    watchFiles: 'index.html',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "keyboard",
      // title 을 사용하려면  ./index.html head>title 에  "<%= htmlWebpackPlugin.options.title %>" 입력
      template: "./index.html",
      // 파일을 빌드 했을 때 어느 부분에 넣을 지 
        //body라고 하지 않으면 heade에 inject 됨 
      inject: "body",
      favicon: "./favicon.ico"
    }),
    new MiniCssExtractPlugin({ filename: "style.css" }),
  ],
  module: {
    rules: [
      {
        //.css 피일을 loader을 이용해 읽어오겠디.
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    //압축
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  },
};