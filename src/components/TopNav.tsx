import { history } from 'umi';
import Icon from './Icon';
import style from './TopNav.less';

const TopNav: React.FC<TopNavProps> = ({ title }) => {
  return (
    <div className={style['top-nav']}>
      <Icon type="icon-left" className={style.icon} onClick={() => history.goBack()}></Icon>
      <span>{title}</span>
    </div>
  );
};

export default TopNav;

interface TopNavProps {
  title?: string;
}
