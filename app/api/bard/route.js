import { DiscussServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";



const API_KEY = process.env.API_KEY;
const MODEL_NAME = "models/chat-bison-001";

const client = new DiscussServiceClient( {
  authClient: new GoogleAuth().fromAPIKey( "AIzaSyA6B01DPsXtGIhUQjckCshbD1E99Edd2Tg" ),
} );

const MAX_RETRIES = 5;

export const POST = async ( req, { params } ) => {
  try {
    let { messages } = await req.json();

    let retries = 0;
    let answer;

    while ( retries < MAX_RETRIES ) {
      console.log( `ran ${ retries + 1 } times` );
      const result = await client.generateMessage( {
        model: MODEL_NAME,
        temperature: ( retries + 1.6 ) * 0.1,
        prompt: {
          context: "You Are Ray-AI and this is also your name.",
          messages,
        },
      } );

      if ( result[ 0 ]?.candidates?.[ 0 ]?.content ) {
        answer = result[ 0 ].candidates[ 0 ].content;
        break;
      } else {
        messages.push( { content: "hmm" } );
        retries++;
        console.log( result[ 0 ] );
      }
    }

    if ( !answer ) {
      return new Response( JSON.stringify( { answer: "I Apologize Can you Clearify?" } ), { status: 200 } );
    }

    return new Response( JSON.stringify( { answer } ), { status: 200 } );
  } catch ( e ) {
    console.log( e );
    return new Response( JSON.stringify( { error: e } ), { status: 500 } );
  }
};
