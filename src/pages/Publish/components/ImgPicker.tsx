import { createUseStyles } from 'react-jss';
import UploadImg from '@/components/UploadImg';
import { useState } from 'react';

const ImgPicker: React.FC<ImgPickerProps> = ({ onChange }) => {
  const styles = useStyles();
  // 最多4张
  const [img, setImg] = useState<ImgData[]>([{ url: '', id: Date.now(), isUpload: false }]);
  onChange(img);
  const ImgItems = img.map((v, index) => {
    const deleteImg = () => {
      const newImg = [...img];
      newImg.splice(index, 1);
      if (newImg.length < 1 || img.filter((v) => v.url).length === 4) {
        newImg.push({ url: '', id: Date.now(), isUpload: false });
      }
      setImg(newImg);
    };
    const onComplete = (url: string) => {
      const newImg = [...img];
      const v = newImg[index];
      newImg.splice(index, 1, {
        ...v,
        url,
        isUpload: true,
      });
      if (newImg.length < 4) {
        newImg.push({ url: '', id: Date.now(), isUpload: false });
      }
      setImg(newImg);
    };
    const onReadComplete = (url: string) => {
      const newImg = [...img];
      const v = newImg[index];
      newImg.splice(index, 1, {
        ...v,
        url,
      });
      setImg(newImg);
    };
    return (
      <UploadImg
        key={v.id}
        onClick={deleteImg}
        onComplete={onComplete}
        onReadComplete={onReadComplete}
      />
    );
  });
  return (
    <div className={styles.imgPicker}>
      {/* 有时间添加动画 */}
      {ImgItems}
    </div>
  );
};

export default ImgPicker;

function useStyles() {
  return createUseStyles({
    imgPicker: {
      display: 'flex',
      alignItems: 'center',
      '&>*': {
        marginRight: '1rem',
      },
    },
  })();
}

interface ImgData {
  url: string;
  id: number;
  isUpload: boolean;
}

interface ImgPickerProps {
  onChange: (data: ImgData[]) => void;
}
