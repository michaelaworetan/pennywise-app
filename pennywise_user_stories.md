# Pennywise – User Stories

## 1. Login

### User Story 1: User Registration

As a user, I want to register by entering my full name, email address, and password, so that I can create a personal account.

**Acceptance Criteria:**

1. Users can enter their full name, valid email address, and password.
2. Users can click the "Sign Up" button to create an account.
3. An error message is displayed if any required field is missing or invalid.
4. A success message is displayed after successful registration.

### User Story 2: User Login

As a user, I want to log in using my registered email address and password, so that I can access my financial dashboard.

**Acceptance Criteria:**

1. Users can enter their email address and password.
2. Users are redirected to the homepage after successful authentication.
3. An error message is displayed when incorrect login credentials are provided.

### User Story 3: Input Validation and Error Feedback

As a user, I want to receive feedback when I submit incomplete registration or login details, so that I can correct the errors.

**Acceptance Criteria:**

1. Required fields are validated before submission.
2. Appropriate error messages are displayed for missing or invalid fields.

### User Story 4: Session Persistence

As a user, I want my account information and login session to be securely maintained, so that I do not have to log in every time I open the application.

**Acceptance Criteria:**

1. User authentication information is securely managed.
2. Users remain logged in until they explicitly sign out or their session expires.

---

## 2. HomePage

The homepage serves as the main dashboard of the application. It provides users with an overview of their financial activities, including their total balance, income, expenses, recent transactions, and budget progress.

### User Story 1: Personalized Greeting

As a user, I want to see a personalized greeting with my name, so that I feel welcomed when I open the application.

**Acceptance Criteria:**

1. Display a personalized greeting such as "Hello, Michael".
2. Display a welcome message or financial overview title.

### User Story 2: Total Available Balance

As a user, I want to see my total available balance, so that I can understand my current financial position.

**Acceptance Criteria:**

1. Display the user's total balance prominently on the homepage.
2. The balance should reflect recorded income and expenses.
3. Provide an option to hide or show the balance.

### User Story 3: Income and Expense Summary

As a user, I want to see a summary of my income and expenses, so that I can monitor my financial activities.

**Acceptance Criteria:**

1. Display the total income for the current month.
2. Display the total expenses for the current month.
3. Use different visual indicators to distinguish income from expenses.

### User Story 4: Recent Transactions

As a user, I want to view my recent transactions, so that I can quickly track my latest financial activities.

**Acceptance Criteria:**

1. Display a list of recent transactions.
2. Each transaction should show its title, category, date, and amount.
3. Users can tap a transaction to view its details.

### User Story 5: Monthly Budget Progress

As a user, I want to see my monthly budget progress, so that I can know how much of my budget I have spent.

**Acceptance Criteria:**

1. Display the total monthly budget and amount spent.
2. Show a visual progress indicator.
3. Display the remaining budget.

### User Story 6: Quick Access to Application Features

As a user, I want quick access to important application features, so that I can easily manage my finances.

**Acceptance Criteria:**

1. Provide shortcuts for adding income, adding expenses, viewing reports, and managing budgets.

---

## 3. AddTransaction

The Add Transaction screen allows users to record their financial activities by adding income or expenses. Users can provide details such as transaction title, amount, category, date, and description.

### User Story 1: Select Transaction Type

As a user, I want to select whether I am recording income or an expense, so that I can properly categorize my financial transaction.

**Acceptance Criteria:**

1. Provide options for selecting "Income" or "Expense".
2. Visually distinguish the selected transaction type.
3. The selected type should determine how the transaction affects the user's balance.

### User Story 2: Enter Transaction Title and Amount

As a user, I want to enter a transaction title and amount, so that I can record my financial activity.

**Acceptance Criteria:**

1. Provide input fields for transaction title and amount.
2. Only valid numerical amounts should be accepted.
3. Display an error message if required fields are empty.

### User Story 3: Select Transaction Category

