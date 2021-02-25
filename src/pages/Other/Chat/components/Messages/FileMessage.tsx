import React from 'react';
import FileIcon from '../icons/FileIcon';

const FileMessage: React.FC<FileMessageProps> = ({ data }) => {
  return (
    <a className="sc-message--file" href={data.url} download={data.fileName}>
      <FileIcon />
      <p>{data.fileName}</p>
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
