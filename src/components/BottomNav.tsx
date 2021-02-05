import style from './BottomNav.less';
import Icon from './Icon';
import { createPortal } from 'react-dom';
import { connect, history, IndexModelState } from 'umi';
import { getIsChildRoute } from '@/utils';

function NavBar({ pathname }: NavBarProps) {
  const map = [
    {
      path: '/home',
      title: '首页',
    },
    {
      path: '/distance',
      title: '测距',
    },
    {
      path: '/publish',
      title: '',
    },
    {
      path: '/message',
      title: '消息',
    },
    {
      path: '/me',
      title: '我的',
    },
  ];
  const Links = map.map((v) => {
    const path = '/layout' + v.path;
    const activeClass = getIsChildRoute(path, pathname) ? style.active : undefined;
    if (path === '/layout/publish') {
      return <div key={v.path}>publish</div>;
    }
    return (
      <div key={path} className={style.iconFather} onClick={() => history.push(path)}>
        <Icon type="icon-home" className={activeClass}></Icon>
        <a href={path} className={activeClass} onClick={(e) => e.preventDefault()}>
          {v.title}
        </a>
      </div>
    );
  });
  return createPortal(
    <div className={style.navBar} id="nav">
      {Links}
    </div>,
    document.querySelector('#root') as Element,
  );
}

const mapStateToProps = (state: IndexModelState) => ({
  pathname: state.pathname,
});

export default connect(mapStateToProps)(NavBar);

interface NavBarProps {
  pathname: string;
}
