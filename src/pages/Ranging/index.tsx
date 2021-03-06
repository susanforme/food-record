import React, { useState } from 'react';
import style from './index.less';
import Map from '../../components/Map';
import CoordInput from '@/components/CoordInput';
import { history } from 'umi';

const Ranging: React.FC = () => {
  const [position, setPosition] = useState({
    longitude: 106.747558,
    latitude: 31.874116,
  });
  if (history.location.pathname !== '/ranging') {
    return <div></div>;
  }

  return (
    <div className={style.ranging}>
      <CoordInput
        onSuccess={(data) => {
          setPosition(data.tude);
        }}
      />
      <div className={style.map} style={{ width: '100%', height: '21.333333333333332rem' }}>
        <Map
          position={position}
          onClick={(map) => {
            setPosition({
              longitude: map.lnglat.lng,
              latitude: map.lnglat.lat,
            });
          }}
        />
        {/* 下方随机推荐当地美食 */}
      </div>
    </div>
  );
};

export default Ranging;
