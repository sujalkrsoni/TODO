import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export function UserLogin() {
  const [users, setUsers] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [cookies, setCookies, removeCookies] = useCookies("userId");

  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://127.0.0.1:7000/users").then((res) => {
      setUsers(res.data);
    });
  }, []);
  const formik = useFormik({
    initialValues: {
      userId: "",
      password: "",
    },
    onSubmit: (formdata) => {
      let userDetails = users.find((user) => user.userId === formdata.userId);
      if (userDetails && userDetails.password === formdata.password) {
        setCookies("userId", formdata.userId);
        navigate("/dashboard");
        window.location.reload();
      } else {
        setErrMsg("Invaild userId or Password");
        // navigate('/register')
      }
      alert("Successfully Login !");
    },
  });

  return (
    <div className="text-center d-flex justify-content-center">
      <form
        className="bg-light p-3 m-2 w-50 rounded"
        onSubmit={formik.handleSubmit}
      >
        <h2>User Login</h2>
        <dl>
          <dd>
            <TextField
              required="true"
              label="Username"
              name="userId"
              onChange={formik.handleChange}
              variant="standard"
            ></TextField>
          </dd>
          <dd>
            <TextField
              required="true"
              label="Password"
              name="password"
              onChange={formik.handleChange}
              variant="standard"
            ></TextField>
            <p className="text-danger">{errMsg}</p>
          </dd>
          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </dl>
      </form>
    </div>
  );
}
