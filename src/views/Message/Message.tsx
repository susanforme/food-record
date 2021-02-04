import Routes from '@/router/Routes';

function Message(props: any) {
  return <Routes routes={props.route.routes}></Routes>;
}

export default Message;
