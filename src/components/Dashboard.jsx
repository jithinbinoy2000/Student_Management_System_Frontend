// import React, { useEffect, useState } from "react";
// import {
//   Tabs,
//   Tab,
//   Box,
//   Button,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import StudentModal from "./StudentModal";
// import StaffModal from "./StaffModal";
// import { can } from "../utils/rbacUtils";
// import {
//   deleteStaffAPI,
//   deleteStudentAPI,
//   getAllStaffAPI,
//   getAllStudentsAPI,
// } from "../services/allAPIs";
// import StudentViewModal from "./StudentViewModal";
// import ToastMessage from "./ToastMessage";
// import { useToast } from "../context/ToastContext";

// function Dashboard({ user }) {
//   const [students, setStudents] = useState([]);
//   const [staff, setStaff] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [type, setType] = useState("");
//   const [tab, setTab] = useState(0);
//   const [viewingStudent, setViewingStudent] = useState(null);
//   const { toast, showToast, closeToast } = useToast();
//   const [loadingStudents, setLoadingStudents] = useState(false);
//   const [loadingStaff, setLoadingStaff] = useState(false);

//   const fetchData = async () => {
//     if (user.role === "SuperAdmin") {
//       setLoadingStudents(true);
//       setLoadingStaff(true);
//       try {
//         const [studentRes, staffRes] = await Promise.all([
//           getAllStudentsAPI(),
//           getAllStaffAPI(),
//         ]);
//         setStudents(studentRes.data);
//         setStaff(staffRes.data);
//       } catch (err) {
//         showToast("Failed to load data", "error");
//       } finally {
//         setLoadingStudents(false);
//         setLoadingStaff(false);
//       }
//     } else {
//       setLoadingStudents(true);
//       try {
//         const studentRes = await getAllStudentsAPI();
//         setStudents(studentRes.data);
//       } catch (err) {
//         showToast("Failed to load students", "error");
//       } finally {
//         setLoadingStudents(false);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const openModal = (item, itemType) => {
//     setSelectedItem(item);
//     setType(itemType);
//   };

//   const handleDelete = async (item, itemType) => {
//     try {
//       if (itemType === "student") {
//         await deleteStudentAPI(item._id);
//         showToast("Student deleted successfully!", "success");
//       } else if (itemType === "staff") {
//         await deleteStaffAPI(item._id);
//         showToast("Staff deleted successfully!", "success");
//       }
//       fetchData();
//     } catch (error) {
//       showToast(
//         error?.response?.data?.message || "Failed to delete item",
//         "error"
//       );
//     }
//   };

//   const handleCreate = (itemType) => {
//     const defaultData = { name: "", email: "" };
//     openModal(defaultData, itemType);
//   };

//   const isAdmin = user.role === "SuperAdmin";

//   const cellStyle = {
//     color: "white",
//     border: "1px solid #333 ",
//   };

//   return (
//     <Box className="text-white bg-black">
//       <Tabs
//         value={tab}
//         onChange={(_, newValue) => setTab(newValue)}
//         textColor="inherit"
//         indicatorColor="primary"
//         sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
//         size="small"
//       >
//         <Tab label="Students" />
//         {isAdmin && <Tab label="Staff" />}
//       </Tabs>

//       {/* Student Tab */}
//       {tab === 0 && (
//         <Box>
//           {can(user, "student", "create") && (
//             <Button
//               variant="contained"
//               color="success"
//               className="mb-2"
//               onClick={() => handleCreate("student")}
//               sx={{ mb: 2 }}
//             >
//               Create Student
//             </Button>
//           )}

