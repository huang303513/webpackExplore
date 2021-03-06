//首先引入插件
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const config = require("./public/config")[isDev ? "dev" : "build"];

module.exports = {
  mode: isDev ? "development" : "production",
  entry: "./src/index.js", //webpack的默认配置
  output: {
    path: path.resolve(__dirname, "dist"), //必须是绝对路径
    filename: "bundle.[hash:6].js",
    publicPath: "/" //通常是CDN地址
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  corejs: 3
                }
              ]
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [
                  require("autoprefixer")({
                    overrideBrowserslist: [">0.25%", "not dead"]
                  })
                ];
              }
            }
          },
          "less-loader"
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240, //10K
              esModule: false,
              name: "[name]_[hash:6].[ext]",
              outputPath: "assets"
            }
          }
        ],
        exclude: /node_modules/
      }
      //   {
      //     test: /.html$/,
      //     use: "html-withimg-loader"
      //   }
    ]
  },

  plugins: [
    //数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html", //打包后的文件名
      minify: {
        removeAttributeQuotes: false, //是否删除属性的双引号
        collapseWhitespace: false //是否折叠空白
      },
      config: config.template
      // hash: true //是否加上hash，默认是 false
    }),
    //不需要传参数喔，它可以找到 outputPath
    new CleanWebpackPlugin()
  ],

  devServer: {
    port: "3000", //默认是8080
    quiet: false, //默认不启用
    inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
    stats: "errors-only", //终端仅打印 error
    overlay: false, //默认不启用
    clientLogLevel: "silent", //日志等级
    compress: true //是否启用 gzip 压缩
  },

  devtool: "cheap-module-eval-source-map" //开发环境下使用
};
