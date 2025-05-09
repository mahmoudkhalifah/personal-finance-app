import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { TransactionsProvider } from './src/contexts/TransactionsContext';

function App(): React.JSX.Element {
  return (
    <TransactionsProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </TransactionsProvider>
  );
}

export default App;
