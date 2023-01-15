import { useEffect, useState, useContext } from "react";
import { UserContext } from "components/contexts/auth-context";
import SingleTransaction from "./single-transaction";
import baseUrl from "api/base-url";
import Spinner from "components/spinner/spinner.component";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [newPageNum, setNewPageNum] = useState(3);
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
    const fetchUserBalance = async () => {
      setLoading(true);
      try {
        const fetchResult = await fetch(
          `${baseUrl()}/transactions/get-user-transaction?userId=${user.id}`,
          transactionsOptions,
        );
        if (!fetchResult.ok) {
          setNewErr("Error occured while fetching data");
          return;
        }
        const data = await fetchResult.json();
        setLoading(false);
        setTransactions(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserBalance();
  }, [userStateChanged]);

  const goToNextPage = () => {
    const maxNum = transactions.length;
    if (newPageNum < maxNum) {
      setNewPageNum(newPageNum + 3);
      setOldPageNum(oldPageNum + 3);
    }
  };

  const goToPreviousPage = () => {
    if (newPageNum > 3) {
      setNewPageNum(newPageNum - 3);
      setOldPageNum(oldPageNum - 3);
    }
  };

  return (
    <div className="absolute top-28 left-0 md:top-20 md:left-80 bg-zinc-200 md:w-120 w-screen p-5 rounded-xl">
      <p className="text-center">Transaction History</p>
      {transactions.length == 0 ? (
        <p className="text-center">You have no transactions yet</p>
      ) : (
        <div className="flex flex-col gap-3">
          {transactions
            .map((items) => <SingleTransaction key={items._id} data={items} />)
            .reverse()
            .slice(oldPageNum, newPageNum)}
        </div>
      )}
      <div className="flex items-center justify-center p-5">
        {loading && <Spinner />}
      </div>
      {newErr && <p className="text-center text-red-600">{newErr}</p>}
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
