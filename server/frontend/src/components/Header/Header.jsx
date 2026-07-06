import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Header = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: replace with your project's logout logic
    // e.g., clear token from localStorage/cookies then navigate
    // localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };
    
//The default home page items are the login details panel
let home_page_items =  <div></div>

  return (
    <header className="app-header">
      <div className="brand">
        <Link to="/">My Capstone</Link>
      </div>

      <nav className="header-nav">
        <Link to="/dealers">Dealers</Link>

        {isLoggedIn ? (
          <>
            <Link to="/profile">Profile</Link>
            <button className="header-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
