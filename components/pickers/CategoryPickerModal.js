import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeProvider';
import { Layout } from '../../constants/Layout';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../constants/Categories';

export const CategoryPickerModal = ({
  visible,
  onClose,
  onSelect,
  type = 'expense', // 'expense' or 'income'
  selectedCategory,
}) => {
  const { colors } = useTheme();

  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const getCategoryIcon = (iconName) => {
    const iconMap = {
      cart: 'shopping-cart',
      coffee: 'coffee',
      car: 'truck',
      'shopping-bag': 'shopping-bag',
      film: 'film',
      receipt: 'file-text',
      heart: 'heart',
      book: 'book',
      'more-horizontal': 'more-horizontal',
      briefcase: 'briefcase',
      'trending-up': 'trending-up',
      'pie-chart': 'pie-chart',
      gift: 'gift',
    };
    return iconMap[iconName] || 'circle';
  };

  const handleSelect = (category) => {
    onSelect(category);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.modalContent, { backgroundColor: colors.card }]}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.text }]}>
              Select Category
            </Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.categoriesList}>
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryItem,
                    isSelected && [
                      styles.categoryItemSelected,
                      { backgroundColor: colors.primaryLight },
                    ],
                    { borderBottomColor: colors.border },
                  ]}
                  onPress={() => handleSelect(category.id)}
                >
                  <View
                    style={[
                      styles.categoryIcon,
                      {
                        backgroundColor: isSelected
                          ? colors.primary
                          : colors.primaryLight,
                      },
                    ]}
                  >
                    <Feather
                      name={getCategoryIcon(category.icon)}
                      size={20}
                      color={isSelected ? '#FFFFFF' : colors.primary}
                    />
                  </View>
                  <Text
                    style={[
                      styles.categoryName,
                      {
                        color: isSelected ? colors.primary : colors.text,
                      },
                    ]}
                  >
                    {category.name}
                  </Text>
                  {isSelected && (
                    <Feather name="check" size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: Layout.borderRadius.xl,
    borderTopRightRadius: Layout.borderRadius.xl,
    paddingTop: Layout.spacing.xxl,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.xxl,
    marginBottom: Layout.spacing.lg,
  },
  title: {
    fontSize: Layout.fontSize.xl,
    fontWeight: '600',
  },
  categoriesList: {
    paddingHorizontal: Layout.spacing.xxl,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.lg,
    borderBottomWidth: 1,
  },
  categoryItemSelected: {
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Layout.spacing.md,
    marginHorizontal: -Layout.spacing.md,
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.lg,
  },
  categoryName: {
    flex: 1,
    fontSize: Layout.fontSize.md,
    fontWeight: '500',
  },
});

export default CategoryPickerModal;
