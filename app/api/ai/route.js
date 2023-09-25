import openai from "openai";

const AI = new openai( {
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  organization: process.env.NEXT_PUBLIC_OPENAI_ORG,
  dangerouslyAllowBrowser: true,
} );


export async function POST ( req ) {
  try {

    const response = await AI.completions.create( {
      model: "gpt-3.5-turbo",
      prompt: "Hello how are you?",
      max_tokens: 50,
      temperature: 0.5
    } );

    return new Response( { response }, { status: 200 } );

  } catch ( e ) {
    console.log( e );
  }
}