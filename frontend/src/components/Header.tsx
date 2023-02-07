import { Link, NavLink } from "react-router-dom";
import { useAuthentication } from "../AuthenticationProvider";
import "./Header.css";

const Header = () => {
  const result = useAuthentication();
  const authData = result?.authData;

  return (
    <header>
      <nav>
        <ul className="navbar">
          {authData?.name ? (
            <>
              <li>
                <NavLink to="/">Shopping List</NavLink>
              </li>
              <li>
                <NavLink to="/logout">Log out</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
