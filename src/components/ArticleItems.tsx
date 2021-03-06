import { Spin, Empty, List, Avatar, Rate, Tag } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { history } from 'umi';
import TouchFeedback from 'rmc-feedback';
import { debounceFactory, getHeadImg, radomlyGeneratColor } from '@/utils';
import { ImgPrefixConext } from '@/context';
import { ArticleApiData } from '@/api/query';

const { Item } = List;
const ArticleItems: React.FC<ArticleItemsProps> = React.memo(
  ({ datasource, loading, emptyDescription, onRefresh, refreshing }) => {
    const data = datasource;
    const styles = useStyles();
    const imgPrefix = useContext(ImgPrefixConext);
    const listRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const listDom = listRef.current;
      const debounce = debounceFactory(100);
      let start = 0;
      const touchStartHandle = (e: TouchEvent) => {
        debounce(() => {
          start = e.touches[0].pageY;
        });
      };
      const touchMoveHandle = (e: TouchEvent) => {
        debounce(() => {
          if (e.touches[0].pageY - start < 0 && !refreshing) {
            const isBottom =
              document.documentElement.scrollHeight -
                document.documentElement.scrollTop -
                document.documentElement.clientHeight <
              100;
            if (isBottom) {
              onRefresh && onRefresh();
            }
          }
        });
      };
      if (listRef) {
        listDom?.addEventListener('touchstart', touchStartHandle);
        listDom?.addEventListener('touchmove', touchMoveHandle);
      }
      return () => {
        listDom?.removeEventListener('touchstart', touchStartHandle);
        listDom?.removeEventListener('touchmove', touchMoveHandle);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onRefresh, refreshing, listRef.current]);
    if (loading) {
      return (
        <div className={styles.loading}>
          <Spin />
        </div>
      );
    }
    if (data?.total === 0) {
      return (
        <div className={styles.articleItems}>
          <Empty description={emptyDescription || '这个城市没有人分享美食哦~'} />
        </div>
      );
    }
    return (
      <div className={styles.articleItems} ref={listRef}>
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={data?.items}
          renderItem={(item) => {
            const colors = radomlyGeneratColor(item.label.length);
            return (
              <Item
                key={item.id}
                onClick={() =>
                  history.push({ pathname: '/article', query: { articleId: item.id } })
                }
              >
                <TouchFeedback activeClassName={styles.active}>
                  <div className={styles.item}>
                    <img src={imgPrefix + item.img} className={styles.foodImg} />
                    <div className={styles.head}>
                      <Avatar src={getHeadImg(item.author.headImg)} className={styles.avatar} />
                      <div className={styles.flex}>
                        <span className={styles.username}>{item.author.username}</span>
                        <div className={styles.right}>
                          <HeartOutlined className={styles.heart} />
                          {item.give > 0 && <span className={styles.give}>{item.give}</span>}
                        </div>
                      </div>
                    </div>
                    <div className={styles.title}>
                      <span>{item.title}</span>
                      <Rate value={item.score} disabled className={styles.rate} />
                    </div>
                    <div className={styles.label}>
                      {item.label.map((v, index) => {
                        return (
                          <Tag className={styles.tag} key={v} color={colors[index]}>
                            {v}
                          </Tag>
                        );
                      })}
                    </div>
                    <div className={styles.content}>
                      <p>{item.content}</p>
                    </div>
                  </div>
                </TouchFeedback>
              </Item>
            );
          }}
        />
      </div>
    );
  },
);

export default ArticleItems;

function useStyles() {
  return createUseStyles({
    loading: {
      height: '15vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    articleItems: {
      padding: '0 4vw',
      marginTop: '0.8533333333333334rem',
      transition: 'all 0.5s ease',
    },
    item: {
      border: '0.05333333333333334rem solid rgba(0, 0, 0, 0.1)',
      borderRadius: '0.26666666666666666rem',
      overflow: 'hidden',
    },
    active: {
      backgroundColor: 'rgba(221, 221, 221, 0.486)',
    },
    foodImg: {
      height: '6.4rem',
    },
    head: {},
    avatar: {
      margin: {
        top: '-1.7066666666666668rem',
        left: '0.26666666666666666rem',
      },
      width: '1.7066666666666668rem',
      height: '1.7066666666666668rem',
    },
    username: {
      fontSize: '0.5333333333333333rem',
      marginLeft: '0.26666666666666666rem',
      width: '3.2rem',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    flex: {
      display: 'inline-flex',
      alignItems: 'center',
      position: 'relative',
      width: 'calc(100% - 2.1333333333333333rem)',
    },
    right: {
      position: 'absolute',
      right: '0.26666666666666666rem',
    },
    heart: {
      color: 'gold',
    },
    give: {
      fontSize: '0.5333333333333333rem',
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.8533333333333334rem',
      padding: '0 0.26666666666666666rem',
      fontWeight: 700,
      '& >span': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '1.84rem',
        flex: 1.2,
      },
    },
    rate: {
      fontSize: '0.64rem',
      marginLeft: '0.4266666666666667rem',
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      '& li': {
        marginRight: '0 !important',
      },
    },
    label: {
      padding: '0 0.26666666666666666rem',
      display: 'flex',
      width: '100%',
    },
    tag: {
      border: 'none',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    content: {
      marginTop: '0.26666666666666666rem',
      position: 'relative',
      '& p': {
        margin: '0 0.26666666666666666rem',
        overflow: 'hidden',
        height: '2.4rem',
        lineHeight: '1.2rem',
        position: 'relative',
        wordBreak: 'break-all',
        lineClamp: 2,
        boxOrient: 'vertical',
      },
    },
  })();
}

interface ArticleItemsProps {
  datasource?: ArticleApiData['articleItems']['articleItems'];
  loading?: boolean;
  emptyDescription?: string;
  onRefresh?: Function;
  refreshing?: boolean;
}
