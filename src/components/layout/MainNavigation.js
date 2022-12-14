import { NavLink } from "react-router-dom";
import styles from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Great Quote</div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink
              to="/quotes"
              className={(navData) => {
                return navData.isActive ? styles.active : "";
              }}
            >
              All Quotes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-quote"
              className={(navData) => {
                return navData.isActive ? styles.active : "";
              }}
            >
              Add Quote
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
