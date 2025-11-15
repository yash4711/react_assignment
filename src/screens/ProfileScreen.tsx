import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileHeader from '../components/ProfileHeader';
import TabNavigation from '../components/TabNavigation';
import PostGrid from '../components/PostGrid';
import BottomNavigation from '../components/BottomNavigation';
import ProfileSkeleton from '../components/ProfileSkeleton';
import ErrorState from '../components/ErrorState';
import { TabType } from '../types';
import { useProfile, usePosts, useRefresh } from '../hooks';
import { theme } from '../theme';

const ProfileScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('posts');

  // Custom hooks for data fetching
  const { profile, loading: profileLoading, error: profileError, refetch: refetchProfile } = useProfile();
  const { posts, loading: postsLoading, error: postsError, refetch: refetchPosts } = usePosts(activeTab);
  const { refreshing, onRefresh } = useRefresh();

  const handleRefresh = async () => {
    await onRefresh(async () => {
      await Promise.all([refetchProfile(), refetchPosts()]);
    });
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleRetry = () => {
    refetchProfile();
  };

  // Show loading skeleton on initial load
  if (profileLoading && !profile) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
        <ProfileSkeleton />
      </SafeAreaView>
    );
  }

  // Show error state if profile failed to load
  if (profileError && !profile) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
        <ErrorState
          title="Failed to load profile"
          message={profileError.message || 'Unable to fetch profile data. Please try again.'}
          onRetry={handleRetry}
        />
      </SafeAreaView>
    );
  }

  // If no profile data and not loading, show error
  if (!profile) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
        <ErrorState
          title="Profile not found"
          message="Unable to load profile data"
          onRetry={handleRetry}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={theme.colors.primary}
              colors={[theme.colors.primary]}
            />
          }
          stickyHeaderIndices={[1]}
        >
          <ProfileHeader profile={profile} />
          <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          <PostGrid
            posts={posts}
            loading={postsLoading}
            error={postsError}
            onRetry={refetchPosts}
          />
        </ScrollView>
      </View>
      <BottomNavigation activeItem="profile" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
});

export default ProfileScreen;
