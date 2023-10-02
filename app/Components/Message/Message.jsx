import { memo } from 'react';
import MarkdownRenderer from '../MarkdownRenderer/MarkdownRenderer';
import Image from 'next/image';


const Message = ( { msg, session, styles, onClick = () => { } } ) => {

  return (
    <div className={ msg.agent == "user" ? styles[ "user" ] : styles[ "ai" ] }
      style={ {
        animation: "msg ease-in-out 2s 1"
      } }
      id={ msg.key }
      onClick={ onClick }
    >
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
  );
};

export default memo( Message );