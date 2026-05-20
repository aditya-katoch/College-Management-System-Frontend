function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b border-[#E6F1FB]
      last:border-none text-sm">
      <span className="text-[#378ADD]">{label}</span>
      <span className="text-[#042C53] font-medium">{value || '—'}</span>
    </div>
  );
}

function InfoCard({ title, rows }) {
  return (
    <div className="bg-[#F0F6FF] rounded-lg p-4">
      <p className="text-xs font-medium text-[#185FA5] uppercase tracking-wide mb-3">
        {title}
      </p>
      {rows.map((row, i) => (
        <InfoRow key={i} label={row.label} value={row.value} />
      ))}
    </div>
  );
}

function FacultyInfoPanel({ faculty }) {
  const personalRows = [
    { label: 'Email',         value: faculty.email },
    { label: 'Phone',         value: faculty.phone },
    { label: 'Qualification', value: faculty.qualification },
    { label: 'Joined',        value: faculty.joining_date },
  ];

  const academicRows = [
    { label: 'Department',  value: faculty.department },
    { label: 'Designation', value: faculty.designation },
    { label: 'Courses',     value: faculty.courses },
    { label: 'Status',      value: faculty.status === 'active' ? 'Active' : 'Inactive' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-5">
      <InfoCard title="Personal info"  rows={personalRows} />
      <InfoCard title="Academic info"  rows={academicRows} />
    </div>
  );
}

export default FacultyInfoPanel;