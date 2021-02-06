import { useAuth } from '@/hooks';
import { Redirect, useLocation } from 'umi';

const Auth: React.FC = (props) => {
  const { isLogin } = useAuth();
  const location = useLocation();
  if (isLogin) {
    return <>{props.children}</>;
  } else {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location.pathname },
        }}
      />
    );
  }
};

export default Auth;
