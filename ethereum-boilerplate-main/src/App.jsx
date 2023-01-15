import { useEffect, useContext } from "react";
import { UserContext } from "components/contexts/auth-context";

import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { CompatRouter, CompatRoute } from "react-router-dom-v5-compat";

// import NativeBalance from "components/NativeBalance";
// import Account from "components/Account/Account";
// import Chains from "components/Chains";

import "antd/dist/antd.css";
import "./style.css";
// import QuickStart from "components/QuickStart";
// import MenuItems from "./components/MenuItems";
import BuyAirtime from "components/buy-airtime/buy-airtime.component";
import BuyData from "components/buy-data/buy-data.component";
import ConfirmationPage from "components/confirmation-page/confirmation-page.component";
import TvSubscription from "components/tv-subscription-page/tv-subscription-page.component";
import Betting from "components/betting/betting.component";
// import pic from "./images/logo.png";
// import { TransactionContext } from "components/contexts/transaction-context";
import ReferalForm from "components/referal-form/referal-fom.component";
import SignUp from "components/auth/sign-up.component";
import Dashboard from "components/dashboard/dashboard.component";
import Login from "components/auth/login.component";
import TransactionHistory from "components/transaction-history/transaction-history";
import MarchantSignUp from "components/auth/marchant-register";
import MarchantLogin from "components/auth/marchant-login";
import MarchantTransfers from "components/marchant-transfer/transfers";
import AdminLogin from "components/auth/admin-login";
import UsersPage from "components/admin-pages/users";
import MarchantsPage from "components/admin-pages/marchants";
import UsersTransactions from "components/admin-pages/users-transactions";
import MarchantTransactions from "components/admin-pages/marchants-transactions";
import MarchantsApprovalPage from "components/admin-pages/approve-marchant";
import MetricsPage from "components/admin-pages/matrics";
import HomePage from "components/home-page/home-page";
import UserEnterEmail from "components/email-folder/user-enter-email";
import MarchantEnterEmail from "components/email-folder/marchant-enter-email";
import UserForgotPassword from "components/email-folder/user-forgot-password";
import MarchantForgotPassword from "components/email-folder/marchant-forgot-password";
import TermsOfUse from "components/term-of-use/terms-of-use";
import ContactUs from "components/contact-us/contact-us";

window.onbeforeunload = function () {
  localStorage.removeItem("user");
  return "";
};

const App = () => {
  const { user, setUser } = useContext(UserContext);
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    const localStorageUserData = window.localStorage.getItem("user");
    setUser(JSON.parse(localStorageUserData));
  }, []);

  const userActive =
    user === null
      ? ""
      : user === {}
      ? ""
      : Object.keys(user).length === 0
      ? ""
      : Object.keys(user).length;

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <div>
      <div>
        <Router>
          <CompatRouter>
            {userActive && <Dashboard />}
            <div>
              <Switch>
                <CompatRoute
                  path="/"
                  component={userActive ? HomePage : Login}
                />
              </Switch>
            </div>
            <Route exact path="/buy-airtime">
              {!userActive ? <Redirect to="/" /> : <BuyAirtime />}
            </Route>
            <Route exact path="/buy-data">
              {!userActive ? <Redirect to="/" /> : <BuyData />}
            </Route>
            <Route path="/confirmation-page">
              {!userActive ? <Redirect to="/" /> : <ConfirmationPage />}
            </Route>
            <Route path="/cable-tv-subscription">
              {!userActive ? <Redirect to="/" /> : <TvSubscription />}
            </Route>
            <Route path="/betting">
              {!userActive ? <Redirect to="/" /> : <Betting />}
            </Route>
            <Route path="/referral-form">
              {!userActive ? <Redirect to="/" /> : <ReferalForm />}
            </Route>
            <Route path="/sign-up">
              {userActive ? <Redirect to="/" /> : <SignUp />}
            </Route>
            <Route path="/transaction-history">
              {!userActive ? <Redirect to="/" /> : <TransactionHistory />}
            </Route>
            <Route path="/marchant-sign-up">
              {userActive ? <Redirect to="/" /> : <MarchantSignUp />}
            </Route>
            <Route path="/marchant-login">
              {userActive ? <Redirect to="/" /> : <MarchantLogin />}
            </Route>
            <Route path="/marchant-transfers">
              {!userActive ? <Redirect to="/" /> : <MarchantTransfers />}
            </Route>
            <Route path="/admin-login">
              {userActive ? <Redirect to="/" /> : <AdminLogin />}
            </Route>
            <Route path="/admin-users">
              {!userActive ? <Redirect to="/" /> : <UsersPage />}
            </Route>
            <Route path="/admin-marchants">
              {!userActive ? <Redirect to="/" /> : <MarchantsPage />}
            </Route>
            <Route path="/admin-users-transactions">
              {!userActive ? <Redirect to="/" /> : <UsersTransactions />}
            </Route>
            <Route path="/admin-marchants-transactions">
              {!userActive ? <Redirect to="/" /> : <MarchantTransactions />}
            </Route>
            <Route path="/admin-approve-marchant">
              {!userActive ? <Redirect to="/" /> : <MarchantsApprovalPage />}
            </Route>
            <Route path="/metrics-page">
              {!userActive ? <Redirect to="/" /> : <MetricsPage />}
            </Route>
            <Route path="/user-enter-email">
              {userActive ? <Redirect to="/" /> : <UserEnterEmail />}
            </Route>
            <Route path="/marchant-enter-email">
              {userActive ? <Redirect to="/" /> : <MarchantEnterEmail />}
            </Route>
            <Route path="/user-forgot-password">
              {userActive ? <Redirect to="/" /> : <UserForgotPassword />}
            </Route>
            <Route path="/marchant-forgot-password">
              {userActive ? <Redirect to="/" /> : <MarchantForgotPassword />}
            </Route>
            <Route path="/terms-of-use">
              {userActive ? <Redirect to="/" /> : <TermsOfUse />}
            </Route>
            <Route path="/contact-us">
              {!userActive ? <Redirect to="/" /> : <ContactUs />}
            </Route>
          </CompatRouter>
        </Router>
      </div>
    </div>
  );
};

export default App;

{
  /* <div className="w-full">
              <div className="">
                <div className="bg-blue-700 h-40 w-full flex justify-start flex-col items-center">
                  <img className="w-20 md:mt-4 mt-9" src={pic} alt="logo" />
                  <p className="text-white mt-2">CIPIO (CIPI)</p>
                  <p className="text-white">Easy, Fast, Secure</p>
                </div>
                <div className="pb-5 pl-3 bg-blue-700 text-white">
                  <p className="mb-2 flex gap-2">
                    <span>Current CIPIO Price:</span>
                    <span>${coinPrice.toFixed(3)}</span>
                  </p>
                  <p className="mb-2 flex gap-2">
                    <span>Current Naira/Dollar Value:</span>
                    <span>₦{nairaValue}/1$</span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:flex md:gap-3 md:items-center pt-7 md:pt-0 md:pb-10 md:justify-between bg-blue-700 md:h-24 w-full md:w-170 h-40">
                <div>
                  <MenuItems />
                </div>
                <div className="mr-10 md:mr-0">
                  <Account className="text-black" />
                </div>
                <div className="md:mr-1 ml-10">
                  <Chains />
                </div>
                <div className="flex gap-2 md:mr-6 text-white font-medium">
                  <p>Balance:</p>
                  <NativeBalance />
                </div>
              </div>
            </div> */
}
