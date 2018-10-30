const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compression = require('compression');
const proxy = require('http-proxy-middleware');
const fs = require('fs');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';

const PROXY = process.env.PROXY || null;
const HMR = !!process.env.HMR || isDev;

const app = express();

console.log('NODE_ENV', NODE_ENV);
let manifest = {
    'runtime.js': '/runtime.js',
    'app.js': '/app.js',
    'polyfills.js': '/polyfills.js',
    'vendor.js': '/vendor.js',
};

if (isDev) {
    const config = require('../webpack.config.dev.js')({ hmr: HMR });
    console.log('use webpackDevMiddleware');
    // Tell express to use the webpack-dev-middleware and use the webpack.config.js
    // configuration file as a base.
    const compiler = webpack(config);
    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: config.output.publicPath,
            writeToDisk: true,
        }),
    );
    if (HMR) {
        console.log('use HMR');
        app.use(
            webpackHotMiddleware(compiler, {
                log: console.log,
                path: '/__webpack_hmr',
            }),
        );
    }
} else {
    fs.readFile(`${__dirname}/manifest.json`, 'utf8', (err, data) => {
        if (err) throw err; // we'll not consider error handling for now
        manifest = JSON.parse(data);
    });
}

app.set('view engine', 'ejs');
app.set('view options', { rmWhitespace: true });
app.set('views', 'views');
app.get('/', (req, res) => {
    res.render('index.ejs', { manifest: manifest });
});
app.use(compression());
app.use(express.static('dist/static'));

if (PROXY) {
    console.log('add proxy');

    app.use('/api', proxy({ target: `${PROXY}`, changeOrigin: true }));
}

// Serve the files on port 3000.
app.listen(3000, function() {
    console.log('Example app listening on port 3000!\n');
});
