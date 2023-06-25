export interface ProjectInfo {
  _id: string;
  userInfo: {
    userId: string;
    username: string;
    img: string;
  };
  name: string;
  description: string;
  genre: string;
  img: string;
  shared: boolean;
}

export interface GetAllUserProjectsDTO {
  projects: ProjectInfo[];
}
