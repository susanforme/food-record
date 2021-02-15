import { Input, notification } from 'antd';
import React, { useState } from 'react';
import style from './index.less';
import Map from '../../components/Map';
import client from '@/api';
import { TOOL_API } from '@/api/query';

const Ranging: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState({
    longitude: 106.747558,
    latitude: 31.874116,
  });

  return (
    <div className={style.ranging}>
      <Input.Search
        className={style.search}
        size="large"
        placeholder="输入行政区搜索"
        loading={loading}
        onSearch={(value) => {
          if (!value) {
            return;
          }
          setLoading(true);
          searchDistrct(value)
            .then((v) => {
              const { center } = v.data?.coord;
              const position = center.split(',').map((v) => Number(v));
              setPosition({
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
      <div className={style.map} style={{ width: '100%', height: '400px' }}>
        <Map
          position={position}
          onClick={(map) => {
            setPosition({
              longitude: map.lnglat.lng,
              latitude: map.lnglat.lat,
            });
          }}
        />
      </div>
    </div>
  );
};

export default Ranging;

function searchDistrct(search: string) {
  return client.query<CoordData>({
    query: TOOL_API.COORD,
    variables: {
      search,
    },
  });
}

interface CoordData {
  coord: { citycode: string; adcode: string; name: string; center: string };
}
