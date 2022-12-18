import { useContext } from "react";
import { TransactionContext } from "./contexts/transaction-context";
import { NavLink } from "react-router-dom";

function MenuItems() {
  const { setData, setTAmount, setNetwork_id, setTransactionPurpose } =
    useContext(TransactionContext);

  const resetHandler = () => {
    setData([]);
    setTAmount(0);
    setNetwork_id("");
    setTransactionPurpose("");
  };

  return (
    <div>
      <div key="/get-started" className="ml-10 border w-15 text-center h-7">
        <NavLink
          onClick={resetHandler}
          className="text-white hover:text-blue-300"
          to="/"
        >
          Home
        </NavLink>
      </div>
    </div>
  );
}

export default MenuItems;
