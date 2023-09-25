"use client";

import React from 'react';
import styles from "./layout.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faMessage } from '@fortawesome/free-regular-svg-icons';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';


const ChatPageLayout = ( { children } ) => {

  const { data: session } = useSession();

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
          <Link href={ "/" }><FontAwesomeIcon className={ styles[ 'link-icons' ] } icon={ faMessage } />&nbsp;&nbsp;&nbsp;Chats</Link>
          <Link href={ "/" }><FontAwesomeIcon className={ styles[ 'link-icons' ] } icon={ faMagnifyingGlass } />&nbsp;&nbsp;&nbsp;Search</Link>
          <Link href={ "/" }><FontAwesomeIcon className={ styles[ 'link-icons' ] } icon={ faEnvelope } />&nbsp;&nbsp;&nbsp;Support</Link>
          <Link href={ "/" }><FontAwesomeIcon className={ styles[ 'link-icons' ] } icon={ faGears } />&nbsp;&nbsp;&nbsp;Settings</Link>
        </div>
        <div className={ styles[ 'build-info' ] }>
          <div className={ styles[ 'version' ] }>
            <p className={ styles[ 'title' ] }>Ray-AI</p>
            <p className='build-version'>O.O.1</p>
          </div>
          <p className={ styles[ 'desc' ] }>Be the first to try.</p>
          <button type='button' className={ styles[ 'card-btn' ] }>See Info</button>
        </div>
        <div className={ styles[ 'account' ] }>
          <button type="button"><FontAwesomeIcon className={ styles[ 'google-icon' ] } icon={ faGoogle } /><span>Continue with Google</span></button>
        </div>
      </div>
      <div className={ styles[ "layout" ] }>
        { children }
      </div>
    </div >
  );
};

export default ChatPageLayout;