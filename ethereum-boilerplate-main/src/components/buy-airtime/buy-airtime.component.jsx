import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom-v5-compat";
import { TransactionContext } from "components/contexts/transaction-context";
import { UserContext } from "components/contexts/auth-context";

const BuyAirtime = () => {
  const [optionsState, setOptionState] = useState({
    network: "Select a Network",
    amount: "Select Amount",
    number: "",
  });
  const [err, setErr] = useState("");
  const [total, setTotal] = useState(0);
  const {
    setData,
    setTAmount,
    coinPrice,
    nairaValue,
    setNetwork_id,
    setTransactionPurpose,
  } = useContext(TransactionContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setTotal((Number(optionsState.amount) / nairaValue / coinPrice).toFixed(7));
  }, [optionsState.amount]);

  const handleOption = (e) => {
    if (e.target.id === "network")
      setOptionState({ ...optionsState, network: e.target.value });
    if (e.target.id === "amount")
      setOptionState({ ...optionsState, amount: e.target.value });

    if (e.target.id === "number" && e.target.value.length < 12)
      setOptionState({ ...optionsState, number: e.target.value });
  };

  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      optionsState.network !== "Select a Network" &&
      optionsState.amount !== "Select Amount" &&
      optionsState.number !== ""
    ) {
      setNetwork_id(optionsState.network.toLowerCase());
      setTransactionPurpose("airtime");
      setData(optionsState);
      setTAmount(total);
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
          Select Network
        </label>
        <select
          onChange={handleOption}
          value={optionsState.network}
          required
          id="network"
          className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Select a Network</option>
          <option value="MTN">MTN</option>
          <option value="Airtel">Airtel</option>
          <option value="Glo">Glo</option>
          <option value="9Mobile">9Mobile</option>
        </select>

        <label
          htmlFor="small"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Select Amount
        </label>
        <select
          onChange={handleOption}
          value={optionsState.amount}
          required
          id="amount"
          className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Select Amount (Naira)</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
          <option value="2000">2000</option>
          <option value="5000">5000</option>
        </select>

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Type Phone Number
        </label>
        <input
          onChange={handleOption}
          value={optionsState.number}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="number"
          type="number"
          placeholder="Phone Number"
          required
        ></input>

        <p className="text-red-700 text-center text-lg absolute bottom-14">
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
                {Number(optionsState.amount)
                  ? (
                      Number(optionsState.amount) /
                      nairaValue /
                      coinPrice
                    ).toFixed(7)
                  : "0"}
              </span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default BuyAirtime;
