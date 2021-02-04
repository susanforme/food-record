import store from '@/store';
import { useRef } from 'react';
import { Switch, Redirect, withRouter, Route } from 'react-router';
import { RouteConfig } from 'react-router-config';

function Routes({ routes }: RoutesProps) {
  const nodeRef = useRef(null);
  const MyRoute = withRouter(({ location }) => {
    return routes ? (
      <Switch location={location}>
        {routes.map((route, i) => (
          <Route
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={(props: any) => {
              const { isLogin } = store.getState().state;
              if (!route.auth || isLogin) {
                if (route.title) {
                  document.title = route.title;
                }
                return (
                  <div ref={nodeRef} key={location.key}>
                    {route.render
                      ? route.render({ ...props, route })
                      : route.component && <route.component {...props} route={route} />}
                  </div>
                );
              }
              return <Redirect to="/login" />;
            }}
          />
        ))}
      </Switch>
    ) : null;
  });
  return <MyRoute></MyRoute>;
}

export default Routes;

interface RoutesProps {
  routes: RouteConfig[];
}
