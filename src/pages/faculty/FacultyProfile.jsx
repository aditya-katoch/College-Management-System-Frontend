import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FacultyCard from "./components/FacultyCard";
import FacultyInfoPanel from "./components/FacultyInfoPanel";
import FacultyFormModal from "./components/FacultyFormModal";
import BookIcon from "../../icons/BookIcon";

const MOCK_FACULTY = {
  id: 1,
  name: "Dr. Ramesh Verma",
  email: "ramesh@cms.edu",
  phone: "+91 98100 11223",
  department: "Computer Science",
  designation: "HOD",
  qualification: "M.Tech, PhD",
  joining_date: "Aug 2015",
  courses: "B.Tech CSE, BCA",
  subjects_count: 6,
  courses_count: 2,
  status: "active",
  assigned_subjects: [
    {
      course: "B.Tech CSE",
      subjects: ["Data Structures", "DBMS", "Operating Systems"],
    },
    {
      course: "BCA",
      subjects: [
        "Programming in C",
        "Web Technologies",
        "Software Engineering",
      ],
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
    .replace(/^Dr\.\s*|^Prof\.\s*/i, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getAvatarColor(name = "") {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

function FacultyProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modal, setModal] = useState({ open: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // replace with useFacultyById(id) when API is ready
  const faculty = MOCK_FACULTY;
  const { bg, text } = getAvatarColor(faculty.name);

  const closeModal = () => setModal({ open: false });

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      console.log("update faculty:", formData);
      closeModal();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-3">
      <div className="flex items-center gap-3 mb-3.5">
        <button
          onClick={() => navigate("/admin/faculty")}
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
          Edit faculty
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#B5D4F4] overflow-hidden">
        <div className="bg-[#185FA5] px-6 py-5 flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center
            text-lg font-medium border-2 border-white/30 shrink-0 ${bg} ${text}`}
          >
            {getInitials(faculty.name)}
          </div>
          <div className="flex-1">
            <p className="text-white text-lg font-medium">{faculty.name}</p>
            <p className="text-[#85B7EB] text-sm mt-0.5">
              {faculty.designation} · {faculty.department} · Joined{" "}
              {faculty.joining_date}
            </p>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium
            ${
              faculty.status === "active"
                ? "bg-[#EAF3DE] text-[#27500A]"
                : "bg-[#F1EFE8] text-[#5F5E5A]"
            }`}
          >
            {faculty.status === "active" ? "Active" : "Inactive"}
          </span>
        </div>

        <FacultyCard
          subjectsCount={faculty.subjects_count}
          coursesCount={faculty.courses_count}
          qualification={faculty.qualification}
        />

        <FacultyInfoPanel faculty={faculty} />

        <div className="px-5 pb-5">
          <div className="bg-[#F0F6FF] rounded-lg p-4">
            <p
              className="text-xs font-medium text-[#185FA5] uppercase
              tracking-wide mb-3"
            >
              Assigned subjects
            </p>
            {faculty.assigned_subjects.map((group, i) => (
              <div key={i} className={i > 0 ? "mt-4" : ""}>
                <p className="text-xs font-medium text-[#185FA5] mb-2">
                  {group.course}
                </p>
                <div className="flex flex-wrap gap-1">
                  {group.subjects.map((subject, j) => (
                    <span
                      key={j}
                      className="inline-flex items-center gap-1.5
                      text-xs px-3 py-1.5 rounded-full bg-[#E6F1FB]
                      text-[#0C447C] font-medium"
                    >
                      <BookIcon /> {subject}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FacultyFormModal
        isOpen={modal.open}
        mode="edit"
        faculty={faculty}
        onClose={closeModal}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default FacultyProfile;
