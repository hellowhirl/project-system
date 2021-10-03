import React from "react";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useEmployees } from "../context/EmployeeProvider";
import { useUser } from "../context/UserProvider";

function EditEmployeePopUp(props) {
  let history = useHistory();
  let { id: currentId } = useParams();

  const { editVisible, setEditVisible } = useEmployees();
  const { setShowModal } = useUser();

  const handleClickEdit = () => {
    setEditVisible(true);
    setShowModal(true);
  };

  const togglePopEdit = () => {
    setEditVisible(false);
    setShowModal(false);
  };

  return (
    <div className="">
      <div className="">
        <Button
          variant="secondary"
          onClick={() => {
            history.push(`/employees/${props.id}`);
            handleClickEdit();
          }}
        >
          Edit
        </Button>
        {editVisible && parseInt(currentId) === props.id ? (
          <div className="modal-popup">
            <div className="close-box">
              <div className="close-circle">
                <div
                  className="close"
                  onClick={() => {
                    togglePopEdit();
                    history.push(`/employees`);
                  }}
                >
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

export default EditEmployeePopUp;
