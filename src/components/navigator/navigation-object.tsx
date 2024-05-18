import { useState } from 'react';

import { ArchiveIcon, EditIcon, EllipsisIcon, FolderIcon, FolderOpenIcon, ShareIcon } from 'lucide-react';

import { useChat } from '@/context/chat_context';
import Show from '@/utils/Show';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@ui/menubar';

import EditChat from './edit';

interface NavigationObjectProps {
  chatIndex: number;
  groupIndex: number;
  text: string;
  active: boolean;
}

const activeStyle = "bg-background";
const centerItemsWithFlex = "flex flex-row gap-4 items-center";
const sidebarStyle = "grid grid-cols-12 items-start px-2 text-sm font-medium lg:px-4 p-2 m-1 border-solid border-4 rounded-lg hover:cursor-pointer";

export default function NavigationObject({ chatIndex, text, active }: NavigationObjectProps) {
  const { setActiveChat } = useChat();
  const [userEditedValue, setUserEditedValue] = useState(text);
  const [displayFileNavigator, setDisplayFileNavigator] = useState(false);

  const handleChatClick = () => {
    setActiveChat(chatIndex);
  };

  return (
    <div className={ active ? `${ sidebarStyle } ${ activeStyle }` : sidebarStyle }>
      <div onClick={ () => setDisplayFileNavigator((displayFileNavigator) => !displayFileNavigator) } className="col-span-2">
        <Show>
          <Show.When condition={ displayFileNavigator }>
            <FolderOpenIcon />
          </Show.When>

          <Show.Else>
            <FolderIcon />
          </Show.Else>
        </Show>
      </div>

      <div
        onClick={ handleChatClick }
        className="col-span-8 whitespace-nowrap overflow-hidden text-ellipsis">
        { userEditedValue }
      </div>

      <div className="col-span-2">
        <Menubar className="bg-transparent border-0 h-6">
          <MenubarMenu>
            <MenubarTrigger>
              <EllipsisIcon size={ 15 } />
            </MenubarTrigger>

            <MenubarContent>
              <MenubarItem onSelect={ (event) => event.preventDefault() }>
                <EditChat setUserEditedValue={ setUserEditedValue }>
                  <div className={ centerItemsWithFlex }>
                    <EditIcon />
                    <div>Edit Description</div>
                  </div>
                </EditChat>
              </MenubarItem>

              <MenubarItem>
                <div className={ centerItemsWithFlex }>
                  <ShareIcon />
                  <div>Share</div>
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
