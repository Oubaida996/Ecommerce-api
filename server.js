'use strict';
const express = require( 'express' );
const dotenv = require( 'dotenv' );
dotenv.config( { path: 'config.env' } );


const app = express();


app.get( '/', ( req, res ) => {
    res.send( 'Home Page v3' );
} );


const PORT = process.env.PORT || 8000
app.listen( PORT, () => {
    console.log( `Server running on port  ${ PORT }` );
} )

