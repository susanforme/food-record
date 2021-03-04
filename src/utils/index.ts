import client from '@/api';
import { ARTICLE_API, TOOL_API } from '@/api/query';
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

export function parseFile(file: File): Promise<ParseFileData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataURL = (e.target as any).result;
      if (!dataURL) {
        reject(`Fail to get the  image`);
        return;
      }
      resolve({
        src: dataURL,
        file,
      });
    };
    reader.readAsDataURL(file);
  });
}

export interface ParseFileData {
  file: File;
  src: string;
}

export async function uploadImg(file: File, onUploadProgress?: (progress: ProgressEvent) => void) {
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

export function radomlyGeneratColor(random: number) {
  const colors = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'geekblue',
    'blue',
    'lime',
    'cyan',
  ];
  const res = [];
  for (let i = 0; i < random; i++) {
    const randomNum = Math.round(Math.random() * (colors.length - 1));
    res.push(colors[randomNum]);
  }
  return res;
}

export async function validateArticle(data: CreateArticleData) {
  const { author, title, content, imgPath, kind, label, cityCode, score } = data;
  if (!author) {
    throw new Error('未登录');
  }
  if (!title) {
    throw new Error('请填写标题');
  }
  if (!content) {
    throw new Error('请填写正文');
  }
  if (imgPath.length < 1) {
    throw new Error('请至少上传一张图片');
  }
  if (!kind) {
    throw new Error('请选择分类');
  }
  if (!(label.length > 1 && label.length < 5)) {
    throw new Error('至少选择2个标签,至多4个');
  }
  if (!cityCode) {
    throw new Error('请选择选择位置');
  }
  if (score === 0) {
    throw new Error('请评分');
  }
  return true;
}

export async function sendArticleAndValidate(data: CreateArticleData) {
  const validate = await validateArticle(data);
  console.log(data);

  if (validate) {
    const res = await client.mutate({
      mutation: ARTICLE_API.CREATE_ARTICLE,
      variables: {
        data,
      },
    });
    return res.data;
  }
}

export interface CreateArticleData {
  author: string;
  title: string;
  content: string;
  imgPath: string[];
  kind: string;
  label: string[];
  location: string;
  score: number;
  cityCode: string;
}

export function isEmoji(str: string) {
  // U+1F680 to U+1F6FF
  const ranges = [
    '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])',
  ];
  if (str[0].match(ranges.join('|'))) {
    return true;
  } else {
    return false;
  }
}

export function getNotEmptyArray(ary: Array<any>) {
  const newAry: any[] = [];
  for (const v of ary) {
    if (!Object.is(undefined, v) && !Object.is(null, v)) {
      newAry.push(v);
    }
  }
  return newAry;
}
