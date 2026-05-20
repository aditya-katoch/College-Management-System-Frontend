import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  first_name:   z.string().min(2, 'First name is required'),
  last_name:    z.string().min(2, 'Last name is required'),
  email:        z.string().email('Enter a valid email'),
  phone:        z.string().min(10, 'Enter a valid phone number'),
  department:   z.string().min(1, 'Select a department'),
  designation:  z.string().min(1, 'Select a designation'),
  qualification:z.string().min(2, 'Qualification is required'),
  joining_date: z.string().min(1, 'Joining date is required'),
  status:       z.string().min(1, 'Select a status'),
});

const DEPARTMENTS  = ['Computer Science', 'Electronics', 'Management', 'Mathematics'];
const DESIGNATIONS = ['Professor', 'Asst. Professor', 'HOD'];

const inputClass = `w-full px-3 py-2 text-sm rounded-lg border bg-[#F0F6FF]
  text-[#042C53] placeholder-[#85B7EB] transition
  focus:outline-none focus:border-[#185FA5] focus:bg-white`;

function FieldError({ message }) {
  if (!message) return null;
  return <p className="text-xs text-[#A32D2D] mt-1">{message}</p>;
}

function FormField({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-[#185FA5]">{label}</label>
      {children}
      <FieldError message={error} />
    </div>
  );
}

function FacultyForm({ initialValues = {}, onSubmit, onCancel, isSubmitting }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: '', last_name: '', email: '', phone: '',
      department: '', designation: '', qualification: '',
      joining_date: '', status: 'active',
      ...initialValues,
    },
  });

  useEffect(() => {
    reset({
      first_name: '', last_name: '', email: '', phone: '',
      department: '', designation: '', qualification: '',
      joining_date: '', status: 'active',
      ...initialValues,
    });
  }, [initialValues, reset]);

  const err = (field) => errors[field] ? 'border-[#E24B4A]' : 'border-[#B5D4F4]';

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-2 gap-4 p-5">

        <FormField label="First name" error={errors.first_name?.message}>
          <input {...register('first_name')} placeholder=""
            className={`${inputClass} ${err('first_name')}`} />
        </FormField>

        <FormField label="Last name" error={errors.last_name?.message}>
          <input {...register('last_name')} placeholder=""
            className={`${inputClass} ${err('last_name')}`} />
        </FormField>

        <FormField label="Email address" error={errors.email?.message}>
          <input {...register('email')} type="email" placeholder=""
            className={`${inputClass} ${err('email')}`} />
        </FormField>

        <FormField label="Phone number" error={errors.phone?.message}>
          <input {...register('phone')} placeholder=""
            className={`${inputClass} ${err('phone')}`} />
        </FormField>

        <FormField label="Department" error={errors.department?.message}>
          <select {...register('department')}
            className={`${inputClass} ${err('department')} cursor-pointer`}>
            <option value="">Select department</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </FormField>

        <FormField label="Designation" error={errors.designation?.message}>
          <select {...register('designation')}
            className={`${inputClass} ${err('designation')} cursor-pointer`}>
            <option value="">Select designation</option>
            {DESIGNATIONS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </FormField>

        <FormField label="Qualification" error={errors.qualification?.message}>
          <input {...register('qualification')} placeholder=""
            className={`${inputClass} ${err('qualification')}`} />
        </FormField>

        <FormField label="Joining date" error={errors.joining_date?.message}>
          <input {...register('joining_date')} type="date"
            className={`${inputClass} ${err('joining_date')}`} />
        </FormField>

        <FormField label="Status" error={errors.status?.message}>
          <select {...register('status')}
            className={`${inputClass} ${err('status')} cursor-pointer`}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </FormField>

      </div>

      <div className="flex items-center justify-end gap-3 px-5 py-4
        border-t border-[#E6F1FB]">
        <button type="button" onClick={onCancel}
          className="px-4 py-2 text-sm border border-[#B5D4F4] text-[#185FA5]
            rounded-lg hover:bg-[#E6F1FB] transition">
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting}
          className="px-5 py-2 text-sm font-medium bg-[#185FA5] text-white
            rounded-lg hover:bg-[#0C447C] transition disabled:opacity-50
            disabled:cursor-not-allowed">
          {isSubmitting ? 'Saving...' : 'Save faculty'}
        </button>
      </div>
    </form>
  );
}

export default FacultyForm;