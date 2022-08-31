import is from "@sindresorhus/is";
import { Router } from "express";
import { projectService } from "../services/projectService";
import { Project } from "../db";

const projectRouter = Router();

projectRouter.post(
  "/project",
  async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const { title, description, from_date, to_date } = req.currentUserId;

    const user_id = req.currentUserId;

    // 위 데이터를 프로젝트 db에 추가하기
    const newProject = await projectService.addProject({
      user_id,
      title,
      description,
      from_date,
      to_date,
    });

    if (newProject.errorMessage) {
      throw new Error(newProject.errorMessage);
    }

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

// 특정 user의 모든 프로젝트내역 get
projectRouter.get(
  "/users/:user_id/projects",
  async (req, res, next) => {
    try {
      const user_id = req.params.user_id;
      const projects = await projectService.getProjects({ user_id });
      
      res.status(200).send(projects);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.put(
  "/projects/:id",
  async (req, res, next) => {
  try {
    const project_id = req.params.id;

    const project = await Project.findByProjectId({ project_id });

    // !!!
    if (project.user_id !== req.currentUserId) {
      throw new Error("권한이 없습니다.");
    }

    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const from_date = req.body.from_date ?? null;
    const to_date = req.body.to_date ?? null;

    const toUpdate = { title, description, from_date, to_date };

    const updatedProject = await projectService.setProject({
      project_id,
      toUpdate,
    });

    if (updatedProject.errorMessage) {
      throw new Error(updatedProject.errorMessage);
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
});

projectRouter.delete(
  "/projects/:id",
  async (req, res, next) => {
  try {
    const project_id = req.params.id;
    const project = await Project.findByProjectId({ project_id });

    // !!!
    if (project.user_id !== req.currentUserId) {
      throw new Error("권한이 없습니다.");
    }

    await projectService.deleteProject({ project_id });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export { projectRouter };
