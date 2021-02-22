import { ArticleApiData, ARTICLE_API, ToolApiData, TOOL_API } from '@/api/query';
import { useLazyQuery, useQuery } from '@apollo/client';
import { history } from 'umi';
import Shelf from '@/components/Shelf';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './article.less';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Rate, Avatar, Tag, Comment, Empty, Input, notification, Image, Button, List } from 'antd';
import { radomlyGeneratColor } from '@/utils';
import Icon from '@/components/Icon';
import { SmileOutlined } from '@ant-design/icons';
import TouchFeedback from 'rmc-feedback';

const { Item } = List;
const Article: React.FC = () => {
  const articleId = history.location.query?.articleId;
  const [getArticle, { data, loading }] = useLazyQuery<ArticleApiData['article']>(
    ARTICLE_API.ARTICLE,
  );
  const { data: emojiData } = useQuery<ToolApiData['emoji']>(TOOL_API.EMOJI);
  const article = useMemo(() => data?.article, [data?.article]);
  const inputRef = useRef<Input>(null);
  const [showInput, setShowInput] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [comment, setComment] = useState('');
  const colors = useMemo(() => radomlyGeneratColor(article?.label.length || 0), [
    article?.label.length,
  ]);

  useEffect(() => {
    if (articleId) {
      getArticle({
        variables: {
          id: articleId,
        },
      });
    }
  }, [articleId, getArticle]);
  useEffect(() => {
    if (!loading && !data?.article && data !== undefined) {
      history.push('/404');
    }
  }, [data, loading]);
  useEffect(() => {
    if (data) {
      document.title = data.article.title;
    }
  }, [data]);

  return loading ? (
    <Shelf />
  ) : (
    <div className={styles.article}>
      <div className={styles.author}>
        <Avatar src={article?.author.headImg} className={styles.avatar} />
        <div className={styles.flex}>
          <span className={styles.username}>{article?.author.username}</span>
          <span className={styles.chear}>该用户已在食遇记分享33道美食</span>
        </div>
      </div>
      <Carousel
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        autoPlay
        infiniteLoop
        showIndicators={(article?.imgPath.length || 0) > 1}
      >
        {article?.imgPath.map((v) => {
          return (
            <Image
              fallback={require('@/assets/img/error.png')}
              src={'https://' + v}
              className={styles.img}
              alt=""
              key={v}
            />
          );
        })}
      </Carousel>
      <div className={styles.title}>
        <h2>{article?.title}</h2>
        <Rate disabled value={article?.score} className={styles.rate} />
      </div>
      <div className={styles.content}>
        <i className={styles['share-reason']}>分享理由</i>
        <p className={styles['article-content']}>{article?.content}</p>
      </div>
      <div className={styles.tags}>
        {article?.label.map((v, index) => {
          return (
            <Tag key={v} color={colors[index]}>
              {v}
            </Tag>
          );
        })}
        点赞xx个
      </div>
      <div className={styles.tip}>图文信息均来自用户上传,如有侵权请联系删除</div>
      <div className={styles.comment}>
        {(article?.comment.length || 0) > 0 ? (
          <Comment content={article?.comment[0].comment} />
        ) : (
          <Empty description="暂无评论" />
        )}
      </div>
      <div className={styles['input-comment']}>
        {!showInput ? (
          <div className={styles['bottom-button']}>
            <div
              className={styles.share}
              onClick={() => {
                const content = `${article?.title} - ${article?.author.username} 的分享 - 食遇记`;
                if (navigator.share) {
                  navigator
                    .share({
                      title: document.title,
                      url: window.location.pathname,
                      text: content,
                    })
                    .finally(() => {
                      return notification.success({ message: '分享成功! 😄', duration: 1.5 });
                    });
                } else {
                  const aux = document.createElement('input');
                  aux.setAttribute('value', content);
                  document.body.appendChild(aux);
                  aux.select();
                  document.execCommand('copy');
                  document.body.removeChild(aux);
                  return notification.success({
                    message: '已经复制到剪贴板,快去分享吧! 🙅',
                    duration: 1.5,
                  });
                }
              }}
            >
              <Icon type="icon-forward" className={styles.icon} />
              转发
            </div>
            <div className={styles['publish-comment']} onClick={() => setShowInput(true)}>
              <Icon type="icon-comment" className={styles.icon} />
              评论
            </div>
            <div
              className={`${styles['give-a-five']} ${article?.isGive ? styles['active-icon'] : ''}`}
            >
              <Icon
                type={article?.isGive ? 'icon-give-active-copy' : 'icon-give'}
                className={styles.icon}
                onClick={() => {
                  if (!article?.isGive) {
                    console.log('点赞了');
                  }
                }}
              />
              点赞
            </div>
          </div>
        ) : (
          <div
            className={`${styles['list-father']} ${showEmoji ? styles['active-list-father'] : ''}`}
          >
            <div className={styles['publish-emoji']}>
              <Input
                ref={inputRef}
                placeholder="发条友善的评论吧"
                onFocus={() => setShowEmoji(false)}
                className={styles.input}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <SmileOutlined onClick={() => setShowEmoji(!showEmoji)} className={styles.icon} />
              <Button className={styles.button}>发送</Button>
            </div>
            <List
              className={styles.list}
              dataSource={emojiData?.emoji}
              grid={{ gutter: 1, column: 3 }}
              renderItem={(item) => {
                return (
                  <Item
                    className={styles.items}
                    onClick={() => {
                      setComment(`${comment} ${item.content}`);
                    }}
                  >
                    <TouchFeedback activeClassName={styles.active}>
                      <span>{item.content}</span>
                    </TouchFeedback>
                  </Item>
                );
              }}
            />
          </div>
        )}
      </div>
      <div className={showEmoji && showInput ? styles['position-emoji'] : styles.position}></div>
      {showInput && <div className={styles.fixed} onClick={() => setShowInput(false)} />}
    </div>
  );
};

export default Article;
