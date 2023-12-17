import './NavBar.scss';

const Navbar = () => {
  return (
    <nav>
      <img src={'/assets/bective-logo.png'} alt={'bective logo'} />
      <ul>
        <li>Home</li>
        <li>Connect</li>
        <li>About</li>
      </ul>
    </nav>
  );
};
export default Navbar;
