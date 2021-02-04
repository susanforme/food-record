import style from './NavBar.module.less';
import Icon from './Icon';
import { connect } from 'react-redux';
import { State } from '@/store/reducer';
import { history } from '@/store';
import { getIsChildRoute } from '@/utils';
import { createPortal } from 'react-dom';

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
    const activeClass = getIsChildRoute(v.path, pathname) ? style.active : undefined;
    if (v.path === '/publish') {
      return <div key={v.path}>publish</div>;
    }
    return (
      <div key={v.path} className={style.iconFather} onClick={() => history.push(v.path)}>
        <Icon type="icon-home" className={activeClass}></Icon>
        <a href={v.path} className={activeClass} onClick={(e) => e.preventDefault()}>
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

const mapStateToProps = (state: State) => ({
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(NavBar);

interface NavBarProps {
  pathname: string;
}
