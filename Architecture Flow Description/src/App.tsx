import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { StudentRegistration } from './components/StudentRegistration';
import { AdminRegistration } from './components/AdminRegistration';
import { StudentLogin } from './components/StudentLogin';
import { LiveAttendance } from './components/LiveAttendance';
import { AdminDashboard } from './components/Dashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { UserSelection } from './components/UserSelection';

type Page = 'home' | 'register' | 'attendance' | 'dashboard' | 'student-dashboard' | 'user-select' | 'admin-register' | 'student-register' | 'student-login';
type UserType = 'admin' | 'student' | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('user-select');
  const [userType, setUserType] = useState<UserType>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loggedInStudent, setLoggedInStudent] = useState<any>(null);

  const handleUserSelection = (selectedUserType: 'admin' | 'student') => {
    setUserType(selectedUserType);
    setCurrentPage('home');
  };

  const handleLoginSuccess = (studentData?: any) => {
    setIsLoggedIn(true);
    setLoggedInStudent(studentData);
    setCurrentPage('student-dashboard');
  };

  const handleNavigation = (page: Page) => {
    if (page === 'dashboard') {
      // Route to appropriate dashboard based on user type
      if (userType === 'admin') {
        setCurrentPage('dashboard');
      } else if (userType === 'student') {
        // For students, check if they're logged in
        if (isLoggedIn) {
          setCurrentPage('student-dashboard');
        } else {
          setCurrentPage('student-login');
        }
      }
    } else if (page === 'register') {
      // Route to appropriate registration based on user type
      if (userType === 'admin') {
        setCurrentPage('admin-register');
      } else if (userType === 'student') {
        setCurrentPage('student-register');
      }
    } else {
      setCurrentPage(page);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'user-select':
        return <UserSelection onSelectUser={handleUserSelection} />;
      case 'home':
        return <LandingPage onNavigate={handleNavigation} userType={userType} />;
      case 'register':
      case 'student-register':
        return <StudentRegistration onNavigate={handleNavigation} />;
      case 'admin-register':
        return <AdminRegistration onNavigate={handleNavigation} />;
      case 'student-login':
        return <StudentLogin onNavigate={handleNavigation} onLoginSuccess={handleLoginSuccess} />;
      case 'attendance':
        return <LiveAttendance onNavigate={handleNavigation} />;
      case 'dashboard':
        return <AdminDashboard onNavigate={handleNavigation} />;
      case 'student-dashboard':
        return <StudentDashboard onNavigate={handleNavigation} studentData={loggedInStudent} />;
      default:
        return <UserSelection onSelectUser={handleUserSelection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900">
      {renderPage()}
    </div>
  );
}