"use client";
import { createContext, useContext, useEffect, useState } from 'react';

const IsMobileContext = createContext();

export const isMobileDevice = () => {
  return useContext( IsMobileContext );
};

const IsMobileProvider = ( { children } ) => {

  const [ isMobile, setIsMobile ] = useState( true );

  return (
    <IsMobileContext.Provider value={ { isMobile, setIsMobile } }>{ children }</IsMobileContext.Provider>
  );
};


const toggleNavContext = createContext();

export const toggleNavDevice = () => {
  return useContext( toggleNavContext );
};

export const ToggleNavProvider = ( { children } ) => {

  const [ toggleNav, setToggleNav ] = useState( false );

  return (
    <toggleNavContext.Provider value={ { toggleNav, setToggleNav } }>{ children }</toggleNavContext.Provider>
  );
};

export default IsMobileProvider;