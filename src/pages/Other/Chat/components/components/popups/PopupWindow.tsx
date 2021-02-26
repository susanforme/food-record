import React, { useEffect, useRef } from 'react';

const PopupWindow: React.FC<PopupWindowProps> = ({
  isOpen,
  children,
  onClickedOutside,
  onInputChange,
}) => {
  const emojiPopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dom = document.querySelector('#sc-launcher');
    const interceptLauncherClick = (e: any) => {
      const clickedOutside = !emojiPopupRef.current?.contains(e.target) && isOpen;
      clickedOutside && onClickedOutside(e);
    };
    dom?.addEventListener('click', interceptLauncherClick);
    return () => {
      dom?.removeEventListener('click', interceptLauncherClick);
    };
  }, [isOpen, onClickedOutside]);

  return (
    <div className="sc-popup-window" ref={emojiPopupRef}>
      <div className={`sc-popup-window--cointainer ${isOpen ? '' : 'closed'}`}>
        <input
          onChange={onInputChange}
          className="sc-popup-window--search"
          placeholder="Search emoji..."
        />
        {children}
      </div>
    </div>
  );
};

export default PopupWindow;

interface PopupWindowProps {
  isOpen: boolean;
  onClickedOutside: (e: any) => any;
  onInputChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
}
