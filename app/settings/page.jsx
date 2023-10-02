"use client";

import ToggleButton from '@/app/Components/ToggleButton/ToggleButton';
import { useTheme } from '@/app/Contexts/ThemeContext/ThemeContext';
import { useEffect } from 'react';

import styles from "./page.module.css";
import { signOut } from 'next-auth/react';

const page = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={ `${ styles[ 'options' ] } ${ !darkMode ? styles[ 'light' ] : "" }` }>
      <div className={ styles[ 'theme-changer' ] }>
        <p className="label">Toggle Dark Mode</p>
        <ToggleButton checked={ darkMode } onChange={ toggleDarkMode } />
      </div>
      <div className={ styles[ "logout" ] }>
        <button className={ styles[ "logout-btn" ] } onClick={ () => signOut() }>Sign-Out</button>
      </div>
    </div>
  );
};

export default page;