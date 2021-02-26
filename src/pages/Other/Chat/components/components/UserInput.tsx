import React, { useEffect, useRef, useState } from 'react';
import SendIcon from './icons/SendIcon';
import FileIcon from './icons/FileIcon';
import EmojiIcon from './icons/EmojiIcon';
import PopupWindow from './popups/PopupWindow';
import EmojiPicker from './emoji-picker/EmojiPicker';

const UserInput: React.FC<UserInputProps> = ({ onSubmit, onFileChange }) => {
  const [state, setState] = useState({
    emojiPickerIsOpen: false,
    emojiFilter: '',
  });
  const fileUploadButtonRef = useRef<HTMLInputElement>(null);
  const [emojiPickerButton, setEmojiPickerButton] = useState<Element | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setEmojiPickerButton(document.querySelector('#sc-emoji-picker-button'));
  }, []);

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      return _submitText(event);
    }
  };

  const toggleEmojiPicker = (e: any) => {
    e.preventDefault();
    if (!state.emojiPickerIsOpen) {
      setState({ ...state, emojiPickerIsOpen: true });
    }
  };

  const closeEmojiPicker = (e: any) => {
    if (emojiPickerButton?.contains(e.target)) {
      e.stopPropagation();
      e.preventDefault();
    }
    setState({ ...state, emojiPickerIsOpen: false });
  };

  const _submitText = (event: any) => {
    event.preventDefault();
    if (inputValue && inputValue.length > 0) {
      onSubmit({
        author: 'me',
        type: 'text',
        data: { text: inputValue },
      });
      setInputValue('');
    }
  };

  const _handleEmojiPicked = (emoji: string) => {
    setState({ ...state, emojiPickerIsOpen: false });
    if (inputValue) {
      setInputValue(inputValue + emoji);
    } else {
      onSubmit({
        author: 'me',
        type: 'emoji',
        data: { emoji },
      });
    }
  };

  const handleEmojiFilterChange = (event: any) => {
    const emojiFilter = event.target.value;
    setState({ ...state, emojiFilter });
  };

  const _renderEmojiPopup = () => (
    <PopupWindow
      isOpen={state.emojiPickerIsOpen}
      onClickedOutside={closeEmojiPicker}
      onInputChange={handleEmojiFilterChange}
    >
      <EmojiPicker onEmojiPicked={_handleEmojiPicked} filter={state.emojiFilter} />
    </PopupWindow>
  );

  const _renderSendOrFileIcon = () => {
    if (inputValue) {
      return (
        <div className="sc-user-input--button">
          <SendIcon onClick={_submitText} />
        </div>
      );
    }
    return (
      <div className="sc-user-input--button">
        <FileIcon
          onClick={() => {
            fileUploadButtonRef.current?.click();
          }}
        />
        <input
          type="file"
          ref={fileUploadButtonRef}
          accept=".jpg,.png,.gif,.jpeg,.svg"
          onChange={onFileChange}
        />
      </div>
    );
  };

  const { emojiPickerIsOpen } = state;
  return (
    <div className={`sc-user-input  active `}>
      <input
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        contentEditable
        placeholder="回复"
        onChange={(e) => {
          setInputValue(e.currentTarget.value);
        }}
        value={inputValue}
        className="sc-user-input--text"
      ></input>
      <div className="sc-user-input--buttons">
        <div className="sc-user-input--button"></div>
        <div className="sc-user-input--button">
          <EmojiIcon
            onClick={toggleEmojiPicker}
            isActive={emojiPickerIsOpen}
            tooltip={_renderEmojiPopup()}
          />
        </div>
        {_renderSendOrFileIcon()}
      </div>
    </div>
  );
};

interface UserInputProps {
  onSubmit: (data: { author: 'me' | 'them'; type: 'text' | 'emoji' | 'file'; data: any }) => any;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default UserInput;
