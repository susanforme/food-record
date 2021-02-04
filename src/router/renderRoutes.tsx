import NavBar from '@/components/NavBar';
import store, { history } from '@/store';
import { Switch, Route, Redirect } from 'react-router';
import { RouteConfig } from 'react-router-config';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function renderRoutes(routes: RouteConfig[], extraProps: any = {}, switchProps = {}) {
  console.log(history.location);

  return routes ? (
    <TransitionGroup>
      <CSSTransition key={history.location.key} timeout={1000} classNames="fade">
        <Switch {...switchProps} location={history.location}>
          {routes.map((route, i) => (
            <Route
              key={route.key || i}
              path={route.path}
              exact={route.exact}
              strict={route.strict}
              render={(props) => {
                const { isLogin } = store.getState().state;
                if (!route.auth || isLogin) {
                  const nav = route?.args?.isMenu ? <NavBar /> : null;
                  if (route.title) {
                    document.title = route.title;
                  }
                  return (
                    <>
                      {route.render
                        ? route.render({ ...props, ...extraProps, route })
                        : route.component && (
                            <route.component {...props} {...extraProps} route={route} />
                          )}
                      {nav}
                    </>
                  );
                }
                return <Redirect to="/login" />;
              }}
            />
          ))}
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  ) : null;
}

export default renderRoutes;
