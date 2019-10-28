## package.json说明

```
"scripts": {
    "start": "webpack-dev-server --mode=development --config ./build/webpack.config.js",
    "build": "webpack --mode=production --config ./build/webpack.config.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
  --mode 参数代表环境，development / production
  --config，指定配置文件 
  build 命令 需要用到webpack
  start 命令，需要用webpack-dev-server
```
