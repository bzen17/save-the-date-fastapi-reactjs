import React, { useContext, useEffect } from "react";
import { login, getCurrentUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
  isLoggedIn: false,
  isLoading: true,
  onLogout: () => {},
  onLogin: async (username, password) => {},
});

export const AuthContextProvider = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    if (token) {
      getCurrentUser(JSON.parse(token))
        .then((res) => {
          if (res.status === 200) {
            setIsLoggedIn(true);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoggedIn(false);
          setIsLoading(false);
          localStorage.removeItem("tokenStore");
        });
    } else {
      setIsLoading(false);
    }
  }, []);
  const logoutHandler = () => {
    localStorage.removeItem("tokenStore");
    setIsLoggedIn(false);
  };
  const loginHandler = async (username, password) => {
    const token = await login({ username, password });
    localStorage.setItem(
      "tokenStore",
      JSON.stringify({
        ...token.data,
        created_at: Date.now(),
      })
    );
    setIsLoggedIn(true);
    navigate("/");
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isLoading: isLoading,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
