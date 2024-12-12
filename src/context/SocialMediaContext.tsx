import React, { createContext } from "react";

interface SocialMediaContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SocialMediaContext = createContext<
  SocialMediaContextType | undefined
>(undefined);
