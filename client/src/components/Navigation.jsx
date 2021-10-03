import React, { useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUser } from "./context/UserProvider";

export default function Navigation() {
  const { currentUser, setCurrentUser } = useUser();

  useEffect(() => {
    setCurrentUser(localStorage.getItem("currentUser"));
  }, []); // eslint-disable-line

  const cleanUp = () => {
    setCurrentUser(null);
  };

  return (
    <div className="container">
      <Navbar>
        {currentUser === "admin" ? (
          <div className="nav-link">
            <Link to="/admin">Admin Home</Link>
          </div>
        ) : null}

        <div className="nav-link">
          <Link onClick={cleanUp} to="/login">
            Logout
          </Link>
        </div>
        <div className="greeting">
          Welcome{" "}
          <span>
            {localStorage.getItem("userFirstName")
              ? localStorage.getItem("userFirstName")
              : "Admin"}
          </span>{" "}
          !
        </div>
      </Navbar>
    </div>
  );
}
