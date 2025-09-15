import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, User, Calendar, TrendingUp, Clock, CheckCircle, XCircle, Book, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { ImageWithFallback } from './figma/ImageWithFallback';
import drishtiPhoto from 'figma:asset/f872924040917653010b73015adc0b60c5567d87.png';

interface StudentDashboardProps {
  onNavigate: (page: 'home' | 'register' | 'attendance' | 'dashboard' | 'student-dashboard') => void;
  studentData?: {
    name: string;
    enrollmentId: string;
    branch: string;
    photo: string;
    year: string;
    department: string;
  };
}

// Mock student data
const defaultStudent = {
  name: 'Drishti Butani',
  enrollmentId: 'CS2021002',
  branch: 'Computer Science Engineering',
  photo: drishtiPhoto,
  year: '3rd Year',
  department: 'School of Engineering'
};

// Mock attendance data
const attendanceHistory = [
  { date: 'Jan 10', status: 'Present', time: '10:30 AM' },
  { date: 'Jan 11', status: 'Present', time: '10:25 AM' },
  { date: 'Jan 12', status: 'Absent', time: '-' },
  { date: 'Jan 13', status: 'Present', time: '10:35 AM' },
  { date: 'Jan 14', status: 'Present', time: '10:20 AM' },
  { date: 'Jan 15', status: 'Present', time: '10:30 AM' },
];

const weeklyAttendance = [
  { week: 'Week 1', attendance: 95 },
  { week: 'Week 2', attendance: 89 },
  { week: 'Week 3', attendance: 92 },
  { week: 'Week 4', attendance: 96 },
];

const subjectWiseAttendance = [
  { subject: 'AI/ML', attendance: 95, color: '#3B82F6' },
  { subject: 'Web Dev', attendance: 92, color: '#10B981' },
  { subject: 'Database', attendance: 89, color: '#F59E0B' },
  { subject: 'Networks', attendance: 87, color: '#EF4444' },
];

const monthlyStats = [
  { month: 'Sep', present: 22, absent: 1 },
  { month: 'Oct', present: 20, absent: 3 },
  { month: 'Nov', present: 18, absent: 2 },
  { month: 'Dec', present: 15, absent: 1 },
  { month: 'Jan', present: 12, absent: 1 },
];

export function StudentDashboard({ onNavigate, studentData }: StudentDashboardProps) {
  const student = studentData || defaultStudent;
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');
  
  const totalClasses = 95;
  const attendedClasses = 87;
  const attendancePercentage = Math.round((attendedClasses / totalClasses) * 100);
  
  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_50%)]" />
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
          <h1 className="text-2xl text-white">My Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black"
            onClick={() => onNavigate('attendance')}
          >
            Mark Attendance
          </Button>
        </div>
      </nav>

      <div className="relative z-10 p-6 space-y-6">
        {/* Student Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 border-cyan-500/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-cyan-400 overflow-hidden">
                    <ImageWithFallback
                      src={student.photo}
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2">{student.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-cyan-400" />
                      <span>ID: {student.enrollmentId}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Book className="w-4 h-4 text-purple-400" />
                      <span>{student.branch}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-yellow-400" />
                      <span>{student.year}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-green-400" />
                      <span>{student.department}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-cyan-400 mb-1">
                    {attendancePercentage}%
                  </div>
                  <div className="text-gray-400 text-sm">Overall Attendance</div>
                  <Badge 
                    className={`mt-2 ${
                      attendancePercentage >= 90 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : attendancePercentage >= 75 
                        ? 'bg-yellow-600 hover:bg-yellow-700'
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {attendancePercentage >= 90 ? 'Excellent' : attendancePercentage >= 75 ? 'Good' : 'Needs Improvement'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gray-800/80 border-blue-500/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-600/20 rounded-lg">
                    <Calendar className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Classes</p>
                    <p className="text-2xl font-bold text-white">{totalClasses}</p>
                    <p className="text-blue-400 text-xs">This semester</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gray-800/80 border-green-500/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-600/20 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Classes Attended</p>
                    <p className="text-2xl font-bold text-white">{attendedClasses}</p>
                    <p className="text-green-400 text-xs">Out of {totalClasses}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gray-800/80 border-red-500/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-red-600/20 rounded-lg">
                    <XCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Classes Missed</p>
                    <p className="text-2xl font-bold text-white">{totalClasses - attendedClasses}</p>
                    <p className="text-red-400 text-xs">This semester</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-gray-800/80 border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-600/20 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">This Week</p>
                    <p className="text-2xl font-bold text-white">96%</p>
                    <p className="text-green-400 text-xs">+4% from last week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-gray-800/80 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-white">Weekly Attendance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={weeklyAttendance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="week" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB',
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="attendance" 
                      stroke="#06B6D4" 
                      strokeWidth={3}
                      dot={{ fill: '#06B6D4', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, fill: '#10B981' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Subject-wise Attendance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-gray-800/80 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">Subject-wise Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectWiseAttendance.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: subject.color }}
                        />
                        <span className="text-white">{subject.subject}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 h-2 bg-gray-600 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${subject.attendance}%` }}
                            transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: subject.color }}
                          />
                        </div>
                        <span className={`font-medium ${getAttendanceColor(subject.attendance)}`}>
                          {subject.attendance}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Monthly Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="bg-gray-800/80 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white">Monthly Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB',
                    }}
                  />
                  <Bar dataKey="present" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="absent" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Attendance History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card className="bg-gray-800/80 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Recent Attendance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {attendanceHistory.map((record, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        record.status === 'Present' ? 'bg-green-400' : 'bg-red-400'
                      }`} />
                      <span className="text-white">{record.date}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400">{record.time}</span>
                      <Badge 
                        variant={record.status === 'Present' ? 'default' : 'destructive'}
                        className={record.status === 'Present' 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-red-600 hover:bg-red-700'
                        }
                      >
                        {record.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}