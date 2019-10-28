  
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// clean-webpack-plugin: 在构建成功之后清除dist目录

module.exports = {
    plugins: [
        new CleanWebpackPlugin()
    ]
}