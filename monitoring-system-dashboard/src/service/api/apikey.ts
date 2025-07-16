import http from "../http";

export interface ApiKeyResponse {
  id: number;
  key: string;
  label: string;
  status: "enabled" | "disabled";
  createdAt: string;
  projectId: number;
}

export interface CreateApiKeyPayload {
  projectId: number;
  label: string;
}

export const createApiKey = (data: CreateApiKeyPayload) => {
  return http.post<ServiceResponse<ApiKeyResponse>>("/apikeys", data);
};

export const getApiKeys = (params: { projectId: number; page: number; size: number }) => {
  return http.get<ServiceResponse<ApiKeyResponse[]>>(`/apikeys`, { params: params });
};

export const toggleApiKeyStatus = (
  id: number,
  status: "enabled" | "disabled"
) => {
  return http.patch<ServiceResponse<ApiKeyResponse>>(`/apikeys/${id}/status`, { status });
};

export const deleteApiKey = (id: number) => {
  return http.delete<ServiceResponse<ApiKeyResponse>>(`/apikeys/${id}`);
};
