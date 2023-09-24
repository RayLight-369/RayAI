"use client";

import React from 'react';
import styles from "./chat.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered, faGear, faGears, faMagnifyingGlass, faPaperPlane, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faMessage } from '@fortawesome/free-regular-svg-icons';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';


const Chat = ( { prompt, setPrompt, handleSubmit, messages } ) => {

  const { data: session } = useSession();

  const handleInputChange = ( e ) => {
    setPrompt( prev => ( { ...prev, value: e.target.value } ) );
    let availableHeight = e.target.scrollHeight;
    console.log( availableHeight );

    let text = e.target.value;
    let numberOfLines = text.split( "\n" ).length;
    console.log( numberOfLines );
    // e.target.style.height = Math.max( ( numberOfLines * 34 ), 46 ) + "px";
    if ( numberOfLines < 4 ) {
      e.target.style.height = Math.max( numberOfLines * 34, 46 ) + "px";
    }
    if ( numberOfLines >= 4 ) {
      e.target.style.height = Math.min( availableHeight, 130 ) + 'px';
    }
  };

  return (
    <div className={ styles[ "chat-container" ] }>
      <div className={ styles[ "previous-chats" ] }>
        <div className={ styles[ "logo" ] }>
          <Image
            src={ "/logo.png" }
            alt='logo'
            width={ "100" }
            height={ "70" }
          />

        </div>
        <div className={ styles[ "links" ] }>
          <Link href={ "/" }><FontAwesomeIcon className={ styles[ 'link-icons' ] } icon={ faMessage } />&nbsp;&nbsp;&nbsp;Chats</Link>
          <Link href={ "/" }><FontAwesomeIcon className={ styles[ 'link-icons' ] } icon={ faMagnifyingGlass } />&nbsp;&nbsp;&nbsp;Search</Link>
          <Link href={ "/" }><FontAwesomeIcon className={ styles[ 'link-icons' ] } icon={ faEnvelope } />&nbsp;&nbsp;&nbsp;Support</Link>
          <Link href={ "/" }><FontAwesomeIcon className={ styles[ 'link-icons' ] } icon={ faGears } />&nbsp;&nbsp;&nbsp;Settings</Link>
        </div>
      </div>
      <div className={ styles[ "chat" ] }>
        <Image
          src={ "/logo.png" }
          alt='logo'
          width={ 100 }
          height={ 65 }
          className={ styles[ 'placeholder-img' ] }
        />
        <h1 className={ styles[ 'title' ] }><span className={ styles[ 'highlight' ] }>RayAI:{ " " }</span>Your Personal AI.</h1>
        <div className={ styles[ "examples" ] }>
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
        <div className={ styles[ "msgs" ] }>

          { messages.map( ( msg, key ) => (
            <div key={ key } className={ msg.agent == "user" ? styles[ "user" ] : styles[ "ai" ] }>
              <Image
                src={ msg.agent.toLowerCase() != "user" ? "/RayAI.jpg" : "/user.jpg" }
                alt='AI'
                width={ 50 }
                height={ 50 }
                className={ styles[ 'ai-pic' ] }
              />
              <p key={ key } className="msg">{ msg.text }</p>
            </div>
          ) ) }
        </div>
        <div className={ styles[ "input" ] }>
          <textarea rows={ 1 } type="text" placeholder='Enter Prompt' onInput={ handleInputChange } value={ prompt.value } />
          <button type='button' onClick={ handleSubmit }>
            <FontAwesomeIcon icon={ faPaperPlane } />
          </button>
        </div>
        <p className={ styles[ 'note' ] }>Free Research Preview. RayAI may produce inaccurate information about people, places, or facts.</p>
      </div>
    </div >
  );
};

export default Chat;