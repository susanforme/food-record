import { Button, Input, notification } from 'antd';
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
import { SHA256 as sha256 } from 'crypto-js';
import { useMutation } from '@apollo/client';
import { USER_API } from '@/api/query';

const Register: React.FC = () => {
  const [captcha, setCaptcha] = useState('');
  const [needRefresh, setNeedrefresh] = useState(false);
  const [mutate] = useMutation(USER_API.REGISTER);
  const [loginArgs, setLoginArgs] = useState<RegisterArgs>({
    email: '',
    username: '',
    password: '',
    repassword: '',
    captcha: '',
  });
  function validateAndRegister() {
    const {
      username,
      email,
      password,
      captcha: inputCaptcha,
      repassword,
    } = loginArgs;
    // eslint-disable-next-line no-useless-escape
    const emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!username) {
      return notification.error({ message: '请正确输入用户名', duration: 1.5 });
    }
    if (!emailPattern.test(email)) {
      return notification.error({ message: '请正确输入邮箱', duration: 1.5 });
    }
    if (!password) {
      return notification.error({ message: '密码不能为空', duration: 1.5 });
    }
    if (password === repassword) {
      return notification.error({ message: '两次密码必须相同', duration: 1.5 });
    }
    if (
      captcha === undefined ||
      captcha === '' ||
      inputCaptcha.toLowerCase() !== captcha.toLowerCase()
    ) {
      notification.error({ message: '验证码错误', duration: 1.5 });
      setTimeout(() => {
        setNeedrefresh(false);
      }, 10);
      return setNeedrefresh(true);
    }
    const data = {
      username,
      password: sha256(password).toString(),
      email,
    };
    mutate({
      variables: {
        data,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        return notification.error({ message: err.message, duration: 1.5 });
      });
  }
  return (
    <>
      <Input
        size="large"
        placeholder="用户名"
        className={style.input}
        maxLength={20}
        allowClear
        value={loginArgs.username}
        onChange={(e) =>
          setLoginArgs((pre) => ({ ...pre, username: e.target.value }))
        }
        prefix={<UserOutlined />}
      />
      <Input
        size="large"
        placeholder="邮箱"
        maxLength={40}
        type="email"
        allowClear
        value={loginArgs.email}
        onChange={(e) =>
          setLoginArgs((pre) => ({ ...pre, email: e.target.value }))
        }
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
        value={loginArgs.password}
        onChange={(e) =>
          setLoginArgs((pre) => ({ ...pre, password: e.target.value }))
        }
        className={style.input}
        prefix={<LockOutlined />}
      />
      <Input.Password
        size="large"
        placeholder="重复密码"
        maxLength={24}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        value={loginArgs.repassword}
        onChange={(e) =>
          setLoginArgs((pre) => ({ ...pre, repassword: e.target.value }))
        }
        className={style.input}
        prefix={<LockOutlined />}
      />
      <Input
        placeholder="验证码"
        prefix={<Icon type="icon-yanzhengma-2" style={{ fontSize: '16px' }} />}
        maxLength={4}
        value={loginArgs.captcha}
        onChange={(e) =>
          setLoginArgs((pre) => ({ ...pre, captcha: e.target.value }))
        }
        suffix={
          <AuthCode
            setCaptcha={setCaptcha}
            needRefresh={needRefresh}
            style={{ marginRight: '-1.6rem' }}
          />
        }
        className={style.input}
      />
      <p className={style.tips}>
        注册即代表自动同意 《用户服务协议》和
        <span onClick={() => goToOtherPage()}>《隐私权政策》</span>
      </p>
      <Button
        className={style['login-button']}
        type="primary"
        onClick={() => validateAndRegister()}
      >
        注册
      </Button>
      <div className={style.bottom}>
        <span className={style.about} onClick={() => history.push('/about')}>
          关于我们
        </span>
        <span className={style.shu}>|</span>
        <span
          className={style.about}
          onClick={() => history.push('/account/login', { title: '登录' })}
        >
          已有账号?登录
        </span>
      </div>
    </>
  );
};

export default Register;

function goToOtherPage() {
  open(
    'https://chengcheng-1256396014.cos.ap-guangzhou.myqcloud.com/%E9%9A%90%E7%A7%81%E6%9D%83%E6%94%BF%E7%AD%96.html',
  );
}

interface RegisterArgs {
  username: string;
  captcha: string;
  email: string;
  password: string;
  repassword: string;
}
