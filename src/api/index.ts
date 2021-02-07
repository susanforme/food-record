import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import io from 'socket.io-client';

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql',
}) as unknown;
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  link: uploadLink as ApolloLink,
  cache: new InMemoryCache(),
});

export default client;

export const getSocket = () => io('http://localhost:4000');
