import { useEffect } from 'react';
import StudentForm from './StudentForm';

function StudentFormModal({ isOpen, mode = 'add', student = null, onClose, onSubmit, isSubmitting }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const isEdit = mode === 'edit';

  const initialValues = isEdit && student ? {
    first_name:    student.name?.split(' ')[0] || '',
    last_name:     student.name?.split(' ')[1] || '',
    email:         student.email,
    phone:         student.phone,
    course:        student.course,
    year:          String(student.year),
    dob:           student.dob,
    guardian_name: student.guardian_name,
    address:       student.address,
    status:        student.status,
  } : {};

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
        bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >

      <div
        className="bg-white rounded-xl border border-[#B5D4F4] w-full max-w-2xl
          max-h-[90vh] overflow-y-auto shadow-lg"
        onClick={e => e.stopPropagation()}
      >

        <div className="flex items-center justify-between px-5 py-4
          border-b border-[#E6F1FB]">
          <div>
            <h2 className="text-base font-medium text-[#042C53]">
              {isEdit ? 'Edit student' : 'Add new student'}
            </h2>
            <p className="text-xs text-[#378ADD] mt-0.5">
              {isEdit
                ? `Editing details for ${student?.name}`
                : 'Fill in the details to add a new student'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg
              text-[#378ADD] hover:bg-[#E6F1FB] hover:text-[#185FA5] transition text-lg"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <StudentForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />

      </div>
    </div>
  );
}

export default StudentFormModal;