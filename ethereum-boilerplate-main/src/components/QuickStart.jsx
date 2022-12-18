import { useNavigate } from "react-router-dom-v5-compat";

export default function QuickStart() {
  let navigate = useNavigate();

  const navigateToAirtime = () => {
    navigate("/buy-airtime", { replace: true });
  };

  const navigateToData = () => {
    navigate("/buy-data", { replace: true });
  };

  const navigateToCaleSubscription = () => {
    navigate("/cable-tv-subscription", { replace: true });
  };

  const navigateToBetting = () => {
    navigate("/betting", { replace: true });
  };

  const navigateToReferralForm = () => {
    navigate("/referral-form", { replace: true });
  };

  return (
    <div className="flex justify-center bg-blue-200 absolute top-28 left-80">
      <div className="p-10 grid grid-cols-2 md:grid-cols-3 h-96 gap-4 w-96 md:w-170">
        <div
          onClick={navigateToAirtime}
          className="text-white font-bold text-lg bg-slate-600 rounded-lg transition-all hover:scale-105 flex justify-center items-center cursor-pointer"
        >
          Buy Airtime
        </div>
        <div
          onClick={navigateToData}
          className="text-white font-bold text-lg bg-slate-600 rounded-lg transition-all hover:scale-105 flex justify-center items-center cursor-pointer"
        >
          Buy Data
        </div>
        <div
          onClick={navigateToCaleSubscription}
          className="text-white font-bold text-lg bg-slate-600 rounded-lg transition-all hover:scale-105 flex justify-center items-center cursor-pointer"
        >
          TV Cable
        </div>
        <div
          onClick={navigateToBetting}
          className="text-white font-bold text-lg bg-slate-600 rounded-lg transition-all hover:scale-105 flex justify-center items-center cursor-pointer"
        >
          Betting
        </div>
        <div
          onClick={navigateToReferralForm}
          className="text-white font-bold text-lg bg-slate-600 rounded-lg transition-all hover:scale-105 flex justify-center items-center cursor-pointer"
        >
          Referral Form
        </div>
      </div>
    </div>
  );
}
