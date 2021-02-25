import React, { useEffect, useRef, useState } from 'react';
import SendIcon from './icons/SendIcon';
import FileIcon from './icons/FileIcon';
import EmojiIcon from './icons/EmojiIcon';
import PopupWindow from './popups/PopupWindow';
import EmojiPicker from './emoji-picker/EmojiPicker';

const UserInput: React.FC<UserInputProps> = ({ onSubmit, onFilesSelected, showEmoji }) => {
  const [state, setState] = useState({
    inputActive: false,
    inputHasText: false,
    emojiPickerIsOpen: false,
    emojiFilter: '',
  });
  const fileUploadButtonRef = useRef<HTMLInputElement>(null);
  const [emojiPickerButton, setEmojiPickerButton] = useState<Element | null>(null);
  const userInputRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setEmojiPickerButton(document.querySelector('#sc-emoji-picker-button'));
  }, []);

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      return _submitText(event);
    }
  };

  const handleKeyUp = (event: any) => {
    const inputHasText = event.target.innerHTML.length !== 0 && event.target.innerText !== '\n';
    setState({ ...state, inputHasText });
  };

  const _showFilePicker = () => {
    fileUploadButtonRef.current?.click();
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
    const text = userInputRef.current?.textContent;
    if (text && text.length > 0) {
      onSubmit({
        author: 'me',
        type: 'text',
        data: { text },
      });
      if (userInputRef.current) {
        userInputRef.current.innerHTML = '';
      }
    }
  };

  const _onFilesSelected = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      onFilesSelected(event.target.files);
    }
  };

  const _handleEmojiPicked = (emoji: any) => {
    setState({ ...state, emojiPickerIsOpen: false });
    if (state.inputHasText) {
      if (userInputRef.current) {
        userInputRef.current.innerHTML += emoji;
      }
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
    if (state.inputHasText) {
      return (
        <div className="sc-user-input--button">
          <SendIcon onClick={_submitText} />
        </div>
      );
    }
    return (
      <div className="sc-user-input--button">
        <FileIcon onClick={() => _showFilePicker()} />
        <input
          type="file"
          name="files[]"
          multiple
          ref={fileUploadButtonRef}
          onChange={_onFilesSelected}
        />
      </div>
    );
  };

  const { emojiPickerIsOpen, inputActive } = state;
  return (
    <form className={`sc-user-input ${inputActive ? 'active' : ''}`}>
      <div
        role="button"
        tabIndex={0}
        onFocus={() => {
          setState({ ...state, inputActive: true });
        }}
        onBlur={() => {
          setState({ ...state, inputActive: false });
        }}
        ref={userInputRef}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        contentEditable="true"
        placeholder="Write a reply..."
        className="sc-user-input--text"
      ></div>
      <div className="sc-user-input--buttons">
        <div className="sc-user-input--button"></div>
        <div className="sc-user-input--button">
          {showEmoji && (
            <EmojiIcon
              onClick={toggleEmojiPicker}
              isActive={emojiPickerIsOpen}
              tooltip={_renderEmojiPopup()}
            />
          )}
        </div>
        {_renderSendOrFileIcon()}
      </div>
    </form>
  );
};

interface UserInputProps {
  onSubmit: (data: { author: 'me' | 'them'; type: 'text' | 'emoji' | 'file'; data: any }) => any;
  onFilesSelected: (filesList: any) => any;
  showEmoji: boolean;
}

export default UserInput;
