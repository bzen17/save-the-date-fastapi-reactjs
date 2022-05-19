import React, { useContext, useEffect,useMemo } from "react";
import { login, getCurrentUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
const AuthContext = React.createContext({
  isLoggedIn: false,
  isLoading: true,
  onLogout: () => {},
  onLogin: async (username, password, loader) => {},
  user: {}
});

export const AuthContextProvider = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState({});
  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    if (token) {
      getCurrentUser(JSON.parse(token))
        .then((res) => {
          if (res.status === 200) {
            setIsLoggedIn(true);
            setIsLoading(false);
            console.log(res.data);
            setUser(res.data);
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
  const loginHandler = async (username, password,loader) => {
    const token = await login({ username, password }).catch((err) => {
      console.log(err);
      loader.setIsLoading(false);
    });
    localStorage.setItem(
      "tokenStore",
      JSON.stringify({
        ...token.data,
        created_at: Date.now(),
      })
    );
    
    setIsLoggedIn(true);
    loader.setIsLoading(false);
    navigate("/");
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isLoading: isLoading,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        user: user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
