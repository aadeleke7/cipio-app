export default function SingleTransaction({ data }) {
  const {
    _id,
    transactionDetails,
    transactionType,
    transactionDate,
    transactionAmount,
  } = data;
  return (
    <div
      style={{
        backgroundColor: transactionType === "credit" ? "green" : "red",
      }}
      className="w-full rounded-2xl p-5 text-white"
    >
      <p>Transaction ID: {_id}</p>
      <p>Transaction Details: {transactionDetails}</p>
      <p>Transaction Amount: {transactionAmount}</p>
      <p>Transaction Type: {transactionType}</p>
      <p>Transaction Date: {transactionDate}</p>
    </div>
  );
}
