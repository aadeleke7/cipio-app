import { useContext } from "react";
import { UserContext } from "components/contexts/auth-context";
import baseUrl from "api/base-url";

export default function SingleMarchant({ singleMarchant }) {
  const { user, setUserStateChanged, userStateChanged } =
    useContext(UserContext);
  const { _id, name, email, balance, isEnabled } = singleMarchant;

  const marchantOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  };

  const enableDisableMarchantOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  };

  const deleteMarchant = async () => {
    try {
      const fetchResult = await fetch(
        `${baseUrl()}/delete-marchant?marchantId=${_id}`,
        marchantOptions,
      );
      if (!fetchResult.ok) {
        console.log(fetchResult);
        return;
      }
      const data = await fetchResult.json();
      console.log(data.msg);
      setUserStateChanged(userStateChanged === true ? false : true);
    } catch (error) {
      console.log(error);
    }
  };

  async function disableMarchant() {
    try {
      const fetchResult = await fetch(
        `${baseUrl()}/disable-marchant?marchantId=${_id}`,
        enableDisableMarchantOptions,
      );
      if (!fetchResult.ok) {
        console.log(fetchResult);
        return;
      }
      const data = await fetchResult.json();
      console.log(data.msg);
      setUserStateChanged(userStateChanged === true ? false : true);
    } catch (error) {
      console.log(error);
    }
  }

  async function enableMarchant() {
    try {
      const fetchResult = await fetch(
        `${baseUrl()}/enable-marchant?marchantId=${_id}`,
        enableDisableMarchantOptions,
      );
      if (!fetchResult.ok) {
        console.log(fetchResult);
        return;
      }
      const data = await fetchResult.json();
      console.log(data.msg);
      setUserStateChanged(userStateChanged === true ? false : true);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full rounded-2xl p-5 bg-blue-200 flex gap-10 items-center">
      <div>
        <p>Marchant ID: {_id}</p>
        <p>Marchant Name: {name}</p>
        <p>Marchant Email: {email}</p>
        <p>Marchant Balance: {balance}</p>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <button
            onClick={deleteMarchant}
            className="bg-red-600 rounded-lg p-2 hover:bg-red-300 hover:text-zinc-500"
          >
            Delete Marchant
          </button>
        </div>
        {isEnabled && (
          <div>
            <button
              onClick={disableMarchant}
              className="bg-red-600 rounded-lg p-2 hover:bg-red-300 hover:text-zinc-500"
            >
              Disable Marchant
            </button>
          </div>
        )}
        {isEnabled || (
          <div>
            <button
              onClick={enableMarchant}
              className="bg-blue-600 rounded-lg p-2 hover:bg-blue-300 hover:text-zinc-500"
            >
              Enable Marchant
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
