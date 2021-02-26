import React, { useContext } from 'react';
import TextMessage from './TextMessage';
import EmojiMessage from './EmojiMessage';
import FileMessage from './FileMessage';
import { UserHeadImgContext } from '../../context';

const Message: React.FC<MessageProps> = React.memo(({ message }) => {
  const headImg = useContext(UserHeadImgContext);
  const _renderMessageOfType = (type: string) => {
    switch (type) {
      case 'text':
        return <TextMessage {...message} />;
      case 'emoji':
        return <EmojiMessage {...message} />;
      case 'file':
        return <FileMessage {...message} />;
      default:
        console.error(`Attempting to load message with unsupported file type '${type}'`);
    }
  };
  const contentClassList = ['sc-message--content', message.author === 'me' ? 'sent' : 'received'];
  return (
    <div className="sc-message">
      <div className={contentClassList.join(' ')}>
        <div
          className="sc-message--avatar"
          style={{
            backgroundImage: `url(${headImg})`,
          }}
        ></div>
        {_renderMessageOfType(message.type)}
      </div>
    </div>
  );
});

export default Message;

interface MessageProps {
  message: {
    author: 'me' | 'them';
    type: 'text' | 'emoji' | 'file';
    data: any;
  };
}
