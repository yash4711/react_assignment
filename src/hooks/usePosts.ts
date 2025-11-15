import { useState, useEffect, useCallback } from 'react';
import { Post, TabType } from '../types';
import { profileService } from '../services';

interface UsePostsResult {
  posts: Post[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch and manage posts based on tab type
 *
 * @param tabType - The type of posts to fetch (posts, clips, tagged)
 * @param userId - The user ID to fetch posts for
 * @returns Posts data, loading state, error, and refetch function
 */
export const usePosts = (
  tabType: TabType = 'posts',
  userId: string = '1'
): UsePostsResult => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setPosts([]); // Clear posts immediately when fetching starts
      const type = tabType === 'posts' ? 'post' : tabType === 'clips' ? 'clip' : 'tagged';
      const data = await profileService.getPosts(userId, type);
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch posts'));
    } finally {
      setLoading(false);
    }
  }, [tabType, userId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
  };
};
