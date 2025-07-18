// src/services/api.js

import { commonAPI } from './commonAPI';
import { serverUrl } from './serverURL';

// AUTH

export const registerAPI = async (userData) => {
  return await commonAPI('POST', `${serverUrl}/auth/register`, userData, {});
};

export const loginAPI = async (loginData) => {
  console.log(loginData);
  
  return await commonAPI('POST', `${serverUrl}/auth/login`, loginData, {});
};

// STUDENTS

export const getAllStudentsAPI = async () => {
  const token = sessionStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  return await commonAPI('GET', `${serverUrl}/students`, {}, headers);
};

export const createStudentAPI = async (studentData) => {
  const token = sessionStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  console.log(studentData);
  
  return await commonAPI('POST', `${serverUrl}/students`, studentData, headers);
};

export const updateStudentAPI = async (studentId, updatedData) => {
  const token = sessionStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  return await commonAPI('PUT', `${serverUrl}/students/${studentId}`, updatedData, headers);
};

export const deleteStudentAPI = async (studentId) => {
  const token = sessionStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  return await commonAPI('DELETE', `${serverUrl}/students/${studentId}`, {}, headers);
};

//  STAFF

export const getAllStaffAPI = async () => {
  const token = sessionStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  return await commonAPI('GET', `${serverUrl}/staff`, {}, headers);
};

export const createStaffAPI = async (staffData) => {
  const token = sessionStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  return await commonAPI('POST', `${serverUrl}/staff`, staffData, headers);
};

export const updateStaffAPI = async (staffId, updatedData) => {
  const token = sessionStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  return await commonAPI('PUT', `${serverUrl}/staff/${staffId}`, updatedData, headers);
};

export const deleteStaffAPI = async (staffId) => {
  const token = sessionStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  return await commonAPI('DELETE', `${serverUrl}/staff/${staffId}`, {}, headers);
};
