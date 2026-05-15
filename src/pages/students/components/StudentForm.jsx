import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  first_name:    z.string().min(2, 'First name is required'),
  last_name:     z.string().min(2, 'Last name is required'),
  email:         z.string().email('Enter a valid email'),
  phone:         z.string().min(10, 'Enter a valid phone number'),
  course:        z.string().min(1, 'Select a course'),
  year:          z.string().min(1, 'Select a year'),
  dob:           z.string().min(1, 'Date of birth is required'),
  guardian_name: z.string().min(2, 'Guardian name is required'),
  address:       z.string().min(5, 'Address is required'),
  status:        z.string().min(1, 'Select a status'),
});

const COURSES = ['B.Tech CSE', 'B.Tech ECE', 'MBA', 'BCA'];
const YEARS   = ['1', '2', '3', '4'];

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

const inputClass = `w-full px-3 py-2 text-sm rounded-lg border bg-[#F0F6FF]
  text-[#042C53] placeholder-[#85B7EB] transition
  focus:outline-none focus:border-[#185FA5] focus:bg-white`;

const errorInputClass = `border-[#E24B4A]`;
const normalInputClass = `border-[#B5D4F4]`;

function StudentForm({ initialValues = {}, onSubmit, onCancel, isSubmitting }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name:    '',
      last_name:     '',
      email:         '',
      phone:         '',
      course:        '',
      year:          '',
      dob:           '',
      guardian_name: '',
      address:       '',
      status:        '',
      ...initialValues,
    },
  });

  useEffect(() => {
    reset({
      first_name:    '',
      last_name:     '',
      email:         '',
      phone:         '',
      course:        '',
      year:          '',
      dob:           '',
      guardian_name: '',
      address:       '',
      status:        '',
      ...initialValues,
    });
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-2 gap-4 p-5">

        <FormField label="First name" error={errors.first_name?.message}>
          <input
            {...register('first_name')}
          
            className={`${inputClass} ${errors.first_name ? errorInputClass : normalInputClass}`}
          />
        </FormField>

        <FormField label="Last name" error={errors.last_name?.message}>
          <input
            {...register('last_name')}
            className={`${inputClass} ${errors.last_name ? errorInputClass : normalInputClass}`}
          />
        </FormField>

        <FormField label="Email address" error={errors.email?.message}>
          <input
            {...register('email')}
            type="email"
            className={`${inputClass} ${errors.email ? errorInputClass : normalInputClass}`}
          />
        </FormField>

        <FormField label="Phone number" error={errors.phone?.message}>
          <input
            {...register('phone')}
            className={`${inputClass} ${errors.phone ? errorInputClass : normalInputClass}`}
          />
        </FormField>

        <FormField label="Course" error={errors.course?.message}>
          <select
            {...register('course')}
            className={`${inputClass} ${errors.course ? errorInputClass : normalInputClass} cursor-pointer`}
          >
            <option value="">Select course</option>
            {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </FormField>

        <FormField label="Year" error={errors.year?.message}>
          <select
            {...register('year')}
            className={`${inputClass} ${errors.year ? errorInputClass : normalInputClass} cursor-pointer`}
          >
            <option value="">Select year</option>
            {YEARS.map(y => <option key={y} value={y}>Year {y}</option>)}
          </select>
        </FormField>

        <FormField label="Date of birth" error={errors.dob?.message}>
          <input
            {...register('dob')}
            type="date"
            className={`${inputClass} ${errors.dob ? errorInputClass : normalInputClass}`}
          />
        </FormField>

        <FormField label="Guardian name" error={errors.guardian_name?.message}>
          <input
            {...register('guardian_name')}
            className={`${inputClass} ${errors.guardian_name ? errorInputClass : normalInputClass}`}
          />
        </FormField>

        <FormField label="Status" error={errors.status?.message}>
          <select
            {...register('status')}
            className={`${inputClass} ${errors.status ? errorInputClass : normalInputClass} cursor-pointer`}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </FormField>

        <FormField label="Photo upload" error={null}>
          <input
            type="file"
            accept="image/png, image/jpeg"
            className={`${inputClass} ${normalInputClass} file:mr-3 file:py-1 file:px-3
              file:rounded-md file:border-0 file:text-xs file:font-medium
              file:bg-[#185FA5] file:text-white cursor-pointer`}
          />
        </FormField>

        <div className="col-span-2">
          <FormField label="Address" error={errors.address?.message}>
            <input
              {...register('address')}
              className={`${inputClass} ${errors.address ? errorInputClass : normalInputClass}`}
            />
          </FormField>
        </div>

      </div>

      <div className="flex items-center justify-end gap-3 px-5 py-4
        border-t border-[#E6F1FB]">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm border border-[#B5D4F4] text-[#185FA5]
            rounded-lg hover:bg-[#E6F1FB] transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2 text-sm font-medium bg-[#185FA5] text-white
            rounded-lg hover:bg-[#0C447C] transition disabled:opacity-50
            disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Save student'}
        </button>
      </div>
    </form>
  );
}

export default StudentForm;