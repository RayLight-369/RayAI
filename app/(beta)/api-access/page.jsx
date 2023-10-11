"use client";

import { exists, insertData } from "@/app/Supabase/Supabase";
import styles from "./page.module.css";
import { useState } from "react";


const ApiPage = () => {

  const [ disabled, setDisabled ] = useState( false );
  const [ email, setEmail ] = useState( "" );



  const handleButtonClick = async () => {
    if ( email.trim().length && email.includes( "@" ) ) {
      try {
        setDisabled( true );

        const userExists = await exists( {
          table: "Early_Access",
          where: {
            email: email
          }
        } );

        if ( !userExists ) {

          await insertData( {
            table: "Early_Access",
            object: {
              email
            }
          } );

          const response = await fetch( "/api/api-access", {
            method: "POST",
            body: JSON.stringify( {
              email
            } )
          } );

          if ( response.ok ) {
            console.log( await response.json() );
          }

        } else {
          alert( "User has already signed up for Early Access!" );
        }

      } catch ( e ) {
        console.log( e );
      } finally {
        setDisabled( false );
      }

    }
  };

  const handleInputClick = e => {
    if ( e.key == "Enter" && !e.shiftKey && !disabled ) {
      handleButtonClick();
    }
  };

  return (
    <section className={ styles[ "api" ] }>
      <div className={ styles[ "heading" ] }>
        <p className={ styles[ "note" ] }>API under Development</p>
        <p className={ styles[ "title" ] }>COMING SOON!</p>
      </div>
      <div className={ styles[ "form" ] }>
        <p className={ styles[ "desc" ] }>Unlock the future – be among the first to access our API with early access</p>
        <div className={ styles[ "input" ] }>
          <input onKeyDown={ handleInputClick } type="text" value={ email } onChange={ ( e ) => setEmail( e.target.value ) } placeholder='Enter your Email' />
          <button disabled={ disabled } type='button' onClick={ handleButtonClick }>{ disabled ? "Sending" : "Send" }</button>
        </div>
      </div>
    </section>
  );
};

export default ApiPage;