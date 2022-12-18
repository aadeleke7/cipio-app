import { useEffect, useState, useContext } from "react";
import { UserContext } from "components/contexts/auth-context";
import baseUrl from "api/base-url";
import SingleMarchant from "./single-marchant";
import Spinner from "components/spinner/spinner.component";

export default function MarchantsPage() {
  const [allMarchants, setAllMarchants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
          `${baseUrl()}/all-marchants`,
          marchantsOptions,
        );
        if (!fetchResult.ok) {
          setLoading(false);
          setNewErr("Error occured while fetching marchants");
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

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value === "" ? "" : e.target.value);
  };

  const marchantOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  };

  const searchForMarchant = async () => {
    setLoading(true);
    try {
      setAllMarchants([]);
      const fetchResult = await fetch(
        `${baseUrl()}/single-marchant?marchantId=${searchTerm}`,
        marchantOptions,
      );
      if (!fetchResult.ok) {
        setLoading(false);
        setNewErr("Could not fetch matchants");
        return;
      }
      const data = await fetchResult.json();
      setLoading(false);
      setAllMarchants([data]);
    } catch (error) {
      console.log(error);
    }
  };

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
    <div className="absolute top-20 left-0 md:left-80 bg-zinc-200 p-5 rounded-xl flex flex-col gap-4">
      <div className="flex gap-6">
        <input
          onChange={handleSearchTerm}
          className="shadow appearance-none border-b rounded w-64 md:w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="walletAddress"
          type="text"
          placeholder="Search for a Marchant By ID"
          required
        ></input>
        <button
          onClick={searchForMarchant}
          className="bg-blue-600 rounded-lg p-2 hover:bg-blue-300 hover:text-zinc-500"
        >
          Search Marchant
        </button>
      </div>

      {allMarchants.length == 0 ? (
        <p className="text-center">You have no marchants yet</p>
      ) : (
        <div className="flex flex-col gap-3">
          {allMarchants
            .map((items) => (
              <SingleMarchant key={items._id} singleMarchant={items} />
            ))
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
