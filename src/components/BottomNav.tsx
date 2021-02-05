import style from './BottomNav.less';
import Icon from './Icon';
import { createPortal } from 'react-dom';
import { connect, history, IndexModelState } from 'umi';
import { bottomNavMap, getIsChildRoute } from '@/utils';

const BottomNav: React.FC<NavBarProps> = ({ pathname }) => {
  const Links = bottomNavMap.map((v) => {
    const path = v.path;
    const activeClass = getIsChildRoute(path, pathname) ? style.active : undefined;
    if (path === '/publish') {
      return <div key={v.path}>publish</div>;
    }
    return (
      <div key={path} className={style['icon-father']} onClick={() => history.push(path)}>
        <Icon type="icon-home" className={activeClass}></Icon>
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

const mapStateToProps = ({ index }: { index: IndexModelState }) => ({
  pathname: index.pathname,
});

export default connect(mapStateToProps)(BottomNav);

interface NavBarProps {
  pathname: string;
}
