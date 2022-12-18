import { useContext, useEffect } from "react";
import { useMoralis, useNativeBalance } from "react-moralis";
import { TransactionContext } from "../components/contexts/transaction-context";

function NativeBalance(props) {
  const { data: balance } = useNativeBalance(props);
  const { account, isAuthenticated } = useMoralis();
  const { setAddress } = useContext(TransactionContext);

  useEffect(() => {
    setAddress(account);
  }, [account]);

  if (!account || !isAuthenticated) return null;

  // console.log(balance);

  return (
    <div style={{ textAlign: "center", whiteSpace: "nowrap" }}>
      {balance.formatted}
    </div>
  );
}

export default NativeBalance;
