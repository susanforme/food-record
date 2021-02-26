import React from 'react';

const FileMessage: React.FC<FileMessageProps> = ({ data }) => {
  return (
    <a className="sc-message--file">
      <img src={data.url} alt="" />
    </a>
  );
};

interface FileMessageProps {
  data: {
    url: string;
    fileName: string;
  };
}

export default FileMessage;
