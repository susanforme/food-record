import { Button, Rate, Tag, Input, Tooltip, Select, notification } from 'antd';
import styles from './index.less';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import { connect, history, State } from 'umi';
import ImgPicker from './components/ImgPicker';
import { useCallback, useMemo, useRef, useState } from 'react';
import { TweenOneGroup } from 'rc-tween-one';
import { radomlyGeneratColor, sendArticleAndValidate } from '@/utils';
import FoodPlace from './components/FoodPlace';
import { TudeProps } from '@/components/CoordInput';

const { Option } = Select;

const Publish: React.FC<PublishProps> = ({ userId, kinds }) => {
  const storageData = useMemo(
    () => ({
      tags: [],
      title: '',
      content: '',
      rate: 0,
      ...JSON.parse(localStorage.getItem('article') as string),
    }),
    [],
  );
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const inputRef = useRef<Input>(null);
  // 经纬度
  const [location, setLocation] = useState<LocationState>(storageData.location);
  const [inputState, setInputState] = useState<InputState>({
    tags: storageData.tags,
    inputVisible: false,
    inputValue: '',
  });
  // 模态框可见
  const [modalVisible, setModalVisible] = useState(false);
  // 评分
  const [rate, setRate] = useState(storageData.rate);
  // 标题
  const [title, setTitle] = useState(storageData.title);
  // 内容
  const [content, setContent] = useState(storageData.content);
  // 分类
  const [kind, setKind] = useState<string>(storageData?.kind || kinds[0].id || '');
  // 随机生成颜色
  const colors = useMemo(() => radomlyGeneratColor(inputState.tags.length), [inputState.tags]);
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
  const data = useMemo(
    () => ({
      author: userId || '',
      content,
      title,
      imgPath: imgUrl,
      location: `${location?.tude?.longitude},${location?.tude?.latitude}`,
      label: inputState.tags,
      kind,
      score: rate,
      // 解决城市文章分类问题
      cityCode: location?.cityCode || '',
    }),
    [content, imgUrl, inputState.tags, kind, location, rate, title, userId],
  );

  const sendArticle = () => {
    sendArticleAndValidate(data)
      .then((val) => {
        // 清除保存的文章
        localStorage.removeItem('article');
        history.replace({
          pathname: '/article',
          query: { articleId: val?.createArticle.articleId },
        });
      })
      .catch((err) => {
        return notification.warning({ message: err.message, duration: 1.5 });
      });
  };
  // 保存文章
  const save = () => {
    const data = {
      location,
      rate,
      title,
      content,
      tags: inputState.tags,
      kind,
    };
    localStorage.setItem('article', JSON.stringify(data));
    notification.success({ message: '保存成功', duration: 1.5 });
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
          <span onClick={() => save()}>保存</span>
          <Button className={styles['right-button']} onClick={() => sendArticle()}>
            发布文章
          </Button>
        </div>
      </header>
      <main>
        <ImgPicker
          onChange={(v) => {
            const urls = v.filter((v) => v.isUpload).map((v) => v.url);
            setImgUrl(urls);
          }}
        />
        {/* 限制为6个字 */}
        <input
          placeholder="一个好标题有更多人看到哦~"
          maxLength={15}
          className={styles['title-input']}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="看到了美食,我要感觉记录下来"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
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
        <Rate className={styles['rate-child']} value={rate} onChange={(value) => setRate(value)} />
      </div>
      <div className={styles.bottom}>
        关联美食地点
        <span
          className={styles.choose}
          onClick={() => {
            setModalVisible(true);
          }}
        >
          {modalVisible ? '选择中' : location?.name || '去选择'}
        </span>
      </div>
      <div className={styles.bottom}>
        选择分类
        <span className={styles.choose}>
          <Select
            defaultValue={kinds[0]?.id}
            onChange={(v) => setKind(v)}
            className={styles.selector}
            bordered={false}
          >
            {kinds.map((v) => {
              return (
                <Option value={v.id || ''} key={v.id}>
                  {v.kindName}
                </Option>
              );
            })}
          </Select>
        </span>
      </div>
      <FoodPlace
        modalVisible={modalVisible}
        tude={location?.tude}
        setLocation={setLocation}
        setModalVisible={setModalVisible}
      />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  userId: state.index.user.id,
  kinds: state.home.kind,
});

export default connect(mapStateToProps)(Publish);

interface InputState {
  tags: string[];
  inputVisible: boolean;
  inputValue: string;
}

export interface LocationState {
  tude: TudeProps;
  name: string;
  cityCode: string;
}

interface PublishProps {
  userId?: string;
  kinds: {
    kindName?: string;
    id?: string;
  }[];
}
