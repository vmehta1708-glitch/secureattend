import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Shield, Users, BarChart3, Camera } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: 'home' | 'register' | 'attendance' | 'dashboard') => void;
  userType?: 'admin' | 'student' | null;
}

export function LandingPage({ onNavigate, userType }: LandingPageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <Shield className="w-8 h-8 text-cyan-400" />
          <div className="flex items-center space-x-2">
            <span className="text-white">TRUEROLL</span>
            {userType && (
              <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white uppercase tracking-wider">
                {userType}
              </span>
            )}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex space-x-4"
        >
          <Button 
            variant="ghost" 
            className="text-white hover:text-cyan-400 transition-colors"
            onClick={() => onNavigate('home')}
          >
            Home
          </Button>
          {userType === 'admin' && (
            <>
              <Button 
                variant="ghost" 
                className="text-white hover:text-cyan-400 transition-colors"
                onClick={() => onNavigate('register')}
              >
                Student Registration
              </Button>
              <Button 
                variant="ghost" 
                className="text-white hover:text-cyan-400 transition-colors"
                onClick={() => onNavigate('attendance')}
              >
                Live Attendance
              </Button>
              <Button 
                variant="ghost" 
                className="text-white hover:text-cyan-400 transition-colors"
                onClick={() => onNavigate('dashboard')}
              >
                Admin Dashboard
              </Button>
            </>
          )}
          {userType === 'student' && (
            <>
              <Button 
                variant="ghost" 
                className="text-white hover:text-cyan-400 transition-colors"
                onClick={() => onNavigate('attendance')}
              >
                Mark Attendance
              </Button>
              <Button 
                variant="ghost" 
                className="text-white hover:text-cyan-400 transition-colors"
                onClick={() => onNavigate('dashboard')}
              >
                My Dashboard
              </Button>
            </>
          )}
        </motion.div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6">
        {/* 3D Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4"
            animate={{
              textShadow: [
                "0 0 20px rgba(56, 189, 248, 0.5)",
                "0 0 40px rgba(56, 189, 248, 0.8)",
                "0 0 20px rgba(56, 189, 248, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            TRUEROLL
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            {userType === 'admin' 
              ? 'Advanced AI-powered attendance management system with comprehensive analytics and security monitoring'
              : userType === 'student'
              ? 'Mark your attendance with AI-powered face recognition and track your academic progress'
              : 'A secure, AI-powered, real-time face recognition attendance system with liveness detection and advanced visualization'
            }
          </motion.p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12"
        >
          <Card className="bg-gray-800/50 border-cyan-500/30 hover:bg-gray-800/70 transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-white mb-2">Secure Recognition</h3>
              <p className="text-gray-400 text-sm">Advanced liveness detection prevents spoofing attempts</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-purple-500/30 hover:bg-gray-800/70 transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Camera className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-white mb-2">Real-time Detection</h3>
              <p className="text-gray-400 text-sm">Instant face recognition with live webcam feed</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-blue-500/30 hover:bg-gray-800/70 transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-white mb-2">
                {userType === 'admin' ? 'Student Management' : 'Personal Tracking'}
              </h3>
              <p className="text-gray-400 text-sm">
                {userType === 'admin' 
                  ? 'Easy registration and profile management' 
                  : 'Track your attendance and academic progress'
                }
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-green-500/30 hover:bg-gray-800/70 transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <BarChart3 className="w-12 h-12 text-green-400 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-white mb-2">
                {userType === 'admin' ? 'Analytics Dashboard' : 'Personal Insights'}
              </h3>
              <p className="text-gray-400 text-sm">
                {userType === 'admin' 
                  ? 'Comprehensive attendance reports and insights' 
                  : 'Detailed statistics and attendance patterns'
                }
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {userType === 'admin' ? (
            <>
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                onClick={() => onNavigate('register')}
              >
                Register Students
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black px-8 py-3 text-lg transition-all duration-300"
                onClick={() => onNavigate('dashboard')}
              >
                View Dashboard
              </Button>
            </>
          ) : userType === 'student' ? (
            <>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                onClick={() => onNavigate('attendance')}
              >
                Mark Attendance
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black px-8 py-3 text-lg transition-all duration-300"
                onClick={() => onNavigate('dashboard')}
              >
                View My Dashboard
              </Button>
            </>
          ) : (
            <>
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                onClick={() => onNavigate('register')}
              >
                Register Students
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black px-8 py-3 text-lg transition-all duration-300"
                onClick={() => onNavigate('attendance')}
              >
                Start Attendance
              </Button>
            </>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="relative z-10 text-center text-gray-500 pb-6"
      >
        <p>© 2025 TRUEROLL - AI-Powered Attendance System</p>
      </motion.footer>
    </div>
  );
}