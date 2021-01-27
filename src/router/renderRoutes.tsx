import store from '@/store';
import { Switch, Route, Redirect } from 'react-router';
import { RouteConfig } from 'react-router-config';

function renderRoutes(routes: RouteConfig[], extraProps: any = {}, switchProps = {}) {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={(props) => {
            const { isLogin } = store.getState();
            if (!route.auth || isLogin) {
              if (route.title) {
                document.title = route.title;
              }
              return route.render
                ? route.render({ ...props, ...extraProps, route })
                : route.component && <route.component {...props} {...extraProps} route={route} />;
            }
            return <Redirect to="/me/login" />;
          }}
        />
      ))}
    </Switch>
  ) : null;
}

export default renderRoutes;
