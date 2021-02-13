import { useCallback, useEffect } from 'react';

const UIMarker: React.FC<UIMarkerProps> = ({ __map__, callback }) => {
  const uCallback = useCallback(callback, [callback]);
  const { AMap } = window;
  // 自定义样式
  const startMarkerOptions = {
    icon: new AMap.Icon({
      // 图标大小
      size: new AMap.Size(19, 31),
      imageSize: new AMap.Size(19, 31),
      image: 'https://webapi.amap.com/theme/v1.3/markers/b/start.png',
    }),
  };
  const endMarkerOptions = {
    icon: new AMap.Icon({
      size: new AMap.Size(19, 31),
      imageSize: new AMap.Size(19, 31),
      image: 'https://webapi.amap.com/theme/v1.3/markers/b/end.png',
    }),
    offset: new AMap.Pixel(-9, -31),
  };
  const midMarkerOptions = {
    icon: new AMap.Icon({
      size: new AMap.Size(19, 31),
      imageSize: new AMap.Size(19, 31),
      image: 'https://webapi.amap.com/theme/v1.3/markers/b/mid.png',
    }),
    offset: new AMap.Pixel(-9, -31),
  };
  const lineOptions = {
    strokeStyle: 'solid',
    strokeColor: '#FF33FF',
    strokeOpacity: 1,
    strokeWeight: 2,
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rulerOptions = {
    startMarkerOptions,
    midMarkerOptions,
    endMarkerOptions,
    lineOptions,
  };
  window.AMap.plugin(['AMap.RangingTool'], () => {
    const { turnOn, turnOff } = new window.AMap.RangingTool(__map__, rulerOptions);
    uCallback({
      turnOn,
      turnOff,
    });
  });
  return null;
};

export default UIMarker;

interface UIMarkerProps {
  __map__?: any;
  callback: (param: any) => any;
}
