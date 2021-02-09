import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import io from 'socket.io-client';

const uri = '/api';
const uploadLink = createUploadLink({
  uri,
}) as unknown;

const client = new ApolloClient({
  uri,
  link: uploadLink as ApolloLink,
  cache: new InMemoryCache(),
  credentials: 'same-origin',
});

export default client;

export const getSocket = () => io('http://localhost:4000');
