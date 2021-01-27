import { BrowserRouter as Router } from 'react-router-dom';
import routes from '@/router';
import NavBar from '@/components/NavBar';
import { Suspense } from 'react';
import renderRoutes from './router/renderRoutes';

function App() {
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
