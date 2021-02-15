import styles from './index.less';
import { Input } from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import { connect, State } from 'umi';
import { useEffect } from 'react';
import { convertWeather } from '@/utils';
import AnimatedWeather from 'react-animated-weather';
console.log(AnimatedWeather);

const Home: React.FC<HomeProps> = ({ location, getWeather, weather }) => {
  const { city, weather: localWeather, temperature } = weather;
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
          <div className="first">城市亮度</div>
          <div className="second">
            {/* 查询当地的多少文章发表 */}
            已有336个美食守护者
          </div>
        </div>
      </div>
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
