# Learn Lingo - Language Learning Platform

A modern web application for connecting language learners with qualified tutors. Built with React and Firebase, this platform provides an intuitive interface for discovering and booking.

## 🌟 Features

### Core Functionality
- **Teacher Discovery**: Browse through a comprehensive list of language tutors with detailed profiles
- **Advanced Filtering**: Filter teachers by language, level and price
- **Favorites System**: Save and manage your favorite tutors for quick access
- **Booking System**: Schedule trial lessons with tutors directly through the platform
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Optimized for desktop and mobile devices

### User Experience
- **Dynamic Theme Toggle**: Switch between different color themes (Yellow, Green, Blue, Red, Peach)
- **Interactive UI**: Smooth animations and modern design elements
- **Loading States**: Professional loading indicators for better UX

### Teacher Profiles Include
- Profile photos and online status
- Languages taught and proficiency levels
- Lesson statistics and ratings
- Pricing information
- Teaching experience and qualifications

## 🛠️ Technologies Used

### Frontend
- **React 19** - Modern React with latest features
- **React Router DOM** - Client-side routing
- **Vite** - Fast build tool and development server
- **CSS Modules** - Scoped styling for components
- **React Hook Form** - Form handling and validation
- **Yup** - Schema validation
- **React Hot Toast** - User notifications
- **React Modal** - Modal dialogs
- **React Spinners** - Loading animations

### Backend & Services
- **Firebase Authentication** - User authentication and management
- **Firebase Realtime Database** - Data storage and synchronization

### Development Tools
- **ESLint** - Code linting and formatting
- **SWC** - Fast JavaScript compiler

## 📁 Project Structure

```
learn-lingo/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── BookingModal/   # Lesson booking interface
│   │   ├── FilterBar/      # Teacher filtering controls
│   │   ├── Header/         # Navigation header
│   │   ├── TeacherCard/    # Individual teacher display
│   │   ├── ThemeToggle/    # Theme switching component
│   │   └── ...
│   ├── pages/             # Main application pages
│   │   ├── Home/          # Landing page
│   │   ├── Teachers/      # Teacher listing page
│   │   └── Favorites/     # Saved teachers page
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── constants/         # Application constants
│   ├── firebase/          # Firebase configuration
│   └── css/              # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd learn-lingo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🔧 Configuration

### Firebase Setup
The application uses Firebase for authentication and data storage. The Firebase configuration is already set up in `src/firebase/firebase.js`.

### Environment Variables
No additional environment variables are required as Firebase configuration is included in the codebase.

## 📱 Features Overview

### Home Page
- Hero section with compelling call-to-action
- Statistics showcasing platform success
- Dynamic theme integration with animated elements

### Teachers Page
- Comprehensive teacher listing with filtering options
- Load more functionality for pagination
- Real-time teacher status and availability

### Favorites Page
- Saved teachers management
- Quick access to preferred tutors
- Remove from favorites functionality

### Authentication
- User registration and login
- Secure session management
- Protected booking functionality

## 🎨 Design System

The application features a modern, clean design with:
- Responsive layout that works on all devices
- Dynamic color themes with smooth transitions
- Consistent spacing and typography
- Accessible design patterns
- Professional loading states and animations

## 🔒 Security

- Firebase Authentication for secure user management
- Protected routes and API endpoints
- Input validation and sanitization
- Secure data transmission

## 🚀 Deployment

The application is configured for deployment on Vercel with the included `vercel.json` configuration file.

---

## 👨‍💻 Author

**Ivan Shevtsov** - Full-stack developer passionate about creating modern web applications.

--- 