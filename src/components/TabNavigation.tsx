import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabType } from '../types';
import { theme } from '../theme';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: { key: TabType; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { key: 'posts', label: 'Posts', icon: 'grid-outline' },
    { key: 'clips', label: 'Clips', icon: 'play-circle-outline' },
    { key: 'tagged', label: 'Tagged', icon: 'person-outline' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <React.Fragment key={tab.key}>
          <TouchableOpacity
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => onTabChange(tab.key)}
          >
            <Ionicons
              name={tab.icon}
              size={20}
              color={activeTab === tab.key ? theme.colors.primary : theme.colors.text.tertiary}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
          {index < tabs.length - 1 && <View style={styles.divider} />}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 6,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.tertiary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  activeTabText: {
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  divider: {
    width: 1,
    backgroundColor: theme.colors.border.light,
    marginVertical: 10,
  },
});

export default TabNavigation;
