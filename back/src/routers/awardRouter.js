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

    const { title, description } = req.body;
    console.log("title: ", title);
    console.log("description: ", description);

    // user_id를 request에서 가져옴 (check login_required)
    const user_id = req.currentUserId;
    console.log("user_id:", user_id);

    if (!user_id) {
      throw new Error("No User");
    }

    // 위 데이터를 수상 db에 추가하기
    const newAward = await awardService.addAward({
      user_id,
      title,
      description,
    });
    console.log("newAward: ", newAward);

    if (newAward.errorMessage) {
      throw new Error(newAward.errorMessage);
    }

    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

awardRouter.put("/awards/:id", async (req, res, next) => {
  try {
    // req에서 데이터 가져오기
    const award_id = req.params.id;

    // 해당 id를 사용하는 award정보가 있는지 확인
    const award = await Award.findByAwardId({ award_id });

    // !!!
    if (award.user_id !== req.currentUserId) {
      throw new Error("권한이 없습니다.");
    }

    // 있는 경우 update할 정보를 추출
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;

    const toUpdate = { title, description };

    // 수정 후 db에 업데이트
    const updatedAward = await awardService.setAward({ award_id, toUpdate });

    if (updatedAward.errorMessage) {
      throw new Error(updatedAward.errorMessage);
    }

    res.status(200).json(updatedAward);
  } catch (error) {
    next(error);
  }
});

// 특정 user의 모든 수상내역 get
awardRouter.get("/users/:user_id/awards", async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const userAwardInfo = await awardService.getAwardInfo({ user_id });

    if (userAwardInfo.errorMessage) {
      throw new Error(userAwardInfo.errorMessage);
    }
    res.status(200).json(userAwardInfo);
  } catch (error) {
    next(error);
  }
});

awardRouter.delete("/awards/:id", async (req, res, next) => {
  try {
    const award_id = req.params.id;
    const award = await Award.findByAwardId({ award_id });

    // !!!
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
