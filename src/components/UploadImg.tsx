import { createUseStyles } from 'react-jss';
import { PlusOutlined } from '@ant-design/icons';
import TouchFeedback from 'rmc-feedback';
import { useState } from 'react';
import { Image, Progress } from 'antd';
import closeImg from '../assets/img/close.png';
import { parseFile, ParseFileData, uploadImg } from '@/utils';

const UploadImg: React.FC<UploadImgProps> = ({ onClick, onComplete, addImg }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUpload, setIsUpload] = useState(false);
  const [file, setFile] = useState<ParseFileData>();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      parseFile(file[0])
        .then((v) => {
          uploadImg(file[0], (progress) => {
            setUploadProgress(progress.loaded / progress.total);
          })
            .then((data) => {
              setIsUpload(true);
              console.log(data);
              console.log('上传成功');
            })
            .catch(() => {});
          setFile(v);
          addImg();
        })
        .catch(() => {
          // 请重新上传
        });
    }
  };
  const styles = useStyles();
  return (
    // 有时间添加动画
    <TouchFeedback activeClassName={styles.active}>
      <div className={styles.imgItem} style={!file ? undefined : { border: 'none' }}>
        {file ? (
          <>
            {isUpload ? (
              <>
                <Image src={file.src} className={styles.img} />
                <div className={styles.close} onClick={() => onClick()}></div>
              </>
            ) : (
              <Progress type="circle" percent={uploadProgress * 100} width={80} />
            )}
          </>
        ) : (
          <>
            <PlusOutlined size={30} />
            <input type="file" className={styles.inputFile} onChange={onChange} />
          </>
        )}
      </div>
    </TouchFeedback>
  );
};

export default UploadImg;

function useStyles() {
  return createUseStyles({
    imgItem: {
      width: '3.8rem',
      height: '3.5rem',
      border: '1px dashed rgba(128, 128, 128, 0.3)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      backgroundColor: 'rgb(249,249,247)',
      overflow: 'hidden',
      borderRadius: '3px',
    },
    inputFile: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      opacity: 0,
    },
    active: {
      backgroundColor: '#ddd',
    },
    img: {
      width: '100%',
      height: '100%',
    },
    close: {
      position: 'absolute',
      top: '8%',
      right: '8%',
      width: '0.9rem',
      height: '0.9rem',
      textAlign: 'right',
      verticalAlign: 'top',
      zIndex: 2,
      backgroundSize: '0.9rem auto',
      backgroundImage: `url(${closeImg})`,
    },
  })();
}

interface UploadImgProps {
  onClick: Function;
  onComplete: (url: string) => any;
  addImg: Function;
}
