import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

/**
 * Empty State Component
 *
 * Displays when there's no data to show
 */
const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No content yet',
  message = 'Check back later for updates',
  icon = 'images-outline',
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color={theme.colors.text.tertiary} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xxl,
    minHeight: 200,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default EmptyState;
