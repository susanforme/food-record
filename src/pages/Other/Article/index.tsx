import { ArticleApiData, ARTICLE_API } from '@/api/query';
import { useLazyQuery } from '@apollo/client';
import { history } from 'umi';
import Shelf from '@/components/Shelf';
import { useEffect, useMemo } from 'react';
import styles from './article.less';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Rate, Avatar, Tag, Comment, Empty } from 'antd';
import { radomlyGeneratColor } from '@/utils';
import { HeartOutlined } from '@ant-design/icons';

const Article: React.FC = () => {
  const articleId = history.location.query?.articleId;
  const [getArticle, { data, loading }] = useLazyQuery<ArticleApiData['article']>(
    ARTICLE_API.ARTICLE,
  );
  const article = useMemo(() => data?.article, [data?.article]);
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
  const colors = useMemo(() => radomlyGeneratColor(article?.label.length || 0), [
    article?.label.length,
  ]);

  return loading ? (
    <Shelf />
  ) : (
    <div className={styles.article}>
      <div className="author">
        <Avatar src={article?.author.headImg} />
        <span>{article?.author.username}</span>
      </div>
      <Carousel showArrows={false} showThumbs={false} showStatus={false} autoPlay infiniteLoop>
        {article?.imgPath.map((v) => {
          return <img src={'https://' + v} className={styles.img} alt="" key={v} />;
        })}
      </Carousel>
      <div className="title">
        <h2>{article?.title}</h2>
        <Rate disabled value={article?.score} />
      </div>
      <div className="content">
        <i className="share-reason">分享理由</i>
        <p className="article-content">{article?.content}</p>
      </div>
      <div className="tags">
        {article?.label.map((v, index) => {
          return (
            <Tag key={v} color={colors[index]}>
              {v}
            </Tag>
          );
        })}
      </div>
      <div className="tip">图文信息均来自用户上传,如有侵权请联系删除</div>
      <div className="comment">
        {article?.comment.length || 0 > 0 ? (
          <Comment content={article?.comment[0].comment} />
        ) : (
          <Empty description="暂无评论" />
        )}
      </div>
      <div
        className="give"
        onClick={() => {
          if (article?.isGive) {
            console.log(123123);
          }
        }}
      >
        <HeartOutlined className={styles.heart} />
        <span className="give-count">{article?.giveCount || 0 + 11}</span>
      </div>
    </div>
  );
};

export default Article;
