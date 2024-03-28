import { useState } from 'react';

import { ArchiveIcon, EditIcon, EllipsisIcon, FolderIcon, FolderOpenIcon, ShareIcon } from 'lucide-react';

import Show from '@/utils/Show';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@ui/menubar';

import EditChat from './edit';

interface NavigationObjectProps {
  text: string;
  active: boolean;
  onClick: any;
}

const centerItemsWithFlex = "flex flex-row gap-4 items-center";

function NavigationObject({ text, active, onClick }: NavigationObjectProps) {
  const [displayFileNavigator, setDisplayFileNavigator] = useState(false);
  const [userEditedValue, setUserEditedValue] = useState(text);

  const sidebarStyle = "grid grid-cols-12 items-start px-2 text-sm font-medium lg:px-4 p-2 m-1 max-w-[25vw] border-solid border-4 rounded-lg hover:cursor-pointer";
  const activeStyle = "bg-background";
  return (
    <div onClick={ onClick }
      className={ active ? `${ sidebarStyle } ${ activeStyle }` : sidebarStyle }>
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

      <div className="col-span-8 whitespace-nowrap overflow-hidden text-ellipsis">{ userEditedValue }</div>

      <div className="col-span-2">
        <Menubar className="bg-transparent border-0 h-6">
          <MenubarMenu>
            <MenubarTrigger>
              <EllipsisIcon size={ 15 } />
            </MenubarTrigger>

            <MenubarContent>
              <MenubarItem onSelect={ (event) => event.preventDefault() }>
                <EditChat>
                  <div className={ centerItemsWithFlex }>
                    <EditIcon />
                    <div>Edit Description</div>
                  </div>
                </EditChat>
              </MenubarItem>

              <MenubarItem>
                <div className={ centerItemsWithFlex }>
                  <ShareIcon />
                  <div> Share</div>
                </div>
              </MenubarItem>

              <MenubarItem>
                <div className={ centerItemsWithFlex }>
                  <ArchiveIcon />
                  <div>Archive</div>
                </div>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

    </div >
  );
}

export default NavigationObject;
