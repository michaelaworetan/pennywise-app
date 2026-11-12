# PennyWise - Personal Finance Management App

A beautiful and intuitive React Native mobile app for tracking expenses, managing budgets, and gaining financial insights.

## Features

### ✅ Implemented
- 🔐 **Authentication** - Sign up, login, and secure session management
- 🎨 **Theme System** - Light and dark mode with persistent preferences
- 🏠 **Home Dashboard** - Overview of balance, income, expenses, and recent activity
- 💰 **Transaction Management** - Add, view, and track income and expenses
- 📊 **Reports & Analytics** - Visual charts showing spending patterns
- 💳 **Budget Management** - Create and monitor category-based budgets
- ⚙️ **Settings** - Manage preferences, appearance, and account settings
- 🔔 **Profile Management** - Update personal information

### 📱 Screens Implemented
1. Splash Screen
2. Login / Sign Up
3. Home (Overview)
4. Add Transaction
5. Transaction History (Activity)
6. Budgets
7. Reports & Analytics
8. Profile & Settings

## Tech Stack

### Frontend
- **React Native** - Mobile app framework
- **Expo** - Development platform
- **Expo Router** - File-based routing
- **AsyncStorage** - Persistent data storage
- **Context API** - State management (Auth & Theme)
- **Axios** - HTTP client
- **React Native Chart Kit** - Charts and visualizations
- **Expo Vector Icons** - Icon library
- **React Native Reanimated** - Animations
- **Expo Notifications** - Push notifications support

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **JSON File Storage** - Simple data persistence

## Design System

### Colors
- **Primary**: #1B5E4F (Forest Green)
- **Primary Light**: #D4EDE4 (Mint)
- **Success/Income**: #10B981
- **Error/Expense**: #EF4444
- **Warning**: #F59E0B

### Typography
- System fonts (San Francisco on iOS, Roboto on Android)
- Font sizes: 12px - 36px
- Font weights: Regular, Semibold, Bold

### Layout
- Spacing: 4px, 8px, 12px, 16px, 20px, 24px, 32px
- Border Radius: 8px, 12px, 16px, 20px, 24px
- Input/Button Height: 52px

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS) or Android Emulator (for Android)

### Installation

1. **Install frontend dependencies:**
```bash
cd pennywise-app
npm install
```

2. **Install backend dependencies:**
```bash
cd ../backend
npm install
```

### Running the App

1. **Start the backend server:**
```bash
cd backend
npm start
```
The API will run on `http://localhost:3000`

2. **Update API URL in the app:**
Edit `pennywise-app/context/AuthProvider.js` and update the `API_URL`:
- For iOS Simulator: `http://localhost:3000/api`
- For Android Emulator: `http://10.0.2.2:3000/api`
- For Physical Device: `http://YOUR_COMPUTER_IP:3000/api`

3. **Start the Expo development server:**
```bash
cd pennywise-app
npm start
```

4. **Run on your device:**
- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Scan QR code with Expo Go app for physical device

## Project Structure

```
pennywise-app/
├── app/                      # Expo Router screens
│   ├── (auth)/              # Authentication screens
│   │   ├── login.js
│   │   ├── signup.js
│   │   └── forgot-password.js
│   ├── (tabs)/              # Main app tabs
│   │   ├── index.js         # Home
│   │   ├── activity.js      # Transactions
│   │   ├── budgets.js
│   │   ├── reports.js
│   │   └── more.js          # Settings
│   ├── transaction/
│   │   └── add.js
│   ├── _layout.js
│   └── index.js             # Splash
├── components/
│   └── ui/                  # Reusable UI components
│       ├── Button.js
│       ├── Input.js
│       └── Card.js
├── constants/               # Design tokens
│   ├── Colors.js
│   ├── Layout.js
│   └── Categories.js
├── context/                 # React contexts
│   ├── AuthProvider.js
│   └── ThemeProvider.js
├── assets/                  # Images, fonts, etc.
├── app.json                 # Expo configuration
├── babel.config.js
└── package.json

backend/
├── server.js                # Express server
├── data/
│   └── db.json             # JSON database
├── package.json
└── README.md
```

## Key Features Explained

### Authentication
- JWT-based authentication
- Secure password hashing with bcrypt
- Session persistence with AsyncStorage
- Auto-login on app launch

### Theme System
- Light and dark mode support
- Sun/moon toggle icons
- System theme detection
- Persistent theme preference
- Dynamic color schemes

### Transaction Management
- Add income and expenses
- Category selection
- Date and account tracking
- Notes and descriptions
- Transaction history with search and filters

### Budget Management
- Category-based budgets
- Progress tracking
- Visual progress bars
- Budget alerts (80% and 100%)

### Reports & Analytics
- Pie charts for spending by category
- Income vs expenses comparison
- Net cash flow calculation
- Period selection (monthly, custom)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/:id` - Get transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Budgets
- `GET /api/budgets` - Get all budgets
- `POST /api/budgets` - Create budget

### Categories
- `GET /api/categories` - Get all categories

### Stats
- `GET /api/stats/overview` - Get financial overview

## Testing

### Test Accounts
You can create test accounts through the sign-up screen. The app includes interactive validation testing:
- Test invalid email format
- Test weak password validation
- Test required field validation

## Performance Optimizations

- ✅ Hermes JS engine enabled (Android)
- ✅ Component memoization where needed
- ✅ FlatList for virtualized scrolling
- ✅ Image optimization
- ✅ Minimal dependencies

## Known Limitations

1. **Backend**: Currently uses JSON file storage. For production, migrate to a proper database (PostgreSQL, MongoDB)
2. **Notifications**: Expo Notifications is installed but not fully implemented
3. **Transaction Details**: Detail view needs to be created
4. **Image Upload**: Profile picture upload UI exists but needs backend implementation
5. **Categories**: Category management UI needs to be created
6. **Biometric Auth**: Toggle exists but needs implementation
7. **Export Reports**: Export functionality needs implementation

## Future Enhancements

- [ ] Transaction detail view with edit/delete
- [ ] Category management (add custom categories)
- [ ] Recurring transactions
- [ ] Bill reminders with notifications
- [ ] Data export (PDF, CSV)
- [ ] Multi-currency support
- [ ] Bank account sync
- [ ] Receipt scanning with OCR
- [ ] Financial goals tracking
- [ ] Savings challenges
- [ ] Biometric authentication
- [ ] Offline mode with sync

## Troubleshooting

### Backend Connection Issues
- Make sure the backend server is running
- Check the API_URL in AuthProvider.js
- For Android Emulator, use `10.0.2.2` instead of `localhost`
- For physical device, use your computer's IP address

### Cannot Connect to Metro
```bash
# Clear cache and restart
npx expo start --clear
```

### Build Errors
```bash
# Clean and reinstall
rm -rf node_modules package-lock.json
npm install
```

## License

MIT License - Feel free to use this project for learning and development.

## Credits

Designed and developed based on comprehensive Figma designs.
Built with React Native, Expo, and Node.js.

---

**Note**: This is a development/learning project. For production use, implement proper security measures, database management, and error handling.
