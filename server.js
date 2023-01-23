'use strict';
const express = require( 'express' );
const morgan = require( 'morgan' );
const dotenv = require( 'dotenv' );
dotenv.config( { path: 'config.env' } );

const app = express();


if ( process.env.NODE_ENV === 'development' ) {
    app.use( morgan( 'tiny' ) );
    console.log( ` Mode : ${ process.env.NODE_ENV } ` );
}

app.get( '/', ( req, res ) => {
    res.send( 'Home Page v3' );
} );


const PORT = process.env.PORT || 8000
app.listen( PORT, () => {
    console.log( `Server running on port  ${ PORT }` );
} )

