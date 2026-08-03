import { publicApi, protectedApi } from './AxiosInstance';

// --- Public Endpoints ---
export const fetchProfile = async () => {
  const response = await publicApi.get('/profile');
  return response.data;
};

// --- Protected Admin Endpoints ---
export const updateProfile = async (profileData) => {
  const response = await protectedApi.put('/profile', profileData);
  return response.data;
};

export const updateProfileDescription = async (descriptionData) => {
  const response = await protectedApi.put('/profile/description', descriptionData);
  return response.data;
};

export const createProfileSocialLink = async (socialLinkData) => {
  const response = await protectedApi.post('/profile/social', socialLinkData);
  return response.data;
};

export const updateProfileSocialLink = async (socialLinkId, socialLinkData) => {
  const response = await protectedApi.put(`/profile/social/${socialLinkId}`, socialLinkData);
  return response.data;
};

export const deleteProfileSocialLink = async (socialLinkId) => {
  const response = await protectedApi.delete(`/profile/social/${socialLinkId}`);
  return response.data;
};