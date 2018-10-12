const merge = require('webpack-merge');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');

const common = require('./webpack.config.common');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'nosources-source-map',
    entry: {
        app: './src/client/app/index.ts',
    },
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
            // When the @ngtools webpack loader runs, it will replace the @Component()
            // "templateUrl" and "styleUrls" with inline "require()" calls. As such, we
            // need the raw-loader so that require() will know how to load .htm and .css
            // files as plain-text.
            {
                test: /\.(html|css)$/,
                loader: 'raw-loader',
            },
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