//           {loadingStudents ? (
//             <Box display="flex" justifyContent="center" mt={4}>
//               <CircularProgress color="info" />
//             </Box>
//           ) : !can(user, "student", "view") ? (
//             <Typography color="error" mt={2}>
//               You do not have permission to view student details. Contact the
//               administrator to update your access.
//             </Typography>
//           ) : students.length === 0 ? (
//             <Typography mt={2}>
//               No students found. Create one to get started.
//             </Typography>
//           ) : (
//             <TableContainer
//               component={Paper}
//               sx={{ backgroundColor: "#121212" }}
//             >
//               <Table sx={{ minWidth: 650 }}>
//                 <TableHead
//                   sx={{ backgroundColor: "#0b0b0b", borderRadius: "16px" }}
//                 >
//                   <TableRow>
//                     {[
//                       "Name",
//                       "Email",
//                       "Phone",
//                       "Roll No",
//                       "Grade",
//                       "Actions",
//                     ].map((header) => (
//                       <TableCell
//                         key={header}
//                         sx={{ ...cellStyle, fontWeight: "bold" }}
//                       >
//                         {header}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {students.map((st) => (
//                     <TableRow key={st._id} hover>
//                       <TableCell sx={cellStyle}>{st.name}</TableCell>
//                       <TableCell sx={cellStyle}>{st.email}</TableCell>
//                       <TableCell sx={cellStyle}>
//                         {st?.contactInfo?.phone || "—"}
//                       </TableCell>
//                       <TableCell sx={cellStyle}>
//                         {st.rollNumber || "—"}
//                       </TableCell>
//                       <TableCell sx={cellStyle}>{st.grade}</TableCell>
//                       <TableCell sx={cellStyle}>
//                         <Box display="flex" gap={1}>
//                           <Button
//                             onClick={() => setViewingStudent(st)}
//                             title="View"
//                             size="small"
//                             color="info"
//                             variant="outlined"
//                           >
//                             <VisibilityIcon fontSize="small" />
//                           </Button>
//                           {can(user, "student", "edit") && (
//                             <Button
//                               onClick={() => openModal(st, "student")}
//                               title="Edit"
//                               size="small"
//                               color="primary"
//                               variant="outlined"
//                             >
//                               <EditIcon fontSize="small" />
//                             </Button>
//                           )}
//                           {can(user, "student", "delete") && (
//                             <Button
//                               onClick={() => handleDelete(st, "student")}
//                               title="Delete"
//                               size="small"
//                               color="error"
//                               variant="outlined"
//                             >
//                               <DeleteIcon fontSize="small" />
//                             </Button>
//                           )}
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
//         </Box>
//       )}

//       {/* Staff Tab */}
//       {tab === 1 && isAdmin && (
//         <Box>
//           <Button
//             variant="contained"
//             color="success"
//             className="mb-2"
//             onClick={() => handleCreate("staff")}
//             sx={{ mb: 2 }}
//           >
//             Create Staff
//           </Button>

//           {loadingStaff ? (
//             <Box display="flex" justifyContent="center" mt={4}>
//               <CircularProgress color="primary" />
//             </Box>
//           ) : !can(user, "student", "view") ? (
//             <Typography color="error" mt={2}>
//               You do not have permission to view staff details. Contact the
//               administrator to update your access.
//             </Typography>
//           ) : staff.length === 0 ? (
//             <Typography mt={2}>
//               No staff members found. Create one to get started.
//             </Typography>
//           ) : (
//             <TableContainer
//               component={Paper}
//               sx={{ backgroundColor: "#121212" }}
//             >
//               <Table>
//                 <TableHead sx={{ backgroundColor: "#0b0b0b" }}>
//                   <TableRow>
//                     {["Name", "Email", "Permissions", "Actions"].map(
//                       (header) => (
//                         <TableCell
//                           key={header}
//                           sx={{ ...cellStyle, fontWeight: "bold" }}
//                         >
//                           {header}
//                         </TableCell>
//                       )
//                     )}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {staff.map((st) => (
//                     <TableRow key={st._id} hover>
//                       <TableCell sx={cellStyle}>{st.username}</TableCell>
//                       <TableCell sx={cellStyle}>{st.email}</TableCell>
//                       <TableCell sx={cellStyle}>
//                         {st.permissions?.length > 0 ? (
//                           <ul className="space-y-1 text-sm list-disc list-inside text-white/80">
//                             {st.permissions.map((perm, i) => (
//                               <li key={i}>
//                                 {perm.module}:{" "}
//                                 <span className="font-medium">
//                                   {perm.action}
//                                 </span>
//                               </li>
//                             ))}
//                           </ul>
//                         ) : (
//                           <span className="text-sm text-gray-400">
//                             No permissions
//                           </span>
//                         )}
//                       </TableCell>
//                       <TableCell sx={cellStyle}>
//                         <Box display="flex" gap={1}>
//                           {can(user, "student", "edit") && (
//                             <Button
//                               onClick={() => openModal(st, "staff")}
//                               title="Edit"
//                               size="small"
//                               color="primary"
//                               variant="outlined"
//                             >
//                               <EditIcon fontSize="small" />
//                             </Button>
//                           )}
//                           {can(user, "student", "delete") && (
//                             <Button
//                               onClick={() => handleDelete(st, "staff")}
//                               title="Delete"
//                               size="small"
//                               color="error"
//                               variant="outlined"
//                             >
//                               <DeleteIcon fontSize="small" />
//                             </Button>
//                           )}
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
//         </Box>
//       )}

