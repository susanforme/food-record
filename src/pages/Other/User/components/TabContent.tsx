import type { UserApiData } from '@/api/query';
import ArticleItems from '@/components/ArticleItems';
import Empty from 'antd/es/empty';
import moment from 'moment';
import React from 'react';
import { createUseStyles } from 'react-jss';

const TabContent: React.FC<TabContentProps> = React.memo(({ showKey, user }) => {
  const styles = useStyles();
  if (showKey === 'article') {
    return (
      <div>
        <ArticleItems datasource={user?.article} />
      </div>
    );
  } else if (showKey === 'comment') {
    const comment = user?.comment;
    console.log(comment);
    if (!comment) {
      return (
        <div className={styles.tabContent}>
          <Empty description="没有发表过看法哦~"></Empty>
        </div>
      );
    }
    return (
      <div>
        {comment.map((v) => {
          return (
            <div key={v.createTime}>
              <div>{moment(v.createTime).fromNow()}</div>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className={styles.tabContent}>
      <Empty description="没有发表过攻略哦~"></Empty>
    </div>
  );
});

export default TabContent;

function useStyles() {
  return createUseStyles({
    tabContent: {
      padding: '2rem',
      minHeight: '65vh',
    },
    comment: {
      minHeight: '65vh',
    },
  })();
}

interface TabContentProps {
  showKey: ShowKey;
  user?: UserApiData['user']['user'];
}

type ShowKey = 'article' | 'comment' | 'strategy';
