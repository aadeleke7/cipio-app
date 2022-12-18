import { useState } from "react";
import baseUrl from "api/base-url";
import { useLocation, useNavigate } from "react-router-dom-v5-compat";
import { validatePassword } from "components/auth/regex";
import Spinner from "components/spinner/spinner.component";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function MarchantForgotPassword() {
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [newErr, setNewErr] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [resetDone, setResetDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const query = useQuery();

  const handlePassword = (e) => {
    setPassword(e.target.value === "" ? "0" : e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value === "" ? "0" : e.target.value);
  };

  let navigate = useNavigate();

  const navigateToUserLogin = () => {
    navigate("/marchant-login", { replace: true });
  };

  const setNewPassword = async () => {
    setLoading(true);
    const token = query.get("verificationToken");
    const email = query.get("email");
    const sendData = await fetch(
      `${baseUrl()}/auth/update-marchant-password?email=${email}&password=${password}&verificationToken=${token}`,
    );
    if (!sendData.ok) {
      const errMessage = await sendData.json();
      setLoading(false);
      return setNewErr(errMessage.msg);
    }
    if (sendData.ok) {
      const successData = await sendData.json();
      setNewErr(null);
      setLoading(false);
      setResetDone(true);
      return setSuccessMessage(successData.msg);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== ConfirmPassword) {
      setNewErr("Your new and confirm password does not match");
      return;
    }
    if (!validatePassword.test(password)) {
      setNewErr(
        "Please provide a password with at least 8 characters with at least 1 uppercase letter, 1 lowercase letter and one special symbol",
      );
      return;
    }
    setNewErr(null);
    setNewPassword();
  };

  return (
    <div className="flex flex-col gap-8 bg-white p-10 pt-5 rounded-xl">
      <h1 className="text-lg text-center font-bold">
        Change password form for agents
      </h1>
      <div className="w-64 md:w-80">
        <form onSubmit={submitHandler}>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              New Password
            </label>
            <input
              onChange={handlePassword}
              className="shadow appearance-none border-b rounded w-64 md:w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              type="password"
              placeholder="New password"
              required
            ></input>
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Comfirm Password
            </label>
            <input
              onChange={handleConfirmPassword}
              className="shadow appearance-none border-b rounded w-64 md:w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
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
          {resetDone && (
            <div className="flex flex-col justify-center items-center">
              <p
                className="pl-4 cursor-pointer font-bold"
                onClick={navigateToUserLogin}
              >
                Click here to login
              </p>
            </div>
          )}
          {newErr && <p>{newErr}</p>}
          {successMessage && <p>{successMessage}</p>}
        </form>
      </div>
    </div>
  );
}
