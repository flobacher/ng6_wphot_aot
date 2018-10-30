const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const merge = require('webpack-merge');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

console.log('PROD build');
module.exports = (env) => {
    const common = require('./webpack.config.common')(env);
    return merge(common, {
        mode: 'production',
        devtool: 'nosources-source-map',
        output: {
            filename: '[name].[contenthash].js',
        },
        module: {
            rules: [
                // Provide a TypeScript compiler that performs Ahead of Time (AoT)
                // compilation for the Angular application and TypeScript code.
                {
                    test: /(\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                    loader: '@ngtools/webpack',
                },
                // build optimizer
                {
                    test: /\.js$/,
                    loader: '@angular-devkit/build-optimizer/webpack-loader',
                    options: {
                        sourceMap: true,
                    },
                },
            ],
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        extractComments: 'licenses.txt',
                    },
                }),
            ],
        },
        plugins: [
            // work with the @ngtools webpack loader to configure the Angular compiler.
            new AngularCompilerPlugin({
                tsConfigPath: path.join(__dirname, 'tsconfig.json'),
                mainPath: path.join(__dirname, 'src/client/app/index'),
                entryModule: path.join(__dirname, 'src/client/app/app.module#AppModule'),
                // Webpack will generate source-maps independent of this setting. But,
                // this setting uses the original source code in the source-map, rather
                // than the generated / compiled code.
                sourceMap: true,
            }),

            new webpack.HashedModuleIdsPlugin(),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new ManifestPlugin(),
        ],
    });
};
