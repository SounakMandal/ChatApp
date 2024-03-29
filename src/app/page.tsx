"use client";

import { useEffect, useState } from 'react';

import { cn } from '@lib/utils';

import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import Sidebar from '@components/navigator/sidebar';
import Workspace from '@components/workspace/workspace';

import { userData } from './data';

export default function Home() {
  const conversations = [
    'java for beginners crash course with introduction and content',
    'python',
    'golang',
    'deployment'
  ];
  const defaultLayout = [25, 75];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={ (sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${ JSON.stringify(
          sizes
        ) }`;
      } }
      className="min-h-screen h-full items-stretch"
    >
      <ResizablePanel
        defaultSize={ defaultLayout[0] }
        collapsedSize={ 0 }
        collapsible={ true }
        minSize={ isMobile ? 0 : 20 }
        maxSize={ isMobile ? 8 : 30 }
        onCollapse={ () => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${ JSON.stringify(true) }`;
        } }
        onExpand={ () => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${ JSON.stringify(false) }`;
        } }
        className={ cn(
          isCollapsed && " min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
        ) }
      >
        <div className="h-full hidden border-r md:block bg-accent/60">
          <Sidebar
            headings={ conversations }
            activeIndex={ activeIndex }
            setActiveIndex={ setActiveIndex }
          />
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={ defaultLayout[1] } minSize={ 30 }>
        <div className="flex flex-col h-full">
          <Workspace
            messages={ userData[activeIndex].messages }
            isMobile={ isMobile }
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
