/**
* @desc local dev server from webpack-dev-server
* @author pika
*/

'use strict';
const { webpack, webpackMerge, minimizeCssPlugin, minimizeJsPlugin, extractCssPlugin, caseSensitivePlugin, devServer, path, rootPath, defineEnv } = require('./tool')
const devEnvDefine = defineEnv('dev')
const PUBLIC_PATH = JSON.parse(devEnvDefine['process.env.PUBLIC_PATH'])
const baseConfig = require('./webpack.base.config')
const devConfig = webpackMerge(baseConfig, {
    mode: 'development',
    output: {
        publicPath: PUBLIC_PATH,
        filename: 'index.js',
        chunkFilename: 'js/[name].chunk.js'
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.(css|scss|sass|less)$/,
            use: [
                {
                    loader: extractCssPlugin.loader,
                    options: {
                        hmr: true,
                        modules: true,
                        reloadAll: true
                    }
                },
                {
                    loader: require.resolve('css-loader'),
                    options: {
                        modules: false,
                    }
                },
                require.resolve('postcss-loader'),
                require.resolve('sass-loader'),
                {
                    loader: require.resolve('less-loader'),
                    options: { lessOptions: { javascriptEnabled: true } }
                }
            ]
        }]
    },
    optimization: {
        minimizer: [
            new minimizeJsPlugin({
                sourceMap: true
            }),
            new minimizeCssPlugin()
        ]
    },
    plugins: [
        // hmr plugin
        new webpack.HotModuleReplacementPlugin(),
        // analyze full path require during webpack compile,also can be debuged by config 
        new caseSensitivePlugin({
            debug: true
        }),
        new extractCssPlugin({
            filename: '[name].css',
            chunkFilename: '[id].chunk.css'
        }),
        new webpack.DefinePlugin(devEnvDefine)
    ]
})
const compiler = webpack(devConfig)
const devOption = {
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: {
        index: 'index.html',
    },
    stats: {
        colors: true
    },
    contentBase: [path.join(rootPath, './public'), path.join(rootPath, './dist')],
    watchContentBase: true
}
const Server = new devServer(compiler, devOption)
Server.listen(8024, 'localhost', () => {
    console.log(`Server is listen on ${8024}`)
})