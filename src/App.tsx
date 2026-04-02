/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { MOCK_COURSES } from "./constants";
import { View, User, Notification, Course } from "./types";

// Components
import { Layout } from "./components/layout/Layout";
import { Login } from "./components/features/Login";
import { Dashboard } from "./components/features/Dashboard";
import { Schedule } from "./components/features/Schedule";
import { Grades } from "./components/features/Grades";
import { PreReg } from "./components/features/PreReg";
import { Queue } from "./components/features/Queue";
import { Admin } from "./components/features/Admin";
import { EnrollmentResults } from "./components/features/EnrollmentResults";
import { SearchInstructor } from "./components/features/SearchInstructor";
import { LoginHistory } from "./components/features/LoginHistory";

export default function App() {
  const [view, setView] = useState<View>("login");
  const [user, setUser] = useState<User | null>(null);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([
    "General Menu",
    "Student Menu",
  ]);
  const [showPassword, setShowPassword] = useState(false);

  // Peak Mode & Queue State
  const [isPreRegPeakMode, setIsPreRegPeakMode] = useState(false);
  const [isGradesPeakMode, setIsGradesPeakMode] = useState(false);

  const [isPreRegQueued, setIsPreRegQueued] = useState(false);
  const [preRegQueuePosition, setPreRegQueuePosition] = useState(0);
  const [preRegEta, setPreRegEta] = useState(0);

  const [isGradesQueued, setIsGradesQueued] = useState(false);
  const [gradesQueuePosition, setGradesQueuePosition] = useState(0);
  const [gradesEta, setGradesEta] = useState(0);

  const [hasPreRegAccessToken, setHasPreRegAccessToken] = useState(false);
  const [hasGradesAccessToken, setHasGradesAccessToken] = useState(false);
  const [queuedTargetView, setQueuedTargetView] = useState<View | null>(null);
  const [activeQueueType, setActiveQueueType] = useState<
    "pre-reg" | "grades" | null
  >(null);

  // Grades State
  const [selectedTerm, setSelectedTerm] = useState("1/2025");
  const [submittedCourses, setSubmittedCourses] = useState<string[]>([]);

  // Registration State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("All");
  const [registeredCourses, setRegisteredCourses] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Admin State
  const [courseCapacities, setCourseCapacities] = useState<
    Record<string, number>
  >(Object.fromEntries(MOCK_COURSES.map((c) => [c.id, c.capacity])));
  const [systemMetrics, setSystemMetrics] = useState({
    activeUsers: 1242,
    errors: 0.02,
    queueSize: 100,
    traffic: Array.from({ length: 24 }).map((_, i) => ({
      time: `${i}:00`,
      value: Math.floor(Math.random() * 2000) + 500,
    })),
  });

  // --- Effects ---

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications((prev) => prev.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (
      (isPreRegQueued && preRegQueuePosition > 0) ||
      (isGradesQueued && gradesQueuePosition > 0)
    ) {
      timer = setInterval(() => {
        if (isPreRegQueued && preRegQueuePosition > 0) {
          setPreRegEta((prev) => {
            const nextEta = prev > 0 ? prev - 1 / 60 : 0;
            setPreRegQueuePosition(Math.ceil(nextEta * 100));
            return nextEta;
          });
        }
        if (isGradesQueued && gradesQueuePosition > 0) {
          setGradesEta((prev) => {
            const nextEta = prev > 0 ? prev - 1 / 60 : 0;
            setGradesQueuePosition(Math.ceil(nextEta * 100));
            return nextEta;
          });
        }
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [
    isPreRegQueued,
    preRegQueuePosition,
    isGradesQueued,
    gradesQueuePosition,
  ]);

  // Handle redirection when queue reaches zero
  useEffect(() => {
    if (isPreRegQueued && preRegQueuePosition === 0) {
      setHasPreRegAccessToken(true);
      setIsPreRegQueued(false);
      addNotification("Registration Access granted!", "success");
      if (queuedTargetView === "pre-reg") {
        setView("pre-reg");
        setQueuedTargetView(null);
        setActiveQueueType(null);
      }
    }
    if (isGradesQueued && gradesQueuePosition === 0) {
      setHasGradesAccessToken(true);
      setIsGradesQueued(false);
      addNotification("Grades Access granted!", "success");
      if (queuedTargetView === "grades") {
        setView("grades");
        setQueuedTargetView(null);
        setActiveQueueType(null);
      }
    }
  }, [
    isPreRegQueued,
    preRegQueuePosition,
    isGradesQueued,
    gradesQueuePosition,
    queuedTargetView,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics((prev) => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 21) - 10,
        traffic: [
          ...prev.traffic.slice(1),
          {
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            value: Math.floor(Math.random() * 2000) + 500,
          },
        ],
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // --- Handlers ---

  const addNotification = (message: string, type: Notification["type"]) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [...prev, { id, message, type }]);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: "6831503000",
      name: "Admin",
      email: "6831503000@lamduan.mfu.ac.th",
    });
    setView("dashboard");
    addNotification("Welcome back, Admin", "success");
  };

  const toggleMenu = (menu: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menu) ? prev.filter((m) => m !== menu) : [...prev, menu],
    );
  };

  const navigateToProtectedView = (targetView: View) => {
    const isPreRegTarget = targetView === "pre-reg";
    const isGradesTarget = targetView === "grades";

    if (isPreRegTarget && isPreRegPeakMode && !hasPreRegAccessToken) {
      if (!isPreRegQueued) {
        setIsPreRegQueued(true);
        setPreRegQueuePosition(100);
        setPreRegEta(1.0); // 1 minute
        addNotification(
          "Registration traffic detected. You have been placed in the queue.",
          "info",
        );
      }
      setQueuedTargetView("pre-reg");
      setActiveQueueType("pre-reg");
      setView("queue");
      return;
    }

    if (isGradesTarget && isGradesPeakMode && !hasGradesAccessToken) {
      if (!isGradesQueued) {
        setIsGradesQueued(true);
        setGradesQueuePosition(100);
        setGradesEta(1.0); // 1 minute
        addNotification(
          "Grades traffic detected. You have been placed in the queue.",
          "info",
        );
      }
      setQueuedTargetView("grades");
      setActiveQueueType("grades");
      setView("queue");
      return;
    }

    setView(targetView);
  };

  const handleAddCourse = (course: Course) => {
    if (registeredCourses.includes(course.id)) return;
    if (submittedCourses.includes(course.id)) return;

    const currentCredits = [...registeredCourses, ...submittedCourses].reduce(
      (acc, id) => {
        const c = MOCK_COURSES.find((x) => x.id === id);
        return acc + (c?.credits || 0);
      },
      0,
    );

    if (currentCredits + course.credits > 22) {
      addNotification("Credit limit exceeded (Max 22 credits)", "error");
      return;
    }

    setRegisteredCourses((prev) => [...prev, course.id]);
    addNotification(`Successfully added ${course.code} to plan`, "success");
  };

  const handleDropCourse = (courseId: string, isSubmitted = false) => {
    if (isSubmitted) {
      setSubmittedCourses((prev) => prev.filter((id) => id !== courseId));
      addNotification("Course dropped successfully", "info");
    } else {
      setRegisteredCourses((prev) => prev.filter((id) => id !== courseId));
      addNotification("Course removed from plan", "info");
    }
  };

  const handleSubmitRegistration = async () => {
    if (registeredCourses.length === 0) {
      addNotification("No courses in your plan", "error");
      return;
    }

    setIsProcessing(true);
    addNotification("Initiating transactional registration...", "info");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const success = Math.random() > 0.1;

    setIsProcessing(false);
    if (success) {
      addNotification("Registration submitted successfully!", "success");
      setSubmittedCourses((prev) => [...prev, ...registeredCourses]);
      setRegisteredCourses([]);
      setView("dashboard");
    } else {
      addNotification(
        "Transaction failed: Seat limit reached for one or more courses.",
        "error",
      );
    }
  };

  const totalCredits = [...registeredCourses, ...submittedCourses].reduce(
    (acc, id) => {
      const course = MOCK_COURSES.find((c) => c.id === id);
      return acc + (course?.credits || 0);
    },
    0,
  );

  const handleLogout = () => {
    setUser(null);
    setView("login");
  };

  // --- Render ---

  if (view === "login") {
    return (
      <Login
        handleLogin={handleLogin}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    );
  }

  return (
    <Layout
      user={user}
      view={view}
      setView={setView}
      isPeakMode={isPreRegPeakMode || isGradesPeakMode}
      isPreRegQueued={isPreRegQueued}
      preRegQueuePosition={preRegQueuePosition}
      preRegEta={preRegEta}
      isGradesQueued={isGradesQueued}
      gradesQueuePosition={gradesQueuePosition}
      gradesEta={gradesEta}
      setActiveQueueType={setActiveQueueType}
      expandedMenus={expandedMenus}
      toggleMenu={toggleMenu}
      navigateToProtectedView={navigateToProtectedView}
      handleLogout={handleLogout}
      notifications={notifications}
    >
      {view === "dashboard" && (
        <Dashboard
          user={user}
          setView={setView}
          navigateToProtectedView={navigateToProtectedView}
          submittedCourses={submittedCourses}
          handleDropCourse={handleDropCourse}
        />
      )}
      {view === "schedule" && <Schedule />}
      {view === "grades" && (
        <Grades selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
      )}
      {view === "pre-reg" && (
        <PreReg
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedFaculty={selectedFaculty}
          setSelectedFaculty={setSelectedFaculty}
          registeredCourses={registeredCourses}
          submittedCourses={submittedCourses}
          handleDropCourse={handleDropCourse}
          handleAddCourse={handleAddCourse}
          handleSubmitRegistration={handleSubmitRegistration}
          isProcessing={isProcessing}
          totalCredits={totalCredits}
          courseCapacities={courseCapacities}
        />
      )}
      {view === "queue" && (
        <Queue
          queuePosition={
            activeQueueType === "pre-reg"
              ? preRegQueuePosition
              : gradesQueuePosition
          }
          eta={activeQueueType === "pre-reg" ? preRegEta : gradesEta}
          title={
            activeQueueType === "pre-reg"
              ? "Registration Waiting Room"
              : "Grades Waiting Room"
          }
        />
      )}
      {view === "admin" && (
        <Admin
          isPreRegPeakMode={isPreRegPeakMode}
          setIsPreRegPeakMode={setIsPreRegPeakMode}
          isGradesPeakMode={isGradesPeakMode}
          setIsGradesPeakMode={setIsGradesPeakMode}
          addNotification={addNotification}
          systemMetrics={systemMetrics}
          courseCapacities={courseCapacities}
          setCourseCapacities={setCourseCapacities}
        />
      )}
      {view === "enrollment-results" && <EnrollmentResults />}
      {view === "search-instructor" && <SearchInstructor />}
      {view === "login-history" && <LoginHistory />}
      {view === "exit-exam" && (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
            <FileText size={40} className="text-mfu-text-muted" />
          </div>
          <h2 className="text-3xl font-medium text-mfu-text-main">
            Exit Examination System
          </h2>
          <p className="text-mfu-text-muted max-w-md">
            The exit examination system is currently closed for maintenance.
            Please check back during the registration period.
          </p>
        </div>
      )}
    </Layout>
  );
}
