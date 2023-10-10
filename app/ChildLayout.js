"use client";

import styles from "./layout.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears, faMagnifyingGlass, faRightFromBracket, faServer } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faMessage } from '@fortawesome/free-regular-svg-icons';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useTheme } from './Contexts/ThemeContext/ThemeContext';
import Loading from "./loading";
import { isMobileDevice, toggleNavDevice } from "./Contexts/IsMobileContext/IsMobileContext";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";


const ChildLayout = ( { children } ) => {

  const { data: session, status } = useSession();
  const { darkMode } = useTheme();
  const { isMobile, setIsMobile } = isMobileDevice();
  const { toggleNav, setToggleNav } = toggleNavDevice();
  const [ isLoading, setLoading ] = useState( true );
  const [ sessionLoading, setSessionLoading ] = useState( true );
  const specialRoutes = [ "api-access" ];
  const pathName = usePathname();

  useEffect( () => {
    if ( status != "loading" ) {
      setSessionLoading( false );
    }
    console.log( sessionLoading );
  }, [ session, status ] );

  useEffect( () => {

    const handleResize = () => setIsMobile( window.innerWidth <= 767 );

    handleResize();

    window.addEventListener( "resize", handleResize );

    setLoading( false );

    return () => {
      window.removeEventListener( "resize", handleResize );
    };

  }, [] );

  let content;

  // if ( specialRoutes.includes( pathName ) ) {
  //   content =
  //     <div className={ styles[ "chat-container" ] }>
  //       { !isLoading && (
  //         <>
  //           <div className={ styles[ "previous-chats" ] } style={ isMobile ? {
  //             left: toggleNav ? "0" : -150,
  //             zIndex: 10
  //           } : null }>
  //             { isMobile && (
  //               <button className={ styles[ "close-nav" ] } onClick={ () => {
  //                 setToggleNav( false );
  //               } }>
  //                 ✖
  //               </button>
  //             ) }
  //             <div className={ styles[ "logo" ] }>
  //               <Image
  //                 src={ "/logo.png" }
  //                 alt='logo'
  //                 width={ "100" }
  //                 height={ "70" }
  //               />

  //             </div>
  //             <div className={ styles[ "links" ] }>
  //               <Link href={ "/" }><FontAwesomeIcon className={ styles[ 'link-icons' ] } icon={ faMessage } />&nbsp;&nbsp;&nbsp;Chats</Link>
  //               <Link href={ "/search" }><FontAwesomeIcon className={ styles[ 'link-icons' ] } icon={ faMagnifyingGlass } />&nbsp;&nbsp;&nbsp;Search</Link>
  //               <Link href={ "/settings" }><FontAwesomeIcon className={ styles[ 'link-icons' ] } icon={ faGears } />&nbsp;&nbsp;&nbsp;Settings</Link>
  //               <Link href={ "/api-access" }><FontAwesomeIcon className={ styles[ 'link-icons' ] } icon={ faServer } />&nbsp;&nbsp;&nbsp;Use as API</Link>
  //             </div>
  //             <div className={ styles[ 'account' ] }>
  //               { session?.user && !sessionLoading ? (
  //                 <div className={ styles[ 'profile' ] }>
  //                   <div className={ styles[ 'img' ] }>
  //                     <Image
  //                       src={ session.user.image }
  //                       alt='profile'
  //                       width={ 30 }
  //                       height={ 30 }
  //                     />
  //                   </div>
  //                   <div className={ styles[ 'name-email' ] }>
  //                     <p className={ styles[ "name" ] }>{ session.user.name }</p>
  //                     <p className={ styles[ "email" ] }>{ session.user.email.length > 22 ? session.user.email.substring( 0, 22 ) + "..." : session.user.email }</p>
  //                   </div>
  //                   <FontAwesomeIcon onClick={ () => signOut() } className={ styles[ "logout-icon" ] } icon={ faRightFromBracket } />
  //                 </div>
  //               ) : status != "loading" ? (
  //                 <button onClick={ () => signIn( "google" ) } type="button"><FontAwesomeIcon className={ styles[ 'google-icon' ] } icon={ faGoogle } /><span>Continue with Google</span></button>
  //               ) : (
  //                 <Loading />
  //               ) }
  //             </div>
  //           </div>
  //           <div className={ `${ styles[ "layout" ] } ${ !darkMode ? styles[ "light" ] : "" }` }>
  //             { isMobile && (
  //               <button className={ styles[ "open-nav" ] } onClick={ () => setToggleNav( true ) }>
  //                 ☰
  //               </button>
  //             ) }
  //             { children }
  //           </div>
  //         </>
  //       ) }
  //     </div >;
  // } else {
  //   content = children;
  // }

  return (
    <div className={ styles[ "chat-container" ] }>
      { !isLoading && (
        <>
          <div className={ styles[ "previous-chats" ] } style={ isMobile ? {
            left: toggleNav ? "0" : -150,
            zIndex: 10
          } : null }>
            { isMobile && (
              <button className={ styles[ "close-nav" ] } onClick={ () => {
                setToggleNav( false );
              } }>
                ✖
              </button>
            ) }
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
              <Link href={ "/search" }><FontAwesomeIcon className={ styles[ 'link-icons' ] } icon={ faMagnifyingGlass } />&nbsp;&nbsp;&nbsp;Search</Link>
              <Link href={ "/settings" }><FontAwesomeIcon className={ styles[ 'link-icons' ] } icon={ faGears } />&nbsp;&nbsp;&nbsp;Settings</Link>
              <Link href={ "/api-access" }><FontAwesomeIcon className={ styles[ 'link-icons' ] } icon={ faServer } />&nbsp;&nbsp;&nbsp;Use as API</Link>
            </div>
            <div className={ styles[ 'account' ] }>
              { session?.user && !sessionLoading ? (
                <div className={ styles[ 'profile' ] }>
                  <div className={ styles[ 'img' ] }>
                    <Image
                      src={ session.user.image }
                      alt='profile'
                      width={ 30 }
                      height={ 30 }
                    />
                  </div>
                  <div className={ styles[ 'name-email' ] }>
                    <p className={ styles[ "name" ] }>{ session.user.name }</p>
                    <p className={ styles[ "email" ] }>{ session.user.email.length > 22 ? session.user.email.substring( 0, 22 ) + "..." : session.user.email }</p>
                  </div>
                  <FontAwesomeIcon onClick={ () => signOut() } className={ styles[ "logout-icon" ] } icon={ faRightFromBracket } />
                </div>
              ) : status != "loading" ? (
                <button onClick={ () => signIn( "google" ) } type="button"><FontAwesomeIcon className={ styles[ 'google-icon' ] } icon={ faGoogle } /><span>Continue with Google</span></button>
              ) : (
                <Loading />
              ) }
            </div>
          </div>
          <div className={ `${ styles[ "layout" ] } ${ !darkMode ? styles[ "light" ] : "" }` }>
            { isMobile && (
              <button className={ styles[ "open-nav" ] } onClick={ () => setToggleNav( true ) }>
                ☰
              </button>
            ) }
            { children }
          </div>
        </>
      ) }
    </div >
  );
};

export default ChildLayout;
