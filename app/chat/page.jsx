"use client";

import { useState } from 'react';
import Chat from '../Components/Chat/chat';

const page = () => {
  const [ prompt, setPrompt ] = useState( {
    value: ""
  } );

  const [ messages, setMessages ] = useState( [] );

  const [ darkMode, setDarkmode ] = useState( true );
  return (
    <Chat prompt={ prompt } setPrompt={ setPrompt } messages={ messages } setMessages={ setMessages } />
  );
};

export default page;