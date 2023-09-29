"use client";

import styles from "./layout.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears, faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faMessage } from '@fortawesome/free-regular-svg-icons';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useTheme } from './Contexts/ThemeContext/ThemeContext';

const ChildLayout = ( { children } ) => {

  const { data: session, status } = useSession();
  const { darkMode } = useTheme();

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
          <Link href={ "/chat" }><FontAwesomeIcon className={ styles[ 'link-icons' ] } icon={ faMessage } />&nbsp;&nbsp;&nbsp;Chats</Link>
          <Link href={ "/chat" }><FontAwesomeIcon className={ styles[ 'link-icons' ] } icon={ faMagnifyingGlass } />&nbsp;&nbsp;&nbsp;Search</Link>
          <Link href={ "/chat" }><FontAwesomeIcon className={ styles[ 'link-icons' ] } icon={ faEnvelope } />&nbsp;&nbsp;&nbsp;Support</Link>
          <Link href={ "/chat/settings" }><FontAwesomeIcon className={ styles[ 'link-icons' ] } icon={ faGears } />&nbsp;&nbsp;&nbsp;Settings</Link>
        </div>
        <div className={ styles[ 'build-info' ] }>
          <div className={ styles[ 'version' ] }>
            <p className={ styles[ 'title' ] }>Ray-AI</p>
            <p className='build-version'>O.O.1</p>
          </div>
          <p className={ styles[ 'desc' ] }>Be the first to try.</p>
          <button type='button' className={ `${ styles[ 'card-btn' ] } ${ styles[ 'light' ] }` }>See Info</button>
        </div>
        <div className={ styles[ 'account' ] }>
          { session?.user && status != "loading" ? (
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
                <p className={ styles[ "email" ] }>{ session.user.email }</p>
              </div>
              <FontAwesomeIcon onClick={ () => signOut() } className={ styles[ "logout-icon" ] } icon={ faRightFromBracket } />
            </div>
          ) : status != "loading" ? (
            <button onClick={ () => signIn( "google" ) } type="button"><FontAwesomeIcon className={ styles[ 'google-icon' ] } icon={ faGoogle } /><span>Continue with Google</span></button>
          ) : (
            <p>Loading...</p>
          ) }
        </div>
      </div>
      <div className={ `${ styles[ "layout" ] } ${ !darkMode ? styles[ "light" ] : "" }` }>
        { children }
      </div>
    </div >
  );
};

export default ChildLayout;