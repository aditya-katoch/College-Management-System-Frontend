import UserGroupIcon from "../../../icons/UserGroupIcon";
import AddIcon from "../../../icons/AddIcon";

function StudentsTopbar({onAddClick}) {
  return (
    <div className="flex justify-between px-5 py-1.5 border-b pb-1.5 border-[#0256aa]">
      <div className="flex items-center gap-1.5 text-lg">
        <div className="text-[#002b58]">
          <UserGroupIcon />
        </div>
        <div className="text-[#042C53] font-semibold text-lg">Students</div>
        <div className="bg-[#F0F6FF] h-fit text-[#004a99] text-xs px-2 py-0.5 rounded-xl">
          248 total
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button onClick={onAddClick} className="h-fit py-2.5 flex gap-1 items-center cursor-pointer px-2.5 bg-[#378ADD] hover:bg-[#0C447C] transition duration-300 ease-in-out text-white rounded-md text-sm font-semibold">
          {" "}
          <AddIcon /> Add Student
        </button>
        <div className="bg-[#F0F6FF] text-[#004a99] w-12 h-12 rounded-full text-lg flex items-center justify-center">
          AK
        </div>
      </div>
    </div>
  );
}

export default StudentsTopbar;
