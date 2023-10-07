"use client";

import ToggleButton from '@/app/Components/ToggleButton/ToggleButton';
import { useTheme } from '@/app/Contexts/ThemeContext/ThemeContext';
import { useEffect } from 'react';

import styles from "./page.module.css";
import { signIn, signOut } from 'next-auth/react';
import { getUser } from '@/Provider/Provider';
import { use } from "react";


async function user () {
  return ( await getUser() );
}

const page = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { signedIn } = use( user() );
  let button;

  if ( signedIn ) {
    button = <button className={ styles[ "logout-btn" ] } onClick={ () => signOut() }>Sign-Out</button>;
  } else {
    button = <button className={ styles[ "logout-btn" ] } onClick={ () => signIn( "google" ) }>Sign-In</button>;
  }

  return (
    <div className={ `${ styles[ 'options' ] } ${ !darkMode ? styles[ 'light' ] : "" }` }>
      <div className={ styles[ 'theme-changer' ] }>
        <p className="label">Toggle Dark Mode</p>
        <ToggleButton checked={ darkMode } onChange={ toggleDarkMode } />
      </div>
      <div className={ styles[ "logout" ] }>
        { button }
      </div>
    </div>
  );
};

export default page;