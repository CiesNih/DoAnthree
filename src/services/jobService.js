import axios from 'axios';

const API_URL = "https://localhost:7122/api/ViecLam"; 

const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===== ViecLam APIs =====
export const getAllJobs = () => axiosInstance.get(API_URL);
export const getJobById = (id) => axiosInstance.get(`${API_URL}/${id}`);
export const createJob = (data) => axiosInstance.post(API_URL, data);
export const deleteJob = (id) => axiosInstance.delete(`${API_URL}/${id}`);

// Bạn có thể thêm các API liên quan đến Công ty ở đây nếu cần
export const getJobsByCompany = (companyId) => axiosInstance.get(`${API_URL}/ByCompany/${companyId}`);