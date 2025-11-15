import { UserProfile, Post } from '../../types';
import { mockUserProfile, mockPosts, mockClips, mockTaggedPosts } from '../../data/mockData';

/**
 * Profile Service
 *
 * In a real application, this would use the apiClient to make HTTP requests.
 * For this assignment, we're using mock data with simulated network delays.
 */

class ProfileService {
  /**
   * Fetches user profile data
   * In production: apiClient.get<UserProfile>(API_ENDPOINTS.profile.getProfile(userId))
   *
   * Note: 2-second delay added for demo purposes to showcase skeleton loading UI
   */
  async getUserProfile(userId: string = '1'): Promise<UserProfile> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUserProfile);
      }, 2000); // 2 seconds - increased for demo
    });
  }

  /**
   * Fetches posts based on type
   * In production: apiClient.get<Post[]>(API_ENDPOINTS.posts.getPosts(userId, type))
   *
   * Note: 1.5-second delay added for demo purposes to showcase skeleton loading UI
   */
  async getPosts(
    userId: string = '1',
    type: 'post' | 'clip' | 'tagged' = 'post'
  ): Promise<Post[]> {
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
      }, 1500); // 1.5 seconds - increased for demo
    });
  }

  /**
   * Updates user profile
   * In production: apiClient.put<UserProfile>(API_ENDPOINTS.profile.updateProfile(userId), data)
   */
  async updateProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...mockUserProfile, ...data });
      }, 500);
    });
  }
}

export const profileService = new ProfileService();
