import { connect, history, State } from 'umi';
import Icon from './Icon';
import { createUseStyles } from 'react-jss';

const TopNav: React.FC<TopNavProps> = ({ siteTitle }) => {
  const style = useStyles();
  return (
    <div className={style.topNav}>
      <Icon type="icon-left" className={style.icon} onClick={() => history.goBack()}></Icon>
      <span>{siteTitle}</span>
    </div>
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
