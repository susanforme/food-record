import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { RouteConfig } from 'react-router-config';

function renderRoutes(routes: RouteConfig[], extraProps = {}, switchProps = {}) {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => {
        // 这里进行redux鉴权是否登录
        if (!route.auth) {
          return (
            <Route
              key={route.key || i}
              path={route.path}
              exact={route.exact}
              strict={route.strict}
              render={(props) =>
                route.render
                  ? route.render({ ...props, ...extraProps, route })
                  : route.component && <route.component {...props} {...extraProps} route={route} />
              }
            />
          );
        }
        return <Redirect to="/me/login"></Redirect>;
      })}
    </Switch>
  ) : null;
}

export default renderRoutes;
