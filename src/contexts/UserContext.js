import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState({});

  const checkLoginStatus = () => {
    fetch("http://localhost:3000/api/v1/logged_in", {
      credentials: "include",
    })
      .then((response) => {
        console.log("logged_in api response", response);
        return response.json();
      })
      .then((data) => {
        if (
          data.logged_in === true &&
          userStatus.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          setUserStatus({ loggedInStatus: "LOGGED_IN", user: data.user });
        } else if (
          !data.logged_in &
          (userStatus.loggedInStatus === "LOGGED_IN")
        ) {
          setUserStatus({ loggedInStatus: "NOT_LOGGED_IN", user: {} });
        }
        console.log("user logged in?", data);
      })
      .catch((error) => {
        console.log("check login error", error);
      });
  };
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
    <UserContext.Provider
      value={{ userStatus, handleSuccessfulAuth, checkLoginStatus }}
    >
      {children}
    </UserContext.Provider>
  );
};
