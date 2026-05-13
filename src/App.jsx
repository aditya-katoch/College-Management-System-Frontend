import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import  AdminDashboard  from "./pages/AdminDashboard";
import Students from "../src/components/Students"
import Dashboard from "./components/Dashboard";
import Faculty from "./components/Faculty";
import Courses from "./components/Courses";
import Exams from "./components/Exams";
import Fees from "./components/Fees";
import Library from "./components/Library";
import Notices from "./components/Notices";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<Navigate to="dashboard" replace/>} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="faculty" element={<Faculty />} />
            <Route path="courses" element={<Courses />} />
            <Route path="exams" element={<Exams />} />
            <Route path="fees" element={<Fees />} />
            <Route path="library" element={<Library />} />
            <Route path="notices" element={<Notices />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
