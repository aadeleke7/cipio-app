import { useReducer, useState, useContext } from "react";
import baseUrl from "api/base-url";
import { useNavigate } from "react-router-dom-v5-compat";
import { UserContext } from "components/contexts/auth-context";
import Spinner from "components/spinner/spinner.component";

const initialState = {
  email: "",
  password: "",
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "email":
      return { ...state, email: payload };
    case "password":
      return { ...state, password: payload };
    default:
      throw new Error();
  }
};

export default function AdminLogin() {
  const { setUser } = useContext(UserContext);
  const [newErr, setNewErr] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const navigateToDashboard = () => {
    navigate("/dashboard", { replace: true });
  };

  const handleSignUp = (e) => {
    dispatch({ type: e.target.name, payload: e.target.value });
  };

  const { email, password } = state;

  const signUpBody = {
    email,
    password,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signUpBody),
  };

  const signInUser = async () => {
    setLoading(true);
    const userData = await fetch(`${baseUrl()}/auth/login-admin`, options);
    if (!userData.ok) {
      return userData.ok;
    }
    const user = await userData.json();
    window.localStorage.setItem("user", JSON.stringify(user));
    const localStorageUserData = window.localStorage.getItem("user");
    setUser(JSON.parse(localStorageUserData));
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await signInUser();
    if (result === false) {
      setLoading(false);
      setNewErr("Wrong Username or Password. Please try again");
      return;
    }
    if (result === true) {
      setNewErr(null);
      signInUser();
      setLoading(false);
      navigateToDashboard();
      return;
    }
  };

  return (
    <div className="flex flex-col gap-8 bg-white p-10 pt-5 rounded-xl">
      <h1 className="text-lg text-center font-bold">Login Form for Admins</h1>
      <div className="w-64 md:w-80">
        <form onSubmit={submitHandler}>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              onChange={handleSignUp}
              className="shadow appearance-none border-b rounded w-64 md:w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              type="email"
              placeholder="Email"
              required
            ></input>
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              onChange={handleSignUp}
              className="shadow appearance-none border-b rounded w-64 md:w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              type="password"
              placeholder="Password"
              required
            ></input>
          </div>
          <div className="flex gap-8 items-center">
            <div>
              <input
                className="mt-4 w-20 h-10 border font-bold text-white bg-zinc-700 rounded-lg transition-all duration-500 hover:text-black hover:bg-white"
                type="submit"
                disabled={loading && true}
              />
            </div>
            <div className="pt-4">{loading && <Spinner />}</div>
          </div>
          {newErr && <p className="text-red-400 text-center">{newErr}</p>}
        </form>
      </div>
    </div>
  );
}
