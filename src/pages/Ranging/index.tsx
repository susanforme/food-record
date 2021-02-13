import { Input, Spin } from 'antd';
import React, { Suspense } from 'react';
import style from './index.less';

const Ranging: React.FC = () => {
  const Map = React.lazy(() => import('../../components/Map'));
  return (
    <div className={style.ranging}>
      <Input.Search />
      <div className={style.map} style={{ width: '100%', height: '400px' }}>
        <Suspense fallback={<Spin size="large" tip="加载中" />}>
          <Map />
        </Suspense>
      </div>
    </div>
  );
};

export default Ranging;
