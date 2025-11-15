import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

/**
 * Error State Component
 *
 * Displays when data fetching fails
 */
const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to load data',
  message = 'Something went wrong. Please try again.',
  onRetry,
  icon = 'alert-circle-outline',
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color={theme.colors.text.tertiary} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Ionicons name="refresh-outline" size={20} color={theme.colors.white} style={styles.icon} />
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xxl,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 22,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  icon: {
    marginRight: theme.spacing.sm,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
  },
});

export default ErrorState;
