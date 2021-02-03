import { Router } from 'react-router-dom';
import routes from '@/router';
import { Suspense } from 'react';
import renderRoutes from './router/renderRoutes';
import { useQuery } from '@apollo/client';
import { API } from './api';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';

function App({ history }: AppProps) {
  // 若需刷新再解构出refetch
  const { loading, error, data } = useQuery(API.USER_DATA, {
    variables: {
      id: '600a74a4ed1dbf3e20d570c7',
    },
  });
  if (loading) {
    console.log(loading);
  }
  if (error) console.log(error);
  console.log(data);
  return (
    <ConnectedRouter history={history}>
      <Router history={history}>
        <Suspense fallback={<div>Loading...</div>}>{renderRoutes(routes)}</Suspense>
      </Router>
    </ConnectedRouter>
  );
}

export default App;

interface AppProps {
  history: History;
}
