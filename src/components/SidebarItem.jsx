import { NavLink } from "react-router-dom";

function SidebarItem({ text, icon, to }) {
  return (
    <NavLink
      to={to}
      className={({
        isActive,
      }) => `flex items-center py-3.5 text-md cursor-pointer max-w-64 pl-8 rounded-md transition duration-300 ease-in-out
        ${
          isActive
            ? "bg-[#378ADD] text-white"
            : "text-[#85B7EB] hover:bg-[#1D5185]"
        }`}
    >
      <div className="pr-3">{icon}</div>
      <div>{text}</div>
    </NavLink>
  );
}

export default SidebarItem;
