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
import styles from './account.less';
import { RegisterArgs, validateAndRegister } from '@/utils';

const Register: React.FC<RegisterProps> = ({ register, isLogin }) => {
  document.title = '注册你的账号';
  const [captcha, setCaptcha] = useState('');
  const [needRefresh, setNeedrefresh] = useState(false);
  const [registerArgs, setRegisterArgs] = useState<RegisterArgs>({
    email: '',
    username: '',
    password: '',
    repassword: '',
    captcha: '',
  });
  useEffect(() => {
    if (isLogin) {
      return history.goBack();
    }
  }, [isLogin]);
  return (
    <div className={styles.account}>
      <div className={styles['img-father']}>
        <img src={require('@/assets/img/icon.png')} />
      </div>
      <Input
        size="large"
        placeholder="用户名"
        className={styles.input}
        maxLength={20}
        allowClear
        value={registerArgs.username}
        onChange={(e) => setRegisterArgs({ ...registerArgs, username: e.target.value })}
        prefix={<UserOutlined />}
      />
      <Input
        size="large"
        placeholder="邮箱"
        maxLength={40}
        type="email"
        allowClear
        value={registerArgs.email}
        onChange={(e) => setRegisterArgs({ ...registerArgs, email: e.target.value })}
        prefix={<MailOutlined />}
        className={styles.input}
      />
      <Input.Password
        size="large"
        placeholder="密码"
        maxLength={24}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        value={registerArgs.password}
        onChange={(e) => setRegisterArgs({ ...registerArgs, password: e.target.value })}
        className={styles.input}
        prefix={<LockOutlined />}
      />
      <Input.Password
        size="large"
        placeholder="重复密码"
        maxLength={24}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        value={registerArgs.repassword}
        onChange={(e) => setRegisterArgs({ ...registerArgs, repassword: e.target.value })}
        className={styles.input}
        prefix={<LockOutlined />}
      />
      <Input
        placeholder="验证码"
        prefix={<Icon type="icon-yanzhengma-2" style={{ fontSize: '0.8533333333333334rem' }} />}
        maxLength={4}
        value={registerArgs.captcha}
        onChange={(e) => setRegisterArgs({ ...registerArgs, captcha: e.target.value })}
        suffix={
          <AuthCode
            setCaptcha={setCaptcha}
            needRefresh={needRefresh}
            style={{ marginRight: '-1.6rem' }}
          />
        }
        className={styles.input}
        onPressEnter={() => validateAndRegister(registerArgs, captcha, setNeedrefresh, register)}
      />
      <p className={styles.tips}>
        注册即代表自动同意 《用户服务协议》和
        <span onClick={() => goToOtherPage()}>《隐私权政策》</span>
      </p>
      <Button
        className={styles['login-button']}
        type="primary"
        onClick={() => validateAndRegister(registerArgs, captcha, setNeedrefresh, register)}
      >
        注册
      </Button>
      <div className={styles.bottom}>
        <span className={styles.about} onClick={() => history.push('/about')}>
          关于我们
        </span>
        <span className={styles.shu}>|</span>
        <span
          className={styles.about}
          onClick={() => history.push('/account/login', { title: '登录' })}
        >
          已有账号?登录
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  isLogin: state.index.isLogin,
});

const mapDispatchToProps = (dispatch: Function) => ({
  register(data: any) {
    dispatch({
      type: 'index/register',
      payload: data,
    });
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));

function goToOtherPage() {
  open('https://img.52acfun.cn/%E9%9A%90%E7%A7%81%E6%9D%83%E6%94%BF%E7%AD%96.html');
}

interface RegisterProps {
  register(data: any): void;
  isLogin: boolean;
}
