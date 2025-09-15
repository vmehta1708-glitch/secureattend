import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, User, Lock, Eye, EyeOff, LogIn, Fingerprint, Shield, CheckCircle } from 'lucide-react';
import yashviPhoto from 'figma:asset/56295feda046023ddaf85ebd5934e187418f8ac2.png';
import drishtiPhoto from 'figma:asset/f872924040917653010b73015adc0b60c5567d87.png';
import hitakshiPhoto from 'figma:asset/17e7d0d7659799e54c66fe8050c2c15ccf48fac4.png';
import vrandaPhoto from 'figma:asset/6ebc64fa75395a240718c8a36c13c22bd54632d6.png';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface StudentLoginProps {
  onNavigate: (page: 'home' | 'register' | 'attendance' | 'dashboard' | 'student-dashboard' | 'student-login') => void;
  onLoginSuccess: (studentData?: any) => void;
}

interface LoginFormData {
  enrollmentId: string;
  password: string;
  rememberMe: boolean;
}

// Mock student credentials and full data for demonstration
const mockStudentsData = [
  { 
    enrollmentId: 'CS2021001', 
    password: 'password123', 
    name: 'Yashvi Mashru',
    branch: 'Computer Science Engineering',
    photo: yashviPhoto,
    year: '3rd Year',
    department: 'School of Engineering'
  },
  { 
    enrollmentId: 'CS2021002', 
    password: 'password123', 
    name: 'Drishti Butani',
    branch: 'Computer Science Engineering',
    photo: drishtiPhoto,
    year: '3rd Year',
    department: 'School of Engineering'
  },
  { 
    enrollmentId: 'CS2021003', 
    password: 'password123', 
    name: 'Hitakshi Boghani',
    branch: 'Computer Science Engineering',
    photo: hitakshiPhoto,
    year: '3rd Year',
    department: 'School of Engineering'
  },
  { 
    enrollmentId: 'CS2021004', 
    password: 'password123', 
    name: 'Vranda Mehta',
    branch: 'Electronics & Communication Engineering',
    photo: vrandaPhoto,
    year: '3rd Year',
    department: 'School of Engineering'
  },
];

// Simple credentials for demo display
const mockStudents = [
  { enrollmentId: 'CS2021001', password: 'password123', name: 'Yashvi Mashru' },
  { enrollmentId: 'CS2021002', password: 'password123', name: 'Drishti Butani' },
  { enrollmentId: 'CS2021003', password: 'password123', name: 'Hitakshi Boghani' },
  { enrollmentId: 'CS2021004', password: 'password123', name: 'Vranda Mehta' },
];

