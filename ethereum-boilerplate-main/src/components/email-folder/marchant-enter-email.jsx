import { useState } from "react";
import baseUrl from "api/base-url";
import Spinner from "components/spinner/spinner.component";

export default function MarchantEnterEmail() {
  const [email, setEmail] = useState("");
  const [newErr, setNewErr] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value === "" ? "0" : e.target.value);
  };

  const sendEmail = async () => {
    setLoading(true);
    const sendData = await fetch(
      `${baseUrl()}/marchant-forgot-password?email=${email}`,
    );
    if (!sendData.ok) {
      const errMessage = await sendData.json();
      setLoading(false);
      return setNewErr(errMessage.response);
    }
    if (sendData.ok) {
      const successData = await sendData.json();
      setLoading(false);
      return setSuccessMessage(successData.msg);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    sendEmail();
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
              Email
            </label>
            <input
              onChange={handleEmail}
              className="shadow appearance-none border-b rounded w-64 md:w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              type="email"
              placeholder="Enter your email to reset password"
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
          {successMessage && <p>{successMessage}</p>}
        </form>
      </div>
    </div>
  );
}
