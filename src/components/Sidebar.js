import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

// styles
import "./Sidebar.css";
import dashboardIcon from "../assets/dashboard_icon.svg";
import toDo from "../assets/todo.svg";
import activityIcon from "../assets/activity_icon.svg";

const Sidebar = () => {
  const { user } = useAuthContext();

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          {/* Avatar */}
          <p>{user.displayName}</p>
        </div>
        <nav className="links">
          <ul>
            {/* <li>
              <NavLink to="/">
                <img src={dashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/shipments">
                <img src={activityIcon} alt="dashboard icon" />
                <span>Spedizioni</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/todo">
                <img src={toDo} alt="todo icon" />
                <span>To Do</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
