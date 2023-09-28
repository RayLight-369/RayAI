"use client";

import styles from "./chat.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered, faPaperPlane, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useTheme } from "../../Contexts/ThemeContext/ThemeContext";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { marked } from "marked";
import MarkdownRenderer from "../MarkdownRenderer/MarkdownRenderer";

const Chat = ( { prompt, setPrompt, messages, setMessages } ) => {

  const { data: session } = useSession();
  const { darkMode } = useTheme();
  const [ processing, setProcessing ] = useState( false );
  const [ abortController, setAbortController ] = useState( null );

  const msgsRef = useRef();

  const send = async () => {
    if ( prompt.value.trim().length ) {
      setPrompt( prev => ( { ...prev, value: "" } ) );
      setMessages( prev => [ ...prev, { content: prompt.value, agent: "user" } ] );
    }
  };

  useEffect( () => {

    const controller = new AbortController();
    setAbortController( controller );

    const SendPrompt = async ( prompts ) => {

      try {
        if ( messages[ messages.length - 1 ].agent != "AI" ) {

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
            setMessages( prev => [ ...prev, { content: response.answer, agent: "AI" } ] );
          }
        }
      } catch ( e ) {
        console.log( e );
      } finally {
        setProcessing( false );
      }

    };

    if ( messages.length ) {
      console.log( messages );
      let prompts = messages.map( item => ( { content: item.content } ) );
      console.log( "prompts: ", prompts );
      SendPrompt( prompts );
      msgsRef.current.scroll( 0, msgsRef.current.scrollHeight );
    }

  }, [ messages ] );

  const handleTermination = () => {
    if ( abortController ) {
      abortController.abort();
      setProcessing( false );
    }
  };

  const handleSubmit = e => {
    if ( e.key == "Enter" && !e.shiftKey ) {
      e.preventDefault();
      send();
    }
  };

  const handleInputChange = useCallback( ( e ) => {
    setPrompt( prev => ( { ...prev, value: e.target.value } ) );
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
  }, [] );

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
                <p className={ styles[ "col" ] }>{ `"Tell me about the history of Eiffel Tower."` }</p>
                <p className={ styles[ "col" ] }>{ `"Give me information related to EarthQuakes."` }</p>
                <p className={ styles[ "col" ] }>{ `"Calculate the derivative of the function : 4x + 9"` }</p>
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
          <div key={ key } className={ msg.agent == "user" ? styles[ "user" ] : styles[ "ai" ] }
            style={ {
              animation: "msg ease-in-out 2s 1"
            } }>
            <Image
              src={ msg.agent.toLowerCase() != "user" ? "/RayAI.png" : session?.user.image }
              alt='img'
              width={ 50 }
              height={ 50 }
              className={ styles[ 'text-pic' ] }
            />
            {/* <p key={ key } className={ styles[ "msg" ] }>{ marked( msg.content ) }</p> */ }
            <MarkdownRenderer text={ msg.content } optionsClassName={ styles[ "code-options" ] } className={ styles[ "markdown-content" ] } />

          </div>
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