As a user, I want to select a category for my transaction, so that I can organize my income and expenses.

**Acceptance Criteria:**

1. Provide predefined categories such as Food, Transport, Shopping, Salary, Bills, and Entertainment.
2. Allow users to select a category.
3. Display the selected category on the transaction record.

### User Story 4: Select Transaction Date

As a user, I want to select the date of a transaction, so that I can maintain accurate financial records.

**Acceptance Criteria:**

1. Provide a date picker for selecting transaction dates.
2. Display the selected date before saving.
3. Allow users to record transactions from previous dates.

### User Story 5: Save Transaction

As a user, I want to save a transaction, so that it can be included in my financial records.

**Acceptance Criteria:**

1. Provide an "Add Transaction" button.
2. Save the transaction after all required fields are validated.
3. Update the user's balance and financial summary after a successful transaction.
4. Display a success message after saving.

---

## 4. TransactionHistory

The Transaction History screen allows users to view and manage all their recorded income and expenses.

### User Story 1: View All Transactions

As a user, I want to view a list of all my transactions, so that I can keep track of my financial activities.

**Acceptance Criteria:**

1. Display all recorded transactions in chronological order.
2. Each transaction should display its title, amount, category, and date.
3. Clearly distinguish income from expenses.

### User Story 2: Filter Transactions by Type

As a user, I want to filter transactions by type, so that I can view only income or expenses.

**Acceptance Criteria:**

1. Provide filter options for "All", "Income", and "Expenses".
2. Display only transactions matching the selected filter.

### User Story 3: Search Transactions

As a user, I want to search for a transaction by its title, so that I can quickly find a specific financial record.

**Acceptance Criteria:**

1. Provide a search input field.
2. Display transactions matching the entered search term.
3. Display an appropriate message when no matching transaction is found.

### User Story 4: Edit and Delete Transactions

As a user, I want to edit or delete an existing transaction, so that I can correct mistakes in my financial records.

**Acceptance Criteria:**

1. Provide an option to edit transaction details.
2. Provide a delete option for each transaction.
3. Display a confirmation message before deleting a transaction.
4. Recalculate the user's balance after editing or deleting a transaction.

---

## 5. TransactionDetails

The Transaction Details screen displays complete information about a selected transaction.

### User Story 1: View Transaction Details

As a user, I want to view the complete details of a transaction, so that I can understand and verify my financial records.

**Acceptance Criteria:**

1. Display the transaction title, amount, category, date, type, and description.
2. Clearly indicate whether the transaction is income or an expense.

### User Story 2: Edit Transaction Information

As a user, I want to edit transaction information, so that I can correct inaccurate records.

**Acceptance Criteria:**

1. Provide an "Edit Transaction" button.
2. Allow users to modify transaction details.
3. Save and reflect updated information after successful editing.

### User Story 3: Delete Transaction

As a user, I want to delete a transaction, so that I can remove incorrect or unwanted records.

**Acceptance Criteria:**

1. Provide a "Delete Transaction" button.
2. Ask for confirmation before deleting.
3. Update the financial summary after deletion.

---

## 6. BudgetManagement

The Budget Management screen allows users to create and manage monthly budgets for different expense categories. It helps users control their spending and avoid exceeding their financial limits.

### User Story 1: Create Monthly Budget

As a user, I want to create a monthly budget, so that I can set a spending limit for a specific period.

**Acceptance Criteria:**

1. Provide an input field for entering the budget amount.
2. Allow users to select a budget category.
3. Allow users to specify the budget period.
4. Display an error message if the budget amount is invalid or missing.

### User Story 2: View Budget Progress

As a user, I want to view my budget progress, so that I can monitor how much of my allocated budget I have spent.

**Acceptance Criteria:**

1. Display the allocated budget amount.
2. Display the amount already spent.
3. Display the remaining budget.
4. Include a progress bar showing the percentage of the budget used.

### User Story 3: Receive Budget Limit Notifications

