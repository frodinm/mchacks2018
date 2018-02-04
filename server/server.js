/*!
* Give currency recommendations.
* Created by Korhan Akcura
* Based on sparkBot template code by Tim Scheuering
*/
'use strict';

// set data here, could use environmental variables to simplify this step -- begin
const NINATOKEN = "team-ijupdaqzxc-mghk"; // set the bots auth token to constant
const BOTTOKEN = "YjZhOTRiMmUtZjE1MS00ZmQ3LWE3OGEtMGQyNjM0NWViOWIzZjY1NmE1NjYtNjA5"; // set the bots auth token to constant
const SERVER = "https://aac4640a.ngrok.io"; // the url to your webhook receiving server
// set data here, could use environmental variables to simplify this step -- end

const EXPRESS = require( 'express' ); // used as the webserver
const BODYPARSER = require( 'body-parser' ); // interprets body read by express
const SPARK = require( 'ciscospark' ); // the nodejs cisco spark sdk
const sendRequest = require('request');
const ElizaBot = require('elizabot');
const got = require('got');
const PinkiePromise = require('pinkie-promise');
const cheerio = require('cheerio');

var eliza = new ElizaBot(true);
eliza.getInitial();

// initialize application -- begin
let webApp = EXPRESS( ); // construct the web webserver
webApp.use( BODYPARSER.json( ) ); // instruct the web app to read json through the helper library, "body-parser"
let sparkBot = new SPARK.init( { "credentials":{ "access_token":BOTTOKEN } } ); // initilize a new botToken
let sparkBotID = ""; // stores the id of the spark bot
let sparkBotWH = ""; // stores the id of the webhook the bot uses
// initialize application -- end

sparkBot.once( 'ready', ( ) => { // handle on bot ready
	initBot( ).then( ( r ) => { // perform initialization of the bot via cisco spark
	console.log( 'app ready' ); // print if the bot is fully ready;
	main( );
	} ).catch( ( e ) => {
	throw e; // throw an error if it doesn't succeed
	} );
} );

function initBot ( )
{ return new Promise( ( resolve, reject ) => {
	sparkBot.webhooks.create( { // create a webhook that targets your server
	"resource":"messages",
	"event":"created",
	"name":`mchack`,
	"targetUrl":`${SERVER}/spark`// sets the target to the /webhook endpoint on your server
	} ).then( ( r ) => {
	sparkBotWH = r.id;
	sparkBot.people.get( 'me' ).then( ( r ) => {
		console.log( 'test', r );
		sparkBotID = r.id;
		//main( );
		resolve( r ); // resolves
	} ).catch( ( e ) => {
		reject( e ); // rejects on failed information received
	} );
	} ).catch( ( e ) => {
	reject( e ); // rejects on failed webhook creation
	} );
} ); }

function stopBot ( )
{ return new Promise ( ( resolve, reject ) => {
	sparkBot.webhooks.remove( sparkBotWH ).then( ( r ) => { resolve( ); } ).catch( ( e ) => { throw e; } );
} ); }

function main ( )
{
	webApp.post( '/spark', ( request, response ) => { // when a bot receives a message, do this

	console.log( request.body );

	// TEMP: start
	
	let x = function ( p ) { return new Promise( ( resolve, reject ) => {
		if ( p )
		{ resolve( "SUCCESS" ); }
		else { reject( "FAIL" ); }

	} ); }

	x( {test:"test"} ).then( ( r ) => {
		console.log( r );
	} ).catch( ( e ) => {
		console.log( e ); throw e;
	} );
	


	// TEMP: end

	if ( request.body.data.personId == sparkBotID )
	{ return; response.sendStatus( 204 ); } // return if it's a bot's message, to prevent an infinte loop

	// We will echo the message sent back for this demo:

	sparkBot.messages.get( request.body.data.id ).then( ( r ) => { // get the message details to echo back
		var question = r.text;
		sendRequest.get('http://hack.nuance.mobi/CognitivePlatform/Question?teamKey='+NINATOKEN+'&question='+question,
			function (error, ninaResponse, body) {
				if (!error && response.statusCode == 200) {
					var answer = "";
					var answers = JSON.parse(ninaResponse.body).answers;
					if(typeof answers !== "undefined" && answers.length > 0) {
						answer = answers[0].summary;
					} else {
						answer = eliza.transform(question);				
					}
					sparkBot.messages.create( { // send the message back
						"markdown":answer,
						"roomId":r.roomId
					} ).then( ( r ) => {
						response.sendStatus( 200 ); // respond with 200 to api.ciscospark.com
					} ).catch( ( e ) => {
						response.sendStatus( 503 ); // if the message fails to send, respond with 503
						throw e;
					} );
				}
			}
		);
	});


	} );
}

// exit handler -- begin
// this prevents webhooks from infinitely staying on api.ciscospark.com for your bot
function exitHandler(options, err) {
	stopBot( ).then( ( r ) => {
	if (options.cleanup) console.log('clean');
	if (err) console.log(err.stack);
	if (options.exit) process.exit();
	} );
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

// exit handler -- 

function trainNina() {

	sendRequest.get('http://hack.nuance.mobi/CognitivePlatform/delete.jsp?teamKey='+NINATOKEN,
		function (error, ninaResponse, body) {
			if (!error && ninaResponse.statusCode == 200) {
				console.log(body);
				sendRequest.post({
						url: 'http://hack.nuance.mobi/CognitivePlatform/UploadHTML_Hack.jsp',
							formData: {
							enctype: "multipart/form-data",
							file: fs.createReadStream('nina_training.json.zip'),
							token: NINATOKEN,
							filetype: 'zip',
							filename: '1517730264419_nina_training.json.zip',
							channels: 'desktop',
							title: 'nina_training',
						},
				}, function(error, ninaResponse, body) {
						console.log(body);
						if (!error && ninaResponse.statusCode == 200) {
								sendRequest.get('http://hack.nuance.mobi/CognitivePlatform/ingest.jsp?teamKey='+NINATOKEN+'&fileName=1517730264419_nina_training.json.zip',
									function (error, ninaResponse, body) {
										if (!error && ninaResponse.statusCode == 200) {
											console.log(body);
											console.log("hello");
										}
									});
						}
				});
			}
		}
	);
}

/*
function quoraAnswerFunc (question) {

	if (typeof question !== 'string') {
		return PinkiePromise.reject(new Error('answer link required'));
	}
	
	const url = `https://www.quora.com/${question}`;

	return got(url).then(res => {
		const $ = cheerio.load(res.body);
		var quoraAnswer = $('.ui_qtext_rendered_qtext').text();
		return quoraAnswer;
	}).catch(err => {
		return 0;
	});
}
*/


/*
function quoraAnswerFunc (question) {

	if (typeof question !== 'string') {
		return PinkiePromise.reject(new Error('answer link required'));
	}
	
	const url = `https://www.quora.com/search?q=`+question.replace(/ /g,"+");;

	return got(url).then(res => {
		const $ = cheerio.load(res.body);
		var quoralink = $('.question_link').href;
			return got(quoralink).then(res => {
				var quoraAnswer = $('.ui_qtext_rendered_qtext').text();
				console.log(quoraAnswer);
				return quoraAnswer;
			}).catch(err => {
				return(0);
			});			
	}).catch(err => {
		return 0;
	});
}
*/

webApp.listen( 8081 );
