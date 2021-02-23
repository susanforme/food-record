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
      height: '50px',
      transition: ' all 0.5s ease',
      backgroundColor: '#fff',
    },
    publishEmoji: {
      display: 'flex',
      alignItems: 'center',
      width: '100vw',
      height: '50px',
      padding: '10px',
      '& *': {
        outline: 'none',
        border: 'none',
      },
    },
    input: {
      backgroundColor: 'rgb(245, 245, 245)',
    },
    icon: {
      fontSize: '21px',
      color: 'gray',
      marginLeft: '8px',
    },
    button: {
      padding: '4px 8px',
    },
    list: {
      overflowX: 'hidden',
      overflowY: 'scroll',
      height: '160px',
    },
    items: {
      display: 'flex',
      justifyContent: 'center',
      userSelect: 'none',
      '& span': {
        display: 'block',
        textAlign: 'center',
        width: '100%',
        height: '30px',
      },
    },
    activeEmoji: {
      backgroundColor: 'rgb(201, 200, 200)',
    },
    activeListFather: {
      height: '210px',
    },
    position: {
      height: '60px',
    },
    positionEmoji: {
      height: '220px',
    },
    upload: {
      position: 'absolute',
      backgroundColor: '#fff',
      top: '-80px',
      left: '20px',
    },
  })();
}
