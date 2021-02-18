import client from '@/api';
import { TOOL_API } from '@/api/query';
import { Input, InputProps, notification } from 'antd';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const CoordInput: React.FC<CoordInputProps> = React.memo(({ onSuccess, size }) => {
  const [loading, setLoading] = useState(false);
  const styles = useStyles();
  return (
    <Input.Search
      className={styles.search}
      size={size || 'middle'}
      placeholder="输入关键词搜索"
      loading={loading}
      onSearch={(value) => {
        if (!value) {
          return;
        }
        setLoading(true);
        searchSomeWhere(value)
          .then((v) => {
            const { location } = v.data?.coord;
            const position = location.split(',').map((v) => Number(v));
            onSuccess({
              longitude: position[0],
              latitude: position[1],
            });
          })
          .catch((err) => {
            if (err.message.includes('null')) {
              return notification.warning({ message: '搜索地点不存在', duration: 1.5 });
            }
            notification.error({ message: '网络错误请稍后再试', duration: 1.5 });
          })
          .finally(() => {
            setLoading(false);
          });
      }}
    />
  );
});

export default CoordInput;

function useStyles() {
  return createUseStyles({
    search: {
      borderRadius: '0.85rem',
      marginBottom: '0.6rem',
      display: 'block',
    },
  })();
}

function searchSomeWhere(search: string) {
  return client.query<CoordData>({
    query: TOOL_API.COORD,
    variables: {
      search,
    },
  });
}

interface CoordData {
  coord: { location: string };
}

interface CoordInputProps {
  onSuccess: (data: { longitude: number; latitude: number }) => any;
  size?: InputProps['size'];
}

export interface TudeProps {
  longitude: number;
  latitude: number;
}
