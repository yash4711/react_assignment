import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { ImageSource } from '../types';
import { theme } from '../theme';

interface ImagePreviewModalProps {
  visible: boolean;
  imageSource: ImageSource;
  onClose: () => void;
}

const { width, height } = Dimensions.get('window');

/**
 * Image Preview Modal Component
 *
 * Displays a full-screen image preview with a close button
 */
const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  visible,
  imageSource,
  onClose,
}) => {
  // Handle both local images (require) and remote URLs
  const source = typeof imageSource === 'string'
    ? { uri: imageSource }
    : imageSource;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="rgba(0, 0, 0, 0.95)" />

        {/* Close Button */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          activeOpacity={0.8}
        >
          <View style={styles.closeButtonInner}>
            <Ionicons name="close" size={28} color={theme.colors.white} />
          </View>
        </TouchableOpacity>

        {/* Full Screen Image */}
        <TouchableOpacity
          style={styles.imageContainer}
          activeOpacity={1}
          onPress={onClose}
        >
          <Image
            source={source}
            style={styles.image}
            contentFit="contain"
            transition={200}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  closeButtonInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height,
  },
});

export default ImagePreviewModal;
