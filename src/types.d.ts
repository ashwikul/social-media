interface GalleryItem {
  url: string;
  type: "image" | "video"; // Allow only "image" or "video" as valid types
}

// Define the Post type
export interface PostType {
  postId: string;
  userId: string;
  caption: string;
  gallery: GalleryItem[];
  likes: number;
  timestamp: { seconds: number; nanoseconds: number };
}

export interface UserData {
  userId: string;
  name?: string;
  bio?: string;
  photoURL?: string;
  heroURL?: string;
}
