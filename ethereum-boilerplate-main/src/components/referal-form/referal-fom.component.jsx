import { useReducer, useState, useRef } from "react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom-v5-compat";
import Spinner from "components/spinner/spinner.component";

const initialState = {
  referralName: "",
  referralPhoneNumber: "",
  referralWalletAddress: "",
  cipioSalesAmount: "",
  clientPhoneNumber: "",
  clientWalletAddress: "",
  clientHashtag: "",
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "referralName":
      return { ...state, referralName: payload };
    case "referralPhoneNumber":
      return { ...state, referralPhoneNumber: payload };
    case "referralWalletAddress":
      return { ...state, referralWalletAddress: payload };
    case "cipioSalesAmount":
      return { ...state, cipioSalesAmount: payload };
    case "clientPhoneNumber":
      return { ...state, clientPhoneNumber: payload };
    case "clientWalletAddress":
      return { ...state, clientWalletAddress: payload };
    case "clientHashtag":
      return { ...state, clientHashtag: payload };
    case "clearForm":
      return {
        referralName: "",
        referralPhoneNumber: "",
        referralWalletAddress: "",
        cipioSalesAmount: "",
        clientPhoneNumber: "",
        clientWalletAddress: "",
        clientHashtag: "",
      };
    default:
      return state;
  }
};

const ReferalForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [newErr, setNewErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const form = useRef();
  let navigate = useNavigate();

  const handleForm = (e) => {
    dispatch({
      type: e.target.name,
      payload: e.target.value,
    });
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  let month = months[d.getMonth()];

  let year = new Date().getFullYear();

  let day = new Date().getDate();

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    const {
      referralName,
      referralPhoneNumber,
      referralWalletAddress,
      cipioSalesAmount,
      clientPhoneNumber,
      clientWalletAddress,
      clientHashtag,
    } = state;

    if (
      referralName &&
      referralPhoneNumber &&
      referralWalletAddress &&
      cipioSalesAmount &&
      clientPhoneNumber &&
      clientWalletAddress &&
      clientHashtag
    ) {
      emailjs
        .sendForm(
          "service_7p3cc1p",
          "template_oqzgeuy",
          form.current,
          "Q9tI4YBVqpD0skvPO",
        )
        .then(
          (result) => {
            setLoading(false);
            console.log(result.text);
            dispatch({ type: "clearForm" });
            setNewErr(() => "");
            alert("Your form has been successfully submitted");
            navigate("/", { replace: true });
          },
          (error) => {
            setLoading(false);
            setNewErr(() => "Your Form wasn't submitted. Please try again");
            console.log(error.text);
          },
        );
    } else {
      setNewErr(() => "All inputs are required");
    }
  };

  return (
    <div className="w-screen md:w-160 p-5 absolute left-0 top-28 md:left-80 bg-zinc-300 rounded-lg shadow-xl">
      <form
        ref={form}
        onSubmit={sendEmail}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="date"
            type="text"
            value={`${day}/${month}/${year}`}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Referral Full Name
          </label>
          <input
            onChange={handleForm}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="referralName"
            id="referral-name"
            type="text"
            placeholder="Referral Full Name"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Referral Phone Number
          </label>
          <input
            onChange={handleForm}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="referralPhoneNumber"
            id="referral-phone-number"
            type="number"
            placeholder="Referral Phone Number"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Referral Wallet Address
          </label>
          <input
            onChange={handleForm}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="referralWalletAddress"
            id="referral-wallet-address"
            type="text"
            placeholder="Referral Wallet Address"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            CIPIO Sales Amount
          </label>
          <input
            onChange={handleForm}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="cipioSalesAmount"
            id="cipio-sales-amount"
            type="text"
            placeholder="CIPIO Sales Amount"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Client Phone Number
          </label>
          <input
            onChange={handleForm}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="clientPhoneNumber"
            id="client-phone-number"
            type="number"
            placeholder="Client Phone Number"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Client Wallet Address
          </label>
          <input
            onChange={handleForm}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="clientWalletAddress"
            id="client-wallet-address"
            type="text"
            placeholder="Client Wallet Address"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Client Hash Tag/I.D
          </label>
          <input
            onChange={handleForm}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="clientHashtag"
            id="client-hash-tag"
            type="text"
            placeholder="Client Hash Tag/I.D"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            POP of CIPIO Screenshot in Trust Wallet
          </label>
          <input
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="file"
            name="file"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          {loading || (
            <input
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
              type="submit"
              value="Submit"
            />
          )}
          {loading && <Spinner />}
        </div>
        <div>
          {newErr && (
            <p className="text-red-500 text-center text-xl">{newErr}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReferalForm;
