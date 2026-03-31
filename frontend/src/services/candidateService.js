import axios from 'axios';

const API_URL = "https://localhost:7122/api/UngVien"; 

const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===== UngVien (Ứng Viên) APIs =====
export const getAllCandidates = () => axiosInstance.get(API_URL);
export const getCandidateById = (id) => axiosInstance.get(`${API_URL}/${id}`);
export const createCandidate = (data) => axiosInstance.post(API_URL, data);
export const updateCandidate = (id, data) => axiosInstance.put(`${API_URL}/${id}`, data);
export const deleteCandidate = (id) => axiosInstance.delete(`${API_URL}/${id}`);
export const getHoSos = (id) => axiosInstance.get(`${API_URL}/${id}/HoSos`);
export const getDonUngTuyens = (id) => axiosInstance.get(`${API_URL}/${id}/DonUngTuyens`);

// ===== HoSo APIs =====
export const getHoSosByCandidate = (mauingvien) => 
  axiosInstance.post(`https://localhost:7122/api/DanhSachHoSo/${mauingvien}`);

export const uploadCV = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axiosInstance.post('https://localhost:7122/api/HoSo/UploadCV', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

// ===== UngVienHelper APIs =====
export const submitApplicationForm = (data) => 
  axiosInstance.post('https://localhost:7122/api/UngVienHelper/NopDon', data);

export const getLichSuingTuyen = (mauingvien) => 
  axiosInstance.get(`https://localhost:7122/api/UngVienHelper/LichSuingTuyen/${mauingvien}`);

export const getLichPhoneVan = (mauingvien) => 
  axiosInstance.get(`https://localhost:7122/api/UngVienHelper/LichPhoneVan/${mauingvien}`);

export const getLichKiemViecLam = () => 
  axiosInstance.get('https://localhost:7122/api/UngVienHelper/LichKiemViecLam');

export const replyOffer = (maoffer, data) => 
  axiosInstance.put(`https://localhost:7122/api/UngVienHelper/PhanHoiBQua/${maoffer}`, data);