import { memo } from 'react';
import MarkdownRenderer from '../MarkdownRenderer/MarkdownRenderer';
import Image from 'next/image';


const Message = ( { msg, session, styles, onClick = () => { }, id } ) => {

  return (
    <div className={ msg.role == "user" ? styles[ "user" ] : styles[ "ai" ] }
      style={ {
        animation: "msg ease-in-out 2s 1"
      } }
      id={ id || msg.key }
      onClick={ onClick }
    >
      <Image
        src={ msg.role.toLowerCase() != "user" ? "/RayAI.png" : session?.user.image }
        alt='img'
        width={ 50 }
        height={ 50 }
        className={ styles[ 'text-pic' ] }
      />

      <MarkdownRenderer text={ msg.content } optionsClassName={ styles[ "code-options" ] } className={ styles[ "markdown-content" ] } />

    </div>
  );
};

export default memo( Message );