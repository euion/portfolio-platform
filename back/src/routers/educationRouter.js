import is from "@sindresorhus/is";
import { Router } from "express";
import { educationService } from "../services/educationService";
import { Education } from "../db";

const educationRouter = Router();

educationRouter.post(
  "/education/create",
  async (req, res, next) => {
    // request가 어떻게 들어오는지 알아보자!!!
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      const { school, major, position } = req.body;

      // user_id를 request에서 가져옴 (check login_required)
      const user_id = req.currentUserId;

      if (!user_id) {
        throw new Error("No User");
      }

      // 위 데이터를 학력 db에 추가하기
      const newEducation = await educationService.addEducation({
        user_id,
        school,
        major,
        position,
      });

      if (newEducation.errorMessage) {
        throw new Error(newEducation.errorMessage);
      }

      res.status(201).json(newEducation);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.put(
  "/educations/:id",
  async (req, res, next) => {
    try {
      // 작성자와 로그인된 사용자가 일치하는지 확인
      // if (education.user_id !== req.currentUserId) {
      //   throw new Error("Not Authorized");
      // }
      // req에서 데이터 가져오기
      const edu_id = req.params.id;

      // 해당 id를 사용하는 education정보가 있는지 확인
      const education = await Education.findByEduId({ edu_id });

      //없으면 에러
      if (!education) {
        throw new Error(education.errorMessage);
      }

      // 있는 경우 update할 정보를 추출
      const school = req.body.school ?? null;
      const major = req.body.major ?? null;
      const position = req.body.position ?? null;

      const toUpdate = { school, major, position };

      // 수정 후 db에 업데이트
      const updatedEducation = await educationService.setEducation({
        edu_id,
        toUpdate,
      });
      console.log(updatedEducation);

      if (updatedEducation.errorMessage) {
        throw new Error(updatedEducation.errorMessage);
      }

      res.status(200).json(updatedEducation);
    } catch (error) {
      next(error);
    }
  }
);

// 특정 user의 모든 학력 내역 get
educationRouter.get(
  "/educationlist/:user_id",
  async (req, res, next) => {
    try {
      const user_id = req.params.user_id;
      const userEducationInfo = await educationService.getEducationInfo({
        user_id,
      });

      if (userEducationInfo.errorMessage) {
        throw new Error(userEducationInfo.errorMessage);
      }
      res.status(200).json(userEducationInfo);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

educationRouter.delete(
  "/educations/:id/delete",
  async (req, res, next) => {
    try {
      const edu_id = req.params.id;
      await educationService.deleteEducation({ edu_id })
      res.sendStatus(204)
    } catch (error) {
      next(error);
    }
  }
);

export { educationRouter };
