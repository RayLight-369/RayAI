"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext( ThemeContext );
};

const ThemeProvider = ( { children } ) => {

  const [ darkMode, setDarkMode ] = useState();

  useEffect( () => {
    const storedDarkMode = JSON.parse( localStorage.getItem( "darkMode" ) );

    if ( "darkMode" in storedDarkMode ) {
      setDarkMode( storedDarkMode.darkMode );
      console.log( storedDarkMode );
    } else {
      setDarkMode( true );
      console.log( storedDarkMode );
    }
  }, [] );


  useEffect( () => {
    const rootStyles = getComputedStyle( document.documentElement );
    const getProp = rootStyles.getPropertyValue.bind( rootStyles );

    if ( darkMode != undefined && darkMode != null && typeof darkMode != "undefined" ) localStorage.setItem( "darkMode", JSON.stringify( { darkMode } ) );

    if ( darkMode ) {
      document.body.classList.remove( "lightMode" );
      document.documentElement.style.setProperty( "--top-left", getProp( "--top-left-dark" ) );
      document.documentElement.style.setProperty( "--mid-left", getProp( "--mid-left-dark" ) );
      document.documentElement.style.setProperty( "--center", getProp( "--center-dark" ) );
      document.documentElement.style.setProperty( "--top-right", getProp( "--top-right-dark" ) );
      document.documentElement.style.setProperty( "--bottom-right", getProp( "--bottom-right-dark" ) );
    } else {
      document.body.classList.add( "lightMode" );
      document.documentElement.style.setProperty( "--top-left", getProp( "--top-left-light" ) );
      document.documentElement.style.setProperty( "--mid-left", getProp( "--mid-left-light" ) );
      document.documentElement.style.setProperty( "--center", getProp( "--center-light" ) );
      document.documentElement.style.setProperty( "--top-right", getProp( "--top-right-light" ) );
      document.documentElement.style.setProperty( "--bottom-right", getProp( "--bottom-right-light" ) );
    }

  }, [ darkMode ] );

  const toggleDarkMode = () => {
    setDarkMode( prev => !prev );
  };

  return (
    <ThemeContext.Provider value={ { darkMode, toggleDarkMode } }>{ children }</ThemeContext.Provider>
  );
};

export default ThemeProvider;