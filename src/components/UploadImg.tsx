import { createUseStyles } from 'react-jss';
import { PlusOutlined } from '@ant-design/icons';
import TouchFeedback from 'rmc-feedback';
import React, { useState } from 'react';
import { Image, notification, Progress } from 'antd';
import closeImg from '../assets/img/close.png';
import { parseFile, ParseFileData, uploadImg } from '@/utils';

// 解决上级使用动画调用ref报错
const UploadImg = React.forwardRef<HTMLInputElement, UploadImgProps>(
  (
    {
      onClose,
      onComplete,
      onReadComplete,
      className,
      style,
      onUploadProgressChange,
      showInput = false,
    },
    ref,
  ) => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUpload, setIsUpload] = useState(false);
    const [file, setFile] = useState<ParseFileData>();
    const accept = '.jpg,.png,.gif,.jpeg,.svg';
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files;
      if (file) {
        parseFile(file[0])
          .then((v) => {
            console.log(v);
            // eslint-disable-next-line no-useless-escape
            const reg = /\.[^\.]+$/;
            const result = v.file?.name.match(reg);
            if (Object.is(result, null) || !(result && accept.includes(result[0]))) {
              throw new Error('请重新上传');
            }
            setFile(v);
            onReadComplete && onReadComplete(v.src);
            return uploadImg(file[0], (progress) => {
              setUploadProgress(progress.loaded / progress.total);
              onUploadProgressChange && onUploadProgressChange(progress.loaded / progress.total);
            });
          })
          .then(({ data }) => {
            setIsUpload(true);
            onComplete(data?.singleUpload.url);
            console.log('上传成功');
          })
          .catch(() => {
            notification.error({ message: '请重新上传', duration: 1.5 });
          });
      }
    };
    const styles = useStyles();
    return (
      <TouchFeedback activeClassName={styles.active}>
        <div
          className={styles.imgItem + ' ' + className}
          style={!file ? style : { border: 'none', ...style }}
        >
          {file && !showInput ? (
            <>
              {isUpload ? (
                <>
                  <Image src={file.src} className={styles.img} />
                  <div className={styles.close} onClick={() => onClose && onClose()}></div>
                </>
              ) : (
                <Progress
                  type="circle"
                  percent={Math.round(uploadProgress * 100)}
                  strokeColor="gold"
                  width={40}
                />
              )}
            </>
          ) : (
            <>
              <PlusOutlined size={30} />
              <input
                type="file"
                accept={accept}
                className={styles.inputFile}
                onChange={onChange}
                ref={ref}
              />
            </>
          )}
        </div>
      </TouchFeedback>
    );
  },
);

export default UploadImg;

function useStyles() {
  return createUseStyles({
    imgItem: {
      width: '3.8rem',
      height: '3.5rem',
      border: '0.05333333333333334rem dashed rgba(128, 128, 128, 0.3)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      backgroundColor: 'rgb(249,249,247)',
      overflow: 'hidden',
      borderRadius: '0.16rem',
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
  onClose?: Function;
  onComplete: (url: string) => any;
  onReadComplete?: (url: string) => any;
  style?: React.CSSProperties;
  className?: string;
  onUploadProgressChange?: (progress: number) => any;
  showInput?: boolean;
}
