import { useNavigate } from "react-router-dom";
import EditIcon from "../../../icons/EditIcon"
import DeleteIcon from "../../../icons/DeleteIcon"

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

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPages = () => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
    if (currentPage >= totalPages - 3)
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center rounded-lg border
          border-[#B5D4F4] text-[#185FA5] text-sm disabled:opacity-40
          disabled:cursor-not-allowed hover:bg-[#E6F1FB] transition"
      >
        ‹
      </button>

      {getPages().map((page, i) =>
        page === "..." ? (
          <span
            key={`dot-${i}`}
            className="w-8 h-8 flex items-center justify-center
            text-sm text-[#378ADD]"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm
              border transition
              ${
                currentPage === page
                  ? "bg-[#185FA5] text-white border-[#185FA5]"
                  : "border-[#B5D4F4] text-[#185FA5] hover:bg-[#E6F1FB]"
              }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded-lg border
          border-[#B5D4F4] text-[#185FA5] text-sm disabled:opacity-40
          disabled:cursor-not-allowed hover:bg-[#E6F1FB] transition"
      >
        ›
      </button>
    </div>
  );
}

function FacultyTable({
  faculty,
  currentPage,
  totalPages,
  totalCount,
  perPage,
  onPageChange,
  onEdit,
  onDelete,
}) {
  const navigate = useNavigate();

  const from = (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, totalCount);

  if (faculty.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-[#378ADD]">
        <svg
          width="48"
          height="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          className="mb-3 opacity-40"
          aria-hidden="true"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <p className="text-sm font-medium text-[#185FA5]">No faculty found</p>
        <p className="text-xs text-[#378ADD] mt-1">
          Try adjusting your filters
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F0F6FF] border-b border-[#B5D4F4]">
              {[
                "Faculty",
                "Department",
                "Designation",
                "Courses",
                "Subjects",
                "Status",
                "Actions",
              ].map((col) => (
                <th
                  key={col}
                  className="text-left px-5 py-3 text-xs font-medium
                  text-[#185FA5] uppercase tracking-wide"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {faculty.map((f) => {
              const { bg, text } = getAvatarColor(f.name);
              return (
                <tr
                  key={f.id}
                  onClick={() => navigate(`/admin/faculty/${f.id}`)}
                  className="border-b border-[#E6F1FB] hover:bg-[#F7FAFF]
                    cursor-pointer transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center
                        justify-center text-xs font-medium shrink-0 ${bg} ${text}`}
                      >
                        {getInitials(f.name)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#042C53]">
                          {f.name}
                        </div>
                        <div className="text-xs text-[#378ADD]">{f.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-medium
                      bg-[#EEEDFE] text-[#3C3489]"
                    >
                      {f.department}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-medium
                      bg-[#E6F1FB] text-[#0C447C]"
                    >
                      {f.designation}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-[#185FA5]">
                    {f.courses}
                  </td>
                  <td className="px-5 py-3 font-medium text-[#042C53]">
                    {f.subjects_count}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium
                      ${
                        f.status === "active"
                          ? "bg-[#EAF3DE] text-[#27500A]"
                          : "bg-[#F1EFE8] text-[#5F5E5A]"
                      }`}
                    >
                      {f.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => onEdit(f)}
                        className="px-2.5 py-1.5 text-xs rounded-lg border
                          border-[#B5D4F4] text-[#185FA5] hover:bg-[#E6F1FB] transition cursor-pointer"
                      >
                        {" "}
                        <EditIcon />{" "}
                      </button>
                      <button
                        onClick={() => onDelete(f.id)}
                        className="px-2.5 py-1.5 text-xs rounded-lg border
                          border-[#F7C1C1] text-[#A32D2D] bg-[#FCEBEB]
                          hover:bg-[#F7C1C1] transition cursor-pointer"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        className="flex items-center justify-between px-5 py-3.5
        border-t border-[#E6F1FB]"
      >
        <p className="text-xs text-[#378ADD]">
          Showing {from}–{to} of {totalCount} faculty
        </p>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default FacultyTable;
