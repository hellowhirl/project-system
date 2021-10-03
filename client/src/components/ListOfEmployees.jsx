import React from "react";
import { useEmployees } from "./context/EmployeeProvider";
import EditEmployee from "./EditEmployee";
import EditEmployeePopUp from "./util/EditEmployeePopUp";
import axios from "axios";
import { Button } from "react-bootstrap";

function ListOfEmployees() {
  const { listOfEmployees, setListOfEmployees } = useEmployees();

  const deleteEmployee = (_id) => {
    axios.delete(`http://localhost:3001/employees/${_id}`).then(() => {
      const employees = listOfEmployees.filter((emp) => emp.id !== _id);
      setListOfEmployees(employees);
    });
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Employee Id</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Position</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listOfEmployees.map((employee) => {
            return (
              <tr key={"emp_" + employee.id} className={"employeeList"}>
                <th scope="row">{employee.id}</th>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.position}</td>
                <td>
                  <EditEmployeePopUp id={employee.id}>
                    <EditEmployee />
                  </EditEmployeePopUp>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListOfEmployees;
