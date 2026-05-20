import { useState } from 'react';
import FacultyFilters from './components/FacultyFilters';
import FacultyTable from './components/FacultyTable';
import FacultyTopbar from './components/FacultyTopbar';
import FacultyFormModal from './components/FacultyFormModal';

const MOCK_FACULTY = [
  { id: 1, name: 'Dr. Ramesh Verma',  email: 'ramesh@cms.edu',   phone: '+91 98100 11223', department: 'Computer Science', designation: 'HOD',            qualification: 'M.Tech, PhD', joining_date: '2015-08-01', courses: 'B.Tech CSE, BCA',        subjects_count: 6, status: 'active'   },
  { id: 2, name: 'Prof. Anita Sharma',email: 'anita@cms.edu',    phone: '+91 98200 22334', department: 'Management',       designation: 'Professor',       qualification: 'MBA, PhD',    joining_date: '2018-07-15', courses: 'MBA',                   subjects_count: 4, status: 'active'   },
  { id: 3, name: 'Dr. Kiran Joshi',   email: 'kiran@cms.edu',    phone: '+91 98300 33445', department: 'Electronics',      designation: 'Asst. Professor', qualification: 'M.Tech',      joining_date: '2020-01-10', courses: 'B.Tech ECE',            subjects_count: 5, status: 'active'   },
  { id: 4, name: 'Prof. Suresh Nair', email: 'suresh@cms.edu',   phone: '+91 98400 44556', department: 'Mathematics',      designation: 'Professor',       qualification: 'M.Sc, PhD',   joining_date: '2012-06-01', courses: 'B.Tech CSE, B.Tech ECE', subjects_count: 3, status: 'inactive' },
  { id: 5, name: 'Dr. Priya Mehta',   email: 'priya.m@cms.edu',  phone: '+91 98500 55667', department: 'Computer Science', designation: 'Asst. Professor', qualification: 'M.Tech',      joining_date: '2021-08-01', courses: 'BCA',                   subjects_count: 4, status: 'active'   },
  { id: 6, name: 'Prof. Deepak Rao',  email: 'deepak@cms.edu',   phone: '+91 98600 66778', department: 'Electronics',      designation: 'HOD',             qualification: 'M.Tech, PhD', joining_date: '2010-03-15', courses: 'B.Tech ECE',            subjects_count: 5, status: 'active'   },
];

const PER_PAGE = 5;

function FacultyList() {
  const [filters, setFilters]           = useState({ search: '', department: '', designation: '', status: '' });
  const [currentPage, setCurrentPage]   = useState(1);
  const [modal, setModal]               = useState({ open: false, mode: 'add', faculty: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filtered = MOCK_FACULTY.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(filters.search.toLowerCase())
      || f.email.toLowerCase().includes(filters.search.toLowerCase());
    const matchDept   = !filters.department  || f.department === filters.department;
    const matchDesig  = !filters.designation || f.designation.toLowerCase().replace(/[\s.]/g, '-') === filters.designation;
    const matchStatus = !filters.status      || f.status === filters.status;
    return matchSearch && matchDept && matchDesig && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const openAdd    = () => setModal({ open: true, mode: 'add', faculty: null });
  const openEdit   = (faculty) => setModal({ open: true, mode: 'edit', faculty });
  const closeModal = () => setModal({ open: false, mode: 'add', faculty: null });

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

  return (
    <div className='p-3'>
      <FacultyTopbar onAddClick={openAdd} />

      <div className="bg-white rounded-xl border border-[#B5D4F4]">
        <FacultyFilters filters={filters} onChange={handleFiltersChange} />
        <FacultyTable
          faculty={paginated}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={filtered.length}
          perPage={PER_PAGE}
          onPageChange={setCurrentPage}
          onEdit={openEdit}
          onDelete={(id) => console.log('delete', id)}
        />
      </div>

      <FacultyFormModal
        isOpen={modal.open}
        mode={modal.mode}
        faculty={modal.faculty}
        onClose={closeModal}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default FacultyList;