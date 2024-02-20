import { useEffect, useRef, useState } from "react";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";
import { login } from "../../services/auth.service";

const FormLogin = () => {
  const [statusErr, setStatusErr] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    login(data, (status, res) => {
      if (status) {
        localStorage.setItem("token", res);
        window.location.href = "/products";
      } else {
        setStatusErr(res.response.data);
      }
    });
  };

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleLogin}>
      <InputForm
        label="Username"
        htmlFor="username"
        placeholder="John Doe"
        type="text"
        name="username"
        ref={usernameRef}
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

      {statusErr && (
        <p className="text-red-500 text-center mt-5">{statusErr}</p>
      )}
    </form>
  );
};

export default FormLogin;
