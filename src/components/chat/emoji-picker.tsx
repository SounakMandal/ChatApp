'use client';

import data from "@emoji-mart/data";
import Picker from '@emoji-mart/react';
import { SmileIcon } from "lucide-react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@ui/popover";

interface EmojiPickerProps {
    onChange: (value: string) => void;
}


export const EmojiPicker = ({
    onChange
}: EmojiPickerProps) => {

    return (
        <Popover>
            <PopoverTrigger>
                <SmileIcon className="h-5 w-5 text-muted-foreground hover:text-foreground transition" />
            </PopoverTrigger>
            <PopoverContent
                className="w-full">
                <Picker
                    emojiSize={ 18 }
                    theme="light"
                    data={ data }
                    maxFrequentRows={ 1 }
                    onEmojiSelect={ (emoji: any) => onChange(emoji.native) }
                />
            </PopoverContent>
        </Popover>
    );
};
