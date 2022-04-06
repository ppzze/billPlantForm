const path = require('path')
function resolve(dir){
    return path.join(__dirname,dir)
}
module.exports = {
    publicPath:'/',
    assetsDir:"supervisor",
    lintOnSave:true,
    productionSourceMap:false,

    configureWebpack: {
        devtool:'source-map',
        resolve:{
            extensions:['.css','.fonts','.img','.js'],
            alias:{
                'src':resolve('src')
            }
        }
    },
    devServer: { // 环境配置
      // host: '0.0.0.0',
      // public: '202.206.212.115', // 此处是自己电脑IP地址！
      // port: '8080',
      // https: false,
      // disableHostCheck: true,
      // open: false // 配置自动启动浏览器
        proxy: {
            '/api': {
                target: 'https://www.chargestation.top',//目标接口域名
                changeOrigin: true,//是否跨域
                pathRewrite: {
                    '^/api': '' //重写接口,后面可以使用重写的新路径，一般不做更改
                }
            }
        }
    }
}
