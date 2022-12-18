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

export default function MarchantLogin() {
  const { setUser } = useContext(UserContext);
  const [newErr, setNewErr] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate("/", { replace: true });
  };

  const navigateToUserLogin = () => {
    navigate("/", { replace: true });
  };

  const navigateToMarchantSignUp = () => {
    navigate("/marchant-sign-up", { replace: true });
  };

  const navigateToUserSignUp = () => {
    navigate("/sign-up", { replace: true });
  };

  const navigateToForgotPassword = () => {
    navigate("/marchant-enter-email", { replace: true });
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
    const userData = await fetch(`${baseUrl()}/auth/login-marchant`, options);
    if (!userData.ok) {
      const result = await userData.json();
      const status = userData.ok;
      const message = result.msg;
      return { status, message };
    }
    const user = await userData.json();
    if (!user.approved) {
      return "not approved";
    }
    if (user.approved) {
      window.localStorage.setItem("user", JSON.stringify(user));
      const localStorageUserData = window.localStorage.getItem("user");
      setUser(JSON.parse(localStorageUserData));

      return true;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await signInUser();
    if (result.status === false) {
      setLoading(false);
      setNewErr(result.message);
      return;
    }
    if (result === "not approved") {
      setLoading(false);
      setNewErr(
        "You've not been approved as a marchant yet. Please try again later",
      );
      return;
    }
    if (result === true) {
      setNewErr(null);
      setLoading(false);
      navigateToDashboard();
      return;
    }
  };

  return (
    <div className="bg-blue-500 w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-8 bg-white p-10 pt-5 rounded-xl w-96">
        <h1 className="text-lg text-center font-bold">
          Login Form for Marchants
        </h1>
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
            {newErr && <p>{newErr}</p>}
            <div className="flex flex-col justify-center items-center gap-4 pt-8">
              <div className="flex flex-col justify-center items-center">
                <p>Don't have an account?</p>
                <p
                  className="pl-4 cursor-pointer font-bold"
                  onClick={navigateToMarchantSignUp}
                >
                  Sign up as Marchant
                </p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p>Forgot password?</p>
                <p
                  className="pl-4 cursor-pointer font-bold"
                  onClick={navigateToForgotPassword}
                >
                  Reset Password
                </p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p>Want to login as a user?</p>
                <p
                  className="pl-4 cursor-pointer font-bold"
                  onClick={navigateToUserLogin}
                >
                  Login as a User
                </p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p>Want to register as a user?</p>
                <p
                  className="pl-4 cursor-pointer font-bold"
                  onClick={navigateToUserSignUp}
                >
                  Register as a User
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
