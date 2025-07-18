import React from 'react';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  School as SchoolIcon,
  LocationOn as LocationOnIcon,
  CalendarToday as CalendarTodayIcon,
  Numbers as NumbersIcon,
  Close as CloseIcon,
  MenuBook as MenuBookIcon,
} from '@mui/icons-material';

function StudentViewModal({ data, onClose }) {
  if (!data) return null;

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start w-full gap-2 text-sm">
      <Icon className="mt-1 text-gray-400" fontSize="small" />
      <div className="flex flex-col">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-white">{value || '-'}</span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-4xl p-6 bg-[#121212] text-white rounded-xl shadow-2xl overflow-y-auto max-h-[90vh] animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <PersonIcon className="text-blue-400" />
            Student Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 rounded-full hover:text-white hover:bg-gray-700"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left: Student Info */}
          <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <InfoItem icon={NumbersIcon} label="Roll Number" value={data.rollNumber} />
              <InfoItem icon={PersonIcon} label="Name" value={data.name} />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <InfoItem icon={EmailIcon} label="Email" value={data.email} />
              <InfoItem icon={CalendarTodayIcon} label="Age" value={data.age} />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <InfoItem icon={SchoolIcon} label="Grade" value={data.grade} />
              <InfoItem icon={PhoneIcon} label="Phone" value={data.contactInfo?.phone} />
            </div>
            <div>
              <InfoItem icon={LocationOnIcon} label="Address" value={data.contactInfo?.address} />
            </div>
          </div>

          {/* Right: Marks */}
          <div className="space-y-3">
            <div className="flex items-center gap-1 mb-1 text-sm font-medium text-blue-300">
              <MenuBookIcon fontSize="small" />
              Subjects & Marks
            </div>

            {data.marks?.length > 0 ? (
              <div className="pr-1 space-y-2 overflow-y-auto max-h-60">
                {data.marks.map((mark, i) => (
                  <div
                    key={i}
                    className="p-2 text-sm bg-gray-800 border border-gray-700 rounded"
                  >
                    <div className="text-xs text-gray-400">Subject</div>
                    <div className="text-white">{mark.subject}</div>
                    <div className="mt-1 text-xs text-gray-400">Score</div>
                    <div className="text-green-400">
                      {mark.score} / {mark.maxScore}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No marks available.</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm transition border border-gray-600 rounded hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentViewModal;
