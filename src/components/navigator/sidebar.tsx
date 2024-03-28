import React, { Dispatch, FC, SetStateAction } from 'react';

import { Package2 } from 'lucide-react';
import Link from 'next/link';

import { ModeToggle } from '@/utils/ModeToggle';
import { Button } from "@ui/button";

import NavigationObject from './navigation-object';

interface SidebarProps {
  headings: string[];
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}

const Sidebar: FC<SidebarProps> = ({ headings, activeIndex, setActiveIndex }) => {
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 justify-between items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          <span className="">AI Ideation</span>
        </Link>

        <Button asChild variant="outline" size="icon" className="ml-auto h-8 w-8">
          <>
            <ModeToggle />
            <span className="sr-only">Toggle mode</span>
          </>
        </Button>
      </div>

      <div className="flex flex-col gap-1">
        { headings.map((heading, index) =>
          <NavigationObject
            key={ index }
            text={ heading }
            active={ index === activeIndex }
            onClick={ () => setActiveIndex(index) }
          />
        ) }
      </div>
    </div>
  );
};

export default Sidebar;
