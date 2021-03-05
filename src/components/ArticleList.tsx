import client from '@/api';
import { ArticleApiData, ARTICLE_API } from '@/api/query';
import { Spin } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ArticleItems from './ArticleItems';

const ArticleList: React.FC<ArticleItemsProps> = ({ kind }) => {
  const [page, setPage] = useState(1);
  const requestData = useMemo(
    () => ({
      // 页码
      page,
      // 每页页数
      perPage: 10,
      // 分类
      kind,
      // 是否按照点赞来进行排序
      isGive: true,
    }),
    [kind, page],
  );
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<ArticleApiData['articleItems']['articleItems']>();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage((pre) => pre + 1);
  }, []);
  useEffect(() => {
    setPage(1);
  }, [kind]);
  useEffect(() => {
    if (data?.total) {
      if (requestData.page > Math.ceil(data.total / requestData.perPage)) {
        setRefreshing(false);
        return;
      }
    }
    client
      .query<ArticleApiData['articleItems']>({
        query: ARTICLE_API.ARTICLE_ITEM,
        variables: {
          data: requestData,
        },
      })
      .then(({ data }) => {
        setData(data.articleItems);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, [data?.total, requestData]);

  return (
    <>
      <ArticleItems
        datasource={data}
        loading={data === undefined}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />

      <Spin spinning={refreshing}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: refreshing ? '3rem' : '0px',
            marginTop: '1rem',
            transition: 'all 0.5s ease',
          }}
        ></div>
      </Spin>
    </>
  );
};

export default ArticleList;

interface ArticleItemsProps {
  kind?: string;
}
