"use client";
import { useUser } from "@clerk/nextjs";
import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const UserContext = createContext(null);

// Context Provider Component
export const UserProvider = ({ children }) => {
  const { user } = useUser(); // Get user details from Clerk
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    if (user) {
      setUserdata({
        name: user.fullName || user.firstName, // Get full name
        email: user.primaryEmailAddress?.emailAddress, // Get email
      });
    }
  }, [user]);

  useEffect(() => {
    if(user && user.primaryEmailAddress){
      const useremail=encodeURIComponent(user.primaryEmailAddress?.emailAddress)
      fetch(`/api/user?email=${useremail}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("Fetched Users:", data);
        if(data && typeof data==="object"){
          setUserdata({ 
            ...userdata, 
           user_id:data.id
          });
        }
        // setFormData((prev) => ({ ...prev, user_id: data.user_id }));
      })
      .catch((error) => console.error("Error fetching users:", error));
    }
  }, [user])
  
  return (
    <UserContext.Provider value={{ userdata, setUserdata }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
