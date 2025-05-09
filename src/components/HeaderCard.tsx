import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import COLORS from '../constants/Colors';

interface HeaderCardProps {
  title: string;
  description?: string;
  amount: number;
  color: string;
  currency?: string;
}

const HeaderCard: React.FC<HeaderCardProps> = ({ title,description, amount, color,currency = 'EGP' }) => {
  const [displayedAmount, setDisplayedAmount] = useState('0');
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animatedValue.setValue(0);
    const animation = Animated.timing(animatedValue, {
      toValue: amount,
      useNativeDriver: false,
      duration: 2000,
    });

    const id = animatedValue.addListener(({ value }) => {
      setDisplayedAmount(value.toFixed(0));
    });

    animation.start(() => {
      animatedValue.removeListener(id);
    });

    return () => {
      animatedValue.removeListener(id);
    };
  }, [amount, animatedValue]);

  const animatedColor = animatedValue.interpolate({
    inputRange: [0, amount],
    outputRange: [COLORS.black, color],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      <View style={styles.amountContainer}>
        <Animated.Text numberOfLines={1} adjustsFontSizeToFit={true} style={[styles.amount, { color: animatedColor }]}>{displayedAmount}</Animated.Text>
        <Text style={styles.currency} >{currency}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  description: {
    fontSize: 14,
    color: COLORS.gray[600],
    textAlign: 'center',
    marginVertical: 4,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  currency: {
    marginStart: 4,
    fontSize: 14,
    color: COLORS.black,
  },
});

export default HeaderCard;
