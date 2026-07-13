export const activeProfileHeaders = (profileId?: string | null): Record<string, string> => {
  const resolvedProfileId = profileId || localStorage.getItem('ge10_selected_profile_id');
  return resolvedProfileId ? { 'X-Profile-Id': resolvedProfileId } : {};
};
