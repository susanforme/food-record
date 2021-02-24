/* eslint-disable react-hooks/rules-of-hooks */
import { UserApiData, USER_API } from '@/api/query';
import { useQuery } from '@apollo/client';
import Empty from 'antd/es/empty';
import React, { useEffect, useMemo, useState } from 'react';
import { history } from 'umi';
import Shelf from '@/components/Shelf';
import styles from './user.less';
import TouchFeedback from 'rmc-feedback';
import { Avatar, Tabs, Tag } from 'antd';
import { radomlyGeneratColor } from '@/utils';
import TabContent from './components/TabContent';

const { TabPane } = Tabs;
const User: React.FC = () => {
  const userId = history.location.query?.userId;
  if (!userId) {
    return <div></div>;
  }
  const { loading, data } = useQuery<UserApiData['user']>(USER_API.USER_DATA, {
    variables: {
      userId,
    },
  });
  const user = useMemo(() => data?.user, [data?.user]);
  const colors = useMemo(() => radomlyGeneratColor(user?.foodTags.length || 0), [
    user?.foodTags.length,
  ]);
  const [key, setKey] = useState<ShowKey>('article');

  useEffect(() => {
    if (user?.user.username) {
      document.title = user?.user.username;
    }
  }, [user?.user.username]);
  if (!loading && !data) {
    return <Empty description="没有该用户哦" style={{ marginTop: '1rem' }} />;
  }

  return loading ? (
    <Shelf />
  ) : (
    <div className={styles.user}>
      <div className={styles.bg}>
        <div className={styles.top}>
          <Avatar src={user?.user.headImg} className={styles.avatar}></Avatar>
          <p className={styles.username}>{user?.user.username}</p>
        </div>
        <div className={styles.like}>
          <span>0 被喜欢</span>
          <span>{user?.discuss.fan}粉丝</span>
          <span>{user?.discuss.attention}关注</span>
          <TouchFeedback activeClassName={styles.active}>
            <button className={styles.button}>聊天</button>
          </TouchFeedback>
        </div>
      </div>
      <div className={styles.tags}>
        <p>Ta的美食标签</p>
        {user?.foodTags.map((v, index) => {
          if (v) {
            return (
              <Tag key={v} color={colors[index]}>
                {v.length > 8 ? v.slice(0, 6) + '...' : v}
              </Tag>
            );
          }
          return null;
        })}
      </div>
      <div className={styles.bottom}>
        <Tabs
          defaultActiveKey="article"
          onChange={(key) => {
            setKey(key as ShowKey);
          }}
        >
          <TabPane key="article" tab={'美食' + user?.articleCount} />
          <TabPane key="comment" tab={'看法' + user?.commentCount} />
          <TabPane key="strategy" tab="攻略 0" />
        </Tabs>
        <TabContent user={user} showKey={key} />
      </div>
    </div>
  );
};

export default User;

type ShowKey = 'article' | 'comment' | 'strategy';
