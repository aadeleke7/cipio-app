import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "components/contexts/auth-context";
import { ToggleContext } from "components/contexts/toggle-context";
import { useNavigate } from "react-router-dom-v5-compat";
import PaymentPopUp from "components/payment-pop-up/payment-pop-up.component";
import IdleTimer from "react-idle-timer";
import baseUrl from "api/base-url";
import logo from "../../images/logo.jpg";
import servicesImage from "../../images/services.jpg";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const idleTimerRef = useRef(null);
  const { setUser, user, userStateChanged, setNewBalance } =
    useContext(UserContext);
  const {
    paymentPopupToggle,
    setPaymentPopupToggle,
    mainMenuToggle,
    setMainMenuToggle,
    subMenuToggle,
    setSubMenuToggle,
  } = useContext(ToggleContext);

  const balanceOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  };

  const fetchBalanceURL =
    user.role === "User"
      ? `${baseUrl()}/transactions/get-user-balance?userId=${user.id}`
      : `${baseUrl()}/transactions/get-marchant-balance?marchantId=${user.id}`;

  useEffect(() => {}, [window.location.pathname]);

  const path = window.location.pathname;

  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        const fetchResult = await fetch(fetchBalanceURL, balanceOptions);
        if (!fetchResult.ok) {
          console.log("Error occured while fetching data");
          return;
        }
        const data = await fetchResult.json();
        setBalance(data.balance);
        setNewBalance(data.balance);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserBalance();
  }, [userStateChanged]);

  const togglePaymentPopup = () => {
    setMainToggleToFalse();
    setSubMenuToFalse();
    if (paymentPopupToggle) {
      setPaymentPopupToggle(false);
    } else {
      setPaymentPopupToggle(true);
    }
  };

  let navigate = useNavigate();

  const navigateToUserLogin = () => {
    navigate("/", { replace: true });
    setMainToggleToFalse();
  };

  const navigateToAirtime = () => {
    navigate("/buy-airtime", { replace: true });
    setMainToggleToFalse();
  };

  const navigateToData = () => {
    navigate("/buy-data", { replace: true });
    setMainToggleToFalse();
  };

  const navigateToCaleSubscription = () => {
    navigate("/cable-tv-subscription", { replace: true });
    setMainToggleToFalse();
  };

  const navigateToBetting = () => {
    navigate("/betting", { replace: true });
    setMainToggleToFalse();
  };

  const navigateToReferralForm = () => {
    navigate("/referral-form", { replace: true });
    setMainToggleToFalse();
  };

  const navigateToTransactionHistory = () => {
    navigate("/transaction-history", { replace: true });
    setMainToggleToFalse();
  };

  const navigateToMarchantLogin = () => {
    navigate("/marchant-login", { replace: true });
    setMainToggleToFalse();
  };

  const navigateToAdminLogin = () => {
    navigate("/admin-login", { replace: true });
    setMainToggleToFalse();
  };

  const navigateToMarchantTransfers = () => {
    navigate("/marchant-transfers", { replace: true });
    setMainToggleToFalse();
  };

  const navigateToUsersPage = () => {
    navigate("/admin-users", { replace: true });
    setMainToggleToFalse();
  };

  const navigateToMarchantsPage = () => {
    navigate("/admin-marchants", { replace: true });
    setMainToggleToFalse();
  };

  const navigateToUsersTransactionsPage = () => {
    navigate("/admin-users-transactions", { replace: true });
    setMainToggleToFalse();
  };

  const navigateToMarchantsTransactionPage = () => {
    navigate("/admin-marchants-transactions", { replace: true });
    setMainToggleToFalse();
  };

  const navigateToMarchantApprovalPage = () => {
    navigate("/admin-approve-marchant", { replace: true });
    setMainToggleToFalse();
  };

  const navigateToMetricsPage = () => {
    navigate("/metrics-page", { replace: true });
    setMainToggleToFalse();
  };

  const navigateToHomePage = () => {
    navigate("/", { replace: true });
    setMainToggleToFalse();
  };

  const navigateToContactUs = () => {
    navigate("/contact-us", { replace: true });
    setMainToggleToFalse();
  };

  const logout = () => {
    setMainToggleToFalse();
    setSubMenuToFalse();
    window.localStorage.removeItem("user");
    setUser({});
    user.role === "User"
      ? navigateToUserLogin()
      : user.role === "Marchant"
      ? navigateToMarchantLogin()
      : navigateToAdminLogin();
  };

  const handleInactivity = () => {
    logout();
  };

  function toggleMainMenu() {
    setSubMenuToFalse();
    setPaymentPopupToggle(false);
    setMainMenuToggle(mainMenuToggle === true ? false : true);
  }

  function toggleSubMenu() {
    setPaymentPopupToggle(false);
    setMainToggleToFalse();
    setSubMenuToggle(subMenuToggle === true ? false : true);
  }

  function setMainToggleToFalse() {
    setMainMenuToggle(false);
  }

  function setSubMenuToFalse() {
    setSubMenuToggle(false);
  }

  function styling(realPath) {
    return {
      backgroundColor: path === realPath && "#a5d8ff",
      borderLeftWidth: path === realPath && "2px",
      borderColor: path === realPath && "#1971c2",
    };
  }

  return (
    <div className="w-screen h-screen">
      {paymentPopupToggle && <PaymentPopUp />}
      <div className="flex justify-between w-full h-full bg-zinc-50">
        <IdleTimer
          ref={idleTimerRef}
          timeout={180 * 1000}
          onIdle={handleInactivity}
        ></IdleTimer>
        <div>
          <div className="pl-2 md:pl-0 w-full flex justify-center items-center gap-2 h-20 text-xl md:bg-zinc-200">
            {mainMenuToggle && (
              <div
                className="cursor-pointer pt-2 md:hidden"
                onClick={toggleMainMenu}
              >
                <ion-icon name="close-outline" size="large"></ion-icon>
              </div>
            )}
            {!mainMenuToggle && (
              <div
                className="cursor-pointer pt-2 md:hidden"
                onClick={toggleMainMenu}
              >
                <ion-icon name="menu-outline" size="large"></ion-icon>
              </div>
            )}
            <img className="w-16 my-2" src={logo} alt="logo" />
          </div>

          <div className="bg-zinc-200 text-zinc-500 w-52 pl-2 h-screen hidden md:block">
            {user.role === "Admin" && (
              <ul>
                <li className="flex justify-center">
                  <button
                    style={styling("/admin-users")}
                    onClick={navigateToUsersPage}
                    className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                  >
                    ALL USERS
                  </button>
                </li>
                <li className="flex justify-center">
                  <button
                    style={styling("/admin-marchants")}
                    onClick={navigateToMarchantsPage}
                    className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                  >
                    ALL MARCHANTS
                  </button>
                </li>
                <li className="flex justify-center">
                  <button
                    style={styling("/admin-users-transactions")}
                    onClick={navigateToUsersTransactionsPage}
                    className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                  >
                    USER TRANSACTIONS
                  </button>
                </li>
                <li className="flex justify-center">
                  <button
                    style={styling("/admin-marchants-transactions")}
                    onClick={navigateToMarchantsTransactionPage}
                    className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                  >
                    MARCHANT TRANSACTIONS
                  </button>
                </li>
                <li className="flex justify-center">
                  <button
                    style={styling("/admin-approve-marchant")}
                    onClick={navigateToMarchantApprovalPage}
                    className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                  >
                    APPROVE/DISAPPROVE MARCHANTS
                  </button>
                </li>
                <li className="flex justify-center">
                  <button
                    style={styling("/metrics-page")}
                    onClick={navigateToMetricsPage}
                    className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                  >
                    SEE/CHANGE METRICS
                  </button>
                </li>
              </ul>
            )}

            {user.role === "Admin" || (
              <ul>
                <li className="flex justify-center">
                  <button
                    style={styling("/")}
                    onClick={navigateToHomePage}
                    className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                  >
                    HOME
                  </button>
                </li>
                <li className="flex justify-center">
                  <button
                    style={styling("/transaction-history")}
                    onClick={navigateToTransactionHistory}
                    className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                  >
                    TRANSACTION HISTORY
                  </button>
                </li>
                {user.role === "Marchant" && (
                  <li className="flex justify-center">
                    <button
                      style={styling("/marchant-transfers")}
                      onClick={navigateToMarchantTransfers}
                      className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                    >
                      TRANSFER FUNDS TO ANOTHER MARCHANT
                    </button>
                  </li>
                )}

                <li className="flex justify-center">
                  <button
                    style={styling("/buy-airtime")}
                    onClick={navigateToAirtime}
                    className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                  >
                    BUY AIRTIME
                  </button>
                </li>
                <li className="flex justify-center">
                  <button
                    style={styling("/buy-data")}
                    onClick={navigateToData}
                    className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                  >
                    BUY DATA
                  </button>
                </li>
                <li className="flex justify-center">
                  <button
                    style={styling("/cable-tv-subscription")}
                    onClick={navigateToCaleSubscription}
                    className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                  >
                    CABLE SUBSCRIPTION
                  </button>
                </li>
                <li className="flex justify-center">
                  <button
                    style={styling("/betting")}
                    onClick={navigateToBetting}
                    className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                  >
                    BETTING
                  </button>
                </li>
                <li className="flex justify-center">
                  <button
                    style={styling("/referral-form")}
                    onClick={navigateToReferralForm}
                    className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                  >
                    REFERRAL FORM
                  </button>
                </li>
                <li className="flex justify-center">
                  <button
                    style={styling("/contact-us")}
                    onClick={navigateToContactUs}
                    className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                  >
                    CONTACT US
                  </button>
                </li>
              </ul>
            )}
            <img className="w-full mt-10" src={servicesImage} alt="services" />
          </div>

          {mainMenuToggle && (
            <div className="absolute z-40 w-screen h-screen bg-opacity-30 bg-black"></div>
          )}
          {subMenuToggle && (
            <div className="absolute z-40 w-screen h-screen bg-opacity-30 bg-black"></div>
          )}

          {mainMenuToggle && (
            <div className="bg-zinc-200 text-zinc-500 w-52 pl-2 h-screen absolute md:hidden z-50">
              {user.role === "Admin" && (
                <ul>
                  <li className="flex justify-center">
                    <button
                      style={styling("/admin-users")}
                      onClick={navigateToUsersPage}
                      className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                    >
                      ALL USERS
                    </button>
                  </li>
                  <li className="flex justify-center">
                    <button
                      style={styling("/admin-marchants")}
                      onClick={navigateToMarchantsPage}
                      className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                    >
                      ALL MARCHANTS
                    </button>
                  </li>
                  <li className="flex justify-center">
                    <button
                      style={styling("/admin-users-transactions")}
                      onClick={navigateToUsersTransactionsPage}
                      className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                    >
                      USER TRANSACTIONS
                    </button>
                  </li>
                  <li className="flex justify-center">
                    <button
                      style={styling("/admin-marchants-transactions")}
                      onClick={navigateToMarchantsTransactionPage}
                      className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                    >
                      MARCHANT TRANSACTIONS
                    </button>
                  </li>
                  <li className="flex justify-center">
                    <button
                      style={styling("/admin-approve-marchant")}
                      onClick={navigateToMarchantApprovalPage}
                      className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                    >
                      APPROVE/DISAPPROVE MARCHANTS
                    </button>
                  </li>
                  <li className="flex justify-center">
                    <button
                      style={styling("/metrics-page")}
                      onClick={navigateToMetricsPage}
                      className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                    >
                      SEE/CHANGE METRICS
                    </button>
                  </li>
                </ul>
              )}

              {user.role === "Admin" || (
                <ul>
                  <li className="flex justify-center">
                    <button
                      style={styling("/")}
                      onClick={navigateToHomePage}
                      className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                    >
                      HOME
                    </button>
                  </li>
                  <li className="flex justify-center">
                    <button
                      style={styling("/transaction-history")}
                      onClick={navigateToTransactionHistory}
                      className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                    >
                      TRANSACTION HISTORY
                    </button>
                  </li>
                  {user.role === "Marchant" && (
                    <li className="flex justify-center">
                      <button
                        style={styling("/marchant-transfers")}
                        onClick={navigateToMarchantTransfers}
                        className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                      >
                        TRANSFER FUNDS TO ANOTHER MARCHANT
                      </button>
                    </li>
                  )}

                  <li className="flex justify-center">
                    <button
                      style={styling("/buy-airtime")}
                      onClick={navigateToAirtime}
                      className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                    >
                      BUY AIRTIME
                    </button>
                  </li>
                  <li className="flex justify-center">
                    <button
                      style={styling("/buy-data")}
                      onClick={navigateToData}
                      className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                    >
                      BUY DATA
                    </button>
                  </li>
                  <li className="flex justify-center">
                    <button
                      style={styling("/cable-tv-subscription")}
                      onClick={navigateToCaleSubscription}
                      className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                    >
                      CABLE SUBSCRIPTION
                    </button>
                  </li>
                  <li className="flex justify-center">
                    <button
                      style={styling("/betting")}
                      onClick={navigateToBetting}
                      className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                    >
                      BETTING
                    </button>
                  </li>
                  <li className="flex justify-center">
                    <button
                      style={styling("/referral-form")}
                      onClick={navigateToReferralForm}
                      className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                    >
                      REFERRAL FORM
                    </button>
                  </li>
                  <li className="flex justify-center">
                    <button
                      style={styling("/contact-us")}
                      onClick={navigateToContactUs}
                      className="h-12 bg-zinc-300 w-full hover:border-l-2 hover:border-l-blue-800 text-blue-800 hover:bg-blue-200 font-bold"
                    >
                      CONTACT US
                    </button>
                  </li>
                </ul>
              )}
              <img
                className="w-full mt-10"
                src={servicesImage}
                alt="services"
              />
            </div>
          )}
        </div>
        <div className="flex md:pt-2 pt-5 pr-5 pl-5">
          <div className="flex md:justify-end">
            <div className="flex gap-8 md:gap-24">
              {user.role === "Admin" || (
                <div>
                  <button
                    onClick={togglePaymentPopup}
                    className="w-32 h-10 border-2 border-blue-800 text-blue-800 rounded-xl shadow-xl font-bold"
                  >
                    Recharge Wallet
                  </button>
                </div>
              )}
              {user.role === "Admin" || (
                <div>
                  <div className="md:flex flex-col items-center bg-green-400 rounded-lg p-1 shadow-lg hidden">
                    <p>Main Balance</p>
                    <p>
                      {user.role === "User" ? "CIPIO" : "UNITS"}{" "}
                      {balance.toFixed(4)}
                    </p>
                  </div>
                </div>
              )}

              <div
                className="md:hidden pt-1 cursor-pointer"
                onClick={toggleSubMenu}
              >
                <div className="">
                  <ion-icon
                    size="large"
                    name="person-circle-outline"
                  ></ion-icon>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="flex gap-24">
                  <div>
                    <div className="flex flex-col">
                      <p>{user.name}</p>
                      {user.role === "Admin" || <p>Customer ID: {user.id}</p>}
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={logout}
                      className="w-32 h-10 border-2 border-blue-800 text-blue-800"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>

              {subMenuToggle && (
                <div className="md:hidden absolute top-20 right-1 z-50">
                  <div className="flex flex-col gap-5 bg-blue-300 p-10 rounded-md">
                    <div>
                      <div className="flex flex-col gap-2">
                        <p>{user.name}</p>
                        {user.role === "Admin" || <p>Customer ID: {user.id}</p>}
                      </div>
                    </div>
                    {user.role === "Admin" || (
                      <div>
                        <p>
                          <span>Main Balance: </span>
                          <span>
                            {user.role === "User" ? "CIPIO" : "UNITS"}{" "}
                            {balance.toFixed(4)}
                          </span>
                        </p>
                      </div>
                    )}
                    <div>
                      <button
                        onClick={logout}
                        className="w-32 h-10 border-2 border-blue-800 text-blue-800"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
