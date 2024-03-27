'use client';

import Show from '@/utils/Show';
import { useState } from 'react';
import { CheckIcon, Folder, FolderIcon, FolderOpen, FolderOpenIcon, SquarePen, X, XIcon } from 'lucide-react';
import { Input } from '../ui/input';

interface NavigationObjectProps {
  text: string;
}

function NavigationObject({ text }: NavigationObjectProps) {
  const [displayFileNavigator, setDisplayFileNavigator] = useState(false);
  const [edit, setEdit] = useState(false);
  const [userEditedValue, setUserEditedValue] = useState(text);

  const discardContentHeadingChange = () => {
    setEdit(false);
    setUserEditedValue(text);
  };

  const acceptContentHeadingChange = () => {
    setEdit(false);
  };

  return (
    <div className="grid grid-cols-12 items-start px-2 text-sm font-medium lg:px-4 p-2 m-1 max-w-[25vw] border-solid border-4 rounded-md">
      <div className="col-span-2">
        <Show>
          <Show.When condition={ displayFileNavigator }>
            <FolderOpenIcon />
          </Show.When>

          <Show.Else>
            <FolderIcon />
          </Show.Else>
        </Show>
      </div>

      <div className="col-span-10 whitespace-nowrap overflow-hidden text-ellipsis">
        <Show>
          <Show.When condition={ edit }>
            <div className="flex flex-row">
              <Input value={ userEditedValue } onChange={ (event) => setUserEditedValue(event.target.value) } />
              <CheckIcon onClick={ acceptContentHeadingChange } />
              <XIcon onClick={ discardContentHeadingChange } />
            </div>
          </Show.When>
          <Show.Else>
            <div className="flex flex-row items-center justify-between">
              <text className="text-sm">{ userEditedValue }</text>
              <SquarePen onClick={ () => setEdit(true) } />
            </div>
          </Show.Else>
        </Show>
      </div>
    </div>
  );
}

export default NavigationObject;
