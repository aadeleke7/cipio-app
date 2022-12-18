import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom-v5-compat";
import { TransactionContext } from "components/contexts/transaction-context";
import { UserContext } from "components/contexts/auth-context";

const Betting = () => {
  const [optionsState, setOptionState] = useState({
    name: "",
    iD: "",
    amount: "",
  });
  const [err, setErr] = useState("");
  const { setData, setTAmount, coinPrice, nairaValue, setTransactionPurpose } =
    useContext(TransactionContext);
  const { user } = useContext(UserContext);

  const handleOption = (e) => {
    if (e.target.id === "name") {
      console.log(e);
      setOptionState({ ...optionsState, name: e.target.value });
    }

    if (e.target.id === "id")
      setOptionState({ ...optionsState, iD: e.target.value });

    if (e.target.id === "number")
      setOptionState({ ...optionsState, amount: e.target.value });
  };

  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      optionsState.name !== "" &&
      optionsState.iD !== "" &&
      optionsState.amount !== ""
    ) {
      setTransactionPurpose("betting");
      setData(optionsState);
      setTAmount(
        (Number(optionsState.amount) / nairaValue / coinPrice).toFixed(7),
      );
      navigate("/confirmation-page", { replace: true });
    } else {
      setErr("Please fill up all the feilds");
    }
  };

  return (
    <div className="w-screen md:w-160 h-110 p-5 absolute left-0 top-28 md:left-80 bg-zinc-300 rounded-lg shadow-xl">
      <form className="relative">
        <label
          htmlFor="small"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Select Betting Provider
        </label>
        <select
          onChange={handleOption}
          value={optionsState.name}
          required
          id="name"
          className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Choose Betting Provider</option>
          <option value="1xBet">1xBet</option>
          <option value="BangBet">BangBet</option>
          <option value="Bet9ja">Bet9ja</option>
          <option value="BetKing">BetKing</option>
          <option value="BetLand">BetLand</option>
          <option value="BetLion">BetLion</option>
          <option value="BetWay">BetWay</option>
          <option value="CloudBet">CloudBet</option>
          <option value="LiveScoreBet">LiveScoreBet</option>
          <option value="MerryBet">MerryBet</option>
          <option value="NaijaBet">NaijaBet</option>
          <option value="NairaBet">NairaBet</option>
          <option value="SuperBet">SuperBet</option>
        </select>

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Customer ID
        </label>
        <input
          onChange={handleOption}
          value={optionsState.iD}
          className="shadow appearance-none mb-6 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="id"
          type="number"
          placeholder="Enter Customer (account) ID"
          required
        ></input>

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Amount (₦)
        </label>
        <input
          onChange={handleOption}
          value={optionsState.amount}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="number"
          type="number"
          placeholder="Amount"
          required
        ></input>

        <p className="text-red-700 text-lg text-center absolute bottom-14">
          {err}
        </p>

        <div className="mt-14 flex items-center gap-48">
          <button
            onClick={submitHandler}
            className="w-24 bg-blue-500 h-10 rounded-2xl text-white hover:bg-blue-700"
          >
            Submit
          </button>
          {user.role === "User" && (
            <div>
              <span>Total Amount in CIPIO: </span>
              <span>
                {(Number(optionsState.amount) / nairaValue / coinPrice).toFixed(
                  7,
                )}
              </span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Betting;
