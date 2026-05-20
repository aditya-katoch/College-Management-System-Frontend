function FacultyCard({ subjectsCount, coursesCount, qualification }) {
  return (
    <div className="grid grid-cols-3 gap-3 p-5 border-b border-[#E6F1FB]">
      <div className="bg-[#F0F6FF] rounded-lg p-3 text-center">
        <p className="text-xs text-[#185FA5] mb-1">Subjects assigned</p>
        <p className="text-xl font-medium text-[#042C53]">{subjectsCount}</p>
      </div>
      <div className="bg-[#F0F6FF] rounded-lg p-3 text-center">
        <p className="text-xs text-[#185FA5] mb-1">Courses teaching</p>
        <p className="text-xl font-medium text-[#042C53]">{coursesCount}</p>
      </div>
      <div className="bg-[#F0F6FF] rounded-lg p-3 text-center">
        <p className="text-xs text-[#185FA5] mb-1">Qualification</p>
        <p className="text-sm font-medium text-[#042C53]">{qualification}</p>
      </div>
    </div>
  );
}

export default FacultyCard;