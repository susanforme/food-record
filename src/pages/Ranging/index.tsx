import React, { useState } from 'react';
import style from './index.less';
import Map from '../../components/Map';
import CoordInput from '@/components/CoordInput';

const Ranging: React.FC = () => {
  const [position, setPosition] = useState({
    longitude: 106.747558,
    latitude: 31.874116,
  });

  return (
    <div className={style.ranging}>
      <CoordInput
        onSuccess={(data) => {
          setPosition(data);
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
