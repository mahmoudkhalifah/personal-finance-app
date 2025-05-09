# Personal Finance App

A modern, cross-platform React Native application for tracking personal finances, visualizing spending, and gaining insights into your income and expenses.

## Features

- **Dashboard:** View your current balance, total income, and total expenses.
- **Transactions:** Add, view, filter transactions by type (income/expense), and sort by date .
- **Analytics:**  
  - Pie chart of expenses by category  
  - Bar chart of income by month (with year/month sorting)
  - Visual spending percentage and balance cards
- **Modern UI:**  
  - Beautiful color palette  
  - Responsive layouts  
  - Floating action button for adding transactions  
  - Modal forms with validation and keyboard handling

## Screenshots

<img src="https://github.com/user-attachments/assets/e00505d3-0f24-4016-9345-82664e0fcee7" width="400" />
<img src="https://github.com/user-attachments/assets/6d9b7d61-05b7-47fb-afbe-453713923307" width="400" />
<img src="https://github.com/user-attachments/assets/a3b6bf3d-be94-4b9a-8746-65d324612f5e" width="400" />
<img src="https://github.com/user-attachments/assets/e35304e7-2d4a-475f-9942-9974f58c3f89" width="400" />
<img src="https://github.com/user-attachments/assets/fcd0e165-51e0-47d0-a62b-d9a99bc6ffa9" width="400" />


## Getting Started

### Prerequisites

- Node.js (>= 18)
- npm
- React Native CLI
- Android Studio or Xcode (for running on device/emulator)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/mahmoudkhalifah/personal-finance-app.git
   cd personal-finance-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Install required native dependencies:**
   ```sh
   # For iOS:
   npx pod-install
   ```

4. **Run the app:**
   - For Android:
     ```sh
     npx react-native run-android
     ```
   - For iOS:
     ```sh
     npx react-native run-ios
     ```

## Project Structure

```
src/
  navigation/         # The bottom bar navigator
  components/         # Reusable UI components (TransactionList, AddTransactionModal, etc.)
  constants/          # Color palette and other constants
  contexts/           # React Contexts for global state (transactions)
  screens/            # App screens (Home, Analytics, etc.)
  utils/              # Utility functions (formatting, calculations)
  App.tsx             # App entry point
```

## Key Technologies

- **React Native** for cross-platform mobile development
- **TypeScript** for type safety
- **React Context API** for state management

## Customization

- **Color Palette:** Easily customizable in `src/constants/Colors.ts`
- **Categories:** Add or edit categories in `TransactionCategory` enum and color map
- **Validation:** Form validation logic in `AddTransactionModal.tsx`

