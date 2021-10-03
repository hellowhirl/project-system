import React, { useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const EmployeeContext = React.createContext();

export function useEmployees() {
  return useContext(EmployeeContext);
}

export function EmployeeProvider({ children }) {
  const [listOfEmployees, setListOfEmployees] = useState([]);
  const [createEmployeePopUpVisibility, setEmployeePopUpVisibility] =
    useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const fetchData = useCallback(() => {
    axios.get("http://localhost:3001/employees").then((response) => {
      setListOfEmployees(response.data);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line

  const store = {
    listOfEmployees,
    setListOfEmployees,
    createEmployeePopUpVisibility,
    setEmployeePopUpVisibility,
    editVisible,
    setEditVisible,
  };

  return (
    <EmployeeContext.Provider value={store}>
      {children}
    </EmployeeContext.Provider>
  );
}
