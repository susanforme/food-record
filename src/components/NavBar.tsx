import routes from '@/router';
import style from './NavBar.module.less';
import Icon from './Icon';
import { connect } from 'react-redux';
import { State } from '@/store/reducer';
import { history } from '@/store';
import { getIsChildRoute } from '@/utils';

function NavBar({ pathname }: NavBarProps) {
  const Links = routes
    .filter((v) => v.args?.isMenu)
    .map((v) => {
      const path = v.path?.toString() || '';
      const activeClass = getIsChildRoute(path, pathname) ? style.active : undefined;
      if (path === '/publish') {
        return <div key={path}>publish</div>;
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
  return <div className={style.navBar}>{Links}</div>;
}

const mapStateToProps = (state: State) => ({
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(NavBar);

interface NavBarProps {
  pathname: string;
}
