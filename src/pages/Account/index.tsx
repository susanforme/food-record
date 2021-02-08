import React from 'react';
import { createUseStyles } from 'react-jss';

const Login: React.FC = (props) => {
  const style = useStyles();
  return <div className={style.account}>{props.children}</div>;
};

export default Login;

function useStyles() {
  return createUseStyles({
    account: {
      backgroundColor: 'white',
      minHeight: 'calc(100vh - 50px)',
      padding: '4vw 8vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  })();
}
