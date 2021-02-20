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
import { connect, history, State, withRouter } from 'umi';
import { useEffect, useState } from 'react';
import style from './account.less';
import { LoginArgs, validateAndLogin } from '@/utils';

const Login: React.FC<LoginProps> = ({ beLogin, isLogin }) => {
  document.title = '登录你的账号';
  // 1位为手机登录,2为邮箱登录
  const [loginStatus, setLoginStatus] = useState(1);
  const [captcha, setCaptcha] = useState('');
  const [needRefresh, setNeedrefresh] = useState(false);
  const [loginArgs, setLoginArgs] = useState<LoginArgs>({
    email: '',
    username: '',
    password: '',
    captcha: '',
  });
  const changLoginMethod = () => {
    const status = loginStatus === 1 ? 2 : 1;
    setLoginStatus(status);
  };
  useEffect(() => {
    if (isLogin) {
      return history.goBack();
    }
  }, [isLogin]);

  return (
    <>
      {loginStatus === 1 ? (
        <Input
          size="large"
          placeholder="用户名"
          className={style.input}
          maxLength={20}
          allowClear
          value={loginArgs.username}
          onChange={(e) => setLoginArgs((pre) => ({ ...pre, username: e.target.value }))}
          prefix={<UserOutlined />}
        />
      ) : (
        <Input
          size="large"
          placeholder="邮箱"
          maxLength={40}
          type="email"
          allowClear
          value={loginArgs.email}
          onChange={(e) => setLoginArgs((pre) => ({ ...pre, email: e.target.value }))}
          prefix={<MailOutlined />}
          className={style.input}
        />
      )}
      <Input.Password
        size="large"
        placeholder="密码"
        maxLength={24}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        value={loginArgs.password}
        onChange={(e) => setLoginArgs((pre) => ({ ...pre, password: e.target.value }))}
        className={style.input}
        prefix={<LockOutlined />}
      />
      <Input
        placeholder="验证码"
        prefix={<Icon type="icon-yanzhengma-2" style={{ fontSize: '0.8533333333333334rem' }} />}
        maxLength={4}
        value={loginArgs.captcha}
        onChange={(e) => setLoginArgs((pre) => ({ ...pre, captcha: e.target.value }))}
        suffix={
          <AuthCode
            setCaptcha={setCaptcha}
            needRefresh={needRefresh}
            style={{ marginRight: '-1.6rem' }}
          />
        }
        className={style.input}
        onPressEnter={() =>
          validateAndLogin(loginArgs, captcha, loginStatus, setNeedrefresh, beLogin)
        }
      />
      <p className={style['email-login']} onClick={changLoginMethod}>
        {loginStatus === 1 ? '邮箱登录' : '用户名登录'}
      </p>
      <p className={style.tips}>
        登录即自动表示已同意 《用户服务协议》和
        <span onClick={() => goToOtherPage()}>《隐私权政策》</span>
      </p>
      <Button
        className={style['login-button']}
        type="primary"
        onClick={() => validateAndLogin(loginArgs, captcha, loginStatus, setNeedrefresh, beLogin)}
      >
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

const mapStateToProps = (state: State) => ({
  isLogin: state.index.isLogin,
});

const mapDispatchToProps = (dispatch: Function) => ({
  beLogin(data: any) {
    dispatch({
      type: 'index/login',
      payload: data,
    });
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

function goToOtherPage() {
  open(
    'https://chengcheng-1256396014.cos.ap-guangzhou.myqcloud.com/%E9%9A%90%E7%A7%81%E6%9D%83%E6%94%BF%E7%AD%96.html',
  );
}

interface LoginProps {
  beLogin(data: any): void;
  isLogin: boolean;
}
