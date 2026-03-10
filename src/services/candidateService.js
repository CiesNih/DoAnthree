import axios from 'axios';

const API_URL = "http://localhost:7122/api/UngVien"; 

export const getAllCandidates = () => axios.get(API_URL);
export const getCandidateById = (id) => axios.get(`${API_URL}/${id}`);
export const createCandidate = (data) => axios.post(API_URL, data);