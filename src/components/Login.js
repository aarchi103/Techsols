import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/", {
          email,
          password,
        })
        .then((res) => {
          if (res.data == "exist") {
            history("/home", { state: { id: email } });
          } else if (res.data == "notexist") {
            alert("User not found");
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
    <div className="Login bg-red-400 flex flex-col justify-center items-center h-screen">
      <div className="w-96 h-3/5 bg-black bg-opacity-50  rounded-md text-white flex flex-col justify-center items-center p-5">
        <h1 className="text-4xl font-bold mb-9">Log In</h1>
        <form
          className="flex flex-col justify-center items-center text-black"
          action="POST"
        >
          <div className="form-control  mt-5 p-3 w-full">
            <input
              type="email"
              className="w-full p-2 rounded-3xl"
              id="email"
              name="email"
              placeholder="Username"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="form-control mt-5 p-3 w-full">
            <input
              type="password"
              className="w-full p-2 rounded-3xl"
              id="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            onClick={submit}
            className="btn w-2/3 m-6 p-2 bg-green-300 rounded-3xl"
          >
            Submit
          </button>
          <p className="text mt-3">
            Don't have an account?
            <Link to="/signup" className="text-blue-300">
              &nbsp;Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
