import React from 'react';

const FileIcon: React.FC<FileIconProps> = ({ onFocus, onClick, onBlur }) => {
  return (
    <button
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      className="sc-user-input--file-icon-wrapper"
    >
      <svg
        className="sc-user-input--file-icon"
        viewBox="0 0 1109 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2124"
        width="28.158203125"
        height="26"
      >
        <path
          d="M296.96 800.768A83.968 83.968 0 0 1 213.333333 716.8V297.258667C213.333333 251.050667 250.709333 213.546667 296.96 213.333333h502.016a84.053333 84.053333 0 0 1 83.754667 83.925334V716.8a84.053333 84.053333 0 0 1-83.754667 83.968H296.917333z m543.957333-503.466667a45.098667 45.098667 0 0 0-41.941333-41.984H296.917333a39.637333 39.637333 0 0 0-41.813333 41.941334v373.333333l142.250667-171.946667c16.810667-16.768 37.674667-16.768 50.261333 0l121.301333 155.221334 117.205334-117.461334a33.237333 33.237333 0 0 1 54.4 4.181334l100.394666 128.426666V297.216zM652.672 465.066667a62.933333 62.933333 0 1 1 62.72-63.189334v0.213334a62.848 62.848 0 0 1-62.72 62.933333z"
          fill="#999999"
          p-id="2125"
        ></path>
      </svg>
    </button>
  );
};

export default FileIcon;

interface FileIconProps {
  onFocus?: ((event: React.FocusEvent<HTMLButtonElement>) => void) | undefined;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  onBlur?: ((event: React.FocusEvent<HTMLButtonElement>) => void) | undefined;
}
