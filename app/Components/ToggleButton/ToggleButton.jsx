import React from 'react';
import styles from "./ToggleButton.module.css";

const ToggleButton = ( { checked = true, className = "", ...props } ) => {
  return (
    <label className={ `${ styles[ "switch" ] } ${ className }` }>
      <input type="checkbox" checked={ checked } { ...props } />
      <span className={ styles[ "slider" ] }></span>
    </label>
  );
};

export default ToggleButton;