"use client";

import { useEffect, useState } from 'react';
import Chat from './Components/Chat/chat';
import { useMessages } from './Contexts/MessagesContext/MessagesContext';
import { signIn, useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import styles from "./page.module.css";
import Loading from './loading';



const page = () => {
  const { data: session, status } = useSession();
  const [ signedIn, setSignedIn ] = useState( false );

  useEffect( () => {
    if ( session?.user ) {
      setSignedIn( true );
    } else {
      setSignedIn( false );
    }
  }, [ session ] );

  const { messages, setMessages } = useMessages();

  return (
    <>
      { signedIn && status != "loading" ? (
        <Chat messages={ messages } setMessages={ setMessages } />
      ) : status == "loading" ? (
        <Loading />
      ) : (
        <button className={ styles[ 'google-btn' ] } onClick={ () => signIn( "google" ) } type="button"><FontAwesomeIcon className={ styles[ 'google-icon' ] } icon={ faGoogle } /><span>Continue with Google</span></button >
      ) }
    </>
  );
};

export default page;