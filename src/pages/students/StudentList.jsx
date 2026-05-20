import { useState } from 'react';
import StudentFilters from './components/StudentFilters';
import StudentTable from './components/StudentTable';
import StudentsTopbar from './components/StudentsTopbar';
import StudentFormModal from './components/StudentFormModal';

const MOCK_STUDENTS = [
  { id: 1, name: 'Arjun Rao',    email: 'arjun@cms.edu',  roll_number: 'CSE2201', course: 'B.Tech CSE', year: 2, cgpa: 8.4, status: 'active' },
  { id: 2, name: 'Priya Sharma', email: 'priya@cms.edu',  roll_number: 'MBA2301', course: 'MBA',        year: 1, cgpa: 9.1, status: 'active' },
  { id: 3, name: 'Karan Mehta',  email: 'karan@cms.edu',  roll_number: 'ECE2102', course: 'B.Tech ECE', year: 3, cgpa: 6.8, status: 'inactive' },
  { id: 4, name: 'Neha Joshi',   email: 'neha@cms.edu',   roll_number: 'BCA2401', course: 'BCA',        year: 4, cgpa: 7.9, status: 'active' },
  { id: 5, name: 'Rohit Kumar',  email: 'rohit@cms.edu',  roll_number: 'CSE2205', course: 'B.Tech CSE', year: 2, cgpa: 5.4, status: 'active' },
  { id: 6, name: 'Sneha Patil',  email: 'sneha@cms.edu',  roll_number: 'MBA2302', course: 'MBA',        year: 1, cgpa: 8.8, status: 'active' },
  { id: 7, name: 'Dev Anand',    email: 'dev@cms.edu',    roll_number: 'ECE2103', course: 'B.Tech ECE', year: 2, cgpa: 7.2, status: 'inactive' },
  { id: 8, name: 'Riya Patel',   email: 'riya@cms.edu',   roll_number: 'BCA2402', course: 'BCA',        year: 1, cgpa: 8.1, status: 'active' },
];

const PER_PAGE = 5;

function StudentList() {
  const [filters, setFilters]           = useState({ search: '', course: '', year: '', status: '' });
  const [currentPage, setCurrentPage]   = useState(1);
  const [modal, setModal]               = useState({ open: false, mode: 'add', student: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filtered = MOCK_STUDENTS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(filters.search.toLowerCase())
      || s.roll_number.toLowerCase().includes(filters.search.toLowerCase());
    const matchCourse = !filters.course || s.course.toLowerCase().replace(/[\s.]/g, '-') === filters.course;
    const matchYear   = !filters.year   || String(s.year) === filters.year;
    const matchStatus = !filters.status || s.status === filters.status;
    return matchSearch && matchCourse && matchYear && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const openAdd    = () => setModal({ open: true, mode: 'add', student: null });
  const openEdit   = (student) => setModal({ open: true, mode: 'edit', student });
  const closeModal = () => setModal({ open: false, mode: 'add', student: null });

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      console.log('submit:', formData);
      closeModal();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id) => {
    console.log('delete student', id);
  };

  return (
    <div>
      <StudentsTopbar onAddClick={openAdd} />

      <div className='p-3'>
      <div className="bg-white rounded-xl border border-[#B5D4F4]">
        <StudentFilters filters={filters} onChange={handleFiltersChange} />
        <StudentTable
          students={paginated}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={filtered.length}
          perPage={PER_PAGE}
          onPageChange={setCurrentPage}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </div>
      </div>

      <StudentFormModal
        isOpen={modal.open}
        mode={modal.mode}
        student={modal.student}
        onClose={closeModal}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default StudentList;