import React, { useState } from 'react';
import style from './index.less';
import { Button, Input } from 'antd';
import {
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  MailOutlined,
  LockOutlined,
} from '@ant-design/icons';
import AuthCode from '@/components/AuthCode';
import Icon from '@/components/Icon';
import { history } from 'umi';
import Regiser from './Register';
import { CSSTransition } from 'react-transition-group';

const Login: React.FC = () => {
  const [captcha, setCaptcha] = useState('');
  // 00 为注册,01位为手机登录,02为邮箱登录
  const [loginStatus, setLoginStatus] = useState('01');
  console.log(captcha);
  const changLoginMethod = () => {
    const status = loginStatus === '01' ? '02' : '01';
    setLoginStatus(status);
  };
  return (
    <div className={style['login-register']}>
      <CSSTransition in={loginStatus === '00'} timeout={500}>
        {loginStatus !== '00' ? (
          <>
            <div className={style['img-father']}>
              <img src={require('@/img/icon.png')} />
            </div>
            {loginStatus === '01' ? (
              <Input
                size="large"
                placeholder="手机号"
                className={style.input}
                maxLength={11}
                type="number"
                prefix={<UserOutlined />}
              />
            ) : (
              <Input
                size="large"
                placeholder="邮箱"
                maxLength={40}
                prefix={<MailOutlined />}
                className={style.input}
              />
            )}
            <Input.Password
              size="large"
              placeholder="密码"
              maxLength={24}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              className={style.input}
              prefix={<LockOutlined />}
            />
            <Input
              placeholder="验证码"
              prefix={
                <Icon type="icon-yanzhengma-2" style={{ fontSize: '16px' }} />
              }
              maxLength={4}
              suffix={
                <AuthCode
                  setCaptcha={setCaptcha}
                  style={{ marginRight: '-1.6rem' }}
                />
              }
              className={style.input}
            />
            <p className={style['email-login']} onClick={changLoginMethod}>
              {loginStatus === '01' ? '邮箱登录' : '手机号登录'}
            </p>
            <p className={style.tips}>
              新用户登录即自动注册，并表示已同意 《用户服务协议》和
              <span>《隐私权政策》</span>
            </p>
            <Button className={style['login-button']} type="primary">
              登录
            </Button>
            <div className={style.bottom}>
              <span
                className={style.about}
                onClick={() => history.push('/about')}
              >
                关于我们
              </span>
              <span>|</span>
              <span
                className={style.about}
                onClick={() => setLoginStatus('00')}
              >
                注册账号
              </span>
            </div>
          </>
        ) : (
          <Regiser />
        )}
      </CSSTransition>
    </div>
  );
};

export default Login;
