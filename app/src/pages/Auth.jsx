import { useEffect, useRef } from "react";
import { useMutation } from "react-query";
import AuthLayouts from "../layouts/AuthLayout";
import InputForm from "../components/Elements/Input";
import Button from "../components/Elements/Button/Button";
import { toast, ToastContainer } from "react-toastify";
import { AuthLogin } from "../fetching/Auth/Auth";
import { setToken } from "../helpers/SetGetToken";

const Auth = () => {
  const emailRef = useRef(null);

  const { mutate: mutateLogin, isLoading: isLoadingLogin } = useMutation(
    AuthLogin,
    {
      onSuccess: (res) => {
        toast.success("Authenticate", {
          position: "top-center",
        });
        setToken(res.data.data);

        setTimeout(() => {
          window.location = "/";
        }, 300);
      },
      onError: (err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
        });
      },
    }
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    mutateLogin(payload);
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
        <Button
          classname={`${
            isLoadingLogin ? "bg-gray-600 " : "bg-blue-600 "
          }w-full`}
          type={`${isLoadingLogin ? "none" : "submit"}`}
        >
          Login
        </Button>
      </form>
      <ToastContainer />
    </AuthLayouts>
  );
};

export default Auth;
