import { createUseStyles } from 'react-jss';
import UploadImg from '@/components/UploadImg';

const ImgPicker: React.FC = () => {
  const styles = useStyles();
  // 最多4张
  return <div className={styles.imgPicker}>{ImgItems}</div>;
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
