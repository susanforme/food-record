import client from '@/api';
import { TOOL_API } from '@/api/query';
import { notification } from 'antd';
import { SHA256 as sha256 } from 'crypto-js';

/**
 * @description
 * 获取是否为子路由,或者就是当前路由
 */
export const getIsChildRoute = (father: string, child: string) => {
  return child === father || (child.includes(father) && child.replace(father, '').startsWith('/'));
};

// 需要显示底部导航栏的页面
export const bottomNavMap = [
  {
    path: '/home',
    title: '首页',
    icon: 'icon-home',
  },
  {
    path: '/ranging',
    title: '测距',
    icon: 'icon-feiji',
  },
  {
    path: '/publish',
    title: '发表',
    icon: '',
  },
  {
    path: '/message',
    title: '消息',
    icon: 'icon-message',
  },
  {
    path: '/me',
    title: '我的',
    icon: 'icon-user',
  },
];

/**
 * @description
 * 防抖
 * @param delay 毫秒
 */
export const debounceFactory = (delay: number) => {
  let pre = Date.now();
  return (callback: Function) => {
    const now = Date.now();
    if (now - pre > delay) {
      pre = now;
      callback && callback();
    }
  };
};

export const baiduMapKey = 'TXekIWRi1mnbMbR11Ks1dURc9GgY33bX';

export const validateAndLogin = (
  loginArgs: LoginArgs,
  captcha: string,
  loginStatus: number,
  setNeedrefresh: React.Dispatch<React.SetStateAction<boolean>>,
  login: (data: any) => void,
) => {
  const { username, email, password, captcha: inputCaptcha } = loginArgs;
  // eslint-disable-next-line no-useless-escape
  const emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (loginStatus === 1 && !username) {
    setTimeout(() => {
      setNeedrefresh(false);
    }, 10);
    setNeedrefresh(true);
    return notification.error({ message: '请正确输入用户名', duration: 1.5 });
  }
  if (loginStatus === 2 && !emailPattern.test(email)) {
    setTimeout(() => {
      setNeedrefresh(false);
    }, 10);
    setNeedrefresh(true);
    return notification.error({ message: '请正确输入邮箱', duration: 1.5 });
  }
  if (!password) {
    setTimeout(() => {
      setNeedrefresh(false);
    }, 10);
    setNeedrefresh(true);
    return notification.error({ message: '密码不能为空', duration: 1.5 });
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
  const data =
    loginStatus === 1
      ? { email: '', username, password: sha256(password).toString() }
      : {
          email,
          username: '',
          password: sha256(password).toString(),
        };
  login(data);
};

export interface LoginArgs {
  username: string;
  captcha: string;
  email: string;
  password: string;
}

export const validateAndRegister = (
  registerArgs: RegisterArgs,
  captcha: string,
  setNeedrefresh: React.Dispatch<React.SetStateAction<boolean>>,
  register: (data: any) => void,
) => {
  const { username, email, password, captcha: inputCaptcha, repassword } = registerArgs;
  // eslint-disable-next-line no-useless-escape
  const emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (!username) {
    setTimeout(() => {
      setNeedrefresh(false);
    }, 10);
    setNeedrefresh(true);
    return notification.error({ message: '请正确输入用户名', duration: 1.5 });
  }
  if (!emailPattern.test(email)) {
    setTimeout(() => {
      setNeedrefresh(false);
    }, 10);
    setNeedrefresh(true);
    return notification.error({ message: '请正确输入邮箱', duration: 1.5 });
  }
  if (!password) {
    setTimeout(() => {
      setNeedrefresh(false);
    }, 10);
    setNeedrefresh(true);
    return notification.error({ message: '密码不能为空', duration: 1.5 });
  }
  if (password !== repassword) {
    setTimeout(() => {
      setNeedrefresh(false);
    }, 10);
    setNeedrefresh(true);
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
  register(data);
};

export function getMapPlugins() {
  const { AMap } = window;
  const startMarkerOptions = {
    icon: new AMap.Icon({
      // 图标大小
      size: new AMap.Size(19, 31),
      imageSize: new AMap.Size(19, 31),
      image: 'https://webapi.amap.com/theme/v1.3/markers/b/start.png',
    }),
  };
  const endMarkerOptions = {
    icon: new AMap.Icon({
      size: new AMap.Size(19, 31),
      imageSize: new AMap.Size(19, 31),
      image: 'https://webapi.amap.com/theme/v1.3/markers/b/end.png',
    }),
    offset: new AMap.Pixel(-9, -31),
  };
  const midMarkerOptions = {
    icon: new AMap.Icon({
      size: new AMap.Size(19, 31),
      imageSize: new AMap.Size(19, 31),
      image: 'https://webapi.amap.com/theme/v1.3/markers/b/mid.png',
    }),
    offset: new AMap.Pixel(-9, -31),
  };
  const lineOptions = {
    strokeStyle: 'solid',
    strokeColor: '#FF33FF',
    strokeOpacity: 1,
    strokeWeight: 2,
  };
  return {
    startMarkerOptions,
    midMarkerOptions,
    endMarkerOptions,
    lineOptions,
  };
}

/**
 * @description
 * 将天气从中文转换为英文
 */
export function convertWeather(weather?: string) {
  if (!weather) {
    return 'CLOUDY';
  }
  const hour = new Date().getHours();
  const isDay = hour > 6 && hour < 18;
  if (weather.includes('雨')) {
    return 'RAIN';
  } else if (weather.includes('雾')) {
    return 'FOG';
  } else if (weather.includes('雪')) {
    return 'SNOW';
  } else if (weather.includes('风')) {
    return 'WIND';
  } else if (weather.includes('多云')) {
    return 'CLOUDY';
  }
  // 未匹配天气默认晴
  if (isDay) {
    return 'CLEAR_DAY';
  } else {
    return 'CLEAR_NIGHT';
  }
}

export interface RegisterArgs {
  username: string;
  captcha: string;
  email: string;
  password: string;
  repassword: string;
}

export function parseFile(file: File, index: number): Promise<ParseFileData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataURL = (e.target as any).result;
      if (!dataURL) {
        reject(`Fail to get the ${index} image`);
        return;
      }
      resolve({
        src: dataURL,
        file,
        isUpload: false,
      });
    };
    reader.readAsDataURL(file);
  });
}

export interface ParseFileData {
  file: File;
  src: string;
  isUpload: boolean;
}

export async function uploadImg(file: File, onUploadProgress: (progress: ProgressEvent) => void) {
  const data = await client.mutate({
    mutation: TOOL_API.UPLOAD_IMG,
    variables: {
      file,
    },
    context: {
      fetchOptions: {
        onUploadProgress,
      },
    },
  });
  return data;
}
