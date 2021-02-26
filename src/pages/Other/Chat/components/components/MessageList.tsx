import React, { useEffect, useRef } from 'react';
import Message from './Messages';

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const scrollList = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollList.current) {
      scrollList.current.scrollTop = scrollList.current.scrollHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollList.current, messages.length]);
  return (
    <div className="sc-message-list" ref={scrollList}>
      {messages.map((message, i) => {
        return <Message message={message} key={i} />;
      })}
    </div>
  );
};

interface MessageListProps {
  messages: {
    author: 'me' | 'them';
    type: 'text' | 'emoji' | 'file';
    data: any;
  }[];
}

export default MessageList;
