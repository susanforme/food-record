import React from 'react';
import Linkify from 'react-linkify';

const TextMessage: React.FC<TextMessageProps> = ({ data }) => {
  return (
    <Linkify properties={{ target: '_blank' }}>
      <span className="sc-message--text">{data.text}</span>
    </Linkify>
  );
};
interface TextMessageProps {
  data: {
    text: string;
  };
}

export default TextMessage;
