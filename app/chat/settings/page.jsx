"use client";

import ToggleButton from '@/app/Components/ToggleButton/ToggleButton';
import { useTheme } from '@/app/Contexts/ThemeContext/ThemeContext';
import React, { useEffect } from 'react';

const page = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <>
      <ToggleButton />
    </>
  );
};

export default page;