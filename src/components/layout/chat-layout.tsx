import { useEffect, useState } from 'react';

import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useChat } from '@/context/chat_context';
import { getAllTitles } from '@/data/messages';
import { useCookie } from '@/hooks/cookie';
import Sidebar from '@components/navigator/sidebar';
import Workspace from '@components/workspace/workspace';
import { cn } from '@lib/utils';

import NavigationObject from '../navigator/navigation-object';

const defaultLayout = [25, 75];

export default function ChatLayout() {
  const { activeChat } = useChat();
  const { setCookie: setPanel } = useCookie('react-resizable-panels:layout');
  const { setCookie: setCollapsedState } = useCookie('react-resizable-panels:collapsed');
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      onLayout={ (sizes: number[]) => setPanel(sizes) }
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
          setCollapsedState(true);
        } }
        onExpand={ () => {
          setIsCollapsed(false);
          setCollapsedState(false);
        } }
        className={ cn(
          isCollapsed && " min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
        ) }
      >
        <div className="h-full hidden border-r md:block bg-accent/60">
          <Sidebar>
            <div className="flex flex-col gap-1 items-stretch m-2">
              { getAllTitles().map((heading, index) =>
                <NavigationObject
                  key={ index }
                  chatIndex={ index }
                  groupIndex={ 0 }
                  text={ heading }
                  active={ index === activeChat }
                />
              ) }
            </div>
          </Sidebar>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={ defaultLayout[1] } minSize={ 30 }>
        <div className="flex flex-col h-full">
          <Workspace isMobile={ isMobile } />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
