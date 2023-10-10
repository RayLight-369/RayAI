"use client";

import ToggleButton from '@/app/Components/ToggleButton/ToggleButton';
import { useTheme } from '@/app/Contexts/ThemeContext/ThemeContext';

import styles from "./page.module.css";
import { signIn, signOut } from 'next-auth/react';
import { getUser } from '@/Provider/Provider';
import { memo, use, useCallback } from "react";


async function user () {
  return ( await getUser() );
}

const ThemeButton = memo( () => {

  const { darkMode, toggleDarkMode } = useTheme();
  const themeToggle = useCallback( () => toggleDarkMode(), [] );

  return <ToggleButton checked={ darkMode } onChange={ themeToggle } />;

} );

const page = () => {
  const { darkMode } = useTheme();
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
        <ThemeButton />
      </div>
      <div className={ styles[ "logout" ] }>
        { button }
      </div>
    </div>
  );
};

export default page;