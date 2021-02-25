import ChatWindow from './components/ChatWindow';
import './styles';

const Chat: React.FC = () => {
  return (
    <div>
      <ChatWindow
        isOpen
        onFilesSelected={() => {}}
        onUserInputSubmit={() => {}}
        showEmoji
        showHeader={false}
      ></ChatWindow>
    </div>
  );
};

export default Chat;
