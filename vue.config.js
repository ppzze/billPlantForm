module.exports = {
    publicPath: './',
    assetsDir: './supervisor',
    productionSourceMap: false,
    configureWebpack: {},
    devServer: { // 环境配置
        proxy: {
            '/api': {
                target: 'https://aip.baidubce.com',//目标接口域名
                // target:'https://ipiaoju.market.alicloudapi.com',
                changeOrigin: true,//是否跨域
                pathRewrite: {
                    '^/api': '' //重写接口,后面可以使用重写的新路径，一般不做更改
                }
            }
        }
    }
}
