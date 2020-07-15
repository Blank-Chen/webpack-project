/**
* @desc base config of webpack
* @author pika
*/

'use strict';
const { path, rootPath, webpack, htmlWebpackPlugin } = require('./tool')
module.exports = {
    entry: {
        index: path.join(rootPath, './src/app.js')
    },
    output: {
        path: path.join(rootPath, './dist')
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', '.less', '.css', '.scss', '.jsx', '.es6'],
        alias: {
            '@': path.join(rootPath, './src'),
            'config': path.join(rootPath, './config'),
            'assets': path.join(rootPath, './src/assets'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: require.resolve('eslint-loader'),
                enforce: 'pre',
                exclude: /node_modules/,
                options: {
                    fix: true,
                    quiet: true,
                    emitError: true,
                    emitWarning: true,
                    failOnError: false,
                    failOnWarning: false,
                }
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('url-loader'), // transform file into base64 url
                        options: {
                            limit: 24000,
                            name: 'static/[name]-[hash:6].[ext]',
                        },
                    },
                    // {
                    //     loader: 'image-webpack-loader',
                    //     options: {
                    //         // set minimize width jpg file
                    //         mozjpeg: {
                    //             progressive: true,
                    //             quality: 65
                    //         },
                    //         // setting disable width png
                    //         optipng: {
                    //             enabled: true,
                    //         },
                    //         // setting quality width png
                    //         pngquant: {
                    //             quality: [0.65, 0.90],
                    //             speed: 4
                    //         },
                    //         // setting minimize width gif
                    //         gifsicle: {
                    //             interlaced: false,
                    //         },
                    //         // the webp option will enable WEBP
                    //         webp: {
                    //             quality: 75
                    //         }
                    //     }
                    // }
                ]
            }
        ],
    },
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '-',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    plugins: [
        new htmlWebpackPlugin({
            version: new Date().getTime(),
            template: path.join(rootPath, './index.html')
        }),
        // reference all dll files packaged by dllplugin
        new webpack.DllReferencePlugin({
            // same as context config in dll webpack config
            context: __dirname,
            // referrance file which were build by dllplugin 
            manifest: require(path.join(rootPath, './dist/thirdPlugin.manifest.json')),
        })
    ]
}