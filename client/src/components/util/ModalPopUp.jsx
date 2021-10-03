import { Button } from "react-bootstrap";
import React from "react";
import { useEmployees } from "../context/EmployeeProvider";
import { useUser } from "../context/UserProvider";

function ModalPopUp(props) {
  const { createEmployeePopUpVisibility, setEmployeePopUpVisibility } =
    useEmployees();
  const { setShowModal } = useUser();

  const handleClick = () => {
    setEmployeePopUpVisibility(true);
    setShowModal(true);
  };

  const togglePop = () => {
    setEmployeePopUpVisibility(false);
    setShowModal(false);
  };

  return (
    <div className="">
      <div className="">
        <div className="text-center pb-4">
          <Button onClick={handleClick}>Create New Employee</Button>
        </div>
        {createEmployeePopUpVisibility ? (
          <div className="modal-popup">
            <div className="close-box">
              <div className="close-circle">
                <div className="close" onClick={togglePop}>
                  &times;{" "}
                </div>
              </div>
            </div>
            {props.children}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ModalPopUp;
