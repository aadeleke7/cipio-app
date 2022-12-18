import { useState, useContext, useEffect } from "react";
import Account from "components/Account/Account";
import { useMoralis } from "react-moralis";
import { UserContext } from "components/contexts/auth-context";
import { TransactionContext } from "components/contexts/transaction-context";
import baseUrl from "api/base-url";
import { ToggleContext } from "components/contexts/toggle-context";
import Spinner from "components/spinner/spinner.component";
import { Moralis } from "moralis";

export default function PaymentPopUp() {
  const { account } = useMoralis();
  const { user, setUserStateChanged, userStateChanged } =
    useContext(UserContext);
  const { paymentPopupToggle, setPaymentPopupToggle } =
    useContext(ToggleContext);
  const { coinPrice, nairaValue } = useContext(TransactionContext);
  const [amount, setAmount] = useState(0);
  const [newErr, setNewErr] = useState(null);
  const [currentMarchantDiscount, setCurrentMarchantDiscount] = useState(0);
  const [currentMarchantBonus, setcurrentMarchantBonus] = useState(0);
  const [loading, setLoading] = useState(false);

  const matricOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const fetchMarchantDiscount = async () => {
      try {
        const fetchResult = await fetch(
          `${baseUrl()}/metrics/get-marchant-discount`,
          matricOptions,
        );
        if (!fetchResult.ok) {
          console.log("Error occured while fetching data");
          return;
        }
        const data = await fetchResult.json();
        setCurrentMarchantDiscount((data.marchantDiscount + 100) / 100);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchMarchantBonus = async () => {
      try {
        const fetchResult = await fetch(
          `${baseUrl()}/metrics/get-marchant-bonus`,
          matricOptions,
        );
        if (!fetchResult.ok) {
          console.log("Error occured while fetching data");
          return;
        }
        const data = await fetchResult.json();
        setcurrentMarchantBonus(data.marchantBonus);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMarchantBonus();
    fetchMarchantDiscount();
  }, []);

  const togglePaymentPopup = () => {
    if (paymentPopupToggle) {
      setPaymentPopupToggle(false);
    } else {
      setPaymentPopupToggle(true);
    }
  };

  const handlePayment = (e) => {
    setAmount(e.target.value === "" ? "0" : e.target.value);
  };

  useEffect(() => {}, [amount]);

  const options = {
    type: "erc20",
    amount: Moralis.Units.Token(amount, "9"),
    receiver: "0xd666B60dcf34a197B3806BF6442ee2eD286Cd7F4",
    contractAddress: "0xe68626f79b5C4CFA9686A091d3303E4c624DFeCf",
  };

  const amountBody = {
    amount:
      user.role === "User"
        ? +amount
        : Number(
            +amount * nairaValue * coinPrice * currentMarchantDiscount +
              currentMarchantBonus,
          ),
  };

  const marchantRechargeAmount = +amount * nairaValue * coinPrice;

  const creditOptions = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(amountBody),
  };

  const fetchLink =
    user.role === "User"
      ? `${baseUrl()}/transactions/credit-user-wallet?passcode=D*G-KaPdSgVkYp3s6v9y/B?E(HMbQeT&userId=${
          user.id
        }`
      : `${baseUrl()}/transactions/credit-marchant-wallet?passcode=D*G-KaPdSgVkYp3s6v9y/B?E(HMbQeT&marchantId=${
          user.id
        }`;

  const transferFunds = async () => {
    try {
      setLoading(true);
      if (user.role === "Marchant" && marchantRechargeAmount < 10000) {
        setLoading(false);
        setNewErr("The minimum you can recharge as a marchant is 10,000 Naira");
        return;
      }
      await Moralis.transfer(options);
      const isTransactionSuccessful = await fetch(fetchLink, creditOptions);
      if (!isTransactionSuccessful.ok) {
        setNewErr("Transaction is not successful");
        sendEmailToAdmin("A unsuccessful recharge of");
        return;
      }
      await isTransactionSuccessful.json();
      sendEmailToAdmin("A successful recharge of");
      setUserStateChanged(userStateChanged === true ? false : true);
      setNewErr(null);
      setLoading(false);
      togglePaymentPopup();
    } catch (error) {
      setLoading(false);
      setNewErr(
        "Transaction is not successful. Please ensure you have enough Cipio Coin",
      );
    }
  };

  const pay = () => {
    transferFunds();
  };

  async function sendEmailToAdmin(reason) {
    const transactionDetails = `${reason} of ${amount} Cipio took place. ${
      user.role === "User" ? `User ID: ${user.id}` : `Agent ID: ${user.id}`
    }`;

    const sendData = await fetch(
      `${baseUrl()}/send-recharge-email-to-admin?transactionDetails=${transactionDetails}&walletAddress=${account}`,
    );
    if (!sendData.ok) {
      console.log("Email was not sent");
    }
  }

  return (
    <div className="flex flex-col gap-14 md:w-128 w-screen h-72 pt-10 px-5 z-10 absolute bg-zinc-200 md:top-24 top-16 md:left-110 rounded-2xl">
      <div className="flex justify-center">
        {account && <p>Your Connected Wallet Address:</p>}
        {account || <Account className="text-black" />}
      </div>
      {account && (
        <div className="flex gap-9 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <p>Amount to recharge</p>
            <input
              onChange={handlePayment}
              type="number"
              name="amount"
              className="w-32 h-8 block"
            />
          </div>
          <div className="flex gap-5">
            <div className="pt-5">
              <button
                onClick={pay}
                disabled={loading && true}
                className="w-32 h-10 border-2 border-blue-800 text-blue-800"
              >
                Recharge Wallet
              </button>
            </div>
            <div className="pt-4">{loading && <Spinner />}</div>
          </div>
        </div>
      )}
      {user.role === "Marchant" && (
        <p>Amount in Naira: {(+amount * nairaValue * coinPrice).toFixed(4)}</p>
      )}
      {newErr && <p className="text-center text-red-600">{newErr}</p>}
    </div>
  );
}
