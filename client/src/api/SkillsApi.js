import { publicApi, protectedApi } from './AxiosInstance';

// --- Public Endpoints ---
export const fetchTechnicalSkills = async () => {
  const response = await publicApi.get('/skills/technical');
  return response.data;
};

// --- Protected Admin Endpoints ---
export const createTechnicalSkill = async (technicalSkillData) => {
  const response = await protectedApi.post('/skills/technical', technicalSkillData);
  return response.data;
};

export const updateTechnicalSkill = async (id, technicalSkillData) => {
  const response = await protectedApi.put(`/skills/technical/${id}`, technicalSkillData);
  return response.data;
};

export const deleteTechnicalSkill = async (id) => {
  const response = await protectedApi.delete(`/skills/technical/${id}`);
  return response.data;
};

// --- Public Endpoints ---
export const fetchConceptualSkills = async () => {
  const response = await publicApi.get('/skills/conceptual');
  return response.data;
};

// --- Protected Admin Endpoints ---
export const createConceptualSkill = async (conceptualSkillData) => {
  const response = await protectedApi.post('/skills/conceptual', conceptualSkillData);
  return response.data;
};

export const deleteConceptualSkill = async (id) => {
  const response = await protectedApi.delete(`/skills/conceptual/${id}`);
  return response.data;
};