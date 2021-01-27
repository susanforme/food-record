import { Link } from 'react-router-dom';
function NavBar() {
  return (
    <div style={{ fontSize: 22, marginTop: 20 }}>
      <Link to="/">Home</Link>
      <Link to="/distance">距离</Link>
      <Link to="/publish">publish</Link>
      <Link to="/message">msg</Link>
      <Link to="/me">me</Link>
    </div>
  );
}
export default NavBar;
