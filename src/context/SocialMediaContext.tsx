import React, { createContext } from "react";

interface SocialMediaContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  uid: string;
  setUid: React.Dispatch<React.SetStateAction<string>>;
  userData: [];
  setUserData;
}

export const SocialMediaContext = createContext<
  SocialMediaContextType | undefined
>(undefined);
