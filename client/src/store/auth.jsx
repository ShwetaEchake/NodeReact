import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();  //context

const URL ="http://localhost:5000/api/auth/user";


export const AuthProvider = ({ children }) => {  //provider

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");

  const [services, setServices] = useState("");

  const  storeTokenInLs = (serverToken) => {
      setToken(serverToken);
      localStorage.setItem('token',serverToken);
  };

   let isLoggedIn = !! token;
  //  console.log("isLoggedIn", isLoggedIn);

  //tackling the logout functionality
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  // JWT AUTHENICATION - to get the currently loggedin user data

  const userAuthentication =  async () => {
    try {
      const response = await fetch(URL,{
        method:"GET",
        headers:{
          Authorization: `Bearer ${token}`
        },
    });

    if(response.ok){
      const data = await response.json();
      console.log("user data", data.userData);
      setUser(data.userData);
    }

    } catch (error) {
      console.log("Error fetching user data", error);
    }
  }

  const getServices = async () => {
     try {
      const response = await fetch("http://localhost:5000/api/data/service", {
         method: "GET",
        });

        if(response.ok){
          const data = await response.json(); //json to object
          console.log(data.msg);

          setServices(data.msg);

        }
     } catch (error) {
       console.log(`services frontend error:  ${error}`)
     }
  }

  useEffect(async () => {
    await getServices();
    await userAuthentication();
  }, []);


  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLs, LogoutUser, user , services }}>
        {children}
    </AuthContext.Provider>
  );
};

export  const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
      throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
}
