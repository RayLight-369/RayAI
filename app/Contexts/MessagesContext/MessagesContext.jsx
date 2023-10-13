"use client";
import { getUser } from '@/Provider/Provider';
import { getData } from '@/app/Supabase/Supabase';
import { createContext, useContext, useEffect, useState } from 'react';

const MessagesContext = createContext();

export const useMessages = () => {
  return useContext( MessagesContext );
};


function convertArray ( inputArray ) {
  const outputArray = [];

  for ( const [ user, assistant ] of inputArray ) {
    const userValue = user.value;
    const assistantValue = assistant.value;

    if ( userValue.trim().length && assistantValue.trim().length ) {
      outputArray.push(
        { content: userValue, role: "user", key: user.key },
        { content: assistantValue, role: "assistant", key: assistant.key }
      );
    }
  }

  return outputArray;
}


const MessagesProvider = ( { children } ) => {

  const [ messages, setMessages ] = useState( [] );
  const [ Msgsloading, setMsgsLoading ] = useState( true );

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
        } finally {
          setMsgsLoading( false );
        }
      }

    };

    fetchMessages();

  }, [] );

  return (
    <MessagesContext.Provider value={ { messages, setMessages, Msgsloading } }>{ children }</MessagesContext.Provider>
  );
};

export default MessagesProvider;