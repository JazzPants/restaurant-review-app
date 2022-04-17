import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState({});

  //TODO update parent component
  //redirect user //this.props.histroy.push("/dashboard")
  const handleSuccessfulAuth = (data) => {
    handleLogin(data);
    navigate("/dashboard");
  };

  const handleLogin = (data) => {
    setUserStatus({
      loggedInStatus: "LOGGED_IN",
      user: data,
    });
  };

  useEffect(() => {
    setUserStatus({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    });
  }, []);
  return (
    <UserContext.Provider value={{ userStatus, handleSuccessfulAuth }}>
      {children}
    </UserContext.Provider>
  );
};
