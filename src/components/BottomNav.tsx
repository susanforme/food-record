import style from './BottomNav.less';
import Icon from './Icon';
import { createPortal } from 'react-dom';
import { connect, history, State } from 'umi';
import { bottomNavMap, getIsChildRoute } from '@/utils';

const BottomNav: React.FC<NavBarProps> = ({ pathname }) => {
  const Links = bottomNavMap.map((v) => {
    const path = v.path;
    const activeClass = getIsChildRoute(path, pathname) ? style.active : undefined;
    if (path === '/publish') {
      return (
        <div key={v.path} className={style.publish} onClick={() => history.push(path)}>
          <div className={style['wrapper']}>
            <div className={style.icon}>+</div>
          </div>
        </div>
      );
    }
    return (
      <div key={path} className={style['icon-father']} onClick={() => history.push(path)}>
        <Icon type={v.icon} className={activeClass}></Icon>
        <a href={path} className={activeClass} onClick={(e) => e.preventDefault()}>
          {v.title}
        </a>
      </div>
    );
  });
  return createPortal(
    <div className={style['bottom-nav']} id="nav">
      {Links}
    </div>,
    document.querySelector('#root') as Element,
  );
};

const mapStateToProps = ({ index }: State) => ({
  pathname: index.pathname,
});

export default connect(mapStateToProps)(BottomNav);

interface NavBarProps {
  pathname: string;
}
