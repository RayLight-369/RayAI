// // import { OpenAIStream, StreamingTextResponse } from "ai";
// // import OpenAI from "openai";

// // const openai = new OpenAI( {
// //   apiKey: process.env.OPENAI_API_KEY,
// // } );

// // export const runtime = 'edge';

// // export async function POST ( req ) {
// //   try {
// //     const { messages } = await req.json();
// //     const response = await openai.chat.completions.create( {
// //       model: 'gpt-3.5-turbo',
// //       stream: true,
// //       messages,
// //     } );
// //     const stream = OpenAIStream( response );
// //     return new StreamingTextResponse( stream );
// //   } catch ( e ) {
// //     console.log( e );
// //     return null;
// //   }
// // }


// import { HfInference } from '@huggingface/inference';
// import { HuggingFaceStream, StreamingTextResponse } from 'ai';
// import { experimental_buildOpenAssistantPrompt } from 'ai/prompts';


// const Hf = new HfInference( "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" );


// export const runtime = 'edge';

// export async function POST ( req ) {
//   try {

//     const { messages } = await req.json();

//     const response = await Hf.textGenerationStream( {
//       model: 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5',
//       inputs: experimental_buildOpenAssistantPrompt( messages ),
//       parameters: {
//         max_new_tokens: 1000,
//         // @ts-ignore (this is a valid parameter specifically in OpenAssistant models)
//         typical_p: 0.2,
//         repetition_penalty: 1,
//         truncate: 1000,
//         return_full_text: false,
//       }
//     } );


//     const stream = HuggingFaceStream( response );


//     return new StreamingTextResponse( stream );

//   } catch ( e ) {
//     console.log( e );
//   }
// }


export async function POST ( req ) {
  const { input, new_convo } = await req.json();

  try {

    const response = await fetch( "https://AIONS.pythonanywhere.com/api/huggingface", {
      method: "POST",
      body: JSON.stringify( {
        prompt: input,
        chatbot_model: 0,
        web_search: true,
        new_conversation: new_convo
      } ),
      headers: {
        'Content-Type': 'application/json',
      }
    } );

    if ( response.ok ) {
      const body = await response.json();
      return new Response( JSON.stringify( { body } ), { status: 200 } );
    }

    console.log( await response.json() );

  } catch ( e ) {
    console.log( e );
    return new Response( JSON.stringify( { error: e } ), { status: 500 } );
  }
}