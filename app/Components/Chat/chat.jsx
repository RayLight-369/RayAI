"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered, faChevronDown, faPaperPlane, faStop, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import { useChat } from "ai/react";
import { useTheme } from "../../Contexts/ThemeContext/ThemeContext";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { insertData } from "@/app/Supabase/Supabase";
import { v4 as uuid } from "uuid";
import Image from 'next/image';
import styles from "./chat.module.css";
import Message from "../Message/Message";
import { isMobileDevice } from '@/app/Contexts/IsMobileContext/IsMobileContext';


const Chat = ( { messages, setMessages, Msgsloading } ) => {

  const { data: session } = useSession();
  const { darkMode } = useTheme();
  const [ newPrompt, setNewPrompt ] = useState( [] );
  const [ pageRendered, setPageRendered ] = useState( false );
  const [ hash, setHash ] = useState( "" );
  const [ buttonToBottom, setbuttonToBottom ] = useState( false );
  const { isMobile, setIsMobile } = isMobileDevice();

  const { messages: msgs, input, handleInputChange: inputChange, handleSubmit, stop, isLoading } = useChat( {
    id: "_RAY_AI_CHAT_",
    initialMessages: messages,
    onFinish: ( msg ) => {
      setNewPrompt( prev => [ ...prev, { value: msg.content, key: msg.id } ] );
    }
  } );

  useEffect( () => {

    if ( typeof window !== "undefined" ) {
      setHash( window.location.hash.slice( 1 ) );
    }

    const handleResize = () => setIsMobile( window.innerWidth <= 767 );

    handleResize();

    window.addEventListener( "resize", handleResize );

    const scrollEvent = e => {

      let element = e.target;

      if ( element.scrollHeight - element.clientHeight - element.scrollTop >= 2000 ) setbuttonToBottom( true );
      else setbuttonToBottom( false );

    };

    let msgsDiv = document.getElementsByClassName( styles[ "msgs" ] )[ 0 ];
    msgsDiv.addEventListener( "scroll", scrollEvent );

    return () => {
      window.removeEventListener( "resize", handleResize );
      msgsDiv.removeEventListener( "scroll", scrollEvent );
    };

  }, [] );

  useEffect( () => {
    console.log( "isLoading: ", isLoading );
  }, [ isLoading ] );

  const msgsRef = useRef();

  const debounce = ( func, delay ) => {
    let timeoutId;
    return function ( ...args ) {
      clearTimeout( timeoutId );
      timeoutId = setTimeout( () => {
        func.apply( this, args );
      }, delay );
    };
  };


  const scrollToMessage = () => {
    const messageElement = document.getElementById( hash );

    if ( messageElement ) {
      messageElement.scrollIntoView( { behavior: 'smooth' } );
    }
  };

  useEffect( () => {

    if ( hash.trim().length ) scrollToMessage();

  }, [ hash, pageRendered ] );

  const send = async ( e ) => {

    if ( input.trim().length && !isLoading ) {

      let key = uuid();

      handleSubmit( e );

      setNewPrompt( prev => [ ...prev, { value: input, key } ] );

    }

  };

  const debouncedScrollToBottom = debounce( () => {
    let isNearBottom = msgsRef.current.scrollHeight - msgsRef.current.clientHeight - msgsRef.current.scrollTop <= 250;

    if ( isNearBottom ) {

      msgsRef.current.scrollTo( {
        top: msgsRef.current.scrollHeight,
        // behavior: "smooth"
      } );

      // msgsRef.current.scrollIntoView( { behavior: 'smooth', block: 'end' } );

    }

  }, 1000 );

  useEffect( () => {
    if ( msgs.length ) {

      debouncedScrollToBottom();

      if ( !pageRendered ) {
        msgsRef.current.scroll( 0, msgsRef.current.scrollHeight );
      }

      setPageRendered( true );
    }
  }, [ msgs ] );

  useEffect( () => {

    console.log( "useffectt newPromp: ", newPrompt );

    if ( newPrompt.length == 2 ) {

      setMessages( prev => [ ...prev,
      { content: newPrompt[ 0 ].value, role: "user", key: newPrompt[ 0 ].key },
      { content: newPrompt[ 1 ].value, role: "assistant", key: newPrompt[ 1 ].key }
      ] );

      const sendMsg = async () => {
        try {

          let currentDate = new Date();

          await insertData( {
            table: "prompts",
            object: {
              author: session?.user.id,
              prompt: newPrompt,
              created_at: `${ currentDate.getDate() }-${ currentDate.toLocaleString( 'default', { month: 'long' } ).substring( 0, 3 ) } ${ currentDate.getFullYear() }`
            }
          } );

        } catch ( e ) {
          console.log( e );
        } finally {
          setNewPrompt( [] );
        }
      };

      sendMsg();

    }


  }, [ newPrompt ] );

  const handleTermination = () => {
    // setProcessing( false );
    stop();
    setNewPrompt( [] );
  };

  const handleInputSubmit = e => {
    if ( e.key == "Enter" && !e.shiftKey && !isLoading && !isMobile ) {
      // e.preventDefault();
      send( e );
    } else if ( isMobile && e.key == "Enter" ) {
      return;
    }
  };

  const handleInputChange = useCallback( ( e ) => {

    inputChange( e );

    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';

  }, [] );

  function handleExampleCopy ( e ) {
    let text = e.target.innerText;
    text = [ ...text ];

    text.pop();
    text.shift();
    text = text.join( "" );

    navigator.clipboard.writeText( text );
  }

  function handleBottomButtonClick () {
    msgsRef.current.scrollTo( {
      top: msgsRef.current.scrollHeight,
      behavior: "smooth"
    } );
  }

  return (
    <>
      { ( !msgs.length && !Msgsloading ) && (
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
        { msgs.map( ( m, i, a ) => (
          <>
            <Message id={ m.key } msg={ m } session={ session } key={ i } styles={ styles } />

            { ( () => {

              if ( i == a.length - 1 ) {
                if ( m.role == "user" && isLoading ) {
                  return (
                    <Message id={ "" } msg={ { content: "...", id: "", role: "assistant" } } session={ session } key={ i + 1 } styles={ styles } />
                  );
                }
              }

            } )() }
          </>
        ) ) }
      </div>
      {/* { !isMobile && (
        <button onClick={ handleTermination } className={ `${ styles[ "terminate" ] } ${ isLoading ? styles[ "processing" ] : "" }` }>Terminate...</button>
      )} */}
      { buttonToBottom && (
        <button onClick={ handleBottomButtonClick } type='button' className={ styles[ "to-bottom" ] }><FontAwesomeIcon icon={ faChevronDown } /></button>
      ) }
      <div className={ `${ styles[ "input" ] } ${ !darkMode ? styles[ "light" ] : "" }` }>
        <textarea rows={ 1 } onKeyDown={ handleInputSubmit } type="text" placeholder='Enter Prompt' onInput={ handleInputChange } value={ input } />
        <button type='button' title={ isLoading ? "Terminate" : "Send" } onClick={ !isLoading ? send : handleTermination }>
          { !isLoading ? (
            <FontAwesomeIcon icon={ faPaperPlane } />
          ) : (
            <FontAwesomeIcon icon={ faStop } />
          ) }
        </button>
      </div>
      <p className={ styles[ 'note' ] }>Free Research Preview. RayAI may produce inaccurate information about people, places, or facts.</p>
    </>
  );
};

export default memo( Chat );