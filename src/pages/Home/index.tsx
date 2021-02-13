import styles from './index.less';

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="home">
      <h1 className={styles.title}>title</h1>
    </div>
  );
};

export default Home;

interface HomeProps {
  title: string;
}
