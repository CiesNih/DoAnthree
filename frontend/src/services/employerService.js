import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_ADMIN || 'https://localhost:7272';
const API_NTD_URL = `${API_BASE_URL}/api/ntd`;

// Lấy token từ localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ========================================================
// VIỆC LÀM
// ========================================================

// Lấy danh sách việc làm của công ty
export const getViecLamCuaCongTy = async (maCongTy, params = {}) => {
  try {
    const response = await axios.get(`${API_NTD_URL}/vieclam`, {
      params: { maCongTy, ...params },
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Tạo việc làm mới
export const taoViecLam = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/ViecLam`, data, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Cập nhật việc làm
export const capNhatViecLam = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/ViecLam/${id}`, data, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Xóa việc làm
export const xoaViecLam = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/ViecLam/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ========================================================
// ĐƠN ỨNG TUYỂN
// ========================================================

// Lấy danh sách đơn ứng tuyển
export const getDonUngTuyen = async (params = {}) => {
  try {
    const response = await axios.get(`${API_NTD_URL}/don-ung-tuyen`, {
      params,
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Cập nhật trạng thái đơn ứng tuyển
export const capNhatTrangThaiDon = async (id, data) => {
  try {
    const response = await axios.patch(
      `${API_NTD_URL}/don-ung-tuyen/${id}/trang-thai`,
      data,
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ========================================================
// PHỎNG VẤN
// ========================================================

// Tạo lịch phỏng vấn
export const taoLichPhongVan = async (data) => {
  try {
    const response = await axios.post(`${API_NTD_URL}/phong-van`, data, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Lấy chi tiết lịch phỏng vấn
export const getChiTietPhongVan = async (id) => {
  try {
    const response = await axios.get(`${API_NTD_URL}/phong-van/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ========================================================
// THỐNG KÊ
// ========================================================

// Lấy thống kê
export const getThongKe = async (maCongTy) => {
  try {
    const response = await axios.get(`${API_NTD_URL}/thong-ke`, {
      params: { maCongTy },
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ========================================================
// CÔNG TY
// ========================================================

// Lấy thông tin công ty
export const getThongTinCongTy = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/CongTy/${id}`, {
      headers: getAuthHeader()
    });
    
    // API trả về trực tiếp object CongTy, không có wrapper success/data
    // Nên cần wrap lại để frontend xử lý đồng nhất
    return {
      success: true,
      data: {
        tenCongTy: response.data.tenCongTy,
        slug: response.data.slug,
        website: response.data.website,
        moTa: response.data.moTa,
        logo: response.data.logo
      }
    };
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Lỗi không xác định'
    };
  }
};

// Cập nhật thông tin công ty
export const capNhatCongTy = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/CongTy/${id}`, data, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  getViecLamCuaCongTy,
  taoViecLam,
  capNhatViecLam,
  xoaViecLam,
  getDonUngTuyen,
  capNhatTrangThaiDon,
  taoLichPhongVan,
  getChiTietPhongVan,
  getThongKe,
  getThongTinCongTy,
  capNhatCongTy
};
