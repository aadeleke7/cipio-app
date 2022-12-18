import { useContext, useState } from "react";
import { UserContext } from "components/contexts/auth-context";
import baseUrl from "api/base-url";
import Spinner from "components/spinner/spinner.component";

export default function IndividualMarchantApproval({ singleMarchant }) {
  const { user, setUserStateChanged, userStateChanged } =
    useContext(UserContext);
  const { _id, name, email, balance } = singleMarchant;
  const [loading, setLoading] = useState(false);
  const [newErr, setNewErr] = useState(null);

  const marchantOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  };

  const deleteMarchant = async () => {
    setLoading(true);
    try {
      const fetchResult = await fetch(
        `${baseUrl()}/delete-marchant?marchantId=${_id}`,
        marchantOptions,
      );
      if (!fetchResult.ok) {
        setNewErr("Could not delete marchant. Please try again");
        setLoading(false);
        return;
      }
      await fetchResult.json();
      setLoading(false);
      setUserStateChanged(userStateChanged === true ? false : true);
    } catch (error) {
      console.log(error);
    }
  };

  const approveMarchantOptions = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  };

  const approveMarchant = async () => {
    setLoading(true);
    try {
      const fetchResult = await fetch(
        `${baseUrl()}/approve-marchant?marchantId=${_id}`,
        approveMarchantOptions,
      );
      if (!fetchResult.ok) {
        setLoading(false);
        setNewErr("Error happened while approving marchant. Please try again");
        return;
      }
      await fetchResult.json();
      setLoading(false);
      setUserStateChanged(userStateChanged === true ? false : true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full rounded-2xl p-5 bg-blue-200 flex gap-10 items-center">
      <div>
        <p>Marchant ID: {_id}</p>
        <p>Marchant Name: {name}</p>
        <p>Marchant Email: {email}</p>
        <p>Marchant Balance: {balance}</p>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <button
            onClick={approveMarchant}
            className="bg-blue-600 rounded-lg p-2 hover:bg-blue-300 hover:text-zinc-500"
          >
            Approve Marchant
          </button>
        </div>
        <div>
          <button
            onClick={deleteMarchant}
            className="bg-red-600 rounded-lg p-2 hover:bg-red-300 hover:text-zinc-500"
          >
            Disapprove Marchant
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center p-5">
        {loading && <Spinner />}
      </div>
      {newErr && <p className="text-center text-red-600">{newErr}</p>}
    </div>
  );
}
