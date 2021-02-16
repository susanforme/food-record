import styles from './index.less';
import { Input, Avatar, Tabs, Spin } from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import { connect, State } from 'umi';
import { useEffect } from 'react';
import { convertWeather } from '@/utils';
import AnimatedWeather from 'react-animated-weather';
import Icon from '@/components/Icon';
import Propose from './components/Propose';
import { useQuery } from '@apollo/client';
import { ArticleApiData, ARTICLE_API } from '@/api/query';

const { TabPane } = Tabs;
const Home: React.FC<HomeProps> = ({ location, getWeather, weather }) => {
  const { city, weather: localWeather, temperature } = weather;
  const { data: kindResponse, loading } = useQuery<ArticleApiData['kind']>(ARTICLE_API.KIND);
  useEffect(() => {
    if (!city) {
      getWeather(location || '510700');
    }
  }, [getWeather, location, city]);
  const suffix = (
    <SearchOutlined
      style={{
        fontSize: 16,
      }}
    />
  );
  const TabPanes = kindResponse?.kind?.map((v) => {
    return <TabPane key={v.id} tab={v.kindName} />;
  });
  const water = Array(5)
    .fill(1)
    .map((v, index) => {
      return <Icon type="icon-water-drop" className={styles.icon} key={index} />;
    });
  return (
    <div className={styles.home}>
      <img className={styles['home-img']} src={require('@/img/food.jpeg')} />
      <div className={styles['img-wrapper']}>
        <div className={styles.title}>
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
            <Avatar src={<img src={require('@/img/headimg.png')} alt="" />}></Avatar>
          </div>
          <span>美食城主</span>
        </div>
      </div>
      <Propose />
      {loading ? (
        <div className={styles['loading-center']}>
          <Spin />
        </div>
      ) : (
        <Tabs defaultActiveKey="1" centered>
          <TabPane key="1" tab="全部"></TabPane>
          {TabPanes}
        </Tabs>
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  weather: state.home.weather,
  location: state.index.user.location,
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
}
