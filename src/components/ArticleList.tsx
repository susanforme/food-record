import { ArticleApiData, ARTICLE_API } from '@/api/query';
import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useMemo } from 'react';
import ArticleItems from './ArticleItems';

const ArticleList: React.FC<ArticleItemsProps> = ({ page, perPage, kind, isGive }) => {
  const requestData = useMemo(() => {
    return {
      // 页码
      page,
      // 每页页数
      perPage,
      // 分类
      kind,
      // 是否按照点赞来进行排序
      isGive,
    };
  }, [isGive, kind, page, perPage]);
  const [getArticle, { loading, data }] = useLazyQuery<ArticleApiData['articleItems']>(
    ARTICLE_API.ARTICLE_ITEM,
  );
  useEffect(() => {
    getArticle({
      variables: {
        data: requestData,
      },
    });
  }, [getArticle, requestData]);
  return <ArticleItems datasource={data?.articleItems} loading={loading} />;
};

export default ArticleList;

interface ArticleItemsProps {
  page?: number;
  kind?: string;
  perPage?: number;
  isGive?: boolean;
}
