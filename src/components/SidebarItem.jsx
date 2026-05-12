function SidebarItem({ text, icon }) {
  return (
    <div className="flex items-center py-3.5 text-md cursor-pointer max-w-64 pl-8 rounded-md hover:bg-[#1D5185] transition duration-300 ease-in-out">
      <div className="pr-3">{icon}</div>
      <div>{text}</div>
    </div>
  );
}

export default SidebarItem;
