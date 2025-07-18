import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateStaffAPI, createStaffAPI } from '../services/allAPIs';
import { useToast } from '../context/ToastContext';

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const allPermissions = [
  { module: 'student', action: 'create', icon: <AddIcon fontSize="small" /> },
  { module: 'student', action: 'view', icon: <VisibilityIcon fontSize="small" /> },
  { module: 'student', action: 'edit', icon: <EditIcon fontSize="small" /> },
  { module: 'student', action: 'delete', icon: <DeleteIcon fontSize="small" /> },
];

//"'student:view', 'student:edit'"
const defaultPermissions = [];

function StaffModal({ data = {}, onClose, refresh }) {
  const { showToast } = useToast();

  const formik = useFormik({
    initialValues: {
      username: data.username || '',
      email: data.email || '',
      password: '',
      permissions: data._id
        ? data.permissions?.map((p) => `${p.module}:${p.action}`) || []
        : defaultPermissions,
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: !data._id
        ? Yup.string().required('Password is required')
        : Yup.string(),
    }),
    // onSubmit: async (values) => {
    //   const payload = {
    //     ...values,
    //     permissions: values.permissions.map((p) => {
    //       const [module, action] = p.split(':');
    //       return { module, action };
    //     }),
    //   };

    //   try {
    //     if (data._id) {
    //       await updateStaffAPI(data._id, payload);
    //       showToast('Staff updated successfully!', 'success');
    //     } else {
    //       await createStaffAPI(payload);
    //       showToast('Staff created successfully!', 'success');
    //     }
    //     onClose();
    //     refresh();
    //   } catch (error) {
    //     showToast(
    //       error?.response?.data?.message || 'Something went wrong!',
    //       'error'
    //     );
    //   }
    // },
    onSubmit: async (values) => {
  const permissionPayload = values.permissions.map((p) => {
    const [module, action] = p.split(':');
    return { module, action };
  });

  const payload = {
    username: values.username,
    email: values.email,
    permissions: permissionPayload,
  };

  // Only include password if it's a new staff (no data._id)
  if (!data._id && values.password) {
    payload.password = values.password;
  }

  try {
    if (data._id) {
      await updateStaffAPI(data._id, payload);
      showToast('Staff updated successfully!', 'success');
    } else {
      await createStaffAPI(payload);
      showToast('Staff created successfully!', 'success');
    }
    onClose();
    refresh();
  } catch (error) {
    showToast(
      error?.response?.data?.message || 'Something went wrong!',
      'error'
    );
  }
}

  });

  const togglePermission = (permKey) => {
    const { permissions } = formik.values;
    if (permissions.includes(permKey)) {
      formik.setFieldValue(
        'permissions',
        permissions.filter((p) => p !== permKey)
      );
    } else {
      formik.setFieldValue('permissions', [...permissions, permKey]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-xl mx-4 p-6 bg-black/80 backdrop-blur-xl text-white shadow-2xl rounded-2xl overflow-y-auto max-h-[90vh] animate-fade-in">
        <h2 className="mb-4 text-2xl font-bold">
          {data._id ? 'Edit Staff' : 'Create Staff'}
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="space-y-3">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-700 rounded bg-black/50"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-sm text-red-400">{formik.errors.username}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-700 rounded bg-black/50"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-400">{formik.errors.email}</p>
            )}

            {!data._id && (
              <>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-gray-700 rounded bg-black/50"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-sm text-red-400">{formik.errors.password}</p>
                )}
              </>
            )}
          </div>

          <div className="p-4 mt-2 border border-gray-700 rounded bg-black/50">
            <h3 className="mb-3 text-sm font-semibold text-gray-300">Permissions</h3>
            <div className="grid grid-cols-2 gap-2">
              {allPermissions.map((perm, idx) => {
                const key = `${perm.module}:${perm.action}`;
                const isChecked = formik.values.permissions.includes(key);
                return (
                  <label
                    key={idx}
                    className="flex items-center gap-2 text-sm cursor-pointer hover:text-blue-400"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => togglePermission(key)}
                      className="accent-blue-500"
                    />
                    <span className="flex items-center gap-1">
                      {perm.icon}
                      {perm.action}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-500 rounded hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
              className={`px-5 py-2 text-white rounded transition ${
                !formik.isValid ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StaffModal;
