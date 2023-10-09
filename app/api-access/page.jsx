import React from 'react';
import styles from "./page.module.css";

const ApiPage = () => {
  return (
    <section className={ styles[ "api" ] }>
      <div className={ styles[ "heading" ] }>
        <p className={ styles[ "note" ] }>API under Development</p>
        <p className={ styles[ "title" ] }>COMING SOON!</p>
      </div>
      <div className={ styles[ "form" ] }>
        <p className={ styles[ "desc" ] }>Unlock the future – be among the first to access our API with early access</p>
        <div className={ styles[ "input" ] }>
          <input type="text" placeholder='Enter your Email' />
          <button type='button'>Send</button>
        </div>
      </div>
    </section>
  );
};

export default ApiPage;