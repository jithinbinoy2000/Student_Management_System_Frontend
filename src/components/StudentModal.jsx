import React from 'react';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { createStudentAPI, updateStudentAPI } from '../services/allAPIs';
import { useToast } from '../context/ToastContext';

import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  School as SchoolIcon,
  LocationOn as LocationOnIcon,
  CalendarToday as CalendarTodayIcon,
  Numbers as NumbersIcon,
  Delete as DeleteIcon,
  MenuBook as MenuBookIcon,
} from '@mui/icons-material';

function StudentModal({ data = {}, onClose, refresh }) {
  const { showToast } = useToast();

  const validationSchema = Yup.object().shape({
    rollNumber: Yup.string().required('Roll Number is required'),
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    age: Yup.number().required('Age is required').min(1, 'Invalid age'),
    grade: Yup.string().required('Grade is required'),
    contactInfo: Yup.object().shape({
      phone: Yup.string()
        .required('Phone is required')
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
      address: Yup.string().required('Address is required'),
    }),
    marks: Yup.array()
      .max(10, 'You can only add up to 10 subjects')
      .of(
        Yup.object().shape({
          subject: Yup.string().required('Subject is required'),
          score: Yup.number()
            .required('Score is required')
            .min(0, 'Score cannot be negative')
            .test(
              'lessThanMax',
              'Score must be less than or equal to Max',
              function (value) {
                const { maxScore } = this.parent;
                return value <= maxScore;
              }
            ),
          maxScore: Yup.number()
            .required('Max score is required')
            .min(1, 'Max score must be at least 1'),
        })
      ),
  });

  const formik = useFormik({
    initialValues: {
      rollNumber: data.rollNumber || '',
      name: data.name || '',
      email: data.email || '',
      age: data.age || '',
      grade: data.grade || '',
      contactInfo: {
        phone: data.contactInfo?.phone || '',
        address: data.contactInfo?.address || '',
      },
      marks: data.marks || [],
    },
    validationSchema,
    enableReinitialize: true,
    validateOnMount: true, 
    onSubmit: async (values) => {
      try {
        if (data._id) {
          await updateStudentAPI(data._id, values);
          showToast('Student updated successfully!', 'success');
        } else {
          await createStudentAPI(values);
          showToast('Student created successfully!', 'success');
        }
        onClose();
        refresh();
      } catch (error) {
        showToast(error?.response?.data?.message || 'Something went wrong!', 'error');
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isValid,
    isSubmitting,
    setFieldValue,
  } = formik;

  // Helper function to check if form has validation errors
  const hasValidationErrors = () => {
    const hasErrors = Object.keys(errors).some(key => {
      if (key === 'contactInfo') {
        return Object.keys(errors.contactInfo || {}).length > 0;
      }
      if (key === 'marks') {
        return Array.isArray(errors.marks) && errors.marks.some(mark => 
          mark && Object.keys(mark).length > 0
        );
      }
      return errors[key];
    });
    return hasErrors;
  };

 
  const canSave = data._id ? !hasValidationErrors() : isValid;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-5xl p-6 mx-4 text-white bg-black/80 backdrop-blur-xl shadow-2xl rounded-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {data._id ? 'Edit Student' : 'Create Student'}
          </h2>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm border border-gray-600 rounded hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSave || isSubmitting}
              className={`px-5 py-2 text-sm rounded ${
                !canSave ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Save
            </button>
          </div>
        </div>

        <FormikProvider value={formik}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Left: Info Form */}
            <div className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row ">
                {/* Roll Number */}
                <div className="w-full text-sm">
                  <div className="flex items-center gap-2 mb-1 text-gray-400">
                    <NumbersIcon fontSize="small" />
                    <label className="text-xs">Roll Number</label>
                  </div>
                  <input
                    name="rollNumber"
                    type="text"
                    placeholder="Roll Number"
                    value={values.rollNumber}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-3 py-2 text-white border border-gray-700 rounded bg-black/50"
                  />
                  {touched.rollNumber && errors.rollNumber && (
                    <p className="mt-1 text-xs text-red-400">{errors.rollNumber}</p>
                  )}
                </div>

                {/* Name */}
                <div className="w-full text-sm">
                  <div className="flex items-center gap-2 mb-1 text-gray-400">
                    <PersonIcon fontSize="small" />
                    <label className="text-xs">Name</label>
                  </div>
                  <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-3 py-2 text-white border border-gray-700 rounded bg-black/50"
                  />
                  {touched.name && errors.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                {/* Email */}
                <div className="w-full text-sm">
                  <div className="flex items-center gap-2 mb-1 text-gray-400">
                    <EmailIcon fontSize="small" />
                    <label className="text-xs">Email</label>
                  </div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-3 py-2 text-white border border-gray-700 rounded bg-black/50"
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Age */}
                <div className="w-full text-sm">
                  <div className="flex items-center gap-2 mb-1 text-gray-400">
                    <CalendarTodayIcon fontSize="small" />
                    <label className="text-xs">Age</label>
                  </div>
                  <input
                    name="age"
                    type="number"
                    placeholder="Age"
                    value={values.age}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-3 py-2 text-white border border-gray-700 rounded bg-black/50"
                  />
                  {touched.age && errors.age && (
                    <p className="mt-1 text-xs text-red-400">{errors.age}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                {/* Grade */}
                <div className="w-full text-sm">
                  <div className="flex items-center gap-2 mb-1 text-gray-400">
                    <SchoolIcon fontSize="small" />
                    <label className="text-xs">Grade</label>
                  </div>
                  <input
                    name="grade"
                    type="text"
                    placeholder="Grade"
                    value={values.grade}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-3 py-2 text-white border border-gray-700 rounded bg-black/50"
                  />
                  {touched.grade && errors.grade && (
                    <p className="mt-1 text-xs text-red-400">{errors.grade}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="w-full text-sm">
                  <div className="flex items-center gap-2 mb-1 text-gray-400">
                    <PhoneIcon fontSize="small" />
                    <label className="text-xs">Phone</label>
                  </div>
                  <input
                    name="contactInfo.phone"
                    type="text"
                    placeholder="Phone"
                    value={values.contactInfo.phone}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-3 py-2 text-white border border-gray-700 rounded bg-black/50"
                  />
                  {touched.contactInfo?.phone && errors.contactInfo?.phone && (
                    <p className="mt-1 text-xs text-red-400">{errors.contactInfo.phone}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="w-full text-sm">
                <div className="flex items-center gap-2 mb-1 text-gray-400">
                  <LocationOnIcon fontSize="small" />
                  <label className="text-xs">Address</label>
                </div>
                <textarea
                  name="contactInfo.address"
                  placeholder="Address"
                  rows={3}
                  value={values.contactInfo.address}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-3 py-2 text-white border border-gray-700 rounded bg-black/50"
                />
                {touched.contactInfo?.address && errors.contactInfo?.address && (
                  <p className="mt-1 text-xs text-red-400">{errors.contactInfo.address}</p>
                )}
              </div>
            </div>

            {/* Right: Marks Section */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-blue-400">
                <MenuBookIcon fontSize="small" />
                Marks
              </div>

              <FieldArray
                name="marks"
                render={(arrayHelpers) => (
                  <div>
                    {values.marks.map((mark, index) => {
                      const subjectError = errors.marks?.[index]?.subject;
                      const scoreError = errors.marks?.[index]?.score;
                      const maxScoreError = errors.marks?.[index]?.maxScore;
                      const subjectTouched = touched.marks?.[index]?.subject;
                      const scoreTouched = touched.marks?.[index]?.score;
                      const maxScoreTouched = touched.marks?.[index]?.maxScore;

                      return (
                        <div key={index} className="mb-3">
                          <div className="flex gap-2 mb-1">
                            <input
                              name={`marks[${index}].subject`}
                              placeholder="Subject"
                              value={mark.subject}
                              onChange={handleChange}
                              onBlur={formik.handleBlur}
                              className="flex-1 px-3 py-2 text-sm border border-gray-700 rounded bg-black/50"
                            />
                            <input
                              name={`marks[${index}].score`}
                              type="number"
                              placeholder="Score"
                              value={mark.score}
                              onChange={handleChange}
                              onBlur={formik.handleBlur}
                              className="w-24 px-3 py-2 text-sm border border-gray-700 rounded bg-black/50"
                            />
                            <input
                              name={`marks[${index}].maxScore`}
                              type="number"
                              placeholder="Max"
                              value={mark.maxScore}
                              onChange={handleChange}
                              onBlur={formik.handleBlur}
                              className="w-24 px-3 py-2 text-sm border border-gray-700 rounded bg-black/50"
                            />
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                              className="text-white hover:text-red-600"
                            >
                              <DeleteIcon fontSize="small" />
                            </button>
                          </div>
                          <div className="flex gap-2 text-xs text-red-400">
                            {subjectTouched && subjectError && <span>{subjectError}</span>}
                            {scoreTouched && scoreError && <span>{scoreError}</span>}
                            {maxScoreTouched && maxScoreError && <span>{maxScoreError}</span>}
                          </div>
                        </div>
                      );
                    })}

                    {typeof errors.marks === 'string' && (
                      <p className="text-sm text-red-400">{errors.marks}</p>
                    )}

                    <button
                      type="button"
                      disabled={values.marks.length >= 10}
                      onClick={() =>
                        arrayHelpers.push({ subject: '', score: '', maxScore: 100 })
                      }
                      className="mt-2 text-sm text-blue-400 hover:underline"
                    >
                      + Add Subject
                    </button>
                  </div>
                )}
              />
            </div>
          </div>
        </FormikProvider>
      </div>
    </div>
  );
}

export default StudentModal;