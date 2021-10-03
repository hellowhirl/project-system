import React from "react";
import ListOfEmployees from "./ListOfEmployees";
import CreateEmployee from "./CreateEmployee";
import ModalPopUp from "./util/ModalPopUp";
import Navigation from "./Navigation";
import { useUser } from "./context/UserProvider";

function Employees() {
  const { showModal } = useUser();

  return (
    <>
      <Navigation />
      <div className="container employees">
        <h1 className="text-center">Employees</h1>
        <ModalPopUp>
          <CreateEmployee />
        </ModalPopUp>
        <ListOfEmployees />
      </div>
      {showModal ? <div className="modal-overlay"></div> : null}
    </>
  );
}

export default Employees;
