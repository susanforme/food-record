import Icon from '@/components/Icon';
import { createUseStyles } from 'react-jss';
import { history } from 'umi';

// 建议
const Propose: React.FC = () => {
  const styles = useStyles();
  const propose = [
    {
      // 跳入一个分类页面,并且是随机的,首页点赞高在前面
      title: '寻美食',
      type: 'icon-meishi',
      func: () => {
        history.push('home/food');
      },
    },
    {
      // 跳入message
      title: '处朋友',
      type: 'icon-jiaoyou',
      func: () => {
        history.push('message');
      },
    },
    {
      // 随机进入一篇文章详情
      title: '看一看',
      type: 'icon-suiji',
      func: () => {},
    },
    {
      title: '查线路',
      type: 'icon-dache',
      func: () => {
        history.push('ranging');
      },
    },
  ].map((v) => {
    return (
      <div key={v.type} className={styles.iconFather} onClick={v.func}>
        <Icon type={v.type} className={styles.icon} />
        <span className={styles.title}>{v.title}</span>
      </div>
    );
  });
  return <div className={styles.propose}>{propose}</div>;
};

export default Propose;

function useStyles() {
  return createUseStyles({
    propose: {
      padding: '3vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconFather: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: '13px',
      fontWeight: 500,
    },
    icon: {
      fontSize: '35px',
    },
  })();
}
