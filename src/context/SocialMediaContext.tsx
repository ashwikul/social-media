import { createContext, Dispatch, SetStateAction } from "react";
import { PostType, UserData } from "../types";

// Define the context type including the state and setter functions
interface SocialMediaContextType {
  userData: UserData | null;
  setUserData: Dispatch<SetStateAction<UserData | null>>;
  posts: PostType[];
  setPosts: Dispatch<SetStateAction<PostType[]>>;
}

// Create the context with the correct type
export const SocialMediaContext = createContext<SocialMediaContextType>({
  userData: null,
  posts: [],
  setUserData: () => {},
  setPosts: () => {},
});
