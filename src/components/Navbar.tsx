import '../styles/NavBar.scss'

const Navbar = () => {
  return (
    <div className={'navbar'}>
      <nav>
        <ul className={'navbar-elements-links'}>
          <li className={'linkNav'}>Home</li>
          <li className={'linkNav'}>Connect</li>
          <li className={'linkNav'}>Contact</li>
        </ul>
      </nav>
    </div>
  )
}
export default Navbar
