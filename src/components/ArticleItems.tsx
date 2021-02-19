import { ARTICLE_API } from '@/api/query';
import { useLazyQuery } from '@apollo/client';
import { Spin, Empty, List, Avatar, Rate, Tag } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { useEffect, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { history } from 'umi';
import TouchFeedback from 'rmc-feedback';
import { radomlyGeneratColor } from '@/utils';

const { Item } = List;
const ArticleItems: React.FC<ArticleItemsProps> = ({ page, perPage, kind, isGive }) => {
  const styles = useStyles();
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
      <div className={styles.loading}>
        <Spin />
      </div>
    );
  }
  if (data?.articleItems.total === 0) {
    return <Empty description="这个城市没有人分享美食哦~" />;
  }
  return (
    <div className={styles.articleItems}>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={data?.articleItems.items}
        renderItem={(item: ArticleItem) => {
          const colors = radomlyGeneratColor(item.label.length);
          return (
            <Item
              onClick={() => history.push({ pathname: '/article', query: { article: item.id } })}
            >
              <TouchFeedback activeClassName={styles.active}>
                <div className={styles.item}>
                  <img src={'https://' + item.img} className={styles.foodImg} />
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
};

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
  page?: number;
  kind?: string;
  perPage?: number;
  isGive?: boolean;
}
interface ArticleItem {
  author: {
    headImg: string;
    userId: string;
    username: string;
  };
  content: string;
  give: number;
  id: string;
  img: string;
  label: string[];
  score: number;
  title: string;
}
