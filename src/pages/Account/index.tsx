import React from 'react';
import { createUseStyles } from 'react-jss';

const Login: React.FC = (props) => {
  const style = useStyles();
  return (
    <div className={style.account}>
      <div className={style.imgFather}>
        <img src={require('@/assets/img/icon.png')} />
      </div>
      {props.children}
    </div>
  );
};

export default Login;

function useStyles() {
  return createUseStyles({
    account: {
      backgroundColor: 'white',
      minHeight: 'calc(100vh - 2.6666666666666665rem)',
      padding: '4vw 8vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    imgFather: {
      width: '45%',
      marginBottom: '5%',
      '& img': {
        width: '7.52rem',
        height: '6.5rem',
      },
    },
  })();
}
