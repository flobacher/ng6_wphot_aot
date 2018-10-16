const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const common = require('./webpack.config.common');

console.log('DEV build');
module.exports = merge.strategy({
    'entry.app': 'prepend',
})(common, {
    mode: 'development',
    entry: {
        app: [
                'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
                'core-js/es7/reflect',
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
