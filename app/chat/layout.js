"use client";

import React from 'react';
import styles from "./layout.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faMessage } from '@fortawesome/free-regular-svg-icons';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';


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
      </div>
      <div className={ styles[ "layout" ] }>
        { children }
      </div>
    </div >
  );
};

export default ChatPageLayout;