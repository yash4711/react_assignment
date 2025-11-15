import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Post, ImageSource } from '../types';
import { Ionicons } from '@expo/vector-icons';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';
import SkeletonLoader from './SkeletonLoader';
import ImagePreviewModal from './ImagePreviewModal';
import { theme } from '../theme';

interface PostGridProps {
  posts: Post[];
  loading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  onRefresh?: () => void;
  refreshing?: boolean;
}

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 6) / 3; // 3 columns with 2px gaps

const PostGrid: React.FC<PostGridProps> = ({
  posts,
  loading,
  error,
  onRetry,
  onRefresh,
  refreshing,
}) => {
  const [selectedImage, setSelectedImage] = useState<ImageSource | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const handleImagePress = (imageUrl: ImageSource) => {
    setSelectedImage(imageUrl);
    setIsPreviewVisible(true);
  };

  const handleClosePreview = () => {
    setIsPreviewVisible(false);
    setTimeout(() => setSelectedImage(null), 300); // Clear after animation
  };

  const renderItem = ({ item }: { item: Post }) => {
    // Handle both local images (require) and remote URLs
    const imageSource = typeof item.imageUrl === 'string'
      ? { uri: item.imageUrl }
      : item.imageUrl;

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        activeOpacity={0.8}
        onPress={() => handleImagePress(item.imageUrl)}
      >
        <Image
          source={imageSource}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        {item.type === 'clip' && (
          <View style={styles.clipBadge}>
            <Ionicons name="play" size={16} color={theme.colors.white} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderLoadingSkeleton = () => (
    <View style={styles.skeletonContainer}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <SkeletonLoader
          key={item}
          width={ITEM_SIZE}
          height={ITEM_SIZE}
          borderRadius={0}
          style={styles.skeletonItem}
        />
      ))}
    </View>
  );

  // Show loading skeleton
  if (loading && posts.length === 0) {
    return renderLoadingSkeleton();
  }

  // Show error state
  if (error && posts.length === 0) {
    return (
      <ErrorState
        title="Failed to load posts"
        message={error.message || 'Unable to fetch posts. Please try again.'}
        onRetry={onRetry}
        icon="images-outline"
      />
    );
  }

  // Show empty state
  if (posts.length === 0) {
    return (
      <EmptyState
        title="No posts yet"
        message="Posts will appear here once they're published"
        icon="images-outline"
      />
    );
  }

  return (
    <>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false} // Disable nested scrolling
      />

      {/* Image Preview Modal */}
      {selectedImage && (
        <ImagePreviewModal
          visible={isPreviewVisible}
          imageSource={selectedImage}
          onClose={handleClosePreview}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80, // Space for bottom navigation
  },
  row: {
    gap: 2,
    marginBottom: 2,
  },
  itemContainer: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  clipBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeletonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    paddingBottom: 80,
  },
  skeletonItem: {
    marginBottom: 2,
  },
});

export default PostGrid;
