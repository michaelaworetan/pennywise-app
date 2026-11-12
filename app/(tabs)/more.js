import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthProvider';
import { useTheme } from '../../context/ThemeProvider';
import { Card } from '../../components/ui/Card';
import { Layout } from '../../constants/Layout';

export default function MoreScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { colors, toggleTheme, themeMode } = useTheme();

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  const handleThemeChange = () => {
    const next = themeMode === 'light' ? 'dark' : 'light';
    toggleTheme(next);
  };

  const menuItems = [
    {
      title: 'PREFERENCES',
      items: [
        { icon: 'bell', label: 'Push notifications', action: () => {}, hasToggle: true, value: true },
        { icon: 'mail', label: 'Weekly email summary', action: () => {}, hasToggle: true, value: false },
        { icon: 'sun', label: 'Appearance', action: handleThemeChange, subtitle: themeMode === 'light' ? 'Light' : 'Dark' },
      ],
    },
    {
      title: 'SECURITY',
      items: [
        { icon: 'shield', label: 'Biometric login', action: () => {}, hasToggle: true, value: true },
        { icon: 'lock', label: 'Change password', action: () => {} },
      ],
    },
    {
      title: 'SUPPORT & LEGAL',
      items: [
        { icon: 'help-circle', label: 'Help & support', action: () => {} },
        { icon: 'file-text', label: 'Privacy policy', action: () => {} },
      ],
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <TouchableOpacity
            style={styles.profileContent}
            onPress={() => router.push('/profile/edit')}
          >
            <View style={[styles.avatar, { backgroundColor: colors.primaryLight }]}>
              <Feather name="user" size={32} color={colors.primary} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.text }]}>
                {user?.fullName || 'Alex Morgan'}
              </Text>
              <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>
                Member since November 2026
              </Text>
            </View>
            <Feather name="chevron-right" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </Card>

        {/* Menu Sections */}
        {menuItems.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              {section.title}
            </Text>
            <Card>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.menuItem,
                    itemIndex < section.items.length - 1 && [
                      styles.menuItemBorder,
                      { borderBottomColor: colors.border },
                    ],
                  ]}
                  onPress={item.action}
                >
                  <View style={styles.menuItemLeft}>
                    <Feather name={item.icon} size={20} color={colors.text} />
                    <View style={styles.menuItemText}>
                      <Text style={[styles.menuItemLabel, { color: colors.text }]}>
                        {item.label}
                      </Text>
                      {item.subtitle && (
                        <Text style={[styles.menuItemSubtitle, { color: colors.textSecondary }]}>
                          {item.subtitle}
                        </Text>
                      )}
                    </View>
                  </View>
                  
                  {item.hasToggle ? (
                    <View
                      style={[
                        styles.toggle,
                        {
                          backgroundColor: item.value ? colors.primary : colors.disabled,
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.toggleThumb,
                          { transform: [{ translateX: item.value ? 18 : 0 }] },
                        ]}
                      />
                    </View>
                  ) : (
                    <Feather name="chevron-right" size={20} color={colors.textSecondary} />
                  )}
                </TouchableOpacity>
              ))}
            </Card>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.card }]}
          onPress={handleLogout}
        >
          <Feather name="log-out" size={20} color={colors.error} />
          <Text style={[styles.logoutText, { color: colors.error }]}>Log out</Text>
          <Text style={[styles.version, { color: colors.textTertiary }]}>v1.0.0</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileCard: {
    margin: Layout.spacing.xxl,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.lg,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: Layout.fontSize.lg,
    fontWeight: '600',
    marginBottom: Layout.spacing.xs,
  },
  profileEmail: {
    fontSize: Layout.fontSize.sm,
  },
  section: {
    marginBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.xs,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.xxl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Layout.spacing.lg,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    marginLeft: Layout.spacing.lg,
    flex: 1,
  },
  menuItemLabel: {
    fontSize: Layout.fontSize.md,
  },
  menuItemSubtitle: {
    fontSize: Layout.fontSize.sm,
    marginTop: 2,
  },
  toggle: {
    width: 42,
    height: 24,
    borderRadius: 12,
    padding: 2,
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Layout.spacing.xxl,
    padding: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.lg,
  },
  logoutText: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
    flex: 1,
    marginLeft: Layout.spacing.lg,
  },
  version: {
    fontSize: Layout.fontSize.sm,
  },
  bottomSpace: {
    height: Layout.spacing.xxl,
  },
});
