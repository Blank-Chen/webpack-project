/**
* @desc do sth before webpack
* @author pika
*/

const { fs, path, webpack, rootPath } = require('./tool')

const staticInput = path.join(rootPath, 'public');
const staticOutput = path.join(rootPath, 'dist');
const dllConfig = require('./dll.config.js')

fs.emptyDirSync(staticOutput); // clean cache
fs.ensureDirSync(staticInput);
fs.ensureDirSync(staticOutput);

const dllCompile = async () => {
    await fs.copy(staticInput, staticOutput);
    // 编译第三方依赖包成dll映射文件，加快构建速度
    await (new Promise((resolve, reject) => {
        webpack(dllConfig, err => err ? reject(err) : resolve('done'));
    }));
    console.log('Everything is ready! Begin build...');
};

dllCompile();
