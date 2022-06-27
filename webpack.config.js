const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    mode:'development',
    entry: "./src/main.js", // 入口
    output: { 
        path: path.resolve(__dirname, "dist"), // 出口路径 绝对路径
        filename: "bundle.js" // 出口文件名
    },
    plugins: [
         new VueLoaderPlugin(),
         new HtmlWebpackPlugin(
              {
      template: './public/index.html', // 告诉webpack使用插件时, 以我们自己的html文件作为模板去生成dist/html文件
      filename: 'index.html' // 生成文件的名称
    }
         ),
           new CleanWebpackPlugin(), // 删除的是ouput path 里配置的那个输出文件的文件夹
    ],
      devServer: {
      port: 3000, // 端口号
      open: true
    },
    module: { // loader 加载器 配置在这儿
           
       rules: [ // loader的规则
          {
            test: /\.css$/, // 匹配所有的css文件
            use: [ "style-loader", "css-loader"]
            },
            {
    	test: /\.less$/, // 匹配执行类型的文件
        use: [ "style-loader", "css-loader", 'less-loader']
            },
            { // 图片文件的配置(仅适用于webpack5版本)
    test: /\.(png|jpg|gif|jpeg)$/i,
    type: 'asset', // 在导出一个 data URI 和发送一个单独的文件之间自动选择
            },
            { // webpack5默认内部不认识这些文件, 所以当做静态资源直接输出即可
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    type: 'asset/resource',
    generator: {
    	filename: 'font-[name].[hash:6][ext]'
    }
            },
             {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
              loader: 'babel-loader',
              options: {
                  presets: ['@babel/preset-env'] // 预设:转码规则(用bable开发环境本来预设的)
              }
          }
            },
             {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
            
           
           ],
           
  }
}