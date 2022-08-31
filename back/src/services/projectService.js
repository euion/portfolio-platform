import { Project } from "../db";

class projectService {
  // 새로운 자격증 추가
  static async addProject({ user_id, title, description, skill, link, imagePath, from_date, to_date }) {
    try {const newProject = {
      user_id,
      title,
      description,
      skill,
      link,
      imagePath,
      from_date,
      to_date,
    };

    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null;

    return createdNewProject;
    } catch (error) {
      const errorMessage ="모든 항목을 입력해주세요.";
      return { errorMessage };
    }
  }
  
  // 해당 유저의 모든 프로젝트 내용 가져오기
  static async getProjects({ user_id }) {
    const projects = await Project.findAllByUserId({ user_id });
    
    return projects;
  }

  //자격증 수정
  static async setProject({ project_id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let project = await Project.findByProjectId({ project_id });

    // db에서 찾지 X, 에러
    if (!project) {
      const errorMessage =
        "해당 프로젝트가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상을 확인 : title, description, from_date, to_date
    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }

    if (toUpdate.skill) {
      const fieldToUpdate = "skill";
      const newValue = toUpdate.skill;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }

    if (toUpdate.link) {
      const fieldToUpdate = "link";
      const newValue = toUpdate.link;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }

    if (toUpdate.imagePath) {
      const fieldToUpdate = "imagePath";
      const newValue = toUpdate.imagePath;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }

    if (toUpdate.from_date) {
        const fieldToUpdate = "from_date";
        const newValue = toUpdate.from_date;
        project = await Project.update({ project_id, fieldToUpdate, newValue });
    }

    if (toUpdate.to_date) {
        const fieldToUpdate = "to_date";
        const newValue = toUpdate.to_date;
        project = await Project.update({ project_id, fieldToUpdate, newValue });
    }

    return project;
  }

  static async deleteProject({ project_id }) {
    await Project.delete({ project_id })
  }
}

export { projectService };
