"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

export async function getUser () {
  let body = await fetch( "/api/auth/session" );
  let session = await body.json();
  if ( Object.keys( session ).length && Object.keys( session.user ).length ) {
    return { session, signedIn: true };
  }
  return { session: null, signedIn: false };
}

const Provider = ( { children, session } ) => {
  return (
    <SessionProvider session={ session }>
      { children }
    </SessionProvider>
  );
};

export default Provider;