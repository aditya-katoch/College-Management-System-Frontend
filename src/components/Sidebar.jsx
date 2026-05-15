import AcademicIcon from "../icons/AcademicIcon";
import SidebarItem from "./SidebarItem";
import DashboardIcon from "../icons/DashboardIcon";
import UserIcon from "../icons/UserIcon";
import BookIcon from "../icons/BookIcon";
import FeesIcon from "../icons/FeesIcon";
import FileIcon from "../icons/FileIcon";
import NoticeIcon from "../icons/NoticeIcon";
import LibraryIcon from "../icons/LibraryIcon";
import LogoutButton from "./ui/LogoutButton";

function Sidebar() {
  return (
    <div className="fixed h-screen w-64 bg-[#0C447C] text-white">

      <div className="flex gap-2 items-center pt-3 justify-center">
        <AcademicIcon />
        <div className="text-2xl font-bold">CMS</div>
      </div>

      <div className="text-center font-semibold text-xl pt-2 border-b pb-7 border-[#85B7EB]">
        College Management
      </div>

      <div className="pt-5.5 text-[#85B7EB]">
        <SidebarItem icon={<DashboardIcon />} text="Dashboard" to="/admin/dashboard"/>
        <SidebarItem icon={<UserIcon />} text="Students" to="/admin/students"/>
        <SidebarItem icon={<AcademicIcon />} text="Faculty" to="/admin/faculty"/>
        <SidebarItem icon={<BookIcon />} text="Courses" to="/admin/courses"/>
        <SidebarItem icon={<FileIcon />} text="Exams & Results" to="/admin/exams"/>
        <SidebarItem icon={<FeesIcon />} text="Fees" to="/admin/fees"/>
        <SidebarItem icon={<LibraryIcon />} text="Library" to="/admin/library"/>
        <SidebarItem icon={<NoticeIcon />} text="Notices" to="/admin/notices"/>
      </div>

      <div className="flex justify-center mt-10">
        <LogoutButton />
      </div>

    </div>
  );
}

export default Sidebar;
