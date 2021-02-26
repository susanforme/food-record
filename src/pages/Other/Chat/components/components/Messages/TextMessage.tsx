import React from 'react';
import Linkify from 'react-linkify';

const TextMessage: React.FC<TextMessageProps> = ({ data }) => {
  return (
    <div className="sc-message--text">
      <Linkify properties={{ target: '_blank' }}>{data.text}</Linkify>
    </div>
  );
};
interface TextMessageProps {
  data: {
    text: string;
  };
}

export default TextMessage;
