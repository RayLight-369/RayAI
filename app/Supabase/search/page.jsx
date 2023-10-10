"use client";

import { useEffect, useRef, useState } from 'react';
import styles from "./page.module.css";
import { useMessages } from '../../Contexts/MessagesContext/MessagesContext';
import { useTheme } from '../../Contexts/ThemeContext/ThemeContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';


const Loading = dynamic( () => import( '../../(working)/loading.js/index.js' ) );

const Message = dynamic( () => import( '../../Components/Message/Message' ), {
  loading: Loading
} );

const Search = () => {
  const { messages } = useMessages();
  const { darkMode } = useTheme();
  const { data: session } = useSession();
  const router = useRouter();
  const [ prompts, setPrompts ] = useState( [] );
  const [ cancel, setCancel ] = useState( false );
  const msgsRef = useRef();

  // Debounce the input with a 500ms delay
  const debounce = ( func, delay ) => {
    let timeoutId;
    return function ( ...args ) {
      clearTimeout( timeoutId );
      timeoutId = setTimeout( () => {
        func.apply( this, args );
      }, delay );
    };
  };

  const filtering = ( searchText ) => {
    try {
      if ( cancel ) {
        return;
      }

      if ( searchText.trim().length === 0 ) {
        setPrompts( [] );
      } else {
        let filteredArray = messages.filter( ( message ) =>
          message.content.toLowerCase().includes( searchText.toLowerCase() )
        );
        console.log( "filtered: ", filteredArray );
        setPrompts( filteredArray );
      }
    } catch ( err ) {
      console.log( err );
    }
  };

  const debouncedFiltering = useRef( debounce( filtering, 500 ) );

  const handleInputChange = ( e ) => {
    setCancel( false );
    debouncedFiltering.current( e.target.value );
  };

  useEffect( () => {
    return () => {
      setCancel( true );
    };
  }, [] );

  return (
    <div className={ styles[ "search-container" ] }>
      <div className={ styles[ "input" ] }>
        <input
          type="text"
          onChange={ handleInputChange }
          placeholder="Search Message"
        />
      </div>
      { !prompts.length && (
        <p className={ styles[ 'placeholder' ] }>No Messages :(</p>
      ) }
      <div className={ `${ styles[ "msgs" ] } ${ !darkMode ? styles[ "light" ] : "" }` } ref={ msgsRef }>
        { prompts.map( ( msg, key ) => (
          <Message
            onClick={ ( e ) => {
              e.stopPropagation();
              router.replace( "/#" + msg.key, { scroll: false } );
            } }
            key={ key }
            msg={ msg }
            session={ session }
            styles={ styles }
          />
        ) ) }
      </div>
    </div>
  );
};

export default Search;









// "use client";

// import { useEffect, useRef, useState } from 'react';
// import styles from "./page.module.css";
// import { useMessages } from '../Contexts/MessagesContext/MessagesContext';
// import Message from '../Components/Message/Message';
// import { useTheme } from '../Contexts/ThemeContext/ThemeContext';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useChat } from 'ai/react';


// const Search = () => {

//   const { messages } = useMessages();
//   const { darkMode, _ } = useTheme();
//   const { data: session } = useSession();
//   const [ prompts, setPrompts ] = useState( [] );
//   const router = useRouter();
//   const [ Input, setInput ] = useState( "" );
//   const [ cancel, setCancel ] = useState( false );
//   const msgsRef = useRef();

//   const debounce = ( func, delay ) => {
//     let timeoutId;
//     return function ( ...args ) {
//       clearTimeout( timeoutId );
//       timeoutId = setTimeout( () => {
//         func.apply( this, args );
//       }, delay );
//     };
//   };

//   // const handleInputChange = debounce( ( e ) => {

//   //   console.log( messages );

//   //   if ( e.target.value.trim().length == 0 ) {
//   //     setPrompts( [] );
//   //   } else {
//   //     let filteredMessages = messages.filter( ( message ) => message.content.toLowerCase().includes( e.target.value.toLowerCase() ) );
//   //     setPrompts( [ ...filteredMessages ] );
//   //   }

//   // }, 300 );

//   const handleInputChange = ( e ) => {
//     setCancel( false );
//     setInput( e.target.value );
//   };

//   useEffect( () => {

//     const Filtering = async () => {
//       console.log( messages );

//       try {

//         if ( cancel ) {
//           return;
//         }

//         if ( Input.trim().length == 0 ) {

//           setPrompts( [] );

//         } else {

//           let filteredArray = await filtering();
//           console.log( "filtered: ", filteredArray );
//           setPrompts( filteredArray );

//         }

//       } catch ( err ) {
//         console.log( err );
//       }

//     };

//     Filtering();

//     return () => {
//       setCancel( true );
//     };

//   }, [ Input ] );

//   const filtering = async () => {

//     let filteredMessages = messages.filter( ( message ) => message.content.toLowerCase().includes( Input.toLowerCase() ) );
//     return filteredMessages;

//   };


//   return (
//     <div className={ styles[ "search-container" ] }>
//       <div className={ styles[ "input" ] }>
//         <input type={ styles[ "text" ] } onChange={ handleInputChange } placeholder='Search Message' />
//       </div>
//       { !prompts.length && (
//         <p className={ styles[ 'placeholder' ] }>No Messages :(</p>
//       ) }
//       <div className={ `${ styles[ "msgs" ] } ${ !darkMode ? styles[ "light" ] : "" }` } ref={ msgsRef }>
//         { prompts.map( ( msg, key ) => (
//           <Message onClick={ ( e ) => {
//             e.stopPropagation();
//             router.replace( "/#" + msg.key, { scroll: false } );
//           } } key={ key } msg={ msg } session={ session } styles={ styles } />
//         ) ) }
//       </div>
//     </div>
//   );
// };

// export default Search;