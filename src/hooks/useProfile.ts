import { useState, useEffect, useCallback } from 'react';
import { UserProfile } from '../types';
import { profileService } from '../services';

interface UseProfileResult {
  profile: UserProfile | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch and manage user profile data
 *
 * @param userId - The user ID to fetch profile for
 * @returns Profile data, loading state, error, and refetch function
 */
export const useProfile = (userId: string = '1'): UseProfileResult => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await profileService.getUserProfile(userId);
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch profile'));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
  };
};
