import { Map, Marker } from 'react-amap';
import { Spin, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { getMapPlugins } from '@/utils';
import { createUseStyles } from 'react-jss';

const MyMap: React.FC<MyMapProps> = ({ position, onClick }) => {
  const [ranging, setRanging] = useState(false);
  const [rule, setRule] = useState<any>({});
  const style = useStyles();
  const plugins: any = [
    'Scale',
    'OverView',
    // v1.1.0 新增
    'ControlBar',
    'ToolBar',
  ];
  const events = {
    click: (map: any) => {
      onClick(map);
    },
    created(instance: any) {
      window.AMap.plugin(['AMap.RangingTool'], () => {
        const rule = new window.AMap.RangingTool(instance, getMapPlugins());
        setRule(rule);
      });
    },
  };
  useEffect(() => {
    if (!rule.turnOn) {
      return;
    }
    // rule的this指向是大坑
    if (ranging) {
      rule.turnOn();
    } else {
      rule.turnOff();
    }
  }, [rule, ranging]);
  return (
    <Map
      amapkey="4801718d9e3051bda7fe64b0717b0a53"
      viewMode="3D"
      zoom={15}
      plugins={plugins}
      loading={
        <div className={style.loadingFather}>
          <Spin tip="加载中" size="large" />
        </div>
      }
      center={position}
      events={events}
    >
      <Marker position={position} draggable visible={!ranging} />
      <div className={style.customLayer}>
        <Button title="开启测距" onClick={() => setRanging(true)}>
          开启测距
        </Button>
        <Button title="关闭测距" onClick={() => setRanging(false)}>
          关闭测距
        </Button>
      </div>
    </Map>
  );
};

export default MyMap;

function useStyles() {
  return createUseStyles({
    customLayer: {
      position: 'absolute',
      top: '70%',
      display: 'flex',
      flexDirection: 'column',
      '& button': {
        margin: {
          top: '0.3rem',
          left: '0.1rem',
        },
      },
    },
    loadingFather: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })();
}

interface MyMapProps {
  position: {
    longitude: number;
    latitude: number;
  };
  onClick: (map: any) => any;
}