//       {/* Modals */}
//       {type === "student" && selectedItem && (
//         <StudentModal
//           data={selectedItem}
//           onClose={() => setSelectedItem(null)}
//           refresh={fetchData}
//         />
//       )}
//       {type === "staff" && selectedItem && (
//         <StaffModal
//           data={selectedItem}
//           onClose={() => setSelectedItem(null)}
//           refresh={fetchData}
//         />
//       )}
//       {viewingStudent && (
//         <StudentViewModal
//           data={viewingStudent}
//           onClose={() => setViewingStudent(null)}
//         />
//       )}
//       <ToastMessage
//         open={toast.open}
//         message={toast.message}
//         severity={toast.severity}
//         onClose={closeToast}
//       />
//     </Box>
//   );
// }

// export default Dashboard;

// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StudentModal from './StudentModal';
import StaffModal from './StaffModal';
import { can } from '../utils/rbacUtils';
import {
  deleteStaffAPI,
  deleteStudentAPI,
  getAllStaffAPI,
  getAllStudentsAPI,
} from '../services/allAPIs';
import StudentViewModal from './StudentViewModal';
import ToastMessage from './ToastMessage';
import { useToast } from '../context/ToastContext';

function Dashboard({ user }) {
  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [type, setType] = useState('');
  const [tab, setTab] = useState(0);
  const [viewingStudent, setViewingStudent] = useState(null);
  const { toast, showToast, closeToast } = useToast();
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingStaff, setLoadingStaff] = useState(false);

  const fetchData = async () => {
    if (user.role === 'SuperAdmin') {
      setLoadingStudents(true);
      setLoadingStaff(true);
      try {
        const [studentRes, staffRes] = await Promise.all([
          getAllStudentsAPI(),
          getAllStaffAPI(),
        ]);
        setStudents(studentRes.data);
        setStaff(staffRes.data);
      } catch (err) {
        showToast('Failed to load data', 'error');
      } finally {
        setLoadingStudents(false);
        setLoadingStaff(false);
      }
    } else {
      setLoadingStudents(true);
      try {
        const studentRes = await getAllStudentsAPI();
        setStudents(studentRes.data);
      } catch (err) {
        showToast('Failed to load students', 'error');
      } finally {
        setLoadingStudents(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (item, itemType) => {
    setSelectedItem(item);
    setType(itemType);
  };

  const handleDelete = async (item, itemType) => {
    const id = item._id;

    // Optimistically remove from UI
    if (itemType === 'student') {
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } else if (itemType === 'staff') {
      setStaff((prev) => prev.filter((s) => s._id !== id));
    }

    try {
      if (itemType === 'student') {
        await deleteStudentAPI(id);
        showToast('Student deleted successfully!', 'success');
      } else if (itemType === 'staff') {
        await deleteStaffAPI(id);
        showToast('Staff deleted successfully!', 'success');
      }
    } catch (error) {
      showToast(error?.response?.data?.message || 'Failed to delete item', 'error');

      // Rollback UI on failure
      fetchData();
    }
  };

  const handleCreate = (itemType) => {
    const defaultData = { name: '', email: '' };
    openModal(defaultData, itemType);
  };

  const isAdmin = user.role === 'SuperAdmin';

  const cellStyle = {
    color: 'white',
    border: '1px solid #333 ',
  };

  return (
    <Box className="text-white bg-black">
      <Tabs
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
        textColor="inherit"
        indicatorColor="primary"
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        size="small"
      >
        <Tab label="Students" />
        {isAdmin && <Tab label="Staff" />}
      </Tabs>

      {/* Student Tab */}
      {tab === 0 && (
        <Box>
          {can(user, 'student', 'create') && (
            <Button
              variant="contained"
              color="success"
              className="mb-2"
              onClick={() => handleCreate('student')}
              sx={{ mb: 2 }}
            >
              Create Student
            </Button>
          )}

          {loadingStudents ? (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress color="info" />
            </Box>
          ) : !can(user, 'student', 'view') ? (
            <Typography color="error" mt={2}>
              You do not have permission to view student details. Contact the administrator to update your access.
            </Typography>
          ) : students.length === 0 ? (
            <Typography mt={2}>No students found. Create one to get started.</Typography>
          ) : (
            <TableContainer component={Paper} sx={{ backgroundColor: '#121212' }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ backgroundColor: '#0b0b0b', borderRadius: '16px' }}>
                  <TableRow>
                    {['Name', 'Email', 'Phone', 'Roll No', 'Grade', 'Actions'].map((header) => (
                      <TableCell key={header} sx={{ ...cellStyle, fontWeight: 'bold' }}>
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((st) => (
                    <TableRow key={st._id} hover>
                      <TableCell sx={cellStyle}>{st.name}</TableCell>
                      <TableCell sx={cellStyle}>{st.email}</TableCell>
                      <TableCell sx={cellStyle}>{st?.contactInfo?.phone || '—'}</TableCell>
                      <TableCell sx={cellStyle}>{st.rollNumber || '—'}</TableCell>
                      <TableCell sx={cellStyle}>{st.grade}</TableCell>
                      <TableCell sx={cellStyle}>
                        <Box display="flex" gap={1}>
                          <Button
                            onClick={() => setViewingStudent(st)}
                            title="View"
                            size="small"
                            color="info"
                            variant="outlined"
                          >
                            <VisibilityIcon fontSize="small" />
                          </Button>
                          {can(user, 'student', 'edit') && (
                            <Button
                              onClick={() => openModal(st, 'student')}
                              title="Edit"
                              size="small"
                              color="primary"
                              variant="outlined"
                            >
                              <EditIcon fontSize="small" />
                            </Button>
                          )}
                          {can(user, 'student', 'delete') && (
                            <Button
                              onClick={() => handleDelete(st, 'student')}
                              title="Delete"
                              size="small"
                              color="error"
                              variant="outlined"
                            >
                              <DeleteIcon fontSize="small" />
                            </Button>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}

      {/* Staff Tab */}
      {tab === 1 && isAdmin && (
        <Box>
          <Button
            variant="contained"
            color="success"
            className="mb-2"
            onClick={() => handleCreate('staff')}
            sx={{ mb: 2 }}
          >
            Create Staff
          </Button>

          {loadingStaff ? (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress color="primary" />
            </Box>
          ) : !can(user, 'student', 'view') ? (
            <Typography color="error" mt={2}>
              You do not have permission to view staff details. Contact the administrator to update your access.
            </Typography>
          ) : staff.length === 0 ? (
            <Typography mt={2}>No staff members found. Create one to get started.</Typography>
          ) : (
            <TableContainer component={Paper} sx={{ backgroundColor: '#121212' }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#0b0b0b' }}>
                  <TableRow>
                    {['Name', 'Email', 'Permissions', 'Actions'].map((header) => (
                      <TableCell key={header} sx={{ ...cellStyle, fontWeight: 'bold' }}>
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staff.map((st) => (
                    <TableRow key={st._id} hover>
                      <TableCell sx={cellStyle}>{st.username}</TableCell>
                      <TableCell sx={cellStyle}>{st.email}</TableCell>
                      <TableCell sx={cellStyle}>
                        {st.permissions?.length > 0 ? (
                          <ul className="space-y-1 text-sm list-disc list-inside text-white/80">
                            {st.permissions.map((perm, i) => (
                              <li key={i}>
                                {perm.module}:{' '}
                                <span className="font-medium">{perm.action}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-sm text-gray-400">No permissions</span>
                        )}
                      </TableCell>
                      <TableCell sx={cellStyle}>
                        <Box display="flex" gap={1}>
                          {can(user, 'student', 'edit') && (
                            <Button
                              onClick={() => openModal(st, 'staff')}
                              title="Edit"
                              size="small"
                              color="primary"
                              variant="outlined"
                            >
                              <EditIcon fontSize="small" />
                            </Button>
                          )}
                          {can(user, 'student', 'delete') && (
                            <Button
                              onClick={() => handleDelete(st, 'staff')}
                              title="Delete"
                              size="small"
                              color="error"
                              variant="outlined"
                            >
                              <DeleteIcon fontSize="small" />
                            </Button>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}

      {/* Modals */}
      {type === 'student' && selectedItem && (
        <StudentModal data={selectedItem} onClose={() => setSelectedItem(null)} refresh={fetchData} />
      )}
      {type === 'staff' && selectedItem && (
        <StaffModal data={selectedItem} onClose={() => setSelectedItem(null)} refresh={fetchData} />
      )}
      {viewingStudent && (
        <StudentViewModal data={viewingStudent} onClose={() => setViewingStudent(null)} />
      )}
      <ToastMessage
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={closeToast}
      />
    </Box>
  );
}

export default Dashboard;
