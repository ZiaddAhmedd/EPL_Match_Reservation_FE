import { Link, NavLink, useNavigate } from "react-router-dom";
import classes from "./sideBar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../store/userSlice";

function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = [
    {
      title: "Profile",
      link: "EditProfile",
    },
    {
      title: "Reservations",
      link: "ReserveTicket",
    },
    {
      title: "Matches",
      link: "information",
    },
  ];
  const user = useSelector((state) => state.user);
  const firstName = user.name.split(" ")[0];

  const logoutHandler = () => {
    dispatch(userActions.logout());
    navigate("/login");
  };

  return (
    <>
      <div className={classes.sideBarContainer}>
        <div className={classes.header}>
          <h3>Hi {firstName},</h3>
          <p>{user.email}</p>
        </div>
        <ul className={classes.nav}>
          {data.map((item, index) => (
            <li key={index}>
              <NavLink
                end
                to={item.link}
                className={({ isActive }) =>
                  `${classes.navLink} ${isActive ? classes.active : ""}`
                }
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SideBar;
