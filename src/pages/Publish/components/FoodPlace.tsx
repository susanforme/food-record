import CoordInput from '@/components/CoordInput';
import { Modal } from 'antd';
import React from 'react';

const FoodPlace: React.FC<FoodPlaceProps> = React.memo(({ modalVisible, setModalVisible }) => {
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
          console.log(data);
        }}
      />
    </Modal>
  );
});

export default FoodPlace;

interface FoodPlaceProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
