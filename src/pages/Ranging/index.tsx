import { Map, Marker } from 'react-amap';
import { Input, Spin, Button } from 'antd';
import { useState } from 'react';
import MapChild from '@/components/MapChild';
const Ranging: React.FC = () => {
  const [position, setPosition] = useState({
    longitude: 106.747558,
    latitude: 31.874116,
  });
  const [ranging, setRanging] = useState(false);
  const plugins: any = [
    'Scale',
    'OverView',
    // v1.1.0 新增
    'ControlBar',
    'ToolBar',
  ];
  const events = {
    click: (map: any) => {
      setPosition({
        longitude: map.lnglat.lng,
        latitude: map.lnglat.lat,
      });
    },
  };
  return (
    <div>
      <Input.Search />
      <div className="map" style={{ width: '100%', height: '400px' }}>
        <Map
          amapkey="4801718d9e3051bda7fe64b0717b0a53"
          viewMode="3D"
          plugins={plugins}
          loading={<Spin />}
          center={position}
          events={events}
          useAMapUI={(t: any) => {
            console.log(t, 'asdasdasd');
          }}
        >
          <Marker position={position} draggable visible={!ranging} />
          <MapChild
            callback={(param: any) => {
              if (ranging) {
                param.turnOn();
              } else {
                param.turnOff();
              }
            }}
          />
          <div className="customLayer">
            <Button title="开启测距" onClick={() => setRanging(true)}>
              开启测距
            </Button>
            <Button title="关闭测距" onClick={() => setRanging(false)}>
              关闭测距
            </Button>
          </div>
        </Map>
      </div>
    </div>
  );
};

export default Ranging;
