import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import useLocalStorage from '../hooks/useLocalStorage';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const history = useHistory();

  const LSKey = 's11d2';
  const [loggedInUser, setLoggedInUser] = useLocalStorage(LSKey, {});
  const [apiError, setApiError] = useLocalStorage('apiErr', null);

  const isUserLoggedIn = loggedInUser.hasOwnProperty('token');
  const login = (loginInfo) => {
    axios
      .post('https://nextgen-project.onrender.com/api/s11d2/login', loginInfo)
      .then(function (response) {
        // console.log(response);
        history.push('/friends');
        setLoggedInUser(response.data);
        setApiError(null);
      })
      .catch(function (error) {
        console.log(error);
        setApiError(error);
      });
  };

  const logOut = () => {
    history.push('/');
    setLoggedInUser({});
  };

  // console.log('CONTETETN SELAMLAR', isUserLoggedIn);

  return (
    <AuthContext.Provider
      value={{
        login,
        logOut,
        isUserLoggedIn,
        loggedInUser,
        apiError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
