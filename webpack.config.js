const path = require("path");
//자바스크립트 코드를 난독화하고 debugger 구문을 제거
const TerserPlugin = require("terser-webpack-plugin");
//css 파일 크기 최적화
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// html 처리를 위한 프러그인 ,자바스크립트 코드를 난독화하고 debugger 구문을 제거
const HtmlWebpackPlugin = require("html-webpack-plugin");
//css 파일을 개별로 추출 ,CSS 코드가 포함된 JS 파일 별로 CSS 파일을 생성
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// css-loader : js파일에서 css 파일을 불러오기 위해 사용

module.exports = {
  //entry : 여러 모듈의 시작점
  entry: "./src/js/index.js",
  //output: 여러개의 모듈을 webpack을 사용해 하나로 만들어내는 결과물인 번들의 위치와 속성에 대해 정의
  output: {
    filename: "bundle.js",
    //path : 번틀 위치
      // 상대경로 말고 절대경로를 넣어주어야함
      //path.resolve(__dirname, ) 웹팩이 절대경로를 찾을 수 있도록 함 , 
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
  //devtool: 빌드 파일과 원본파일을 연결
  devtool: 'source-map',
  // mode :  development (개발) or  production(상품) 
  mode: "development",
  // dev server 실행은 "npx webpack-dev-server"
  devServer: {
    host: "localhost",
    port: 3000,
    open: true,
    watchFiles: 'index.html',
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title 을 사용하려면  ./index.html head>title 에  "<%= htmlWebpackPlugin.options.title %>" 입력
      title: "keyboard",
      template: "./index.html",
      // 파일을 빌드 했을 때 어느 부분에 넣을 지 
        //body라고 하지 않으면 header에 inject 됨 
      inject: "body",
      favicon: "./favicon.ico"
    }),
    new MiniCssExtractPlugin({ filename: "style.css" }),
  ],
  //module : js,json 이외의 다른 유형의 모듈을 처리하는 방법
  module: {
    //rule : 모듈 생성될 때의 규칙
    rules: [
      {
        // test - 어떤 파일을 변환할 것인지  
          //css 파일에 대한 정규 표현식으로 , 따음표 없이 작성해야함
          //.css 피일에 모듈을 적용
        test: /\.css$/,
        //사용할 모듈 설정
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  }, 
  //optimization : 최적화 
  optimization: {
    //압축
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  },
};