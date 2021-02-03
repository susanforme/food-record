import { BrowserRouter as Router } from 'react-router-dom';
import routes from '@/router';
import NavBar from '@/components/NavBar';
import { Suspense } from 'react';
import renderRoutes from './router/renderRoutes';
import { useQuery } from '@apollo/client';
import { API } from './api';
import { Button } from 'antd';
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
      <Router>
        <Suspense fallback={<div>Loading...</div>}>{renderRoutes(routes)}</Suspense>
        <Button>button</Button>
        <NavBar></NavBar>
      </Router>
    </ConnectedRouter>
  );
}

export default App;

interface AppProps {
  history: History;
}
