import { TOOL_API } from '@/api/query';
import CoordInput, { TudeProps } from '@/components/CoordInput';
import { useLazyQuery } from '@apollo/client';
import { Modal, Image, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { LocationState } from '..';

const FoodPlace: React.FC<FoodPlaceProps> = React.memo(
  ({ modalVisible, setModalVisible, tude, setLocation }) => {
    const [img, setImg] = useState('');
    const [getImg, { loading }] = useLazyQuery(TOOL_API.IMG_COORD, {
      variables: {
        location: `${tude?.longitude},${tude?.latitude}`,
      },
      onCompleted: (data) => {
        setImg(data?.imgByCoord);
      },
    });
    useEffect(() => {
      if (tude) {
        getImg();
      }
    }, [getImg, tude]);

    return (
      <Modal
        title="选择美食位置"
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
        okText="确认"
        cancelText="取消"
      >
        <CoordInput
          onSuccess={(data) => {
            setLocation(data);
          }}
        />
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin size="large" />
          </div>
        ) : (
          <Image src={img} alt="" />
        )}
      </Modal>
    );
  },
);

export default FoodPlace;

interface FoodPlaceProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  tude?: TudeProps;
  setLocation: React.Dispatch<React.SetStateAction<LocationState>>;
}
