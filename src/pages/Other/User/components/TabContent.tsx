import type { UserApiData } from '@/api/query';
import ArticleItems from '@/components/ArticleItems';
import Empty from 'antd/es/empty';
import React from 'react';

const TabContent: React.FC<TabContentProps> = React.memo(({ showKey, user }) => {
  if (showKey === 'article') {
    return (
      <div>
        <ArticleItems />
      </div>
    );
  } else if (showKey === 'comment') {
    return <div></div>;
  }
  return (
    <div>
      <Empty description="没有发表过攻略哦"></Empty>
    </div>
  );
});

export default TabContent;

interface TabContentProps {
  showKey: ShowKey;
  user?: UserApiData['user']['user'];
}

type ShowKey = 'article' | 'comment' | 'strategy';
