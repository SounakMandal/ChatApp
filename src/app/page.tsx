"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import ChatLayout from '@/components/layout/chat-layout';

export default function App() {
  const graphqlEndpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:5000/graphql';

  const client = new ApolloClient({
    uri: graphqlEndpoint,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={ client }>
      <ChatLayout />
    </ApolloProvider>
  );
}
