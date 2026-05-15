function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b border-[#E6F1FB] last:border-none text-sm">
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

function StudentInfoPanel({ student }) {
  const personalRows = [
    { label: 'Email',       value: student.email },
    { label: 'Phone',       value: student.phone },
    { label: 'Date of birth', value: student.dob },
    { label: 'Address',     value: student.address },
    { label: 'Guardian',    value: student.guardian_name },
  ];

  const academicRows = [
    { label: 'Roll number', value: student.roll_number },
    { label: 'Course',      value: student.course },
    { label: 'Semester',    value: `${student.semester}th Semester` },
    { label: 'Enrolled',    value: student.enrolled_at },
    { label: 'Batch',       value: student.batch },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-5">
      <InfoCard title="Personal info"  rows={personalRows} />
      <InfoCard title="Academic info"  rows={academicRows} />
    </div>
  );
}

export default StudentInfoPanel;