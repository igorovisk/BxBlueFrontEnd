import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

function checkIfLoggedIn() {
   const loginToken = localStorage.getItem("tokenObj") || "";
   if (loginToken) {
      const parsedToken = JSON.parse(loginToken) || {};

      if (new Date(parsedToken.expirationDate) >= new Date()) {
         return true;
      } else {
         return false;
      }
   } else return false;
}
export const AuthContext = createContext({
   handleLogin: (email: string, password: string) => {},
   handleLogout: () => {},
   isLogged: false,
});

//AUTHCONTEXT PROVIDER COMPONENT THAT WILL WRAP THE ENTIRE APP.
export const AuthProvider = (props: any) => {
   const [isLogged, setIsLogged] = useState<boolean>(checkIfLoggedIn());

   // LOGIN FUNCTION TO BE PASSED TO COMPONENTS BY CONTEXT
   async function handleLogin(email: string, password: string) {
      try {
         await axios
            .post("http://localhost:3000/login", {
               email: email,
               password: password,
            })
            .then((res: any) => {
               setIsLogged(true);

               const tokenObj = {
                  token: res.data.token,
                  userId: res.data._id,
                  name: res.data.name,
                  auth: res.data.auth,
                  expirationDate: res.data.expirationDate,
               };

               localStorage.setItem("tokenObj", JSON.stringify(tokenObj));

               // window.location.href = "/home";
            });
      } catch (err: any) {
         console.log(err.message, "error");
      }
   }

   // LOGOUT FUNCTION
   function handleLogout() {
      localStorage.setItem("tokenObj", "");
   }

   //CONTEXT VALUE TO BE PASSED TO PROVIDER AND BE ACESSED BY OTHER COMPONENTS (value attribute is like a custom prop in a custom component)
   const authContextValue = {
      handleLogin,
      isLogged,
      handleLogout,
   };

   //RETURNS PROVIDER WITH VALUE PROP
   return (
      <AuthContext.Provider value={authContextValue}>
         {props.children}
      </AuthContext.Provider>
   );
};

export const storageToken = () => {
   const storageToken = localStorage.getItem("tokenObj") || "";
   const userToken = JSON.parse(storageToken).token;
   return userToken;
};
//CUSTOM HOOK TO MAKE IMPORT EASIER. USAGE EXAMPLE: const authcontext = useAuth()
export const useAuth = () => useContext(AuthContext);
