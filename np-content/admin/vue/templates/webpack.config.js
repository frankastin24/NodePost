const path = require('path');
const { VueLoaderPlugin } = require("vue-loader");

const src  = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');


module.exports = (env, argv) => {
    const IS_PRODUCTION = argv.mode === 'production';

    const config = {
        entry: './src/index.js',
        devtool: "source-map",
        output: {
            path: dist,
            filename: "dist.js",
        },

        resolve: {
            alias: {
                "@": src
            }
        },
        mode: argv.mode,
        devServer: {
            static: dist
        },
        plugins: [
            new VueLoaderPlugin(),
        ],
        module: {
            rules: [{
                test: /\.vue$/,
                loader: "vue-loader",
                exclude: /node_modules/
            }]
        }
        
    };


   

    return config;
}