export function StudentLogin({ onNavigate, onLoginSuccess }: StudentLoginProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    enrollmentId: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.enrollmentId.trim()) {
      toast.error('Enrollment ID is required');
      return false;
    }
    if (!formData.password.trim()) {
      toast.error('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (isLocked) {
      toast.error('Account temporarily locked. Please try again later.');
      return;
    }

    setIsLoading(true);

    // Simulate API authentication
    setTimeout(() => {
      const student = mockStudentsData.find(
        s => s.enrollmentId === formData.enrollmentId && s.password === formData.password
      );

      if (student) {
        toast.success(`Welcome back, ${student.name}!`);
        setLoginAttempts(0);
        onLoginSuccess(student);
      } else {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        if (newAttempts >= 3) {
          setIsLocked(true);
          toast.error('Too many failed attempts. Account locked for 5 minutes.');
          setTimeout(() => {
            setIsLocked(false);
            setLoginAttempts(0);
          }, 300000); // 5 minutes
        } else {
          toast.error(`Invalid credentials. ${3 - newAttempts} attempts remaining.`);
        }
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    toast.info('Password reset link would be sent to your registered email.');
  };

  const handleBiometricLogin = () => {
    toast.info('Biometric authentication would be initiated here.');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_50%)]" />
      </div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-20"
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
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

      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 border border-cyan-500/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="text-white hover:text-cyan-400 mr-4"
            onClick={() => onNavigate('home')}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-cyan-400" />
            <span className="text-white text-xl">Student Login</span>
          </div>
        </div>
        
        <Badge className="bg-cyan-600 hover:bg-cyan-700 text-white">
          Secure Access
        </Badge>
      </nav>

      <div className="relative z-10 flex items-center justify-center min-h-[85vh] p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="bg-gray-800/80 border-cyan-500/30 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="relative">
                    <User className="w-12 h-12 text-cyan-400" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-1 -right-1 w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full"
                    />
                  </div>
                </div>
                <h2 className="text-2xl mb-2">Welcome Back</h2>
                <p className="text-gray-400 text-sm">Sign in to access your dashboard</p>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6">
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Enrollment ID */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <Label htmlFor="enrollmentId" className="text-white flex items-center space-x-2">
                    <User className="w-4 h-4 text-cyan-400" />
                    <span>Enrollment ID</span>
                  </Label>
                  <Input
                    id="enrollmentId"
                    type="text"
                    value={formData.enrollmentId}
                    onChange={(e) => handleInputChange('enrollmentId', e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                    placeholder="Enter your enrollment ID"
                    disabled={isLocked}
                    required
                  />
                </motion.div>

                {/* Password */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="text-white flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-cyan-400" />
                    <span>Password</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20 pr-10"
                      placeholder="Enter your password"
                      disabled={isLocked}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                      disabled={isLocked}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>

                {/* Remember Me & Forgot Password */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-between"
                >
                  <label className="flex items-center space-x-2 text-sm text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                      className="w-4 h-4 text-cyan-600 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2 bg-gray-700"
                      disabled={isLocked}
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                    disabled={isLocked}
                  >
                    Forgot password?
                  </button>
                </motion.div>

                {/* Login Attempts Warning */}
                {loginAttempts > 0 && !isLocked && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 bg-yellow-900/50 border border-yellow-500/50 rounded-lg"
                  >
                    <p className="text-yellow-400 text-sm text-center">
                      {loginAttempts} failed attempt{loginAttempts > 1 ? 's' : ''}. {3 - loginAttempts} remaining.
                    </p>
                  </motion.div>
                )}

                {/* Account Locked Warning */}
                {isLocked && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 bg-red-900/50 border border-red-500/50 rounded-lg"
                  >
                    <p className="text-red-400 text-sm text-center">
                      Account temporarily locked due to multiple failed attempts.
                    </p>
                  </motion.div>
                )}

                {/* Login Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading || isLocked}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-3 text-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <LogIn className="w-5 h-5 mr-2" />
                        Sign In
                      </>
                    )}
                  </Button>
                </motion.div>

                {/* Biometric Login */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="h-px bg-gray-600 flex-1" />
                    <span className="text-gray-400 text-sm">or</span>
                    <div className="h-px bg-gray-600 flex-1" />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBiometricLogin}
                    disabled={isLocked}
                    className="w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300"
                  >
                    <Fingerprint className="w-5 h-5 mr-2" />
                    Use Biometric Login
                  </Button>
                </motion.div>

                {/* Demo Credentials */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="p-4 bg-gray-700/30 border border-gray-600/50 rounded-lg"
                >
                  <p className="text-gray-400 text-sm mb-2 text-center">Demo Credentials:</p>
                  <div className="text-xs text-cyan-400 space-y-1">
                    {mockStudents.map((student, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{student.enrollmentId}</span>
                        <span>password123</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Register Link */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-center"
                >
                  <p className="text-gray-400 text-sm">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('register')}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Register here
                    </button>
                  </p>
                </motion.div>
              </form>
            </CardContent>
          </Card>

          {/* Security Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-6 text-center"
          >
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Secure SSL</span>
              </div>
              <div className="flex items-center space-x-1">
                <Lock className="w-4 h-4 text-blue-400" />
                <span>Encrypted</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Verified</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}