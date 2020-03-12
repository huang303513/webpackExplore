//首先引入插件
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const config = require("./public/config")[isDev ? "dev" : "build"];

module.exports = {
  mode: isDev ? "development" : "production",
  // entry: "./src/index.js", //webpack的默认配置
  entry:{
    index: './src/index.js',
    login: './src/login.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"), //必须是绝对路径
    filename: "[name].[hash:6].js",
    publicPath: isDev ? "/" : "./", //通常是CDN地址
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
          {
            loader: MiniCssExtractPlugin.loader, //替换之前的 style-loader
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [
                  require("autoprefixer")({
                    overrideBrowserslist: ["defaults"]
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
              outputPath: "assets",
              publicPath: "../assets/",
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
      chunks: ['index'],
      minify: {
        removeAttributeQuotes: false, //是否删除属性的双引号
        collapseWhitespace: false //是否折叠空白
      },
      config: config.template
      // hash: true //是否加上hash，默认是 false
    }),
    new HtmlWebpackPlugin({
      template: "./public/login.html",
      filename: "login.html", //打包后的文件名
      chunks: ['login'],
      minify: {
        removeAttributeQuotes: false, //是否删除属性的双引号
        collapseWhitespace: false //是否折叠空白
      },
      config: config.template
      // hash: true //是否加上hash，默认是 false
    }),
    //不需要传参数喔，它可以找到 outputPath
    new CleanWebpackPlugin(),
    //直接拷贝文件
    new CopyWebpackPlugin(
      [
        {
          from: "public/js/*.js",
          to: path.resolve(__dirname, "dist", "js"),
          flatten: true
        }
        //还可以继续配置其它要拷贝的文件
      ],
      {
        ignore: ["other.js"]
      }
    ),
    // 全局变量引用
    new webpack.ProvidePlugin({
      React: "react",
      Component: ["react", "Component"],
      Vue: ["vue/dist/vue.esm.js", "default"],
      $: "jquery",
      _map: ["lodash", "map"]
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css" //个人习惯将css文件放在单独目录下
    }),
    new OptimizeCssPlugin(), //CSS压缩
    new webpack.HotModuleReplacementPlugin(), //热更新插件
  ],

  devServer: {
    port: "3000", //默认是8080
    quiet: false, //默认不启用
    inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
    stats: "errors-only", //终端仅打印 error
    overlay: false, //默认不启用
    clientLogLevel: "silent", //日志等级
    compress: true, //是否启用 gzip 压缩
    hot: true, //是否启用热更新
  },

  // devtool: isDev ? "cheap-module-eval-source-map" : "source-map"
  devtool: isDev ? "cheap-module-eval-source-map" : "cheap-module-eval-source-map"
};
