import { memo, useRef } from 'react';
import MarkdownRenderer from '../MarkdownRenderer/MarkdownRenderer';
import Image from 'next/image';


const Message = ( { msg, session, styles, onClick = () => { }, id } ) => {


  return (
    <div className={ msg.role == "user" ? styles[ "user" ] : styles[ "ai" ] }
      onLoad={ ( e ) => {
        if ( msg.role == "user" ) {
          e.currentTarget.style.left = `calc(100% - ${ ( e.currentTarget.offsetWidth / window.innerWidth ) * 100 }vw - .8vw )`;
          e.currentTarget.style.opacity = 1;
        }
      } }
      style={ {
        animation: "msg ease-in-out 2s 1",
      } }
      id={ id || msg.key }
      onClick={ onClick }
    >
      <Image
        src={ msg.role.toLowerCase() != "user" ? "/RayAI.svg" : session?.user.image }
        alt='img'
        width={ 50 }
        height={ 50 }
        className={ styles[ 'text-pic' ] }
      />
      {/* <p key={ key } className={ styles[ "msg" ] }>{ marked( msg.content ) }</p> */ }
      <MarkdownRenderer text={ msg.content } optionsClassName={ styles[ "code-options" ] } className={ styles[ "markdown-content" ] } />

    </div>
  );
};

export default memo( Message );