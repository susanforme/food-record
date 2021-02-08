import { history } from 'umi';
import Icon from './Icon';
import { createUseStyles } from 'react-jss';

const TopNav: React.FC<TopNavProps> = ({ title }) => {
  const style = useStyles();
  return (
    <div className={style.topNav}>
      <Icon
        type="icon-left"
        className={style.icon}
        onClick={() => history.goBack()}
      ></Icon>
      <span>{title}</span>
    </div>
  );
};

export default TopNav;

function useStyles() {
  return createUseStyles({
    topNav: {
      height: '50px',
      'background-color': 'gold',
      display: 'flex',
      'align-items': 'center',
      position: 'relative',
      'justify-content': 'center',
      '& span': {
        color: 'white',
      },
    },
    icon: {
      color: 'white',
      'font-size': '25px',
      'margin-left': '10px',
      position: 'absolute',
      left: 0,
    },
  })();
}
interface TopNavProps {
  title?: string;
}
