import { Comment, Spin, Empty, Avatar, List, Tooltip, Image } from 'antd';
import React, { useContext, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import moment from 'moment';
import { ArticleApiData } from '@/api/query';
import { history } from 'umi';
import { ImgPrefixConext } from '@/context';

const Comments: React.FC<CommentsProps> = React.memo(({ datasource, replay }) => {
  const styles = useStyles();
  const loading = useMemo(() => datasource === undefined, [datasource]);
  const imgPrefix = useContext(ImgPrefixConext);
  return (
    <Spin spinning={loading}>
      {datasource?.length || 0 > 0 ? (
        <div className={styles.comments}>
          <List
            dataSource={datasource}
            renderItem={(item) => {
              const { id, comment, commentChild, publisher, createTime, img } = item;
              const { username, headImg, id: userId } = publisher;
              const time = moment(createTime);
              return (
                <Comment
                  avatar={
                    <div onClick={() => history.push({ pathname: '/user', query: { userId } })}>
                      <Avatar src={headImg} alt={username} />
                    </div>
                  }
                  key={id}
                  author={<a onClick={() => console.log(userId)}>{username}</a>}
                  content={
                    <div>
                      {img && (
                        <Image
                          className={styles.img}
                          src={imgPrefix + img}
                          fallback={require('@/assets/img/error.png')}
                        />
                      )}
                      <p>{comment}</p>
                    </div>
                  }
                  actions={[
                    <span key="comment-nested-reply-to" onClick={() => replay(id)}>
                      回复
                    </span>,
                  ]}
                  datetime={
                    <Tooltip title={time.format('YYYY-MM-DD HH:mm:ss')}>
                      <span>{time.fromNow()}</span>
                    </Tooltip>
                  }
                >
                  {commentChild &&
                    commentChild.map((v) => {
                      const { id, comment, publisher, createTime, img } = v;
                      const { username, headImg, id: userId } = publisher;
                      return (
                        <Comment
                          avatar={
                            <div
                              onClick={() => history.push({ pathname: '/user', query: { userId } })}
                            >
                              <Avatar src={headImg} alt={username} />
                            </div>
                          }
                          key={id}
                          author={<a onClick={() => console.log(userId)}>{username}</a>}
                          content={
                            <div>
                              {img && (
                                <Image
                                  className={styles.img}
                                  fallback={require('@/assets/img/error.png')}
                                  src={imgPrefix + img}
                                />
                              )}
                              <p>{comment}</p>
                            </div>
                          }
                          datetime={
                            <Tooltip title={moment(createTime).format('YYYY-MM-DD HH:mm:ss')}>
                              <span>{moment(createTime).fromNow()}</span>
                            </Tooltip>
                          }
                        ></Comment>
                      );
                    })}
                </Comment>
              );
            }}
          ></List>
        </div>
      ) : (
        <Empty />
      )}
    </Spin>
  );
});

export default Comments;

function useStyles() {
  return createUseStyles({
    comments: {
      padding: '0 30px 0 15px',
    },
    img: {},
  })();
}

interface CommentsProps {
  datasource?: ArticleApiData['comment']['comment'];
  replay: (commentId: string) => any;
}
