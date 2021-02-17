import { createUseStyles } from 'react-jss';
import { PlusOutlined } from '@ant-design/icons';
import TouchFeedback from 'rmc-feedback';
import { useState } from 'react';
import { Image, Progress } from 'antd';
import closeImg from '../assets/img/close.png';
import { parseFile, ParseFileData, uploadImg } from '@/utils';

const ImgPicker: React.FC = () => {
  const styles = useStyles();
  // 最多4张
  const [files, setFils] = useState<ParseFileData[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (file) {
      parseFile(file[0], files.length + 1).then((v) => {
        uploadImg(file[0], (progress) => {
          const uploadProgre = [...uploadProgress];
          uploadProgre.splice(uploadProgre.length - 1, 1, progress.loaded / progress.total);
          setUploadProgress(uploadProgre);
        })
          .then(() => {
            const file = [...files];
            file.splice(file.length - 1, 1, { ...v, isUpload: true });
            console.log(file);
            setFils(file);
            console.log('上传成功');
          })
          .catch(() => {});
        setFils([...files, v]);
        setUploadProgress([...uploadProgress, 0]);
      });
    }
  };
  const length = files.length < 4 ? files.length + 1 : files.length;
  const ImgItems = Array(length)
    .fill(1)
    .map((v, index) => {
      const file = files[index];
      console.log(uploadProgress[index], uploadProgress, index);
      return (
        // 有时间添加动画
        <TouchFeedback activeClassName={styles.active} key={index}>
          <div className={styles.imgItem} style={!file ? undefined : { border: 'none' }}>
            {file ? (
              <>
                {file.isUpload ? (
                  <>
                    <Image src={file.src} className={styles.img} />
                    <div
                      className={styles.close}
                      onClick={() => {
                        const file = [...files];
                        file.splice(index, 1);
                        setFils(file);
                      }}
                    ></div>
                  </>
                ) : (
                  <Progress type="circle" percent={uploadProgress[index] * 100} width={80} />
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
    });

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
