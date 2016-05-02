var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('./api/config').db;
var routes = require('./api/routes/api');
var path = require('path');
var config = require('../config');

/* start-strip */
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')
/* end-strip */

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port

/* start-strip */
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable
/* end-strip */

var app = express()

/* start-strip */
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)
/* end-strip */

// serve pure static assets
var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory)
var staticFolder;
if (process.env.NODE_ENV === 'release') {
    staticFolder = path.join(__dirname, '../static');
} else {
    staticFolder = './static';
}
console.log(process.env.NODE_ENV);
console.log(staticFolder);
app.use(staticPath, express.static('./static'))

// routing/api
if (db) {
}

if (process.env.NODE_ENV === 'release') {
    app.use('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../index.html'));
    });
}
app.use(bodyParser.urlencoded({ extended: false }));
routes.addTo(router);
app.use('/api/v1', router);

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
