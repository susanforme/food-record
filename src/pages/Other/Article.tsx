import { ArticleApiData, ARTICLE_API } from '@/api/query';
import { useLazyQuery } from '@apollo/client';
import { history } from 'umi';
import { Carousel } from 'antd';
import Shelf from '@/components/Shelf';
import { useEffect } from 'react';

const Article: React.FC = () => {
  const articleId = history.location.query?.article;
  const [getArticle, { data, loading }] = useLazyQuery<ArticleApiData['article']>(
    ARTICLE_API.ARTICLE,
    {
      variables: {
        id: articleId,
      },
    },
  );
  useEffect(() => {
    if (articleId) {
      getArticle();
    }
  }, [articleId, getArticle]);
  useEffect(() => {
    if (!loading && !data?.article && data !== undefined) {
      history.push('/404');
    }
  }, [data, loading]);
  console.log(123123123);

  return loading ? (
    <Shelf />
  ) : (
    <div>
      <Carousel>
        {data?.article.imgPath.map((v) => {
          return <img src={'https://' + v} alt="" key={v} />;
        })}
      </Carousel>
    </div>
  );
};

export default Article;
