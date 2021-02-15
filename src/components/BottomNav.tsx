import Icon from './Icon';
import { createPortal } from 'react-dom';
import { connect, history, State } from 'umi';
import { bottomNavMap, debounceFactory, getIsChildRoute } from '@/utils';
import { createUseStyles } from 'react-jss';

const BottomNav: React.FC<NavBarProps> = ({ pathname }) => {
  const styles = useStyles();
  const debounceFunc = debounceFactory(400);

  const Links = bottomNavMap.map((v) => {
    const path = v.path;
    const activeClass = getIsChildRoute(path, pathname) ? styles.active : undefined;
    const jump = () => {
      debounceFunc(() => {
        history.push(path);
      });
    };
    if (path === '/publish') {
      return (
        <div key={v.path} className={styles.publish} onClick={jump}>
          <div className={styles.wrapper}>
            <div className={styles.icon}>+</div>
          </div>
        </div>
      );
    }
    return (
      <div key={path} className={styles.iconFather} onClick={jump}>
        <Icon type={v.icon} className={activeClass}></Icon>
        <a href={path} className={activeClass} onClick={(e) => e.preventDefault()}>
          {v.title}
        </a>
      </div>
    );
  });
  return createPortal(
    <div className={styles.bottomNav} id="nav">
      {Links}
    </div>,
    document.querySelector('#root') as Element,
  );
};

const mapStateToProps = ({ index }: State) => ({
  pathname: index.routeHistory[index.routeHistory.length - 1].pathname,
});

export default connect(mapStateToProps)(BottomNav);

function useStyles() {
  return createUseStyles({
    bottomNav: {
      position: 'fixed',
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '2.66rem',
      width: '100%',
      backgroundColor: 'white',
      boxShadow: '1px 1px 10px 0 #ccc',
      zIndex: 10,
    },
    iconFather: {
      flex: 1,
      textAlign: 'center',
      flexDirection: 'column',
      display: 'flex',
      '& a': {
        fontSize: '0.42667rem',
        flex: 1,
        color: 'rgb(66, 64, 64)',
      },
      '& span': {
        fontSize: '0.96rem',
        flex: 1,
        color: 'rgb(66, 64, 64)',
      },
    },
    active: {
      color: 'gold !important',
    },
    wrapper: {
      width: '2.133rem',
      height: '2.133rem',
      borderRadius: '35%',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'gold',
      alignItems: 'center',
      border: '1px solid rgba(0, 0, 0, 0.007)',
    },
    icon: {
      color: 'white',
      fontSize: '1.7066rem',
      marginTop: '-0.4266rem',
    },
    publish: {
      flex: 1.2,
      display: 'flex',
      justifyContent: 'center',
    },
  })();
}

interface NavBarProps {
  pathname: string;
}
