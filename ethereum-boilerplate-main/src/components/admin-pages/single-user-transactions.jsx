export default function SingleUserTransaction({ data }) {
  const {
    _id,
    userId,
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
      <p>User ID: {userId}</p>
      <p>Transaction Details: {transactionDetails}</p>
      <p>Transaction Amount: {transactionAmount}</p>
      <p>Transaction Type: {transactionType}</p>
      <p>Transaction Date: {transactionDate}</p>
    </div>
  );
}
