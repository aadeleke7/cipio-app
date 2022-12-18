import { createContext, useState, useEffect } from "react";
import baseUrl from "api/base-url";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [tAmount, setTAmount] = useState(0);
  const [address, setAddress] = useState("");
  const [coinPrice, setCoinPrice] = useState(0);
  const [nairaValue, setNairaValue] = useState(0);
  const [variation_id, setVariation_id] = useState("");
  const [network_id, setNetwork_id] = useState("");
  const [transactionPurpose, setTransactionPurpose] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const fetchCoinPrice = async () => {
      const res = await fetch(
        "https://api.pancakeswap.info/api/v2/tokens/0xe68626f79b5C4CFA9686A091d3303E4c624DFeCf",
      );
      const result = await res.json();

      setCoinPrice(() => parseFloat(result.data.price));
    };

    fetchCoinPrice();
  }, []);

  useEffect(() => {
    const fetchNairaValue = async () => {
      try {
        const fetchResult = await fetch(`${baseUrl()}/metrics/get-naira-value`);
        if (!fetchResult.ok) {
          console.log("Error occured while fetching data");
          return;
        }
        const data = await fetchResult.json();
        setNairaValue(data.nairaValue);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNairaValue();
  }, []);

  useEffect(() => {
    const fetchUserDiscount = async () => {
      try {
        const fetchResult = await fetch(
          `${baseUrl()}/metrics/get-user-discount`,
        );
        if (!fetchResult.ok) {
          console.log("Error occured while fetching data");
          return;
        }
        const data = await fetchResult.json();
        setDiscount((data.userDiscount + 100) / 100);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDiscount();
  }, []);

  const value = {
    data,
    setData,
    tAmount,
    setTAmount,
    address,
    setAddress,
    coinPrice,
    nairaValue,
    variation_id,
    setVariation_id,
    network_id,
    setNetwork_id,
    transactionPurpose,
    setTransactionPurpose,
    discount,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
