import { useAuth } from '@/hooks';
import { Redirect } from 'umi';

const Auth: React.FC = (props) => {
  const { isLogin } = useAuth();
  if (isLogin) {
    return <>{props.children}</>;
  } else {
    return <Redirect to="/login" />;
  }
};

export default Auth;
