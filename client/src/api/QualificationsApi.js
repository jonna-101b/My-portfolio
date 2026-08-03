import { publicApi, protectedApi } from './AxiosInstance';

// --- Public Endpoints ---
export const fetchQualifications = async () => {
  const response = await publicApi.get('/qualifications');
  return response.data;
};

// --- Protected Admin Endpoints ---
export const createQualification = async (qualificationData) => {
  const response = await protectedApi.post('/qualifications', qualificationData);
  return response.data;
};

export const updateQualification = async (id, qualificationData) => {
  const response = await protectedApi.put(`/qualifications/${id}`, qualificationData);
  return response.data;
};

export const deleteQualification = async (id) => {
  const response = await protectedApi.delete(`/qualifications/${id}`);
  return response.data;
};