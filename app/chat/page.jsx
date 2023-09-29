"use client";

import { useEffect, useState } from 'react';
import Chat from '../Components/Chat/chat';
import { useMessages } from '../Contexts/MessagesContext/MessagesContext';
import { signIn, useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import styles from "./page.module.css";

const page = () => {
  const { data: session } = useSession();
  const [ signedIn, setSignedIn ] = useState( false );

  useEffect( () => {
    if ( session?.user ) {
      setSignedIn( true );
    } else {
      setSignedIn( false );
    }
  }, [ session ] );

  const [ prompt, setPrompt ] = useState( {
    value: ""
  } );

  const { messages, setMessages } = useMessages();

  return (
    <>
      { signedIn ? (
        <Chat prompt={ prompt } setPrompt={ setPrompt } messages={ messages } setMessages={ setMessages } />
      ) : (
        <button className={ styles[ 'google-btn' ] } onClick={ () => signIn( "google" ) } type="button"><FontAwesomeIcon className={ styles[ 'google-icon' ] } icon={ faGoogle } /><span>Continue with Google</span></button>
      ) }
    </>
  );
};

export default page;