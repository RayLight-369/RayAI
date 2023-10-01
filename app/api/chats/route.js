import { insertData } from "@/app/Supabase/Supabase";

export const POST = async ( req ) => {
  try {

    let body = await req.json();

    let response = await insertData( {
      table: "prompts",
      object: body
    } );

    console.log( response );

    if ( response?.data.length ) {
      return new Response( JSON.stringify( { response } ), { status: 200 } );
    }

    return new Response( JSON.stringify( { error: "No Prompts inserted" } ), { status: 404 } );

  } catch ( e ) {
    console.log( e );
    return new Response( JSON.stringify( { error: e } ), { status: 500 } );
  }
};

//body : {author , prompt, created_at}