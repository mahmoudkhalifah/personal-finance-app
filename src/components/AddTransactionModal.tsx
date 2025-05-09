import React, { useState, useMemo } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import COLORS from '../constants/Colors';
import { TransactionType } from './TransactionList';
import { capitalize } from '../utils/strings';

enum TransactionCategory {
  Food = 'Food',
  Rent = 'Rent',
  Groceries = 'Groceries',
  Entertainment = 'Entertainment',
  Other = 'Other',
}

interface AddTransactionModalProps {
  isVisible: boolean;
  onClose: () => void;
}

interface FormData {
  title: string;
  type: TransactionType;
  category?: TransactionCategory;
  amount: string;
  date: string;
}

interface FormErrors {
  title?: string;
  type?: string;
  category?: string;
  amount?: string;
  date?: string;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isVisible, onClose }) => {
  const initialFormData: FormData = {
    title: '',
    type: TransactionType.Expense,
    category: undefined,
    amount: '',
    date: new Date().toISOString().split('T')[0],
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const isFormValid = useMemo(() => {
    const hasTitle = formData.title.trim().length > 0;
    const hasAmount = formData.amount.trim().length > 0 && !isNaN(Number(formData.amount));
    const hasCategory = formData.type === TransactionType.Expense ? !!formData.category : true;
    const hasDate = formData.date.trim().length > 0;

    return hasTitle && hasAmount && hasCategory && hasDate;
  }, [formData]);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({
        ...formData,
        date: selectedDate.toISOString().split('T')[0],
      });
    }
  };

  const handleAmountChange = (text: string) => {
    // Remove any non-numeric characters except decimal point
    const numericValue = text.replace(/[^0-9.]/g, '');

    // Ensure only one decimal point
    const parts = numericValue.split('.');
    if (parts.length > 2) {
      return;
    }

    setFormData({ ...formData, amount: numericValue });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (formData.type === TransactionType.Expense && !formData.category) {
      newErrors.category = 'Category is required for expenses';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      handleOnClose();
    }
  };

  const handleOnClose = () => {
    setFormData(initialFormData);
    onClose();
  };


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Transaction</Text>
            <TouchableOpacity onPress={handleOnClose}>
              <Icon name="close" size={24} color={COLORS.gray[600]} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formContainer} contentContainerStyle={styles.formContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={[styles.input, errors.title && styles.inputError]}
                value={formData.title}
                onChangeText={(text) => setFormData({ ...formData, title: text })}
                placeholder="Enter transaction title"
              />
              {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Type</Text>
              <View style={styles.typeContainer}>
                {Object.values(TransactionType).map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeButton,
                      formData.type === type && styles.typeButtonActive,
                    ]}
                    onPress={() => setFormData({ ...formData, type })}
                  >
                    <Text style={[
                      styles.typeButtonText,
                      formData.type === type && styles.typeButtonTextActive,
                    ]}>{capitalize(type)}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {formData.type === TransactionType.Expense && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Category</Text>
                <View style={styles.categoryContainer}>
                  {Object.values(TransactionCategory).map((category) => (
                    <TouchableOpacity
                      key={category}
                      style={[
                        styles.categoryButton,
                        formData.category === category && styles.categoryButtonActive,
                      ]}
                      onPress={() => setFormData({ ...formData, category })}
                    >
                      <Text style={[
                        styles.categoryButtonText,
                        formData.category === category && styles.categoryButtonTextActive,
                      ]}>{category}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Amount</Text>
              <View style={styles.amountContainer}>
                <TextInput
                  style={[styles.amountInput, errors.amount && styles.inputError]}
                  value={formData.amount}
                  onChangeText={handleAmountChange}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                  maxLength={12}
                />
              </View>
              {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>{formData.date}</Text>
                <Icon name="calendar" size={20} color={COLORS.gray[600]} />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={new Date(formData.date)}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                !isFormValid && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={!isFormValid}
            >
              <Text style={[
                styles.submitButtonText,
                !isFormValid && styles.submitButtonTextDisabled,
              ]}>Add Transaction</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray[600],
  },
  formContainer: {
    flex: 1,
  },
  formContent: {
    paddingBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.gray[600],
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: COLORS.expense,
  },
  errorText: {
    color: COLORS.expense,
    fontSize: 12,
    marginTop: 4,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: COLORS.income,
    borderColor: COLORS.income,
  },
  typeButtonText: {
    color: COLORS.gray[600],
    fontSize: 16,
  },
  typeButtonTextActive: {
    color: COLORS.white,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.gray[300],
  },
  categoryButtonActive: {
    backgroundColor: COLORS.income,
    borderColor: COLORS.income,
  },
  categoryButtonText: {
    color: COLORS.gray[600],
    fontSize: 14,
  },
  categoryButtonTextActive: {
    color: COLORS.white,
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: 8,
    padding: 12,
  },
  dateText: {
    fontSize: 16,
    color: COLORS.gray[600],
  },
  submitButton: {
    backgroundColor: COLORS.income,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.gray[300],
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButtonTextDisabled: {
    color: COLORS.gray[500],
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: 8,
  },
  currencySymbol: {
    fontSize: 16,
    color: COLORS.gray[600],
    marginRight: 4,
  },
  amountInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: COLORS.gray[600],
  },
});

export default AddTransactionModal;
