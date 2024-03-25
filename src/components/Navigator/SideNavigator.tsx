"use client";

import React, { FC } from 'react';
import NavigationObject from './NavigationObject';
import { ModeToggle } from '@/utils/ModeToggle';

interface NavigatorProps {
  headings: string[];
}

const SideNavigator: FC<NavigatorProps> = ({ headings }) => {
  return (
    <div className=''>
      <ModeToggle />
      { headings.map((heading, index) => <NavigationObject key={ index } text={ heading } />) }
    </div>
  );
};

export default SideNavigator;
