import { createContext, useState } from "react";

export const initialValue = {
  isSidebarOpen: false,
};

const GeneralContextProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <GeneralContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export const GeneralContext = createContext();
export default GeneralContextProvider;
