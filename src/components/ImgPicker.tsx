import { createUseStyles } from 'react-jss';
import { PlusOutlined } from '@ant-design/icons';
import TouchFeedback from 'rmc-feedback';
import { useState } from 'react';
import { Image } from 'antd';
import closeImg from '../assets/img/close.svg';

const ImgPicker: React.FC = () => {
  const styles = useStyles();
  // 最多4张
  const [files, setFils] = useState<ParseFileData[]>([]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (file) {
      parseFile(file[0], files.length + 1).then((v) => {
        setFils([...files, v]);
      });
    }
  };
  console.log(files);
  const length = files.length < 4 ? files.length + 1 : files.length;
  const ImgItems = Array(length)
    .fill(1)
    .map((v, index) => {
      const file = files[index];
      return (
        <TouchFeedback activeClassName={styles.active} key={index}>
          <div className={styles.imgItem} style={!file ? undefined : { border: 'none' }}>
            {file ? (
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
      border: '1px dashed transparent',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      background: `linear-gradient(rgb(249,249,247),rgb(249,249,247)) padding-box,
      repeating-linear-gradient(-45deg,#ccc 0, #ccc 0.25rem,white 0,white 0.75rem)`,
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

function parseFile(file: File, index: number): Promise<ParseFileData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataURL = (e.target as any).result;
      if (!dataURL) {
        reject(`Fail to get the ${index} image`);
        return;
      }
      resolve({
        src: dataURL,
        file,
      });
    };
    reader.readAsDataURL(file);
  });
}

interface ParseFileData {
  file: File;
  src: string;
}
