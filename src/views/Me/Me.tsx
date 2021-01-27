import renderRoutes from '@/router/renderRoutes';

function Me(props: any) {
  // 设置放在这里面
  return props.location.pathname !== props.route.path ? (
    renderRoutes(props.route.routes)
  ) : (
    <div>个人页面</div>
  );
}
export default Me;
