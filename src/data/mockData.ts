import { UserProfile, Post } from '../types';

// Using local assets from Figma
const PROFILE_PICTURE = require('../../assets/images/banner.png');
const COVER_IMAGE = require('../../assets/images/banner.png');

export const mockUserProfile: UserProfile = {
  id: '1',
  name: 'Joy Alexander',
  username: 'J_Joy',
  bio: 'Better things are coming !!',
  website: 'https://yourdesignallypllike.framer...',
  profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  coverImage: COVER_IMAGE,
  stats: {
    posts: 124,
    followers: '12K',
    following: '2K',
  },
};

export const mockPosts: Post[] = [
  {
    id: '1',
    imageUrl: require('../../assets/images/Post-Preview-1.png'),
    type: 'post',
  },
  {
    id: '2',
    imageUrl: require('../../assets/images/Post-Preview-2.png'),
    type: 'post',
  },
  {
    id: '3',
    imageUrl: require('../../assets/images/Post-Preview-3.png'),
    type: 'post',
  },
  {
    id: '4',
    imageUrl: require('../../assets/images/Post-Preview-4.png'),
    type: 'post',
  },
  {
    id: '5',
    imageUrl: require('../../assets/images/Post-Preview-5.png'),
    type: 'post',
  },
  {
    id: '6',
    imageUrl: require('../../assets/images/Post-Preview-6.png'),
    type: 'post',
  },
  {
    id: '7',
    imageUrl: require('../../assets/images/Post-Preview-7.png'),
    type: 'post',
  },
  {
    id: '8',
    imageUrl: require('../../assets/images/Post-Preview-8.png'),
    type: 'post',
  },
];

export const mockClips: Post[] = [
  {
    id: 'c1',
    imageUrl: require('../../assets/images/Post-Preview-1.png'),
    type: 'clip',
  },
  {
    id: 'c2',
    imageUrl: require('../../assets/images/Post-Preview-2.png'),
    type: 'clip',
  },
];

export const mockTaggedPosts: Post[] = [
  {
    id: 't1',
    imageUrl: require('../../assets/images/Post-Preview-3.png'),
    type: 'tagged',
  },
  {
    id: 't2',
    imageUrl: require('../../assets/images/Post-Preview-4.png'),
    type: 'tagged',
  },
];

// Simulate API call with delay
export const fetchUserProfile = (): Promise<UserProfile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUserProfile);
    }, 500);
  });
};

export const fetchPosts = (type: 'post' | 'clip' | 'tagged'): Promise<Post[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (type) {
        case 'clip':
          resolve(mockClips);
          break;
        case 'tagged':
          resolve(mockTaggedPosts);
          break;
        default:
          resolve(mockPosts);
      }
    }, 300);
  });
};
