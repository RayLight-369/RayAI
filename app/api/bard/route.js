import { DiscussServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = process.env.API_KEY;

const client = new DiscussServiceClient( {
  authClient: new GoogleAuth().fromAPIKey( "AIzaSyA6B01DPsXtGIhUQjckCshbD1E99Edd2Tg" ),
} );


export const POST = async ( req, { params } ) => {

  try {
    let { messages } = await req.json();

    const result = await client.generateMessage( {
      model: MODEL_NAME,
      prompt: {
        context: "You Are Ray-AI and this is also your name.",
        messages
      },
    } );

    if ( result?.[ 0 ]?.candidates?.[ 0 ]?.content ) {
      return new Response( JSON.stringify( { answer: result[ 0 ].candidates[ 0 ].content } ), { status: 200 } );
    } else {
      return new Response( JSON.stringify( { answer: "I am sorry can you Repeat?" } ), { status: 200 } );
    }


  } catch ( e ) {
    console.log( e );
    return new Response( JSON.stringify( { error: e } ), { status: 500 } );
  }

};