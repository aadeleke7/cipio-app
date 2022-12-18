import { useState, useContext } from "react";
import { UserContext } from "components/contexts/auth-context";
import { useNavigate } from "react-router-dom-v5-compat";
import baseUrl from "api/base-url";
import Spinner from "components/spinner/spinner.component";

export default function MarchantTransfers() {
  const [amount, setAmount] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");
  const [errMessage, setErrMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { user, setUserStateChanged, userStateChanged } =
    useContext(UserContext);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate("/dashboard", { replace: true });
  };

  const amountBody = {
    amount: +amount,
  };

  const creditOptions = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(amountBody),
  };

  const fetchLink = `${baseUrl()}/transactions/transfer-marchant-fund?passcode=D*G-KaPdSgVkYp3s6v9y/B?E(HMbQeT&marchantId=${
    user.id
  }&walletAddress=${walletAddress}`;

  const handleAmount = (e) => {
    setAmount(e.target.value === "" ? "0" : e.target.value);
  };

  const handleWalletAddress = (e) => {
    setWalletAddress(e.target.value === "" ? "" : e.target.value);
  };

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (+amount < 0) {
      setErrMessage("Please input a positive value");
      return;
    }
    const isTransactionSuccessful = await fetch(fetchLink, creditOptions);
    if (!isTransactionSuccessful) {
      setLoading(false);
      setErrMessage("Transaction was successful. Please try again");
      return;
    }
    setErrMessage(null);
    setSuccessMessage(`Your transfer of ${amount} Naira was successfull`);
    setTimeout(() => {
      setLoading(false);
      setUserStateChanged(userStateChanged === true ? false : true);
      navigateToDashboard();
    }, 3000);
  };

  return (
    <div className="p-5 absolute left-10 top-28 md:left-80 bg-zinc-300 rounded-lg shadow-xl">
      <div className="w-64 md:w-80">
        <form onSubmit={submitHandler}>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Receiving Wallet Address
            </label>
            <input
              onChange={handleWalletAddress}
              className="shadow appearance-none border-b rounded w-64 md:w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="walletAddress"
              type="text"
              placeholder="Receiving Wallet Address"
              required
            ></input>
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Amount to Send
            </label>
            <input
              onChange={handleAmount}
              className="shadow appearance-none border-b rounded w-64 md:w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="amount"
              type="number"
              placeholder="Amount to Send"
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
          {errMessage && <p>{errMessage}</p>}
          {successMessage && <p>{successMessage}</p>}
        </form>
      </div>
    </div>
  );
}
