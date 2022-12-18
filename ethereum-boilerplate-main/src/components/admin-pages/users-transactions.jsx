import { useEffect, useState, useContext } from "react";
import { UserContext } from "components/contexts/auth-context";
import SingleUserTransaction from "./single-user-transactions";
import baseUrl from "api/base-url";
import Spinner from "components/spinner/spinner.component";

export default function UsersTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [userIdSearchTerm, setuserIdSearchTerm] = useState("");
  const [transactionIdSearchTerm, settransactionIdSearchTerm] = useState("");
  const [newPageNum, setNewPageNum] = useState(2);
  const [oldPageNum, setOldPageNum] = useState(0);
  const { user, userStateChanged } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [newErr, setNewErr] = useState(null);

  const transactionsOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const fetchUserTransactions = async () => {
      setLoading(true);
      try {
        const fetchResult = await fetch(
          `${baseUrl()}/get-all-users-transactions`,
          transactionsOptions,
        );
        if (!fetchResult.ok) {
          setLoading(false);
          setNewErr("Error occured while fetching transactions");
          return;
        }
        const data = await fetchResult.json();
        setLoading(false);
        setTransactions(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserTransactions();
  }, [userStateChanged]);

  const goToNextPage = () => {
    const maxNum = transactions.length;
    if (newPageNum < maxNum) {
      setNewPageNum(newPageNum + 2);
      setOldPageNum(oldPageNum + 2);
    }
  };

  const goToPreviousPage = () => {
    if (newPageNum > 2) {
      setNewPageNum(newPageNum - 2);
      setOldPageNum(oldPageNum - 2);
    }
  };

  const handleTransactionIdSearchTerm = (e) => {
    settransactionIdSearchTerm(e.target.value === "" ? "" : e.target.value);
  };

  const handleUserIdSearchTerm = (e) => {
    setuserIdSearchTerm(e.target.value === "" ? "" : e.target.value);
  };

  const TransactionOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  };

  const searchByTransactionId = async () => {
    setNewErr(null);
    setLoading(true);
    try {
      setTransactions([]);
      const fetchResult = await fetch(
        `${baseUrl()}/transactions-by-id?transactionId=${transactionIdSearchTerm}`,
        TransactionOptions,
      );
      if (!fetchResult.ok) {
        setLoading(false);
        setNewErr(
          "Error occured while fetching the transaction by ID. Please try again",
        );
        return;
      }
      const data = await fetchResult.json();
      setLoading(false);
      setTransactions([data]);
    } catch (error) {
      console.log(error);
    }
  };
  const searchByUserId = async () => {
    setNewErr(null);
    setLoading(true);
    try {
      setTransactions([]);
      const fetchResult = await fetch(
        `${baseUrl()}/transactions/get-user-transaction?userId=${userIdSearchTerm}`,
        TransactionOptions,
      );
      if (!fetchResult.ok) {
        setLoading(false);
        setNewErr(
          "Error occured while fetching transactions by user ID. Please try again",
        );
        return;
      }
      const data = await fetchResult.json();
      setLoading(false);
      setTransactions(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute top-20 left-0 w-screen md:left-80 bg-zinc-200 md:w-120 p-5 rounded-xl">
      <div className="flex flex-col gap-3">
        <div className="flex gap-6">
          <input
            onChange={handleTransactionIdSearchTerm}
            className="shadow appearance-none border-b rounded w-64 md:w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="walletAddress"
            type="text"
            placeholder="Search for a Transaction By Transaction ID"
            required
          ></input>
          <button
            onClick={searchByTransactionId}
            className="bg-blue-600 rounded-lg p-2 hover:bg-blue-300 hover:text-zinc-500"
          >
            Search
          </button>
        </div>
        <div className="flex gap-6">
          <input
            onChange={handleUserIdSearchTerm}
            className="shadow appearance-none border-b rounded w-64 md:w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="walletAddress"
            type="text"
            placeholder="Search for Transactions By User ID"
            required
          ></input>
          <button
            onClick={searchByUserId}
            className="bg-blue-600 rounded-lg p-2 hover:bg-blue-300 hover:text-zinc-500"
          >
            Search
          </button>
        </div>

        {transactions.length == 0 ? (
          <p className="text-center">You have no transactions yet</p>
        ) : (
          <div className="flex flex-col gap-3">
            {transactions
              .map((items) => (
                <SingleUserTransaction key={items._id} data={items} />
              ))
              .slice(oldPageNum, newPageNum)}
          </div>
        )}
        <div className="flex items-center justify-center p-5">
          {loading && <Spinner />}
        </div>
        {newErr && <p className="text-center text-red-600">{newErr}</p>}
      </div>
      <div className="flex justify-between">
        <div>
          <button
            onClick={goToPreviousPage}
            className="bg-blue-600 rounded-lg p-2 hover:bg-blue-300 hover:text-zinc-500"
          >
            Previous Page
          </button>
        </div>
        <div>
          <button
            onClick={goToNextPage}
            className="bg-blue-600 rounded-lg p-2 hover:bg-blue-300 hover:text-zinc-500"
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}
