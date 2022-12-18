import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom-v5-compat";
import { TransactionContext } from "components/contexts/transaction-context";
import { UserContext } from "components/contexts/auth-context";

export const changeToMoneyFormat = (money) => {
  if (money.length === 4) {
    return money.slice(0, 1) + "," + money.slice(1);
  } else if (money.length === 5) {
    return money.slice(0, 2) + "," + money.slice(2);
  } else {
    return money;
  }
};

const TvSubscription = () => {
  const [optionsState, setOptionState] = useState({
    name: "",
    package: "Choose Package/Bouquet",
    amount: "",
    smartCardNumber: "",
    v_id: "",
    number: "",
  });
  const [err, setErr] = useState("");

  const {
    setData,
    setTAmount,
    coinPrice,
    nairaValue,
    setTransactionPurpose,
    setNetwork_id,
  } = useContext(TransactionContext);
  const { user } = useContext(UserContext);

  const handleOption = (e) => {
    if (e.target.id === "name")
      setOptionState({
        ...optionsState,
        package: "Choose Package/Bouquet",
        name: e.target.value,
      });

    if (e.target.id === "package")
      setOptionState({
        ...optionsState,
        package: e.target.value.split(",")[0],
        amount: e.target.value.split(",")[1],
        v_id: e.target.value.split(",")[2],
      });

    if (e.target.id === "snumber")
      setOptionState({ ...optionsState, smartCardNumber: e.target.value });
    if (e.target.id === "number")
      setOptionState({ ...optionsState, number: e.target.value });

    console.log(optionsState);
  };

  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      optionsState.name !== "" &&
      optionsState.number !== "" &&
      optionsState.package !== "Choose Package/Bouquet" &&
      optionsState.smartCardNumber !== ""
    ) {
      setNetwork_id(optionsState.name.toLowerCase());
      setTransactionPurpose("tv");
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
    <div className="w-screen md:w-160 p-5 h-144 absolute left-0 top-28 md:left-80 bg-zinc-300 rounded-lg shadow-xl">
      <form className="relative">
        <label
          htmlFor="small"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Select Cable TV
        </label>
        <select
          onChange={handleOption}
          value={optionsState.name}
          required
          id="name"
          className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Choose Cable TV</option>
          <option value="DSTV">DSTV</option>
          <option value="GOTV">GOTV</option>
          <option value="STARTIMES">STARTIMES</option>
        </select>

        <label
          htmlFor="small"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Select Package/Bouquet
        </label>

        <select
          onChange={handleOption}
          value={optionsState.amount}
          required
          id="package"
          className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>{optionsState.package}</option>
          <option
            value={
              optionsState.name === "DSTV"
                ? "Padi,2150,dstv-padi"
                : optionsState.name === "GOTV"
                ? "Smallie,900,gotv-smallie"
                : "Nova,900,nova"
            }
          >
            {optionsState.name === "DSTV"
              ? "Padi"
              : optionsState.name === "GOTV"
              ? "Smallie"
              : "Nova"}
          </option>
          <option
            value={
              optionsState.name === "DSTV"
                ? "Yanga,2950,dstv-yanga"
                : optionsState.name === "GOTV"
                ? "Jinja,1900,gotv-jinja"
                : "Basic,1850,basic"
            }
          >
            {optionsState.name === "DSTV"
              ? "Yanga"
              : optionsState.name === "GOTV"
              ? "Jinja"
              : "Basic"}
          </option>
          <option
            value={
              optionsState.name === "DSTV"
                ? "Confam,5300,dstv-confam"
                : optionsState.name === "GOTV"
                ? "Jolli,2800,gotv-jolli"
                : "Smart,2600,smart"
            }
          >
            {optionsState.name === "DSTV"
              ? "Confam"
              : optionsState.name === "GOTV"
              ? "Jolli"
              : "Smart"}
          </option>
          <option
            value={
              optionsState.name === "DSTV"
                ? "Asia,7100,dstv6"
                : optionsState.name === "GOTV"
                ? "Max,4150,gotv-max"
                : "Classic,2750,classic"
            }
          >
            {optionsState.name === "DSTV"
              ? "Asia"
              : optionsState.name === "GOTV"
              ? "Max"
              : "Classic"}
          </option>
          <option
            value={
              optionsState.name === "DSTV"
                ? "Compact,9000,dstv79"
                : optionsState.name === "GOTV"
                ? "Supa,5500,gotv-supa"
                : "Super,4900,super"
            }
          >
            {optionsState.name === "DSTV"
              ? "Compact"
              : optionsState.name === "GOTV"
              ? "Supa"
              : "Super"}
          </option>

          {optionsState.name === "DSTV" && (
            <option value="Compact Plus,14250,dstv7">Compact Plus</option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Premium,21000,dstv3">Premium</option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Premium - Asia,23500,dstv10">Premium - Asia</option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Premium - French,29300,dstv9">
              Premium - French
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Confam + Extraview,8200,confam-extra">
              Confam + Extraview
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Yanga + Extraview,5850,yanga-extra">
              Yanga + Extraview
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Padi + Extraview,5050,padi-extra">
              Padi + Extraview
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Compact + Asia,16100,com-asia">
              Compact + Asia
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Compact + Extraview,11900,dstv30">
              Compact + Extraview
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Compact + French Touch,11650,com-frenchtouch">
              Compact + French Touch
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Premium - Extraview,23900,dstv33">
              Premium - Extraview
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Compact Plus - Asia,21350,dstv40">
              Compact Plus - Asia
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Compact + French Touch + Extraview,14550,com-frenchtouch-extra">
              Compact + French Touch + Extraview
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Compact + Asia + Extraview,19000,com-asia-extra">
              Compact + Asia + Extraview
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Compact Plus + French Plus,23550,dstv43">
              Compact Plus + French Plus
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Compact Plus + French Touch,16900,complus-frenchtouch">
              Compact Plus + French Touch
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Compact Plus - Extraview,17150,dstv45">
              Compact Plus - Extraview
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Compact Plus + French Plus + Extraview,26450,complus-french-extraview">
              Compact Plus + French Plus + Extraview
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Compact + French Plus,18300,dstv47">
              Compact + French Plus
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Compact Plus + Asia + Extraview,24250,dstv48">
              Compact Plus + Asia + Extraview
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Premium + Asia + Extraview,31000,dstv61">
              Premium + Asia + Extraview
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Premium + French + Extraview,32200,dstv62">
              Premium + French + Extraview
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="HDPVR Access Service,2900,hdpvr-access-service">
              HDPVR Access Service
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="French Plus Add-on,9300,frenchplus-addon">
              French Plus Add-on
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Asian Add-on,7100,asia-addon">Asian Add-on</option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="French Touch Add-on,2650,frenchtouch-addon">
              French Touch Add-on
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="Extraview Access,2900,extraview-access">
              Extraview Access
            </option>
          )}

          {optionsState.name === "DSTV" && (
            <option value="French 11,4100,french11">French 11</option>
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
          SmartCard/IUC Number
        </label>
        <input
          onChange={handleOption}
          value={optionsState.smartCardNumber}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="snumber"
          type="number"
          placeholder="SmartCard/IUC Number"
          required
        ></input>

        <label
          className="block text-gray-700 text-sm font-bold mb-2 mt-4"
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

export default TvSubscription;