As a user, I want to receive a notification when I approach or exceed my budget limit, so that I can control my spending.

**Acceptance Criteria:**

1. Trigger a notification when spending reaches 80% of the allocated budget.
2. Trigger another notification when the budget limit is exceeded.
3. Display the affected budget category and spending information.

### User Story 4: Edit and Delete Budgets

As a user, I want to edit or delete an existing budget, so that I can manage my financial plans.

**Acceptance Criteria:**

1. Provide options to edit and delete existing budgets.
2. Allow users to update budget amounts and categories.
3. Ask for confirmation before deleting a budget.

---

## 7. ReportsAndAnalytics

The Reports screen provides users with visual representations of their financial activities. It helps users understand their spending patterns, income sources, and financial progress over time.

### User Story 1: View Income and Expense Summary

As a user, I want to view a summary of my income and expenses, so that I can understand my overall financial performance.

**Acceptance Criteria:**

1. Display total income and expenses for a selected period.
2. Display the user's net balance for the selected period.
3. Provide options to view weekly, monthly, and yearly reports.

### User Story 2: View Expenses Using Charts

As a user, I want to view my expenses using charts, so that I can easily identify where most of my money is spent.

**Acceptance Criteria:**

1. Display a pie chart or doughnut chart showing expenses by category.
2. Display the amount spent in each category.
3. Use different colours to distinguish expense categories.

### User Story 3: Compare Income and Expenses

As a user, I want to compare my income and expenses over time, so that I can identify my financial trends.

**Acceptance Criteria:**

1. Display a chart comparing income and expenses.
2. Allow users to select different reporting periods.
3. Update the chart based on the selected period.

### User Story 4: View Spending by Category

As a user, I want to view my spending history by category, so that I can identify areas where I can reduce expenses.

**Acceptance Criteria:**

1. Display a list of expense categories.
2. Show the total amount spent in each category.
3. Arrange categories based on their spending amounts.

### User Story 5: Export Financial Reports

As a user, I want to export my financial reports, so that I can keep a copy of my financial records.

**Acceptance Criteria:**

1. Provide an option to export financial reports.
2. Allow users to download or share reports in PDF format.
3. Include the selected reporting period and financial summaries in the exported report.

---

## 8. NotificationsAndReminders

The Notifications and Reminders feature allows users to receive alerts about important financial activities, including upcoming bills, budget limits, and scheduled reminders.

### User Story 1: Create Financial Reminders

As a user, I want to create a financial reminder, so that I do not forget important payment dates.

**Acceptance Criteria:**

1. Provide fields for entering a reminder title and description.
2. Allow users to select a reminder date and time.
3. Provide an option to save the reminder.
4. Display a success message after creating a reminder.

### User Story 2: Receive Upcoming Bill Notifications

As a user, I want to receive notifications for upcoming bills, so that I can make payments before their due dates.

**Acceptance Criteria:**

1. Send notifications for scheduled bill reminders.
2. Display the reminder title and due date.
3. Allow users to configure when they receive reminders.

### User Story 3: Receive Budget Notifications

As a user, I want to receive notifications when my spending approaches my budget limit, so that I can avoid overspending.

**Acceptance Criteria:**

1. Send notifications when spending reaches the configured budget threshold.
2. Display the budget category and remaining amount.
3. Notify users when their budget is exceeded.

### User Story 4: View Notifications

As a user, I want to view all my notifications, so that I can keep track of important financial updates.

**Acceptance Criteria:**

1. Display a list of received notifications.
2. Show the notification title, description, and date.
3. Distinguish between read and unread notifications.
4. Allow users to mark notifications as read or delete them.

### User Story 5: Manage Reminders

As a user, I want to manage my reminders, so that I can update or remove scheduled reminders.

**Acceptance Criteria:**

1. Display all scheduled reminders.
2. Provide options to edit and delete reminders.
3. Allow users to mark completed reminders.

---

## 9. MenuAndNavigation

