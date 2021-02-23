import { ArticleApiData, ARTICLE_API } from '@/api/query';
import { useLazyQuery } from '@apollo/client';
import { history } from 'umi';
import Shelf from '@/components/Shelf';
import { useEffect, useMemo, useState } from 'react';
import styles from './article.less';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Rate, Avatar, Tag, Empty, notification, Image, Spin } from 'antd';
import { radomlyGeneratColor } from '@/utils';
import Icon from '@/components/Icon';
import SendInput from '@/components/SendInput';
import client from '@/api';
import Comments from './Article/components/Comments';
import { LoadingOutlined } from '@ant-design/icons';

const Article: React.FC = () => {
  const articleId = history.location.query?.articleId;
  const [getArticle, { data, loading }] = useLazyQuery<ArticleApiData['article']>(
    ARTICLE_API.ARTICLE,
  );
  const article = useMemo(() => data?.article, [data?.article]);
  const [showInput, setShowInput] = useState(false);
  const [comment, setComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const colors = useMemo(() => radomlyGeneratColor(article?.label.length || 0), [
    article?.label.length,
  ]);
  const [status, setStatus] = useState(false);
  const height = useMemo(() => {
    if (status) {
      return '220px';
    } else {
      return '60px';
    }
  }, [status]);
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
    <Spin
      spinning={commentLoading}
      size="large"
      indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />}
    >
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
          {(article?.comment.length || 0) > 0 ? <Comments /> : <Empty description="暂无评论" />}
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
                className={`${styles['give-a-five']} ${
                  article?.isGive ? styles['active-icon'] : ''
                }`}
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
            <SendInput
              msg={comment}
              onChangeEmojiStatus={(s) => setStatus(s)}
              setMsg={setComment}
              onSend={() => {
                const data = {
                  articleId,
                  comment,
                };
                setCommentLoading(true);
                client
                  .mutate({
                    mutation: ARTICLE_API.COMMENT,
                    variables: {
                      data,
                    },
                  })
                  .then(({ data }) => {
                    console.log(data);
                  })
                  .finally(() => {
                    setCommentLoading(false);
                  });
              }}
            />
          )}
        </div>
        <div
          style={{
            height,
            transition: 'height 0.5s ease',
          }}
        ></div>
        {showInput && <div className={styles.fixed} onClick={() => setShowInput(false)} />}
      </div>
    </Spin>
  );
};

export default Article;
