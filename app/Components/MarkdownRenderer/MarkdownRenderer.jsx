"use client";

import { useTheme } from '@/app/Contexts/ThemeContext/ThemeContext';
import { faCopy as copyRegular } from '@fortawesome/free-regular-svg-icons';
import { faCopy as copySolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const MarkdownRenderer = ( { text, className, optionsClassName = "" } ) => {

  const { darkMode } = useTheme();
  const [ copied, setCopied ] = useState( false );

  return (
    <div className={ className }>
      <ReactMarkdown components={ {
        code ( { node, inline, className, children, ...props } ) {
          const match = /language-(\w+)/.exec( className || "" );
          return match ? (
            <>
              <SyntaxHighlighter
                children={ String( children ).replace( /\n$/, "" ) }
                language={ match[ 1 ] }
                style={ darkMode ? atomDark : oneLight }
                { ...props }
              />
              <div className={ optionsClassName }>
                <FontAwesomeIcon onClick={ ( e ) => {
                  if ( !copied ) {
                    navigator.clipboard.writeText( e.target.parentNode.previousSibling?.innerText );
                    setCopied( true );
                    let timeOut = setTimeout( () => {
                      setCopied( false );
                      clearTimeout( timeOut );
                    }, 2000 );
                  }
                } } icon={ copied ? copySolid : copyRegular } />
              </div>
            </>
          ) : (
            <>
              <code className={ className } { ...props }>
                { children }
              </code>
            </>
          );
        },
      } }>
        { text }
      </ReactMarkdown>
    </div>
  );
};

export default memo( MarkdownRenderer );