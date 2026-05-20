import AddIcon from '../../../icons/AddIcon'

function FacultyTopbar({ onAddClick }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div>
        <h1 className="text-lg font-medium text-[#042C53]">Faculty</h1>
        {/* <p className="text-sm text-[#378ADD] mt-0.5">
          Manage faculty members and their assigned courses
        </p> */}
      </div>
      <div className="flex gap-2">
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium
            bg-[#185FA5] text-white rounded-lg hover:bg-[#0C447C] transition cursor-pointer"
        >
          <AddIcon /> Add faculty
        </button>
      </div>
    </div>
  );
}

export default FacultyTopbar;