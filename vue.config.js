const webpack = require('webpack')

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
     
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            })
        ]
    },
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    assetsDir:"assets",
    outputDir:"dist2",
    lintOnSave:false,
    devServer: {
        contentBase : __dirname + "/dist/",
        compress:true,
        host:"0.0.0.0",
        port : 80,
        inline : true,
        hot:true,
        historyApiFallback:true,
        disableHostCheck:true,
        publicPath:"",
        proxy:{
            "/ajax":{
                target:"http://localhost:8888/ajax",
                secure:false,
                pathRewrite:{
                    "^/ajax":""
                }
            }
        }
    },
}
