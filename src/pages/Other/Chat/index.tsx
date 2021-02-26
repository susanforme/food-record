import { useState } from 'react';
import ChatWindow from './components';
import styles from './chat.less';

const Chat: React.FC = () => {
  const [messageList, setMessage] = useState<MessageListType | []>([
    {
      author: 'them',
      type: 'text',
      data: {
        text: 'hi',
      },
    },
  ]);
  return (
    <div>
      <ChatWindow
        isOpen
        onFileChange={(e) => {
          console.log(e);
        }}
        onUserInputSubmit={(data) => {
          setMessage([...messageList, data]);
        }}
        className={styles.chat}
        showHeader={false}
        messageList={messageList}
      ></ChatWindow>
    </div>
  );
};

export default Chat;

type MessageListType = {
  author: 'me' | 'them';
  type: 'text' | 'emoji' | 'file';
  data: any;
}[];
