import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../constants/Colors';
import { capitalize } from '../utils/strings';

interface FilterBarProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  filters: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({ selectedFilter, onFilterChange, filters }) => {
  return (
    <View style={styles.container}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[styles.filterButton, selectedFilter === filter && styles.selectedFilter]}
          onPress={() => onFilterChange(filter)}
        >
          <Text style={[styles.filterText, selectedFilter === filter && styles.selectedFilterText]}>
            {capitalize(filter)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    gap: 10,
  },
  filterButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.gray[400],
  },
  selectedFilter: {
    backgroundColor: COLORS.income,
    borderColor: COLORS.income,
  },
  filterText: {
    fontSize: 16,
    color: COLORS.gray[600],
  },
  selectedFilterText: {
    color: '#fff',
  },
});

export default FilterBar;
