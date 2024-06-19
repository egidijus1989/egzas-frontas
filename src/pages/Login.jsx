import { Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signInStart, signInSuccess } from "../redux/userSlice";
import * as authService from "../services/authService";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      return toast.error("Please fill in all fields");
    }
    dispatch(signInStart());
    try {
      const data = await authService.login(loginData);
      if (data.success) {
        dispatch(signInSuccess(data));
        navigate("/home");
        toast.success(data.message);
      }
      if (data.error) {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex rounded-lg overflow-hidden z-50 bg-gray-300">
        <div className="w-full bg-gray-100 min-w-80 sm:min-w-96 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-6 text-black text-center">
              Prisijungti
            </h1>
            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
              Sveikas, prisijunk su savo duomenimis
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="">
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Jūsų e-paštas" />
                </div>
                <TextInput
                  label="Email"
                  id="email"
                  name="email"
                  placeholder="jonaitis@gmail.com"
                  value={loginData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Jūsų slaptažodis" />
                </div>
                <TextInput
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  value={loginData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed
          "
                >
                  Prisijungti
                </Button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                {"Neturi"} paskirsties?{" "}
                <Link to="/signup" className="text-black hover:underline">
                  Prisiregistruoti
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;