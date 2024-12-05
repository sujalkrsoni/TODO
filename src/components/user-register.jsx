import { useFormik } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import *  as yup from "yup";

export function UserRegister() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userId: "",
      userName: "",
      password: "",
      email: "",
      mobile: "",
    },
    onSubmit: (user) => {
      axios.post("http://127.0.0.1:7000/register-user", user);
      alert("register successfully");
      navigate("/login");
    },
  });
  return (
    <div
      className="d-flex justify-content-center"
      style={{ marginTop: "-150px" }}
    >
      <form
        className="bg-light text-start p-3 w-50 form-control "
        onSubmit={formik.handleSubmit}
      >
        <h3 className="text-center">User Register</h3>
        <dl>
          <dt>User id</dt>
          <dd>
            <input
              required="true"
              type="text"
              className="form-control"
              name="userId"
              onChange={formik.handleChange}
            />
          </dd>
          <dt>UserName</dt>
          <dd>
            <input
              required="true"
              type="text"
              className="form-control"
              name="userName"
              onChange={formik.handleChange}
            />
          </dd>
          <dt>Password</dt>
          <dd>
            <input
              required="true"
              type="text"
              className="form-control"
              name="password"
              onChange={formik.handleChange}
            />
          </dd>
          <dt>Mobile</dt>
          <dd>
            <input
              required="true"
              type="text"
              className="form-control"
              name="mobile"
              onChange={formik.handleChange}
            />
          </dd>
          <dt>Email</dt>
          <dd>
            <input
              required="true"
              type="text"
              className="form-control"
              name="email"
              onChange={formik.handleChange}
            />
          </dd>
          <button className="btn btn-warning w-100">Register</button>
          <Link className="m-1 mt-2" to="/login">
            Back
          </Link>
        </dl>
      </form>
    </div>
  );
}
