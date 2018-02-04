/*!
* Clear webhooks.
* Created by Tim Scheuering
*/
'use strict';

const AXIOS = require( 'axios' );

const TOKEN = "YjZhOTRiMmUtZjE1MS00ZmQ3LWE3OGEtMGQyNjM0NWViOWIzZjY1NmE1NjYtNjA5"; // place your bot or user token here

function removeWebhook ( p ) { return new Promise( ( resolve, reject ) => {
  AXIOS.delete( 'https://api.ciscospark.com/v1/webhooks/' + p.id, {
    "headers":{ "Content-Type":"application/json; charset=utf-8", "Authorization":"Bearer " + TOKEN }
  } ).then( ( r ) => {
    resolve( 'done ' + p.id );
  } ).catch( ( e ) => {
    reject( 'error ' + p.id );
  } );
} ); }

function sequential ( p ) {
  return p.data.items.reduce( ( promise, item ) => {
    return promise.then( ( r ) => {
      return removeWebhook( item ).then( ( r ) => { } ).catch( ( e ) => { } );
    } ).catch( ( e ) => { } );
  }, Promise.resolve( ) );
}

AXIOS.get( 'https://api.ciscospark.com/v1/webhooks', {
  "headers":{ "Content-Type":"application/json; charset=utf-8", "Authorization":"Bearer " + TOKEN }
} ).then( ( r ) => {
  sequential( r ).then( ( r ) => {
    console.log( 'everything done', r );
  } ).catch( ( e ) => {
    console.log( 'everything failed', e );
  } );
} );

