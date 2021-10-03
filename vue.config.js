const path = require('path');

const TSCONFIG_PATH = path.resolve(__dirname, './tsconfig.client.json');

module.exports = {
    // publicPath: process.env.NODE_ENV === "production" ? '/bowling-solitaire' : "/",
    configureWebpack: config => {
        config.devtool = 'source-map';
        config.entry = {
            app: [
                './src/client/main.ts'
            ]
        };
        config.resolve.alias = {
            "@common": path.resolve(__dirname, "src/common"),
            "@client": path.resolve(__dirname, "src/client")
        }
    },
    chainWebpack: (config) => {
        config.module
            .rule('ts')
            .use('ts-loader')
            .merge({
                options: {
                    configFile: TSCONFIG_PATH,
                }
            });

        config
            .plugin('fork-ts-checker')
            .tap(args => {
                console.log(args[0]);
                args[0].tsconfig = TSCONFIG_PATH;
                if (!args[0].typescript) {
                    args[0].typescript = {};
                }
                args[0].typescript.configFile = TSCONFIG_PATH;
                return args;
            });
    }
}
