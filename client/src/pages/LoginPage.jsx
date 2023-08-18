import React, { useContext, useState } from "react";
import { Link, Navigate } from 'react-router-dom'
import axios from "axios";
import { UserContext } from "../userContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();

    // ...
try {
      const userInfo = await axios.post("/login", {
       email,
       password,
  }); 
      if (userInfo.data && !userInfo.data.error) {
        setUser(userInfo.data);
        alert("Login successful.");
        setRedirect(true);
  } else {
        alert(userInfo.data.error || "Login Failed.");
  }
    } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login.");
    }
  } 

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-40'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
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
            autoComplete="current-password"
          />
          <button className='primary'>Login</button>
          
          <div className='text-center py-2 text-gray-700'>
            Don't have an account yet?{" "}
            <Link className="underline text-gray-00" to={'/register'}>
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
