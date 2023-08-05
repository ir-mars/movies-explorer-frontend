import { Link } from 'react-router-dom';
import './Logo.css';
import logo from '../../images/logo.svg'

function Logo () {
  return (
    <Link to="/" className="logo">
      <img
        className="logo__image"
        src={logo}
        alt="логотип в виде черного круга с белой иконкой"
      />
    </Link>
  )
}

export default Logo;