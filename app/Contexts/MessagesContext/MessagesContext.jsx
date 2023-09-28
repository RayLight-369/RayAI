"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

const MessagesContext = createContext();

export const useMessages = () => {
  return useContext( MessagesContext );
};

const MessagesProvider = ( { children } ) => {

  const [ messages, setMessages ] = useState( [] );

  return (
    <MessagesContext.Provider value={ { messages, setMessages } }>{ children }</MessagesContext.Provider>
  );
};

export default MessagesProvider;