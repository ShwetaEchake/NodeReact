import { NavLink, Outlet } from "react-router-dom";
import { FaUser,FaRegListAlt,FaHome } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";



export const AdminLayout = () => {
  return <>
  <header>
    <div className="container">
        <nav>
            <ul>
                <li> <NavLink to="/admin/users"><FaUser /> Users </NavLink></li>
                <li> <NavLink to="/admin/contacts"><FaMessage /> Contacts </NavLink></li>
                <li> <NavLink to="/admin/services"><FaRegListAlt /> Services </NavLink></li>
                <li> <NavLink to="/admin/home"><FaHome /> Home </NavLink></li>
            </ul>
        </nav>
    </div>
  </header>
  <Outlet/>
  </>
};

