import { Button, Rate, Tag, Input, Tooltip } from 'antd';
import styles from './index.less';
import { LeftOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { history } from 'umi';
import ImgPicker from './components/ImgPicker';
import { useCallback, useMemo, useRef, useState } from 'react';
import { TweenOneGroup } from 'rc-tween-one';
import { radomlyGeneratColor } from '@/utils';
import FoodPlace from './components/FoodPlace';

const Publish: React.FC = () => {
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const inputRef = useRef<Input>(null);
  const [inputState, setInputState] = useState<InputState>({
    tags: [],
    inputVisible: false,
    inputValue: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const colors = useMemo(() => radomlyGeneratColor(inputState.tags.length), [inputState.tags]);
  console.log(imgUrl);
  const handleClose = useCallback(
    (removeTag: string) => {
      const newtags = inputState.tags.filter((tag) => tag !== removeTag);
      setInputState({
        ...inputState,
        tags: newtags,
      });
    },
    [inputState],
  );
  const showInput = useCallback(() => {
    setInputState({
      ...inputState,
      inputVisible: true,
    });
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, [inputState]);
  const handleInputConfirm = useCallback(() => {
    const { inputValue, tags } = inputState;
    const newTags = [...tags];
    if (inputValue && tags.indexOf(inputValue) === -1) {
      newTags.push(inputValue);
    }
    setInputState({
      ...inputState,
      tags: newTags,
      inputVisible: false,
      inputValue: '',
    });
  }, [inputState]);
  const handleInputChange = (e: any) => {
    setInputState({
      ...inputState,
      inputValue: e.target.value,
    });
  };

  const tags = inputState.tags.map((tag, index) => {
    const isLongTag = tag.length > 7;
    const tagEle = (
      <Tag
        className="edit-tag"
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
        color={colors[index]}
      >
        <span>{isLongTag ? `${tag.slice(0, 7)}...` : tag}</span>
      </Tag>
    );
    return (
      <span key={tag} className={styles['anima-span']}>
        {isLongTag ? <Tooltip title={tag}>{tagEle}</Tooltip> : tagEle}
      </span>
    );
  });

  return (
    <div className={styles.publish}>
      <header>
        <LeftOutlined onClick={() => history.goBack()} />
        <div className={styles.right}>
          <span>保存</span>
          <Button className={styles['right-button']}>发布文章</Button>
        </div>
      </header>
      <main>
        <ImgPicker
          onChange={(v) => {
            const urls = v.filter((v) => v.isUpload).map((v) => v.url);
            setImgUrl(urls);
            console.log(urls, 'onChange');
          }}
        />
        {/* 限制为6个字 */}
        <input
          placeholder="一个好标题有更多人看到哦~"
          maxLength={15}
          className={styles['title-input']}
        />
        <textarea placeholder="看到了美食,我要感觉记录下来"></textarea>
        {/* 这里进行label添加,至少两个,最多4个,在上面有一条单横线 */}
        <div className={styles.tags}>
          <>
            <TweenOneGroup
              enter={{
                scale: 0.8,
                opacity: 0,
                type: 'from',
                duration: 100,
                onComplete: (e: any) => {
                  e.target.style = '';
                },
              }}
              className={styles.tween}
              leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
              // appear={false}
            >
              {tags}
            </TweenOneGroup>
            {inputState.inputVisible ? (
              <Input
                ref={inputRef}
                type="text"
                size="small"
                className={styles['label-input']}
                value={inputState.inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            ) : (
              inputState.tags.length < 4 && (
                <Tag className={styles['site-tag-plus']} onClick={showInput}>
                  <PlusOutlined /> 标签
                </Tag>
              )
            )}
          </>
        </div>
      </main>
      <div className={styles.bottom}>
        对菜品进行评分
        <Rate className={styles['rate-child']} />
      </div>
      <div className={styles.bottom}>
        关联美食地点
        {/* 市级单位,在这里填写城市,然后请求接口 */}
        <span
          className={styles.choose}
          onClick={() => {
            setModalVisible(true);
          }}
        >
          {modalVisible ? '选择中' : '去选择'}
          <RightOutlined />
        </span>
      </div>
      <FoodPlace modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </div>
  );
};

export default Publish;

interface InputState {
  tags: string[];
  inputVisible: boolean;
  inputValue: string;
}
