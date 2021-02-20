// 文章详情中的地图通过https://lbs.amap.com/api/webservice/guide/api/staticmaps静态地图返回

import { ArticleApiData, ARTICLE_API } from '@/api/query';
import { useQuery } from '@apollo/client';
import { history } from 'umi';

const Article: React.FC = () => {
  const articleId = history.location.query?.article;
  if (!articleId) {
    history.push('/404');
  }
  const { data, loading } = useQuery<ArticleApiData['article']>(ARTICLE_API.ARTICLE, {
    variables: {
      id: articleId,
    },
  });
  console.log(data);

  return <div></div>;
};

export default Article;
