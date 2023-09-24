import Bard from "bard-ai";

// const BARD = new Bard( {
//   "__Secure-1PSID": "bAihakw3sgexoJtPe1JBXNSxs6jHsG2nO3jPtQec6oyRnkkFKFJO7PmXb9MQUgxzZqbD8g.",
//   "__Secure-3PSIDCC": "APoG2W8aHcp1H4w-WyilWthk2HO8CkgeBo3hIRVOeH_BnMdUqGwAzDt7rPREYk59eb8LO8uLHw",
//   "__Secure-1PSIDTS": "sidts-CjEB3e41hXKnFPQjaMddpZN9gML5Mg1U-C4dTlMKxUZkikFE8E9uG5aHCAcSka3QvuzEEAA",
//   "__Secure-3PSID": "awihal5VXpVxPCPJzZNq85rUa5f3UfSUQhI82j8NHQkNvIbLT4F3RfSu9ya3yD4ONY4EXA.",
//   "__Secure-1PSIDCC": "APoG2W_hnoPhA2_UKQ9uudOIvSAzvFMDPTrlnOBO3kK5gn725Fb0QBADDzj514kkT2i_0wd5",
//   "__Secure-3PAPISID": "hEhzMKg_40QNUACj/AcDWGXiB845cWY2o7",
//   "__Secure-1PAPISID": "hEhzMKg_40QNUACj/AcDWGXiB845cWY2o7",
//   "__Secure-3PSIDTS": "sidts-CjEB3e41hXKnFPQjaMddpZN9gML5Mg1U-C4dTlMKxUZkikFE8E9uG5aHCAcSka3QvuzEEAA"
// } );

const BARD = new Bard( "bQihaqdMToILKLOCRr7M7tKAwwKPyi7Ijcrsjj6KiuIIGqOyDkN15IQQ5N8DIyH6S-bWsw." );


const bard = BARD.createChat();

export const POST = async ( req, { params } ) => {
  const { prompt } = await req.json();
  try {
    const response = await bard.ask( prompt.value );
    return new Response( JSON.stringify( { answer: response } ), { status: 200 } );
  } catch ( e ) {
    console.log( e );
    return new Response( JSON.stringify( { error: e.message } ), { status: 500 } );
  }
};