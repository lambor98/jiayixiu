

module.exports = {
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
            "/h5":{
                target:"http://api.fanli.cn",
                secure:false,
                pathRewrite:{
                    "^/h5":""
                }
            }
        }
    },
}
