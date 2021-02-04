import { Router } from 'react-router-dom';
import routes from '@/router';
import { Suspense } from 'react';
import Routes from './router/Routes';
import { useQuery } from '@apollo/client';
import { API } from './api';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { Spin } from 'antd';

function App({ history }: AppProps) {
  // 若需刷新再解构出refetch
  const test = useQuery(API.USER_DATA, {
    variables: {
      id: '600a74a4ed1dbf3e20d570c7',
    },
  });
  console.log(test);

  return (
    <ConnectedRouter history={history}>
      <Router history={history}>
        <Suspense fallback={<Spin tip="加载中" className="loading"></Spin>}>
          <Routes routes={routes}></Routes>
        </Suspense>
      </Router>
    </ConnectedRouter>
  );
}

export default App;

interface AppProps {
  history: History;
}
