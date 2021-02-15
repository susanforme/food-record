import styles from './index.less';
import { Input } from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import { connect, State } from 'umi';

const Home: React.FC<HomeProps> = () => {
  const suffix = (
    <SearchOutlined
      style={{
        fontSize: 16,
      }}
    />
  );
  return (
    <div className={styles.home}>
      <img
        className={styles['home-img']}
        src="https://chengcheng-1256396014.cos.ap-guangzhou.myqcloud.com/img/food.jpeg"
      />
      <div className={styles.title}>
        <div className={styles.location}>
          <span>北京</span>
          <DownOutlined color="white" />
        </div>
        <Input suffix={suffix} className={styles.input} />
      </div>
      <div style={{ height: '200vh' }}></div>
      <div style={{ height: '200vh' }}></div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  location: state.index.user.location,
});

export default connect(mapStateToProps)(Home);

interface HomeProps {
  title: string;
}
