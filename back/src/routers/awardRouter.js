import is from "@sindresorhus/is";
import { Router } from "express";
import { awardService } from "../services/awardService";
import { Award } from "../db";

const awardRouter = Router();

awardRouter.post("/award", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const { title, description, hostOrganization, awardDate } = req.body;
    const user_id = req.currentUserId;

    // 위 데이터를 수상 db에 추가하기
    const newAward = await awardService.addAward({
      user_id,
      title,
      description,
      hostOrganization,
      awardDate,
    });

    if (newAward.errorMessage) {
      throw new Error(newAward.errorMessage);
    }

    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

// 특정 user의 모든 수상내역 get
awardRouter.get("/users/:user_id/awards", async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const userAwards = await awardService.getAwards({ user_id });

    if (userAwards.errorMessage) {
      throw new Error(userAwards.errorMessage);
    }
    res.status(200).json(userAwards);
  } catch (error) {
    next(error);
  }
});

awardRouter.put("/awards/:id", async (req, res, next) => {
  try {
    const award_id = req.params.id;

    const award = await Award.findByAwardId({ award_id });

    if (award.user_id !== req.currentUserId) {
      throw new Error("권한이 없습니다.");
    }

    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const hostOrganization = req.body.hostOrganization ?? null;
    const awardDate = req.body.awardDate ?? null;

    const toUpdate = { title, description, hostOrganization, awardDate };

    const updatedAward = await awardService.setAward({
      award_id,
      toUpdate,
    });

    if (updatedAward.errorMessage) {
      throw new Error(updatedAward.errorMessage);
    }

    res.status(200).json(updatedAward);
  } catch (error) {
    next(error);
  }
});

awardRouter.delete("/awards/:id", async (req, res, next) => {
  try {
    const award_id = req.params.id;
    const award = await Award.findByAwardId({ award_id });

    if (award.user_id !== req.currentUserId) {
      throw new Error("권한이 없습니다.");
    }

    await awardService.deleteAward({ award_id });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export { awardRouter };
