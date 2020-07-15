
/**
* @desc webpack config in production
* @author pika
*/
const { webpack, webpackMerge, defineEnv, caseSensitivePlugin, minimizeCssPlugin, minimizeJsPlugin, extractCssPlugin } = require('./tool')
const prodEnvDefine = defineEnv('prod')
const PUBLIC_PATH = JSON.parse(prodEnvDefine['process.env.PUBLIC_PATH'])
const baseConfig = require('./webpack.base.config')
const prodConfig = webpackMerge(baseConfig, {
    mode: 'production',
    output: {
        publicPath: PUBLIC_PATH,
        filename: 'index-[hash:6].js',
        chunkFilename: 'js/[name].chunk-[chunkhash:6].js'
    },
    module: {
        rules: [{
            test: /\.(css|scss|sass|less)$/,
            use: [
                {
                    loader: extractCssPlugin.loader,
                    options: {
                        hmr: false,
                        modules: true,
                        reloadAll: false
                    },
                },
                require.resolve('css-loader'),
                require.resolve('postcss-loader'),
                require.resolve('sass-loader'),
                {
                    loader: require.resolve('less-loader'),
                    options: { lessOptions: { javascriptEnabled: true } }
                },
            ]
        }]
    },
    optimization: {
        minimizer: [
            new minimizeJsPlugin({
                sourceMap: false
            }),
            new minimizeCssPlugin()
        ]
    },
    plugins: [
        // analyze full path require during webpack compile,also can be debuged by config 
        new caseSensitivePlugin({
            debug: false
        }),
        new extractCssPlugin({
            filename: '[name]-[hash:6].css',
            chunkFilename: '[id]-[hash:6].chunk.css'
        }),
        new webpack.DefinePlugin(prodEnvDefine)
    ]
})
module.exports = prodConfig