import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

//styles and images
import "./Navbar.css";
import Logo from "../assets/logo.svg";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Logo} alt="dojo logo" />
          <span>Athesis console</span>
        </li>
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            {/* <li>
              <Link to="/signup">Signup</Link>
            </li> */}
          </>
        )}
        {user && (
          <li>
            <button className="btn" onClick={logout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
