import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';

import { Button } from "@ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Textarea } from '@ui/textarea';

interface EditChatProps extends PropsWithChildren {
  setUserEditedValue: Dispatch<SetStateAction<string>>;
}

export default function EditChat({ setUserEditedValue, children }: EditChatProps) {
  const [open, setOpen] = useState(false);

  const handleSaveChanges = () => {
    setOpen(false);
    setUserEditedValue("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        { children }
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Chat Information</DialogTitle>
          <DialogDescription>
            Make changes to your chat information here. Click save changes when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="heading" className="text-right">Heading</Label>
            <Input
              id="heading"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea
              id="description"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter className="m-auto">
          <Button type="submit">Discard Changes</Button>
          <Button type="submit" onClick={ handleSaveChanges }>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
