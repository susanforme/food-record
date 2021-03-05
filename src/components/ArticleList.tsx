import client from '@/api';
import { ArticleApiData, ARTICLE_API } from '@/api/query';
import { notification, Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import ArticleItems from './ArticleItems';

const ArticleList: React.FC<ArticleItemsProps> = ({ kind }) => {
  const [requestData, setRequestData] = useState({
    // 页码
    page: 1,
    // 每页页数
    perPage: 10,
    // 分类
    kind,
    // 是否按照点赞来进行排序
    isGive: true,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<ArticleApiData['articleItems']['articleItems']>();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRequestData((pre) => ({ ...pre, page: pre.page + 1 }));
  }, []);
  useEffect(() => {
    if (data?.total) {
      if (requestData.page > Math.ceil(data.total / requestData.perPage)) {
        notification.warning({ message: '没有美食了哦~~', duration: 1.5 });
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
        if (data.articleItems.items.length === 0) {
          return notification.warning({ message: '没有美食了哦~~', duration: 1.5 });
        }
        setData((pre) => {
          return {
            items: [...(pre?.items || []), ...data.articleItems.items],
            total: data.articleItems.total,
          };
        });
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: refreshing ? '3rem' : '0px',
          marginTop: '1rem',
          transition: 'all 0.5s ease',
        }}
      >
        <Spin />
      </div>
    </>
  );
};

export default ArticleList;

interface ArticleItemsProps {
  kind?: string;
}
