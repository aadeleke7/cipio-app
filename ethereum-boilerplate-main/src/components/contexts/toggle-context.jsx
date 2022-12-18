import { createContext, useState } from "react";

export const ToggleContext = createContext();

export const ToggleProvider = ({ children }) => {
  const [paymentPopupToggle, setPaymentPopupToggle] = useState(false);
  const [mainMenuToggle, setMainMenuToggle] = useState(false);
  const [subMenuToggle, setSubMenuToggle] = useState(false);

  const value = {
    paymentPopupToggle,
    setPaymentPopupToggle,
    mainMenuToggle,
    setMainMenuToggle,
    subMenuToggle,
    setSubMenuToggle,
  };

  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  );
};
