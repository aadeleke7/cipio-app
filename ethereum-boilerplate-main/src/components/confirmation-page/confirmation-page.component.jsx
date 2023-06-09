import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom-v5-compat";
import baseUrl from "api/base-url";
import { UserContext } from "components/contexts/auth-context";

import { useContext, useState } from "react";
import { TransactionContext } from "components/contexts/transaction-context";
import Form from "components/betting/form/form";
import Spinner from "components/spinner/spinner.component";

const ConfirmationPage = () => {
  const {
    tAmount,
    data,
    network_id,
    transactionPurpose,
    setData,
    setTAmount,
    setNetwork_id,
    setTransactionPurpose,
    discount,
  } = useContext(TransactionContext);
  const [message, setMessage] = useState({ success: "", err: "" });
  const [loading, setLoading] = useState(false);
  const [airtime, setAirtime] = useState(0);
  const { user, setUserStateChanged, userStateChanged } =
    useContext(UserContext);

  useEffect(() => {
    console.log(data);
    const airtim = +data.amount;
    setAirtime(user.role === "User" ? airtim * discount : airtim);
  }, [data, discount]);

  const resetAllValues = () => {
    setData([]);
    setTAmount(0);
    setNetwork_id("");
    setTransactionPurpose("");
  };

  let navigate = useNavigate();

  const creditedTo =
    transactionPurpose === "airtime"
      ? data.number
      : transactionPurpose === "data"
      ? data.number
      : transactionPurpose === "tv"
      ? data.number
      : `Betting platform ${data.name} and customer betting ID: ${data.iD}`;

  const amountBody = {
    amount: user.role === "User" ? +tAmount : +data.amount,
    transactionDetails: `${+data.amount} Naira ${transactionPurpose} purchase to ${creditedTo}. ${
      user.role === "User" ? `User ID: ${user.id}` : `Agent ID: ${user.id}`
    }`,
  };

  const creditAmountBody = {
    amount: user.role === "User" ? +tAmount : +data.amount,
  };

  const debitOptions = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(amountBody),
  };

  const debitLink =
    user.role === "User"
      ? `${baseUrl()}/transactions/debit-user-wallet?passcode=D*G-KaPdSgVkYp3s6v9y/B?E(HMbQeT&userId=${
          user.id
        }`
      : `${baseUrl()}/transactions/debit-marchant-wallet?passcode=D*G-KaPdSgVkYp3s6v9y/B?E(HMbQeT&marchantId=${
          user.id
        }`;
  const creditOptions = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creditAmountBody),
  };

  const fetchLink =
    user.role === "User"
      ? `${baseUrl()}/transactions/credit-user-wallet?passcode=D*G-KaPdSgVkYp3s6v9y/B?E(HMbQeT&userId=${
          user.id
        }`
      : `${baseUrl()}/transactions/credit-marchant-wallet?passcode=D*G-KaPdSgVkYp3s6v9y/B?E(HMbQeT&marchantId=${
          user.id
        }`;

  async function refundUser() {
    const isTransactionSuccessful = await fetch(fetchLink, creditOptions);
    if (!isTransactionSuccessful.ok) {
      setMessage({
        ...message,
        err: "Your transaction wasn't successful and your funds couldn't be refunded. Please contact admin",
      });
      sendEmailToAdmin(
        "A failed transaction happened and the user has been refunded. Details of transaction:",
      );
      setLoading(false);
      return;
    }
    if (isTransactionSuccessful.ok) {
      setMessage({
        ...message,
        success:
          "Your transaction was not successful and you have been refunded",
      });
      sendEmailToAdmin(
        "An error happened and the user was not refunded after a failed transaction. Details of transaction:",
      );
      setLoading(false);
      return;
    }
  }

  const transferFunds = async () => {
    try {
      setLoading(true);
      const isTransactionSuccessful = await fetch(debitLink, debitOptions);
      setUserStateChanged(userStateChanged === true ? false : true);
      if (!isTransactionSuccessful.ok) {
        const result = await isTransactionSuccessful.json();
        setLoading(false);
        setMessage({ ...message, err: result.msg });
        sendEmailToAdmin("The following unsuccessful transaction took place:");
        return;
      }
      sendEmailToAdmin("The following successful transaction took place:");
      if (isTransactionSuccessful.ok && transactionPurpose === "airtime") {
        setMessage({
          ...message,
          success: "Your wallet has been successfully debited",
        });
        try {
          const executePayment = await fetch(
            `https://vtu.ng/wp-json/api/v1/${transactionPurpose}?username=AADELEKE7&password=${process.env.REACT_APP_PROJECT_ID}&phone=${data.number}&network_id=${network_id}&amount=${airtime}`,
          );
          const res = await executePayment.json();
          const sucessMessage = await res.message;
          if (res.code !== "success") {
            refundUser();
            return;
          }
          setMessage({ ...message, success: sucessMessage });
          endSession();
        } catch (err) {
          console.log(err);
        }
        return;
      }
      if (isTransactionSuccessful.ok && transactionPurpose === "data") {
        setMessage({
          err: "",
          success: "Your wallet has been successfully debited",
        });
        try {
          const executePayment = await fetch(
            `https://vtu.ng/wp-json/api/v1/${transactionPurpose}?username=AADELEKE7&password=${process.env.REACT_APP_PROJECT_ID}&phone=${data.number}&network_id=${network_id}&variation_id=${data.v_id}`,
          );
          const res = await executePayment.json();
          const sucessMessage = await res.message;
          if (res.code !== "success") {
            refundUser();
            return;
          }
          setMessage({ ...message, success: sucessMessage });
          endSession();
        } catch (err) {
          console.log(err);
        }
        return;
      }
      if (isTransactionSuccessful.ok && transactionPurpose === "tv") {
        setMessage({
          err: "",
          success: "Your wallet has been successfully debited",
        });
        try {
          const executePayment = await fetch(
            `https://vtu.ng/wp-json/api/v1/${transactionPurpose}?username=AADELEKE7&password=${process.env.REACT_APP_PROJECT_ID}&phone=${data.number}&service_id=${network_id}&smartcard_number=${data.smartCardNumber}&variation_id=${data.v_id}`,
          );
          const res = await executePayment.json();
          const sucessMessage = await res.message;
          if (res.code !== "success") {
            refundUser();
            return;
          }
          setMessage({ ...message, success: sucessMessage });
          endSession();
        } catch (err) {
          console.log(err);
        }
        return;
      }
      if (isTransactionSuccessful.ok && transactionPurpose === "betting") {
        setMessage({
          err: "",
          success:
            "Transaction Successful. Contacted support to be manually credited",
        });
        sendEmailToAdmin("The user need to be manually credited: ");
        endSession();
        return;
      }
    } catch (e) {
      setLoading(false);
      setMessage({
        ...message,
        err: "Transaction wasn't successful. Please try again",
      });
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setMessage({
      err: "",
      success: "",
    });
    transferFunds();
  };

  function endSession() {
    setTimeout(() => {
      resetAllValues();
      setLoading(false);
      navigate("/", { replace: true });
    }, 4000);
  }

  async function sendEmailToAdmin(reason) {
    const transactionDetails = `${reason} ${+data.amount} Naira ${transactionPurpose} purchase to ${creditedTo}. ${
      user.role === "User" ? `User ID: ${user.id}` : `Agent ID: ${user.id}`
    }`;

    const sendData = await fetch(
      `${baseUrl()}/send-email-to-admin?transactionDetails=${transactionDetails}`,
    );
    if (!sendData.ok) {
      console.log("Email was not sent");
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 absolute bg-zinc-200 md:top-24 top-24 md:left-110 rounded-2xl p-10 w-screen md:w-auto">
      {user.role === "User" && (
        <p className="font-medium px-2 mb-5">
          Click to confirm your transaction of{" "}
          <span className="font-bold text-black">{tAmount}</span> CIPIO
        </p>
      )}
      <form onSubmit={sendEmail}>
        <Form className="select-none" />
        {loading || (
          <input
            type="submit"
            value="Confirm"
            className="bg-blue-500 w-56 h-10 rounded-2xl hover:bg-blue-700"
          />
        )}
      </form>
      <p className="text-red-500 text-lg">{message.err}</p>
      <p className="text-blue-500 text-lg">{message.success}</p>
      {loading && <Spinner />}
    </div>
  );
};

export default ConfirmationPage;
