import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom-v5-compat";
import { TransactionContext } from "components/contexts/transaction-context";
import { changeToMoneyFormat } from "components/tv-subscription-page/tv-subscription-page.component";
import { UserContext } from "components/contexts/auth-context";

const BuyData = () => {
  const [optionsState, setOptionState] = useState({
    network: "",
    amount: "",
    plan: "Choose Plan",
    number: "",
    v_id: "",
  });
  const [err, setErr] = useState("");
  const {
    setData,
    setTAmount,
    coinPrice,
    nairaValue,
    setNetwork_id,
    setTransactionPurpose,
  } = useContext(TransactionContext);
  const { user } = useContext(UserContext);

  const handleOption = (e) => {
    if (e.target.id === "network")
      setOptionState({
        ...optionsState,
        plan: "Choose Plan",
        network: e.target.value,
      });

    if (e.target.id === "plan") {
      setOptionState({
        ...optionsState,
        plan: e.target.value.split(",")[0],
        amount: e.target.value.split(",")[1],
        v_id: e.target.value.split(",")[2],
      });
    }
    if (e.target.id === "number" && e.target.value.length < 12)
      setOptionState({ ...optionsState, number: e.target.value });
  };

  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      optionsState.network !== "" &&
      optionsState.plan !== "Choose Plan" &&
      optionsState.network !== ""
    ) {
      setNetwork_id(optionsState.network.toLowerCase());
      setTransactionPurpose("data");
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
          Select Network
        </label>
        <select
          onChange={handleOption}
          value={optionsState.network}
          required
          id="network"
          className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Choose Network</option>
          <option value="MTN">MTN</option>
          <option value="Airtel">Airtel</option>
          <option value="Glo">Glo</option>
          <option value="9Mobile">9Mobile</option>
        </select>

        <label
          htmlFor="small"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Select Plan
        </label>

        <select
          onChange={handleOption}
          value={optionsState.amount}
          required
          id="plan"
          className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>{optionsState.plan}</option>
          <option
            value={
              optionsState.network === "MTN"
                ? "500MB 30 Days,159,500"
                : optionsState.network === "Airtel"
                ? "1GB 1 Day,299,airt-300x"
                : optionsState.network === "Glo"
                ? "1.25GB 1 Day(Sunday),198,glo200x"
                : "1GB 30 Days,989,9MOB1000"
            }
          >
            {optionsState.network === "MTN"
              ? "500MB - 30 Days"
              : optionsState.network === "Airtel"
              ? "1GB - 1 Day"
              : optionsState.network === "Glo"
              ? "1.25GB - 1 Day(Sunday)"
              : "1GB - 30 Days"}
          </option>
          <option
            value={
              optionsState.network === "MTN"
                ? "1GB 30 Days,289,M1024"
                : optionsState.network === "Airtel"
                ? "2GB - 2 Days,499,airt-500x"
                : optionsState.network === "Glo"
                ? "1GB 5 Nights,99,glo100x"
                : "2.5GB - 30 Days,1989,9MOB34500"
            }
          >
            {optionsState.network === "MTN"
              ? "1GB - 30 Days"
              : optionsState.network === "Airtel"
              ? "2GB - 2 Days"
              : optionsState.network === "Glo"
              ? "1GB - 5 Nights"
              : "2.5GB - 30 Days"}
          </option>
          <option
            value={
              optionsState.network === "MTN"
                ? "2GB - 30 Days,579,M2024"
                : optionsState.network === "Airtel"
                ? "6GB 7 Days,1489,airt-1500-2"
                : optionsState.network === "Glo"
                ? "1.35GB - 14 Days,489,G500"
                : "11.5GB - 30 Days,7969,9MOB8000"
            }
          >
            {optionsState.network === "MTN"
              ? "2GB - 30 Days"
              : optionsState.network === "Airtel"
              ? "6GB - 7 Days"
              : optionsState.network === "Glo"
              ? "1.35GB - 14 Days"
              : "11.5GB - 30 Days"}
          </option>
          <option
            value={
              optionsState.network === "MTN"
                ? "3GB - 30 Days,869,3000"
                : optionsState.network === "Airtel"
                ? "750MB - 14 Days,499,airt-500"
                : optionsState.network === "Glo"
                ? "2.9GB - 30 Days,979,G1000"
                : "15GB - 30 Days,9899,9MOB5000"
            }
          >
            {optionsState.network === "MTN"
              ? "3GB - 30 Days"
              : optionsState.network === "Airtel"
              ? "750MB - 14 Days"
              : optionsState.network === "Glo"
              ? "2.9GB - 30 Days"
              : "15GB - 30 Days"}
          </option>

          {optionsState.network === "MTN" && (
            <option value="5GB - 30 Days,1449,5000">5GB - 30 Days</option>
          )}

          {optionsState.network === "MTN" && (
            <option value="6GB - 7 Days,1499,mtn-20hrs-1500">
              6GB - 7 Days
            </option>
          )}

          {optionsState.network === "MTN" && (
            <option value="10GB - 30 Days,2899,10000">10GB - 30 Days</option>
          )}

          {optionsState.network === "MTN" && (
            <option value="30GB - 30 Days,8000,mtn-30gb-8000">
              30GB - 30 Days
            </option>
          )}

          {optionsState.network === "MTN" && (
            <option value="40GB - 30 Days,9899,mtn-40gb-10000">
              40GB - 30 Days
            </option>
          )}

          {optionsState.network === "MTN" && (
            <option value="75GB - 30 Days,14979,mtn-75gb-15000">
              75GB - 30 Days
            </option>
          )}

          {optionsState.network === "Airtel" && (
            <option value="1.5GB - 30 Days,979,AIR1000">1.5GB - 30 Days</option>
          )}

          {optionsState.network === "Airtel" && (
            <option value="2GB - 30 Days,1179,airt-1200">2GB - 30 Days</option>
          )}

          {optionsState.network === "Airtel" && (
            <option value="3GB - 30 Days,1489,Air1500">3GB - 30 Days</option>
          )}

          {optionsState.network === "Airtel" && (
            <option value="4.5GB - 30 Days,1949,AIR2000">
              4.5GB - 30 Days
            </option>
          )}

          {optionsState.network === "Airtel" && (
            <option value="10GB - 30 Days,2959,Air3000">10GB - 30 Days</option>
          )}

          {optionsState.network === "Airtel" && (
            <option value="20GB - 30 Days,4899,Air5000">20GB - 30 Days</option>
          )}

          {optionsState.network === "Airtel" && (
            <option value="40GB - 30 Days,9799,Air100000">
              40GB - 30 Days
            </option>
          )}

          {optionsState.network === "Glo" && (
            <option value="5.8GB - 30 Days,1949,G2000">5.8GB - 30 Days</option>
          )}

          {optionsState.network === "Glo" && (
            <option value="7.7GB - 30 Days,2449,G2500">7.7GB - 30 Days</option>
          )}

          {optionsState.network === "Glo" && (
            <option value="10GB - 30 Days,2949,G3000">10GB - 30 Days</option>
          )}

          {optionsState.network === "Glo" && (
            <option value="13.25GB - 30 Days,3889,G4000">
              13.25GB - 30 Days
            </option>
          )}

          {optionsState.network === "Glo" && (
            <option value="18.25GB - 30-Days,4849,G5000">
              18.25GB - 30 Days
            </option>
          )}

          {optionsState.network === "Glo" && (
            <option value="29.5GB 30 Days,7799,G8000">29.5GB - 30 Days</option>
          )}

          {optionsState.network === "Glo" && (
            <option value="50GB 30 Days,9899,glo10000">50GB 30 Days</option>
          )}
        </select>

        <div className="mb-6 text-base">
          <span>Value: </span>{" "}
          <span className="font-bold">
            ₦
            {optionsState.amount === ""
              ? "0"
              : changeToMoneyFormat(optionsState.amount)}
          </span>
        </div>

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Phone Number
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

export default BuyData;
