import renderRoutes from '@/router/renderRoutes';

function Home(props: any) {
  return renderRoutes(props.route.routes);
}

export default Home;
