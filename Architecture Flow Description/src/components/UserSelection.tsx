import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { UserCheck, Shield, Users, BarChart3 } from 'lucide-react';

interface UserSelectionProps {
  onSelectUser: (userType: 'admin' | 'student') => void;
}

export function UserSelection({ onSelectUser }: UserSelectionProps) {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_50%)]" />
      </div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
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

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4"
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
          <p className="text-xl text-gray-300 mb-2">
            AI-Powered Attendance System
          </p>
          <p className="text-gray-400">
            Choose your access level to continue
          </p>
        </motion.div>

        {/* User Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Admin Access */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/50 hover:border-red-400 transition-all duration-300 group cursor-pointer h-full">
              <CardHeader className="text-center pb-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="mx-auto mb-4 p-4 bg-red-600/20 rounded-full w-fit"
                >
                  <Shield className="w-12 h-12 text-red-400" />
                </motion.div>
                <CardTitle className="text-2xl text-white mb-2">
                  Admin Access
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-center mb-6">
                  Full system control with analytics, student management, and security monitoring
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Users className="w-5 h-5 text-red-400" />
                    <span>Student Registration & Management</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <BarChart3 className="w-5 h-5 text-red-400" />
                    <span>Advanced Analytics & Reports</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Shield className="w-5 h-5 text-red-400" />
                    <span>Security Alerts & Monitoring</span>
                  </div>
                </div>

                <Button
                  onClick={() => onSelectUser('admin')}
                  className="w-full mt-6 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 shadow-lg hover:shadow-red-500/25 transition-all duration-300 group-hover:scale-105"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Access as Administrator
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Student Access */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/50 hover:border-blue-400 transition-all duration-300 group cursor-pointer h-full">
              <CardHeader className="text-center pb-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ duration: 0.3 }}
                  className="mx-auto mb-4 p-4 bg-blue-600/20 rounded-full w-fit"
                >
                  <UserCheck className="w-12 h-12 text-blue-400" />
                </motion.div>
                <CardTitle className="text-2xl text-white mb-2">
                  Student Access
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-center mb-6">
                  Personal attendance dashboard with detailed insights and attendance marking
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <UserCheck className="w-5 h-5 text-blue-400" />
                    <span>Mark Personal Attendance</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    <span>View Attendance History</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Users className="w-5 h-5 text-blue-400" />
                    <span>Personal Statistics & Trends</span>
                  </div>
                </div>

                <Button
                  onClick={() => onSelectUser('student')}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-105"
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Access as Student
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Demo Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 text-sm">
            This is a demonstration system. All data is simulated for hackathon purposes.
          </p>
        </motion.div>
      </div>
    </div>
  );
}