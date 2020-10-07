const path = require( 'path' );
const express = require( 'express' );
const webpack = require( 'webpack' );
const webpackDevMiddleware = require( 'webpack-dev-middleware' );
const expressLayouts = require( 'express-ejs-layouts' );

const app = express();
const config = require( './webpack.config.js' );
const compiler = webpack( config );

app.set( 'views', path.join( __dirname, './src/views/' ) );
app.use( express.static( './dist/' ) );
//app.set( 'layout', './src/views/layout.ejs' );
app.set( 'view engine', 'ejs' );
app.use( expressLayouts );

app.get( '', ( req, res ) => {
    res.render( 'pages/index' );
} );

app.get( '/armory', ( req, res ) => {
    res.render( 'pages/armory' );
} );

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use( webpackDevMiddleware( compiler, {
    publicPath: config.output.publicPath,
    noInfo: true
} ) );

app.use( require( "webpack-hot-middleware" )(compiler) );

// Serve the files on port 3000.
app.listen( 3000, function() {
    console.log( 'Example app listening on port 3000!\n' );
} );