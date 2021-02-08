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

const Login: React.FC = () => {
  const [captcha, setCaptcha] = useState('');
  const [loginStatus] = useState(0);
  console.log(captcha, loginStatus);
  return (
    <div className={style.login}>
      <div className={style['img-father']}>
        <img src={require('@/img/icon.png')} />
      </div>
      <Input
        size="large"
        placeholder="手机号"
        className={style.input}
        maxLength={11}
        type="number"
        prefix={<UserOutlined />}
      />
      <Input
        size="large"
        placeholder="邮箱"
        maxLength={40}
        prefix={<MailOutlined />}
        className={style.input}
      />
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
        prefix={<Icon type="icon-yanzhengma-2" style={{ fontSize: '16px' }} />}
        maxLength={4}
        suffix={
          <AuthCode
            setCaptcha={setCaptcha}
            style={{ marginRight: '-1.6rem' }}
          />
        }
        className={style.input}
      />
      <p className={style.tips}>
        新用户登录即自动注册，并表示已同意
        <span>《用户服务协议》</span>和<span>《隐私权政策》</span>
      </p>
      <Button className={style['login-button']} type="primary">
        登录
      </Button>
      <p className={style.about} onClick={() => history.push('/about')}>
        关于我们
      </p>
    </div>
  );
};

export default Login;
