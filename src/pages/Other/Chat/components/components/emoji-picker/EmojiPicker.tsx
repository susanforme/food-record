import React from 'react';
import emojiData from './emojiData';

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiPicked, filter }) => (
  <div className="sc-emoji-picker">
    {emojiData.map((category) => {
      const filteredEmojis = category.emojis.filter(({ name }) => name.includes(filter));
      return (
        <div className="sc-emoji-picker--category" key={category.name}>
          {filteredEmojis.length > 0 && (
            <div className="sc-emoji-picker--category-title">{category.name}</div>
          )}
          {filteredEmojis.map(({ char }) => {
            return (
              <span
                key={char}
                className="sc-emoji-picker--emoji"
                onClick={() => onEmojiPicked(char)}
              >
                {char}
              </span>
            );
          })}
        </div>
      );
    })}
  </div>
);

export default EmojiPicker;

interface EmojiPickerProps {
  onEmojiPicked: (char: string) => any;
  filter: any;
}
