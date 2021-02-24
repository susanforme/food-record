/* eslint-disable react-hooks/rules-of-hooks */
import { UserApiData, USER_API } from '@/api/query';
import { useQuery } from '@apollo/client';
import Empty from 'antd/es/empty';
import React, { useEffect, useMemo } from 'react';
import { history } from 'umi';
import Shelf from '@/components/Shelf';
import styles from './user.less';

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
  console.log(data);
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
    <div>
      <div className={styles.bg}></div>
    </div>
  );
};

export default User;
