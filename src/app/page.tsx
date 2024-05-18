"use client";

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

import ChatLayout from '@/components/layout/chat-layout';
import { ChatContextProvider } from '@/context/chat_context';
import mockLink from '@/middleware/mock';

export default function App() {
  const graphqlEndpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:5000/graphql';
  const httpLink = createHttpLink({
    uri: graphqlEndpoint,
  });

  const client = new ApolloClient({
    link: mockLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={ client }>
      <ChatContextProvider>
        <ChatLayout />
      </ChatContextProvider>
    </ApolloProvider>
  );
}
