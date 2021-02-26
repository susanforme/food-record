import React from 'react';

const Header: React.FC<ChatHeaderProps> = ({ imageUrl, teamName, onClose }) => {
  return (
    <div className="sc-header">
      <img className="sc-header--img" src={imageUrl} alt="" />
      <div className="sc-header--team-name"> {teamName} </div>
      <div className="sc-header--close-button" onClick={onClose}>
        <img src={require('./../assets/close-icon.png')} alt="" />
      </div>
    </div>
  );
};

interface ChatHeaderProps {
  imageUrl?: string;
  teamName?: string;
  onClose?: () => any;
}

export default Header;
