import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/signup", {
          email,
          password,
        })
        .then((res) => {
          if (res.data == "exist") {
            alert("User already exists");
          } else if (res.data == "notexist") {
            history("/", { state: { id: email } });
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login">
      <div className="Login bg-red-400 flex flex-col justify-center items-center h-screen">
        <div className="w-96 h-3/5 bg-black bg-opacity-50  rounded-md text-white flex flex-col justify-center items-center p-5">
          <h1 className="text-4xl font-bold mb-9">SignUp</h1>
          <form
            className="flex flex-col justify-center items-center text-black"
            action="POST"
          >
            <div className="form-control mt-5 p-3 w-full">
              <input
                className="w-full p-2 rounded-3xl"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
              />
            </div>
            <div className="form-control mt-5 p-3 w-full">
              <input
                className="w-full p-2 rounded-3xl"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              />
            </div>
            <div className="btn w-2/3 m-6 p-2 bg-green-300 rounded-3xl">
              <center><input type="submit" onClick={submit} /></center>
            </div>
            <p className="text mt-3">
              Already have an account?
              <Link to="/login" className="text-blue-300">
                &nbsp;LogIn
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
