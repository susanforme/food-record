import { createUseStyles } from 'react-jss';
import UploadImg from '@/components/UploadImg';
import { useState } from 'react';
import { TweenOneGroup } from 'rc-tween-one';

const ImgPicker: React.FC<ImgPickerProps> = ({ onChange }) => {
  const styles = useStyles();
  // 最多4张
  const [img, setImg] = useState<ImgData[]>([{ url: '', id: Date.now(), isUpload: false }]);

  const ImgItems = img.map((v, index) => {
    const deleteImg = () => {
      const newImg = [...img];
      newImg.splice(index, 1);
      if (newImg.length < 1 || img.filter((v) => v.url).length === 4) {
        newImg.push({ url: '', id: Date.now(), isUpload: false });
      }
      onChange(newImg);
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
      onChange(newImg);
      setImg(newImg);
    };
    const onReadComplete = (url: string) => {
      const newImg = [...img];
      const v = newImg[index];
      newImg.splice(index, 1, {
        ...v,
        url,
      });
      onChange(newImg);
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
    <TweenOneGroup
      enter={{
        scale: 0.8,
        opacity: 0,
        type: 'from',
        duration: 100,
        onComplete: (e: any) => {
          e.target.style = '';
        },
      }}
      className={styles.imgPicker}
      leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
      // appear={false}
    >
      {ImgItems}
    </TweenOneGroup>
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
