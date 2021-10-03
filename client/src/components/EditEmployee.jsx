import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as yup from "yup";
import { useEmployees } from "./context/EmployeeProvider";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useUser } from "./context/UserProvider";

function EditEmployee() {
  let history = useHistory();
  const { listOfEmployees, setEditVisible, setListOfEmployees } =
    useEmployees();
  const { setShowModal } = useUser();
  let { id: currentId } = useParams();

  const formValues = listOfEmployees.filter((emp) => {
    return emp.id === parseInt(currentId);
  });

  const validationSchema = yup.object().shape({
    first_name: yup.string().required("You must input a First Name"),
    last_name: yup.string().required("You must input a Last Name"),
    position: yup.string().min(3).max(24).required("You must input a Position"),
  });

  const onSubmit = (data) => {
    axios
      .put(`http://localhost:3001/employees/${data.id}`, data)
      .then((response) => {
        const objIndex = listOfEmployees.findIndex((obj) => obj.id === data.id);
        listOfEmployees[objIndex] = data;

        setListOfEmployees([...listOfEmployees]);
        setEditVisible(false);
        setShowModal(false);

        history.push(`/employees`);
      });
  };

  return (
    <div className="inner-modal-popup">
      <h3 className="text-center">Edit Employ</h3>
      <div className="inputs-container text-center">
        <Formik
          initialValues={formValues[0]}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form>
            <label>First Name:</label>
            <ErrorMessage name="first_name" component="span" />
            <div>
              <Field
                id="inputCreateEmployee"
                name="first_name"
                placeholder="Ex: Taro"
              />
            </div>
            <label>Last Name:</label>
            <ErrorMessage name="last_name" component="span" />
            <div>
              <Field
                id="inputCreateEmployee"
                name="last_name"
                placeholder="Ex: Sato"
              />
            </div>
            <label>Position:</label>
            <ErrorMessage name="position" component="span" />
            <div>
              <Field
                id="inputCreateEmployee"
                name="position"
                placeholder="Ex: Worker"
              />
            </div>
            <Button type="submit">Save</Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default EditEmployee;
