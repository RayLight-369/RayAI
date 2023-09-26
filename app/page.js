"use client";

import { signIn, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Chat from './Components/Chat/chat';
import styles from "./home.module.css";
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  useEffect( () => router.replace( "/chat" ), [] );
  const { data: session } = useSession();
  const [ messages, setMessages ] = useState( [] );
  const [ prompt, setPrompt ] = useState( {
    value: "",
  } );

  const handleSubmit = async () => {
    try {
      const response = await fetch( "/api/bard", {
        method: "POST",
        body: JSON.stringify( {
          prompt
        } )
      } );

      setPrompt( prev => ( { ...prev, value: "" } ) );

      if ( response.ok ) {
        let body = await response.json();
        console.log( body );

        setMessages( prev => [ ...prev, {
          agent: "user",
          text: prompt.value
        }, {
          agent: "AI",
          text: body.answer
        } ] );
      }

    } catch ( e ) {
      console.log( e );
    }
  };

  return (
    <div className={ styles.chat }>

      {/* <button onClick={ () => signIn( "google" ) }>Continue with Google</button> */ }
      <Chat messages={ messages } prompt={ prompt } setPrompt={ setPrompt } handleSubmit={ handleSubmit } />
    </div>
  );
};

export default page;