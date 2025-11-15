import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonLoader from './SkeletonLoader';
import { theme } from '../theme';

/**
 * Profile Skeleton Component
 *
 * Loading skeleton for the profile screen
 */
const ProfileSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Cover Image Skeleton */}
      <SkeletonLoader height={180} borderRadius={0} />

      {/* Profile Section */}
      <View style={styles.profileSection}>
        {/* Profile Picture */}
        <View style={styles.topRow}>
          <SkeletonLoader width={80} height={80} borderRadius={40} />
          <View style={styles.buttonGroup}>
            <SkeletonLoader width={120} height={36} borderRadius={theme.borderRadius.xl} />
            <SkeletonLoader width={36} height={36} borderRadius={18} style={styles.menuButton} />
          </View>
        </View>

        {/* Name and Username */}
        <View style={styles.nameSection}>
          <SkeletonLoader width={150} height={24} style={styles.nameSkeleton} />
          <SkeletonLoader width={80} height={16} />
        </View>

        {/* Bio */}
        <SkeletonLoader width="90%" height={16} style={styles.bioSkeleton} />
        <SkeletonLoader width="70%" height={16} style={styles.bioSkeleton} />

        {/* Website */}
        <SkeletonLoader width={200} height={16} style={styles.websiteSkeleton} />

        {/* Stats */}
        <View style={styles.statsContainer}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.statItem}>
              <SkeletonLoader width={60} height={20} style={styles.statNumber} />
              <SkeletonLoader width={50} height={14} />
            </View>
          ))}
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.tab}>
              <SkeletonLoader width={60} height={16} />
            </View>
          ))}
        </View>

        {/* Grid Skeleton */}
        <View style={styles.gridContainer}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <SkeletonLoader
              key={item}
              width={(100 / 3) - 2}
              height={120}
              borderRadius={theme.borderRadius.xs}
              style={styles.gridItem}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  profileSection: {
    paddingHorizontal: theme.spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: -40,
    marginBottom: theme.spacing.md,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.huge,
  },
  menuButton: {
    marginLeft: theme.spacing.sm,
  },
  nameSection: {
    marginBottom: theme.spacing.sm,
  },
  nameSkeleton: {
    marginBottom: theme.spacing.xs,
  },
  bioSkeleton: {
    marginBottom: theme.spacing.xs,
  },
  websiteSkeleton: {
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: theme.spacing.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.border.light,
    marginBottom: theme.spacing.lg,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    marginBottom: theme.spacing.xs,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
    marginBottom: theme.spacing.lg,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  gridItem: {
    marginBottom: 2,
  },
});

export default ProfileSkeleton;
