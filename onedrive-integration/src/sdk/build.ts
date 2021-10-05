import config from '../../webpack.config'

const webpack = require('webpack') // why import doesn't work?


export default function build(configOverrides = {mode: 'production'}) {
    // TODO clean /dist and return build file as specified in webpack.config
    // TODO use webpack-merge?
    // TODO test webpack result, failed build is not error but in result output
    const compiler = webpack({...config, ...configOverrides})
    return new Promise((resolve, reject) => {
        compiler.run((error: any, result: any) => {
            if (error) {
                console.error('Build failed ' + error)
                return reject(error);
            } else {
                if (/\[emitted\]/.test(result)) {
                    return resolve(result);
                } else {
                    console.error('Build failed ' + result)
                    reject(new Error(result))
                }
            }
        });
    });
}