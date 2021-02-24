import { ArticleApiData, ARTICLE_API } from '@/api/query';
import { useLazyQuery } from '@apollo/client';
import { connect, history, State } from 'umi';
import Shelf from '@/components/Shelf';
import { useContext, useEffect, useMemo, useState } from 'react';
import styles from './article.less';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Rate, Avatar, Tag, notification, Image, Spin } from 'antd';
import { radomlyGeneratColor } from '@/utils';
import Icon from '@/components/Icon';
import SendInput from '@/components/SendInput';
import client from '@/api';
import Comments from './components/Comments';
import { LoadingOutlined } from '@ant-design/icons';
import { ImgPrefixConext } from '@/context';

const Article: React.FC<ArticleProps> = ({ user }) => {
  const articleId = history.location.query?.articleId;
  const [getArticle, { data, loading }] = useLazyQuery<ArticleApiData['article']>(
    ARTICLE_API.ARTICLE,
  );
  const imgPrefix = useContext(ImgPrefixConext);
  const article = useMemo(() => data?.article, [data?.article]);
  const [showInput, setShowInput] = useState(false);
  const [comment, setComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentData, setCommentData] = useState<ArticleApiData['comment']['comment']>();
  const [commentFatherId, setCommentFatherId] = useState<string>();
  const [img, setImg] = useState<string>();
  const [give, setGive] = useState(false);
  const isGive = useMemo(() => article?.isGive || give, [article?.isGive, give]);
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
      client
        .query<ArticleApiData['comment']>({
          query: ARTICLE_API.COMMENT,
          variables: {
            articleId,
          },
        })
        .then(({ data }) => {
          setCommentData(data.comment);
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
      <div
        className={styles.article}
        onClick={() => history.push({ pathname: '/user', query: { userId: user.id || '' } })}
      >
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
                src={imgPrefix + v}
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
          <div className={styles.give}>赞{article?.giveCount || 0 + 10}个</div>
        </div>
        <div className={styles.tip}>图文信息均来自用户上传,如有侵权请联系删除</div>
        <div className={styles.comment}>
          <Comments
            datasource={commentData}
            replay={(commentFatherId) => {
              setCommentFatherId(commentFatherId);
              setShowInput(true);
            }}
          />
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
                className={`${styles['give-a-five']} ${isGive ? styles['active-icon'] : ''}`}
                onClick={() => {
                  if (!user.id) {
                    return history.push('/account/login');
                  }
                  if (!isGive) {
                    client
                      .mutate({
                        mutation: ARTICLE_API.GIVE_ARTICLE,
                        variables: {
                          articleId,
                        },
                      })
                      .then(() => {
                        setGive(true);
                        return notification.success({ message: '成功点赞 🥳', duration: 1.5 });
                      });
                  } else {
                    notification.success({ message: '你已经点过赞啦 🤪', duration: 1.5 });
                  }
                }}
              >
                <Icon
                  type={isGive ? 'icon-give-active-copy' : 'icon-give'}
                  className={styles.icon}
                />
                点赞
              </div>
            </div>
          ) : (
            <SendInput
              msg={comment}
              onChangeEmojiStatus={(s) => setStatus(s)}
              setMsg={setComment}
              setImgPath={setImg}
              onSend={() => {
                if (!user.id) {
                  return history.push('/account/login');
                }
                if (!comment) {
                  return notification.error({ message: '评论不能为空哦~ 🥺' });
                }
                const data = {
                  articleId,
                  comment,
                  commentFatherId,
                  img,
                };
                setCommentLoading(true);
                client
                  .mutate({
                    mutation: ARTICLE_API.SEND_COMMENT,
                    variables: {
                      data,
                    },
                  })
                  .then(({ data: sendCommendData }) => {
                    const commentId = sendCommendData.createArticleComment;
                    const comment = {
                      id: commentId,
                      createTime: new Date().valueOf(),
                      img,
                      comment: data.comment,
                      publisher: {
                        headImg: user.headImg || '',
                        id: user.id || '',
                        username: user.username || '',
                      },
                    };
                    if (commentData) {
                      if (commentFatherId) {
                        const data = [...commentData];
                        const index = [...commentData].findIndex((v) => v.id === commentFatherId);
                        const child = data[index].commentChild;
                        let comm: any;
                        if (child) {
                          comm = [...child, comment];
                        } else {
                          comm = [comment];
                        }
                        data.splice(index, 1, {
                          ...data[index],
                          commentChild: comm,
                        });
                        setCommentData(data);
                      } else {
                        setCommentData([...commentData, comment]);
                      }
                    } else {
                      setCommentData([comment]);
                    }
                    console.log(sendCommendData);
                  })
                  .catch(() => {
                    notification.error({ message: '评论发送失败,请稍后再试 😟' });
                  })
                  .finally(() => {
                    setCommentLoading(false);
                    setShowInput(false);
                    setCommentFatherId(undefined);
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
        {showInput && (
          <div
            className={styles.fixed}
            onClick={() => {
              setShowInput(false);
              setCommentFatherId(undefined);
            }}
          />
        )}
      </div>
    </Spin>
  );
};

const mapStateToProps = (state: State) => ({
  user: state.index.user,
});

export default connect(mapStateToProps)(Article);

interface ArticleProps {
  user: State['index']['user'];
}
