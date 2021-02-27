import { useContext, useEffect, useMemo, useState } from 'react';
import ChatWindow from 'react-chat-pro';
import styles from './chat.less';
import { connect, history, State, useHistory } from 'umi';
import io from 'socket.io-client';
import { isEmoji, parseFile, uploadImg } from '@/utils';
import { notification } from 'antd';
import { ImgPrefixConext } from '@/context';
import replay from '@/assets/sounds/notification.mp3';

const Chat: React.FC<ChatProps> = ({ me }) => {
  const them = useHistory<{ userId?: string; headImg?: string }>().location.state;
  const socket = useMemo(() => io('http://localhost:4000'), []);
  const imgPrefix = useContext(ImgPrefixConext);
  const [messageList, setMessageList] = useState<MessageListType | []>([]);
  const audio = useMemo(() => new Audio(replay), []);
  useEffect(() => {
    socket.connect();
  }, [socket]);
  useEffect(() => {
    document.title = '聊天';
  }, []);
  useEffect(() => {
    socket.on('back', (res: any) => {
      const response = res?.data;
      if (response.send !== me.id) {
        audio.play();
        if (response.img) {
          const data: SingleMessage = {
            author: 'them',
            type: 'file',
            data: {
              url: response.img,
            },
          };
          setMessageList((pre) => [...pre, data]);
        } else if (isEmoji(response.message || '')) {
          const data: SingleMessage = {
            author: 'them',
            type: 'emoji',
            data: {
              emoji: response.message,
            },
          };
          setMessageList((pre) => [...pre, data]);
        } else {
          const data: SingleMessage = {
            author: 'them',
            type: 'text',
            data: {
              text: response.message,
            },
          };
          setMessageList((pre) => [...pre, data]);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (history.location.pathname !== '/chat') {
    return <div></div>;
  }
  if (!them?.userId) {
    history.replace('/account/login');
  }
  return (
    <div>
      <ChatWindow
        isOpen
        onFileChange={(e) => {
          const files = e.target.files;
          const accept = '.jpg,.png,.gif,.jpeg,.svg';
          if (files) {
            parseFile(files[0])
              .then((v) => {
                console.log(v);
                // eslint-disable-next-line no-useless-escape
                const reg = /\.[^\.]+$/;
                const result = v.file?.name.match(reg);
                if (
                  Object.is(result, null) ||
                  !(result && accept.includes(result[0].toLocaleLowerCase()))
                ) {
                  throw new Error('请重新上传');
                }
                setMessageList((pre) => [
                  ...pre,
                  { author: 'me', type: 'file', data: { url: v.src } },
                ]);
                return uploadImg(files[0]);
              })
              .then(({ data }) => {
                console.log(data?.singleUpload.url);
                console.log('上传成功');
                socket.emit('chat', {
                  send: me.id,
                  receive: them?.userId,
                  img: imgPrefix + data?.singleUpload.url,
                });
              })
              .catch(() => {
                notification.error({ message: '请重新上传', duration: 1.5 });
              });
          }
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
          setMessageList([...messageList, data]);
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
