import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import  AdminDashboard  from "./pages/AdminDashboard";
import StudentList from "./pages/students/StudentList"
import DashboardPage from "./pages/dashboard/DashboardPage";
import FacultyPage from "./pages/faculty/FacultyPage";
import CoursesPage from "./pages/courses/CoursesPage";
import ExamsPage from "./pages/exams/ExamsPage";
import FeesPage from "./pages/fees/FeesPage";
import LibraryPage from "./pages/libraryy/LibraryPage";
import NoticesPage from "./pages/notices/NoticesPage";
import StudentProfile from "./pages/students/StudentProfile";
import Login from "./pages/auth/Login";
import FacultyList from "./pages/faculty/FacultyList";
import FacultyProfile from "./pages/faculty/FacultyProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<Navigate to="dashboard" replace/>} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="students" element={<StudentList />} />
            <Route path="students/:id" element={<StudentProfile />} />
            <Route path="faculty" element={<FacultyPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="exams" element={<ExamsPage />} />
            <Route path="fees" element={<FeesPage />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="notices" element={<NoticesPage />} />
            <Route path="faculty" element={<FacultyList />}/>
            <Route path="faculty/:id" element={<FacultyProfile />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
