import http from "../http";


export const categoryMaps = {
  web: "网站",
  h5: "H5",
  miniapp: "小程序",
  backend: "后端",
} as const;  // 让对象变成字面量类型，不会自动推断成 string

export interface ProjectResponse {
  id: number;
  appId: string;
  name: string;
  category: keyof typeof categoryMaps;  // category只能是categoryMaps的key之一
  status: "active" | "inactive";
}


export type ProjectPayload = {
  name: string;
  category: string;
};

export const createProject = (data: ProjectPayload) => {
  return http.post<ServiceResponse<ProjectResponse>>("/projects", data);
};

export const getProjects = (page: PageNationMeta) => {
  return http.get<
    ServiceResponse<ProjectResponse[]>
  >("/projects/list", {
    params: {
      page: page.page,
      size: page.size,
    }
  });
};

export const deleteProject = (id: number) => {
  return http.delete<ServiceResponse<ProjectResponse>>(`/projects/${id}`);
};

export const updateProject = (id: number, data: {status: 'active' | 'inactive'}) => {
  return http.patch<ServiceResponse<ProjectResponse>>(`/projects/${id}/status`, data);
};
