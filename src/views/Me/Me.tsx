import renderRoutes from '@/router/renderRoutes';

function Me(props: any) {
  return renderRoutes(props.route.routes);
}
export default Me;
