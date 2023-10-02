"use client";

import styles from "./chat.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered, faPaperPlane, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useTheme } from "../../Contexts/ThemeContext/ThemeContext";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { insertData } from "@/app/Supabase/Supabase";
import { v4 as uuid } from "uuid";

import Message from "../Message/Message";
import { useRouter, usePathname, useParams } from "next/navigation";


const Chat = ( { prompt, setPrompt, messages, setMessages } ) => {

  const { data: session } = useSession();
  const { darkMode } = useTheme();
  const [ processing, setProcessing ] = useState( false );
  const [ abortController, setAbortController ] = useState( null );
  const [ newPrompt, setNewPrompt ] = useState( [] );
  const [ pageRendered, setPageRendered ] = useState( false );
  const [ hash, setHash ] = useState( "" );

  useEffect( () => {
    if ( typeof window !== "undefined" ) {
      setHash( window.location.hash.slice( 1 ) );
    }
  }, [] );

  const msgsRef = useRef();

  const scrollToMessage = () => {
    const messageElement = document.getElementById( hash );

    if ( messageElement ) {
      messageElement.scrollIntoView( { behavior: 'smooth' } );
    }
  };

  useEffect( () => {
    console.log( hash );
    if ( hash.trim().length ) scrollToMessage();
  }, [ hash, pageRendered ] );

  const send = async () => {
    if ( prompt.value.trim().length ) {

      let key = uuid();

      setPrompt( prev => ( { ...prev, value: "" } ) );
      setMessages( prev => [ ...prev, { content: prompt.value, agent: "user", key } ] );

      setNewPrompt( prev => [ ...prev, { value: prompt.value, key } ] );

    }
  };

  useEffect( () => {

    const controller = new AbortController();
    setAbortController( controller );

    const SendPrompt = async ( prompts ) => {

      try {
        if ( messages[ messages.length - 1 ].agent.toLowerCase() != "ai" ) {

          setProcessing( true );

          const body = await fetch( "/api/bard", {
            method: "POST",
            body: JSON.stringify( {
              messages: prompts
            } ),
            signal: controller.signal
          } );

          let response = await body.json();

          console.log( response );

          if ( "answer" in response && response.answer.trim().length ) {

            let key = uuid();

            setMessages( prev => [ ...prev, { content: response.answer, agent: "AI", key } ] );
            setNewPrompt( prev => [ ...prev, { value: response.answer, key } ] );

          }
        }
      } catch ( e ) {
        console.log( e );
      } finally {
        setProcessing( false );
      }

    };

    if ( messages.length ) {

      let isNearBottom = msgsRef.current.scrollHeight - msgsRef.current.clientHeight - msgsRef.current.scrollTop <= 250;
      let prompts = messages.map( item => ( { content: item.content } ) );
      SendPrompt( prompts );

      if ( isNearBottom ) {
        msgsRef.current.scroll( 0, msgsRef.current.scrollHeight );
      }

      if ( !pageRendered ) {
        msgsRef.current.scroll( 0, msgsRef.current.scrollHeight );
      }

      setPageRendered( true );

    }

  }, [ messages ] );

  useEffect( () => {
    if ( newPrompt.length == 2 ) {

      const sendMsg = async () => {
        try {

          let currentDate = new Date();

          let body = await insertData( {
            table: "prompts",
            object: {
              author: session?.user.id,
              prompt: newPrompt,
              created_at: `${ currentDate.getDate() }-${ currentDate.toLocaleString( 'default', { month: 'long' } ).substring( 0, 3 ) } ${ currentDate.getFullYear() }`
            }
          } );

          console.log( body );

        } catch ( e ) {
          console.log( e );
        } finally {
          setNewPrompt( [] );
        }
      };

      sendMsg();

    }
    console.log( "newPrompt: ", newPrompt );

  }, [ newPrompt ] );

  const handleTermination = () => {
    if ( abortController ) {
      abortController.abort();
      setProcessing( false );
      setNewPrompt( [] );
    }
  };

  const handleSubmit = e => {
    if ( e.key == "Enter" && !e.shiftKey ) {
      e.preventDefault();
      send();
    }
  };

  function debounce ( func, delay ) {
    let timeoutId;
    return function ( ...args ) {
      clearTimeout( timeoutId );
      timeoutId = setTimeout( () => {
        func.apply( this, args );
      }, delay );
    };
  }

  const handleInputChange = useCallback( ( e ) => {
    setPrompt( prev => ( { ...prev, value: e.target.value } ) );
    debounce( ( e ) => {
      let availableHeight = ( e.target.scrollHeight / window?.innerWidth ) * 100;
      console.log( availableHeight );

      let text = e.target.value;
      let numberOfLines = text.split( "\n" ).length;
      console.log( numberOfLines );
      // e.target.style.height = Math.max( ( numberOfLines * 34 ), 46 ) + "px";
      if ( numberOfLines < 4 ) {
        e.target.style.height = Math.max( numberOfLines * 2.55, 3.45 ) + "vw";
      }
      if ( numberOfLines >= 4 ) {
        e.target.style.height = Math.min( availableHeight, 9.75 ) + 'vw';
      }
    }, 300 );
  }, [] );

  function handleExampleCopy ( e ) {
    let text = e.target.innerText;
    text = [ ...text ];

    text.pop();
    text.shift();
    text = text.join( "" );

    navigator.clipboard.writeText( text );
  }

  return (
    <>
      { !messages.length && (
        <>
          <Image
            src={ darkMode ? "/logo.png" : "/logo-dark.png" }
            alt='logo'
            width={ 100 }
            height={ 65 }
            className={ `${ styles[ 'placeholder-img' ] } ${ !darkMode ? styles[ "light" ] : "" }` }
          />
          <h1 className={ `${ styles[ 'title' ] } ${ !darkMode ? styles[ "light" ] : "" }` }><span className={ styles[ 'highlight' ] }>RayAI:{ " " }</span>Your Personal AI.</h1>
          <div className={ `${ styles[ "examples" ] } ${ !darkMode ? styles[ "light" ] : "" }` }>
            <div className={ styles[ "example" ] }>
              <div className={ styles[ "header" ] }>
                <FontAwesomeIcon className={ styles[ 'example-icon' ] } icon={ faBarsStaggered } />
                <span>Example</span>
              </div>
              <div className={ styles[ "columns" ] }>
                <p className={ styles[ "col" ] } onClick={ handleExampleCopy }>{ `"Tell me about the history of Eiffel Tower."` }</p>
                <p className={ styles[ "col" ] } onClick={ handleExampleCopy }>{ `"Give me information related to EarthQuakes."` }</p>
                <p className={ styles[ "col" ] } onClick={ handleExampleCopy }>{ `"Calculate the derivative of the function : 4x + 9"` }</p>
              </div>
            </div>
            <div className={ styles[ "example" ] }>
              <div className={ styles[ "header" ] }>
                <FontAwesomeIcon className={ styles[ 'example-icon' ] } icon={ faTriangleExclamation } />
                <span>Limitations</span>
              </div>
              <div className={ styles[ "columns" ] }>
                <p className={ styles[ "col" ] }>{ `May Somatimes produce in-accurate Results.` }</p>
                <p className={ styles[ "col" ] }>{ `Might Create Harmful or Biased Content.` }</p>
                <p className={ styles[ "col" ] }>{ `Limited Knowledge.` }</p>
              </div>
            </div>
          </div>
        </>
      ) }
      <div className={ `${ styles[ "msgs" ] } ${ !darkMode ? styles[ "light" ] : "" }` } ref={ msgsRef }>

        { messages.map( ( msg, key ) => (
          <Message key={ key } msg={ msg } session={ session } styles={ styles } />
        ) ) }
      </div>
      <button onClick={ handleTermination } className={ `${ styles[ "terminate" ] } ${ processing ? styles[ "processing" ] : "" }` }>Terminate...</button>
      <div className={ `${ styles[ "input" ] } ${ !darkMode ? styles[ "light" ] : "" }` }>
        <textarea onKeyDown={ handleSubmit } rows={ 1 } type="text" placeholder='Enter Prompt' onInput={ handleInputChange } value={ prompt.value } />
        <button type='button' onClick={ send }>
          <FontAwesomeIcon icon={ faPaperPlane } />
        </button>
      </div>
      <p className={ styles[ 'note' ] }>Free Research Preview. RayAI may produce inaccurate information about people, places, or facts.</p>
    </>
  );
};

export default memo( Chat );