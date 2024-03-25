'use client';

import { cn } from '@/lib/utils';
import Show from '@/utils/Show';
import { useState } from 'react';

interface NavigationObjectProps {
  text: string;
}

function NavigationObject({ text }: NavigationObjectProps) {
  const [displayFileNavigator, setDisplayFileNavigator] = useState(true);

  return (
    <div className={ cn("p-2 m-1 max-w-[25vw] border-solid border-8 rounded-lg flex flex-row justify-between") }>
      <div className={ cn("whitespace-nowrap overflow-hidden text-ellipsis") }>{ text }</div>
      <Show>
        <Show.When condition={ displayFileNavigator }>
          <div>Icon</div>
        </Show.When>
      </Show>
    </div>
  );
}

export default NavigationObject;
