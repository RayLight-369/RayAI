"use client";

import ToggleButton from '@/app/Components/ToggleButton/ToggleButton';
import { useTheme } from '@/app/Contexts/ThemeContext/ThemeContext';
import { useEffect } from 'react';

import styles from "./page.module.css";

const page = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={ styles[ 'theme-changer' ] }>
      <p className="label">Toggle Dark Mode</p>
      <ToggleButton checked={ darkMode } onChange={ toggleDarkMode } />
    </div>
  );
};

export default page;