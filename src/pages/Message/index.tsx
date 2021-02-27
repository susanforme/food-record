import React from 'react';
import { List, Empty } from 'antd';
import { connect, history, State } from 'umi';
import { useQuery } from '@apollo/client';
import { CHAT_API } from '@/api/query';
import TouchFeedback from 'rmc-feedback';
import styles from './message.less';
import moment from 'moment';

const { Item } = List;
const Message: React.FC<MessageProps> = ({ user, isLogin }) => {
  const { data } = useQuery(CHAT_API.MESSAGE_LIST, {
    variables: {
      id: user.id,
    },
  });
  if (!isLogin) {
    return <Empty description="没有登录哦"></Empty>;
  }

  return (
    <div className={styles.message}>
      <List
        dataSource={[...(data?.messageList || [])].sort(
          (a, b) => b.record.createTime - a.record.createTime,
        )}
        renderItem={(item: MessageItemProps) => {
          return (
            <Item
              key={item.user.id}
              className={styles.item}
              onClick={() => {
                history.push({
                  pathname: '/chat',
                  state: { userId: item?.user.id || '', headImg: item?.user.headImg || '' },
                });
              }}
            >
              <TouchFeedback activeClassName={styles.active}>
                <div className={styles['item-child']}>
                  <div className={styles.left}>
                    <img src={item?.user.headImg} alt="" />
                  </div>
                  <div className={styles.username}>{item?.user.username}</div>
                  <div className={styles.msg}>{item.record.img ? '图片' : item.record.message}</div>
                  <div className={styles.right}>{moment(item.record.createTime).fromNow()}</div>
                </div>
              </TouchFeedback>
            </Item>
          );
        }}
      ></List>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  user: state.index.user,
  isLogin: state.index.isLogin,
});

export default connect(mapStateToProps)(Message);

interface MessageProps {
  user: State['index']['user'];
  isLogin: boolean;
}

interface MessageItemProps {
  record: {
    createTime: number;
    id: string;
    img?: string;
    message?: string;
  };
  user: {
    username: string;
    id: string;
    headImg: string;
  };
}
