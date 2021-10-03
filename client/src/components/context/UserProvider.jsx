import React, { useContext, useState } from "react";

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const store = {
    currentUser,
    setCurrentUser,
    showModal,
    setShowModal,
  };

  return <UserContext.Provider value={store}>{children}</UserContext.Provider>;
}
