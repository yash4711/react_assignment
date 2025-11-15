// Image source can be a URL string or a require() import
export type ImageSource = string | number;

export interface Post {
  id: string;
  imageUrl: ImageSource;
  type: 'post' | 'clip' | 'tagged';
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  bio: string;
  website: string;
  profilePicture: ImageSource;
  coverImage: ImageSource;
  stats: {
    posts: number;
    followers: string;
    following: string;
  };
}

export type TabType = 'posts' | 'clips' | 'tagged';
