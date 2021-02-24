import { Spin, Empty, List, Avatar, Rate, Tag } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { history } from 'umi';
import TouchFeedback from 'rmc-feedback';
import { radomlyGeneratColor } from '@/utils';
import { ImgPrefixConext } from '@/context';
import { ArticleApiData } from '@/api/query';

const { Item } = List;
const ArticleList: React.FC<ArticleItemsProps> = React.memo(
  ({ datasource, loading, emptyDescription }) => {
    const data = datasource;
    const styles = useStyles();
    const imgPrefix = useContext(ImgPrefixConext);
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
      <div className={styles.articleItems}>
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={data?.items}
          renderItem={(item) => {
            const colors = radomlyGeneratColor(item.label.length);
            return (
              <Item
                onClick={() =>
                  history.push({ pathname: '/article', query: { articleId: item.id } })
                }
              >
                <TouchFeedback activeClassName={styles.active}>
                  <div className={styles.item}>
                    <img src={imgPrefix + item.img} className={styles.foodImg} />
                    <div className={styles.head}>
                      <Avatar src={item.author.headImg} className={styles.avatar} />
                      <div className={styles.flex}>
                        <span className={styles.username}>{item.author.username}</span>
                        <div className={styles.right}>
                          <HeartOutlined className={styles.heart} />
                          <span className={styles.give}>{item.give + 11}</span>
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
                            {v.length > 5 ? v.slice(0, 5) + '...' : v}
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

export default ArticleList;

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
      },
    },
    rate: {
      fontSize: '0.64rem',
      marginLeft: '0.4266666666666667rem',
      display: 'flex',
      alignItems: 'center',
    },
    label: {
      padding: '0 0.26666666666666666rem',
    },
    tag: {
      border: 'none',
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
}
