"use client";
import { getCurrentSession, getUser } from '@/Provider/Provider';
import { getData } from '@/app/Supabase/Supabase';
import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useEffect, useState } from 'react';

const MessagesContext = createContext();

export const useMessages = () => {
  return useContext( MessagesContext );
};


function convertArray ( inputArray ) {
  const outputArray = new Array( inputArray.length * 2 );
  for ( let i = 0, j = 0; i < inputArray.length; i++ ) {
    outputArray[ j++ ] = { content: inputArray[ i ][ 0 ], agent: "user" };
    outputArray[ j++ ] = { content: inputArray[ i ][ 1 ], agent: "ai" };
  }
  return outputArray;
}

// function convertArray ( inputArray ) {
//   return inputArray.flatMap( ( [ userContent, aiContent ] ) => [
//     { content: userContent, agent: "user" },
//     { content: aiContent, agent: "ai" },
//   ] );
// }

const MessagesProvider = ( { children } ) => {

  // const { data: session } = useSession()
  const [ messages, setMessages ] = useState( [] );
  const [ renderedTimes, setRenderedTimes ] = useState( 0 );

  useEffect( () => {

    const fetchMessages = async () => {

      let { session, signedIn } = await getUser();
      if ( signedIn ) {

        try {

          let { data: prompts } = await getData( {
            table: "prompts",
            columns: "prompt",
            orderBy: {
              property: "id",
              ascending: true
            },
            where: {
              author: `${ session.user.id }`
            }
          } );

          if ( prompts.length ) {
            console.time( "start" );
            setMessages( [ ...convertArray( prompts.map( prompt => prompt.prompt ) ) ] );
            console.timeEnd( "start" );
          }

        } catch ( e ) {
          console.log( e );
        }
      }

    };

    fetchMessages();

  }, [] );

  return (
    <MessagesContext.Provider value={ { messages, setMessages, renderedTimes } }>{ children }</MessagesContext.Provider>
  );
};

export default MessagesProvider;