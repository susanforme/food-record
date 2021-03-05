import { RightOutlined } from '@ant-design/icons';
import React, { useContext, useRef, useState } from 'react';
import { connect, history, State } from 'umi';
import styles from './me.less';
import TouchFeedback from 'rmc-feedback';
import Empty from 'antd/es/empty';
import UploadImg from '@/components/UploadImg';
import { ImgPrefixConext } from '@/context';
import { USER_API } from '@/api/query';
import client from '@/api';
import { notification, Progress } from 'antd';

const Me: React.FC<MeProps> = ({ user, logout, updateHeadImg }) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const imgPrefix = useContext(ImgPrefixConext);
  const [load, setLoad] = useState({ loading: false, progress: 0 });
  if (!user.id) {
    return (
      <div onClick={() => history.push('account/login')} style={{ marginTop: '1rem' }}>
        <Empty description="你还没有登录点击去登录"></Empty>
      </div>
    );
  }
  return (
    <div className={styles.me}>
      <div className={styles.top}>
        {load.loading ? (
          <Progress type="circle" percent={load.progress} width={60} />
        ) : (
          <div
            className={styles.img}
            style={{ backgroundImage: `url(${user.headImg})` }}
            onClick={() => {
              imgRef.current?.click();
            }}
          />
        )}
        <p>{user.username}</p>
      </div>
      <UploadImg
        onReadComplete={() => {
          setLoad({ loading: true, progress: 0 });
        }}
        onComplete={(url) => {
          const headImg = imgPrefix + url;
          setLoad({ loading: false, progress: 0 });
          client
            .mutate({
              mutation: USER_API.UPDATE_HEAD_IMG,
              variables: {
                url: headImg,
              },
            })
            .then(() => {
              // 此处修改headImg
              notification.success({ message: '头像更改成功', duration: 1.5 });
              updateHeadImg(headImg);
            })
            .catch(() => {
              notification.error({ message: '图片上传失败请稍后再试', duration: 1.5 });
            });
        }}
        onUploadProgressChange={(progress) => {
          setLoad({ loading: true, progress });
        }}
        ref={imgRef}
        style={{ display: 'none' }}
      />
      <TouchFeedback activeClassName={styles.active}>
        <div className={styles.list} onClick={() => history.push('/home')}>
          我的发现
          <div className={styles.right}>
            <RightOutlined />
          </div>
        </div>
      </TouchFeedback>
      <TouchFeedback activeClassName={styles.active}>
        <div className={styles.list} onClick={() => history.push('/message')}>
          我的聊天
          <div className={styles.right}>
            <RightOutlined />
          </div>
        </div>
      </TouchFeedback>
      <TouchFeedback activeClassName={styles.active}>
        <div
          className={styles.list}
          onClick={() =>
            history.push({ pathname: '/account/user', query: { userId: user.id || '' } })
          }
        >
          个人主页
          <div className={styles.right}>
            <RightOutlined />
          </div>
        </div>
      </TouchFeedback>
      <TouchFeedback activeClassName={styles.active}>
        <div className={styles.list}>
          <a href="mailto:942840260@qq.com">
            邮箱联系
            <div className={styles.right}>
              <RightOutlined />
            </div>
          </a>
        </div>
      </TouchFeedback>
      <TouchFeedback activeClassName={styles.active}>
        <div className={styles.list}>
          <a href="tel:10086">
            电话联系
            <div className={styles.right}>
              <RightOutlined />
            </div>
          </a>
        </div>
      </TouchFeedback>

      <div className={styles.buttonFather}>
        <button
          className={styles.button}
          onClick={() => {
            logout();
          }}
        >
          退出登录
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  user: state.index.user,
});
const mapDispatchToProps = (dispatch: Function) => ({
  logout() {
    dispatch({
      type: 'index/logout',
    });
  },
  updateHeadImg(url: string) {
    dispatch({
      type: 'index/UPDATE_HEAD_IMG',
      payload: url,
    });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Me);

interface MeProps {
  user: State['index']['user'];
  logout: () => any;
  updateHeadImg(url: string): void;
}
