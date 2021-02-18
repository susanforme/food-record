import { Skeleton } from 'antd';
import { createUseStyles } from 'react-jss';

const Shelf: React.FC = () => {
  const styles = useStyles();
  return (
    <div className={styles.shelf}>
      <Skeleton active paragraph={{ rows: 3 }} />
      <div className={styles.space}></div>
      <Skeleton active paragraph={{ rows: 3 }} />
      <div className={styles.space}></div>
      <Skeleton active paragraph={{ rows: 3 }} />
      <div className={styles.space}></div>
      <Skeleton active paragraph={{ rows: 3 }} />
    </div>
  );
};

export default Shelf;

function useStyles() {
  return createUseStyles({
    shelf: {
      width: '100%',
      height: '100%',
      padding: '6vw',
    },
    space: {
      marginTop: '3rem',
    },
  })();
}