The Menu screen provides users with easy access to the different sections of the application, making navigation simple and convenient.

### User Story 1: Navigate Between Application Screens

As a user, I want to access the main application features through a navigation menu, so that I can easily move between different sections.

**Acceptance Criteria:**

1. Display navigation options for Home, Transactions, Budgets, Reports, and Profile.
2. Highlight the currently selected navigation item.
3. Allow users to navigate to the selected screen when an item is tapped.

### User Story 2: Access Application Settings

As a user, I want to access my settings from the navigation menu, so that I can customize my application preferences.

**Acceptance Criteria:**

1. Display a Settings option in the menu.
2. Navigate to the Settings screen when selected.

### User Story 3: View Profile Information

As a user, I want to see my profile information in the navigation menu, so that I can quickly access my account details.

**Acceptance Criteria:**

1. Display the user's name and profile picture or avatar.
2. Provide an option to navigate to the Profile screen.

**Story Points:** 2

---

## 10. Profile

The Profile screen allows users to view and manage their personal information and account details.

### User Story 1: View Profile Information

As a user, I want to view my profile information, so that I can see the personal details associated with my account.

**Acceptance Criteria:**

1. Display the user's full name and email address.
2. Display the user's profile picture or default avatar.
3. Provide an option to edit profile information.

### User Story 2: Update Personal Information

As a user, I want to update my personal information, so that I can keep my account details accurate.

**Acceptance Criteria:**

1. Allow users to edit their full name and profile picture.
2. Validate required fields before saving.
3. Display a success message after updating profile information.

### User Story 3: Change Account Password

As a user, I want to change my account password, so that I can maintain the security of my account.

**Acceptance Criteria:**

1. Provide fields for the current password and new password.
2. Validate the new password.
3. Display an appropriate message when the password is successfully changed or when an error occurs.

### User Story 4: View Account Information

As a user, I want to view my account information, so that I can manage my registered details.

**Acceptance Criteria:**

1. Display the registered email address and account information.
2. Provide access to account management options.

---

## 11. Logout

The Logout functionality allows users to securely sign out of their accounts when they are finished using the application.

### User Story 1: Logout from the Application

As a user, I want a clear and visible logout button, so that I can easily sign out of my account.

**Acceptance Criteria:**

1. Display a "Logout" option in the Profile or Settings screen.
2. Ask users to confirm before logging out.
3. Redirect users to the Login screen after successful logout.

### User Story 2: Clear Session Information

As a user, I want my session information to be cleared after logging out, so that my account remains secure.

**Acceptance Criteria:**

1. Clear authentication tokens and session information.
2. Prevent access to authenticated screens after logout.
3. Require users to log in again to access their financial information.

---

## 12. Settings

The Settings screen allows users to customize their application preferences, including appearance, currency, and notification settings.

### User Story 1: Switch Between Light and Dark Themes

As a user, I want to switch between light and dark themes, so that I can customize the application's appearance based on my preference.

**Acceptance Criteria:**

1. Provide a theme selection option in the Settings screen.
2. Allow users to switch between light and dark modes.
3. Apply the selected theme immediately without restarting the application.
4. Save the selected theme preference.

### User Story 2: Select Preferred Currency

As a user, I want to select my preferred currency, so that my financial information is displayed in a familiar currency.

**Acceptance Criteria:**

1. Provide a list of supported currencies.
2. Allow users to select their preferred currency.
3. Display financial amounts using the selected currency.
4. Save the selected currency preference.

### User Story 3: Manage Notification Preferences

As a user, I want to manage notification preferences, so that I can control the financial alerts I receive.

**Acceptance Criteria:**

1. Provide options to enable or disable notifications.
2. Allow users to manage budget alerts and payment reminders separately.
3. Save notification preferences.

### User Story 4: View Application Information

As a user, I want to access application information, so that I can learn more about the application.

**Acceptance Criteria:**

1. Display the application name and version.
2. Provide an About section.
3. Display relevant application information.