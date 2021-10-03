import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

function AdminHome() {
  return (
    <>
      <Navigation />
      <div className="container admin">
        <h1 className="text-center">Admin Dashboard</h1>
        <div className="icons-container">
          <div className="nav-container employees-container">
            <div class="text-center">
              <Link to="/employees">
                <button type="submit" class="btn btn-primary">
                  Employee Management
                </button>
              </Link>
            </div>
          </div>
          <div className="nav-container reviews-container">
            <div class="text-center">
              <Link to="/reviews">
                <button type="submit" class="btn btn-primary">
                  Performance Reviews
                </button>
              </Link>
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
