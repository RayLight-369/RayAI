"use client";

import { useTheme } from '@/app/Contexts/ThemeContext/ThemeContext';
import React from 'react';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { atomOneLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { atomDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';


const renderCodeBlock = ( { language, value } ) => {
  return (
    <SyntaxHighlighter language={ language } style={ atomDark }>
      { value }
    </SyntaxHighlighter>
  );
};

const MarkdownRenderer = ( { text, className } ) => {

  const { darkMode } = useTheme();

  return (
    <div className={ className }>
      <ReactMarkdown components={ {
        code ( { node, inline, className, children, ...props } ) {
          const match = /language-(\w+)/.exec( className || "" );
          return !inline && match ? (
            <SyntaxHighlighter
              children={ String( children ).replace( /\n$/, "" ) }
              language={ match[ 1 ] }
              style={ darkMode ? atomDark : oneLight }
            // { ...props }
            />
          ) : (
            <code className={ className } { ...props }>
              { children }
            </code>
          );
        },
      } }>{ text }</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;