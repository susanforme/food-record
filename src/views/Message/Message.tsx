import renderRoutes from '@/router/renderRoutes';

function Message(props: any) {
  return renderRoutes(props.route.routes);
}

export default Message;
