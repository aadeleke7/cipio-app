import { useContext } from "react";
import { TransactionContext } from "components/contexts/transaction-context";

const Form = () => {
  const { data, address, tAmount } = useContext(TransactionContext);

  return (
    <div className="select-none">
      <div className="mb-4 hidden">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="address"
          type="text"
          placeholder="network"
          name="address"
          value={address}
        ></input>
      </div>

      <div className="mb-4 hidden">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="transaction-amount"
          type="text"
          placeholder="network"
          name="transaction-amount"
          value={tAmount}
        ></input>
      </div>

      {data.network && (
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="network"
            type="text"
            placeholder="network"
            name="networkName"
            value={data.network}
          ></input>
        </div>
      )}
      {data.amount && (
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            type="text"
            placeholder="Username"
            name="amount"
            value={data.amount}
          ></input>
        </div>
      )}
      {data.number && (
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="number"
            type="number"
            placeholder="Username"
            name="number"
            value={data.number}
          ></input>
        </div>
      )}
      {data.plan && (
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="number"
            type="text"
            placeholder="plan"
            name="plan"
            value={data.plan}
          ></input>
        </div>
      )}
      {data.name && (
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="number"
            type="text"
            placeholder="Username"
            name="name"
            value={data.name}
          ></input>
        </div>
      )}
      {data.iD && (
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="number"
            type="number"
            placeholder="Username"
            name="id"
            value={data.iD}
          ></input>
        </div>
      )}
      {data.package && (
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="number"
            type="text"
            placeholder="Username"
            name="package"
            value={data.package}
          ></input>
        </div>
      )}
      {data.smartCardNumber && (
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="number"
            type="number"
            placeholder="Username"
            name="smartCardNumber"
            value={data.smartCardNumber}
          ></input>
        </div>
      )}
    </div>
  );
};

export default Form;
