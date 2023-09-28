"use client";

import { useTheme } from '@/app/Contexts/ThemeContext/ThemeContext';
import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const MarkdownRenderer = ( { text, className } ) => {

  const { darkMode } = useTheme();

  return (
    <div className={ className }>
      <ReactMarkdown components={ {
        code ( { node, inline, className, children, ...props } ) {
          const match = /language-(\w+)/.exec( className || "" );
          return match ? (
            <SyntaxHighlighter
              children={ String( children ).replace( /\n$/, "" ) }
              language={ match[ 1 ] }
              style={ darkMode ? atomDark : oneLight }
              { ...props }
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

export default memo( MarkdownRenderer );