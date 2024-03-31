export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ChatHistory = {
  __typename?: 'ChatHistory';
  groups: Array<Maybe<Group>>;
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Group = {
  __typename?: 'Group';
  context?: Maybe<Scalars['String']['output']>;
  entities?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id: Scalars['String']['output'];
  instruction?: Maybe<Scalars['String']['output']>;
  messages?: Maybe<Array<Maybe<Message>>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['String']['output'];
  message: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  chat?: Maybe<ChatHistory>;
  chats?: Maybe<Array<Maybe<ChatHistory>>>;
  group?: Maybe<Group>;
  groups?: Maybe<Array<Maybe<Group>>>;
};


export type QueryChatsArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGroupArgs = {
  groupId?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  chats?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id: Scalars['String']['output'];
  instruction?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type GetUserChatsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUserChatsQuery = { __typename?: 'Query', chats?: Array<{ __typename?: 'ChatHistory', title: string, groups: Array<{ __typename?: 'Group', title?: string | null } | null> } | null> | null };

export type GetUserChatGroupByIdQueryVariables = Exact<{
  groupId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUserChatGroupByIdQuery = { __typename?: 'Query', group?: { __typename?: 'Group', messages?: Array<{ __typename?: 'Message', name: string, message: string } | null> | null } | null };

export type MessageFieldsFragment = { __typename?: 'Message', name: string, message: string };
