import React from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import Header from './Header';

const ChatWindow: React.FC<ChatWindowProps> = ({
  agentProfile,
  isOpen,
  onClose,
  onFilesSelected,
  onUserInputSubmit,
  showEmoji,
  messageList,
  showHeader = true,
}) => {
  const msgList = messageList || [];
  const classList = ['sc-chat-window', isOpen ? 'opened' : 'closed'];
  return (
    <div className={classList.join(' ')}>
      {showHeader && (
        <Header
          teamName={agentProfile?.teamName}
          imageUrl={agentProfile?.imageUrl}
          onClose={onClose}
        />
      )}
      <MessageList messages={msgList} />
      <UserInput
        onSubmit={onUserInputSubmit}
        onFilesSelected={onFilesSelected}
        showEmoji={showEmoji}
      />
    </div>
  );
};

interface ChatWindowProps {
  agentProfile?: {
    imageUrl: string;
    teamName: string;
  };
  isOpen: boolean;
  onClose?: () => any;
  onFilesSelected: (filesList: any) => any;
  onUserInputSubmit: (data: {
    author: 'me' | 'them';
    type: 'text' | 'emoji' | 'file';
    data: any;
  }) => any;
  showEmoji: boolean;
  messageList?: [];
  showHeader?: boolean;
}

export default ChatWindow;
