import { useEffect, useState, useContext } from "react";
import { UserContext } from "components/contexts/auth-context";
import baseUrl from "api/base-url";
import IndividualMarchantApproval from "./individual-marchant-approval";
import Spinner from "components/spinner/spinner.component";

export default function MarchantsApprovalPage() {
  const [allMarchants, setAllMarchants] = useState([]);
  const [newPageNum, setNewPageNum] = useState(3);
  const [oldPageNum, setOldPageNum] = useState(0);
  const { user, userStateChanged } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [newErr, setNewErr] = useState(null);

  const marchantsOptions = {
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
          `${baseUrl()}/get-unapproved-marchants`,
          marchantsOptions,
        );
        if (!fetchResult.ok) {
          setLoading(false);
          setNewErr("Error happened while fetching unapproved marchants");
          return;
        }
        const data = await fetchResult.json();
        setLoading(false);
        setAllMarchants(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserBalance();
  }, [userStateChanged]);

  const goToNextPage = () => {
    const maxNum = allMarchants.length;
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
    <div className="absolute top-20 left-0 md:left-80 bg-zinc-200 p-5 md:w-120 w-screen rounded-xl flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {allMarchants.length == 0 ? (
          <p className="text-center">You have no unapproved marchants</p>
        ) : (
          <div className="flex flex-col gap-3">
            {allMarchants
              .map((items) => (
                <IndividualMarchantApproval
                  key={items._id}
                  singleMarchant={items}
                />
              ))
              .reverse()
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
