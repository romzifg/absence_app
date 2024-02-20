import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthLayouts from "../Layouts/AuthLayout";
import InputForm from "../components/Elements/Input";
import Button from "../components/Elements/Button/Button";
import { setToken } from "../helpers/SetGetToken";
import { toast, ToastContainer } from "react-toastify";

const Auth = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const payload = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, payload, {
        headers: { Authorization: import.meta.env.VITE_API_TOKEN },
      })
      .then((res) => {
        setToken(res.data.data);
        navigate("/report");
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
        });
      });
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <AuthLayouts
      title="Login"
      subtitle="Welcome To Absence App, Plase Login for Manage User"
    >
      <form onSubmit={handleLogin}>
        <InputForm
          label="Email"
          htmlFor="email"
          placeholder="johnDoe@mail.com"
          type="text"
          name="email"
          ref={emailRef}
        />
        <InputForm
          label="Password"
          htmlFor="password"
          placeholder="********"
          type="password"
          name="password"
        />
        <Button classname="bg-blue-600 w-full" type="submit">
          Login
        </Button>
      </form>
      <ToastContainer />
    </AuthLayouts>
  );
};

export default Auth;
