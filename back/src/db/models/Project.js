import { ProjectModel } from "../schemas/project";

class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  static async findById({ project_id }) {
    const project = await ProjectModel.findOne({ id: project_id });
    return project;
  }

  static async findAll({ user_id }) {
    const projects = await ProjectModel.find({ user_id: user_id });
    return projects;
  }

  static async update({ project_id, fieldToUpdate, newValue }) {
    const filter = { id: project_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }

  static async delete({ project_id }) {
    const project = await ProjectModel.deleteOne({ id: project_id })
    return project
  }
}

export { Project };
