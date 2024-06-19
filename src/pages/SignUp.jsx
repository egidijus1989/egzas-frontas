import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as authService from "../services/authService";
import { Button, Label, TextInput } from "flowbite-react";

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!signUpData.email || !signUpData.password || !signUpData.name) {
      return toast.error("Please fill in all fields");
    }
    try {
      const res = await authService.signup(signUpData);
      toast.success(res.message);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex rounded-lg overflow-hidden z-50 bg-gray-300">
        <div className="w-full bg-gray-100 min-w-80 sm:min-w-96 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-6 text-black text-center">
              Prisiregistruoti
            </h1>
            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
              Skelbimu lenta
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="">
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Jūsų vardas" />
                </div>
                <TextInput
                  label="Full Name"
                  id="name"
                  name="name"
                  placeholder="jonas"
                  value={signUpData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Jūsų e-paštas" />
                </div>
                <TextInput
                  label="Email"
                  id="email"
                  name="email"
                  placeholder="jonaitis@gmail.com"
                  value={signUpData.email}
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
                  value={signUpData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Prisiregistruoti
                </Button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                Jau turi paskirti?{" "}
                <Link to="/" className="text-black hover:underline">
                  Prisijungti
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;