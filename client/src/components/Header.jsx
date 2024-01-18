import { Link, NavLink } from "react-router-dom"
import logo from "../assets/react.svg"

const Header = () => {
  return (
    <div>
        <Link to="/" className="logo">
            <img src={logo} alt="ReactJs" /> ReactJs
        </Link>

        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav>
    </div>
  )
}

export default Header