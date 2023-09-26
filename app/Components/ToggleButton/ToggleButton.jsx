import React from 'react';
import styles from "./ToggleButton.module.css";

const ToggleButton = () => {
  return (
    <label className={ styles[ "switch" ] }>
      <input type="checkbox" />
      <span className={ styles[ "slider" ] }></span>
    </label>
  );
};

export default ToggleButton;