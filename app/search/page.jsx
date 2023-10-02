"use client";

import { useEffect, useRef, useState } from 'react';
import styles from "./page.module.css";
import { useMessages } from '../Contexts/MessagesContext/MessagesContext';
import Message from '../Components/Message/Message';
import { useTheme } from '../Contexts/ThemeContext/ThemeContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const Search = () => {

  const { messages, setMessages } = useMessages();
  const { darkMode, _ } = useTheme();
  const { data: session } = useSession();
  const [ prompts, setPrompts ] = useState( [] );
  const router = useRouter();
  const msgsRef = useRef();

  const handleInputChange = ( e ) => {
    let filteredMessages = messages.filter( ( message ) => message.content.toLowerCase().includes( e.target.value.toLowerCase() ) );
    setPrompts( [ ...filteredMessages ] );

    if ( e.target.value.trim().length == 0 ) {
      setPrompts( [] );
    }
  };


  return (
    <div className={ styles[ "search-container" ] }>
      <div className={ styles[ "input" ] }>
        <input type={ styles[ "text" ] } onChange={ handleInputChange } placeholder='Search Message' />
      </div>
      { !prompts.length && (
        <p className={ styles[ 'placeholder' ] }>No Messages :(</p>
      ) }
      <div className={ `${ styles[ "msgs" ] } ${ !darkMode ? styles[ "light" ] : "" }` } ref={ msgsRef }>
        { prompts.map( ( msg, key ) => (
          <Message onClick={ () => {
            router.replace( "/#" + msg.key, { scroll: false } );
          } } key={ key } msg={ msg } session={ session } styles={ styles } />
        ) ) }
      </div>
    </div>
  );
};

export default Search;