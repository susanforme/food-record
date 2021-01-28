import { BrowserRouter as Router } from 'react-router-dom';
import routes from '@/router';
import NavBar from '@/components/NavBar';
import { Suspense } from 'react';
import renderRoutes from './router/renderRoutes';
import { useQuery } from '@apollo/client';
import { API } from './api';

function App() {
  const { loading, error, data } = useQuery(API.USER_DATA, {
    variables: {
      id: '600a74a4ed1dbf3e20d570c7',
    },
  });
  if (loading) {
    return <div>loading</div>;
  }
  if (error) console.log(error);

  console.log(data);

  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>{renderRoutes(routes)}</Suspense>
        <NavBar></NavBar>
      </Router>
    </>
  );
}

export default App;
