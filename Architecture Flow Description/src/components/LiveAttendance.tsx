import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Camera, CameraOff, CheckCircle, XCircle, AlertTriangle, Eye, User, GraduationCap, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import drishtiPhoto from 'figma:asset/f872924040917653010b73015adc0b60c5567d87.png';

interface LiveAttendanceProps {
  onNavigate: (page: 'home' | 'register' | 'attendance' | 'dashboard') => void;
}

interface AttendanceRecord {
  id: string;
  name: string;
  enrollmentId: string;
  timestamp: string;
  status: 'present' | 'unknown' | 'spoof';
}

// Team members for demonstration
const mockStudents = [
  { 
    name: 'Yashvi Mashru', 
    enrollmentId: 'CS2021001', 
    branch: 'Computer Science Engineering',
    photo: 'https://images.unsplash.com/photo-1744901581831-3ffe7d3d05f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHdvbWFuJTIwc3R1ZGVudHxlbnwxfHx8fDE3NTc5MDY3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    year: '3rd Year',
    department: 'School of Engineering'
  },
  { 
    name: 'Drishti Butani', 
    enrollmentId: 'CS2021002', 
    branch: 'Computer Science Engineering',
    photo: drishtiPhoto,
    year: '3rd Year',
    department: 'School of Engineering'
  },
  { 
    name: 'Hitakshi Boghani', 
    enrollmentId: 'CS2021003', 
    branch: 'Computer Science Engineering',
    photo: 'https://images.unsplash.com/photo-1726618069974-c1d5d27f612b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBlbmdpbmVlcmluZyUyMHN0dWRlbnQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTc5MDY3OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    year: '3rd Year',
    department: 'School of Engineering'
  },
  { 
    name: 'Vranda Mehta', 
    enrollmentId: 'CS2021004', 
    branch: 'Electronics & Communication Engineering',
    photo: 'https://images.unsplash.com/photo-1731419223715-aec6664f9011?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwY29tcHV0ZXIlMjBzY2llbmNlJTIwc3R1ZGVudHxlbnwxfHx8fDE3NTc5MDY3OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    year: '3rd Year',
    department: 'School of Engineering'
  },
];

