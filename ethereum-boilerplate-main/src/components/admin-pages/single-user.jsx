import { useContext } from "react";
import { UserContext } from "components/contexts/auth-context";
import baseUrl from "api/base-url";

export default function SingleUser({ singleUser }) {
  const { user, setUserStateChanged, userStateChanged } =
    useContext(UserContext);
  const { _id, name, email, balance, isEnabled } = singleUser;

  const deleteUserOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  };

  const enableDisableUserOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  };

  const deleteUser = async () => {
    try {
      const fetchResult = await fetch(
        `${baseUrl()}/delete-user?userId=${_id}`,
        deleteUserOptions,
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

  async function disableUser() {
    try {
      const fetchResult = await fetch(
        `${baseUrl()}/disable-user?userId=${_id}`,
        enableDisableUserOptions,
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

  async function enableUser() {
    try {
      const fetchResult = await fetch(
        `${baseUrl()}/enable-user?userId=${_id}`,
        enableDisableUserOptions,
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
        <p>User ID: {_id}</p>
        <p>User Name: {name}</p>
        <p>User Email: {email}</p>
        <p>User Balance: {balance}</p>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <button
            onClick={deleteUser}
            className="bg-red-600 rounded-lg p-2 hover:bg-red-300 hover:text-zinc-500"
          >
            Delete User
          </button>
        </div>
        {isEnabled && (
          <div>
            <button
              onClick={disableUser}
              className="bg-red-600 rounded-lg p-2 hover:bg-red-300 hover:text-zinc-500"
            >
              Disable User
            </button>
          </div>
        )}
        {isEnabled || (
          <div>
            <button
              onClick={enableUser}
              className="bg-blue-600 rounded-lg p-2 hover:bg-blue-300 hover:text-zinc-500"
            >
              Enable User
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
