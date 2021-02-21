import { connect, history, State } from 'umi';
import Icon from './Icon';
import { createUseStyles } from 'react-jss';

const TopNav: React.FC<TopNavProps> = ({ siteTitle }) => {
  const style = useStyles();
  return (
    <>
      <div className={style.topNav}>
        <Icon type="icon-left" className={style.icon} onClick={() => history.goBack()}></Icon>
        <span>{siteTitle}</span>
      </div>
      <div className={style.topNavPosition}></div>
    </>
  );
};

const mapStateToProps = (state: State) => ({
  siteTitle: state.index.title,
});

export default connect(mapStateToProps)(TopNav);

function useStyles() {
  return createUseStyles({
    topNav: {
      height: '2.6666666666666665rem',
      backgroundColor: 'gold',
      display: 'flex',
      alignItems: 'center',
      position: 'fixed',
      justifyContent: 'center',
      top: 0,
      width: '100%',
      zIndex: 10,
      '& span': {
        color: 'white',
      },
    },
    topNavPosition: {
      height: '2.6666666666666665rem',
      width: '100%',
    },
    icon: {
      color: 'white',
      'font-size': '1.3333333333333333rem',
      'margin-left': '0.5333333333333333rem',
      position: 'absolute',
      left: 0,
    },
  })();
}
interface TopNavProps {
  siteTitle: string;
}
