import { createUseStyles } from 'react-jss';

const About: React.FC = () => {
  const style = useStyles();
  return (
    <div className={style.about}>
      <div className={style.layout}>
        <h3 id="-">公司</h3>
        <p>成都xx有限公司</p>
        <h3 id="-">地址</h3>
        <p>四川省郫都区西源大道</p>
        <h3 id="-">电话</h3>
        <p>(xxx) xxxx-xxxx</p>
      </div>
    </div>
  );
};

export default About;

function useStyles() {
  return createUseStyles({
    about: {
      color: '#666',
      fontSize: '0.347rem',
      backgroundColor: '#fff',
      height: '100vh',
      overflow: 'hidden',
    },
    layout: {
      padding: '0 3.733333vw 4vw',
      margin: {
        top: '30px',
      },
      '& h3': {
        'font-size': '0.8rem',
        'font-weight': 600,
        color: '#333',
      },
      '& p': {
        margin: '0.7rem 0',
        'line-height': 1.4,
      },
    },
  })();
}
