import { createUseStyles } from 'react-jss';
import { List, Button, Input } from 'antd';
import { FileImageOutlined, SmileOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import { ToolApiData, TOOL_API } from '@/api/query';
import { useQuery } from '@apollo/client';
import TouchFeedback from 'rmc-feedback';
import UploadImg from './UploadImg';

const { Item } = List;
const SendInput: React.FC<SendInputProps> = ({
  msg,
  setMsg,
  onChangeEmojiStatus,
  setImgPath,
  onSend,
}) => {
  const styles = useStyles();
  const [showEmoji, setShowEmoji] = useState(false);
  const { data: emojiData } = useQuery<ToolApiData['emoji']>(TOOL_API.EMOJI);
  const [showImg, setShowImg] = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    onChangeEmojiStatus && onChangeEmojiStatus(showEmoji);
  }, [onChangeEmojiStatus, showEmoji]);
  return (
    <div className={`${styles.listFather} ${showEmoji ? styles.activeListFather : ''}`}>
      <div className={styles.upload}>
        <UploadImg
          onClose={() => {
            setShowImg(false);
          }}
          onComplete={(url) => {
            setImgPath && setImgPath(url);
          }}
          onReadComplete={() => setShowImg(true)}
          ref={imgRef}
          style={{ display: showImg ? 'flex' : 'none' }}
        />
      </div>
      <div className={styles.publishEmoji}>
        <Input
          placeholder="发条友善的评论吧"
          className={styles.input}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <SmileOutlined onClick={() => setShowEmoji(!showEmoji)} className={styles.icon} />
        <FileImageOutlined onClick={() => imgRef.current?.click()} className={styles.icon} />
        <Button className={styles.button} onClick={onSend}>
          发送
        </Button>
      </div>
      <List
        className={styles.list}
        dataSource={emojiData?.emoji}
        grid={{ gutter: 1, column: 3 }}
        renderItem={(item) => {
          return (
            <Item
              className={styles.items}
              onClick={() => {
                setMsg(`${msg} ${item.content}`);
              }}
            >
              <TouchFeedback activeClassName={styles.activeEmoji}>
                <span>{item.content}</span>
              </TouchFeedback>
            </Item>
          );
        }}
      />
    </div>
  );
};

export default SendInput;

interface SendInputProps {
  msg: string;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
  onChangeEmojiStatus?: (status: boolean) => any;
  imgPath?: string;
  setImgPath?: React.Dispatch<React.SetStateAction<string | undefined>>;
  onSend?: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
}

function useStyles() {
  return createUseStyles({
    listFather: {
      height: '2.6666666666666665rem',
      transition: ' all 0.5s ease',
      backgroundColor: '#fff',
    },
    publishEmoji: {
      display: 'flex',
      alignItems: 'center',
      width: '100vw',
      height: '2.6666666666666665rem',
      padding: '0.5333333333333333rem',
      '& *': {
        outline: 'none',
        border: 'none',
      },
    },
    input: {
      backgroundColor: 'rgb(245, 245, 245)',
    },
    icon: {
      fontSize: '1.12rem',
      color: 'gray',
      marginLeft: '0.4266666666666667rem',
    },
    button: {
      padding: '0.21333333333333335rem 0.4266666666666667rem',
    },
    list: {
      overflowX: 'hidden',
      overflowY: 'scroll',
      height: '8.533333333333333rem',
    },
    items: {
      display: 'flex',
      justifyContent: 'center',
      userSelect: 'none',
      '& span': {
        display: 'block',
        textAlign: 'center',
        width: '100%',
        height: '1.6rem',
      },
    },
    activeEmoji: {
      backgroundColor: 'rgb(201, 200, 200)',
    },
    activeListFather: {
      height: '11.2rem',
    },
    position: {
      height: '3.2rem',
    },
    positionEmoji: {
      height: '11.733333333333333rem',
    },
    upload: {
      position: 'absolute',
      backgroundColor: '#fff',
      top: '-4.266666666666667rem',
      left: '1.0666666666666667rem',
    },
  })();
}
