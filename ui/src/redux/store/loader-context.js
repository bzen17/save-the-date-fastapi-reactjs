import React, { useContext, useEffect } from "react";

const LoaderContext = React.createContext({
  isLoading: true,
  setIsLoading: (loader) => {},
});

export const LoaderContextProvider = (props) => {
  const [isLoading, setIsLoading] = React.useState(true);

  const onLoading = (loader) => {
    setIsLoading(loader)
  };
  return (
    <LoaderContext.Provider
      value={{
        isLoading: isLoading,
        setIsLoading: onLoading,
      }}
    >
      {props.children}
    </LoaderContext.Provider>
  );
};
export const useLoader = () => {
  return useContext(LoaderContext);
};
