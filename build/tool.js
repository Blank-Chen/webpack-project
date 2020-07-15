/**
* @desc tool to export all modules during webpack
* @author pika
*/

'use strict';
const path = require('path')
const webpack = require('webpack')
const pkg = require('../package.json')
module.exports = {
    fs: require('fs-extra'),
    path,
    webpack,
    webpackMerge: require('webpack-merge'),
    devServer: require('webpack-dev-server'),
    babelHmrPlugin: require('babel-plugin-dva-hmr'),
    minimizeCssPlugin: require('optimize-css-assets-webpack-plugin'),
    minimizeJsPlugin: require('terser-webpack-plugin'),
    caseSensitivePlugin: require('case-sensitive-paths-webpack-plugin'),
    // extra css in js/jsx | other template
    extractCssPlugin: require('mini-css-extract-plugin'),
    htmlWebpackPlugin: require('html-webpack-plugin'),
    rootPath: path.join(__dirname, '../'),
    // set environment by using definePlugin,envName id custom like dev|prod,will parse to development|production
    defineEnv: (envName) => {
        const defineObj = {
            'process.env.BUILD_ENV': JSON.stringify(envName)
        }
        const pkgEnv = pkg['_env_'][envName]
        // // feq ? use NODE_ENV will cause error, so use BUILD_ENV.find this issue by https://github.com/reduxjs/redux/issues/2767
        // process.env.BUILD_ENV = envName
        Object.entries(pkgEnv).forEach(([key, value]) => {
            // process.env[key] = value
            defineObj[`process.env.${key}`] = JSON.stringify(value)
            console.log(`webpack environment => ${envName}
                     environment config => ${key}---${value}`)
        })
        return defineObj
    }
}