'use strict';
const express = require( 'express' );
const morgan = require( 'morgan' );
const dotenv = require( 'dotenv' );
const mongoose = require( 'mongoose' );
dotenv.config( { path: 'config.env' } );

const app = express();


//==== Connect the DB
mongoose.connect( process.env.DB_URI ).then( ( conn ) => {
    console.log( 'Database connected :' + conn.connection.host );


} ).catch( ( err ) => {
    console.log( `Faild to connect with database : ${ err }` );
} );

//==== Check The Mode Of Enviroments
if ( process.env.NODE_ENV === 'development' ) {
    app.use( morgan( 'tiny' ) );
    console.log( ` Mode : ${ process.env.NODE_ENV } ` );
}


//==== Home Page Route
app.get( '/', ( req, res ) => {
    res.send( 'Home Page v3' );
} );



const PORT = process.env.PORT || 8000
app.listen( PORT, () => {
    console.log( `Server running on port  ${ PORT }` );
} );
