import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentCard from "./components/StudentCard";
import StudentInfoPanel from "./components/StudentInfoPanel";
import StudentFormModal from "./components/StudentFormModal";

// mock data
const MOCK_STUDENT = {
  id: 1,
  name: "Arjun Rao",
  email: "arjun@cms.edu",
  phone: "+91 98765 43210",
  dob: "12 Mar 2003",
  address: "Delhi, India",
  guardian_name: "Rajesh Rao",
  roll_number: "CSE2201",
  course: "B.Tech CSE",
  year: 2,
  semester: 4,
  enrolled_at: "Aug 2022",
  batch: "2022–2026",
  status: "active",
  cgpa: 8.4,
  attendance: 87,
  fee_due: 12000,
  books_issued: 2,
  results: [
    {
      subject: "Data Structures",
      marks: 87,
      total: 100,
      grade: "A",
      result: "Pass",
    },
    {
      subject: "Operating Systems",
      marks: 79,
      total: 100,
      grade: "B+",
      result: "Pass",
    },
    { subject: "DBMS", marks: 91, total: 100, grade: "A+", result: "Pass" },
    {
      subject: "Computer Networks",
      marks: 74,
      total: 100,
      grade: "B",
      result: "Pass",
    },
    {
      subject: "Software Engineering",
      marks: 55,
      total: 100,
      grade: "C",
      result: "Pass",
    },
  ],
};

const AVATAR_COLORS = [
  { bg: "bg-[#E6F1FB]", text: "text-[#185FA5]" },
  { bg: "bg-[#FBEAF0]", text: "text-[#993556]" },
  { bg: "bg-[#E1F5EE]", text: "text-[#0F6E56]" },
  { bg: "bg-[#FAEEDA]", text: "text-[#854F0B]" },
  { bg: "bg-[#EEEDFE]", text: "text-[#534AB7]" },
];

function getInitials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getAvatarColor(name = "") {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

function GradeBadge({ grade }) {
  const isTop = ["A+", "A"].includes(grade);
  const isMid = ["B+", "B"].includes(grade);
  return (
    <span
      className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium
      ${
        isTop
          ? "bg-[#EAF3DE] text-[#27500A]"
          : isMid
            ? "bg-[#E6F1FB] text-[#0C447C]"
            : "bg-[#FAEEDA] text-[#633806]"
      }`}
    >
      {grade}
    </span>
  );
}

function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const student = MOCK_STUDENT;

  const { bg, text } = getAvatarColor(student.name);

  const [modal, setModal] = useState({ open: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const closeModal = () => setModal({ open: false });

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      console.log("update:", formData);
      closeModal();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-2">

      <div className="flex items-center gap-3 mb-5 px-1 py-1.5">
        <button
          onClick={() => navigate("/admin/students")}
          className="flex items-center gap-1.5 px-3 py-2 text-sm border
            border-[#B5D4F4] text-[#185FA5] rounded-lg hover:bg-[#E6F1FB] transition cursor-pointer"
        >
          ← Back
        </button>
        <div className="flex-1" />
        <button
          onClick={() => setModal({ open: true })}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium
    bg-[#185FA5] text-white rounded-lg hover:bg-[#0C447C] transition cursor-pointer"
        >
          Edit student
        </button>
        <button
          className="flex items-center gap-1.5 px-3 py-2 text-sm border
            border-[#B5D4F4] text-[#185FA5] rounded-lg hover:bg-[#E6F1FB] transition cursor-pointer"
        >
          ↓ Download ID card
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#B5D4F4] overflow-hidden">
        <div className="bg-[#185FA5] px-6 py-5 flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center
            text-lg font-medium border-2 border-white/30 shrink-0 ${bg} ${text}`}
          >
            {getInitials(student.name)}
          </div>
          <div className="flex-1">
            <p className="text-white text-lg font-medium">{student.name}</p>
            <p className="text-[#85B7EB] text-sm mt-0.5">
              {student.roll_number} &nbsp;·&nbsp; {student.course} &nbsp;·&nbsp;
              Year {student.year} &nbsp;·&nbsp; Sem {student.semester}
            </p>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium
            ${
              student.status === "active"
                ? "bg-[#EAF3DE] text-[#27500A]"
                : "bg-[#F1EFE8] text-[#5F5E5A]"
            }`}
          >
            {student.status === "active" ? "Active" : "Inactive"}
          </span>
        </div>

        <StudentCard
          cgpa={student.cgpa}
          attendance={student.attendance}
          feeDue={student.fee_due}
          booksIssued={student.books_issued}
        />

        <StudentInfoPanel student={student} />

        <div className="px-5 pb-5">
          <div className="bg-[#F0F6FF] rounded-lg p-4">
            <p className="text-xs font-medium text-[#185FA5] uppercase tracking-wide mb-3">
              Recent exam results
            </p>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  {["Subject", "Marks", "Out of", "Grade", "Result"].map(
                    (col) => (
                      <th
                        key={col}
                        className="text-left py-2 text-xs font-medium
                      text-[#185FA5] uppercase tracking-wide border-b border-[#B5D4F4]"
                      >
                        {col}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {student.results.map((r, i) => (
                  <tr
                    key={i}
                    className="border-b border-[#E6F1FB] last:border-none"
                  >
                    <td className="py-2.5 text-[#042C53] font-medium">
                      {r.subject}
                    </td>
                    <td className="py-2.5 text-[#042C53]">{r.marks}</td>
                    <td className="py-2.5 text-[#378ADD]">{r.total}</td>
                    <td className="py-2.5">
                      <GradeBadge grade={r.grade} />
                    </td>
                    <td className="py-2.5">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium
                        ${
                          r.result === "Pass"
                            ? "bg-[#EAF3DE] text-[#27500A]"
                            : "bg-[#FCEBEB] text-[#791F1F]"
                        }`}
                      >
                        {r.result}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <StudentFormModal
        isOpen={modal.open}
        mode="edit"
        student={student}
        onClose={closeModal}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      
    </div>
  );
}

export default StudentProfile;
