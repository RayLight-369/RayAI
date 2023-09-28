"use client";

import { useState } from 'react';
import Chat from '../Components/Chat/chat';
import { useMessages } from '../Contexts/MessagesContext/MessagesContext';

const page = () => {
  const [ prompt, setPrompt ] = useState( {
    value: ""
  } );

  const { messages, setMessages } = useMessages();

  return (
    <Chat prompt={ prompt } setPrompt={ setPrompt } messages={ messages } setMessages={ setMessages } />
  );
};

export default page;