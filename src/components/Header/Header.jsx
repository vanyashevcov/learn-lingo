import { useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Header.module.css";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../hooks/useAuth";
import { handleLogout } from "../../utils/auth";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import Icon from "../Icons/Icon";

const Header = () => {
  const { user } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const buildActiveLink = ({ isActive }) => {
    return clsx(isActive && css.isActive);
  };

  const handleLogoutClick = () => {
    handleLogout();
  };

  const navigationItems = [
    { path: ROUTES.HOME, label: "Home" },
    { path: ROUTES.TEACHERS, label: "Teachers" },
    ...(user ? [{ path: ROUTES.FAVORITES, label: "Favorites" }] : [])
  ];

  return (
    <header>
      <div className={`${css.headerContainer} container`}>
        <div className={css.logoContainer}>
          <img src="/logo.png" alt="Logo" className={css.logo} />
          <h2 className={css.logoTitle}>LearnLingo</h2>
        </div>
        
        <nav className={css.navContainer}>
          {navigationItems.map(({ path, label }) => (
            <NavLink key={path} className={buildActiveLink} to={path}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className={css.buttonContainer}>
          {user ? (
            <button onClick={handleLogoutClick} className={`${css.logoutBtn} btn`}>
              Log out
            </button>
          ) : (
            <>
              <button
                onClick={() => setLoginOpen(true)}
                className={`${css.logInBtn} btn`}
              >
                <Icon 
                  name="log-in" 
                  width={20} 
                  height={20} 
                  fill="transparent" 
                  stroke="var(--color-primary)" 
                />
                Log in
              </button>
              <LoginModal
                isOpen={loginOpen}
                onRequestClose={() => setLoginOpen(false)}
              />

              <button
                onClick={() => setRegisterOpen(true)}
                className={`${css.registerBtn} btn`}
              >
                Registration
              </button>
              <RegisterModal
                isOpen={registerOpen}
                onRequestClose={() => setRegisterOpen(false)}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 