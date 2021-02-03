import routes from '@/router';
import style from './NavBar.module.less';
import Icon from './Icon';
import { connect } from 'react-redux';
import { State } from '@/store/reducer';
import { push } from 'connected-react-router';

function NavBar({ pathname }: NavBarProps) {
  console.log(pathname);

  const Links = routes
    .filter((v) => v.path !== '/')
    .map((v) => {
      const activeClass = v.path === pathname ? style.active : undefined;
      return (
        <div
          key={v.path as string}
          className={style.iconFather}
          onClick={() => push(v.path as string)}
        >
          <Icon type="icon-home" className={activeClass}></Icon>
          <a href={v.path as string} className={activeClass} onClick={(e) => e.preventDefault()}>
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
