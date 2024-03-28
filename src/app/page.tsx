"use client";

import { useState } from 'react';

import Sidebar from '@components/navigator/sidebar';
import Workspace from '@components/workspace/workspace';

import { userData } from './data';

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const conversations = [
    'java for beginners crash course with introduction and content',
    'python',
    'golang',
    'deployment'
  ];

  return (
    <main className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden bg-accent/60 border-r md:block"><Sidebar headings={ conversations } activeIndex={ activeIndex } setActiveIndex={ setActiveIndex } /></div>
      <div className="flex flex-col"><Workspace messages={ userData[activeIndex].messages } isMobile={ false } /></div>
    </main>
  );
}
