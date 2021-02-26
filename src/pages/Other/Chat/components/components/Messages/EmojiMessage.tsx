import React from 'react';

const EmojiMessage: React.FC<EmojiMessageProps> = (props) => {
  return <div className="sc-message--emoji">{props.data.emoji}</div>;
};
interface EmojiMessageProps {
  data: {
    emoji: string;
  };
}

export default EmojiMessage;
