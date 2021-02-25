import type { UserApiData } from '@/api/query';
import ArticleItems from '@/components/ArticleItems';
import Empty from 'antd/es/empty';
import moment from 'moment';
import React, { useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { history } from 'umi';
import TouchFeedback from 'rmc-feedback';
import { ImgPrefixConext } from '@/context';

const TabContent: React.FC<TabContentProps> = React.memo(({ showKey, user }) => {
  const imgPrefix = useContext(ImgPrefixConext);
  const styles = useStyles();
  if (showKey === 'article') {
    return (
      <div className={styles.article}>
        <ArticleItems datasource={user?.article} />
      </div>
    );
  } else if (showKey === 'comment') {
    const comment = user?.comment;
    console.log(comment);
    if ((comment?.length || 0) < 1 || !comment) {
      return (
        <div className={styles.tabContent}>
          <Empty description="没有发表过看法哦~"></Empty>
        </div>
      );
    }
    return (
      <div className={styles.commentFather}>
        {comment.map((v) => {
          return (
            <TouchFeedback key={v.createTime} activeClassName={styles.active}>
              <div
                className={styles.commentBox}
                onClick={() =>
                  history.push({ pathname: '/article', query: { articleId: v.articleId.id } })
                }
              >
                <p className={styles.content}>
                  <span className={styles.fontPosition}>标题: </span> {v.articleId.content}
                </p>
                <p className={styles.comment}>
                  <span className={styles.fontPosition}>评论:</span> {v.comment}
                </p>
                <p className={styles.fromNow}>
                  <span className={styles.fontPosition}>时间: </span>
                  {moment(v.createTime).fromNow()}
                </p>
                <img
                  className={styles.rightImg}
                  src={imgPrefix + v.articleId.imgPath[0]}
                  alt={v.articleId.content}
                />
              </div>
            </TouchFeedback>
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
      minHeight: '30vh',
    },
    commentFather: {
      padding: '0.5rem',
      minHeight: '30vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    article: {
      marginTop: '-0.5rem',
      minHeight: '30vh',
    },
    content: {
      fontSize: '16px',
    },
    fromNow: {
      fontSize: '12px',
      marginTop: '3px',
    },
    comment: {
      fontSize: '14px',
      margin: '8px 0',
    },
    commentBox: {
      border: '1px solid rgba(206, 205, 205, 0.486)',
      borderLeftWidth: 0,
      borderRightWidth: 0,
      width: '100%',
      marginBottom: '1rem',
      padding: '1rem',
      position: 'relative',
      height: '103px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    active: {
      backgroundColor: 'rgba(206, 205, 205, 0.486)',
    },
    rightImg: {
      width: '20%',
      position: 'absolute',
      right: '2vw',
      top: '20%',
      height: '50%',
    },
    fontPosition: {
      width: '40px',
      display: 'inline-block',
    },
  })();
}

interface TabContentProps {
  showKey: ShowKey;
  user?: UserApiData['user']['user'];
}

type ShowKey = 'article' | 'comment' | 'strategy';
