const webpack = require('webpack');
const path = require('path');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const HappyPack = require('happypack');

//let ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// const getHappyPackConfig = require('./build/happypack');

module.exports = {
    entry: path.resolve(__dirname + '/components/index.ts'),
    output: {
        path: path.resolve(__dirname + '/libs/'),
        filename: 'workflow.js'
    },
    resolve: {
        extensions: ['*', '.js', '.vue', '.json', '.ts', 'tsx'],
    },
    // plugins: [
    //     //new VueLoaderPlugin(),
    //     new HappyPack(getHappyPackConfig({
    //         id: 'vue',
    //         loaders: ['vue-loader']
    //     })),
    // ],
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                }]
            },
            {
                test: /\.less$/,
                loader: 'less-loader'
            }
        ]
    },
};