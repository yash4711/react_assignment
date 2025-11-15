import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

type NavItem = 'home' | 'search' | 'add' | 'messages' | 'profile';

interface BottomNavigationProps {
  activeItem?: NavItem;
  onItemPress?: (item: NavItem) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeItem = 'profile',
  onItemPress,
}) => {
  const navItems: { key: NavItem; icon: keyof typeof Ionicons.glyphMap; activeIcon: keyof typeof Ionicons.glyphMap }[] = [
    { key: 'home', icon: 'home-outline', activeIcon: 'home' },
    { key: 'search', icon: 'search-outline', activeIcon: 'search' },
    { key: 'add', icon: 'add-circle', activeIcon: 'add-circle' },
    { key: 'messages', icon: 'chatbubble-outline', activeIcon: 'chatbubble' },
    { key: 'profile', icon: 'person-outline', activeIcon: 'person' },
  ];

  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const isActive = activeItem === item.key;
        const iconName = isActive ? item.activeIcon : item.icon;

        return (
          <TouchableOpacity
            key={item.key}
            style={styles.navItem}
            onPress={() => onItemPress?.(item.key)}
            activeOpacity={0.7}
          >
            {item.key === 'add' ? (
              <Ionicons name={iconName} size={36} color={theme.colors.primary} />
            ) : (
              <Ionicons
                name={iconName}
                size={24}
                color={isActive ? theme.colors.primary : theme.colors.text.tertiary}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    shadowColor: theme.colors.shadow.color,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: theme.colors.shadow.opacity.light,
    shadowRadius: theme.spacing.sm,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomNavigation;
