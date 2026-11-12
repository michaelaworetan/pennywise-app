import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeProvider';
import { Button } from '../ui/Button';
import { Layout } from '../../constants/Layout';

export const DatePickerModal = ({ visible, onClose, onSelect, initialDate }) => {
  const { colors } = useTheme();
  const [selectedDate, setSelectedDate] = useState(initialDate || new Date());

  // For React Native, we'll use a simple date selector
  // In production, use @react-native-community/datetimepicker
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  const handleConfirm = () => {
    onSelect(selectedDate);
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
            <Text style={[styles.title, { color: colors.text }]}>Select Date</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.dateDisplay}>
            <Text style={[styles.dateText, { color: colors.text }]}>
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>

          <View style={styles.quickOptions}>
            <TouchableOpacity
              style={[styles.quickOption, { backgroundColor: colors.primaryLight }]}
              onPress={() => setSelectedDate(new Date())}
            >
              <Text style={[styles.quickOptionText, { color: colors.primary }]}>
                Today
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickOption, { backgroundColor: colors.primaryLight }]}
              onPress={() => {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                setSelectedDate(yesterday);
              }}
            >
              <Text style={[styles.quickOptionText, { color: colors.primary }]}>
                Yesterday
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actions}>
            <Button
              title="Cancel"
              onPress={onClose}
              variant="outline"
              style={styles.button}
            />
            <Button
              title="Confirm"
              onPress={handleConfirm}
              style={styles.button}
            />
          </View>
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
    padding: Layout.spacing.xxl,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.xxl,
  },
  title: {
    fontSize: Layout.fontSize.xl,
    fontWeight: '600',
  },
  dateDisplay: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.xxl,
    marginBottom: Layout.spacing.lg,
  },
  dateText: {
    fontSize: Layout.fontSize.lg,
    textAlign: 'center',
  },
  quickOptions: {
    flexDirection: 'row',
    gap: Layout.spacing.md,
    marginBottom: Layout.spacing.xxl,
  },
  quickOption: {
    flex: 1,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
  },
  quickOptionText: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: Layout.spacing.md,
  },
  button: {
    flex: 1,
  },
});

export default DatePickerModal;
