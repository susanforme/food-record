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
import { useState } from 'react';
import style from './account.less';

const Login: React.FC = () => {
  // 1位为手机登录,2为邮箱登录
  const [loginStatus, setLoginStatus] = useState(1);
  const [captcha, setCaptcha] = useState('');
  console.log(captcha);

  const changLoginMethod = () => {
    const status = loginStatus === 1 ? 2 : 1;
    setLoginStatus(status);
  };
  return (
    <>
      <div className={style['img-father']}>
        <img src={require('@/img/icon.png')} />
      </div>
      {loginStatus === 1 ? (
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
      <p className={style['email-login']} onClick={changLoginMethod}>
        {loginStatus === 1 ? '邮箱登录' : '手机号登录'}
      </p>
      <p className={style.tips}>
        新用户登录即自动注册，并表示已同意 《用户服务协议》和
        <span onClick={() => goToOtherPage()}>《隐私权政策》</span>
      </p>
      <Button className={style['login-button']} type="primary">
        登录
      </Button>
      <div className={style.bottom}>
        <span className={style.about} onClick={() => history.push('/about')}>
          关于我们
        </span>
        <span className={style.shu}>|</span>
        <span
          className={style.about}
          onClick={() => history.push('/account/register', { title: '注册' })}
        >
          注册账号
        </span>
      </div>
    </>
  );
};

export default Login;

function goToOtherPage() {
  open(
    'https://chengcheng-1256396014.cos.ap-guangzhou.myqcloud.com/%E9%9A%90%E7%A7%81%E6%9D%83%E6%94%BF%E7%AD%96.html',
  );
}
