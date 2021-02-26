import { useEffect, useMemo, useState } from 'react';
import ChatWindow from './components';
import styles from './chat.less';
import { connect, history, State, useHistory } from 'umi';
import io from 'socket.io-client';

const Chat: React.FC<ChatProps> = ({ me }) => {
  const them = useHistory<{ userId?: string; headImg?: string }>().location.state;
  const socket = useMemo(() => io('http://localhost:4000'), []);
  const [messageList, setMessage] = useState<MessageListType | []>([]);
  useEffect(() => {
    socket.connect();
  }, [socket]);
  console.log('函数外部');

  useEffect(() => {
    socket.on('back', (res: any) => {
      const response = res?.data;
      console.log('开始back');

      if (response.send !== me.id) {
        const data: SingleMessage = {
          author: 'them',
          type: 'text',
          data: {
            text: response.message,
          },
        };
        console.log('开始修改');
        setMessage((pre) => [...pre, data]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!them?.userId) {
    history.replace('/account/login');
  }
  return (
    <div>
      <ChatWindow
        isOpen
        onFileChange={(e) => {
          console.log(e);
        }}
        onUserInputSubmit={(data) => {
          let message = '';
          switch (data.type) {
            case 'text':
              message = data.data.text;
              break;
            case 'emoji':
              message = data.data.emoji;
              break;
          }
          socket.emit('chat', {
            send: me.id,
            receive: them?.userId,
            message,
          });
          setMessage([...messageList, data]);
        }}
        className={styles.chat}
        showHeader={false}
        messageList={messageList}
        headImg={them?.headImg}
      ></ChatWindow>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  me: state.index.user,
});

export default connect(mapStateToProps)(Chat);

type MessageListType = SingleMessage[];
type SingleMessage = {
  author: 'me' | 'them';
  type: 'text' | 'emoji' | 'file';
  data: any;
};
interface ChatProps {
  me: State['index']['user'];
}
