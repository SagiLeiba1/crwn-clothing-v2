import { createContext, useEffect, useState } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

//storage - actual value you want to access
export const UserContext= createContext({
    currentUser : null,
    setCurrentUser: () => null
});

//actual component
export const UserProvider = ({ children }) => {
    const [currentUser , setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect( () => {
        const unSubscribe = onAuthStateChangedListener( (user)=> {
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })
        return unSubscribe;
    }, []);
    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}