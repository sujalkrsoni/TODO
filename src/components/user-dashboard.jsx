import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import * as bootstrap from "bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";

export function UserDashBoard() {
  const [appId, setAppId] = useState();
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies();
  const [Appointments, setAppointments] = useState([
    { appointment_id: "", title: "", description: "", Date: "" },
  ]);
  const [editTask, setEditTask] = useState([
    { appointment_id: "", title: "", description: "", Date: "" },
  ]);

  function HandleDeleteClick(id) {
    axios.delete(`http://127.0.0.1:7000/delete-task/${id}`).then(() => {
      alert("Successfully Deleted!");
    });
    window.location.reload(); // Reloads the page to update the appointment list
  }

  const formik = useFormik({
    initialValues: {
      appointment_id: 0,
      title: "",
      description: "",
      Date: "",
      userId: cookies["userId"],
    },
    validationSchema: yup.object({
      appointment_id: yup
        .number()
        .typeError("Must be a number")
        .required("Id Required"),
      title: yup.string().required("Title must be required"),
    }),
    onSubmit: (task) => {
      axios.post("http://127.0.0.1:7000/add-task", task);
      alert("Task added!");
      window.location.reload();
    },
  });

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:7000/appointments/${cookies["userId"]}`)
      .then((res) => {
        setAppointments(res.data);
      });
  }, []);

  function HandleSingOut() {
    removeCookies("userId");
    navigate("/login");
    window.location.reload();
  }

  function HandleEditClick(id) {
    axios.get(`http://127.0.0.1:7000/get-task/${id}`).then((res) => {
      setEditTask(res.data);
    });
  }
  function HandleGetId(id) {
    setAppId(id);
  }
  const editFormik = useFormik({
    initialValues: {
      appointment_id: editTask[0].appointment_id,
      title: editTask[0].title,
      description: editTask[0].description,
      Date: editTask[0].Date,
      userId: cookies["userId"],
    },
    enableReinitialize: true,
    onSubmit: (task) => {
      axios.put(`http://127.0.0.1:7000/edit-task/${appId}`, task).then(() => {
        alert("successfully modified");
        window.location.reload();
      });
    },
  });

  return (
    <div className="mt-4" style={{ minHeight: "100vh" }}>
      <div className="position-relative ">
        <span className="h1">Your Appointments</span>
        <i
          className="bi bi-box-arrow-right position-absolute me-3 mt-3 end-0"
          onClick={HandleSingOut}
        ></i>
        <span
          className="position-absolute end-0 top-0 me-2"
          style={{ fontSize: "11px" }}
        >
          {cookies["userId"]}
        </span>
      </div>
      <span className="d-flex align-items-start ms-5">
        <button
          data-bs-target="#addTask"
          data-bs-toggle="modal"
          className="bi bi-calendar-check btn btn-success ms-4 mt-4"
        >
          {" "}
          Add Appointment
        </button>
        <div className="modal modal-fade" id="addTask">
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content text-start">
              <div className="modal-header">
                <h4>Add Appointments</h4>
                <Button
                  data-bs-dismiss="modal"
                  className="btn btn-close"
                ></Button>
              </div>
              <div className="modal-body">
                <form onSubmit={formik.handleSubmit}>
                  <dl>
                    <dd>
                      <TextField
                        onChange={formik.handleChange}
                        name="appointment_id"
                        label="Appointment Id"
                        variant="standard"
                      ></TextField>
                    </dd>
                    <dd className="text-danger">
                      {formik.errors.appointment_id}
                    </dd>
                    <dd>
                      <TextField
                        onChange={formik.handleChange}
                        name="title"
                        label="Title"
                        variant="standard"
                      ></TextField>
                    </dd>
                    <dd className="text-danger">{formik.errors.title}</dd>
                    <dd>
                      <textarea
                        onChange={formik.handleChange}
                        name="description"
                        placeholder="Description"
                        rows="3"
                        cols={24}
                      ></textarea>
                    </dd>
                    <dd>
                      <input
                        onChange={formik.handleChange}
                        name="Date"
                        type="date"
                      ></input>
                    </dd>
                    <Button type="submit" variant="contained" color="success">
                      Submit
                    </Button>
                  </dl>
                </form>
              </div>
            </div>
          </div>
        </div>
      </span>
      <div className="d-flex flex-column align-items-center justify-content-center mt-3">
        {Appointments.map((appointment) => (
          <div
            key={appointment.appointment_id}
            className="alert alert-success alert-dismissible text-start w-75 "
          >
            <button
              onClick={() => HandleDeleteClick(appointment.appointment_id)}
              className="btn btn-close"
              data-bs-dismiss="alert"
            ></button>
            <h4>{appointment.title}</h4>
            <span
              style={{ backgroundColor: "lightPink" }}
              className=" p-1 rounded ps-2 pe-2 "
            >
              {appointment.description}
            </span>{" "}
            <br />
            <p className="mt-1">
              {new Date(appointment.Date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <button
              data-bs-target="#editTask"
              data-bs-toggle="modal"
              className="btn btn-warning bi bi-pen-fill"
              onClick={() => HandleGetId(appointment.appointment_id)}
            >
              Edit
            </button>
            <span className="ms-2">
              Appointment id : {appointment.appointment_id}
            </span>
            <div className="modal modal-fade" id="editTask">
              <div className="modal-dialog modal-dialog-centered modal-sm">
                <div className="modal-content text-start">
                  <div className="modal-header">
                    <h4>Add Appointments</h4>
                    <Button
                      data-bs-dismiss="modal"
                      className="btn btn-close pt-5 mt-1"
                    ></Button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={editFormik.handleSubmit}>
                      <dl>
                        <dd>
                          <TextField
                            onChange={editFormik.handleChange}
                            name="appointment_id"
                            label="Appointment Id"
                            variant="standard"
                          ></TextField>
                        </dd>
                        <dd>
                          <TextField
                            onChange={editFormik.handleChange}
                            name="title"
                            label="Title"
                            variant="standard"
                          ></TextField>
                        </dd>
                        <dd>
                          <textarea
                            onChange={editFormik.handleChange}
                            name="description"
                            placeholder="Description"
                            rows="3"
                            cols={24}
                          ></textarea>
                        </dd>
                        <dd>
                          <input
                            onChange={editFormik.handleChange}
                            name="Date"
                            type="date"
                          ></input>
                        </dd>
                        <Button
                          onClick={() =>
                            HandleEditClick(appointment.appointment_id)
                          }
                          type="submit"
                          variant="contained"
                          color="success"
                        >
                          Save
                        </Button>
                      </dl>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
