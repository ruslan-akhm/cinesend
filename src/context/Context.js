import { useState, createContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [person, setPerson] = useState("");
  const [page, setPage] = useState(1);

  return (
    <UserContext.Provider
      value={{
        person,
        setPerson,
        page,
        setPage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
