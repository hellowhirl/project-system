import React, { useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useUser } from "./UserProvider";

const LoggedUserContext = React.createContext();
const localCurrentUserId = localStorage.getItem("currentUser");

export function useLoggedUser() {
  return useContext(LoggedUserContext);
}

export function LoggedUserProvider({ children }) {
  const [reviewsDue, setReviewsDue] = useState([]);

  const { currentUserId } = useUser();

  const fetchData = useCallback(() => {
    axios
      .get(
        `http://localhost:3001/employee-top/${
          currentUserId || localCurrentUserId
        }`
      )
      .then((response) => {
        setReviewsDue(response.data);
      });
  }, [currentUserId]);

  useEffect(() => {
    fetchData();
  }, [currentUserId]); // eslint-disable-line

  const store = {
    reviewsDue,
    setReviewsDue,
  };

  return (
    <LoggedUserContext.Provider value={store}>
      {children}
    </LoggedUserContext.Provider>
  );
}
