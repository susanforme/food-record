import React from 'react';
import MessageList from './components/MessageList';
import UserInput from './components/UserInput';
import Header from './components/Header';
import { UserHeadImgContext } from './context';
import './styles';

const ChatWindow: React.FC<ChatWindowProps> = ({
  agentProfile,
  isOpen,
  onClose,
  onUserInputSubmit,
  messageList,
  showHeader = true,
  className,
  onFileChange,
  headImg,
}) => {
  const classList = ['sc-chat-window', isOpen ? 'opened' : 'closed', className];
  return (
    <UserHeadImgContext.Provider value={headImg || require('./assets/chat-icon.svg')}>
      <div className={classList.join(' ')}>
        {showHeader && (
          <Header
            teamName={agentProfile?.teamName}
            imageUrl={agentProfile?.imageUrl}
            onClose={onClose}
          />
        )}
        <MessageList messages={messageList} />
        <UserInput onSubmit={onUserInputSubmit} onFileChange={onFileChange} />
      </div>
    </UserHeadImgContext.Provider>
  );
};

interface ChatWindowProps {
  agentProfile?: {
    imageUrl: string;
    teamName: string;
  };
  isOpen: boolean;
  onClose?: () => any;
  onUserInputSubmit: (data: {
    author: 'me' | 'them';
    type: 'text' | 'emoji' | 'file';
    data: any;
  }) => any;
  messageList:
    | {
        author: 'me' | 'them';
        type: 'text' | 'emoji' | 'file';
        data: any;
      }[]
    | [];
  showHeader?: boolean;
  className?: string;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  headImg?: string;
}

export default ChatWindow;