export function LiveAttendance({ onNavigate }: LiveAttendanceProps) {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [currentDetection, setCurrentDetection] = useState<{
    status: 'scanning' | 'detected' | 'unknown' | 'spoof' | null;
    student?: any;
    confidence?: number;
  }>({ status: null });
  const [livenessCheck, setLivenessCheck] = useState<'pending' | 'blink' | 'smile' | 'passed' | 'failed'>('pending');
  const [recordCounter, setRecordCounter] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isCameraOn) {
      interval = setInterval(() => {
        simulateFaceDetection();
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCameraOn]);

  const simulateFaceDetection = () => {
    if (isProcessing) return;
    
    setCurrentDetection({ status: 'scanning' });
    setIsProcessing(true);

    setTimeout(() => {
      const random = Math.random();
      
      if (random < 0.6) {
        // Recognized student
        const randomStudent = mockStudents[Math.floor(Math.random() * mockStudents.length)];
        const confidence = 85 + Math.random() * 10; // 85-95% confidence
        
        setCurrentDetection({
          status: 'detected',
          student: randomStudent,
          confidence: Math.round(confidence)
        });
        
        // Start liveness check
        setLivenessCheck('blink');
        
        setTimeout(() => {
          setLivenessCheck('smile');
          setTimeout(() => {
            setLivenessCheck('passed');
            markAttendance(randomStudent, 'present');
          }, 1500);
        }, 2000);
        
      } else if (random < 0.9) {
        // Unknown person
        setCurrentDetection({ status: 'unknown' });
        setLivenessCheck('failed');
        markAttendance({ name: 'Unknown Person', enrollmentId: 'N/A' }, 'unknown');
      } else {
        // Spoof attempt
        setCurrentDetection({ status: 'spoof' });
        setLivenessCheck('failed');
        markAttendance({ name: 'Spoof Attempt', enrollmentId: 'N/A' }, 'spoof');
      }
      
      setIsProcessing(false);
      
      setTimeout(() => {
        setCurrentDetection({ status: null });
        setLivenessCheck('pending');
      }, 4000);
    }, 2000);
  };

  const markAttendance = (student: any, status: 'present' | 'unknown' | 'spoof') => {
    setRecordCounter(prev => prev + 1);
    const record: AttendanceRecord = {
      id: `${Date.now()}-${recordCounter}-${Math.random().toString(36).substr(2, 9)}`,
      name: student.name,
      enrollmentId: student.enrollmentId,
      timestamp: new Date().toLocaleTimeString(),
      status
    };
    
    setAttendanceRecords(prev => [record, ...prev]);
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    if (isCameraOn) {
      setCurrentDetection({ status: null });
      setLivenessCheck('pending');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-400';
      case 'unknown': return 'text-yellow-400';
      case 'spoof': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />;
      case 'unknown': return <XCircle className="w-4 h-4" />;
      case 'spoof': return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
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
          <h1 className="text-2xl text-white">Live Attendance</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="border-green-500 text-green-400">
            {attendanceRecords.filter(r => r.status === 'present').length} Present
          </Badge>
          <Badge variant="outline" className="border-yellow-500 text-yellow-400">
            {attendanceRecords.filter(r => r.status === 'unknown').length} Unknown
          </Badge>
          <Badge variant="outline" className="border-red-500 text-red-400">
            {attendanceRecords.filter(r => r.status === 'spoof').length} Spoof Attempts
          </Badge>
        </div>
      </nav>

      <div className="relative z-10 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          
          {/* Camera Feed */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/80 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Live Camera Feed</span>
                  <Button
                    onClick={toggleCamera}
                    className={`${isCameraOn ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
                  >
                    {isCameraOn ? <CameraOff className="w-4 h-4 mr-2" /> : <Camera className="w-4 h-4 mr-2" />}
                    {isCameraOn ? 'Stop Camera' : 'Start Camera'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                  {isCameraOn ? (
                    <div className="w-full h-full relative">
                      {/* Simulated Video Feed Background */}
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 relative">
                        {/* Simulated person silhouette for demo */}
                        <motion.div
                          animate={{ 
                            scale: [1, 1.02, 1],
                            opacity: [0.3, 0.5, 0.3]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className="w-32 h-40 bg-gradient-to-b from-gray-600/40 to-gray-700/60 rounded-full transform -translate-y-4" />
                        </motion.div>
                        
                        {/* Moving particles to simulate live video */}
                        {[...Array(20)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
                            animate={{
                              x: [Math.random() * 400, Math.random() * 400],
                              y: [Math.random() * 300, Math.random() * 300],
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
                        
                        {/* Grid overlay to simulate camera feed */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                            {[...Array(48)].map((_, i) => (
                              <div key={i} className="border border-cyan-500/20"></div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Live feed indicators */}
                        <div className="absolute top-4 left-4 flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-red-400 text-sm font-mono">LIVE</span>
                          <span className="text-cyan-400 text-xs font-mono ml-4">
                            {new Date().toLocaleTimeString()}
                          </span>
                        </div>
                        
                        {/* Capture info overlay */}
                        <div className="absolute top-4 right-4 text-cyan-400 text-xs font-mono space-y-1">
                          <div>RES: 1920x1080</div>
                          <div>FPS: 30</div>
                          <div>AI: ACTIVE</div>
                          <div>QUALITY: HD</div>
                        </div>
                        
                        {/* Focus indicator */}
                        <motion.div
                          animate={{ 
                            scale: [0.8, 1.2, 0.8],
                            rotate: [0, 360]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute top-6 right-6 w-6 h-6 border-2 border-green-400 rounded-full"
                        />
                        
                        {/* Recording indicator */}
                        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                          <motion.div
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-2 h-2 bg-red-500 rounded-full"
                          />
                          <span className="text-red-400 text-xs font-mono">REC</span>
                        </div>
                        
                        {/* Face detection area with improved styling */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            {/* Main detection box */}
                            <motion.div
                              animate={{ 
                                borderColor: ['#06B6D4', '#10B981', '#06B6D4'],
                                scale: [1, 1.05, 1]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="w-52 h-64 border-2 rounded-lg relative bg-gradient-to-b from-transparent to-cyan-500/5"
                            >
                              {/* Corner brackets */}
                              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-cyan-400 rounded-tl-lg"></div>
                              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-cyan-400 rounded-tr-lg"></div>
                              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-cyan-400 rounded-bl-lg"></div>
                              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-cyan-400 rounded-br-lg"></div>
                              
                              {/* Scanning animation */}
                              <motion.div
                                animate={{ y: [-10, 240, -10] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70"
                              />
                              
                              {/* Face detection grid */}
                              <div className="absolute inset-4 grid grid-cols-3 grid-rows-4 gap-1">
                                {[...Array(12)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    animate={{ 
                                      opacity: [0.2, 0.8, 0.2],
                                      scale: [0.8, 1.2, 0.8]
                                    }}
                                    transition={{ 
                                      duration: 1, 
                                      repeat: Infinity,
                                      delay: i * 0.1
                                    }}
                                    className="w-2 h-2 bg-cyan-400 rounded-full"
                                  />
                                ))}
                              </div>
                              
                              {/* Center crosshair */}
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 4, repeat: Infinity }}
                                  className="w-8 h-8 border-2 border-green-400 rounded-full relative"
                                >
                                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-green-400 rounded-full" />
                                </motion.div>
                              </div>
                              
                              {/* Detection status */}
                              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800/90 px-3 py-1 rounded text-xs text-cyan-400 font-mono">
                                {currentDetection.status === 'scanning' ? 'SCANNING...' : 'READY'}
                              </div>
                            </motion.div>
                          </div>
                        </div>
                        
                        {/* Face detection points with improved visibility */}
                        {!currentDetection.status && (
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0"
                          >
                            {[...Array(8)].map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{ 
                                  scale: [0.5, 1.5, 0.5],
                                  opacity: [0.3, 1, 0.3]
                                }}
                                transition={{ 
                                  duration: 2, 
                                  repeat: Infinity,
                                  delay: i * 0.2
                                }}
                                className="absolute w-3 h-3 bg-cyan-400 rounded-full shadow-lg"
                                style={{
                                  left: `${15 + (i % 4) * 25}%`,
                                  top: `${25 + Math.floor(i / 4) * 50}%`,
                                  boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)'
                                }}
                              />
                            ))}
                          </motion.div>
                        )}
                        
                        {/* Exposure/focus indicators */}
                        <div className="absolute bottom-4 right-4 space-y-1">
                          <div className="flex items-center space-x-2 text-xs text-cyan-400">
                            <div className="w-8 h-1 bg-gray-600 rounded">
                              <motion.div 
                                className="h-full bg-cyan-400 rounded"
                                animate={{ width: ['20%', '80%', '60%'] }}
                                transition={{ duration: 3, repeat: Infinity }}
                              />
                            </div>
                            <span>EXP</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-green-400">
                            <div className="w-8 h-1 bg-gray-600 rounded">
                              <div className="w-3/4 h-full bg-green-400 rounded" />
                            </div>
                            <span>FOC</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Camera is off. Click "Start Camera" to begin attendance marking.</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Liveness Check Status */}
                {isCameraOn && (
                  <div className="mt-4 p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-5 h-5 text-purple-400" />
                        <span className="text-white">Liveness Check:</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className={`flex items-center space-x-1 ${livenessCheck === 'blink' ? 'text-yellow-400' : livenessCheck === 'passed' ? 'text-green-400' : 'text-gray-400'}`}>
                          <div className={`w-2 h-2 rounded-full ${livenessCheck === 'blink' ? 'bg-yellow-400 animate-pulse' : livenessCheck === 'passed' ? 'bg-green-400' : 'bg-gray-400'}`} />
                          <span className="text-sm">Blink Detection</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${livenessCheck === 'smile' ? 'text-yellow-400' : livenessCheck === 'passed' ? 'text-green-400' : 'text-gray-400'}`}>
                          <div className={`w-2 h-2 rounded-full ${livenessCheck === 'smile' ? 'bg-yellow-400 animate-pulse' : livenessCheck === 'passed' ? 'bg-green-400' : 'bg-gray-400'}`} />
                          <span className="text-sm">Expression Check</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Student Details and Attendance Log */}
          <div className="space-y-6">
            
            {/* Current Detection Info */}
            {currentDetection.status === 'detected' && currentDetection.student && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-500/50">
                  <CardHeader>
                    <CardTitle className="text-green-400 flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Student Detected</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 rounded-full border-2 border-green-400 overflow-hidden">
                        <ImageWithFallback
                          src={currentDetection.student.photo}
                          alt={currentDetection.student.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{currentDetection.student.name}</h4>
                        <p className="text-green-400 text-sm">{currentDetection.student.enrollmentId}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div><strong>Branch:</strong> {currentDetection.student.branch}</div>
                      <div><strong>Year:</strong> {currentDetection.student.year}</div>
                      <div><strong>Confidence:</strong> <span className="text-green-400">{currentDetection.confidence}%</span></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Attendance Log */}
            <Card className="bg-gray-800/80 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">Today's Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {attendanceRecords.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No attendance records yet</p>
                  ) : (
                    attendanceRecords.map((record) => (
                      <motion.div
                        key={record.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-3 bg-gray-700/50 rounded-lg border-l-4 border-l-cyan-500"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white font-medium">{record.name}</span>
                          <div className={`flex items-center space-x-1 ${getStatusColor(record.status)}`}>
                            {getStatusIcon(record.status)}
                            <span className="text-sm capitalize">{record.status}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>{record.enrollmentId}</span>
                          <span>{record.timestamp}</span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
                
                {attendanceRecords.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <Button
                      variant="outline"
                      className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black"
                      onClick={() => onNavigate('dashboard')}
                    >
                      View Full Dashboard
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}