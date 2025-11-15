import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { UserProfile } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

interface ProfileHeaderProps {
  profile: UserProfile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  const handleWebsitePress = () => {
    if (profile.website) {
      Linking.openURL(profile.website);
    }
  };

  // Handle both local images (require) and remote URLs
  const coverSource = typeof profile.coverImage === 'string'
    ? { uri: profile.coverImage }
    : profile.coverImage;

  const profilePictureSource = typeof profile.profilePicture === 'string'
    ? { uri: profile.profilePicture }
    : profile.profilePicture;

  return (
    <View style={styles.container}>
      {/* Cover Image */}
      <View style={styles.coverContainer}>
        <Image
          source={coverSource}
          style={styles.coverImage}
          contentFit="cover"
          transition={200}
        />
        <LinearGradient
          colors={theme.colors.gradient.overlay}
          style={styles.gradient}
        />
      </View>

      {/* Profile Info Section */}
      <View style={styles.profileSection}>
        <View style={styles.topRow}>
          {/* Profile Picture */}
          <View style={styles.profilePictureContainer}>
            <Image
              source={profilePictureSource}
              style={styles.profilePicture}
              contentFit="cover"
              transition={200}
            />
          </View>

          {/* Edit Profile Button and Menu */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton}>
              <Ionicons name="ellipsis-horizontal" size={20} color={theme.colors.text.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Name and Username */}
        <View style={styles.nameSection}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.username}>{profile.username}</Text>
        </View>

        {/* Bio */}
        <Text style={styles.bio}>{profile.bio}</Text>

        {/* Website Link */}
        {profile.website && (
          <TouchableOpacity onPress={handleWebsitePress} style={styles.websiteContainer}>
            <Ionicons name="link-outline" size={16} color={theme.colors.primary} style={styles.linkIcon} />
            <Text style={styles.website} numberOfLines={1}>
              {profile.website}
            </Text>
            <TouchableOpacity>
              <Text style={styles.seeMore}>See more</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profile.stats.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profile.stats.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profile.stats.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
  coverContainer: {
    height: 180,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
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
  profilePictureContainer: {
    borderWidth: 4,
    borderColor: theme.colors.white,
    borderRadius: theme.borderRadius.full,
    shadowColor: theme.colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: theme.colors.shadow.opacity.light,
    shadowRadius: theme.spacing.sm,
    elevation: 5,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.huge,
  },
  editButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.xl,
  },
  editButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  menuButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameSection: {
    marginBottom: theme.spacing.sm,
  },
  name: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  username: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.secondary,
  },
  bio: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
    lineHeight: 20,
  },
  websiteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  linkIcon: {
    marginRight: 4,
  },
  website: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.primary,
    flex: 1,
  },
  seeMore: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.primary,
    marginLeft: theme.spacing.sm,
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
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: theme.colors.border.light,
  },
});

export default ProfileHeader;
