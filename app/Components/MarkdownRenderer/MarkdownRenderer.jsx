"use client";

import { useTheme } from '@/app/Contexts/ThemeContext/ThemeContext';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const MarkdownRenderer = ( { text, className, optionsClassName = "" } ) => {

  const { darkMode } = useTheme();
  const codeRef = useRef();

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
                ref={ codeRef }
                style={ darkMode ? atomDark : oneLight }
                { ...props }
              />
              <div className={ optionsClassName }>
                <FontAwesomeIcon onClick={ () => {
                  navigator.clipboard.writeText( codeRef.current.innerText );
                } } icon={ faCopy } />
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