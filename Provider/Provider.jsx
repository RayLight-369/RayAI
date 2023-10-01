"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const CurrentSession = createContext();

export function getCurrentSession () {
  return useContext( CurrentSession );
}

export async function getUser () {
  let body = await fetch( "/api/auth/session" );
  let user = await body.json();
  if ( Object.keys( user ).length && Object.keys( user.user ).length ) {
    return { session: user, signedIn: true };
  }
  return { session: null, signedIn: false };
}

export const UserSessionProvider = ( { children } ) => {

  const { data } = useSession();
  const [ session, setSession ] = useState();

  useEffect( () => {
    if ( data?.user ) {
      setSession( data );
    }
  }, [ data ] );

  return (
    <CurrentSession.Provider value={ { session } }>{ children }</CurrentSession.Provider>
  );
};

const Provider = ( { children, session } ) => {
  return (
    <SessionProvider session={ session }>
      { children }
    </SessionProvider>
  );
};

export default Provider;