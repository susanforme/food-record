import { RightOutlined } from '@ant-design/icons';
import React from 'react';
import { connect, history, State } from 'umi';
import styles from './me.less';
import TouchFeedback from 'rmc-feedback';
import Empty from 'antd/es/empty';

const Me: React.FC<MeProps> = ({ user, logout }) => {
  if (!user.id) {
    return (
      <div onClick={() => history.push('account/login')}>
        <Empty description="你还没有登录点击去登录"></Empty>
      </div>
    );
  }
  return (
    <div className={styles.me}>
      <div className={styles.top}>
        <img src={user.headImg} alt="" />
        <p>{user.username}</p>
      </div>
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
});
export default connect(mapStateToProps, mapDispatchToProps)(Me);

interface MeProps {
  user: State['index']['user'];
  logout: () => any;
}
