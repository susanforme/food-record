import { ARTICLE_API } from '@/api/query';
import { useLazyQuery } from '@apollo/client';
import { Spin, Empty, List } from 'antd';
import { useEffect, useMemo } from 'react';

const { Item } = List;
const ArticleItems: React.FC<ArticleItemsProps> = ({ page, perPage, kind, isGive }) => {
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
  const [getArticle, { loading, data }] = useLazyQuery(ARTICLE_API.ARTICLE_ITEM);
  useEffect(() => {
    getArticle({
      variables: {
        data: requestData,
      },
    });
  }, [getArticle, requestData]);
  if (loading) {
    return (
      <div>
        <Spin />
      </div>
    );
  }
  if (data?.articleItems.total === 0) {
    return <Empty description="这个城市没有人分享美食哦~" />;
  }
  return (
    <div>
      <List
        grid={{ column: 2 }}
        dataSource={data?.articleItems.items}
        renderItem={(item: any) => <Item>{item?.title}</Item>}
      />
    </div>
  );
};

export default ArticleItems;

interface ArticleItemsProps {
  page?: number;
  kind?: string;
  perPage?: number;
  isGive?: boolean;
}
