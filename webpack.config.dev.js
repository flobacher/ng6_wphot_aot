const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const common = require('./webpack.config.common');

module.exports = merge(common, {
    mode: 'development',
    entry: {
        app: [
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            './src/client/app/index.ts',
        ],
    },
    output: {
        filename: '[name].js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                    {
                        loader: 'angular2-template-loader',
                    },
                ],
                exclude: [/\.(spec|e2e)\.ts$/],
            },
            {
                test: /\.(html)$/,
                loader: 'raw-loader',
                exclude: /\.async\.(html|css)$/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '!!ejs-loader!public/index.ejs',
            templateParameters: { manifest: false },
            inject: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NamedModulesPlugin(),
    ],
});
