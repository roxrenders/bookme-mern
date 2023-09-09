import React, { useState } from "react";
import { Link, useNavigate, redirect } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function registerUser(ev) {
    ev.preventDefault();

    try {
      await axios.post("/register", { 
        name,
        email,
        password,
      });
      alert("registration succesful. now you can Login")
      navigate('/login'); 
    } catch (error) {
      alert("registration Failed.")
    }
  }

  return (
    <div className="mt-4 mb-20 grow flex items-center justify-around">
      <div className="mb-40 ">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto " onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Elon Musk"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Register</button>
        </form>
        <div className="text-center py-2 text-gray-500">
          Already a member?{" "}
          <Link className="underline text-gray-500 " to={"/login"}>
            {" "}
            Login{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

