import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import {
  ArrowLeft,
  Users,
  TrendingUp,
  Shield,
  Download,
  Search,
  Calendar,
  Filter,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

interface DashboardProps {
  onNavigate: (
    page: "home" | "register" | "attendance" | "dashboard",
  ) => void;
}

// Mock data for charts and tables
const attendanceData = [
  { day: "Mon", present: 45, absent: 5 },
  { day: "Tue", present: 48, absent: 2 },
  { day: "Wed", present: 42, absent: 8 },
  { day: "Thu", present: 47, absent: 3 },
  { day: "Fri", present: 44, absent: 6 },
];

const branchData = [
  { name: "CSE", value: 35, color: "#3B82F6" },
  { name: "ECE", value: 28, color: "#10B981" },
  { name: "ME", value: 20, color: "#F59E0B" },
  { name: "CE", value: 17, color: "#EF4444" },
];

const weeklyTrend = [
  { week: "Week 1", attendance: 92 },
  { week: "Week 2", attendance: 89 },
  { week: "Week 3", attendance: 94 },
  { week: "Week 4", attendance: 88 },
];

const mockStudents = [
  {
    id: 1,
    name: "Yashvi Mashru",
    enrollmentId: "CS2021001",
    branch: "CSE",
    attendance: "95%",
    lastSeen: "2025-01-15 10:30 AM",
    status: "Present",
  },
  {
    id: 2,
    name: "Drishti Butani",
    enrollmentId: "CS2021002",
    branch: "CSE",
    attendance: "92%",
    lastSeen: "2025-01-15 10:25 AM",
    status: "Present",
  },
  {
    id: 3,
    name: "Hitakshi Boghani",
    enrollmentId: "CS2021003",
    branch: "CSE",
    attendance: "97%",
    lastSeen: "2025-01-15 10:20 AM",
    status: "Present",
  },
  {
    id: 4,
    name: "Vranda Mehta",
    enrollmentId: "CS2021004",
    branch: "ECE",
    attendance: "88%",
    lastSeen: "2025-01-14 02:15 PM",
    status: "Absent",
  },
];

const anomalyLogs = [
  {
    id: 1,
    type: "Spoof Attempt",
    timestamp: "2025-01-15 10:45 AM",
    description: "Photo spoofing detected",
    severity: "High",
  },
  {
    id: 2,
    type: "Multiple Faces",
    timestamp: "2025-01-15 09:30 AM",
    description: "Multiple faces in frame",
    severity: "Medium",
  },
  {
    id: 3,
    type: "Unknown Person",
    timestamp: "2025-01-15 08:15 AM",
    description: "Unregistered face detected",
    severity: "Low",
  },
];

export function AdminDashboard({ onNavigate }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      student.enrollmentId
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesBranch =
      branchFilter === "all" || student.branch === branchFilter;
    const matchesStatus =
      statusFilter === "all" ||
      student.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesBranch && matchesStatus;
  });

  const exportData = () => {
    // Simulate export functionality
    alert("Attendance data exported to Excel successfully!");
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
            onClick={() => onNavigate("home")}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-2xl text-white">
            Admin Dashboard
          </h1>
        </div>

        <Button
          onClick={exportData}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </nav>

      <div className="relative z-10 p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gray-800/80 border-blue-500/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-600/20 rounded-lg">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">
                      Total Students
                    </p>
                    <p className="text-2xl font-bold text-white">
                      147
                    </p>
                    <p className="text-green-400 text-xs">
                      +5 this week
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gray-800/80 border-green-500/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-600/20 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">
                      Today's Attendance
                    </p>
                    <p className="text-2xl font-bold text-white">
                      92.5%
                    </p>
                    <p className="text-green-400 text-xs">
                      136/147 present
                    </p>
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
            <Card className="bg-gray-800/80 border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-600/20 rounded-lg">
                    <Calendar className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">
                      This Week Avg
                    </p>
                    <p className="text-2xl font-bold text-white">
                      90.8%
                    </p>
                    <p className="text-yellow-400 text-xs">
                      -1.2% from last week
                    </p>
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
                    <Shield className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">
                      Security Alerts
                    </p>
                    <p className="text-2xl font-bold text-white">
                      3
                    </p>
                    <p className="text-red-400 text-xs">
                      2 high priority
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Attendance Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="bg-gray-800/80 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-white">
                  Daily Attendance Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={attendanceData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#374151"
                    />
                    <XAxis dataKey="day" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                    />
                    <Bar
                      dataKey="present"
                      fill="#10B981"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="absent"
                      fill="#EF4444"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Branch Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-gray-800/80 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">
                  Branch Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={branchData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                      strokeWidth={2}
                    >
                      {branchData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {branchData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2"
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-300">
                        {item.name}: {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Student Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-gray-800/80 border-cyan-500/30">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <CardTitle className="text-white">
                  Student Records
                </CardTitle>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) =>
                        setSearchTerm(e.target.value)
                      }
                      className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500"
                    />
                  </div>
                  <Select
                    value={branchFilter}
                    onValueChange={setBranchFilter}
                  >
                    <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                      <SelectValue placeholder="Filter by branch" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="all">
                        All Branches
                      </SelectItem>
                      <SelectItem value="CSE">CSE</SelectItem>
                      <SelectItem value="ECE">ECE</SelectItem>
                      <SelectItem value="ME">ME</SelectItem>
                      <SelectItem value="CE">CE</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="all">
                        All Status
                      </SelectItem>
                      <SelectItem value="present">
                        Present
                      </SelectItem>
                      <SelectItem value="absent">
                        Absent
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">
                        Name
                      </TableHead>
                      <TableHead className="text-gray-300">
                        Enrollment ID
                      </TableHead>
                      <TableHead className="text-gray-300">
                        Branch
                      </TableHead>
                      <TableHead className="text-gray-300">
                        Attendance
                      </TableHead>
                      <TableHead className="text-gray-300">
                        Last Seen
                      </TableHead>
                      <TableHead className="text-gray-300">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow
                        key={student.id}
                        className="border-gray-700 hover:bg-gray-700/30"
                      >
                        <TableCell className="text-white">
                          {student.name}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {student.enrollmentId}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {student.branch}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {student.attendance}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {student.lastSeen}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              student.status === "Present"
                                ? "default"
                                : "destructive"
                            }
                            className={
                              student.status === "Present"
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-red-600 hover:bg-red-700"
                            }
                          >
                            {student.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="bg-gray-800/80 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Shield className="w-5 h-5 text-red-400" />
                <span>Security Anomaly Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {anomalyLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 bg-gray-700/50 rounded-lg border-l-4 border-l-red-500"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">
                        {log.type}
                      </h4>
                      <Badge
                        variant={
                          log.severity === "High"
                            ? "destructive"
                            : log.severity === "Medium"
                              ? "default"
                              : "secondary"
                        }
                        className={
                          log.severity === "High"
                            ? "bg-red-600"
                            : log.severity === "Medium"
                              ? "bg-yellow-600"
                              : "bg-gray-600"
                        }
                      >
                        {log.severity}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm mb-1">
                      {log.description}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {log.timestamp}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}