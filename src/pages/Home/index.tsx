import styles from './index.less';
import { Input, Avatar, Tabs, BackTop } from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import { connect, State } from 'umi';
import { useEffect, useMemo, useState } from 'react';
import { convertWeather, debounceFactory } from '@/utils';
import AnimatedWeather from 'react-animated-weather';
import Icon from '@/components/Icon';
import Propose from './components/Propose';
import ArticleItems from '@/components/ArticleItems';

const { TabPane } = Tabs;
const Home: React.FC<HomeProps> = ({ location, getWeather, weather, kind }) => {
  const { city, weather: localWeather, temperature } = weather;
  const [articleKind, setArticleKind] = useState<string>();
  const [currentPosition, setCurrentPosition] = useState(0);
  const isFixed = useMemo(() => currentPosition > 317, [currentPosition]);
  const debounce = debounceFactory(10);
  useEffect(() => {
    if (!city) {
      getWeather(location || '510700');
    }
  }, [getWeather, location, city]);
  useEffect(() => {
    const dom = document.documentElement;
    const handler = () => {
      debounce(() => {
        setCurrentPosition(dom.scrollTop);
        console.log(dom.scrollTop);
      });
    };

    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, [debounce]);
  const suffix = (
    <SearchOutlined
      style={{
        fontSize: 16,
      }}
    />
  );
  const TabPanes = kind?.map((v, index) => {
    return <TabPane key={v.id || index} tab={v.kindName} />;
  });
  const water = Array(5)
    .fill(1)
    .map((v, index) => {
      return <Icon type="icon-water-drop" className={styles.icon} key={index} />;
    });
  return (
    <div className={styles.home}>
      <img className={styles['home-img']} src={require('@/assets/img/food.jpeg')} />
      <div className={styles['img-wrapper']}>
        <div className={`${styles.title} ${isFixed && styles['fixed-title']}`}>
          <div className={styles.location}>
            <span>{city}</span>
            <DownOutlined color="white" />
          </div>
          <Input suffix={suffix} className={styles.input} />
        </div>
        <div className={styles['title-content']}>
          <span className={styles['city-title']}>{city}</span>
          <AnimatedWeather icon={convertWeather(localWeather)} color="#f5f5f5" animate size={22} />
          <span className={styles.temp}>{temperature}°C</span>
        </div>
        <div className={styles.right}>
          <div className={styles.first}>城市亮度 {water}</div>
          <div className={styles.second}>
            {/* 查询当地的多少文章发表 */}
            已有336个美食守护者
          </div>
        </div>
        <div className={styles.left}>
          {/* 显示当前城市投稿最多 */}
          <div className={styles.circle}>
            <Avatar src={<img src={require('@/assets/img/headimg.png')} alt="" />}></Avatar>
          </div>
          <span>美食城主</span>
        </div>
      </div>
      <Propose />
      <div className={`${styles.tab} ${isFixed && styles['fixed-tab']}`}>
        <Tabs
          defaultActiveKey="1"
          centered
          onChange={(key) => {
            if (key === 'all') {
              setArticleKind(undefined);
            } else {
              setArticleKind(key);
            }
            window.scrollTo(0, 0);
          }}
        >
          <TabPane key="all" tab="全部"></TabPane>
          {TabPanes}
        </Tabs>
      </div>
      {isFixed && <div className={styles['tab-position']} />}
      <ArticleItems kind={articleKind} />
      <div className={styles.position}></div>
      <BackTop style={{ bottom: '5rem' }}>
        <Icon type="icon-top" style={{ fontSize: '3rem' }} />
      </BackTop>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  weather: state.home.weather,
  location: state.index.user.location,
  kind: state.home.kind,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getWeather(city: string) {
    dispatch({
      type: 'home/getWeather',
      payload: city,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

interface HomeProps {
  title: string;
  location?: string;
  getWeather(city: string): void;
  weather: {
    temperature?: string;
    weather?: string;
    city?: string;
  };
  kind: {
    kindName?: string;
    id?: string;
  }[];
}
