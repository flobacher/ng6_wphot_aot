const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compression = require('compression');

const config = require('../webpack.config.dev.js');

const NODE_ENV = process.env.NODE_ENV || 'production';
const isDev = NODE_ENV === 'development';
const app = express();

console.log('NODE_ENV', NODE_ENV);

if (isDev) {
    // Tell express to use the webpack-dev-middleware and use the webpack.config.js
    // configuration file as a base.
    const compiler = webpack(config);
    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: config.output.publicPath,
        }),
    );

    app.use(
        webpackHotMiddleware(compiler, {
            log: console.log,
            path: '/__webpack_hmr',
        }),
    );
} else {
    app.set('view engine', 'ejs');
    app.set('view options', { rmWhitespace: true });
    app.set('views', `public`);
    app.get('/', (req, res) => {
        res.render('index.ejs', { title: 'Hey' });
    });
    app.use(compression());
}

app.use(express.static('public'));
app.use(express.static('dist'));

// Serve the files on port 3000.
app.listen(3000, function() {
    console.log('Example app listening on port 3000!\n');
});
