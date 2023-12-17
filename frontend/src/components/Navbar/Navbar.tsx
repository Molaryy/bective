import './NavBar.scss';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [menuWidth, setMenuWidth] = useState('0');

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    setMenuWidth(menuWidth === '0' ? '100%' : '0');
  };

  return (
    <nav>
      <img src={'/assets/bective-logo.png'} alt={'bective logo'} className={'bective-logo'} />
      <img
        src={'/assets/menu.png'}
        className={'toggle-button'}
        alt={'toggle-menu'}
        onClick={toggleMenu}
      />
      <ul
        className={isMenuOpen ? 'menu-open' : ''}
        style={{
          width: menuWidth,
        }}
      >
        <li>Home</li>
        <li>Connect</li>
        <li>About</li>
      </ul>
    </nav>
  );
};
export default Navbar;
