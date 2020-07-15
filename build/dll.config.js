/**
 * @desc 编译的第三方资源包dll映射配置
 */

'use strict';

const { path, webpack, rootPath } = require('./tool')
const pkg = require('../package.json');

module.exports = {
    entry: {
        thirdPlugin: pkg.dlls,
    },
    output: {
        path: path.join(process.cwd(), './dist'),
        // file name of dll file
        filename: '[name].dll.js',
        // global name saved in dll file
        library: 'dll_[name]',
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(rootPath, './dist', '[name].manifest.json'),
            name: 'dll_[name]', // common function name of output file
            context: __dirname,
        }),
    ],
    optimization: {
        minimize: true,
    },
};
