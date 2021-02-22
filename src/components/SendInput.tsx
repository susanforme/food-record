import { createUseStyles } from 'react-jss';
import { List, Button, Input } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { ToolApiData, TOOL_API } from '@/api/query';
import { useQuery } from '@apollo/client';
import TouchFeedback from 'rmc-feedback';

const { Item } = List;
const SendInput: React.FC<SendInputProps> = ({ msg, setMsg, onChangeEmojiStatus }) => {
  const styles = useStyles();
  const [showEmoji, setShowEmoji] = useState(false);
  const { data: emojiData } = useQuery<ToolApiData['emoji']>(TOOL_API.EMOJI);
  useEffect(() => {
    onChangeEmojiStatus && onChangeEmojiStatus(showEmoji);
  }, [onChangeEmojiStatus, showEmoji]);
  return (
    <div className={`${styles.listFather} ${showEmoji ? styles.activeListFather : ''}`}>
      <div className={styles.publishEmoji}>
        <Input
          placeholder="发条友善的评论吧"
          className={styles.input}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <SmileOutlined onClick={() => setShowEmoji(!showEmoji)} className={styles.icon} />
        <Button className={styles.button}>发送</Button>
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
      fontSize: '23px',
      color: 'gray',
      marginLeft: '15px',
    },
    button: {
      padding: '4px 12px',
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
  })();
}
