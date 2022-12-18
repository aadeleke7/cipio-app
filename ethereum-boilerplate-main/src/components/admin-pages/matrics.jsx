import { useState, useEffect, useContext } from "react";
import { UserContext } from "components/contexts/auth-context";
import baseUrl from "api/base-url";
import Spinner from "components/spinner/spinner.component";

export default function MetricsPage() {
  const [newNairaValue, setNewNairaValue] = useState(0);
  const [newUserDiscount, setNewUserDiscount] = useState(0);
  const [newMarchantDiscount, setNewMarchantDiscount] = useState(0);
  const [newMarchantBonus, setNewMarchantBonus] = useState(0);

  const [currentNairaValue, setCurrentNairaValue] = useState(0);
  const [currentUserDiscount, setCurrentUserDiscount] = useState(0);
  const [currentMarchantDiscount, setCurrentMarchantDiscount] = useState(0);
  const [currentMarchantBonus, setcurrentMarchantBonus] = useState(0);

  const [loading, setLoading] = useState(false);
  const [newErr, setNewErr] = useState(null);

  const { user, userStateChanged, setUserStateChanged } =
    useContext(UserContext);

  const matricOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    setLoading(true);
    const fetchNairaValue = async () => {
      try {
        const fetchResult = await fetch(
          `${baseUrl()}/metrics/get-naira-value`,
          matricOptions,
        );
        if (!fetchResult.ok) {
          setLoading(false);
          setNewErr("Error occured while fetching Naira value");
          return;
        }
        const data = await fetchResult.json();
        setLoading(false);
        setCurrentNairaValue(data.nairaValue);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUserDiscount = async () => {
      try {
        const fetchResult = await fetch(
          `${baseUrl()}/metrics/get-user-discount`,
          matricOptions,
        );
        if (!fetchResult.ok) {
          setNewErr("An error occured while fetching user airtime discount");
          setLoading(false);
          return;
        }
        const data = await fetchResult.json();
        setLoading(false);
        setCurrentUserDiscount(data.userDiscount);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchMarchantDiscount = async () => {
      try {
        const fetchResult = await fetch(
          `${baseUrl()}/metrics/get-marchant-discount`,
          matricOptions,
        );
        if (!fetchResult.ok) {
          setNewErr("Error occured while fetching marchant discount");
          setLoading(false);
          return;
        }
        const data = await fetchResult.json();
        setLoading(false);
        setCurrentMarchantDiscount(data.marchantDiscount);
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
          setNewErr("Error occured while fetching marchant bonus");
          setLoading(false);
          return;
        }
        const data = await fetchResult.json();
        setLoading(false);
        setcurrentMarchantBonus(data.marchantBonus);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNairaValue();
    fetchUserDiscount();
    fetchMarchantDiscount();
    fetchMarchantBonus();
  }, [userStateChanged]);

  const handleNaira = (e) => {
    setNewNairaValue(e.target.value === "" ? "0" : e.target.value);
  };

  const handleUserDiscount = (e) => {
    setNewUserDiscount(e.target.value === "" ? "0" : e.target.value);
  };

  const handleMarchantDiscount = (e) => {
    setNewMarchantDiscount(e.target.value === "" ? "0" : e.target.value);
  };
  const handleMarchantBonus = (e) => {
    setNewMarchantBonus(e.target.value === "" ? "0" : e.target.value);
  };

  const nairaAmountBody = {
    amount: +newNairaValue,
  };

  const matricUpdateOptions1 = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nairaAmountBody),
  };

  const changeNairaValue = async () => {
    setLoading(true);
    try {
      const fetchResult = await fetch(
        `${baseUrl()}/metrics/update-naira-value`,
        matricUpdateOptions1,
      );
      if (!fetchResult.ok) {
        setLoading(false);
        setNewErr("Error occured while updating naira value");
        return;
      }
      await fetchResult.json();
      setLoading(false);
      setUserStateChanged(userStateChanged === true ? false : true);
    } catch (error) {
      console.log(error);
    }
  };

  const userDiscountBody = {
    amount: +newUserDiscount,
  };

  const matricUpdateOptions2 = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDiscountBody),
  };

  const changeUserDiscount = async () => {
    setLoading(true);
    try {
      const fetchResult = await fetch(
        `${baseUrl()}/metrics/update-user-discount`,
        matricUpdateOptions2,
      );
      if (!fetchResult.ok) {
        setLoading(false);
        setNewErr("Error occured while updating user discount");
        return;
      }
      await fetchResult.json();
      setLoading(false);
      setUserStateChanged(userStateChanged === true ? false : true);
    } catch (error) {
      console.log(error);
    }
  };

  const marchantDiscountBody = {
    amount: +newMarchantDiscount,
  };

  const matricUpdateOptions3 = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(marchantDiscountBody),
  };

  const changeMarchantDiscount = async () => {
    setLoading(true);
    try {
      const fetchResult = await fetch(
        `${baseUrl()}/metrics/update-marchant-disocunt`,
        matricUpdateOptions3,
      );
      if (!fetchResult.ok) {
        setLoading(false);
        setNewErr("Error occured while updating marchant discount");
        return;
      }
      await fetchResult.json();
      setLoading(false);
      setUserStateChanged(userStateChanged === true ? false : true);
    } catch (error) {
      console.log(error);
    }
  };

  const marchantBonusBody = {
    amount: +newMarchantBonus,
  };

  const matricUpdateOptions4 = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(marchantBonusBody),
  };

  const changeMarchantBonus = async () => {
    setLoading(true);
    try {
      const fetchResult = await fetch(
        `${baseUrl()}/metrics/update-marchant-bonus`,
        matricUpdateOptions4,
      );
      if (!fetchResult.ok) {
        setLoading(false);
        setNewErr("Error occured while updating marchant bonus");
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
    <div className="absolute top-20 left-2 md:left-80">
      <div className="flex items-center justify-center p-5">
        {loading && <Spinner />}
      </div>
      {newErr && <p className="text-center text-red-600">{newErr}</p>}
      <div className="">
        <div className="mb-5 flex flex-col gap-4 bg-blue-300 p-5 rounded-2xl">
          <div>
            <p>Current Naira Value: {currentNairaValue}</p>
          </div>
          <div className="flex gap-5 items-center">
            <div>
              <input
                onChange={handleNaira}
                className="shadow appearance-none border-b rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="newNairaValue"
                type="number"
                placeholder="New Naira Value"
                required
              ></input>
            </div>
            <div>
              <button
                onClick={changeNairaValue}
                className="bg-blue-500 p-3 rounded-3xl hover:bg-blue-700"
              >
                Change Naira Value
              </button>
            </div>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-4 bg-blue-300 p-5 rounded-2xl">
          <div>
            <p>Current User Discount on Airtime: {currentUserDiscount}%</p>
          </div>
          <div className="flex gap-5 items-center">
            <div>
              <input
                onChange={handleUserDiscount}
                className="shadow appearance-none border-b rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="newUserDiscount"
                type="number"
                placeholder="New User Discount"
                required
              ></input>
            </div>
            <div>
              <button
                onClick={changeUserDiscount}
                className="bg-blue-500 p-3 rounded-3xl hover:bg-blue-700"
              >
                Change User Discount
              </button>
            </div>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-4 bg-blue-300 p-5 rounded-2xl">
          <div>
            <p>
              Current Marchant Discount on Recharge: {currentMarchantDiscount}%
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <div>
              <input
                onChange={handleMarchantDiscount}
                className="shadow appearance-none border-b rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="newMarchantDiscount"
                type="number"
                placeholder="New Marchant Discount"
                required
              ></input>
            </div>
            <div>
              <button
                onClick={changeMarchantDiscount}
                className="bg-blue-500 p-3 rounded-3xl hover:bg-blue-700"
              >
                Change Marchant Discount
              </button>
            </div>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-4 bg-blue-300 p-5 rounded-2xl">
          <div>
            <p>Current Marchant Bonus: {currentMarchantBonus} Naira</p>
          </div>
          <div className="flex gap-5 items-center">
            <div>
              <input
                onChange={handleMarchantBonus}
                className="shadow appearance-none border-b rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="newMarchantBonus"
                type="number"
                placeholder="New Marchant Bonus"
                required
              ></input>
            </div>
            <div>
              <button
                onClick={changeMarchantBonus}
                className="bg-blue-500 p-3 rounded-3xl hover:bg-blue-700"
              >
                Change Marchant Bonus
              </button>
            </div>
          </div>
        </div>
        {/* {errMessage && <p>{errMessage}</p>}
        {successMessage && <p>{successMessage}</p>} */}
      </div>
    </div>
  );
}
