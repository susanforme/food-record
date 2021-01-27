import { renderRoutes } from 'react-router-config';
import { HashRouter } from 'react-router-dom';
import routes from '@/router';

function App() {
  return (
    <div>
      <HashRouter>{renderRoutes(routes)}</HashRouter>
    </div>
  );
}

export default App;
