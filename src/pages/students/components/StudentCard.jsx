function StudentCard({ cgpa, attendance, feeDue, booksIssued }) {
  return (
    <div className="grid grid-cols-4 gap-3 p-5 border-b border-[#E6F1FB]">
      <div className="bg-[#F0F6FF] rounded-lg p-3 text-center">
        <p className="text-xs text-[#185FA5] mb-1">CGPA</p>
        <p className="text-xl font-medium text-[#042C53]">{cgpa}</p>
      </div>
      <div className="bg-[#F0F6FF] rounded-lg p-3 text-center">
        <p className="text-xs text-[#185FA5] mb-1">Attendance</p>
        <p className="text-xl font-medium text-[#042C53]">{attendance}%</p>
      </div>
      <div className="bg-[#F0F6FF] rounded-lg p-3 text-center">
        <p className="text-xs text-[#185FA5] mb-1">Fee due</p>
        <p className={`text-xl font-medium ${feeDue > 0 ? 'text-[#A32D2D]' : 'text-[#27500A]'}`}>
          {feeDue > 0 ? `₹${feeDue.toLocaleString()}` : 'Nil'}
        </p>
      </div>
      <div className="bg-[#F0F6FF] rounded-lg p-3 text-center">
        <p className="text-xs text-[#185FA5] mb-1">Books issued</p>
        <p className="text-xl font-medium text-[#042C53]">{booksIssued}</p>
      </div>
    </div>
  );
}

export default StudentCard;