export const userData = [
    {
        id: 1,
        messages: [
            {
                id: 1,
                name: 'human',
                message: 'Hey, Jakob',
            },
            {
                id: 2,
                name: 'ai',
                message: 'Hey!',
            },
            {
                id: 3,
                name: 'human',
                message: 'How are you?',
            },
            {
                id: 4,
                name: 'ai',
                message: 'I am good, you?',
            },
            {
                id: 5,
                name: 'human',
                message: 'I am good too!',
            },
            {
                id: 6,
                name: 'ai',
                message: 'That is good to hear!'
            },
            {
                id: 7,
                name: 'human',
                message: 'How has your day been so far?',
            },
            {
                id: 8,
                name: 'ai',
                message: 'It has been good. I went for a run this morning and then had a nice breakfast. How about you?',
            },
            {
                id: 9,
                name: 'human',
                message: 'I had a relaxing day. Just catching up on some reading.',
            }
        ] as Message[],
    },
    {
        id: 2,
    },
    {
        id: 3,
    },
    {
        id: 4,
    }
];

export const loggedInUserData = {
    id: 5,
    name: 'Jakob Hoeg',
};

export type LoggedInUserData = (typeof loggedInUserData);

export interface Message {
    id: number;
    name: "ai" | "human";
    message: string;
}

export interface User {
    id: number;
    messages: Message[];
}
