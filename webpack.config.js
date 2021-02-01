var path = require('path');

module.exports = {
  // 入口
  entry: './src/index.js',
  // 出口
  output: {
    // 8080端虚拟打包路径
    publicPath: 'xuni',
    // 打包出来的文件名
    filename: 'bundle.js'
  },
  devServer: {
    // 静态资源文件夹
    contentBase: 'www',
    // 端口号
    port: 8080
  }
};