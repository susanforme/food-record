import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import axios from 'axios';
import io from 'socket.io-client';
import { buildAxiosFetch } from '@lifeomic/axios-fetch';

const uri = '/api';
const uploadLink = createUploadLink({
  uri,
  fetch: buildAxiosFetch(axios, (config: any, input: any, init: { onUploadProgress: any }) => ({
    ...config,
    onUploadProgress: init.onUploadProgress,
  })),
}) as unknown;

const client = new ApolloClient({
  uri,
  link: uploadLink as ApolloLink,
  cache: new InMemoryCache(),
  credentials: 'same-origin',
});

export default client;

export const getSocket = () => io('http://localhost:4000');
