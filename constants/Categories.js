export const EXPENSE_CATEGORIES = [
  { id: 'groceries', name: 'Groceries', icon: 'cart', color: '#10B981' },
  { id: 'food-drink', name: 'Food & drink', icon: 'coffee', color: '#F59E0B' },
  { id: 'transport', name: 'Transport', icon: 'car', color: '#3B82F6' },
  { id: 'shopping', name: 'Shopping', icon: 'shopping-bag', color: '#EC4899' },
  { id: 'entertainment', name: 'Entertainment', icon: 'film', color: '#8B5CF6' },
  { id: 'bills', name: 'Bills', icon: 'receipt', color: '#EF4444' },
  { id: 'health', name: 'Health', icon: 'heart', color: '#14B8A6' },
  { id: 'education', name: 'Education', icon: 'book', color: '#6366F1' },
  { id: 'other', name: 'Other', icon: 'more-horizontal', color: '#6B7280' },
];

export const INCOME_CATEGORIES = [
  { id: 'salary', name: 'Salary', icon: 'briefcase', color: '#10B981' },
  { id: 'freelance', name: 'Freelance', icon: 'trending-up', color: '#3B82F6' },
  { id: 'investment', name: 'Investment', icon: 'pie-chart', color: '#8B5CF6' },
  { id: 'gift', name: 'Gift', icon: 'gift', color: '#EC4899' },
  { id: 'other', name: 'Other', icon: 'more-horizontal', color: '#6B7280' },
];

export const getCategoryById = (id) => {
  const allCategories = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];
  return allCategories.find(cat => cat.id === id) || EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1];
};

export const getCategoryIcon = (categoryId) => {
  const category = getCategoryById(categoryId);
  return category.icon;
};

export default {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  getCategoryById,
  getCategoryIcon,
};
