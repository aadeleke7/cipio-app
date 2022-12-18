import { useContext } from "react";
import { UserContext } from "components/contexts/auth-context";
import gif from "../../images/promotional.gif";

export default function HomePage() {
  const { user, newBalance } = useContext(UserContext);
  return (
    <div className="absolute top-24 left-0 md:left-80 bg-zinc-200 p-5 md:w-160 w-screen rounded-xl flex flex-col gap-4 shadow-2xl">
      <p>Welcome {user.name}</p>
      {user.role === "Admin" || (
        <div>
          <p>
            <span>Main Balance: </span>
            <span>
              {user.role === "User" ? "CIPIO" : "UNITS"} {newBalance.toFixed(4)}
            </span>
          </p>
        </div>
      )}
      <img className="w-full mt-10" src={gif} alt="gif" />
    </div>
  );
}
