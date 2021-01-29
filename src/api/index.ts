import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  link: createUploadLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache(),
});

export default client;

export const API = {
  USER_DATA: gql`
    query user($id: ID!) {
      user(id: $id) {
        username
      }
    }
  `,
};

Object.setPrototypeOf(API, null);
Object.freeze(API);
